"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  $getRoot,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import {
  $createHeadingNode,
  $createQuoteNode,
  HeadingTagType,
} from "@lexical/rich-text";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { $isImageNode } from "../nodes/ImageNode";
import { cn } from "@/lib/utils";
import {
  Bold,
  Italic,
  Underline,
  Undo,
  Redo,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Quote,
  Table as TableIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ImageIcon,
  Link as LinkIcon,
  Plus,
  Trash2,
  Type,
  AlignJustify,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { INSERT_IMAGE_COMMAND } from "./ImagesPlugin";
import { INSERT_TABLE_COMMAND } from "./TablePlugin";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [blockType, setBlockType] = useState("paragraph");
  const [imageAlignment, setImageAlignment] = useState<
    "left" | "center" | "right" | "full"
  >("center");

  // Table State
  const [tableRows, setTableRows] = useState("3");
  const [tableCols, setTableCols] = useState("3");

  // Link State
  const [linkUrl, setLinkUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
          src: reader.result as string,
          altText: file.name,
        });
      };
      reader.readAsDataURL(file);
      // Reset input
      e.target.value = "";
    }
  };

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));

      // Check link
      const node = selection.getNodes()[0];
      const parent = node?.getParent();
      setIsLink(parent?.getType() === "link");

      // Check block type
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementType = element.getType();

      if (elementType === "heading") {
        const tag = (element as any).__tag;
        setBlockType(tag || "h1");
      } else {
        setBlockType(elementType);
      }

      // Check for image alignment
      const nodes = selection.getNodes();
      let imageNodeFound = false;
      for (const node of nodes) {
        if ($isImageNode(node)) {
          setImageAlignment(node.__alignment);
          imageNodeFound = true;
          break;
        }
      }
      setIsImageSelected(imageNodeFound);
    } else {
      setIsImageSelected(false);
    }
  }, []);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, _newEditor) => {
        updateToolbar();
        return false;
      },
      1,
    );
  }, [editor, updateToolbar]);

  useEffect(() => {
    return editor.registerCommand(
      CAN_UNDO_COMMAND,
      (payload) => {
        setCanUndo(payload);
        return false;
      },
      1,
    );
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      CAN_REDO_COMMAND,
      (payload) => {
        setCanRedo(payload);
        return false;
      },
      1,
    );
  }, [editor]);

  const formatHeading = (headingSize: HeadingTagType) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      }
    });
  };

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const formatBulletList = () => {
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  };

  const deleteCurrentBlock = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const nodes = selection.getNodes();
        const element = nodes[0]?.getTopLevelElementOrThrow();
        if (element) {
          element.remove();
        }
      }
    });
  };

  const insertTable = () => {
    editor.dispatchCommand(INSERT_TABLE_COMMAND, {
      columns: tableCols,
      rows: tableRows,
    });
  };

  const formatImageAlignment = (
    alignment: "left" | "center" | "right" | "full",
  ) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const nodes = selection.getNodes();
        nodes.forEach((node) => {
          if ($isImageNode(node)) {
            node.getWritable().__alignment = alignment;
          }
        });
      }
    });
  };

  const insertLink = () => {
    if (linkUrl) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
      setLinkUrl("");
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  };

  return (
    <div className="flex items-center gap-2 p-2.5 border-b border-slate-700/50 bg-slate-800/80 backdrop-blur-xl sticky top-0 z-30 flex-wrap sm:flex-nowrap overflow-x-auto no-scrollbar shadow-sm rounded-t-2xl">
      {/* Undo/Redo Group */}
      <div className="flex items-center bg-slate-900/40 rounded-xl p-1 shrink-0 border border-slate-700/30">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-slate-700/50 text-slate-400 hover:text-white transition-all disabled:opacity-30"
          disabled={!canUndo}
          onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
          title="Undo"
          type="button"
        >
          <Undo className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-slate-700/50 text-slate-400 hover:text-white transition-all disabled:opacity-30"
          disabled={!canRedo}
          onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
          title="Redo"
          type="button"
        >
          <Redo className="w-4 h-4" />
        </Button>
      </div>

      <Separator
        orientation="vertical"
        className="h-6 bg-slate-700/50 mx-1 shrink-0"
      />

      {/* Basic Formatting */}
      <div className="flex items-center bg-slate-900/40 rounded-xl p-1 shrink-0 border border-slate-700/30">
        <Button
          variant={isBold ? "default" : "ghost"}
          size="sm"
          className={cn(
            "h-8 w-8 p-0 transition-all",
            isBold
              ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
              : "text-slate-400 hover:bg-slate-700/50 hover:text-white",
          )}
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
          title="Bold"
          type="button"
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          variant={isItalic ? "default" : "ghost"}
          size="sm"
          className={cn(
            "h-8 w-8 p-0 transition-all",
            isItalic
              ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
              : "text-slate-400 hover:bg-slate-700/50 hover:text-white",
          )}
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
          title="Italic"
          type="button"
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          variant={isUnderline ? "default" : "ghost"}
          size="sm"
          className={cn(
            "h-8 w-8 p-0 transition-all",
            isUnderline
              ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
              : "text-slate-400 hover:bg-slate-700/50 hover:text-white",
          )}
          onClick={() =>
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
          }
          title="Underline"
          type="button"
        >
          <Underline className="w-4 h-4" />
        </Button>
      </div>

      <Separator
        orientation="vertical"
        className="h-6 bg-slate-700/50 mx-1 shrink-0"
      />

      {/* Block Styling Group */}
      <div className="flex items-center bg-slate-900/40 rounded-xl p-1 shrink-0 border border-slate-700/30">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-8 w-8 p-0 transition-all group",
            blockType === "paragraph"
              ? "text-orange-400 bg-slate-800"
              : "text-slate-400 hover:bg-slate-700/50 hover:text-white",
          )}
          onClick={formatParagraph}
          title="Paragraph"
          type="button"
        >
          <Type className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-8 w-8 p-0 transition-all group",
            blockType === "h1"
              ? "text-orange-400 bg-slate-800"
              : "text-slate-400 hover:bg-slate-700/50 hover:text-white",
          )}
          onClick={() => formatHeading("h1")}
          title="Heading 1"
          type="button"
        >
          <Heading1 className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-8 w-8 p-0 transition-all group",
            blockType === "h2"
              ? "text-orange-400 bg-slate-800"
              : "text-slate-400 hover:bg-slate-700/50 hover:text-white",
          )}
          onClick={() => formatHeading("h2")}
          title="Heading 2"
          type="button"
        >
          <Heading2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-8 w-8 p-0 transition-all group",
            blockType === "list"
              ? "text-orange-400 bg-slate-800"
              : "text-slate-400 hover:bg-slate-700/50 hover:text-white",
          )}
          onClick={formatBulletList}
          title="List"
          type="button"
        >
          <List className="w-4 h-4" />
        </Button>
      </div>

      <Separator
        orientation="vertical"
        className="h-6 bg-slate-700/50 mx-1 shrink-0"
      />

      {/* Insertion Group */}
      <div className="flex items-center bg-slate-900/40 rounded-xl p-1 shrink-0 border border-slate-700/30 gap-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={isLink ? "secondary" : "ghost"}
              size="sm"
              className={cn(
                "h-8 w-8 p-0 transition-all",
                isLink
                  ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                  : "text-slate-400 hover:bg-slate-700/50 hover:text-white",
              )}
              title="Add Link"
              type="button"
            >
              <LinkIcon className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-72 p-4 bg-slate-800 border-slate-700 shadow-2xl rounded-2xl"
            sideOffset={8}
          >
            <div className="space-y-4">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Hyperlink URL
              </Label>
              <div className="flex gap-2">
                <Input
                  placeholder="https://..."
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="h-9 text-xs bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-600 focus:ring-orange-500/50"
                />
                <Button
                  size="sm"
                  onClick={insertLink}
                  className="h-9 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                >
                  Link
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-slate-400 hover:bg-slate-700/50 hover:text-white transition-all"
              title="New Table"
              type="button"
            >
              <TableIcon className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-48 p-4 bg-slate-800 border-slate-700 shadow-2xl rounded-2xl"
            sideOffset={8}
          >
            <div className="space-y-4">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Dimensions
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-[10px] text-slate-500">Rows</Label>
                  <Input
                    type="number"
                    value={tableRows}
                    onChange={(e) => setTableRows(e.target.value)}
                    className="h-8 text-xs bg-slate-900/50 border-slate-700 text-white px-2"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] text-slate-500">Cols</Label>
                  <Input
                    type="number"
                    value={tableCols}
                    onChange={(e) => setTableCols(e.target.value)}
                    className="h-8 text-xs bg-slate-900/50 border-slate-700 text-white px-2"
                  />
                </div>
              </div>
              <Button
                onClick={insertTable}
                size="sm"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-[10px] uppercase tracking-wider py-4 h-auto rounded-xl"
              >
                Create Grid
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={onImageUpload}
        />
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-slate-400 hover:bg-slate-700/50 hover:text-white transition-all"
          onClick={() => fileInputRef.current?.click()}
          title="Add Image"
          type="button"
        >
          <ImageIcon className="w-4 h-4" />
        </Button>
      </div>

      {isImageSelected && (
        <>
          <Separator
            orientation="vertical"
            className="h-6 bg-slate-700/50 mx-1 shrink-0"
          />
          <div className="flex items-center bg-slate-900/40 rounded-xl p-1 shrink-0 border border-slate-700/30">
            <Button
              variant={imageAlignment === "left" ? "default" : "ghost"}
              size="sm"
              className={cn(
                "h-8 w-8 p-0 transition-all",
                imageAlignment === "left"
                  ? "bg-orange-500 text-white"
                  : "text-slate-400 hover:bg-slate-700/50",
              )}
              onClick={() => formatImageAlignment("left")}
              title="Image Left"
              type="button"
            >
              <AlignLeft className="w-4 h-4" />
            </Button>
            <Button
              variant={imageAlignment === "center" ? "default" : "ghost"}
              size="sm"
              className={cn(
                "h-8 w-8 p-0 transition-all",
                imageAlignment === "center"
                  ? "bg-orange-500 text-white"
                  : "text-slate-400 hover:bg-slate-700/50",
              )}
              onClick={() => formatImageAlignment("center")}
              title="Image Center"
              type="button"
            >
              <AlignCenter className="w-4 h-4" />
            </Button>
            <Button
              variant={imageAlignment === "right" ? "default" : "ghost"}
              size="sm"
              className={cn(
                "h-8 w-8 p-0 transition-all",
                imageAlignment === "right"
                  ? "bg-orange-500 text-white"
                  : "text-slate-400 hover:bg-slate-700/50",
              )}
              onClick={() => formatImageAlignment("right")}
              title="Image Right"
              type="button"
            >
              <AlignRight className="w-4 h-4" />
            </Button>
            <Button
              variant={imageAlignment === "full" ? "default" : "ghost"}
              size="sm"
              className={cn(
                "h-8 w-8 p-0 transition-all",
                imageAlignment === "full"
                  ? "bg-orange-500 text-white"
                  : "text-slate-400 hover:bg-slate-700/50",
              )}
              onClick={() => formatImageAlignment("full")}
              title="Image Full Width"
              type="button"
            >
              <AlignJustify className="w-4 h-4" />
            </Button>
          </div>
        </>
      )}

      <div className="flex-1" />

      {/* Alignment Group */}
      <div className="flex items-center bg-slate-900/40 rounded-xl p-1 shrink-0 border border-slate-700/30">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-slate-400 hover:bg-slate-700/50 hover:text-white transition-all"
          onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}
          title="Left"
          type="button"
        >
          <AlignLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-slate-400 hover:bg-slate-700/50 hover:text-white transition-all"
          onClick={() =>
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")
          }
          title="Center"
          type="button"
        >
          <AlignCenter className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-slate-400 hover:bg-slate-700/50 hover:text-white transition-all"
          onClick={() =>
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")
          }
          title="Right"
          type="button"
        >
          <AlignRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Extreme Action */}
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 text-slate-500 hover:bg-red-500/20 hover:text-red-400 transition-all rounded-xl ml-1"
        onClick={deleteCurrentBlock}
        title="Delete Block"
        type="button"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
