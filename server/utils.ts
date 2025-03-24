/**
 * Utility functions for the server
 */

/**
 * Generate a random reference code for a bot submission
 * Format: BOT-XXXXX-XXXXX (where X is alphanumeric)
 */
export function generateReferenceCode(): string {
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed similar-looking characters
  let result = 'BOT-';
  
  // Generate first segment
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  result += '-';
  
  // Generate second segment
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return result;
}