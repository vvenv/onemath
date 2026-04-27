export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30 py-6 text-center text-sm text-muted-foreground">
      <div className="mx-auto max-w-3xl px-4">
        <p className="mb-2">
          © {new Date().getFullYear()} 一道+. 本站内容采用{" "}
          <a
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            CC BY-NC-SA 4.0
          </a>{" "}
          协议授权
        </p>
        <p className="text-xs">署名-非商业性使用-相同方式共享 4.0 国际</p>
      </div>
    </footer>
  );
}
