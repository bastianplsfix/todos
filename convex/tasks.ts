import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

export const getTask = query({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    if (!args.id) {
      throw new Error("Task ID is required");
    }
    return await ctx.db.get(args.id);
  },
});

export const createTask = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.insert("tasks", {
      text: args.text,
      isCompleted: false,
    });
    return newTaskId;
  },
});

export const completeTask = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    if (!args.id) {
      throw new Error("Task ID is required");
    }
    await ctx.db.patch(args.id, { isCompleted: true });
  },
});

export const updateTask = mutation({
  args: { id: v.id("tasks"), text: v.string() },
  handler: async (ctx, args) => {
    if (!args.id) {
      throw new Error("Task ID is required");
    }
    await ctx.db.patch(args.id, { text: args.text });
  },
});
