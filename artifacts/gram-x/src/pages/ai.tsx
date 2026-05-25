import { useAiChat } from "@workspace/api-client-react";
import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, User, Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = { role: "user" | "ai"; text: string };

const QUICK_PROMPTS = [
  "Best crop for monsoon in UP?",
  "Pest control for rice",
  "PM Kisan scheme details",
  "Wheat price near me"
];

export default function AiChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "Namaste! I am your Gram_X assistant. Ask me anything about farming, weather, schemes, or crop advice." }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const chatMutation = useAiChat();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim() || chatMutation.isPending) return;

    const userMsg = text.trim();
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setInput("");

    chatMutation.mutate({ data: { message: userMsg, language: "en" } }, {
      onSuccess: (data) => {
        setMessages(prev => [...prev, { role: "ai", text: data.reply }]);
      },
      onError: () => {
        setMessages(prev => [...prev, { role: "ai", text: "Sorry, I had trouble processing that. Please try again." }]);
      }
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-muted/20 relative">
      <header className="p-4 bg-background border-b z-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-accent/20 text-accent flex items-center justify-center">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-primary leading-tight">Gram_X Assistant</h1>
          <p className="text-xs text-muted-foreground">Always ready to help</p>
        </div>
      </header>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4 pb-4">
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-accent/20 text-accent"}`}>
                  {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`p-3 rounded-2xl text-sm ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-card border shadow-sm rounded-tl-sm"}`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {chatMutation.isPending && (
             <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="flex gap-3 max-w-[85%]"
           >
             <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0">
               <Bot className="w-4 h-4" />
             </div>
             <div className="p-4 rounded-2xl bg-card border shadow-sm rounded-tl-sm flex gap-1">
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
             </div>
           </motion.div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 bg-background border-t space-y-3">
        {messages.length < 3 && (
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
            {QUICK_PROMPTS.map(prompt => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-3 py-1.5 bg-muted hover:bg-muted/80 text-xs rounded-full flex items-center gap-1.5 transition-colors border text-foreground"
              >
                <Sparkles className="w-3 h-3 text-accent" />
                {prompt}
              </button>
            ))}
          </div>
        )}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
          className="flex gap-2"
        >
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..." 
            className="rounded-full bg-muted/50 border-transparent focus-visible:ring-primary focus-visible:bg-background"
            disabled={chatMutation.isPending}
          />
          <Button type="submit" size="icon" className="rounded-full shrink-0" disabled={!input.trim() || chatMutation.isPending}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
