import type { ToolContent } from "@/types/chat";

/**
 * Friendly display for a tool_use block.
 *
 * Replaces the default "Called tool [weather_query]" chip + JSON dump with
 * a single product-grade status line that reads like Claude Code / Codex:
 *
 *   loading:    🌐  正在联网搜索…
 *   done:       🌐  ✓ 已完成联网搜索
 *
 * Unknown tools fall back to a generic 调用工具 label so we never leak raw
 * tool names / JSON into the chat by default.
 */

export interface ToolDisplay {
  /** Lucide icon name (used in the expanded row header). */
  iconName?: string;
  /** Single-character status glyph (e.g. "⋯" while loading, "✓" when done). */
  glyph: string;
  /** One-line status label, e.g. "正在联网搜索…" / "已完成联网搜索". */
  label: string;
}

interface ToolMeta {
  /** Lucide icon name. */
  iconName?: string;
  /** Status label shown while the tool is still running. */
  pending: string;
  /** Status label shown after the tool finished. */
  done: string;
}

/**
 * Known tool name → human-friendly label. Keys are normalized (lowercase,
 * underscores) before lookup, so "Web Search", "web-search", and
 * "WEB_SEARCH" all match the same entry.
 *
 * Add entries here as new tools show up in your flows.
 */
const KNOWN_TOOLS: Record<string, ToolMeta> = {
  web_search: {
    iconName: "Globe",
    pending: "正在联网搜索…",
    done: "已完成联网搜索",
  },
  web_search_results: {
    iconName: "Globe",
    pending: "正在联网搜索…",
    done: "已完成联网搜索",
  },
  google_search: {
    iconName: "Search",
    pending: "正在调用 Google 搜索…",
    done: "已完成 Google 搜索",
  },
  duckduckgo_search: {
    iconName: "Search",
    pending: "正在调用 DuckDuckGo 搜索…",
    done: "已完成 DuckDuckGo 搜索",
  },
  calculator: {
    iconName: "Calculator",
    pending: "正在计算…",
    done: "已完成计算",
  },
  python_repl: {
    iconName: "Code",
    pending: "正在执行 Python 代码…",
    done: "已完成 Python 执行",
  },
  retriever: {
    iconName: "BookOpen",
    pending: "正在检索知识库…",
    done: "已检索知识库",
  },
  knowledge_base: {
    iconName: "BookOpen",
    pending: "正在检索知识库…",
    done: "已检索知识库",
  },
  weather: {
    iconName: "Cloud",
    pending: "正在查询天气数据…",
    done: "已获取天气数据",
  },
  web_scraper: {
    iconName: "FileSearch",
    pending: "正在抓取网页内容…",
    done: "已抓取网页内容",
  },
};

function normalizeToolName(name: string | undefined): string {
  if (!name) return "";
  return name.toLowerCase().replace(/[\s-]+/g, "_");
}

function prettyToolName(name: string): string {
  return name.replace(/[_-]+/g, " ").trim();
}

/**
 * Returns the friendly display for a `tool_use` content block.
 *
 * @param content   The ToolContent from the message stream.
 * @param isLoading True while the parent message is still streaming
 *                  (per-tool loading is derived from `content.duration`).
 */
export function getToolDisplay(
  content: ToolContent,
  isLoading: boolean,
): ToolDisplay {
  const key = normalizeToolName(content.name);
  const meta = KNOWN_TOOLS[key];

  if (meta) {
    if (isLoading) {
      return { iconName: meta.iconName, glyph: "⋯", label: meta.pending };
    }
    return { iconName: meta.iconName, glyph: "✓", label: meta.done };
  }

  const pretty = prettyToolName(content.name ?? "");
  if (isLoading) {
    return {
      iconName: "Wrench",
      glyph: "⋯",
      label: pretty ? `正在调用工具: ${pretty}…` : "正在调用工具…",
    };
  }
  return {
    iconName: "Wrench",
    glyph: "✓",
    label: pretty ? `已调用工具: ${pretty}` : "已调用工具",
  };
}
