import { useState } from "react";
import {
  Activity,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Play,
  Users,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const stats = [
  {
    title: "Total Tests",
    value: "2,847",
    change: "+12.5%",
    trend: "up",
    icon: Activity,
    color: "primary",
  },
  {
    title: "Pass Rate",
    value: "94.2%",
    change: "+2.1%",
    trend: "up",
    icon: CheckCircle,
    color: "success",
  },
  {
    title: "Active Projects",
    value: "23",
    change: "+3",
    trend: "up",
    icon: Users,
    color: "secondary",
  },
  {
    title: "Avg. Execution Time",
    value: "4.2m",
    change: "-15s",
    trend: "down",
    icon: Clock,
    color: "accent",
  },
];

const recentActivity = [
  {
    id: 1,
    project: "E-commerce Web App",
    test: "Login Flow Test",
    status: "passed",
    duration: "2m 15s",
    timestamp: "2 minutes ago",
    engine: "Selenium",
  },
  {
    id: 2,
    project: "Mobile Banking App",
    test: "Payment Processing",
    status: "failed",
    duration: "5m 43s",
    timestamp: "5 minutes ago",
    engine: "Appium",
  },
  {
    id: 3,
    project: "API Gateway",
    test: "Load Test Suite",
    status: "passed",
    duration: "12m 30s",
    timestamp: "15 minutes ago",
    engine: "K6",
  },
  {
    id: 4,
    project: "Dashboard UI",
    test: "Cross-browser Test",
    status: "running",
    duration: "3m 20s",
    timestamp: "20 minutes ago",
    engine: "Playwright",
  },
];

const quickActions = [
  {
    title: "Run Quick Test",
    description: "Execute a fast smoke test",
    icon: Play,
    action: "run-test",
    variant: "primary" as const,
  },
  {
    title: "Generate AI Test",
    description: "Create tests with AI assistance",
    icon: Zap,
    action: "ai-generate",
    variant: "secondary" as const,
  },
  {
    title: "New Project",
    description: "Start a new testing project",
    icon: Users,
    action: "new-project",
    variant: "outline" as const,
  },
];

export default function Dashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "passed":
        return "success";
      case "failed":
        return "destructive";
      case "running":
        return "warning";
      default:
        return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
        return CheckCircle;
      case "failed":
        return XCircle;
      case "running":
        return Play;
      default:
        return Clock;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor your testing pipeline and track performance metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Export Report
          </Button>
          <Button className="bg-gradient-primary">
            <Play className="h-4 w-4 mr-2" />
            Run Tests
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickActions.map((action) => (
          <Card key={action.action} className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <action.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 text-${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className={`text-${stat.trend === "up" ? "success" : "warning"}`}>
                  {stat.change}
                </span>
                <span>from last week</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity and Test Execution Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Test Executions</CardTitle>
            <CardDescription>Latest test runs across all projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const StatusIcon = getStatusIcon(activity.status);
                return (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <StatusIcon className={`h-5 w-5 text-${getStatusColor(activity.status)}`} />
                      <div>
                        <div className="font-medium">{activity.test}</div>
                        <div className="text-sm text-muted-foreground">
                          {activity.project} • {activity.engine}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={getStatusColor(activity.status) as any} className="mb-1">
                        {activity.status}
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        {activity.duration} • {activity.timestamp}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Test Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Test Engine Distribution</CardTitle>
            <CardDescription>Usage across different engines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { engine: "Selenium", percentage: 45, color: "primary" },
                { engine: "Playwright", percentage: 30, color: "secondary" },
                { engine: "Cypress", percentage: 15, color: "accent" },
                { engine: "Appium", percentage: 10, color: "warning" },
              ].map((item) => (
                <div key={item.engine} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{item.engine}</span>
                    <span className="text-muted-foreground">{item.percentage}%</span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}