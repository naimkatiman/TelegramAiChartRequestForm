import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { BotSubmission } from "@shared/schema";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface SubmissionHistoryProps {
  latestSubmission: BotSubmission | null;
}

export function SubmissionHistory({ latestSubmission }: SubmissionHistoryProps) {
  const { data: submissions, isLoading, error } = useQuery<BotSubmission[]>({
    queryKey: ["/api/submissions"],
  });

  // Get top 5 most recent submissions
  const recentSubmissions = submissions 
    ? [...submissions].sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      }).slice(0, 5)
    : [];

  // Count instruments for each submission
  const countInstruments = (submission: BotSubmission) => {
    const equityCount = submission.equityIndices ? (submission.equityIndices as string[]).length : 0;
    const forexCount = submission.forex ? (submission.forex as string[]).length : 0;
    const commoditiesCount = submission.commodities ? (submission.commodities as string[]).length : 0;
    
    return equityCount + forexCount + commoditiesCount;
  };
  
  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500 text-white font-medium";
      case "pending":
        return "bg-[#0088cc] text-white font-medium";
      case "failed":
        return "bg-red-500 text-white font-medium";
      default:
        return "bg-gray-400 text-white font-medium";
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <motion.div 
      className="bg-gray-100 rounded-lg shadow-md border-2 border-[#0088cc] hover:shadow-lg transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <motion.div 
        className="bg-gray-200 p-4 rounded-t-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <h2 className="text-lg font-semibold text-black">Recent Submissions</h2>
      </motion.div>
      <motion.div 
        className="p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        {isLoading ? (
          <motion.div 
            className="flex items-center justify-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Loader2 className="h-8 w-8 animate-spin text-[#0088cc]" />
          </motion.div>
        ) : error ? (
          <motion.div 
            className="text-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12 mx-auto text-red-500 opacity-50" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </motion.svg>
            <motion.p 
              className="mt-4 text-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Failed to load submission history
            </motion.p>
            <motion.p 
              className="text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {(error as Error).message || "Unknown error"}
            </motion.p>
          </motion.div>
        ) : recentSubmissions.length === 0 ? (
          <motion.div 
            className="text-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12 mx-auto text-gray-400"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </motion.svg>
            <motion.p 
              className="mt-4 text-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              No submission history
            </motion.p>
            <motion.p 
              className="text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Your recent requests will appear here
            </motion.p>
          </motion.div>
        ) : (
          <motion.div 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {recentSubmissions.map((submission, index) => (
              <motion.div 
                key={submission.id} 
                className="border border-[#0088cc] rounded-md p-3 hover:bg-gray-200 transition-colors cursor-pointer bg-white"
                variants={itemVariants}
                whileHover={{ scale: 1.02, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
                transition={{ delay: 0.5 + (index * 0.1) }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800 text-sm">{submission.requesterName}</h3>
                    <p className="text-xs text-gray-600">{countInstruments(submission)} instruments selected</p>
                  </div>
                  <motion.span 
                    className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeColor(submission.status)}`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                  </motion.span>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Submitted on {format(new Date(submission.createdAt), "MMMM d, yyyy 'at' h:mm a")}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
