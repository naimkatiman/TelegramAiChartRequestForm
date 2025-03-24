import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { botSubmissionFormSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Bot submission endpoints
  app.get("/api/submissions", async (req, res) => {
    try {
      const submissions = await storage.getAllBotSubmissions();
      return res.json(submissions);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      return res.status(500).json({ message: "Failed to fetch submissions" });
    }
  });

  app.get("/api/submissions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid submission ID" });
      }

      const submission = await storage.getBotSubmission(id);
      if (!submission) {
        return res.status(404).json({ message: "Submission not found" });
      }

      return res.json(submission);
    } catch (error) {
      console.error("Error fetching submission:", error);
      return res.status(500).json({ message: "Failed to fetch submission" });
    }
  });

  app.post("/api/submissions", async (req, res) => {
    try {
      // Validate the submission data
      const validatedData = botSubmissionFormSchema.parse(req.body);
      
      // Create the submission
      const submission = await storage.createBotSubmission(validatedData);
      
      return res.status(201).json(submission);
    } catch (error) {
      console.error("Error creating submission:", error);
      
      // Handle validation errors
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.details 
        });
      }
      
      return res.status(500).json({ message: "Failed to create submission" });
    }
  });

  app.patch("/api/submissions/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid submission ID" });
      }

      const { status } = req.body;
      if (!status || typeof status !== "string") {
        return res.status(400).json({ message: "Status is required and must be a string" });
      }

      const updatedSubmission = await storage.updateBotSubmissionStatus(id, status);
      if (!updatedSubmission) {
        return res.status(404).json({ message: "Submission not found" });
      }

      return res.json(updatedSubmission);
    } catch (error) {
      console.error("Error updating submission status:", error);
      return res.status(500).json({ message: "Failed to update submission status" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
