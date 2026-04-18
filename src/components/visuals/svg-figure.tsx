import { cn } from "@/lib/utils";

export function SvgFigure({
  svg,
  alt,
  className,
}: {
  svg: string;
  alt?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center text-foreground",
        "[&>svg]:h-auto [&>svg]:w-full [&>svg]:max-w-sm",
        className,
      )}
      role="img"
      aria-label={alt ?? "图示"}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
