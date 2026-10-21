
import { useMemo, useState } from "react";
import {
  Activity,
  Zap,
  Building2,
  Download,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import {
  classrooms,
  occupancyLogs,
  energyReadings,
  alerts,
} from "../data/mockData";

export default function AnalyticsReports() {
  const [selectedClassroom, setSelectedClassroom] = useState("all");

  const filteredReadings = useMemo(
    () =>
      energyReadings.filter(
        (reading) =>
          selectedClassroom === "all" ||
          reading.classroomId === selectedClassroom
      ),
    [selectedClassroom]
  );

  const availableReadings = filteredReadings.filter(
    (reading) => reading.energyKwh !== null
  );

  const totalEnergyKwh = availableReadings.reduce(
    (total, reading) => total + reading.energyKwh,
    0
  );

  const averagePowerWatts = (() => {
    const validReadings = filteredReadings.filter(
      (reading) => reading.powerWatts !== null
    );

    if (validReadings.length === 0) return 0;

    return (
      validReadings.reduce(
        (total, reading) => total + reading.powerWatts,
        0
      ) / validReadings.length
    );
  })();

  const totalWastageEvents = alerts.filter(
    (alert) => alert.alertType === "energy_wastage"
  ).length;

  const occupiedClassrooms = occupancyLogs.filter(
    (item) => item.occupancyStatus === "occupied"
  ).length;

  const unknownClassrooms = occupancyLogs.filter(
    (item) => item.occupancyStatus === "unknown"
  ).length;

  const classroomEnergyUsage = classrooms.map((classroom) => {
    const reading = energyReadings.find(
      (item) => item.classroomId === classroom.classroomId
    );

    return {
      classroomId: classroom.classroomId,
      energyKwh: reading?.energyKwh ?? null,
    };
  }).filter(
    (item) =>
      selectedClassroom === "all" ||
      item.classroomId === selectedClassroom
  );

  const energyTrend = [
    { time: "9 AM", energyKwh: 0.8 },
    { time: "10 AM", energyKwh: 1.2 },
    { time: "11 AM", energyKwh: 1.0 },
    { time: "12 PM", energyKwh: 1.7 },
    { time: "1 PM", energyKwh: 1.4 },
    { time: "2 PM", energyKwh: 1.9 },
  ];

  function downloadReport() {
    const headers = [
      "classroomId",
      "powerWatts",
      "energyKwh",
      "fanStatus",
      "lightStatus",
      "dataSource",
      "recordedAt",
    ];

    const rows = filteredReadings.map((reading) =>
      headers.map((field) => reading[field] ?? "").join(",")
    );

    const csvContent = [
      headers.join(","),
      ...rows,
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "drishti-energy-report.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">SMART CLASSROOM INTELLIGENCE</p>
          <h1>Analytics & Reports</h1>
          <p className="muted">
            Explore classroom energy data and occupancy summaries.
          </p>
        </div>

        <span className="demo-badge">● SIMULATED DATA</span>
      </header>

      <section className="panel analytics-toolbar">
        <div>
          <label htmlFor="analytics-classroom">
            Filter by classroom
          </label>

          <select
            id="analytics-classroom"
            value={selectedClassroom}
            onChange={(event) =>
              setSelectedClassroom(event.target.value)
            }
          >
            <option value="all">All classrooms</option>
            {classrooms.map((classroom) => (
              <option
                key={classroom.classroomId}
                value={classroom.classroomId}
              >
                {classroom.classroomName} ({classroom.classroomId})
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          className="report-button"
          onClick={downloadReport}
        >
          <Download size={17} />
          Export CSV
        </button>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-top">
            <span>Recorded Energy</span>
            <Zap size={21} />
          </div>
          <div className="stat-value">
            {totalEnergyKwh.toFixed(2)} kWh
          </div>
          <div className="stat-description">
            Sum of available selected readings
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span>Average Power</span>
            <Activity size={21} />
          </div>
          <div className="stat-value">
            {averagePowerWatts.toFixed(0)} W
          </div>
          <div className="stat-description">
            Average of available selected readings
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span>Occupied Classrooms</span>
            <Building2 size={21} />
          </div>
          <div className="stat-value">{occupiedClassrooms}</div>
          <div className="stat-description">
            Latest sample occupancy records
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span>Wastage Alerts</span>
            <Zap size={21} />
          </div>
          <div className="stat-value">{totalWastageEvents}</div>
          <div className="stat-description">
            Energy-wastage alert records
          </div>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="panel">
          <div className="panel-heading">
            <div>
              <h2>Energy Trend</h2>
              <p className="muted">
                Illustrative daily trend, not sensor history
              </p>
            </div>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={energyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="energyKwh"
                  name="Illustrative energy (kWh)"
                  stroke="#0f766e"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel">
          <div className="panel-heading">
            <div>
              <h2>Occupancy Summary</h2>
              <p className="muted">
                Latest sample observations
              </p>
            </div>
          </div>

          <div className="occupancy-summary">
            <div>
              <span className="summary-dot occupied-dot" />
              <span>Occupied</span>
              <strong>
                {occupiedClassrooms}
              </strong>
            </div>

            <div>
              <span className="summary-dot empty-dot" />
              <span>Empty</span>
              <strong>
                {occupancyLogs.filter(
                  (item) => item.occupancyStatus === "empty"
                ).length}
              </strong>
            </div>

            <div>
              <span className="summary-dot unknown-dot" />
              <span>Unknown</span>
              <strong>{unknownClassrooms}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="panel classroom-panel">
        <div className="panel-heading">
          <div>
            <h2>Classroom Energy Comparison</h2>
            <p className="muted">
              Energy values from available sample readings
            </p>
          </div>
        </div>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={classroomEnergyUsage}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="classroomId" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="energyKwh"
                name="Energy (kWh)"
                fill="#0f766e"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <p className="muted">
        Report values are calculated from available mock readings.
        The energy trend is illustrative. No live sensors are connected.
      </p>
    </main>
  );
}
