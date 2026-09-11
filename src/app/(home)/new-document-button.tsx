"use client";

import { Plus } from "lucide-react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";

export const NewDocumentButton = () => {
  const create = useMutation(api.document.createDocument);
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const createDocument = async () => {
    setIsCreating(true);
    try {
      const documentId = await create({
        title: "Untitled document",
        initialContent: "",
      });
      router.push(`/document/${documentId}`);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <button
      type="button"
      onClick={createDocument}
      disabled={isCreating}
      className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#252525] px-3 text-sm font-medium text-white transition-colors hover:bg-[#3d3d3a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3971c6] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60"
    >
      <Plus size={16} />
      <span className="hidden sm:inline">
        {isCreating ? "Creating…" : "New document"}
      </span>
      <span className="sr-only sm:hidden">
        {isCreating ? "Creating document" : "New document"}
      </span>
    </button>
  );
};
