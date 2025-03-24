import { users, type User, type InsertUser, botSubmissions, type BotSubmission, type InsertBotSubmission } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Bot submission methods
  getBotSubmission(id: number): Promise<BotSubmission | undefined>;
  getBotSubmissionByReference(referenceCode: string): Promise<BotSubmission | undefined>;
  getSubmissionsByEmail(email: string): Promise<BotSubmission[]>;
  getAllBotSubmissions(): Promise<BotSubmission[]>;
  createBotSubmission(submission: InsertBotSubmission): Promise<BotSubmission>;
  updateBotSubmissionStatus(id: number, status: string): Promise<BotSubmission | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getBotSubmission(id: number): Promise<BotSubmission | undefined> {
    const [submission] = await db.select().from(botSubmissions).where(eq(botSubmissions.id, id));
    return submission;
  }

  async getBotSubmissionByReference(referenceCode: string): Promise<BotSubmission | undefined> {
    const [submission] = await db.select().from(botSubmissions).where(eq(botSubmissions.referenceCode, referenceCode));
    return submission;
  }

  async getSubmissionsByEmail(email: string): Promise<BotSubmission[]> {
    return await db
      .select()
      .from(botSubmissions)
      .where(eq(botSubmissions.requesterEmail, email))
      .orderBy(botSubmissions.createdAt);
  }

  async getAllBotSubmissions(): Promise<BotSubmission[]> {
    return await db.select().from(botSubmissions).orderBy(botSubmissions.createdAt);
  }

  async createBotSubmission(submission: InsertBotSubmission): Promise<BotSubmission> {
    const [createdSubmission] = await db
      .insert(botSubmissions)
      .values(submission)
      .returning();
    return createdSubmission;
  }

  async updateBotSubmissionStatus(id: number, status: string): Promise<BotSubmission | undefined> {
    const [updatedSubmission] = await db
      .update(botSubmissions)
      .set({ status })
      .where(eq(botSubmissions.id, id))
      .returning();
    return updatedSubmission;
  }
}

// For compatibility with existing code, use the DatabaseStorage implementation
export const storage = new DatabaseStorage();
