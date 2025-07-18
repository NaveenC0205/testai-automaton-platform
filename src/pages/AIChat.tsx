import { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  Sparkles,
  Code,
  TestTube,
  Zap,
  FileText,
  Copy,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  actions?: string[];
}

const suggestedPrompts = [
  {
    icon: TestTube,
    title: "Generate Test Cases",
    prompt: "Generate comprehensive test cases for a login form with email and password fields",
    category: "Test Generation",
  },
  {
    icon: Code,
    title: "Page Object Model",
    prompt: "Create a Page Object Model class for an e-commerce product page using Selenium WebDriver",
    category: "Code Generation",
  },
  {
    icon: Zap,
    title: "Debug Test Failure",
    prompt: "Help me debug why my Playwright test is failing with 'Element not found' error",
    category: "Debugging",
  },
  {
    icon: FileText,
    title: "Test Strategy",
    prompt: "Create a test automation strategy for a new microservices architecture",
    category: "Strategy",
  },
];

const initialMessages: Message[] = [
  {
    id: "1",
    type: "assistant",
    content: "Hello! I'm your AI testing assistant. I can help you with:\n\n• **Test Case Generation** - Create comprehensive test scenarios\n• **Code Generation** - Generate Page Object Models, test scripts, and utilities\n• **Test Debugging** - Analyze failures and suggest fixes\n• **Best Practices** - Provide guidance on testing strategies\n• **Framework Support** - Help with Selenium, Playwright, Cypress, and more\n\nHow can I assist you today?",
    timestamp: new Date(),
    actions: ["👋 Get Started", "📚 View Examples", "⚙️ Configure Settings"],
  },
];

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: generateMockResponse(message),
        timestamp: new Date(),
        actions: ["📋 Copy Code", "🔄 Regenerate", "👍 Helpful"],
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateMockResponse = (userMessage: string): string => {
    if (userMessage.toLowerCase().includes("test case")) {
      return "Here are comprehensive test cases for a login form:\n\n**Positive Test Cases:**\n• Valid email and password combination\n• Login with remember me option\n• Successful redirect after login\n\n**Negative Test Cases:**\n• Invalid email format\n• Empty password field\n• Account lockout after multiple failures\n\n**Edge Cases:**\n• Special characters in password\n• Maximum length inputs\n• SQL injection attempts\n\nWould you like me to generate the actual test code for any specific framework?";
    }
    
    if (userMessage.toLowerCase().includes("page object")) {
      return "Here's a Page Object Model example for an e-commerce product page:\n\n```java\npublic class ProductPage {\n    private WebDriver driver;\n    \n    @FindBy(id = \"product-title\")\n    private WebElement productTitle;\n    \n    @FindBy(className = \"add-to-cart\")\n    private WebElement addToCartButton;\n    \n    @FindBy(css = \".price .current\")\n    private WebElement currentPrice;\n    \n    public ProductPage(WebDriver driver) {\n        this.driver = driver;\n        PageFactory.initElements(driver, this);\n    }\n    \n    public String getProductTitle() {\n        return productTitle.getText();\n    }\n    \n    public void addToCart() {\n        addToCartButton.click();\n    }\n}\n```\n\nThis follows the Page Object Model pattern with clear separation of concerns and reusable methods.";
    }
    
    return "I understand you're looking for help with test automation. Let me provide you with a comprehensive solution:\n\n• **Analysis**: I've analyzed your request and identified the key requirements\n• **Solution**: Here's a step-by-step approach to address your needs\n• **Best Practices**: Following industry standards and patterns\n• **Implementation**: Ready-to-use code examples\n\nWould you like me to dive deeper into any specific aspect?";
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInputValue(prompt);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 pb-6 border-b">
        <div className="p-2 bg-gradient-primary rounded-lg">
          <Bot className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            AI Testing Assistant
          </h1>
          <p className="text-muted-foreground">
            Generate tests, debug code, and get expert guidance
          </p>
        </div>
        <div className="ml-auto">
          <Badge className="bg-accent text-accent-foreground">
            <Sparkles className="h-3 w-3 mr-1" />
            AI Powered
          </Badge>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex gap-6 pt-6">
        {/* Suggested Prompts Sidebar */}
        <div className="w-80 space-y-4">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
            Quick Start
          </h3>
          <div className="space-y-3">
            {suggestedPrompts.map((prompt, index) => (
              <Card
                key={index}
                className="p-4 cursor-pointer hover:shadow-md transition-all group"
                onClick={() => handleSuggestedPrompt(prompt.prompt)}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-muted rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <prompt.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm mb-1">{prompt.title}</div>
                    <div className="text-xs text-muted-foreground line-clamp-2">
                      {prompt.prompt}
                    </div>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {prompt.category}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.type === "assistant" && (
                    <Avatar className="h-8 w-8 bg-primary">
                      <AvatarFallback>
                        <Bot className="h-5 w-5 text-primary-foreground" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div
                    className={`max-w-[80%] ${
                      message.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    } rounded-2xl px-4 py-3`}
                  >
                    <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                    
                    {message.actions && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.actions.map((action, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs bg-background/50 hover:bg-background/80"
                          >
                            {action}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>

                  {message.type === "user" && (
                    <Avatar className="h-8 w-8 bg-secondary">
                      <AvatarFallback>
                        <User className="h-5 w-5 text-secondary-foreground" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-4">
                  <Avatar className="h-8 w-8 bg-primary">
                    <AvatarFallback>
                      <Bot className="h-5 w-5 text-primary-foreground" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-1">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                      <span className="text-sm text-muted-foreground ml-2">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t pt-4 mt-4">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about test automation..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isLoading}
                className="bg-gradient-primary"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              Press Enter to send, Shift+Enter for new line
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}