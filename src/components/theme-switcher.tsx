import { useState, useEffect } from "react";
import { Moon, Sun, Palette, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
  DEFAULT_THEME,
  getTheme,
  setColorScheme,
  setMode,
  setCustomColors,
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

// Static preview colors for each color scheme (background, foreground, primary, muted)
const THEME_PREVIEW_COLORS: Record<
  ColorScheme,
  { light: string[]; dark: string[] }
> = {
  default: {
    light: ["#ffffff", "#0a0a0a", "#004981", "#f5f5f5"],
    dark: ["#0a0a0a", "#fafafa", "#3b82f6", "#1e3a5f"],
  },
  warm: {
    light: ["#fff6ea", "#2d1d14", "#004077", "#eee3d7"],
    dark: ["#171008", "#f8ece0", "#0089d5", "#3a3128"],
  },
  sepia: {
    light: ["#ffdaad", "#44250c", "#003674", "#eac6a5"],
    dark: ["#271605", "#ffddbb", "#0081d5", "#493624"],
  },
  green: {
    light: ["#f1f7f2", "#101911", "#004777", "#dae0da"],
    dark: ["#080c09", "#e7ede8", "#008ad3", "#262a26"],
  },
  "blue-light": {
    light: ["#f8f1e3", "#23190a", "#004077", "#ddd7c9"],
    dark: ["#130f06", "#eee7d9", "#0089d5", "#322d22"],
  },
  cool: {
    light: ["#eff6fb", "#0f171f", "#003f79", "#d8dfe4"],
    dark: ["#080c0f", "#e6ecf2", "#0082cf", "#252a2d"],
  },
  "high-contrast": {
    light: ["#ffffff", "#000000", "#001a4b", "#eeeeee"],
    dark: ["#000000", "#ffffff", "#006dbd", "#030303"],
  },
  reading: {
    light: ["#eeebe4", "#2f281e", "#004475", "#d4d1ca"],
    dark: ["#0b0905", "#e9e4dd", "#008bcd", "#26241f"],
  },
  monochrome: {
    light: ["#f8f8f8", "#0b0b0b", "#003767", "#dedede"],
    dark: ["#060606", "#eeeeee", "#0089d5", "#1f1f1f"],
  },
  nord: {
    light: ["#edf2f8", "#121b29", "#004981", "#ced9e5"],
    dark: ["#08121f", "#dbe6f2", "#0089d5", "#222f3c"],
  },
  sunset: {
    light: ["#fff2e1", "#311b11", "#00467e", "#f4d8c5"],
    dark: ["#211208", "#fce6d9", "#0090da", "#442d20"],
  },
  custom: {
    light: ["#ffffff", "#000000", "#000000", "#f5f5f5"],
    dark: ["#000000", "#ffffff", "#ffffff", "#1a1a1a"],
  },
};

export function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCustomColors, setShowCustomColors] = useState(false);
  const [customColors, setCustomColorsState] = useState<Record<string, string>>(
    {},
  );
  const [theme, setThemeState] = useState(DEFAULT_THEME);
  const [refreshKey, setRefreshKey] = useState(0);

  // Initialize theme from localStorage on client side only
  useEffect(() => {
    if (typeof window === "undefined") return;
    setThemeState(getTheme());
  }, []);

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
    // Switch to custom scheme when user modifies custom colors
    setColorScheme("custom");
    setThemeState(getTheme());
  };

  const colorPresets = [
    { key: "background", label: "背景色", default: "#ffffff" },
    { key: "foreground", label: "前景色", default: "#000000" },
    { key: "primary", label: "主色调", default: "#000000" },
    { key: "muted", label: "次要色", default: "#f5f5f5" },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="active:translate-y-0!"
          aria-label="主题设置"
        >
          <Palette className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <SheetTitle className="flex items-center gap-2 text-base font-semibold">
            <Palette className="size-4" />
            主题设置
          </SheetTitle>
          <SheetDescription>自定义显示模式和配色方案</SheetDescription>
          <SheetClose asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="关闭"
            >
              <X className="size-4" />
            </Button>
          </SheetClose>
        </SheetHeader>
        <div className="space-y-4 overflow-y-auto px-4 pb-4">
          {/* Mode Toggle - Basic Setting */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground">
              显示模式
            </div>
            <div className="flex gap-1">
              <Button
                type="button"
                variant={theme.mode === "light" ? "default" : "outline"}
                onClick={() => handleModeSet("light")}
                className="flex-1"
              >
                <Sun className="mr-1 size-4" />
                亮色
              </Button>
              <Button
                type="button"
                variant={theme.mode === "dark" ? "default" : "outline"}
                onClick={() => handleModeSet("dark")}
                className="flex-1"
              >
                <Moon className="mr-1 size-4" />
                暗色
              </Button>
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
                  THEME_PREVIEW_COLORS[builtInTheme.id]?.[theme.mode] || [];
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
                    className="relative flex items-center justify-between"
                  >
                    <div className="flex-1 flex items-center justify-between gap-3">
                      <span className="font-medium">{builtInTheme.name}</span>
                      {/* Color Preview Swatches */}
                      <div className="flex gap-0.5">
                        {previewColors.map((color: string, idx: number) => (
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
            <div className="text-sm font-medium text-muted-foreground">
              自定义颜色
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowCustomColors(!showCustomColors)}
              className="w-full"
              aria-expanded={showCustomColors}
              aria-controls="custom-colors-panel"
            >
              <Palette className="mr-1 size-4" />
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
                            handleCustomColorChange(preset.key, e.target.value)
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
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
