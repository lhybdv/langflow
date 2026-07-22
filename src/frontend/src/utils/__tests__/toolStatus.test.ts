import type { ToolContent } from "@/types/chat";
import { getToolDisplay } from "../toolStatus";

const make = (
  name: string,
  duration?: number,
  tool_input: Record<string, unknown> = {},
): ToolContent => ({
  type: "tool_use",
  name,
  tool_input: tool_input as ToolContent["tool_input"],
  duration,
});

describe("toolStatus", () => {
  describe("getToolDisplay — known tools", () => {
    it("renders web_search with friendly Chinese label and Globe icon", () => {
      const pending = getToolDisplay(make("web_search"), true);
      expect(pending.iconName).toBe("Globe");
      expect(pending.glyph).toBe("⋯");
      expect(pending.label).toBe("正在联网搜索…");

      const done = getToolDisplay(make("web_search", 1200), false);
      expect(done.glyph).toBe("✓");
      expect(done.label).toBe("已完成联网搜索");
    });

    it("normalizes name variants (case, dash, space) to the same lookup", () => {
      const a = getToolDisplay(make("Web Search"), false);
      const b = getToolDisplay(make("web-search"), false);
      const c = getToolDisplay(make("WEB_SEARCH"), false);
      expect(a.label).toBe(b.label);
      expect(b.label).toBe(c.label);
      expect(a.label).toBe("已完成联网搜索");
    });

    it("renders calculator / python_repl with their respective labels", () => {
      expect(getToolDisplay(make("calculator", 100), false).label).toBe(
        "已完成计算",
      );
      expect(getToolDisplay(make("python_repl", 100), false).label).toBe(
        "已完成 Python 执行",
      );
    });
  });

  describe("getToolDisplay — generic fallback", () => {
    it("falls back to '调用工具' for unknown tool names", () => {
      const done = getToolDisplay(make("mystery_tool_xyz", 800), false);
      expect(done.glyph).toBe("✓");
      expect(done.label).toBe("已调用工具: mystery tool xyz");
    });

    it("uses '正在调用工具' while loading", () => {
      const pending = getToolDisplay(make("mystery_tool_xyz"), true);
      expect(pending.glyph).toBe("⋯");
      expect(pending.label).toBe("正在调用工具: mystery tool xyz…");
    });

    it("handles missing name gracefully", () => {
      expect(
        getToolDisplay({ type: "tool_use", tool_input: {} }, false).label,
      ).toBe("已调用工具");
      expect(
        getToolDisplay({ type: "tool_use", tool_input: {} }, true).label,
      ).toBe("正在调用工具…");
    });
  });

  describe("loading-vs-done distinction", () => {
    it("returns the pending label while loading", () => {
      const d = getToolDisplay(make("web_search"), true);
      expect(d.label).toBe("正在联网搜索…");
      expect(d.glyph).toBe("⋯");
    });

    it("returns the done label when loading has finished", () => {
      // The caller (ContentBlockDisplay) computes isToolLoading from
      // `!content.duration`, so once the backend reports a duration the
      // caller passes false here.
      const d = getToolDisplay(make("web_search", 250), false);
      expect(d.label).toBe("已完成联网搜索");
      expect(d.glyph).toBe("✓");
    });
  });
});
