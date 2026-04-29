import { Share as ShareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";

type ShareButtonProps = {
  title: string;
  url: string;
  text?: string;
};

export function ShareButton({ title, url, text }: ShareButtonProps) {
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && "share" in navigator);
  }, []);

  const handleShare = async () => {
    const shareData: ShareData = {
      title,
      url,
      ...(text && { text: `# ${text}` }),
    };

    if (canShare) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Share failed:", err);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        toast.success("链接已复制到剪贴板");
      } catch (err) {
        console.error("Copy failed:", err);
        toast.error("复制失败，请重试");
      }
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      onClick={handleShare}
      className="text-muted-foreground hover:text-foreground"
      aria-label="分享"
      title="分享"
    >
      <ShareIcon className="size-4" />
    </Button>
  );
}
