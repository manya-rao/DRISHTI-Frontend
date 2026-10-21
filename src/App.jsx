
import { useState } from "react";

import Dashboard from "./pages/Dashboard";
import ClassroomMonitoring from "./pages/ClassroomMonitoring";
import EnergyMonitoring from "./pages/EnergyMonitoring";
import Alerts from "./pages/Alerts";
import AnalyticsReports from "./pages/AnalyticsReports";
import Login from "./pages/Login";

import Sidebar from "./components/Sidebar";

export default function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  return (
    <div className="app-layout">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <div className="app-main">
        {activePage === "Dashboard" && <Dashboard />}

        {activePage === "ClassroomMonitoring" && (
          <ClassroomMonitoring />
        )}

        {activePage === "EnergyMonitoring" && (
          <EnergyMonitoring />
        )}

        {activePage === "Alerts" && <Alerts />}

        {activePage === "AnalyticsReports" && (
          <AnalyticsReports />
        )}

        {activePage === "Login" && <Login />}
      </div>
    </div>
  );
}
