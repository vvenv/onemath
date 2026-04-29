import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { QRCodeSVG } from "qrcode.react";
import { Download, Loader2, QrCode, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { exportSyncData } from "@/lib/sync";
import { buildMeta } from "@/lib/seo";
import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () =>
  buildMeta({
    title: "数据同步 - edao.plus",
    description:
      "生成同步码，在其他设备上扫描 QR 码即可导入收藏、浏览记录和主题设置",
    path: "/sync",
  });

interface SyncResult {
  code: string;
  ttl: number;
}

export default function SyncPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SyncResult | null>(null);
  const [remaining, setRemaining] = useState(0);
  const [importCode, setImportCode] = useState("");

  const summary = useMemo(() => {
    if (typeof window === "undefined") return { favorites: 0, recent: 0 };
    try {
      const favRaw = localStorage.getItem("favorites");
      const favorites = favRaw ? JSON.parse(favRaw).length : 0;
      const recentRaw = localStorage.getItem("recent-problems");
      const recent = recentRaw ? JSON.parse(recentRaw).length : 0;
      return { favorites, recent };
    } catch {
      return { favorites: 0, recent: 0 };
    }
  }, []);

  useEffect(() => {
    if (!result || remaining <= 0) return;
    const timer = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [result]);

  const generate = useCallback(async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = exportSyncData();
      const resp = await fetch("/api/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(
          (err as { error?: string }).error ?? `请求失败 (${resp.status})`,
        );
      }
      const json = (await resp.json()) as SyncResult;
      setResult(json);
      setRemaining(json.ttl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "网络错误，请重试");
    } finally {
      setLoading(false);
    }
  }, []);

  const expired = result !== null && remaining <= 0;
  const qrUrl = result ? `${window.location.origin}/sync/${result.code}` : null;

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const handleImport = useCallback(() => {
    const trimmedCode = importCode.trim();
    if (!trimmedCode) return;
    navigate(`/sync/${trimmedCode}`);
  }, [importCode, navigate]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-bold tracking-tight">
          数据同步
        </h1>
        <p className="text-sm text-muted-foreground">
          生成同步码，在其他设备上扫描 QR 码即可导入数据
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>导入数据</CardTitle>
          <CardDescription>输入其他设备生成的同步码来导入数据</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Input
              placeholder="输入同步码（8位字符）"
              value={importCode}
              onChange={(e) => setImportCode(e.target.value)}
              maxLength={8}
              className="font-mono uppercase"
            />
            <Button onClick={handleImport} disabled={!importCode.trim()}>
              <Download />
              导入
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>当前数据摘要</CardTitle>
          <CardDescription>
            {summary.favorites} 个收藏，{summary.recent} 条浏览记录
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {!result && (
            <Button onClick={generate} disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : <QrCode />}
              生成同步码
            </Button>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}

          {result && (
            <div className="flex flex-col items-center gap-4">
              {!expired ? (
                <>
                  <div className="rounded-xl border border-border/70 bg-white p-4">
                    <QRCodeSVG value={qrUrl!} size={220} level="M" />
                  </div>
                  <p className="text-center text-sm text-muted-foreground">
                    在其他设备上扫描上方 QR 码，或手动输入同步码
                  </p>
                  <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2 font-mono text-lg tracking-widest">
                    {result.code}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    剩余时间：{formatTime(remaining)}
                  </p>
                </>
              ) : (
                <div className="flex flex-col items-center gap-3 py-4">
                  <p className="text-sm text-muted-foreground">
                    同步码已过期，请重新生成
                  </p>
                  <Button onClick={generate} disabled={loading}>
                    {loading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <RefreshCw />
                    )}
                    重新生成
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
