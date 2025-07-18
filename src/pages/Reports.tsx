import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Filter,
  Eye,
  Share,
  FileText,
  PieChart,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const reports = [
  {
    id: 1,
    name: "Weekly Regression Report",
    type: "Automated",
    period: "Last 7 days",
    generated: "2024-01-20T08:00:00Z",
    status: "completed",
    tests: { total: 1247, passed: 1156, failed: 91, passRate: 92.7 },
    projects: ["E-commerce Web App", "Mobile Banking App", "API Gateway"],
    trends: { passRate: +2.3, duration: -8.5, coverage: +1.2 },
    format: "PDF",
    size: "2.4 MB",
  },
  {
    id: 2,
    name: "Mobile App Performance Analysis",
    type: "Custom",
    period: "Last 30 days",
    generated: "2024-01-19T15:30:00Z",
    status: "completed",
    tests: { total: 356, passed: 298, failed: 58, passRate: 83.7 },
    projects: ["Mobile Banking App"],
    trends: { passRate: -1.8, duration: +12.3, coverage: +0.5 },
    format: "HTML",
    size: "1.8 MB",
  },
  {
    id: 3,
    name: "API Gateway Reliability Report",
    type: "Scheduled",
    period: "Last 14 days",
    generated: "2024-01-20T02:00:00Z",
    status: "completed",
    tests: { total: 490, passed: 476, failed: 14, passRate: 97.1 },
    projects: ["API Gateway Tests"],
    trends: { passRate: +0.8, duration: -3.2, coverage: +0.1 },
    format: "JSON",
    size: "0.9 MB",
  },
  {
    id: 4,
    name: "Cross-Browser Compatibility Summary",
    type: "Automated",
    period: "Last 7 days",
    generated: "2024-01-20T09:15:00Z",
    status: "generating",
    tests: { total: 216, passed: 198, failed: 18, passRate: 91.7 },
    projects: ["Dashboard UI Tests", "E-commerce Web App"],
    trends: { passRate: +1.5, duration: -5.1, coverage: +2.3 },
    format: "PDF",
    size: "Generating...",
  },
  {
    id: 5,
    name: "Load Testing Performance Report",
    type: "Manual",
    period: "Last 30 days",
    generated: "2024-01-19T14:20:00Z",
    status: "completed",
    tests: { total: 89, passed: 67, failed: 22, passRate: 75.3 },
    projects: ["Performance Test Suite"],
    trends: { passRate: -3.2, duration: +18.7, coverage: -0.8 },
    format: "HTML",
    size: "3.1 MB",
  },
];

const metrics = [
  {
    title: "Overall Pass Rate",
    value: "89.4%",
    change: "+2.1%",
    trend: "up",
    description: "Across all projects",
  },
  {
    title: "Average Test Duration",
    value: "4.2m",
    change: "-12s",
    trend: "down",
    description: "Per test execution",
  },
  {
    title: "Test Coverage",
    value: "78.6%",
    change: "+1.8%",
    trend: "up",
    description: "Code coverage",
  },
  {
    title: "Active Projects",
    value: "6",
    change: "+1",
    trend: "up",
    description: "With recent activity",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "success";
    case "generating":
      return "warning";
    case "failed":
      return "destructive";
    default:
      return "secondary";
  }
};

const getTrendColor = (trend: string) => {
  return trend === "up" ? "text-success" : "text-destructive";
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

export default function Reports() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");
  const [selectedProject, setSelectedProject] = useState("all");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Reports & Analytics
          </h1>
          <p className="text-muted-foreground">
            Generate insights and track testing performance over time
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Report
          </Button>
          <Button className="bg-gradient-primary">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="14d">Last 14 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={selectedProject} onValueChange={setSelectedProject}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select project" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            <SelectItem value="ecommerce">E-commerce Web App</SelectItem>
            <SelectItem value="mobile">Mobile Banking App</SelectItem>
            <SelectItem value="api">API Gateway Tests</SelectItem>
            <SelectItem value="dashboard">Dashboard UI Tests</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className={getTrendColor(metric.trend)}>
                  {metric.change}
                </span>
                <span>from last period</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Test Execution Trends</CardTitle>
            <CardDescription>Pass rates and execution counts over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Chart visualization would be here</p>
                <p className="text-sm text-muted-foreground">Integration with charting library needed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Distribution</CardTitle>
            <CardDescription>Test execution by project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { project: "E-commerce Web App", tests: 450, percentage: 38 },
                { project: "Mobile Banking App", tests: 320, percentage: 27 },
                { project: "API Gateway Tests", tests: 280, percentage: 24 },
                { project: "Dashboard UI Tests", tests: 130, percentage: 11 },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{item.project}</span>
                    <span className="text-muted-foreground">{item.tests} tests ({item.percentage}%)</span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <CardTitle>Generated Reports</CardTitle>
          <CardDescription>Recent and scheduled test reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <FileText className="h-6 w-6 text-primary mt-1" />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{report.name}</h3>
                      <Badge variant={getStatusColor(report.status) as any} className="capitalize">
                        {report.status}
                      </Badge>
                      <Badge variant="outline">{report.type}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div>
                        <span>Period: {report.period}</span>
                      </div>
                      <div>
                        <span>Generated: {formatDate(report.generated)}</span>
                      </div>
                      <div>
                        <span>Pass Rate: {report.tests.passRate}%</span>
                      </div>
                      <div>
                        <span>Size: {report.size}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-muted-foreground">Projects:</span>
                      {report.projects.map((project, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {project}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}