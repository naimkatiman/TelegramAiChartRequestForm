import { TelegramBotForm } from "@/components/telegram-bot-form";
import { StatusDisplay } from "@/components/status-display";
import { SubmissionHistory } from "@/components/submission-history";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { BotSubmission } from "@shared/schema";
import { motion } from "framer-motion";
import { MessageSquareCode, SendHorizonal, BotMessageSquare, Bot, Settings, BarChart3, ExternalLink } from "lucide-react";

export default function Home() {
  const [latestSubmission, setLatestSubmission] = useState<BotSubmission | null>(null);
  const { toast } = useToast();

  const handleSubmissionSuccess = (submission: BotSubmission) => {
    setLatestSubmission(submission);
    toast({
      title: "Success",
      description: "Your bot customization request has been submitted successfully.",
      variant: "default",
    });
  };

  const handleSubmissionError = (error: Error) => {
    toast({
      title: "Error",
      description: error.message || "Failed to submit bot customization request.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4 md:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
        {/* Left Column - Form */}
        <motion.div 
          className="w-full lg:w-2/3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-xl shadow-lg border-2 border-[#0088cc] overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-r from-[#0088cc]/10 to-transparent p-6 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="p-3 bg-[#0088cc] rounded-full text-white shadow-md"
                >
                  <Bot size={28} />
                </motion.div>
                <div>
                  <motion.h1 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-3xl font-bold text-gray-800"
                  >
                    Telegram Bot Customization
                  </motion.h1>
                  <motion.p 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-gray-600 mt-1"
                  >
                    Configure your IB trading bot settings
                  </motion.p>
                </div>
              </div>
              
              <motion.div 
                className="absolute -right-10 -bottom-10 flex flex-wrap gap-4 opacity-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <MessageSquareCode size={48} />
                <SendHorizonal size={48} />
                <BotMessageSquare size={48} />
                <Settings size={48} />
                <BarChart3 size={48} />
              </motion.div>
            </div>
            
            <TelegramBotForm 
              onSubmissionSuccess={handleSubmissionSuccess}
              onSubmissionError={handleSubmissionError}
            />
          </div>
        </motion.div>
        
        {/* Right Column - Status and History */}
        <div className="w-full lg:w-1/3 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="sticky top-6"
          >
            <StatusDisplay latestSubmission={latestSubmission} />
          
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6"
            >
              <SubmissionHistory latestSubmission={latestSubmission} />
            </motion.div>
            
            {/* Help & Resources Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg border-2 border-[#0088cc] mt-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="bg-gradient-to-r from-[#0088cc]/10 to-transparent p-4 rounded-t-lg flex items-center gap-2">
                <motion.div
                  initial={{ rotate: -10, scale: 0.9 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <MessageSquareCode size={24} className="text-[#0088cc]" />
                </motion.div>
                <h2 className="text-xl font-semibold text-gray-800">Help & Resources</h2>
              </div>
              
              <div className="p-5">
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="group"
                  >
                    <h3 className="text-lg text-gray-800 mb-3 flex items-center gap-2">
                      <BarChart3 size={18} className="text-[#0088cc]" />
                      Available Symbols
                    </h3>
                    <a href="https://doc.chart-img.com/#tradingview-symbols" 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       className="text-[#0088cc] hover:text-[#006699] flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                      <span>View supported symbols</span>
                      <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="group"
                  >
                    <h3 className="text-lg text-gray-800 mb-3 flex items-center gap-2">
                      <Settings size={18} className="text-[#0088cc]" />
                      Available Indicators
                    </h3>
                    <a href="https://doc.chart-img.com/#tradingview-chart-indicators" 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       className="text-[#0088cc] hover:text-[#006699] flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                      <span>View supported indicators</span>
                      <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
