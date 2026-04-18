import { Share as ShareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { share } from "@/lib/share";

type ShareButtonProps = {
  title: string;
  url: string;
  text?: string;
};

export function ShareButton({ title, url, text }: ShareButtonProps) {
  const handleShare = async () => {
    await share({ title, url, text });
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
