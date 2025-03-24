import { apiRequest } from "../lib/queryClient";
import { BotSubmissionFormValues, BotSubmission } from "@shared/schema";

/**
 * Create a new bot submission
 * @param data - The form data for the submission
 * @returns The created submission
 */
export async function createBotSubmission(data: BotSubmissionFormValues): Promise<BotSubmission> {
  const response = await apiRequest("POST", "/api/submissions", data);
  return response.json();
}

/**
 * Get a single bot submission by ID
 * @param id - The ID of the submission to retrieve
 * @returns The submission with the specified ID
 */
export async function getBotSubmission(id: number): Promise<BotSubmission> {
  const response = await apiRequest("GET", `/api/submissions/${id}`);
  return response.json();
}

/**
 * Update the status of a bot submission
 * @param id - The ID of the submission to update
 * @param status - The new status for the submission
 * @returns The updated submission
 */
export async function updateBotSubmissionStatus(
  id: number,
  status: string
): Promise<BotSubmission> {
  const response = await apiRequest("PATCH", `/api/submissions/${id}/status`, { status });
  return response.json();
}
