
import {
  LayoutDashboard,
  Building2,
  Zap,
  Bell,
  ChartNoAxesCombined,
  LogIn,
  BrainCircuit,
} from "lucide-react";

const navigationItems = [
  { label: "Dashboard", icon: LayoutDashboard, page: "Dashboard" },
  { label: "Classroom Monitoring", icon: Building2, page: "ClassroomMonitoring" },
  { label: "Energy Monitoring", icon: Zap, page: "EnergyMonitoring" },
  { label: "Alerts", icon: Bell, page: "Alerts" },
  { label: "Analytics & Reports", icon: ChartNoAxesCombined, page: "AnalyticsReports" },
  { label: "Login", icon: LogIn, page: "Login" },
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <BrainCircuit size={25} />
        </div>
        <div>
          <h2>DRISHTI</h2>
          <p>SMART CLASSROOMS</p>
        </div>
      </div>

      <div className="sidebar-section-label">MAIN MENU</div>

      <nav className="sidebar-nav">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.page;

          return (
            <button
              key={item.page}
              type="button"
              className={`nav-item ${isActive ? "active" : ""}`}
              onClick={() => onNavigate(item.page)}
            >
              <Icon size={19} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-status-dot" />
        <div>
          <strong>Demo Environment</strong>
          <p>Simulated data enabled</p>
        </div>
      </div>
    </aside>
  );
}
