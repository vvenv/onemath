import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import { Moon, Sun, Palette, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  getTheme,
  setColorScheme,
  setMode,
  setCustomColors,
  resetCustomColors,
  type ColorScheme,
  type ThemeMode,
  BUILT_IN_THEMES,
} from "@/lib/theme";

// Helper function to convert color to hex format for input[type="color"]
const colorToHex = (color: string): string => {
  if (typeof document === "undefined") return "#000000";

  // Use Canvas API to reliably convert any CSS color format to hex
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "#000000";

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;

  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
};

// Get preview colors for a color scheme using a temporary detached element
const getThemePreviewColors = (
  scheme: ColorScheme,
  mode: ThemeMode,
): string[] => {
  if (typeof document === "undefined")
    return ["#ffffff", "#000000", "#000000", "#f5f5f5"];

  // Create a temporary detached element to avoid DOM manipulation
  const tempDiv = document.createElement("div");
  tempDiv.setAttribute("data-color-scheme", scheme);
  if (mode === "dark") {
    tempDiv.classList.add("dark");
  }
  // Append to body to inherit CSS variables
  document.body.appendChild(tempDiv);

  const computed = getComputedStyle(tempDiv);
  const colors = [
    computed.getPropertyValue("--background").trim(),
    computed.getPropertyValue("--foreground").trim(),
    computed.getPropertyValue("--primary").trim(),
    computed.getPropertyValue("--muted").trim(),
  ];

  // Remove temporary element
  document.body.removeChild(tempDiv);

  return colors;
};

export function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCustomColors, setShowCustomColors] = useState(false);
  const [customColors, setCustomColorsState] = useState<Record<string, string>>(
    {},
  );
  const [theme, setThemeState] = useState(getTheme());
  const [refreshKey, setRefreshKey] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close on ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Focus trap when panel is open
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;

    const focusableElements = panelRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    firstElement?.focus();
    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  // Sync color pickers with current theme colors when theme changes
  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;
    const computed = getComputedStyle(root);

    const colorKeys = ["background", "foreground", "primary", "muted"];
    const newColors: Record<string, string> = {};

    colorKeys.forEach((key) => {
      const cssVar = `--${key}`;
      const colorValue = computed.getPropertyValue(cssVar).trim();
      if (colorValue) {
        newColors[key] = colorToHex(colorValue);
      }
    });

    setCustomColorsState(newColors);
  }, [theme.colorScheme, theme.mode, refreshKey]);

  const handleColorSchemeChange = (scheme: ColorScheme) => {
    setColorScheme(scheme);
    setThemeState(getTheme());
    // Force refresh color pickers
    setRefreshKey((prev) => prev + 1);
  };

  const handleModeSet = (mode: ThemeMode) => {
    setMode(mode);
    setThemeState(getTheme());
    // Force refresh color pickers
    setRefreshKey((prev) => prev + 1);
  };

  const handleCustomColorChange = (colorKey: string, value: string) => {
    setCustomColorsState((prev) => {
      const newColors = { ...prev, [colorKey]: value };
      setCustomColors(newColors);
      return newColors;
    });
  };

  const colorPresets = [
    { key: "background", label: "背景色", default: "#ffffff" },
    { key: "foreground", label: "前景色", default: "#000000" },
    { key: "primary", label: "主色调", default: "#000000" },
    { key: "muted", label: "次要色", default: "#f5f5f5" },
  ];

  const handleResetCustomColors = useCallback(() => {
    resetCustomColors();
    setThemeState(getTheme());
    setRefreshKey((prev) => prev + 1);
  }, []);

  const hasCustomColors = Object.keys(theme.customColors || {}).length > 0;

  // Pre-compute all preview colors for both modes once on mount to avoid any reflows
  const previewColorsCacheRef = useRef<
    Record<"light" | "dark", Record<string, string[]>>
  >({
    light: {},
    dark: {},
  });

  useLayoutEffect(() => {
    if (typeof document === "undefined") return;

    // Compute all preview colors for both light and dark modes once
    const cache: Record<"light" | "dark", Record<string, string[]>> = {
      light: {},
      dark: {},
    };

    BUILT_IN_THEMES.forEach((builtInTheme) => {
      cache.light[builtInTheme.id] = getThemePreviewColors(
        builtInTheme.id,
        "light",
      );
      cache.dark[builtInTheme.id] = getThemePreviewColors(
        builtInTheme.id,
        "dark",
      );
    });

    previewColorsCacheRef.current = cache;
  }, []); // Only run once on mount

  return (
    <div className="relative">
      <Button
        ref={triggerRef}
        type="button"
        variant="ghost"
        size="icon-sm"
        className="active:translate-y-0!"
        aria-label="主题设置"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Palette className="size-4" />
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <Card
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="theme-dialog-title"
            className="fixed left-4 right-4 top-20 z-50 max-h-[calc(100vh-6rem)] max-w-md overflow-y-auto p-4 shadow-lg sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-2 sm:h-auto sm:w-96 sm:max-h-[80vh]"
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 id="theme-dialog-title" className="text-lg font-semibold">
                  主题设置
                </h2>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setIsOpen(false)}
                  aria-label="关闭"
                >
                  <X className="size-4" />
                </Button>
              </div>

              {/* Mode Toggle - Basic Setting */}
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">
                  基础设置
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <span className="font-medium">显示模式</span>
                  <div className="flex gap-1">
                    <Button
                      type="button"
                      variant={theme.mode === "light" ? "default" : "outline"}
                      onClick={() => handleModeSet("light")}
                      className="flex-1"
                    >
                      <Sun className="mr-1 size-3" />
                      亮色
                    </Button>
                    <Button
                      type="button"
                      variant={theme.mode === "dark" ? "default" : "outline"}
                      onClick={() => handleModeSet("dark")}
                      className="flex-1"
                    >
                      <Moon className="mr-1 size-3" />
                      暗色
                    </Button>
                  </div>
                </div>
              </div>

              {/* Color Scheme Selection */}
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">
                  配色方案
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {BUILT_IN_THEMES.map((builtInTheme) => {
                    const previewColors =
                      previewColorsCacheRef.current[theme.mode][
                        builtInTheme.id
                      ];
                    return (
                      <Button
                        key={builtInTheme.id}
                        type="button"
                        variant={
                          theme.colorScheme === builtInTheme.id
                            ? "default"
                            : "outline"
                        }
                        onClick={() => handleColorSchemeChange(builtInTheme.id)}
                        className="relative flex items-center justify-between px-3"
                      >
                        <div className="flex-1 flex items-center justify-between gap-3">
                          <span className="font-medium">
                            {builtInTheme.name}
                          </span>
                          {/* Color Preview Swatches */}
                          <div className="flex gap-0.5">
                            {previewColors.map((color, idx) => (
                              <div
                                key={idx}
                                className="size-4 rounded-sm border border-border"
                                style={{ backgroundColor: color }}
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Colors Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-muted-foreground">
                    自定义颜色
                  </div>
                  {hasCustomColors && (
                    <Badge variant="secondary" className="text-xs">
                      已修改
                    </Badge>
                  )}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCustomColors(!showCustomColors)}
                  className="w-full"
                  aria-expanded={showCustomColors}
                  aria-controls="custom-colors-panel"
                >
                  <Palette className="mr-1 size-3" />
                  {showCustomColors ? "收起" : "展开"}自定义颜色
                </Button>

                {showCustomColors && (
                  <div
                    id="custom-colors-panel"
                    className="mt-3 space-y-3 rounded-lg border border-border p-3"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      {colorPresets.map((preset) => (
                        <div key={preset.key} className="flex flex-col gap-1.5">
                          <label
                            htmlFor={`color-${preset.key}`}
                            className="text-sm font-medium"
                          >
                            {preset.label}
                          </label>
                          <div className="flex items-center gap-2">
                            <Input
                              id={`color-${preset.key}`}
                              type="color"
                              value={
                                customColors[preset.key] ||
                                theme.customColors?.[preset.key] ||
                                preset.default
                              }
                              onChange={(e) =>
                                handleCustomColorChange(
                                  preset.key,
                                  e.target.value,
                                )
                              }
                              className="h-8 w-8 cursor-pointer rounded border border-border p-0"
                            />
                            <span className="text-xs text-muted-foreground">
                              {customColors[preset.key] ||
                                theme.customColors?.[preset.key] ||
                                preset.default}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    {hasCustomColors && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleResetCustomColors}
                        className="w-full text-muted-foreground hover:text-destructive"
                      >
                        <X className="mr-1 size-3" />
                        重置为默认
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
