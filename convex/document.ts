import { query } from "./_generated/server";

export const listDocuments = query({
  handler: async (ctx) => {
    return await ctx.db.query("documents").collect();
  },
});
