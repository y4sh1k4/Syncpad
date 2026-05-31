"use client";

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

export const Navbar = () => {
  const { editor } = useEditorStore();

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
  };

  const onSaveJSON = () => {
    const json = editor?.getJSON();
    if (!json) return;

    const blob = new Blob([JSON.stringify(json)], { type: "application/json" });
    onDownload(blob, "document.json");
  };

  const onSaveHTML = () => {
    const html = editor?.getHTML();
    if (!html) return;

    const blob = new Blob([html], { type: "text/html" });
    onDownload(blob, "document.html");
  };

  const onSaveText = () => {
    const text = editor?.getText();
    if (!text) return;

    const blob = new Blob([text], { type: "text/plain" });
    onDownload(blob, "document.txt");
  };

  return (
    <div className="w-full bg-[#f8fafd] px-3 py-2 print:hidden">
      <div className="flex items-center gap-2.5">
        <div className="flex size-9 items-center justify-center rounded-md bg-blue-500 text-white shadow-sm">
          <PenSquare size={18} />
        </div>

        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-5 leading-tight text-[#202124]">
            <span className="text-xl font-normal">Untitled document</span>
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
                      Add JSON
                    </MenubarItem>
                    <MenubarItem onClick={onSaveHTML}>
                      <FileType2 className="mr-2 size-4" />
                      Add HTML
                    </MenubarItem>
                    <MenubarItem onClick={() => window.print()}>
                      <FileText className="mr-2 size-4" />
                      Add PDF
                    </MenubarItem>
                    <MenubarItem onClick={onSaveText}>
                      <Asterisk className="mr-2 size-4" />
                      Add Text
                    </MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>

                <MenubarItem>
                  <FilePlus2 className="mr-2 size-4" />
                  New Document
                </MenubarItem>

                <MenubarSeparator className="my-1 bg-[#dadce0] h-px" />

                <MenubarItem>
                  <PenSquare className="mr-2 size-4" />
                  Rename
                </MenubarItem>
                <MenubarItem>
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
    </div>
  );
};
