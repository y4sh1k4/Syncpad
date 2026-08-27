"use client";
import { FormEvent, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Building2, CircleUserRound, EllipsisVertical } from "lucide-react";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Id } from "../../../convex/_generated/dataModel";
import { useRouter, useSearchParams } from "next/navigation";
import { useOrganization, useUser } from "@clerk/nextjs";

type RenameDocument = {
  _id: Id<"documents">;
  title: string;
};

export const DocumentTable = () => {
  const router = useRouter();
  const { user } = useUser();
  const { organization } = useOrganization();
  const documents = useQuery(api.document.listDocuments, {
    userId: organization ? undefined : (user?.id ?? undefined),
    organizationId: organization?.id ?? undefined,
  });

  const remove = useMutation(api.document.deleteDocument);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const search = params.get("search") || "";
  const updateDocument = useMutation(api.document.updateDocument);
  const [renameDocument, setRenameDocument] = useState<RenameDocument | null>(
    null,
  );
  const [title, setTitle] = useState("");
  const [isRenaming, setIsRenaming] = useState(false);

  const openRenameDialog = (document: RenameDocument) => {
    setRenameDocument(document);
    setTitle(document.title);
  };

  const closeRenameDialog = () => {
    setRenameDocument(null);
    setTitle("");
    setIsRenaming(false);
  };

  const onRename = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextTitle = title.trim();

    if (!renameDocument || !nextTitle) {
      return;
    }

    setIsRenaming(true);
    await updateDocument({
      documentId: renameDocument._id,
      title: nextTitle,
    });
    closeRenameDialog();
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="w-full max-w-screen-xl p-4">
        <table className="w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Created At
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              ></th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Shared By
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {documents === undefined ? (
              Array.from({ length: 4 }).map((_, index) => (
                <tr key={`document-skeleton-${index}`}>
                  <td className="px-6 py-5" colSpan={5}>
                    <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />
                  </td>
                </tr>
              ))
            ) : documents.filter((doc) =>
                doc.title.toLowerCase().includes(search.toLowerCase()),
              ).length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-sm text-gray-500"
                >
                  {search
                    ? "No documents match your search."
                    : "No documents yet."}
                </td>
              </tr>
            ) : (
              documents
                .filter((doc) =>
                  doc.title.toLowerCase().includes(search.toLowerCase()),
                )
                .map((doc) => (
                  <tr
                    key={doc._id}
                    className="cursor-pointer text-gray-700 hover:bg-gray-50"
                    onClick={() => router.push(`/document/${doc._id}`)}
                  >
                    <td className="text-xs px-6 py-4 whitespace-nowrap">
                      {doc.title}
                    </td>
                    <td className="text-xs px-6 py-4 whitespace-nowrap">
                      {new Date(doc._creationTime).toLocaleDateString()}
                    </td>
                    <td></td>
                    <td className="text-xs px-6 py-4 whitespace-nowrap">
                      {doc.organizationId ? (
                        <div className="flex gap-2 items-end text-sm">
                          <Building2 size={20} /> Organization
                        </div>
                      ) : (
                        <div className="flex gap-2 items-end text-sm">
                          <CircleUserRound size={20} /> Personal
                        </div>
                      )}
                    </td>
                    <td onClick={(event) => event.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="text-sm text-gray-700">
                          <EllipsisVertical size={15} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white border border-[#c2c4c7] p-1 rounded-md">
                          <DropdownMenuItem
                            onSelect={() =>
                              openRenameDialog({
                                _id: doc._id,
                                title: doc.title,
                              })
                            }
                          >
                            Rename
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => remove({ documentId: doc._id })}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
      <Dialog
        open={renameDocument !== null}
        onOpenChange={(open) => {
          if (!open) {
            closeRenameDialog();
          }
        }}
      >
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Rename document</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={onRename}>
            <input
              autoFocus
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Document title"
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={closeRenameDialog}
                disabled={isRenaming}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isRenaming || !title.trim()}>
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
