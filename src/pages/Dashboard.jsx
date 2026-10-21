
import {
  Building2,
  Users,
  DoorOpen,
  AlertTriangle,
  Zap,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  classrooms,
  occupancyLogs,
  energyReadings,
  alerts,
} from "../data/mockData";

const energyTrend = [
  { time: "9 AM", energyKwh: 0.8 },
  { time: "10 AM", energyKwh: 1.2 },
  { time: "11 AM", energyKwh: 1.0 },
  { time: "12 PM", energyKwh: 1.7 },
  { time: "1 PM", energyKwh: 1.4 },
  { time: "2 PM", energyKwh: 1.9 },
];

function StatCard({ title, value, icon: Icon, description }) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <span>{title}</span>
        <Icon size={21} />
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-description">{description}</div>
    </div>
  );
}

export default function Dashboard() {
  const totalClassrooms = classrooms.length;

  const occupiedClassrooms = occupancyLogs.filter(
    (item) => item.occupancyStatus === "occupied"
  ).length;

  const emptyClassrooms = occupancyLogs.filter(
    (item) => item.occupancyStatus === "empty"
  ).length;

  const activeAlerts = alerts.filter(
    (item) => item.alertStatus === "active"
  ).length;

  const totalPowerWatts = energyReadings.reduce(
    (total, item) => total + (item.powerWatts ?? 0),
    0
  );

  const formatNumber = (value) =>
    new Intl.NumberFormat("en-IN").format(value);

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">SMART CLASSROOM INTELLIGENCE</p>
          <h1>Dashboard</h1>
          <p className="muted">
            Monitor classroom occupancy and energy usage.
          </p>
        </div>

        <span className="demo-badge">
          ● SIMULATED DATA
        </span>
      </header>

      <section className="stats-grid">
        <StatCard
          title="Total Classrooms"
          value={totalClassrooms}
          icon={Building2}
          description="Registered classrooms"
        />

        <StatCard
          title="Occupied"
          value={occupiedClassrooms}
          icon={Users}
          description="Currently marked occupied"
        />

        <StatCard
          title="Empty"
          value={emptyClassrooms}
          icon={DoorOpen}
          description="Currently marked empty"
        />

        <StatCard
          title="Active Alerts"
          value={activeAlerts}
          icon={AlertTriangle}
          description="Alerts requiring attention"
        />
      </section>

      <section className="dashboard-grid">
        <div className="panel energy-panel">
          <div className="panel-heading">
            <div>
              <h2>Energy Consumption</h2>
              <p className="muted">
                Illustrative trend throughout the day
              </p>
            </div>
            <Zap size={23} />
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={energyTrend}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="energyKwh"
                  name="Energy (kWh)"
                  stroke="#0f766e"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel power-panel">
          <div className="panel-heading">
            <div>
              <h2>Current Power</h2>
              <p className="muted">
                Sum of available sample readings
              </p>
            </div>
            <Zap size={23} />
          </div>

          <div className="power-value">
            {formatNumber(totalPowerWatts)}
            <span> W</span>
          </div>

          <p className="muted">
            Based on available classroom readings.
            Missing readings are excluded.
          </p>

          <div className="power-note">
            This is a demonstration value, not a live
            sensor measurement.
          </div>
        </div>
      </section>

      <section className="panel classroom-panel">
        <div className="panel-heading">
          <div>
            <h2>Classroom Overview</h2>
            <p className="muted">
              Latest sample occupancy observations
            </p>
          </div>
          <span className="record-count">
            {classrooms.length} classrooms
          </span>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Classroom</th>
                <th>Building</th>
                <th>Occupancy</th>
                <th>People</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {classrooms.map((classroom) => {
                const occupancy = occupancyLogs.find(
                  (item) =>
                    item.classroomId === classroom.classroomId
                );

                const occupancyStatus =
                  occupancy?.occupancyStatus ?? "unknown";

                return (
                  <tr key={classroom.classroomId}>
                    <td>
                      <strong>{classroom.classroomName}</strong>
                      <small>{classroom.classroomId}</small>
                    </td>
                    <td>{classroom.building}</td>
                    <td>
                      <span
                        className={`status-badge ${occupancyStatus}`}
                      >
                        {occupancyStatus}
                      </span>
                    </td>
                    <td>{occupancy?.personCount ?? "—"}</td>
                    <td>
                      {classroom.isActive ? "Active" : "Inactive"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="dashboard-footer">
        <span>
          <span className="footer-dot" />
          DRISHTI monitoring interface
        </span>
        <span>Demo mode · No live sensors connected</span>
      </footer>
    </main>
  );
}
