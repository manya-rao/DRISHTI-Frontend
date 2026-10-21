
import { useState } from "react";
import { AlertTriangle, CheckCircle2, Clock, ShieldAlert } from "lucide-react";
import { alerts as initialAlerts, classrooms } from "../data/mockData";

export default function Alerts() {
  const [alertRecords, setAlertRecords] = useState(initialAlerts);

  const activeAlerts = alertRecords.filter(
    (alert) => alert.alertStatus === "active"
  ).length;

  const acknowledgedAlerts = alertRecords.filter(
    (alert) => alert.alertStatus === "acknowledged"
  ).length;

  const resolvedAlerts = alertRecords.filter(
    (alert) => alert.alertStatus === "resolved"
  ).length;

  function acknowledgeAlert(alertId) {
    setAlertRecords((previousAlerts) =>
      previousAlerts.map((alert) =>
        alert.alertId === alertId && alert.alertStatus === "active"
          ? { ...alert, alertStatus: "acknowledged" }
          : alert
      )
    );
  }

  function resolveAlert(alertId) {
    setAlertRecords((previousAlerts) =>
      previousAlerts.map((alert) =>
        alert.alertId === alertId &&
        alert.alertStatus !== "resolved"
          ? {
              ...alert,
              alertStatus: "resolved",
              resolvedAt: new Date().toISOString(),
            }
          : alert
      )
    );
  }

  function getClassroomName(classroomId) {
    return (
      classrooms.find(
        (classroom) => classroom.classroomId === classroomId
      )?.classroomName ?? classroomId
    );
  }

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">SMART CLASSROOM INTELLIGENCE</p>
          <h1>Alerts & Notifications</h1>
          <p className="muted">
            Review classroom energy and system alerts.
          </p>
        </div>

        <span className="demo-badge">● SIMULATED DATA</span>
      </header>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-top">
            <span>Active Alerts</span>
            <AlertTriangle size={21} />
          </div>
          <div className="stat-value">{activeAlerts}</div>
          <div className="stat-description">Awaiting acknowledgement</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span>Acknowledged</span>
            <Clock size={21} />
          </div>
          <div className="stat-value">{acknowledgedAlerts}</div>
          <div className="stat-description">Reviewed alerts</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span>Resolved</span>
            <CheckCircle2 size={21} />
          </div>
          <div className="stat-value">{resolvedAlerts}</div>
          <div className="stat-description">Resolved in this session</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span>Total Alerts</span>
            <ShieldAlert size={21} />
          </div>
          <div className="stat-value">{alertRecords.length}</div>
          <div className="stat-description">Available alert records</div>
        </div>
      </section>

      <section className="panel classroom-panel">
        <div className="panel-heading">
          <div>
            <h2>Alert History</h2>
            <p className="muted">
              Acknowledge or resolve an alert to update its status.
            </p>
          </div>
          <span className="record-count">
            {alertRecords.length} records
          </span>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Alert</th>
                <th>Classroom</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {alertRecords.map((alert) => (
                <tr key={alert.alertId}>
                  <td>
                    <strong>{alert.alertType.replaceAll("_", " ")}</strong>
                    <small>{alert.alertId}</small>
                    <small>{alert.message}</small>
                  </td>

                  <td>
                    {getClassroomName(alert.classroomId)}
                    <small>{alert.classroomId}</small>
                  </td>

                  <td>
                    <span className={`status-badge ${alert.severity}`}>
                      {alert.severity}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`status-badge ${
                        alert.alertStatus === "resolved"
                          ? "occupied"
                          : alert.alertStatus === "acknowledged"
                            ? "empty"
                            : "unknown"
                      }`}
                    >
                      {alert.alertStatus}
                    </span>
                  </td>

                  <td>
                    {new Date(alert.createdAt).toLocaleString()}
                  </td>

                  <td>
                    {alert.alertStatus === "active" && (
                      <button
                        className="alert-action"
                        onClick={() => acknowledgeAlert(alert.alertId)}
                      >
                        Acknowledge
                      </button>
                    )}

                    {alert.alertStatus !== "resolved" && (
                      <button
                        className="alert-action resolve-action"
                        onClick={() => resolveAlert(alert.alertId)}
                      >
                        Resolve
                      </button>
                    )}

                    {alert.alertStatus === "resolved" && (
                      <span className="muted">Completed</span>
                    )}
                  </td>
                </tr>
              ))}

              {alertRecords.length === 0 && (
                <tr>
                  <td colSpan={6}>No alerts available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="muted">
          Changes are temporary and remain in browser memory only.
          They are not saved to MongoDB.
        </p>
      </section>
    </main>
  );
}
