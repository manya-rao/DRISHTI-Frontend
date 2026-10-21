
import { useState } from "react";
import { Zap, Activity, Fan, Lightbulb } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { classrooms, energyReadings } from "../data/mockData";

export default function EnergyMonitoring() {
  const [selectedClassroom, setSelectedClassroom] = useState("all");

  const filteredReadings = energyReadings.filter(
    (reading) =>
      selectedClassroom === "all" ||
      reading.classroomId === selectedClassroom
  );

  const availableReadings = filteredReadings.filter(
    (reading) => reading.powerWatts !== null
  );

  const totalPowerWatts = availableReadings.reduce(
    (total, reading) => total + reading.powerWatts,
    0
  );

  const totalEnergyKwh = filteredReadings.reduce(
    (total, reading) => total + (reading.energyKwh ?? 0),
    0
  );

  const chartData = filteredReadings.map((reading) => ({
    classroomId: reading.classroomId,
    powerWatts: reading.powerWatts,
  }));

  const knownFanStatuses = filteredReadings.filter(
    (reading) => reading.fanStatus !== "unknown"
  );

  const knownLightStatuses = filteredReadings.filter(
    (reading) => reading.lightStatus !== "unknown"
  );

  const fansOn = knownFanStatuses.filter(
    (reading) => reading.fanStatus === "on"
  ).length;

  const lightsOn = knownLightStatuses.filter(
    (reading) => reading.lightStatus === "on"
  ).length;

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">SMART CLASSROOM INTELLIGENCE</p>
          <h1>Energy Monitoring</h1>
          <p className="muted">
            Review power readings and classroom energy usage.
          </p>
        </div>

        <span className="demo-badge">● SIMULATED DATA</span>
      </header>

      <section className="panel energy-filter-panel">
        <label htmlFor="classroom-filter">Select classroom</label>
        <select
          id="classroom-filter"
          value={selectedClassroom}
          onChange={(event) => setSelectedClassroom(event.target.value)}
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
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-top">
            <span>Reported Power</span>
            <Zap size={21} />
          </div>
          <div className="stat-value">{totalPowerWatts} W</div>
          <div className="stat-description">
            Sum of available power readings
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span>Recorded Energy</span>
            <Activity size={21} />
          </div>
          <div className="stat-value">{totalEnergyKwh.toFixed(2)}</div>
          <div className="stat-description">
            kWh across the supplied reading intervals
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span>Fans Reported On</span>
            <Fan size={21} />
          </div>
          <div className="stat-value">{fansOn}</div>
          <div className="stat-description">
            Of {knownFanStatuses.length} known fan statuses
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span>Lights Reported On</span>
            <Lightbulb size={21} />
          </div>
          <div className="stat-value">{lightsOn}</div>
          <div className="stat-description">
            Of {knownLightStatuses.length} known light statuses
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Classroom Power Comparison</h2>
            <p className="muted">
              Available power readings in watts
            </p>
          </div>
          <Zap size={23} />
        </div>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="classroomId" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="powerWatts"
                name="Power (W)"
                fill="#0f766e"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="panel classroom-panel">
        <div className="panel-heading">
          <div>
            <h2>Energy Readings</h2>
            <p className="muted">
              Equipment status and available measurements
            </p>
          </div>
          <span className="record-count">
            {filteredReadings.length} records
          </span>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Classroom ID</th>
                <th>Power (W)</th>
                <th>Energy (kWh)</th>
                <th>Fan</th>
                <th>Light</th>
                <th>Source</th>
              </tr>
            </thead>

            <tbody>
              {filteredReadings.map((reading, index) => (
                <tr key={`${reading.classroomId}-${index}`}>
                  <td>{reading.classroomId}</td>
                  <td>{reading.powerWatts ?? "Unavailable"}</td>
                  <td>{reading.energyKwh ?? "Unavailable"}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        reading.fanStatus === "on"
                          ? "occupied"
                          : reading.fanStatus === "off"
                            ? "empty"
                            : "unknown"
                      }`}
                    >
                      {reading.fanStatus}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`status-badge ${
                        reading.lightStatus === "on"
                          ? "occupied"
                          : reading.lightStatus === "off"
                            ? "empty"
                            : "unknown"
                      }`}
                    >
                      {reading.lightStatus}
                    </span>
                  </td>
                  <td>{reading.dataSource}</td>
                </tr>
              ))}

              {filteredReadings.length === 0 && (
                <tr>
                  <td colSpan={6}>No energy readings available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
