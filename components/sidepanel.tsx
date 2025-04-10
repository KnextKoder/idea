import { X, Share2, Download, ThumbsUp, ThumbsDown, ChevronRight, Lightbulb, BarChart3, CheckCircle2, Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface SidePanelProps {
  isPanelOpen: boolean
  setIsPanelOpen: (open: boolean) => void
  generatedContent: string | null
  isLoading: boolean
}

interface AccordionSectionProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
}

const AccordionSection = ({ title, icon, children, defaultOpen = false }: AccordionSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border border-gray-800 rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-black mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left transition-colors hover:bg-gray-800/30"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-gray-800 p-2 text-[#FFD700]">
            {icon}
          </div>
          <h3 className="text-lg font-medium text-white">{title}</h3>
        </div>
        <ChevronRight 
          className={cn(
            "h-5 w-5 text-gray-400 transition-transform duration-200",
            isOpen && "rotate-90"
          )} 
        />
      </button>
      
      {isOpen && (
        <div className="p-4 border-t border-gray-800">
          {children}
        </div>
      )}
    </div>
  );
};

const ProgressBar = ({ value }: { value: number }) => {
  return (
    <div className="w-full bg-gray-800 rounded-full h-2.5">
      <div 
        className="bg-gradient-to-r from-[#FFD700] to-amber-500 h-2.5 rounded-full"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

export function SidePanel({ isPanelOpen, setIsPanelOpen, generatedContent, isLoading }: SidePanelProps) {
  const [feedback, setFeedback] = useState<'like' | 'dislike' | null>(null);
  const [currentTab, setCurrentTab] = useState<'overview' | 'analysis' | 'action'>('overview');
  
  // Mock data for the demo
  const marketPotential = 85;
  const implementationDifficulty = 45;
  const innovationScore = 92;
  
  const handleShareIdea = () => {
    // Implementation would go here
    console.log("Sharing idea");
    alert("Sharing functionality would be implemented here");
  };
  
  const handleDownloadPDF = () => {
    // Implementation would go here
    console.log("Downloading PDF");
    alert("PDF download functionality would be implemented here");
  };

  return (
    <div
      className={cn(
        "fixed inset-y-0 right-0 bg-black border-l border-gray-800 transition-all duration-300 flex flex-col",
        isPanelOpen ? "w-full md:w-1/2 lg:w-2/5 translate-x-0" : "translate-x-full w-0",
      )}
    >
      {isPanelOpen && (
        <>
          {/* Header section */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-black sticky top-0 z-10 backdrop-blur-lg bg-opacity-90">
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#FFD700]" />
                <span>Generated Idea</span>
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">Created just now</p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsPanelOpen(false)} 
                className="hover:bg-gray-800 rounded-lg"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Tab navigation */}
          <div className="flex border-b border-gray-800 bg-black/80 sticky top-[73px] z-10 backdrop-blur-lg">
            <button 
              onClick={() => setCurrentTab('overview')}
              className={cn(
                "flex-1 py-3 px-4 text-sm font-medium text-center transition-colors border-b-2",
                currentTab === 'overview' 
                  ? "text-[#FFD700] border-[#FFD700]" 
                  : "text-gray-400 border-transparent hover:text-gray-300"
              )}
            >
              Overview
            </button>
            <button 
              onClick={() => setCurrentTab('analysis')}
              className={cn(
                "flex-1 py-3 px-4 text-sm font-medium text-center transition-colors border-b-2",
                currentTab === 'analysis' 
                  ? "text-[#FFD700] border-[#FFD700]" 
                  : "text-gray-400 border-transparent hover:text-gray-300"
              )}
            >
              Analysis
            </button>
            <button 
              onClick={() => setCurrentTab('action')}
              className={cn(
                "flex-1 py-3 px-4 text-sm font-medium text-center transition-colors border-b-2",
                currentTab === 'action' 
                  ? "text-[#FFD700] border-[#FFD700]" 
                  : "text-gray-400 border-transparent hover:text-gray-300"
              )}
            >
              Next Steps
            </button>
          </div>

          {/* Main content area */}
          <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="relative">
                  <svg className="w-16 h-16 animate-spin" viewBox="0 0 50 50">
                    <circle
                      cx="25"
                      cy="25"
                      r="20"
                      fill="none"
                      className="stroke-gray-800"
                      strokeWidth="4"
                    />
                    <circle
                      cx="25"
                      cy="25"
                      r="20"
                      fill="none"
                      className="stroke-[#FFD700] stroke-dasharray-[80] stroke-dashoffset-[80] animate-dash"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                  <Lightbulb className="absolute inset-0 m-auto text-[#FFD700] h-6 w-6" />
                </div>
                <p className="mt-4 text-gray-400 font-medium">Generating your idea...</p>
                <p className="text-sm text-gray-500 max-w-xs text-center mt-2">
                  We&apos;re crafting a unique business concept based on your input. This may take a moment.
                </p>
              </div>
            ) : (
              <>
                {currentTab === 'overview' && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-5">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-white">Your Next Big Idea</h3>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 rounded-lg hover:bg-gray-800"
                            onClick={handleShareIdea}
                          >
                            <Share2 className="h-4 w-4 text-gray-400" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 rounded-lg hover:bg-gray-800"
                            onClick={handleDownloadPDF}
                          >
                            <Download className="h-4 w-4 text-gray-400" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="prose prose-gray prose-invert max-w-none">
                        <div className="whitespace-pre-line text-gray-300 leading-relaxed text-sm">
                          {generatedContent}
                        </div>
                      </div>
                      
                      <div className="mt-6 flex items-center justify-between">
                        <div className="text-sm text-gray-400">
                          Was this idea helpful?
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className={cn(
                              "rounded-lg h-9 border-gray-800 hover:border-gray-700",
                              feedback === 'like' && "bg-green-900/30 border-green-800 text-green-400"
                            )}
                            onClick={() => setFeedback('like')}
                          >
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            <span>Yes</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className={cn(
                              "rounded-lg h-9 border-gray-800 hover:border-gray-700",
                              feedback === 'dislike' && "bg-red-900/30 border-red-800 text-red-400"
                            )}
                            onClick={() => setFeedback('dislike')}
                          >
                            <ThumbsDown className="h-4 w-4 mr-1" />
                            <span>No</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-5">
                      <h3 className="text-lg font-medium text-white mb-4">Key Highlights</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-300">Market Potential</span>
                          <span className="text-sm font-medium text-white">{marketPotential}%</span>
                        </div>
                        <ProgressBar value={marketPotential} />
                        
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-sm text-gray-300">Implementation Difficulty</span>
                          <span className="text-sm font-medium text-white">{implementationDifficulty}%</span>
                        </div>
                        <ProgressBar value={implementationDifficulty} />
                        
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-sm text-gray-300">Innovation Score</span>
                          <span className="text-sm font-medium text-white">{innovationScore}%</span>
                        </div>
                        <ProgressBar value={innovationScore} />
                      </div>
                    </div>
                  </div>
                )}
                
                {currentTab === 'analysis' && (
                  <div className="space-y-4">
                    <AccordionSection 
                      title="Market Analysis" 
                      icon={<BarChart3 className="h-5 w-5" />}
                      defaultOpen={true}
                    >
                      <div className="space-y-4">
                        <p className="text-sm text-gray-300">
                          The target market for this idea appears to be growing at a steady rate.
                          Our analysis suggests potential for significant adoption in the following sectors:
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="bg-gray-800/50 rounded-lg p-3">
                            <div className="text-[#FFD700] font-medium mb-1">Primary Market</div>
                            <div className="text-sm text-gray-300">Small to medium enterprises looking to optimize operations</div>
                          </div>
                          <div className="bg-gray-800/50 rounded-lg p-3">
                            <div className="text-[#FFD700] font-medium mb-1">Market Size</div>
                            <div className="text-sm text-gray-300">$2.5B annual potential</div>
                          </div>
                          <div className="bg-gray-800/50 rounded-lg p-3">
                            <div className="text-[#FFD700] font-medium mb-1">Growth Rate</div>
                            <div className="text-sm text-gray-300">15% year over year</div>
                          </div>
                          <div className="bg-gray-800/50 rounded-lg p-3">
                            <div className="text-[#FFD700] font-medium mb-1">Competition</div>
                            <div className="text-sm text-gray-300">Moderate, fragmented market</div>
                          </div>
                        </div>
                      </div>
                    </AccordionSection>
                    
                    <AccordionSection 
                      title="Revenue Potential" 
                      icon={<Zap className="h-5 w-5" />}
                      defaultOpen={true}
                    >
                      <div className="space-y-4">
                        <p className="text-sm text-gray-300">
                          Multiple revenue streams are possible with this business model:
                        </p>
                        
                        <div className="space-y-3">
                          <div className="flex items-start gap-2">
                            <div className="rounded bg-[#FFD700]/10 p-1 text-[#FFD700]">
                              <CheckCircle2 className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="text-white text-sm font-medium">Subscription Model</div>
                              <div className="text-gray-400 text-sm">Recurring revenue from monthly/annual subscriptions</div>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <div className="rounded bg-[#FFD700]/10 p-1 text-[#FFD700]">
                              <CheckCircle2 className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="text-white text-sm font-medium">Premium Features</div>
                              <div className="text-gray-400 text-sm">Tiered pricing for advanced functionality</div>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <div className="rounded bg-[#FFD700]/10 p-1 text-[#FFD700]">
                              <CheckCircle2 className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="text-white text-sm font-medium">Affiliate Partnerships</div>
                              <div className="text-gray-400 text-sm">Revenue from strategic partnerships and integrations</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionSection>
                    
                    <AccordionSection 
                      title="Technical Feasibility" 
                      icon={<Lightbulb className="h-5 w-5" />}
                    >
                      <div className="space-y-3">
                        <p className="text-sm text-gray-300">
                          From a technical standpoint, this idea is achievable with current technology.
                        </p>
                        
                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <h4 className="text-[#FFD700] text-sm font-medium mb-2">Technology Stack</h4>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 rounded-full bg-gray-700 text-xs text-gray-300">React</span>
                            <span className="px-2 py-1 rounded-full bg-gray-700 text-xs text-gray-300">Node.js</span>
                            <span className="px-2 py-1 rounded-full bg-gray-700 text-xs text-gray-300">MongoDB</span>
                            <span className="px-2 py-1 rounded-full bg-gray-700 text-xs text-gray-300">AWS</span>
                            <span className="px-2 py-1 rounded-full bg-gray-700 text-xs text-gray-300">Machine Learning</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-300">
                          Development timeline estimate: 4-6 months for MVP
                        </p>
                      </div>
                    </AccordionSection>
                  </div>
                )}
                
                {currentTab === 'action' && (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-5">
                      <h3 className="text-lg font-medium text-white flex items-center gap-2 mb-4">
                        <CheckCircle2 className="h-5 w-5 text-[#FFD700]" />
                        <span>Immediate Next Steps</span>
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start gap-3 pb-3 border-b border-gray-800">
                          <div className="rounded-full bg-gray-800 h-6 w-6 flex items-center justify-center text-xs text-white font-medium flex-shrink-0">
                            1
                          </div>
                          <div>
                            <h4 className="text-white font-medium mb-1">Validate Your Idea</h4>
                            <p className="text-sm text-gray-300">
                              Conduct customer interviews to validate your assumptions. 
                              Aim to speak with 10-15 potential users from your target market.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3 pb-3 border-b border-gray-800">
                          <div className="rounded-full bg-gray-800 h-6 w-6 flex items-center justify-center text-xs text-white font-medium flex-shrink-0">
                            2
                          </div>
                          <div>
                            <h4 className="text-white font-medium mb-1">Build a Landing Page</h4>
                            <p className="text-sm text-gray-300">
                              Create a simple landing page to gauge interest. Collect email addresses 
                              from potential customers to build an early audience.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3 pb-3 border-b border-gray-800">
                          <div className="rounded-full bg-gray-800 h-6 w-6 flex items-center justify-center text-xs text-white font-medium flex-shrink-0">
                            3
                          </div>
                          <div>
                            <h4 className="text-white font-medium mb-1">Competitor Research</h4>
                            <p className="text-sm text-gray-300">
                              Identify and analyze direct and indirect competitors. 
                              Look for gaps in their offerings that your solution can address.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="rounded-full bg-gray-800 h-6 w-6 flex items-center justify-center text-xs text-white font-medium flex-shrink-0">
                            4
                          </div>
                          <div>
                            <h4 className="text-white font-medium mb-1">Create an MVP</h4>
                            <p className="text-sm text-gray-300">
                              Develop a minimal viable product focusing only on core features.
                              Get it into users&apos; hands as quickly as possible for feedback.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-5">
                      <h3 className="text-lg font-medium text-white mb-4">Resources</h3>
                      
                      <div className="space-y-3">
                        <a 
                          href="#" 
                          className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-gray-700 p-2">
                              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <div>
                              <div className="text-white text-sm font-medium">Business Model Canvas Template</div>
                              <div className="text-xs text-gray-400">PDF • 2.4 MB</div>
                            </div>
                          </div>
                          <Download className="h-4 w-4 text-gray-400" />
                        </a>
                        
                        <a 
                          href="#" 
                          className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-gray-700 p-2">
                              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div>
                              <div className="text-white text-sm font-medium">Customer Interview Guide</div>
                              <div className="text-xs text-gray-400">Video • 12:45 min</div>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </a>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button 
                        className="w-full bg-[#FFD700] hover:bg-[#E6C200] text-black font-medium py-6 rounded-xl"
                      >
                        Get Started with Your Idea
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}