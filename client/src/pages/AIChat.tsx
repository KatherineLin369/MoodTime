import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useConversations, useCreateConversation, useConversation } from "@/hooks/use-chat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Bot, User, Plus, MessageSquare, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function AIChat() {
  const { user } = useAuth();
  const { data: conversations, isLoading: loadingConvos } = useConversations();
  const { mutate: createConvo, isPending: creatingConvo } = useCreateConversation();
  
  const [activeId, setActiveId] = useState<number | null>(null);
  const [input, setInput] = useState("");
  const [streamingContent, setStreamingContent] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Select first conversation on load if none selected
  useEffect(() => {
    if (conversations && conversations.length > 0 && !activeId) {
      setActiveId(conversations[0].id);
    }
  }, [conversations, activeId]);

  const { data: activeConversation, refetch: refetchActive } = useConversation(activeId);

  const handleCreate = () => {
    createConvo("New Session", {
      onSuccess: (newConvo) => {
        setActiveId(newConvo.id);
      }
    });
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || !activeId || isStreaming) return;

    const userMsg = input;
    setInput("");
    setIsStreaming(true);
    setStreamingContent("");

    try {
      // Setup EventSource for streaming response
      const res = await fetch(`/api/conversations/${activeId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: userMsg }),
      });

      if (!res.ok) throw new Error("Failed to send");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      
      if (!reader) throw new Error("No reader");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = JSON.parse(line.slice(6));
            if (data.content) {
              setStreamingContent(prev => prev + data.content);
              // Scroll to bottom
              if (scrollRef.current) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
              }
            }
            if (data.done) {
              setIsStreaming(false);
              setStreamingContent("");
              refetchActive(); // Refresh full history
            }
          }
        }
      }
    } catch (err) {
      console.error(err);
      setIsStreaming(false);
    }
  };

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeConversation, streamingContent]);

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col md:flex-row gap-6">
      {/* Sidebar List */}
      <div className="w-full md:w-72 flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="font-bold text-slate-700">Sessions</h2>
          <Button onClick={handleCreate} size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-white hover:shadow-sm" disabled={creatingConvo}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {loadingConvos ? (
              <div className="p-4 text-center text-slate-400 text-sm">Loading...</div>
            ) : conversations?.length === 0 ? (
              <div className="p-4 text-center text-slate-400 text-sm">No sessions yet. Start a new chat!</div>
            ) : (
              conversations?.map(convo => (
                <button
                  key={convo.id}
                  onClick={() => setActiveId(convo.id)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-xl text-sm transition-all flex items-center gap-3",
                    activeId === convo.id 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "hover:bg-slate-50 text-slate-600"
                  )}
                >
                  <MessageSquare className="w-4 h-4 shrink-0 opacity-70" />
                  <span className="truncate">{convo.title || "New Chat"}</span>
                </button>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative">
        {!activeId ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
            <Bot className="w-16 h-16 mb-4 opacity-20" />
            <p>Select a session or start a new chat</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-6" ref={scrollRef}>
              {activeConversation?.messages?.map((msg) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex gap-4 max-w-3xl",
                    msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  <Avatar className={cn("w-8 h-8 shrink-0", msg.role === 'assistant' ? "bg-primary/10" : "bg-slate-100")}>
                    {msg.role === 'assistant' ? (
                      <Bot className="w-5 h-5 text-primary" />
                    ) : (
                      <AvatarImage src={user?.profileImageUrl || undefined} />
                    )}
                    <AvatarFallback>{msg.role === 'user' ? 'ME' : 'AI'}</AvatarFallback>
                  </Avatar>
                  <div className={cn(
                    "px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                    msg.role === 'user' 
                      ? "bg-primary text-primary-foreground rounded-br-none" 
                      : "bg-slate-50 text-slate-700 border border-slate-100 rounded-bl-none"
                  )}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              
              {/* Streaming Message Placeholder */}
              {isStreaming && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-4 max-w-3xl mr-auto"
                >
                  <Avatar className="w-8 h-8 shrink-0 bg-primary/10">
                    <Bot className="w-5 h-5 text-primary" />
                  </Avatar>
                  <div className="px-5 py-3 rounded-2xl rounded-bl-none text-sm leading-relaxed shadow-sm bg-slate-50 text-slate-700 border border-slate-100">
                    {streamingContent}
                    <span className="inline-block w-1.5 h-4 ml-1 bg-primary/50 animate-pulse align-middle" />
                  </div>
                </motion.div>
              )}
            </div>

            <div className="p-4 bg-white border-t border-slate-100">
              <form onSubmit={handleSend} className="relative max-w-3xl mx-auto flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="rounded-full pl-6 pr-12 py-6 border-slate-200 focus-visible:ring-primary/20 shadow-sm"
                  disabled={isStreaming}
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={!input.trim() || isStreaming}
                  className="absolute right-2 top-1.5 h-9 w-9 rounded-full bg-primary hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
                >
                  {isStreaming ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 ml-0.5" />
                  )}
                </Button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
