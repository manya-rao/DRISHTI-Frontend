
import { useState } from "react";

import Dashboard from "./pages/Dashboard";
import ClassroomMonitoring from "./pages/ClassroomMonitoring";
import EnergyMonitoring from "./pages/EnergyMonitoring";
import Alerts from "./pages/Alerts";
import AnalyticsReports from "./pages/AnalyticsReports";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  function handleLogin() {
    setIsLoggedIn(true);
    setActivePage("Dashboard");
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setActivePage("Dashboard");
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-layout">
      <Sidebar
        activePage={activePage}
        onNavigate={(page) => {
          if (page === "Logout") {
            handleLogout();
          } else {
            setActivePage(page);
          }
        }}
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
      </div>
    </div>
  );
}
