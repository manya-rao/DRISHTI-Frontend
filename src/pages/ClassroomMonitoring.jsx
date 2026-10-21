
import { useState } from "react";
import { Search, Users, Building2 } from "lucide-react";
import { classrooms, occupancyLogs } from "../data/mockData";

export default function ClassroomMonitoring() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredClassrooms = classrooms.filter((classroom) => {
    const occupancy = occupancyLogs.find(
      (item) => item.classroomId === classroom.classroomId
    );

    const occupancyStatus = occupancy?.occupancyStatus ?? "unknown";

    const matchesSearch =
      classroom.classroomName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      classroom.classroomId
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || occupancyStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">SMART CLASSROOM INTELLIGENCE</p>
          <h1>Classroom Monitoring</h1>
          <p className="muted">
            View classroom occupancy and building information.
          </p>
        </div>

        <span className="demo-badge">● SIMULATED DATA</span>
      </header>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-top">
            <span>Total Classrooms</span>
            <Building2 size={21} />
          </div>
          <div className="stat-value">{classrooms.length}</div>
          <div className="stat-description">Registered classrooms</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span>Occupied</span>
            <Users size={21} />
          </div>
          <div className="stat-value">
            {occupancyLogs.filter(
              (item) => item.occupancyStatus === "occupied"
            ).length}
          </div>
          <div className="stat-description">Marked as occupied</div>
        </div>
      </section>

      <section className="panel classroom-panel">
        <div className="panel-heading">
          <div>
            <h2>Classroom Directory</h2>
            <p className="muted">
              Search and filter registered classrooms.
            </p>
          </div>
          <span className="record-count">
            {filteredClassrooms.length} classrooms
          </span>
        </div>

        <div className="classroom-filters">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search by name or classroom ID..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter by occupancy status"
          >
            <option value="all">All statuses</option>
            <option value="occupied">Occupied</option>
            <option value="empty">Empty</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Classroom</th>
                <th>Building</th>
                <th>Floor</th>
                <th>Occupancy</th>
                <th>People</th>
                <th>Active</th>
              </tr>
            </thead>

            <tbody>
              {filteredClassrooms.map((classroom) => {
                const occupancy = occupancyLogs.find(
                  (item) => item.classroomId === classroom.classroomId
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
                    <td>{classroom.floor}</td>
                    <td>
                      <span className={`status-badge ${occupancyStatus}`}>
                        {occupancyStatus}
                      </span>
                    </td>
                    <td>{occupancy?.personCount ?? "—"}</td>
                    <td>{classroom.isActive ? "Yes" : "No"}</td>
                  </tr>
                );
              })}

              {filteredClassrooms.length === 0 && (
                <tr>
                  <td colSpan={6}>No matching classrooms found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
