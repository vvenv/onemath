import { Link } from "react-router";
import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "./theme-switcher";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

declare const __BUILD_YEAR__: string;

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30 py-8">
      <div className="mx-auto max-w-3xl px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <ThemeSwitcher />
              </TooltipTrigger>
              <TooltipContent>主题设置</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  variant="ghost"
                  size="icon-sm"
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="数据同步"
                >
                  <Link to="/sync">
                    <QrCode className="h-4 w-4" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>数据同步</TooltipContent>
            </Tooltip>
          </div>
          <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
            <p>
              © {__BUILD_YEAR__} 一道<sup>+</sup>
            </p>
            <div className="flex items-center gap-3 text-xs">
              <a
                href="https://github.com/vvenv/onemath"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <span className="text-muted-foreground/30">·</span>
              <a
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                CC BY-NC-SA 4.0
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
