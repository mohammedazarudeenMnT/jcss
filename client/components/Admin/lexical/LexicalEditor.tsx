"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableNode, TableCellNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState } from "react";
import {
  $getRoot,
  $isElementNode,
  $isDecoratorNode,
  $createParagraphNode,
} from "lexical";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { ImageNode } from "./nodes/ImageNode";
import ImagesPlugin from "./plugins/ImagesPlugin";
import TableInsertPlugin from "./plugins/TablePlugin";

const theme = {
  ltr: "ltr",
  rtl: "rtl",
  placeholder: "editor-placeholder",
  paragraph: "mb-4 text-base tracking-normal leading-relaxed text-slate-200",
  quote:
    "border-l-4 border-orange-500 pl-6 italic my-6 text-lg text-slate-400 font-sans bg-slate-800/50 py-4 rounded-r-lg",
  heading: {
    h1: "text-3xl font-bold mb-6 mt-8 tracking-tight text-white",
    h2: "text-2xl font-bold mb-4 mt-6 tracking-tight text-white",
    h3: "text-xl font-bold mb-3 mt-4 tracking-tight text-white",
    h4: "text-lg font-bold mb-2 mt-4 tracking-tight text-white",
    h5: "text-base font-bold mb-2 mt-2 tracking-tight text-white",
  },
  list: {
    nested: {
      listitem: "list-none",
    },
    ol: "list-decimal ml-8 mb-4 mt-2 space-y-1 text-slate-200",
    ul: "list-disc ml-8 mb-4 mt-2 space-y-1 text-slate-200",
    listitem: "pl-2",
  },
  link: "text-orange-400 hover:text-orange-300 transition-all underline decoration-orange-400/30 underline-offset-4 cursor-pointer",
  text: {
    bold: "font-semibold text-white",
    italic: "italic",
    underline: "underline decoration-orange-500/40 underline-offset-4",
    strikethrough: "line-through opacity-50",
    code: "bg-slate-900/80 px-1.5 py-0.5 rounded-md font-mono text-sm border border-slate-700/50 text-orange-400",
  },
  table:
    "NewsletterTable border-collapse w-full my-6 border border-slate-700 rounded-lg overflow-hidden",
  tableCell: "border border-slate-700 p-3 min-w-[100px] text-slate-300",
  tableCellHeader:
    "bg-slate-800/80 font-bold border border-slate-700 p-3 text-white",
};

function HtmlPlugin({
  initialHtml,
  onHtmlChange,
}: {
  initialHtml?: string;
  onHtmlChange: (html: string) => void;
}) {
  const [editor] = useLexicalComposerContext();
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender && initialHtml && initialHtml !== "") {
      editor.update(() => {
        const parser = new DOMParser();
        const dom = parser.parseFromString(initialHtml, "text/html");
        const nodes = $generateNodesFromDOM(editor, dom);

        $getRoot().clear();
        nodes.forEach((node) => {
          if ($isElementNode(node) || $isDecoratorNode(node)) {
            $getRoot().append(node);
          } else {
            const paragraph = $createParagraphNode();
            paragraph.append(node);
            $getRoot().append(paragraph);
          }
        });
      });
      setIsFirstRender(false);
    }
  }, [editor, initialHtml, isFirstRender]);

  return (
    <OnChangePlugin
      onChange={(editorState) => {
        editorState.read(() => {
          const html = $generateHtmlFromNodes(editor, null);
          onHtmlChange(html);
        });
      }}
    />
  );
}

interface LexicalEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export default function LexicalEditor({
  value,
  onChange,
  placeholder,
  minHeight = "300px",
}: LexicalEditorProps) {
  const initialConfig = {
    namespace: "TrusCompEditor",
    theme,
    onError: (error: Error) => {
      console.error(error);
    },
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
      ImageNode,
    ] as any[],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div
        className="relative rounded-2xl bg-transparent flex flex-col transition-all TrusCompEditor"
        style={{ minHeight }}
      >
        <ToolbarPlugin />
        <div className="flex-1 relative overflow-visible mt-4 group bg-slate-900/20 rounded-xl inner-shadow-sm">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="outline-none focus:ring-0 text-[15px] leading-relaxed font-sans text-slate-200 selection:bg-orange-500/30 px-5 py-4 min-h-full"
                style={{ minHeight: `calc(${minHeight} - 80px)` }}
              />
            }
            placeholder={
              <div className="absolute top-4 left-5 text-slate-500/50 pointer-events-none text-[15px] italic font-sans flex items-center select-none">
                {placeholder || "Tell your story..."}
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
          <TablePlugin hasCellMerge hasCellBackgroundColor hasTabHandler />
          <TableInsertPlugin />
          <ImagesPlugin />
          <HtmlPlugin initialHtml={value} onHtmlChange={onChange} />
        </div>
      </div>
    </LexicalComposer>
  );
}
