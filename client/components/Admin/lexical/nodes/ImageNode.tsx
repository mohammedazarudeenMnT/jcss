import {
  DecoratorNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
  DOMExportOutput,
  LexicalNode,
  EditorConfig,
  DOMConversionMap,
  DOMConversionOutput,
} from "lexical";
import * as React from "react";

export interface ImagePayload {
  altText: string;
  height?: number;
  key?: NodeKey;
  maxWidth?: number;
  src: string;
  width?: number;
  alignment?: "left" | "center" | "right" | "full";
}

function $convertImageElement(domNode: Node): DOMConversionOutput | null {
  if (domNode instanceof HTMLImageElement) {
    const { src, alt, width, height } = domNode;
    const node = $createImageNode({ src, altText: alt });
    if (width) node.__width = width;
    if (height) node.__height = height;
    return { node };
  }
  return null;
}

export type SerializedImageNode = Spread<
  {
    altText: string;
    height?: number;
    maxWidth?: number;
    src: string;
    width?: number;
    alignment?: "left" | "center" | "right" | "full";
  },
  SerializedLexicalNode
>;

export class ImageNode extends DecoratorNode<React.ReactNode> {
  __src: string;
  __altText: string;
  __width: "inherit" | number;
  __height: "inherit" | number;
  __maxWidth: number;
  __alignment: "left" | "center" | "right" | "full";

  static getType(): string {
    return "image";
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(
      node.__src,
      node.__altText,
      node.__maxWidth,
      node.__alignment,
      node.__width,
      node.__height,
      node.__key,
    );
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const { altText, height, maxWidth, src, width, alignment } = serializedNode;
    const node = $createImageNode({
      altText,
      height,
      maxWidth,
      src,
      width,
      alignment,
    });
    return node;
  }

  constructor(
    src: string,
    altText: string,
    maxWidth: number,
    alignment?: "left" | "center" | "right" | "full",
    width?: "inherit" | number,
    height?: "inherit" | number,
    key?: NodeKey,
  ) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__maxWidth = maxWidth;
    this.__alignment = alignment || "center";
    this.__width = width || "inherit";
    this.__height = height || "inherit";
  }

  static importDOM(): DOMConversionMap | null {
    return {
      img: (node: Node) => ({
        conversion: $convertImageElement,
        priority: 0,
      }),
    };
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("img");
    element.setAttribute("src", this.__src);
    element.setAttribute("alt", this.__altText);
    element.setAttribute("width", this.__width.toString());
    element.setAttribute("height", this.__height.toString());

    let style =
      "max-width: 100%; height: auto; border-radius: 16px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3); margin: 2rem auto; display: block;";

    if (this.__alignment === "left") {
      style =
        "max-width: 40%; height: auto; border-radius: 12px; float: left; margin: 0 1.5rem 1rem 0;";
    } else if (this.__alignment === "right") {
      style =
        "max-width: 40%; height: auto; border-radius: 12px; float: right; margin: 0 0 1rem 1.5rem;";
    } else if (this.__alignment === "full") {
      style =
        "width: 100%; height: auto; border-radius: 20px; margin: 2.5rem 0; display: block;";
    }

    element.setAttribute("style", style);
    return { element };
  }

  exportJSON(): SerializedImageNode {
    return {
      altText: this.getAltText(),
      height: this.__height === "inherit" ? 0 : this.__height,
      maxWidth: this.__maxWidth,
      src: this.getSrc(),
      alignment: this.__alignment,
      type: "image",
      version: 1,
      width: this.__width === "inherit" ? 0 : this.__width,
    };
  }

  getSrc(): string {
    return this.__src;
  }

  getAltText(): string {
    return this.__altText;
  }

  createDOM(config: EditorConfig): HTMLElement {
    const span = document.createElement("span");
    const theme = config.theme;
    const className = theme.image;
    if (className !== undefined) {
      span.className = className;
    }
    return span;
  }

  updateDOM(): false {
    return false;
  }

  decorate(): React.ReactNode {
    const alignmentClasses = {
      left: "float-left mr-6 mb-4 max-w-[40%]",
      center: "mx-auto block my-8",
      right: "float-right ml-6 mb-4 max-w-[40%]",
      full: "w-full my-10 block",
    }[this.__alignment];

    return (
      <div
        className={`group relative inline-block transition-all duration-500 ease-out ${alignmentClasses}`}
      >
        <div className="relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 group-hover:shadow-orange-500/20 group-hover:scale-[1.02]">
          <img
            src={this.__src}
            alt={this.__altText}
            className="w-full h-auto object-cover"
            style={{
              width: this.__width === "inherit" ? "auto" : this.__width,
              height: this.__height === "inherit" ? "auto" : this.__height,
            }}
          />
          {/* Subtle overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Focus Ring / Selection Indicator */}
          <div className="absolute inset-0 ring-2 ring-orange-500/0 group-hover:ring-orange-500/40 rounded-2xl transition-all pointer-events-none" />
        </div>

        {/* Alignment Indicator (Visible on Hover) */}
        <div className="absolute -top-3 -right-3 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg shadow-orange-500/50 uppercase tracking-widest z-10">
          {this.__alignment}
        </div>
      </div>
    );
  }
}

export function $createImageNode({
  altText,
  height,
  maxWidth = 500,
  src,
  width,
  alignment = "center",
  key,
}: ImagePayload): ImageNode {
  return new ImageNode(src, altText, maxWidth, alignment, width, height, key);
}

export function $isImageNode(
  node: LexicalNode | null | undefined,
): node is ImageNode {
  return node instanceof ImageNode;
}
