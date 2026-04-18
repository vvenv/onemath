import { toast } from "sonner";

interface ShareOptions {
  title: string;
  url: string;
  text?: string;
}

/**
 * Share content using Web Share API or fallback to clipboard
 */
export async function share({ title, url, text }: ShareOptions): Promise<void> {
  const shareData: ShareData = {
    title,
    url,
    ...(text && { text: `# ${text}` }),
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        console.error("Share failed:", err);
      }
    }
    return;
  }

  // Fallback to clipboard
  try {
    await navigator.clipboard.writeText(url);
    toast.success("链接已复制到剪贴板");
  } catch {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = url;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    toast.success("链接已复制到剪贴板");
  }
}
