import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const listDocuments = query({
  args: {
    userId: v.optional(v.string()),
    organizationId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const docs = await ctx.db.query("documents").collect();
    return docs.filter((doc) => {
      if (args.organizationId) {
        return doc.organizationId === args.organizationId;
      }
      if (args.userId && doc.ownerId !== args.userId) {
        return false;
      }
      return true;
    });
  },
});

export const listDocumentsById = query({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.documentId);
  },
});

export const createDocument = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    console.log("Identity:", identity);
    const organizationId = identity?.organizationId
      ? String(identity.organizationId)
      : undefined;
    if (identity === null) {
      throw new Error("Not authenticated");
    }
    console.log("Organization ID:", organizationId);
    const documentId = await ctx.db.insert("documents", {
      title: args.title ?? "Untitled document",
      initialContent: args.initialContent,
      ownerId: identity.subject,
      organizationId: organizationId,
    });
    return documentId;
  },
});

export const updateDocument = mutation({
  args: {
    documentId: v.id("documents"),
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }
    const document = await ctx.db.get(args.documentId);
    if (!document) {
      throw new Error("Document not found");
    }
    if (document.ownerId !== identity.subject) {
      throw new Error("Not authorized to update this document");
    }
    await ctx.db.patch(args.documentId, {
      ...(args.title !== undefined ? { title: args.title } : {}),
      ...(args.initialContent !== undefined
        ? { initialContent: args.initialContent }
        : {}),
    });
  },
});

export const deleteDocument = mutation({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }
    const document = await ctx.db.get(args.documentId);
    if (!document) {
      throw new Error("Document not found");
    }
    if (document.ownerId !== identity.subject) {
      throw new Error("Not authorized to delete this document");
    }
    await ctx.db.delete(args.documentId);
  },
});
