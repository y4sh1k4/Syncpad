"use client";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/useEditorStore";
import { Separator } from "@radix-ui/react-separator";
import { useState } from "react";
import { SketchPicker } from "react-color";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  BoldIcon,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquareCodeIcon,
  PrinterIcon,
  Image as ImageIcon,
  Redo2,
  RemoveFormattingIcon,
  StrikethroughIcon,
  UnderlineIcon,
  Undo2,
  ChevronDown,
  HighlighterIcon,
  Link2,
  TextAlignCenter,
  TextAlignEnd,
  TextAlignJustify,
  TextAlignStart,
  List,
  ListOrdered,
  ListCollapse,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColorResult } from "react-color";

export type Level = 1 | 2 | 3 | 4 | 5 | 6;

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}
const ToolbarButton = ({
  onClick,
  isActive,
  icon: Icon,
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-red-600",
      )}
    >
      <Icon size={16} />
    </button>
  );
};

const FontFamilySelector = () => {
  const editor = useEditorStore((state) => state.editor);
  const [isOpen, setIsOpen] = useState(false);

  const fonts = [
    { label: "Inter", value: "Inter" },
    { label: "Comic Sans", value: "Comic Sans MS, Comic Sans" },
    { label: "Serif", value: "serif" },
    { label: "Monospace", value: "monospace" },
    { label: "Cursive", value: "cursive" },
    { label: "Fantasy", value: "fantasy" },
  ];
  const activeFont = fonts.find(
    (font) => font.value === editor?.getAttributes("textStyle").fontFamily,
  )?.label;
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        className="bg-[#F1F4F9] h-[30px] rounded-none "
        asChild
      >
        <Button className="py-0.5">
          {activeFont || "Select Font"}{" "}
          <ChevronDown
            color="#c2c4c7"
            size={16}
            className={cn("transition-transform", isOpen && "rotate-180")}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white border border-[#c2c4c7] p-1 rounded-md">
        {fonts.map((font) => (
          <DropdownMenuItem
            key={font.value}
            className={activeFont == font.label ? "bg-[#F1F4F9]" : ""}
            onSelect={() => {
              editor?.chain().focus().setFontFamily(font.value).run();
            }}
            style={{ fontFamily: font.value }}
          >
            {font.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FontSizeSelector = () => {
  const editor = useEditorStore((state) => state.editor);
  const [isOpen, setIsOpen] = useState(false);

  const fontSizes = [
    { label: "12px", value: "12px" },
    { label: "14px", value: "14px" },
    { label: "16px", value: "16px" },
    { label: "18px", value: "18px" },
    { label: "20px", value: "20px" },
    { label: "24px", value: "24px" },
    { label: "32px", value: "32px" },
    { label: "Reset", value: "" },
  ];

  const activeFontSize = editor?.getAttributes("textStyle").fontSize || "14px";

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        className="bg-[#F1F4F9] h-[30px] rounded-none"
        asChild
      >
        <Button className="py-0.5">
          {activeFontSize}
          <ChevronDown
            color="#c2c4c7"
            size={16}
            className={cn("transition-transform", isOpen && "rotate-180")}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white border border-[#c2c4c7] p-1 rounded-md">
        {fontSizes.map((size) => (
          <DropdownMenuItem
            key={size.label}
            className={activeFontSize === size.value ? "bg-[#F1F4F9]" : ""}
            onSelect={() => {
              if (size.value) {
                editor?.chain().focus().setFontSize(size.value).run();
                return;
              }

              editor?.chain().focus().unsetFontSize().run();
            }}
            style={{ fontSize: size.value || activeFontSize }}
          >
            {size.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const LineHeightSelector = () => {
  const editor = useEditorStore((state) => state.editor);
  const [isOpen, setIsOpen] = useState(false);
  const lineHeights = [
    { label: "Single", value: "1" },
    { label: "1.5", value: "1.5" },
    { label: "Double", value: "2" },
    { label: "2.5", value: "2.5" },
    { label: "Triple", value: "3" },
    { label: "Reset", value: "" },
  ];
  const activeLineHeight =
    editor?.getAttributes("textStyle").lineHeight || "1.5";
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        className="bg-[#F1F4F9] h-[30px] rounded-none"
        asChild
      >
        <button className="text-sm h-7 min-w-9 flex items-center justify-center outline-none rounded-sm hover:bg-neutral-200/80">
          <ListCollapse size={16} />
          <ChevronDown
            color="#c2c4c7"
            size={16}
            className={cn("transition-transform", isOpen && "rotate-180")}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white border border-[#c2c4c7] p-1 rounded-md">
        {lineHeights.map((line) => (
          <DropdownMenuItem
            key={line.label}
            className={activeLineHeight === line.value ? "bg-[#F1F4F9]" : ""}
            onSelect={() => {
              if (line.value) {
                editor?.chain().focus().setLineHeight(line.value).run();
                return;
              }
              editor?.chain().focus().unsetLineHeight().run();
            }}
          >
            {line.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HeadingSelector = () => {
  const editor = useEditorStore((state) => state.editor);
  const [isOpen, setIsOpen] = useState(false);
  const headings = [
    { label: "Heading 1", value: "1", size: "32px" },
    { label: "Heading 2", value: "2", size: "24px" },
    { label: "Heading 3", value: "3", size: "20px" },
    { label: "Heading 4", value: "4", size: "18px" },
    { label: "Heading 5", value: "5", size: "16px" },
    { label: "Normal Text", value: "0", size: "14px" },
  ];
  const activeHeading =
    headings.find((heading) =>
      editor?.isActive("heading", { level: parseInt(heading.value) as Level }),
    )?.label || "Normal Text";
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        className="bg-[#F1F4F9] h-[30px] rounded-none"
        asChild
      >
        <Button className="py-0.5">
          {activeHeading || "Select Heading"}{" "}
          <ChevronDown
            color="#c2c4c7"
            size={16}
            className={cn("transition-transform", isOpen && "rotate-180")}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white border border-[#c2c4c7] p-1 rounded-md">
        {headings.map((heading) => (
          <DropdownMenuItem
            key={heading.value}
            className={
              editor?.isActive("heading", {
                level: parseInt(heading.value) as Level,
              })
                ? "bg-[#F1F4F9] p-4"
                : "p-4"
            }
            onSelect={() => {
              editor
                ?.chain()
                .focus()
                .toggleHeading({ level: parseInt(heading.value) as Level })
                .run();
            }}
            style={{ fontSize: heading.size }}
          >
            {heading.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const TextColorSelector = () => {
  const editor = useEditorStore((state) => state.editor);

  const value = editor?.getAttributes("textStyle").color || "#000000";
  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="bg-[#F1F4F9] h-[30px] rounded-none "
        asChild
      >
        <button className="py-0.5 flex flex-col items-center justify-center">
          <span className="text-xs">A</span>
          <div
            className="h-0.5 w-full"
            style={{ backgroundColor: value }}
          ></div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white border border-[#c2c4c7] p-1 rounded-md">
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HighlightColorSelector = () => {
  const editor = useEditorStore((state) => state.editor);
  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="bg-[#F1F4F9] h-[30px] rounded-none "
        asChild
      >
        <button className="py-0.5 flex flex-col items-center justify-center">
          <HighlighterIcon size={16} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white border border-[#c2c4c7] p-1 rounded-md">
        <SketchPicker onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const LinkButton = () => {
  const editor = useEditorStore((state) => state.editor);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  const { from, to } = editor?.state.selection || {};
  const isSelection = from !== to && from !== undefined;

  const handleLinkSubmit = () => {
    if (!linkUrl.trim()) {
      alert("URL cannot be empty");
      return;
    }

    if (!isSelection && !linkText.trim()) {
      alert("Link text cannot be empty");
      return;
    }

    try {
      if (!isSelection) {
        editor
          ?.chain()
          .focus()
          .insertContent({
            type: "text",
            text: linkText,
            marks: [
              {
                type: "link",
                attrs: {
                  href: linkUrl,
                },
              },
            ],
          })
          .run();
      } else {
        editor
          ?.chain()
          .focus()
          .extendMarkRange("link")
          .setLink({ href: linkUrl })
          .run();
      }
      setDialogOpen(false);
      setLinkText("");
      setLinkUrl("");
    } catch (e) {
      alert(e);
    }
  };

  const handleOpenDialog = () => {
    setLinkText("");
    setLinkUrl(editor?.getAttributes("link").href || "");
    setDialogOpen(true);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <button
          onClick={handleOpenDialog}
          className={cn(
            "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
            editor?.isActive("link") && "bg-neutral-200/80",
          )}
        >
          <Link2 size={16} />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-[#F1F4F9]">
        <DialogHeader>
          <DialogTitle>Add Link</DialogTitle>
          <DialogDescription>
            {isSelection
              ? "Enter the URL for the selected text"
              : "Enter link text and URL"}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {!isSelection && (
            <div>
              <label className="text-sm font-medium">Link Text</label>
              <input
                type="text"
                placeholder="Enter link text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
              />
            </div>
          )}
          <div>
            <label className="text-sm font-medium">URL</label>
            <input
              type="text"
              placeholder="https://example.com"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleLinkSubmit}>Add Link</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ImageButton = () => {
  const editor = useEditorStore((state) => state.editor);
  const [openDialog, setOpenDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };
  const handleUploadImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        onChange(url);
      }
    };
    input.click();
  };

  const handleInsertFromUrl = () => {
    onChange(imageUrl);
    setImageUrl("");
    setOpenDialog(false);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="bg-[#F1F4F9] h-[30px] rounded-none "
        asChild
      >
        <button
          className={cn(
            "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
            editor?.isActive("link") && "bg-neutral-200/80",
          )}
        >
          <ImageIcon size={16} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white border border-[#c2c4c7] p-1 rounded-md">
        <DropdownMenuItem onClick={() => handleUploadImage()}>
          Upload Image
        </DropdownMenuItem>
        <DropdownMenuItem>
          {" "}
          <span onClick={() => setOpenDialog(true)}>Insert from URL</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
      {openDialog && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="bg-[#F1F4F9]">
            <DialogHeader>
              <DialogTitle>Insert Image from URL</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Image URL</label>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpenDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => handleInsertFromUrl()}>
                  Insert Image
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </DropdownMenu>
  );
};

const AlignButton = () => {
  const editor = useEditorStore((state) => state.editor);
  const AlignIcons = [
    {
      label: "Left",
      icon: TextAlignStart,
      value: "left",
    },
    {
      label: "Center",
      icon: TextAlignCenter,
      value: "center",
    },
    {
      label: "Right",
      icon: TextAlignEnd,
      value: "right",
    },
    {
      label: "Justify",
      icon: TextAlignJustify,
      value: "justify",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const ActiveAlignment =
    AlignIcons.find((align) => editor?.isActive({ textAlign: align.value }))
      ?.icon || (TextAlignCenter as LucideIcon);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        className="bg-[#F1F4F9] h-[30px] rounded-none "
        asChild
      >
        <button className="text-sm h-7 min-w-9 flex items-center justify-center rounded-sm hover:bg-neutral-200/80">
          <ActiveAlignment size={16} />
          <ChevronDown
            color="#c2c4c7"
            size={16}
            className={cn("transition-transform", isOpen && "rotate-180")}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white border min-w-[50px] border-[#c2c4c7] p-1 rounded-md">
        {AlignIcons.map((align) => (
          <DropdownMenuItem
            className={
              editor?.isActive({ textAlign: align.value })
                ? "bg-[#F1F4F9] flex items-center"
                : "flex items-center"
            }
            key={align.value}
            onSelect={() =>
              editor
                ?.chain()
                .focus()
                .setTextAlign(
                  align.value as "left" | "center" | "right" | "justify",
                )
                .run()
            }
          >
            <align.icon size={16} className="mr-2" />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ListButton = () => {
  const editor = useEditorStore((state) => state.editor);
  const ListIcons = [
    {
      label: "toggleBulletList",
      icon: List,
      value: "bullet",
    },
    {
      label: "toggleOrderedList",
      icon: ListOrdered,
      value: "number",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const ActiveList =
    ListIcons.find((list) => editor?.isActive({ list: list.value }))?.icon ||
    (List as LucideIcon);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        className="bg-[#F1F4F9] h-[30px] rounded-none "
        asChild
      >
        <button className="text-sm h-7 min-w-9 flex items-center justify-center rounded-sm hover:bg-neutral-200/80">
          <ActiveList size={16} />
          <ChevronDown
            color="#c2c4c7"
            size={16}
            className={cn("transition-transform", isOpen && "rotate-180")}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white border min-w-[50px] border-[#c2c4c7] p-1 rounded-md">
        {ListIcons.map((list) => (
          <DropdownMenuItem
            className={
              editor?.isActive({ list: list.value })
                ? "bg-[#F1F4F9] flex items-center"
                : "flex items-center"
            }
            key={list.value}
            onSelect={
              list.value === "bullet"
                ? () => editor?.chain().focus().toggleBulletList().run()
                : () => editor?.chain().focus().toggleOrderedList().run()
            }
          >
            <list.icon size={16} className="mr-2" />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Toolbar = () => {
  const editor = useEditorStore((state) => state.editor);
  const sections: {
    isActive?: boolean;
    icon: LucideIcon;
    label: string;
    onClick: () => void;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2,
        onClick: () => editor?.chain().focus().undo().run(),
        isActive: editor?.can().undo() || false,
      },
      {
        label: "Redo",
        icon: Redo2,
        onClick: () => editor?.chain().focus().redo().run(),
        isActive: editor?.can().redo() || false,
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive("bold") || false,
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("italic") || false,
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive("underline") || false,
      },
      {
        label: "Strikethrough",
        icon: StrikethroughIcon,
        onClick: () => editor?.chain().focus().toggleStrike().run(),
        isActive: editor?.isActive("strike") || false,
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquareCodeIcon,
        onClick: () => console.log("Comment"),
      },
      {
        label: "ListTodo",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList") || false,
      },
      {
        label: "UnformatText",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];
  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-[15px] overflow-x-auto">
      {sections[0].map((item) => {
        return (
          <div key={item.label} className="flex items-center gap-[15px] ">
            <ToolbarButton {...item} />
          </div>
        );
      })}
      <Separator
        orientation="vertical"
        className="h-7 w-[1px] bg-neutral-900"
      />
      <HeadingSelector />
      <Separator
        orientation="vertical"
        className="h-7 w-[1px] bg-neutral-900"
      />
      <FontFamilySelector />
      <Separator
        orientation="vertical"
        className="h-7 w-[1px] bg-neutral-900"
      />
      {sections[1].map((item) => {
        return (
          <div key={item.label} className="flex items-center gap-[15px] ">
            <ToolbarButton
              {...item}
              isActive={editor?.isActive(item.label.toLocaleLowerCase())}
            />
          </div>
        );
      })}
      <TextColorSelector />
      <HighlightColorSelector />
      <Separator
        orientation="vertical"
        className="h-7 w-[1px] bg-neutral-900"
      />
      {sections[2].map((item) => {
        return (
          <div key={item.label} className="flex items-center gap-[15px] ">
            <ToolbarButton
              {...item}
              isActive={editor?.isActive(item.label.toLocaleLowerCase())}
            />
          </div>
        );
      })}

      <Separator
        orientation="vertical"
        className="h-7 w-[1px] bg-neutral-900"
      />
      <FontSizeSelector />
      <Separator
        orientation="vertical"
        className="h-7 w-[1px] bg-neutral-900"
      />

      <Separator
        orientation="vertical"
        className="h-7 w-[1px] bg-neutral-900"
      />
      <LinkButton />
      <ImageButton />
      <AlignButton />
      <LineHeightSelector />
      <ListButton />
    </div>
  );
};
