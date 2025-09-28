import { useState, useEffect } from "react";
import { 
  Users, 
  Target, 
  DollarSign, 
  TrendingUp,
  Calendar,
  Phone,
  Mail,
  CheckCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/ui/metric-card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

// Mock data
const revenueData = [
  { month: "Jan", revenue: 4000, deals: 24 },
  { month: "Feb", revenue: 3000, deals: 18 },
  { month: "Mar", revenue: 5000, deals: 32 },
  { month: "Apr", revenue: 4500, deals: 28 },
  { month: "May", revenue: 6000, deals: 42 },
  { month: "Jun", revenue: 5500, deals: 38 },
];

const dealStageData = [
  { name: "Prospecting", value: 35, color: "#3B82F6" },
  { name: "Qualification", value: 25, color: "#10B981" },
  { name: "Proposal", value: 20, color: "#F59E0B" },
  { name: "Closed Won", value: 15, color: "#EF4444" },
  { name: "Closed Lost", value: 5, color: "#6B7280" },
];

const recentActivities = [
  { id: 1, type: "call", contact: "John Smith", company: "Acme Corp", time: "2 hours ago" },
  { id: 2, type: "email", contact: "Sarah Johnson", company: "Tech Solutions", time: "4 hours ago" },
  { id: 3, type: "meeting", contact: "Mike Wilson", company: "Global Industries", time: "1 day ago" },
  { id: 4, type: "deal", contact: "Emma Davis", company: "StartupXYZ", time: "2 days ago" },
];

const upcomingTasks = [
  { id: 1, task: "Follow up with John Smith", due: "Today 3:00 PM", priority: "high" },
  { id: 2, task: "Prepare proposal for Acme Corp", due: "Tomorrow 10:00 AM", priority: "medium" },
  { id: 3, task: "Demo call with Tech Solutions", due: "Wednesday 2:00 PM", priority: "high" },
  { id: 4, task: "Send contract to Global Industries", due: "Friday 9:00 AM", priority: "low" },
];

export default function Dashboard() {
  const [animationDelay, setAnimationDelay] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationDelay(prev => prev + 200);
    }, 200);
    return () => clearInterval(timer);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "call": return Phone;
      case "email": return Mail;
      case "meeting": return Calendar;
      case "deal": return Target;
      default: return Calendar;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-destructive";
      case "medium": return "text-warning";
      case "low": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's an overview of your sales performance.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Contacts"
          value="1,247"
          change={{ value: 12, trend: "up" }}
          icon={Users}
          iconColor="text-primary"
        />
        <MetricCard
          title="Active Deals"
          value="89"
          change={{ value: 8, trend: "up" }}
          icon={Target}
          iconColor="text-success"
        />
        <MetricCard
          title="Monthly Revenue"
          value="$24,500"
          change={{ value: 15, trend: "up" }}
          icon={DollarSign}
          iconColor="text-warning"
        />
        <MetricCard
          title="Conversion Rate"
          value="23.4%"
          change={{ value: 2, trend: "down" }}
          icon={TrendingUp}
          iconColor="text-destructive"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'revenue' ? `$${value}` : value,
                    name === 'revenue' ? 'Revenue' : 'Deals'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Deal Pipeline */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Deal Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dealStageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dealStageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {dealStageData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Upcoming Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <div 
                    key={activity.id} 
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-smooth"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="p-2 rounded-full bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {activity.contact}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.company}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {activity.time}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <div 
                  key={task.id} 
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-smooth"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CheckCircle className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {task.task}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {task.due}
                    </p>
                  </div>
                  <div className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}