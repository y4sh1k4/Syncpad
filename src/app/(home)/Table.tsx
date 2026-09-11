"use client";

import { FormEvent, useMemo, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Building2, Ellipsis, FileText, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Id } from "../../../convex/_generated/dataModel";
import { useRouter, useSearchParams } from "next/navigation";
import { Show, useOrganization, useUser } from "@clerk/nextjs";
import { TemplateGallery } from "./template-gallery";
import { NewDocumentButton } from "./new-document-button";

type RenameDocument = { _id: Id<"documents">; title: string };
type Filter = "all" | "mine" | "shared";

const formatEditedAt = (value: number) => {
  const date = new Date(value);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return "Created today";
  if (date.toDateString() === yesterday.toDateString())
    return "Created yesterday";
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: date.getFullYear() === today.getFullYear() ? undefined : "numeric",
  });
};

const DocumentFingerprint = ({ title }: { title: string }) => (
  <span className="flex h-16 w-12 shrink-0 flex-col overflow-hidden rounded-[5px] border border-[#deded9] bg-[#fffefc] px-2 py-2">
    <span className="truncate text-[6px] font-semibold leading-3 text-[#4c4c48]">
      {title}
    </span>
    <span className="mt-2 h-1 w-full rounded-full bg-[#deded9]" />
    <span className="mt-1 h-1 w-4/5 rounded-full bg-[#e9e9e4]" />
    <span className="mt-1 h-1 w-3/5 rounded-full bg-[#e9e9e4]" />
  </span>
);

export const DocumentTable = () => {
  const router = useRouter();
  const { user } = useUser();
  const { organization } = useOrganization();
  const documents = useQuery(api.document.listDocuments, {
    userId: organization ? undefined : (user?.id ?? undefined),
    organizationId: organization?.id ?? undefined,
  });
  const remove = useMutation(api.document.deleteDocument);
  const updateDocument = useMutation(api.document.updateDocument);
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [renameDocument, setRenameDocument] = useState<RenameDocument | null>(
    null,
  );
  const [title, setTitle] = useState("");
  const [isRenaming, setIsRenaming] = useState(false);

  const matchingDocuments = useMemo(
    () =>
      documents
        ?.filter((document) =>
          document.title.toLowerCase().includes(search.toLowerCase()),
        )
        .sort((a, b) => b._creationTime - a._creationTime),
    [documents, search],
  );
  const documentsForList = useMemo(() => {
    if (!matchingDocuments) return matchingDocuments;
    if (activeFilter === "mine")
      return matchingDocuments.filter(
        (document) => document.ownerId === user?.id,
      );
    if (activeFilter === "shared")
      return matchingDocuments.filter(
        (document) => document.ownerId !== user?.id,
      );
    return matchingDocuments;
  }, [activeFilter, matchingDocuments, user?.id]);
  const recentDocuments = matchingDocuments?.slice(0, 3) ?? [];

  const closeRenameDialog = () => {
    setRenameDocument(null);
    setTitle("");
    setIsRenaming(false);
  };
  const onRename = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextTitle = title.trim();
    if (!renameDocument || !nextTitle) return;
    setIsRenaming(true);
    try {
      await updateDocument({
        documentId: renameDocument._id,
        title: nextTitle,
      });
      closeRenameDialog();
    } finally {
      setIsRenaming(false);
    }
  };

  if (documents === undefined) {
    return (
      <section aria-label="Loading documents">
        <div className="h-4 w-36 animate-pulse rounded bg-[#e9e9e4]" />
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-24 animate-pulse rounded-md bg-[#eeeeea]"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Documents">
      {recentDocuments.length > 0 && !search ? (
        <section
          className="library-section-reveal"
          style={{ animationDelay: "0ms" }}
          aria-labelledby="continue-heading"
        >
          <div>
            <h1
              id="continue-heading"
              className="text-[24px] font-semibold tracking-[-0.03em] text-[#252525] sm:text-[26px]"
            >
              Pick up where you left off
            </h1>
            <p className="mt-2 text-[15px] leading-6 text-[#62625e]">
              Your most recently created documents.
            </p>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {recentDocuments.map((document) => (
              <button
                key={document._id}
                type="button"
                onClick={() => router.push(`/document/${document._id}`)}
                className="group flex min-w-0 items-center gap-3 rounded-md border border-[#e1e1dc] bg-[#fffefc] p-3 text-left outline-none transition-[border-color,background-color] hover:border-[#c9d8ec] hover:bg-[#fbfdff] focus-visible:ring-2 focus-visible:ring-[#3971c6]"
              >
                <DocumentFingerprint title={document.title} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[15px] font-medium text-[#30302d]">
                    {document.title}
                  </span>
                  <span className="mt-1 flex items-center gap-1.5 text-[13px] text-[#7b7b76]">
                    {document.organizationId ? (
                      <Building2 size={13} />
                    ) : (
                      <UserRound size={13} />
                    )}
                    {document.organizationId ? "Organization" : "Personal"}
                  </span>
                  <span className="mt-2 block text-xs text-[#7b7b76]">
                    {formatEditedAt(document._creationTime)}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {!search ? (
        <div
          className="library-section-reveal"
          style={{ animationDelay: "90ms" }}
        >
          <TemplateGallery />
        </div>
      ) : null}

      <section
        className="library-section-reveal mt-12 border-t border-[#deded9] pt-8"
        style={{
          animationDelay:
            recentDocuments.length > 0 && !search ? "180ms" : "90ms",
        }}
        aria-labelledby="all-documents-heading"
      >
        <div className="flex items-center justify-between gap-4">
          <h2
            id="all-documents-heading"
            className="text-[22px] font-semibold tracking-[-0.025em] text-[#252525]"
          >
            {search ? `Search results for “${search}”` : "All documents"}
          </h2>
          <div className="flex items-center gap-4">
            {matchingDocuments ? (
              <span className="text-sm tabular-nums text-[#7b7b76]">
                {matchingDocuments.length}
              </span>
            ) : null}
            <Show when="signed-in">
              <NewDocumentButton />
            </Show>
          </div>
        </div>

        {!search ? (
          <div
            className="mt-4 flex gap-1"
            role="tablist"
            aria-label="Document ownership"
          >
            {(["all", "mine", "shared"] as Filter[]).map((filter) => (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
                className={`h-8 rounded-md px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3971c6] ${activeFilter === filter ? "bg-[#e9e9e4] text-[#292927]" : "text-[#73736f] hover:bg-[#f0f0eb] hover:text-[#292927]"}`}
              >
                {filter === "all"
                  ? "All"
                  : filter === "mine"
                    ? "Mine"
                    : "Shared"}
              </button>
            ))}
          </div>
        ) : null}

        <div className="mt-4 border-y border-[#e7e7e1]">
          {documentsForList?.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm font-medium text-[#3d3d3a]">
                {search
                  ? "No documents match that search."
                  : activeFilter === "shared"
                    ? "No shared documents here."
                    : "No documents yet."}
              </p>
              <p className="mt-1 text-sm text-[#7b7b76]">
                {search
                  ? "Try a different title."
                  : "Create a document or start from a template above."}
              </p>
            </div>
          ) : (
            documentsForList?.map((document) => (
              <article
                key={document._id}
                className="flex min-w-0 items-center gap-3 border-b border-[#ecece7] py-2 last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() => router.push(`/document/${document._id}`)}
                  className="flex min-w-0 flex-1 items-center gap-3 rounded-md px-1 py-2 text-left outline-none transition-colors hover:bg-[#f3f3ef] focus-visible:ring-2 focus-visible:ring-[#3971c6]"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-[#e0e0db] bg-[#fffefc] text-[#62625e]">
                    <FileText size={17} strokeWidth={1.6} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px] font-medium text-[#292927]">
                      {document.title}
                    </span>
                    <span className="mt-1 flex items-center gap-1.5 text-[13px] text-[#7b7b76] sm:hidden">
                      {document.organizationId ? (
                        <Building2 size={13} />
                      ) : (
                        <UserRound size={13} />
                      )}
                      {document.organizationId ? "Organization" : "Personal"}
                    </span>
                  </span>
                  <span className="hidden w-28 shrink-0 text-[13px] text-[#7b7b76] sm:block">
                    {document.organizationId ? "Organization" : "Personal"}
                  </span>
                  <span className="hidden w-28 shrink-0 text-right text-[13px] text-[#7b7b76] sm:block">
                    {formatEditedAt(document._creationTime)}
                  </span>
                </button>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex size-8 shrink-0 items-center justify-center rounded-md text-[#777773] outline-none transition-colors hover:bg-[#e9e9e4] hover:text-[#292927] focus-visible:ring-2 focus-visible:ring-[#3971c6]">
                    <Ellipsis size={18} />
                    <span className="sr-only">
                      Actions for {document.title}
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="min-w-36 rounded-lg border-[#deded9] bg-[#fffefc] p-1.5 shadow-lg"
                  >
                    <DropdownMenuItem
                      onSelect={() => {
                        setRenameDocument({
                          _id: document._id,
                          title: document.title,
                        });
                        setTitle(document.title);
                      }}
                      className="rounded-md px-2.5 py-2 text-sm focus:bg-[#f1f1ed]"
                    >
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-[#e7e7e1]" />
                    <DropdownMenuItem
                      onSelect={() => remove({ documentId: document._id })}
                      className="rounded-md px-2.5 py-2 text-sm text-[#b42318] focus:bg-[#fff1f0] focus:text-[#b42318]"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </article>
            ))
          )}
        </div>
      </section>

      <Dialog
        open={renameDocument !== null}
        onOpenChange={(open) => !open && closeRenameDialog()}
      >
        <DialogContent className="rounded-xl border-[#deded9] bg-[#fffefc] p-6 shadow-xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold tracking-[-0.02em] text-[#252525]">
              Rename document
            </DialogTitle>
          </DialogHeader>
          <form className="mt-2 space-y-5" onSubmit={onRename}>
            <label
              className="block text-sm font-medium text-[#4b4b47]"
              htmlFor="document-title"
            >
              Document title
              <input
                id="document-title"
                autoFocus
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="mt-2 h-10 w-full rounded-lg border border-[#cecec8] bg-white px-3 text-sm text-[#252525] outline-none focus:border-[#3971c6] focus:ring-2 focus:ring-[#3971c6]/15"
              />
            </label>
            <DialogFooter className="gap-2 sm:space-x-0">
              <Button
                type="button"
                variant="ghost"
                onClick={closeRenameDialog}
                disabled={isRenaming}
                className="h-9 rounded-lg px-3 text-[#4b4b47] hover:bg-[#f1f1ed]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isRenaming || !title.trim()}
                className="h-9 rounded-lg bg-[#2764b9] px-3.5 shadow-none hover:bg-[#1f559e]"
              >
                {isRenaming ? "Saving…" : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};
