"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

import {
  Asterisk,
  Bold,
  Eraser,
  FileJson,
  FilePlus2,
  FileText,
  FileType2,
  Italic,
  PenSquare,
  Printer,
  Redo2,
  Save,
  Scissors,
  Star,
  Strikethrough,
  Table2,
  Underline,
  Undo2,
  Bell,
  CheckCheck,
} from "lucide-react";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useEditorStore } from "@/store/useEditorStore";
import { OrganizationSwitcher, Show, UserButton } from "@clerk/nextjs";
import { Preloaded, useMutation, usePreloadedQuery } from "convex/react";
import { useRouter } from "next/navigation";
import {
  useInboxNotifications,
  useMarkAllInboxNotificationsAsRead,
  useOthers,
  useSelf,
  useUnreadInboxNotificationsCount,
} from "@liveblocks/react/suspense";
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui";
import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type NavbarProps = {
  preloadedDocument: Preloaded<typeof api.document.listDocumentsById>;
};

export const Navbar = ({ preloadedDocument }: NavbarProps) => {
  const { editor } = useEditorStore();
  const router = useRouter();
  const createDocument = useMutation(api.document.createDocument);
  const updateDocument = useMutation(api.document.updateDocument);
  const deleteDocument = useMutation(api.document.deleteDocument);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [renameTitle, setRenameTitle] = useState("");
  const [isRenaming, setIsRenaming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const documentRecord = usePreloadedQuery(preloadedDocument);
  const others = useOthers();
  const self = useSelf();
  const { inboxNotifications, hasFetchedAll, fetchMore, isFetchingMore } =
    useInboxNotifications();
  const { count: unreadNotificationCount } = useUnreadInboxNotificationsCount();
  const markAllNotificationsAsRead = useMarkAllInboxNotificationsAsRead();
  const documentTitle = documentRecord?.title?.trim() || "Untitled document";

  const getFileStem = () =>
    documentTitle
      .replace(/[<>:"/\\|?*\u0000-\u001F]/g, "-")
      .replace(/\s+/g, " ")
      .trim() || "document";

  useEffect(() => {
    if (!notificationsOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [notificationsOpen]);

  useEffect(() => {
    document.title = documentTitle;
    return () => {
      document.title = "Syncpad";
    };
  }, [documentTitle]);

  const activeCollaborators = Array.from(
    new Map(
      (self ? [self, ...others] : others).map((collaborator) => [
        collaborator.id,
        collaborator,
      ]),
    ).values(),
  );

  const insertTable = (rows: number, cols: number) => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: true })
      .run();
  };

  const onDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  const onSaveJSON = () => {
    const json = editor?.getJSON();
    if (!json) return;

    const blob = new Blob([JSON.stringify(json)], { type: "application/json" });
    onDownload(blob, `${getFileStem()}.json`);
  };

  const onSaveHTML = () => {
    const html = editor?.getHTML();
    if (!html) return;

    const blob = new Blob([html], { type: "text/html" });
    onDownload(blob, `${getFileStem()}.html`);
  };

  const onSaveText = () => {
    const text = editor?.getText();
    if (!text) return;

    const blob = new Blob([text], { type: "text/plain" });
    onDownload(blob, `${getFileStem()}.txt`);
  };

  const onCreateFromCurrentDocument = async () => {
    if (!editor) return;

    try {
      const documentId = await createDocument({
        title: `${documentTitle} (Copy)`,
        initialContent: editor.getHTML(),
      });
      router.push(`/document/${documentId}`);
    } catch (error) {
      window.alert(
        error instanceof Error ? error.message : "Unable to create document",
      );
    }
  };

  const openRenameDialog = () => {
    setRenameTitle(documentTitle);
    setRenameOpen(true);
  };

  const onRename = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextTitle = renameTitle.trim();
    if (!documentRecord || !nextTitle) return;

    setIsRenaming(true);
    try {
      await updateDocument({
        documentId: documentRecord._id,
        title: nextTitle,
      });
      setRenameOpen(false);
    } catch (error) {
      window.alert(
        error instanceof Error ? error.message : "Unable to rename document",
      );
    } finally {
      setIsRenaming(false);
    }
  };

  const openRemoveDialog = () => setDeleteOpen(true);

  const onRemove = async () => {
    if (!documentRecord) return;

    setIsDeleting(true);
    try {
      await deleteDocument({ documentId: documentRecord._id });
      setDeleteOpen(false);
      router.push("/");
    } catch (error) {
      window.alert(
        error instanceof Error ? error.message : "Unable to remove document",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full flex justify-between items-center bg-[#f8fafd] px-5 py-2 print:hidden">
      <div className="flex items-center gap-2.5">
        <div className="flex size-9 items-center justify-center rounded-md bg-blue-500 text-white shadow-sm">
          <PenSquare size={18} />
        </div>

        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-5 leading-tight text-[#202124]">
            <span className="text-xl font-normal">
              {documentRecord?.title ?? "Document unavailable"}
            </span>
            <Star size={16} className="text-[#5f6368]" />
          </div>

          <Menubar className="h-8 w-fit border border-[#dadce0] bg-white p-0.5 shadow-none">
            <MenubarMenu>
              <MenubarTrigger className="px-2 py-1 text-sm font-normal text-[#202124]">
                File
              </MenubarTrigger>
              <MenubarContent className="bg-white border-[#dadce0]">
                <MenubarSub>
                  <MenubarSubTrigger>
                    <Save className="mr-2 size-4" />
                    Save
                  </MenubarSubTrigger>
                  <MenubarSubContent className="bg-white border-[#dadce0]">
                    <MenubarItem onClick={onSaveJSON}>
                      <FileJson className="mr-2 size-4" />
                      Save JSON
                    </MenubarItem>
                    <MenubarItem onClick={onSaveHTML}>
                      <FileType2 className="mr-2 size-4" />
                      Save HTML
                    </MenubarItem>
                    <MenubarItem onClick={() => window.print()}>
                      <FileText className="mr-2 size-4" />
                      Save PDF
                    </MenubarItem>
                    <MenubarItem onClick={onSaveText}>
                      <Asterisk className="mr-2 size-4" />
                      Save Text
                    </MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>

                <MenubarItem onClick={onCreateFromCurrentDocument}>
                  <FilePlus2 className="mr-2 size-4" />
                  New Document
                </MenubarItem>

                <MenubarSeparator className="my-1 bg-[#dadce0] h-px" />

                <MenubarItem onClick={openRenameDialog}>
                  <PenSquare className="mr-2 size-4" />
                  Rename
                </MenubarItem>
                <MenubarItem onClick={openRemoveDialog}>
                  <Scissors className="mr-2 size-4" />
                  Remove
                </MenubarItem>

                <MenubarSeparator className="my-1 bg-[#dadce0] h-px" />

                <MenubarItem onClick={() => window.print()}>
                  <Printer className="mr-2 size-4" />
                  Print
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger className="px-2 py-1 text-sm font-normal text-[#202124]">
                Edit
              </MenubarTrigger>
              <MenubarContent className="bg-white border-[#dadce0]">
                <MenubarItem
                  onClick={() => editor?.chain().focus().undo().run()}
                >
                  <Undo2 className="mr-2 size-4" />
                  Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarItem
                  onClick={() => editor?.chain().focus().redo().run()}
                >
                  <Redo2 className="mr-2 size-4" />
                  Redo <MenubarShortcut>⌘Y</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger className="px-2 py-1 text-sm font-normal text-[#202124]">
                Insert
              </MenubarTrigger>
              <MenubarContent className="bg-white border-[#dadce0]">
                <MenubarSub>
                  <MenubarSubTrigger>
                    <Table2 className="mr-2 size-4" />
                    Table
                  </MenubarSubTrigger>
                  <MenubarSubContent className="bg-white border-[#dadce0]">
                    <MenubarItem onClick={() => insertTable(1, 1)}>
                      1 x 1
                    </MenubarItem>
                    <MenubarItem onClick={() => insertTable(2, 2)}>
                      2 x 2
                    </MenubarItem>
                    <MenubarItem onClick={() => insertTable(3, 3)}>
                      3 x 3
                    </MenubarItem>
                    <MenubarItem onClick={() => insertTable(4, 4)}>
                      4 x 4
                    </MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger className="px-2 py-1 text-sm font-normal text-[#202124]">
                Format
              </MenubarTrigger>
              <MenubarContent className="bg-white border-[#dadce0]">
                <MenubarSub>
                  <MenubarSubTrigger>
                    <FileText className="mr-2 size-4" />
                    Text
                  </MenubarSubTrigger>
                  <MenubarSubContent className="bg-white border-[#dadce0]">
                    <MenubarItem
                      onClick={() => editor?.chain().focus().toggleBold().run()}
                    >
                      <Bold className="mr-2 size-4" />
                      Bold <MenubarShortcut>⌘B</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem
                      onClick={() =>
                        editor?.chain().focus().toggleItalic().run()
                      }
                    >
                      <Italic className="mr-2 size-4" />
                      Italic <MenubarShortcut>⌘I</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem
                      onClick={() =>
                        editor?.chain().focus().toggleUnderline().run()
                      }
                    >
                      <Underline className="mr-2 size-4" />
                      Underline <MenubarShortcut>⌘U</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem
                      onClick={() =>
                        editor?.chain().focus().toggleStrike().run()
                      }
                    >
                      <Strikethrough className="mr-2 size-4" />
                      Strike through
                    </MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>

                <MenubarItem
                  onClick={() =>
                    editor?.chain().focus().clearNodes().unsetAllMarks().run()
                  }
                >
                  <Eraser className="mr-2 size-4" />
                  Clear formatting
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
      <Show when="signed-in">
        <div className="flex items-center gap-2">
          {documentRecord?.organizationId && activeCollaborators.length > 0 ? (
            <div className="mr-3 flex items-center gap-2">
              <div className="flex -space-x-2">
                {activeCollaborators.slice(0, 5).map((other) => (
                  <div
                    key={other.id}
                    title={other.info?.name ?? "Collaborator"}
                    className="flex size-8 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-blue-500 text-xs font-medium text-white"
                  >
                    {other.info?.avatar ? (
                      <img
                        src={other.info.avatar}
                        alt={other.info.name ?? "Collaborator"}
                        className="size-full object-cover"
                      />
                    ) : (
                      (other.info?.name?.[0] ?? "?").toUpperCase()
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          <div ref={notificationsRef} className="relative mr-2">
            <button
              type="button"
              aria-label="Notifications"
              aria-expanded={notificationsOpen}
              onClick={() => setNotificationsOpen((open) => !open)}
              className="relative flex size-9 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100"
            >
              <Bell size={18} />
              {unreadNotificationCount > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 flex min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold leading-4 text-white">
                  {unreadNotificationCount > 99
                    ? "99+"
                    : unreadNotificationCount}
                </span>
              ) : null}
            </button>

            {notificationsOpen ? (
              <div className="absolute right-0 top-11 z-50 w-96 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                  <h2 className="text-sm font-semibold text-gray-900">
                    Notifications
                  </h2>
                  {unreadNotificationCount > 0 ? (
                    <button
                      type="button"
                      onClick={() => markAllNotificationsAsRead()}
                      className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
                    >
                      <CheckCheck size={14} />
                      Mark all read
                    </button>
                  ) : null}
                </div>

                {inboxNotifications.length > 0 ? (
                  <InboxNotificationList className="max-h-96 overflow-y-auto">
                    {inboxNotifications.map((notification) => (
                      <InboxNotification
                        key={notification.id}
                        inboxNotification={notification}
                        href={`/document/${notification.roomId}`}
                      />
                    ))}
                  </InboxNotificationList>
                ) : (
                  <div className="px-4 py-8 text-center text-sm text-gray-500">
                    No notifications
                  </div>
                )}

                {!hasFetchedAll ? (
                  <button
                    type="button"
                    disabled={isFetchingMore}
                    onClick={() => fetchMore()}
                    className="w-full border-t border-gray-200 px-4 py-2 text-xs text-blue-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isFetchingMore ? "Loading…" : "Load more"}
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
          <OrganizationSwitcher />
          <UserButton />
        </div>
      </Show>
      <Dialog open={renameOpen} onOpenChange={setRenameOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Rename document</DialogTitle>
            <DialogDescription>
              Choose a new name for this document.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={onRename}>
            <input
              autoFocus
              value={renameTitle}
              onChange={(event) => setRenameTitle(event.target.value)}
              className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Document title"
              disabled={isRenaming}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setRenameOpen(false)}
                disabled={isRenaming}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isRenaming || !renameTitle.trim()}
              >
                {isRenaming ? "Saving…" : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Remove document?</DialogTitle>
            <DialogDescription>
              This will permanently remove “{documentTitle}”. This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={onRemove}
              disabled={isDeleting}
            >
              {isDeleting ? "Removing…" : "Remove"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
