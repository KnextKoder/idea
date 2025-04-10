"use client"
import { TypeAnimation } from "react-type-animation"
import type React from "react"

import { Paperclip, StarsIcon, ChevronRight, User, Bot, PanelRightOpen, ChevronDown } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SidePanel } from "@/components/sidepanel"

// Chat message interface
interface ChatMessage {
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

// Chat message component
const ChatMessage = ({ message }: { message: ChatMessage }) => {
  return (
    <div className={cn(
      "flex items-start gap-3 mb-6 group",
      message.type === 'user' ? "justify-start" : "justify-start"
    )}>
      <div className={cn(
        "rounded-lg w-6 h-6 flex items-center justify-center shrink-0 mt-0.5",
        message.type === 'user' ? "bg-[#FFD700] text-black" : "bg-blue-500 text-white"
      )}>
        {message.type === 'user' ? <User size={14} /> : <Bot size={14} />}
      </div>
      <div className="flex-1 min-w-0 translate-y-[0.5px]">
        <div className="font-medium text-xs mb-1 text-gray-300">
          {message.type === 'user' ? 'You' : 'Idea0'}
        </div>
        <div className={cn(
          "prose prose-sm prose-gray min-w-0 break-words whitespace-pre-line",
          message.type === 'user' ? "text-white" : "text-white"
        )}>
          {message.content}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-background w-fit items-center gap-1 rounded-[10px] p-1 shadow-sm pointer-events-auto sticky top-3 flex -translate-y-1.5 md:top-5">
          <button className="h-6 min-w-6 rounded-md px-1 text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 border-transparent bg-transparent">
            <svg className="pointer-events-none" height="16" width="16">
              <path fillRule="evenodd" clipRule="evenodd" d="M2.75 0.5C1.7835 0.5 1 1.2835 1 2.25V9.75C1 10.7165 1.7835 11.5 2.75 11.5H3.75H4.5V10H3.75H2.75C2.61193 10 2.5 9.88807 2.5 9.75V2.25C2.5 2.11193 2.61193 2 2.75 2H8.25C8.38807 2 8.5 2.11193 8.5 2.25V3H10V2.25C10 1.2835 9.2165 0.5 8.25 0.5H2.75ZM7.75 4.5C6.7835 4.5 6 5.2835 6 6.25V13.75C6 14.7165 6.7835 15.5 7.75 15.5H13.25C14.2165 15.5 15 14.7165 15 13.75V6.25C15 5.2835 14.2165 4.5 13.25 4.5H7.75ZM7.5 6.25C7.5 6.11193 7.61193 6 7.75 6H13.25C13.3881 6 13.5 6.11193 13.5 6.25V13.75C13.5 13.8881 13.3881 14 13.25 14H7.75C7.61193 14 7.5 13.8881 7.5 13.75V6.25Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Homepage() {
  const [isAnimating, setIsAnimating] = useState(true)
  const [inputValue, setInputValue] = useState("")
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [inChatMode, setInChatMode] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [showScrollButton, setShowScrollButton] = useState(false)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  
  // Monitor scroll position to show/hide scroll button
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const atBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!atBottom && scrollHeight > clientHeight + 200);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    const scrollToBottom = () => {
      const container = messagesContainerRef.current;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    };

    if (chatMessages.length > 0) {
      scrollToBottom();
    }
  }, [chatMessages, isLoading]);

  // Handler function to update input value state
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(event.target.value)
  }

  // Handler function to scroll to bottom
  const scrollToBottom = () => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  // Handler function to handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!inputValue.trim()) return
    
    // Create user message
    const userMessage: ChatMessage = {
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }
    
    // Add user message to chat
    setChatMessages(prev => [...prev, userMessage])
    
    // Show loading state
    setIsLoading(true)
    
    // Enter chat mode if not already
    if (!inChatMode) {
      setInChatMode(true)
    }

    // Simulate API call or content generation
    setTimeout(() => {
      // Generate mock content based on input
      const mockGeneratedContent = `Here's an idea based on "${inputValue}": 
      
      ${
        inputValue.length > 20
          ? inputValue
          : "A platform that helps entrepreneurs validate their business ideas through rapid prototyping and user feedback loops. The system would provide tools for creating mockups, gathering market research, and connecting with potential early adopters."
      }
      
      This concept has potential for ${Math.floor(Math.random() * 5) + 1} revenue streams and could reach profitability within ${Math.floor(Math.random() * 24) + 6} months with proper execution.`

      setGeneratedContent(mockGeneratedContent)
      
      // Create AI response with summary
      const aiMessage: ChatMessage = {
        type: 'ai',
        content: `I've generated an idea based on your input. This concept has potential for multiple revenue streams and could reach profitability with proper execution. Check the full details in the side panel.`,
        timestamp: new Date()
      }
      
      // Add AI message to chat
      setChatMessages(prev => [...prev, aiMessage])
      setIsLoading(false)
      setIsPanelOpen(true)
      setInputValue("")
    }, 1500)
  }

  const toggleSidePanel = () => {
    setIsPanelOpen(prev => !prev)
  }

  return (
    <div className="flex min-h-screen bg-black text-white font-sans ">
      {/* Main content area */}
      <div
        className={cn(
          "flex flex-col transition-all duration-300 h-screen relative",
          isPanelOpen ? "md:w-1/2 lg:w-3/5" : "w-full",
          inChatMode ? "items-stretch" : "items-center justify-center"
        )}
      >
        {!inChatMode ? (
          // Initial landing UI
          <div className="w-full max-w-4xl p-4">
            <h1 className="font-heading text-pretty text-center text-[29px] font-semibold tracking-tighter sm:text-[32px] md:text-[46px] text-5xl mb-12 flex flex-wrap justify-center items-center gap-x-2">
              <span className="mr-1">What&apos;s your next</span>
              <span className="text-[#FFD700] inline-flex min-w-[100px]">
                <TypeAnimation
                  sequence={[
                    "$1,000",
                    () => setIsAnimating(false),
                    1000,
                    () => setIsAnimating(true),
                    "$100K",
                    () => setIsAnimating(false),
                    1000,
                    () => setIsAnimating(true),
                    "$1M+",
                    () => setIsAnimating(false),
                    1000,
                    () => setIsAnimating(true),
                  ]}
                  wrapper="span"
                  cursor={isAnimating}
                  repeat={Number.POSITIVE_INFINITY}
                  className="min-w-fit"
                />
              </span>
              <span>idea?</span>
            </h1>

            <div className="relative mb-6">
              <form onSubmit={handleSubmit}>
                <div className="rounded-2xl border border-gray-500 bg-black p-3">
                  <div className="flex items-center">
                    <input
                      type="text"
                      placeholder="Brainstorm with Idea0..."
                      className="flex-1 outline-none text-white placeholder-gray-500 py-2 px-1 bg-black"
                      value={inputValue}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mt-2 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="p-2 text-white hover:bg-gray-800 hover:rounded-lg hover:text-[#FFD700] transition-colors disabled:text-gray-700"
                        disabled={inputValue.length < 10}
                        onClick={() => console.log("enhancing prompt")}
                      >
                        <StarsIcon className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        className="p-2 text-gray-700 hover:bg-gray-800 hover:rounded-lg hover:text-white transition-colors"
                      >
                        <Paperclip className="w-5 h-5" />
                      </button>
                    </div>

                    <Button
                      type="submit"
                      className="bg-[#FFD700] text-black hover:bg-[#E6C200] px-4 py-2 rounded-lg"
                      disabled={inputValue.length < 3 || isLoading}
                    >
                      {isLoading ? "Generating..." : "Generate"}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : (
          // Chat interface
          <div className="flex flex-col h-full w-full relative">
            {/* Chat header */}
            <div className="flex items-center justify-between py-3 px-4 border-b border-gray-800 bg-black sticky top-0 z-20">
              <h2 className="text-xl font-medium">Idea0 Chat</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleSidePanel} 
                className={cn(
                  "hover:bg-gray-800 rounded-md",
                  isPanelOpen ? "text-[#FFD700]" : "text-gray-400"
                )}
              >
                <PanelRightOpen className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Scroll to bottom button */}
            {showScrollButton && (
              <div className="absolute inset-x-0 bottom-28 z-20 m-auto flex w-fit items-center justify-center">
                <button 
                  onClick={scrollToBottom}
                  className="animate-bounce shadow-base bg-background hover:bg-gray-800 flex size-7 items-center justify-center rounded-full text-gray-500 drop-shadow-md"
                  type="button"
                >
                  <ChevronDown className="size-5" />
                </button>
              </div>
            )}
            
            {/* Chat messages */}
            <div 
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto no-scrollbar scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
              style={{ scrollBehavior: 'smooth' }}
              role="list"
              aria-label="Chat messages"
            >
              <div className="from-background via-background/75 pointer-events-none absolute left-0 right-4 top-0 z-10 h-8 bg-gradient-to-b to-transparent"></div>
              <div className="mx-auto w-full max-w-3xl px-4 py-3 pb-40">
                {chatMessages.map((message, index) => (
                  <ChatMessage key={index} message={message} />
                ))}
                
                {isLoading && (
                  <div className="flex items-start gap-3 mb-6">
                    <div className="rounded-lg w-6 h-6 bg-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot size={14} className="text-white" />
                    </div>
                    <div className="flex space-x-2 items-center">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Persistent input form - fixed at bottom */}
            <div className="relative z-10 flex w-full flex-col bg-transparent mx-auto max-w-3xl px-2 sm:px-3 md:px-4 pb-0 sm:pb-0 md:pb-0">
                <div className="rounded-b-xl peer-has-[.banner]:bg-black">
                  <form onSubmit={handleSubmit} className="relative">
                    <div className="focus-within:border-gray-500 border-gray-500 relative rounded-xl border bg-black shadow-lg z-10 transition-shadow">
                      <div className="relative z-10 min-h-[56px] rounded-xl">
                        <textarea
                          id="chat-main-textarea"
                          placeholder="Ask a follow-up question..."
                          className="resize-none overflow-auto w-full flex-1 bg-transparent p-3 pb-1.5 text-sm outline-none ring-0 placeholder:text-gray-500"
                          value={inputValue}
                          onChange={handleInputChange}
                          rows={1}
                          spellCheck={false}
                          style={{
                            height: '42px',
                            minHeight: '42px',
                            maxHeight: '384px'
                          }}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
                          }}
                        />
                        <div className="flex items-center gap-2 p-3 pt-0">
                          <div className="ml-auto flex items-center gap-1">
                            <button
                              type="button"
                              className="h-7 w-7 rounded-md hover:bg-gray-800 text-gray-500 hover:text-gray-300 flex items-center justify-center"
                            >
                              <Paperclip className="size-4" />
                            </button>
                            <button
                              type="submit"
                              className="bg-gray-900 border border-gray-700 text-white hover:bg-gray-800 size-7 rounded-md flex items-center justify-center disabled:opacity-50"
                              disabled={inputValue.trim() === '' || isLoading}
                            >
                              <ChevronRight className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              <p className="py-2 text-center text-xs text-gray-500">Idea0 may make mistakes. Please use with discretion.</p>
            </div>
          </div>
        )}
      </div>

      {/* Side panel component */}
      <SidePanel 
        isPanelOpen={isPanelOpen}
        setIsPanelOpen={setIsPanelOpen}
        generatedContent={generatedContent}
        isLoading={isLoading}
      />
    </div>
  )
}