import { useState } from "react";
import {
  Play,
  Save,
  FolderOpen,
  File,
  Plus,
  MoreHorizontal,
  Search,
  Settings,
  Terminal,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const fileTree = [
  {
    name: "src",
    type: "folder",
    children: [
      {
        name: "tests",
        type: "folder",
        children: [
          { name: "LoginTest.java", type: "file", language: "java", active: true },
          { name: "RegistrationTest.java", type: "file", language: "java" },
          { name: "PaymentTest.py", type: "file", language: "python" },
        ],
      },
      {
        name: "pages",
        type: "folder",
        children: [
          { name: "LoginPage.java", type: "file", language: "java" },
          { name: "HomePage.java", type: "file", language: "java" },
        ],
      },
      {
        name: "utils",
        type: "folder",
        children: [
          { name: "TestBase.java", type: "file", language: "java" },
          { name: "WebDriverManager.java", type: "file", language: "java" },
        ],
      },
    ],
  },
  {
    name: "config",
    type: "folder",
    children: [
      { name: "testng.xml", type: "file", language: "xml" },
      { name: "config.properties", type: "file", language: "properties" },
    ],
  },
];

const sampleCode = `package com.automation.tests;

import org.testng.annotations.Test;
import org.testng.Assert;
import com.automation.pages.LoginPage;
import com.automation.utils.TestBase;

public class LoginTest extends TestBase {
    
    @Test(priority = 1)
    public void testValidLogin() {
        LoginPage loginPage = new LoginPage(driver);
        
        // Navigate to login page
        driver.get("https://example.com/login");
        
        // Perform login with valid credentials
        loginPage.enterEmail("test@example.com");
        loginPage.enterPassword("password123");
        loginPage.clickLoginButton();
        
        // Verify successful login
        Assert.assertTrue(loginPage.isLoggedIn(), "User should be logged in");
    }
    
    @Test(priority = 2)
    public void testInvalidLogin() {
        LoginPage loginPage = new LoginPage(driver);
        
        // Navigate to login page
        driver.get("https://example.com/login");
        
        // Perform login with invalid credentials
        loginPage.enterEmail("invalid@example.com");
        loginPage.enterPassword("wrongpassword");
        loginPage.clickLoginButton();
        
        // Verify error message is displayed
        Assert.assertTrue(loginPage.isErrorMessageDisplayed(), 
                         "Error message should be displayed for invalid credentials");
    }
    
    @Test(priority = 3)
    public void testEmptyFieldsValidation() {
        LoginPage loginPage = new LoginPage(driver);
        
        // Navigate to login page
        driver.get("https://example.com/login");
        
        // Click login without entering credentials
        loginPage.clickLoginButton();
        
        // Verify validation messages
        Assert.assertTrue(loginPage.isEmailValidationDisplayed(), 
                         "Email validation message should be displayed");
        Assert.assertTrue(loginPage.isPasswordValidationDisplayed(), 
                         "Password validation message should be displayed");
    }
}`;

const FileTreeItem = ({ item, level = 0 }: { item: any; level?: number }) => {
  const [isExpanded, setIsExpanded] = useState(level < 2);
  
  if (item.type === "folder") {
    return (
      <div>
        <div
          className={`flex items-center gap-2 py-1 px-2 hover:bg-muted rounded cursor-pointer`}
          style={{ paddingLeft: `${level * 12 + 8}px` }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <FolderOpen className="h-4 w-4 text-primary" />
          <span className="text-sm">{item.name}</span>
        </div>
        {isExpanded && item.children && (
          <div>
            {item.children.map((child: any, index: number) => (
              <FileTreeItem key={index} item={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div
      className={`flex items-center gap-2 py-1 px-2 hover:bg-muted rounded cursor-pointer ${
        item.active ? "bg-primary/10 text-primary" : ""
      }`}
      style={{ paddingLeft: `${level * 12 + 8}px` }}
    >
      <File className="h-4 w-4" />
      <span className="text-sm">{item.name}</span>
      {item.language && (
        <Badge variant="outline" className="text-xs ml-auto">
          {item.language}
        </Badge>
      )}
    </div>
  );
};

export default function CodeEditor() {
  const [selectedFile, setSelectedFile] = useState("LoginTest.java");
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Code Editor
          </h1>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Java</Badge>
            <Badge variant="outline">Selenium</Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 mr-2" />
            Find
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button size="sm" className="bg-gradient-primary">
            <Play className="h-4 w-4 mr-2" />
            Run Test
          </Button>
        </div>
      </div>

      {/* Editor Layout */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* File Explorer */}
        <ResizablePanel defaultSize={20} minSize={15}>
          <div className="h-full p-4 border-r">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm">Explorer</h3>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            
            <div className="space-y-1">
              {fileTree.map((item, index) => (
                <FileTreeItem key={index} item={item} />
              ))}
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* Main Editor Area */}
        <ResizablePanel defaultSize={60}>
          <ResizablePanelGroup direction="vertical">
            {/* Code Editor */}
            <ResizablePanel defaultSize={isTerminalOpen ? 70 : 100}>
              <div className="h-full flex flex-col">
                {/* File Tabs */}
                <div className="flex items-center border-b bg-muted/30">
                  <div className="flex items-center gap-1 px-3 py-2 bg-background border-r">
                    <File className="h-4 w-4" />
                    <span className="text-sm">LoginTest.java</span>
                    <Button variant="ghost" size="icon" className="h-4 w-4 ml-2">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                {/* Monaco Editor Placeholder */}
                <div className="flex-1 bg-background">
                  <div className="h-full w-full p-4 font-mono text-sm">
                    <pre className="text-foreground leading-relaxed">
                      {sampleCode}
                    </pre>
                  </div>
                </div>
              </div>
            </ResizablePanel>

            {/* Terminal */}
            {isTerminalOpen && (
              <>
                <ResizableHandle />
                <ResizablePanel defaultSize={30} minSize={20}>
                  <div className="h-full bg-background border-t">
                    <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/30">
                      <div className="flex items-center gap-2">
                        <Terminal className="h-4 w-4" />
                        <span className="text-sm font-medium">Terminal</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => setIsTerminalOpen(false)}
                      >
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="p-4 font-mono text-sm">
                      <div className="text-success">$ mvn test -Dtest=LoginTest</div>
                      <div className="text-muted-foreground mt-2">
                        [INFO] Scanning for projects...<br />
                        [INFO] Building Test Automation Project 1.0-SNAPSHOT<br />
                        [INFO] --------------------------------[ jar ]---------------------------------<br />
                        [INFO] Running com.automation.tests.LoginTest<br />
                        <span className="text-success">Tests run: 3, Failures: 0, Errors: 0, Skipped: 0</span><br />
                        <span className="text-success">[INFO] BUILD SUCCESS</span>
                      </div>
                    </div>
                  </div>
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>
        </ResizablePanel>

        <ResizableHandle />

        {/* AI Assistant Panel */}
        <ResizablePanel defaultSize={20} minSize={15}>
          <div className="h-full p-4 border-l">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                AI Assistant
              </h3>
            </div>
            
            <div className="space-y-4">
              <Card className="p-3">
                <div className="text-sm font-medium mb-2">Code Suggestions</div>
                <div className="text-xs text-muted-foreground">
                  • Add explicit waits for better stability
                  • Consider using Page Factory pattern
                  • Add data-driven test support
                </div>
              </Card>
              
              <Card className="p-3">
                <div className="text-sm font-medium mb-2">Quick Actions</div>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Zap className="h-3 w-3 mr-2" />
                    Generate Test
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <File className="h-3 w-3 mr-2" />
                    Create Page Object
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Search className="h-3 w-3 mr-2" />
                    Find Issues
                  </Button>
                </div>
              </Card>
              
              <Card className="p-3">
                <div className="text-sm font-medium mb-2">Test Health</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Code Quality</span>
                    <span className="text-success">Good</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Test Coverage</span>
                    <span className="text-warning">Medium</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Maintainability</span>
                    <span className="text-success">High</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Bottom Action Bar */}
      <div className="flex items-center justify-between p-4 border-t bg-muted/30">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Line 42, Column 1</span>
          <span>Java</span>
          <span>UTF-8</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsTerminalOpen(!isTerminalOpen)}
          >
            <Terminal className="h-4 w-4 mr-2" />
            Terminal
          </Button>
          <Badge variant="success">Tests Passing</Badge>
        </div>
      </div>
    </div>
  );
}