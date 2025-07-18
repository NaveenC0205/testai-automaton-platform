import { useState } from "react";
import {
  Play,
  Calendar,
  Clock,
  User,
  Download,
  Eye,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  Pause,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const executions = [
  {
    id: "exec-001",
    name: "Nightly Regression Suite",
    project: "E-commerce Web App",
    status: "completed",
    result: "passed",
    startTime: "2024-01-20T02:00:00Z",
    endTime: "2024-01-20T02:45:32Z",
    duration: "45m 32s",
    executor: "Jenkins CI",
    trigger: "scheduled",
    tests: { total: 156, passed: 147, failed: 9, skipped: 0 },
    environment: "production",
    browser: "Chrome 120",
    artifacts: ["screenshots", "logs", "report"],
  },
  {
    id: "exec-002",
    name: "Mobile Payment Flow Test",
    project: "Mobile Banking App",
    status: "running",
    result: "pending",
    startTime: "2024-01-20T14:30:00Z",
    endTime: null,
    duration: "12m 15s",
    executor: "John Doe",
    trigger: "manual",
    tests: { total: 89, passed: 45, failed: 2, skipped: 0, current: 48 },
    environment: "staging",
    browser: "Mobile Safari",
    artifacts: ["logs"],
  },
  {
    id: "exec-003",
    name: "API Integration Tests",
    project: "API Gateway Tests",
    status: "completed",
    result: "failed",
    startTime: "2024-01-20T12:15:00Z",
    endTime: "2024-01-20T12:28:45Z",
    duration: "13m 45s",
    executor: "Sarah Wilson",
    trigger: "manual",
    tests: { total: 245, passed: 230, failed: 15, skipped: 0 },
    environment: "staging",
    browser: "N/A",
    artifacts: ["logs", "report", "postman-collection"],
  },
  {
    id: "exec-004",
    name: "Cross-browser UI Tests",
    project: "Dashboard UI Tests",
    status: "completed",
    result: "passed",
    startTime: "2024-01-20T09:00:00Z",
    endTime: "2024-01-20T09:32:18Z",
    duration: "32m 18s",
    executor: "GitHub Actions",
    trigger: "push",
    tests: { total: 72, passed: 72, failed: 0, skipped: 0 },
    environment: "staging",
    browser: "Multiple",
    artifacts: ["screenshots", "videos", "report"],
  },
  {
    id: "exec-005",
    name: "Performance Stress Test",
    project: "Performance Test Suite",
    status: "completed",
    result: "warning",
    startTime: "2024-01-20T06:00:00Z",
    endTime: "2024-01-20T07:15:30Z",
    duration: "1h 15m 30s",
    executor: "K6 Cloud",
    trigger: "scheduled",
    tests: { total: 45, passed: 38, failed: 4, skipped: 3 },
    environment: "production",
    browser: "N/A",
    artifacts: ["performance-report", "metrics", "logs"],
  },
];

const getStatusIcon = (status: string, result: string) => {
  if (status === "running") return Play;
  switch (result) {
    case "passed":
      return CheckCircle;
    case "failed":
      return XCircle;
    case "warning":
      return AlertCircle;
    default:
      return Clock;
  }
};

const getStatusColor = (status: string, result: string) => {
  if (status === "running") return "warning";
  switch (result) {
    case "passed":
      return "success";
    case "failed":
      return "destructive";
    case "warning":
      return "warning";
    default:
      return "secondary";
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString();
};

const getPassRate = (tests: any) => {
  if (tests.total === 0) return 0;
  return Math.round((tests.passed / tests.total) * 100);
};

export default function Executions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredExecutions = executions.filter((execution) => {
    const matchesSearch = execution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         execution.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || execution.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const runningExecutions = executions.filter(e => e.status === "running").length;
  const completedExecutions = executions.filter(e => e.status === "completed").length;
  const passedExecutions = executions.filter(e => e.result === "passed").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Test Executions
          </h1>
          <p className="text-muted-foreground">
            Monitor test runs and analyze execution history
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Results
          </Button>
          <Button className="bg-gradient-primary">
            <Play className="h-4 w-4 mr-2" />
            New Execution
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Play className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">{executions.length}</div>
                <div className="text-sm text-muted-foreground">Total Executions</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-warning" />
              <div>
                <div className="text-2xl font-bold">{runningExecutions}</div>
                <div className="text-sm text-muted-foreground">Running</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-success" />
              <div>
                <div className="text-2xl font-bold">{completedExecutions}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-success" />
              <div>
                <div className="text-2xl font-bold">{Math.round((passedExecutions / completedExecutions) * 100) || 0}%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search executions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter("all")}
          >
            All
          </Button>
          <Button
            variant={selectedFilter === "running" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter("running")}
          >
            Running
          </Button>
          <Button
            variant={selectedFilter === "completed" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter("completed")}
          >
            Completed
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Execution List */}
      <div className="space-y-4">
        {filteredExecutions.map((execution) => {
          const StatusIcon = getStatusIcon(execution.status, execution.result);
          const passRate = getPassRate(execution.tests);
          
          return (
            <Card key={execution.id} className="hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <StatusIcon className={`h-6 w-6 text-${getStatusColor(execution.status, execution.result)} mt-1`} />
                    
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{execution.name}</h3>
                        <Badge 
                          variant={getStatusColor(execution.status, execution.result) as any}
                          className="capitalize"
                        >
                          {execution.status === "running" ? "Running" : execution.result}
                        </Badge>
                        <Badge variant="outline">{execution.trigger}</Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-3">{execution.project}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Started</div>
                          <div className="font-medium">{formatDate(execution.startTime)}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Duration</div>
                          <div className="font-medium">{execution.duration}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Environment</div>
                          <div className="font-medium capitalize">{execution.environment}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Executor</div>
                          <div className="font-medium">{execution.executor}</div>
                        </div>
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
                      Report
                    </Button>
                  </div>
                </div>

                {/* Test Results */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{execution.tests.total}</div>
                    <div className="text-xs text-muted-foreground">Total Tests</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">{execution.tests.passed}</div>
                    <div className="text-xs text-muted-foreground">Passed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-destructive">{execution.tests.failed}</div>
                    <div className="text-xs text-muted-foreground">Failed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning">{execution.tests.skipped || 0}</div>
                    <div className="text-xs text-muted-foreground">Skipped</div>
                  </div>
                </div>

                {/* Progress for running tests */}
                {execution.status === "running" && execution.tests.current && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{execution.tests.current} of {execution.tests.total} tests</span>
                    </div>
                    <Progress value={(execution.tests.current / execution.tests.total) * 100} className="h-2" />
                  </div>
                )}

                {/* Pass rate for completed tests */}
                {execution.status === "completed" && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Pass Rate</span>
                      <span>{passRate}%</span>
                    </div>
                    <Progress value={passRate} className="h-2" />
                  </div>
                )}

                {/* Artifacts */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Artifacts:</span>
                  {execution.artifacts.map((artifact, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {artifact}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}