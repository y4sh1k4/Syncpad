"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { Table } from "@tiptap/extension-table";
import ImageResize from "tiptap-extension-resize-image";
import TableCell from "@tiptap/extension-table-cell";
import Link from "@tiptap/extension-link";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import TextAlign from "@tiptap/extension-text-align";
import Paragraph from "@tiptap/extension-paragraph";
import Underline from "@tiptap/extension-underline";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Image from "@tiptap/extension-image";
import FontFamily from "@tiptap/extension-font-family";
import {
  useLiveblocksExtension,
  FloatingComposer,
} from "@liveblocks/react-tiptap";
import { useStorage } from "@liveblocks/react/suspense";
import Highlight from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import { FontSize } from "@/extension/font-size";
import { LineHeight } from "@/extension/line-height";
import { useEditorStore } from "@/store/useEditorStore";
import { Color } from "@tiptap/extension-color";
import { Ruler } from "./Ruler";
import { Threads } from "./Threads";

const initialContent = `
  <p><span style="font-family: cursive">Did you know that Cursive is a really nice font for interfaces?</span></p>
`;

export const Editor = () => {
  const setEditor = useEditorStore((state) => state.setEditor);
  const leftMargin = useStorage((root) => root.leftMargin);
  const liveblocks = useLiveblocksExtension({
    initialContent,
    comments: true,
  });
  const rightMargin = useStorage((root) => root.rightMargin);
  const editor = useEditor({
    onCreate({ editor }) {
      setEditor(editor);
    },
    onDestroy() {
      setEditor(null);
    },
    onBlur({ editor }) {
      setEditor(editor);
    },
    onFocus({ editor }) {
      setEditor(editor);
    },
    onSelectionUpdate(props) {
      setEditor(props.editor);
    },
    onTransaction(props) {
      setEditor(props.editor);
    },
    extensions: [
      StarterKit,
      liveblocks,
      Heading,
      Highlight.configure({ multicolor: true }),
      Paragraph,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      ListItem,
      Color,
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
        shouldAutoLink: (url) => {
          try {
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`https://${url}`);
            const disallowedDomains = [
              "example-no-autolink.com",
              "another-no-autolink.com",
            ];
            const domain = parsedUrl.hostname;

            return !disallowedDomains.includes(domain);
          } catch {
            return false;
          }
        },
      }),
      TextStyle,
      FontSize,
      LineHeight,
      FontFamily.configure({
        types: ["textStyle"],
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      Image,
      ImageResize,
      TableRow,
      Underline,
      TableHeader,
      TableCell,
    ],
    editorProps: {
      attributes: {
        style: `padding-left: ${leftMargin}px; padding-right: ${rightMargin}px;`,
        class:
          "focus:outline-none print:border-0 bg-[#FFFEFC] border border-[#DCDAD1] shadow-[0_2px_8px_rgba(42,42,34,0.08)] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
      },
    },
  });
  return (
    <div className="size-full overflow-x-auto bg-[#F5F5F0] px-4 print:bg-white print:overflow-visible print:p-0">
      <div className="print:hidden">
        <Ruler />
      </div>
      <div className="min-w-max w-[816px] flex justify-center pb-4 print:py-0 mx-auto print:w-full print:min-w-0">
        <EditorContent editor={editor} className="print-canvas" />
        <Threads editor={editor} />
        <FloatingComposer
          editor={editor}
          className="editor-floating-composer"
          style={{ width: "350px" }}
        />
      </div>
    </div>
  );
};
