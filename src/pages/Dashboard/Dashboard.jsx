import "./Dashboard.css";
import { Activity, Users, Calendar, DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

/* ---------------- DATA ---------------- */

const statsData = [
  { title: "Total Patients", value: "2,847", change: "+12.5%", trend: "up", icon: Users },
  { title: "Appointments Today", value: "127", change: "+8.2%", trend: "up", icon: Calendar },
  { title: "Revenue (MTD)", value: "₹ 4,19,42,580", change: "+15.3%", trend: "up", icon: DollarSign },
  { title: "Occupancy Rate", value: "87%", change: "-2.1%", trend: "down", icon: Activity }
];

const patientFlowData = [
  { month: "Jan", patients: 2100, appointments: 1850 },
  { month: "Feb", patients: 2300, appointments: 2100 },
  { month: "Mar", patients: 2200, appointments: 1950 },
  { month: "Apr", patients: 2500, appointments: 2300 },
  { month: "May", patients: 2700, appointments: 2500 },
  { month: "Jun", patients: 2847, appointments: 2680 }
];

const departmentData = [
  { name: "Cardiology", patients: 450, color: "#3b82f6" },
  { name: "Orthopedics", patients: 380, color: "#10b981" },
  { name: "Pediatrics", patients: 520, color: "#f59e0b" },
  { name: "Neurology", patients: 290, color: "#8b5cf6" },
  { name: "Emergency", patients: 670, color: "#ef4444" },
  { name: "Others", patients: 537, color: "#6b7280" }
];

const revenueData = [
  { day: "Mon", revenue: 18500 },
  { day: "Tue", revenue: 22000 },
  { day: "Wed", revenue: 19800 },
  { day: "Thu", revenue: 25400 },
  { day: "Fri", revenue: 21200 },
  { day: "Sat", revenue: 16800 },
  { day: "Sun", revenue: 14200 }
];

/* ---------------- COMPONENT ---------------- */

export default function Dashboard() {
  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <h2> Dashboard</h2>
        <p>Welcome back! Here's what's happening today.</p>
      </div>

      {/* STATS */}
      <div className="stats-grid">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;

          return (
            <div className="stat-card" key={index}>
              <div className="stat-top">
                <span>{stat.title}</span>
                <Icon size={20} />
              </div>

              <h3>{stat.value}</h3>

              <div className="stat-change">
                <TrendIcon size={14} className={stat.trend} />
                <span className={stat.trend}>{stat.change}</span>
                <small>from last month</small>
              </div>
            </div>
          );
        })}
      </div>

      {/* CHARTS */}
      <div className="charts-grid">

        <div className="chart-card large">
          <h3>Patient Flow Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={patientFlowData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="patients" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
              <Area type="monotone" dataKey="appointments" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card small">
          <h3>Department Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentData}
                dataKey="patients"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {departmentData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* REVENUE */}
      <div className="chart-card full">
        <h3>Weekly Revenue</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
