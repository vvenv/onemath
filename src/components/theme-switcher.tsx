import { useState, useEffect } from "react";
import { Moon, Sun, Palette, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
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
    light: ["#ffffff", "#242424", "#343434", "#f7f7f7"],
    dark: ["#242424", "#fbfbfb", "#ebebEB", "#444444"],
  },
  warm: {
    light: ["#faf8f6", "#403830", "#6b5a48", "#ebe8e4"],
    dark: ["2e2a28", "#f2ede6", "#d9cfc4", "#52504e"],
  },
  sepia: {
    light: ["#e8dcd0", "#4d4338", "#665542", "#d9cfc4"],
    dark: ["38342f", "#ebe4dc", "#e0d6c6", "#59554e"],
  },
  green: {
    light: ["#f7f8f7", "#333333", "#5a6666", "#e5e7e5"],
    dark: ["262726", "#f0f1f0", "#e0e2e0", "#474847"],
  },
  "blue-light": {
    light: ["#f5f4f3", "#383635", "#6a6460", "#e0dedb"],
    dark: ["2b2a29", "#ecebe9", "#dedbd7", "#4d4c4b"],
  },
  cool: {
    light: ["#f7f8f9", "#333339", "#595a6a", "#e5e6e9"],
    dark: ["262729", "#f0f1f2", "#e0e1e4", "#47484a"],
  },
  "high-contrast": {
    light: ["#ffffff", "#000000", "#1a1a1a", "#f2f2f2"],
    dark: ["#000000", "#ffffff", "#ffffff", "#191919"],
  },
  reading: {
    light: ["#f0f0ed", "#47453e", "#67655e", "#dcdad5"],
    dark: ["393835", "#ebeae6", "#e6e5df", "#434240"],
  },
  monochrome: {
    light: ["#fafafa", "#262626", "#404040", "#e5e5e5"],
    dark: ["1f1f1f", "#f2f2f2", "#e6e6e6", "#3d3d3d"],
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
  const [theme, setThemeState] = useState(getTheme());
  const [refreshKey, setRefreshKey] = useState(0);

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
    <Drawer open={isOpen} onOpenChange={setIsOpen} direction="right">
      <DrawerTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="active:translate-y-0!"
          aria-label="主题设置"
        >
          <Palette className="size-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-screen">
        <DrawerHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DrawerTitle className="flex items-center gap-2 text-base font-semibold">
            <Palette className="size-4" />
            主题设置
          </DrawerTitle>
          <DrawerClose asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="关闭"
            >
              <X className="size-4" />
            </Button>
          </DrawerClose>
        </DrawerHeader>
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
      </DrawerContent>
    </Drawer>
  );
}
