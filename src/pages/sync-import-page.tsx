import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AlertTriangle, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { importSyncData } from "@/lib/sync";
import { fetchWithErrorHandling } from "@/lib/fetch";
import { buildMeta } from "@/lib/seo";
import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () =>
  buildMeta({
    title: "导入数据 - edao.plus",
    description: "通过同步码导入收藏、浏览记录和主题设置到当前设备",
    path: "/sync",
  });

interface SyncData {
  favorites: string | null;
  recentProblems: string | null;
  theme: string | null;
}

function parseSummary(data: SyncData) {
  let favorites = 0;
  let recent = 0;
  let hasTheme = false;
  try {
    if (data.favorites) favorites = JSON.parse(data.favorites).length;
  } catch {
    /* ignore */
  }
  try {
    if (data.recentProblems) recent = JSON.parse(data.recentProblems).length;
  } catch {
    /* ignore */
  }
  hasTheme = data.theme !== null;
  return { favorites, recent, hasTheme };
}

export default function SyncImportPage() {
  const navigate = useNavigate();
  const { code } = useParams<{ code: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<SyncData | null>(null);
  const [importing, setImporting] = useState(false);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    if (!code) {
      setError("缺少同步码");
      setLoading(false);
      return;
    }

    if (!/^[a-f0-9]{6}$/i.test(code)) {
      setError("同步码格式无效");
      setLoading(false);
      return;
    }

    fetchWithErrorHandling<{ data: SyncData }>(
      `/api/sync?code=${encodeURIComponent(code)}`,
      { errorMessage: "同步码无效或已过期" },
    )
      .then((json) => {
        setData(json.data);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "网络错误，请重试");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [code]);

  const handleImport = useCallback(async () => {
    if (!data || !code) return;
    setImporting(true);
    try {
      importSyncData(data as unknown as Record<string, string | null>);
      toast.success("数据同步成功");
      // 删除同步码
      fetch(`/api/sync?code=${encodeURIComponent(code)}`, {
        method: "DELETE",
      });
      navigate("/");
    } catch (err) {
      toast.error("同步失败，请重试");
      setImporting(false);
    }
  }, [data, code, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
        <p className="text-sm text-muted-foreground">正在获取同步数据...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16">
        <AlertTriangle className="size-8 text-destructive" />
        <p className="text-sm text-destructive">{error}</p>
        <p className="text-xs text-muted-foreground">
          请确认同步码正确且未过期，每个同步码仅能使用一次
        </p>
      </div>
    );
  }

  if (!data) return null;

  const summary = parseSummary(data);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">
          导入数据
        </h1>
        <p className="text-sm text-muted-foreground">
          确认后将覆盖当前设备的数据
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>即将导入的数据</CardTitle>
          <CardDescription>
            {summary.favorites} 个收藏，{summary.recent} 条浏览记录
            {summary.hasTheme ? "，主题设置" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm text-primary dark:text-amber-400">
            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 size-4 shrink-0" />
              <span>导入将覆盖当前设备上的收藏、浏览记录和主题设置</span>
            </div>
          </div>
          <Button onClick={handleImport} disabled={importing}>
            {importing ? <Loader2 className="animate-spin" /> : <Check />}
            确认导入
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
