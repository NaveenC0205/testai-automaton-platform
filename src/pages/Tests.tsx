import { useState } from "react";
import {
  Play,
  Pause,
  Square,
  MoreHorizontal,
  Search,
  Filter,
  Plus,
  TestTube,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

const tests = [
  {
    id: 1,
    name: "User Authentication Flow",
    description: "Complete login and logout functionality testing",
    project: "E-commerce Web App",
    type: "E2E",
    status: "passed",
    lastRun: "2 hours ago",
    duration: "3m 45s",
    engine: "Selenium",
    priority: "high",
    author: "John Doe",
    steps: 12,
    assertions: 8,
  },
  {
    id: 2,
    name: "Mobile Payment Processing",
    description: "Test payment gateway integration on mobile devices",
    project: "Mobile Banking App",
    type: "Integration",
    status: "failed",
    lastRun: "1 hour ago",
    duration: "7m 12s",
    engine: "Appium",
    priority: "critical",
    author: "Sarah Wilson",
    steps: 18,
    assertions: 15,
  },
  {
    id: 3,
    name: "API Rate Limiting",
    description: "Verify API rate limiting functionality",
    project: "API Gateway Tests",
    type: "API",
    status: "running",
    lastRun: "Running...",
    duration: "2m 30s",
    engine: "Postman",
    priority: "medium",
    author: "Alex Turner",
    steps: 6,
    assertions: 4,
  },
  {
    id: 4,
    name: "Cross-browser Compatibility",
    description: "Test UI consistency across different browsers",
    project: "Dashboard UI Tests",
    type: "UI",
    status: "passed",
    lastRun: "30 minutes ago",
    duration: "12m 18s",
    engine: "Playwright",
    priority: "medium",
    author: "Michael Lee",
    steps: 25,
    assertions: 20,
  },
  {
    id: 5,
    name: "Load Performance Test",
    description: "Stress test for high traffic scenarios",
    project: "Performance Test Suite",
    type: "Performance",
    status: "warning",
    lastRun: "4 hours ago",
    duration: "45m 30s",
    engine: "K6",
    priority: "high",
    author: "Jennifer Wong",
    steps: 8,
    assertions: 12,
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "passed":
      return CheckCircle;
    case "failed":
      return XCircle;
    case "running":
      return Play;
    case "warning":
      return AlertCircle;
    default:
      return Clock;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "passed":
      return "success";
    case "failed":
      return "destructive";
    case "running":
      return "warning";
    case "warning":
      return "warning";
    default:
      return "secondary";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "critical":
      return "destructive";
    case "high":
      return "warning";
    case "medium":
      return "primary";
    case "low":
      return "secondary";
    default:
      return "secondary";
  }
};

export default function Tests() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredTests = tests.filter((test) => {
    const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || test.type.toLowerCase() === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const runningTests = tests.filter(test => test.status === "running").length;
  const passedTests = tests.filter(test => test.status === "passed").length;
  const failedTests = tests.filter(test => test.status === "failed").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Test Suite
          </h1>
          <p className="text-muted-foreground">
            Manage and execute your automated tests
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Play className="h-4 w-4 mr-2" />
            Run All
          </Button>
          <Button className="bg-gradient-primary">
            <Plus className="h-4 w-4 mr-2" />
            New Test
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TestTube className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">{tests.length}</div>
                <div className="text-sm text-muted-foreground">Total Tests</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Play className="h-8 w-8 text-warning" />
              <div>
                <div className="text-2xl font-bold">{runningTests}</div>
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
                <div className="text-2xl font-bold">{passedTests}</div>
                <div className="text-sm text-muted-foreground">Passed</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <XCircle className="h-8 w-8 text-destructive" />
              <div>
                <div className="text-2xl font-bold">{failedTests}</div>
                <div className="text-sm text-muted-foreground">Failed</div>
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
            placeholder="Search tests..."
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
            All Tests
          </Button>
          <Button
            variant={selectedFilter === "e2e" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter("e2e")}
          >
            E2E
          </Button>
          <Button
            variant={selectedFilter === "api" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter("api")}
          >
            API
          </Button>
          <Button
            variant={selectedFilter === "ui" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter("ui")}
          >
            UI
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Test List */}
      <div className="space-y-4">
        {filteredTests.map((test) => {
          const StatusIcon = getStatusIcon(test.status);
          return (
            <Card key={test.id} className="hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <StatusIcon className={`h-6 w-6 text-${getStatusColor(test.status)} mt-1`} />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{test.name}</h3>
                        <Badge variant={getPriorityColor(test.priority) as any} className="capitalize">
                          {test.priority}
                        </Badge>
                        <Badge variant="outline">{test.type}</Badge>
                        <Badge variant="secondary">{test.engine}</Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-3">{test.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Project</div>
                          <div className="font-medium">{test.project}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Duration</div>
                          <div className="font-medium">{test.duration}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Steps/Assertions</div>
                          <div className="font-medium">{test.steps}/{test.assertions}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Last Run</div>
                          <div className="font-medium">{test.lastRun}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {test.status === "running" && (
                      <Button variant="outline" size="sm">
                        <Square className="h-4 w-4" />
                      </Button>
                    )}
                    {test.status !== "running" && (
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4" />
                      </Button>
                    )}
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Test</DropdownMenuItem>
                        <DropdownMenuItem>View History</DropdownMenuItem>
                        <DropdownMenuItem>Clone Test</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete Test
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {test.status === "running" && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>Step 8 of {test.steps}</span>
                    </div>
                    <Progress value={(8 / test.steps) * 100} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}