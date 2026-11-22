import { Fragment, type ReactNode } from "react";

/**
 * Helpers for messages that embed React elements (bold text, link, code).
 * The translator keeps control of word order.
 */

/** Placeholder value for a single embedded node: pass it as the placeholder var, then call withNode(). */
export const NODE_SLOT = "\u0001";

export function withNode(text: string, node: ReactNode): ReactNode {
  const [before = "", after = ""] = text.split(NODE_SLOT);
  return (
    <>
      {before}
      {node}
      {after}
    </>
  );
}

/**
 * Several embedded nodes: call t(key) without vars, then swap each {name}
 * placeholder for the node of the same name.
 */
export function withNodes(text: string, nodes: Record<string, ReactNode>): ReactNode {
  const parts = text.split(/\{(\w+)\}/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <Fragment key={i}>{nodes[part] ?? `{${part}}`}</Fragment>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}
