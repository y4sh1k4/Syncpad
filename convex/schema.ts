import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    initialContent: v.optional(v.string()),
    roomId: v.optional(v.string()),
    ownerId: v.string(),
    organizationId: v.optional(v.string()),
  })
    .index("by_ownerId", ["ownerId"])
    .index("by_organizationId", ["organizationId"])
    .searchIndex("search_by_title", {
      searchField: "title",
      filterFields: ["ownerId", "organizationId"],
    }),
});
