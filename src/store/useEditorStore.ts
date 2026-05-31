import { create } from "zustand";
import { type Editor } from "@tiptap/react";

interface EditorStore {
  editor: Editor | null;
  leftMargin: number;
  rightMargin: number;
  setLeftMargin: (margin: number) => void;
  setRightMargin: (margin: number) => void;
  setEditor: (editor: Editor | null) => void;
}
export const useEditorStore = create<EditorStore>((set) => ({
  editor: null,
  leftMargin: 56,
  rightMargin: 56,
  setLeftMargin: (margin) => set({ leftMargin: margin }),
  setRightMargin: (margin) => set({ rightMargin: margin }),
  setEditor: (e) => set({ editor: e }),
}));
