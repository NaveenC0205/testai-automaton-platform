import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  FolderOpen,
  GitBranch,
  Calendar,
  Users,
  Activity,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const projects = [
  {
    id: 1,
    name: "E-commerce Web App",
    description: "Complete test suite for the main e-commerce platform",
    engine: "Selenium",
    language: "Java",
    status: "active",
    tests: 156,
    lastRun: "2 hours ago",
    passRate: 94.2,
    team: ["John Doe", "Jane Smith", "Mike Johnson"],
    created: "2024-01-15",
    framework: "TestNG",
  },
  {
    id: 2,
    name: "Mobile Banking App",
    description: "Cross-platform mobile testing for banking application",
    engine: "Appium",
    language: "Python",
    status: "active",
    tests: 89,
    lastRun: "30 minutes ago",
    passRate: 87.6,
    team: ["Sarah Wilson", "David Brown"],
    created: "2024-02-10",
    framework: "Pytest",
  },
  {
    id: 3,
    name: "API Gateway Tests",
    description: "Comprehensive API testing and load testing suite",
    engine: "Postman",
    language: "JavaScript",
    status: "completed",
    tests: 245,
    lastRun: "1 day ago",
    passRate: 98.1,
    team: ["Alex Turner", "Lisa Chen", "Tom Garcia", "Emily Davis"],
    created: "2023-11-20",
    framework: "Newman",
  },
  {
    id: 4,
    name: "Dashboard UI Tests",
    description: "Modern web testing with cross-browser support",
    engine: "Playwright",
    language: "TypeScript",
    status: "active",
    tests: 72,
    lastRun: "5 minutes ago",
    passRate: 91.7,
    team: ["Michael Lee", "Anna Rodriguez"],
    created: "2024-03-05",
    framework: "Playwright Test",
  },
  {
    id: 5,
    name: "Legacy System Migration",
    description: "Testing suite for legacy system modernization",
    engine: "Cypress",
    language: "JavaScript",
    status: "archived",
    tests: 134,
    lastRun: "2 weeks ago",
    passRate: 76.5,
    team: ["Robert Kim"],
    created: "2023-08-12",
    framework: "Cypress",
  },
  {
    id: 6,
    name: "Performance Test Suite",
    description: "Load and stress testing for critical applications",
    engine: "K6",
    language: "JavaScript",
    status: "active",
    tests: 45,
    lastRun: "6 hours ago",
    passRate: 88.9,
    team: ["Jennifer Wong", "Carlos Martinez", "Nina Patel"],
    created: "2024-01-30",
    framework: "K6",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "success";
    case "completed":
      return "primary";
    case "archived":
      return "secondary";
    default:
      return "secondary";
  }
};

const getEngineColor = (engine: string) => {
  switch (engine) {
    case "Selenium":
      return "primary";
    case "Playwright":
      return "secondary";
    case "Cypress":
      return "accent";
    case "Appium":
      return "warning";
    default:
      return "secondary";
  }
};

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || project.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Projects
          </h1>
          <p className="text-muted-foreground">
            Manage your testing projects and track their progress
          </p>
        </div>
        <Button className="bg-gradient-primary">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
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
            All Projects
          </Button>
          <Button
            variant={selectedFilter === "active" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter("active")}
          >
            Active
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

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <FolderOpen className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Open Project</DropdownMenuItem>
                    <DropdownMenuItem>Edit Settings</DropdownMenuItem>
                    <DropdownMenuItem>View Reports</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Archive Project
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="line-clamp-2">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                <Badge variant={getEngineColor(project.engine) as any}>
                  {project.engine}
                </Badge>
                <Badge variant="outline">{project.language}</Badge>
                <Badge variant="outline">{project.framework}</Badge>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Tests</div>
                  <div className="font-semibold">{project.tests}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Pass Rate</div>
                  <div className="font-semibold text-success">{project.passRate}%</div>
                </div>
              </div>

              {/* Team and Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {project.team.slice(0, 3).map((member, index) => (
                      <Avatar key={index} className="h-6 w-6 border-2 border-background">
                        <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                          {member.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {project.team.length > 3 && (
                      <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">
                        +{project.team.length - 3}
                      </div>
                    )}
                  </div>
                </div>
                <Badge variant={getStatusColor(project.status) as any} className="capitalize">
                  {project.status}
                </Badge>
              </div>

              {/* Last Run */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Activity className="h-3 w-3" />
                <span>Last run {project.lastRun}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <Card className="p-12 text-center">
          <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No projects found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? 'Try adjusting your search terms' : 'Get started by creating your first project'}
          </p>
          <Button className="bg-gradient-primary">
            <Plus className="h-4 w-4 mr-2" />
            Create New Project
          </Button>
        </Card>
      )}
    </div>
  );
}