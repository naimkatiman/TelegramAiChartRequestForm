import { BotSubmission } from "@shared/schema";
import { format } from "date-fns";
import { CheckCircle, AlertCircle, Info } from "lucide-react";
import { motion } from "framer-motion";

interface StatusDisplayProps {
  latestSubmission: BotSubmission | null;
}

export function StatusDisplay({ latestSubmission }: StatusDisplayProps) {
  // If there's no submission, show the no submission status
  if (!latestSubmission) {
    return (
      <motion.div 
        className="bg-gray-100 rounded-lg shadow-md border-2 border-[#0088cc] mb-6 hover:shadow-lg transition-shadow duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="bg-gray-200 p-4 rounded-t-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <h2 className="text-lg font-semibold text-black">Request Status & Recent Submissions</h2>
        </motion.div>
        <motion.div 
          className="p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <div className="text-center py-6">
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12 mx-auto text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20, 
                delay: 0.5 
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </motion.svg>
            <motion.p 
              className="mt-4 text-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.3 }}
            >
              No request submitted yet
            </motion.p>
            <motion.p 
              className="text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.3 }}
            >
              Your submission status will appear here
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Determine status icon and color based on submission status
  let StatusIcon = Info;
  let statusColor = "text-gray-400 bg-gray-100";
  let statusTitle = "Processing";
  let statusMessage = "Your request is being processed";

  if (latestSubmission.status === "completed") {
    StatusIcon = CheckCircle;
    statusColor = "text-white bg-green-500";
    statusTitle = "Request Completed";
    statusMessage = "Your bot customization request has been completed";
  } else if (latestSubmission.status === "pending") {
    StatusIcon = Info;
    statusColor = "text-white bg-[#0088cc]";
    statusTitle = "Request Submitted";
    statusMessage = "Your bot customization request has been received";
  } else if (latestSubmission.status === "failed") {
    StatusIcon = AlertCircle;
    statusColor = "text-white bg-red-500";
    statusTitle = "Request Failed";
    statusMessage = "There was an issue with your request";
  }

  // Format the timestamp
  const timestamp = latestSubmission.createdAt 
    ? format(new Date(latestSubmission.createdAt), "MMMM d, yyyy 'at' h:mm a") 
    : "-";

  return (
    <motion.div 
      className="bg-gray-100 rounded-lg shadow-md border-2 border-[#0088cc] mb-6 hover:shadow-lg transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="bg-gray-200 p-4 rounded-t-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <h2 className="text-lg font-semibold text-black">Request Status & Recent Submissions</h2>
      </motion.div>
      <motion.div 
        className="p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <motion.div 
          className="flex items-center mb-4"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <motion.div 
            className={`flex-shrink-0 h-8 w-8 rounded-full ${statusColor} flex items-center justify-center mr-3`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20, 
              delay: 0.5 
            }}
          >
            <StatusIcon className="h-5 w-5" />
          </motion.div>
          <motion.div>
            <motion.h3 
              className="font-medium text-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
            >
              {statusTitle}
            </motion.h3>
            <motion.p 
              className="text-sm text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.3 }}
            >
              {statusMessage}
            </motion.p>
          </motion.div>
        </motion.div>
        <motion.div 
          className="text-sm text-gray-500"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.3 }}
        >
          <p>Submitted on {timestamp}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
