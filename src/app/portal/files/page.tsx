import {
  Download, Palette, FileText, Image as ImageIcon, Video, File, type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui";
import { PORTAL_CLIENT_ID, clientFiles } from "@/lib/data";
import { shortDate } from "@/lib/utils";
import type { FileAsset } from "@/lib/types";

export const metadata = { title: "Files · Client Portal" };

const KIND_META: Record<FileAsset["kind"], { icon: LucideIcon; tile: string }> = {
  Brand: { icon: Palette, tile: "bg-brand text-white" },
  PDF: { icon: FileText, tile: "bg-accent text-white" },
  Image: { icon: ImageIcon, tile: "bg-emerald-500 text-white" },
  Video: { icon: Video, tile: "bg-ink text-white" },
  Doc: { icon: File, tile: "bg-amber-500 text-white" },
};

const KIND_ORDER: FileAsset["kind"][] = ["Brand", "PDF", "Image", "Video", "Doc"];

export default function FilesPage() {
  const files = clientFiles(PORTAL_CLIENT_ID);
  const groups = KIND_ORDER
    .map((kind) => ({ kind, items: files.filter((f) => f.kind === kind) }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold sm:text-3xl">Files</h2>
        <p className="mt-1 text-sm text-ink-soft">Brand assets, content, and reports we've shared with you.</p>
      </div>

      {files.length === 0 ? (
        <Card className="p-8 text-center text-sm text-ink-soft">No files shared yet.</Card>
      ) : (
        groups.map((g) => {
          const Icon = KIND_META[g.kind].icon;
          return (
            <section key={g.kind}>
              <div className="mb-3 flex items-center gap-2">
                <Icon className="size-4 text-brand" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-ink-soft">{g.kind}</h3>
                <span className="rounded-full bg-surface-3 px-2 py-0.5 text-xs font-semibold text-ink-soft">{g.items.length}</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((f) => {
                  const meta = KIND_META[f.kind];
                  const FileIcon = meta.icon;
                  return (
                    <Card key={f.id} className="flex items-center gap-4 p-4 transition hover:-translate-y-0.5 hover:shadow-brand">
                      <span className={`inline-flex size-12 shrink-0 items-center justify-center rounded-xl shadow-sm ${meta.tile}`}>
                        <FileIcon className="size-6" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold">{f.name}</p>
                        <p className="mt-0.5 text-xs text-ink-soft">{f.size} · {shortDate(f.updatedAt)}</p>
                        <p className="text-xs text-ink-soft">by {f.by}</p>
                      </div>
                      <button
                        className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-line text-ink-soft transition hover:border-ink hover:bg-surface-2 hover:text-ink"
                        aria-label={`Download ${f.name}`}
                      >
                        <Download className="size-4" />
                      </button>
                    </Card>
                  );
                })}
              </div>
            </section>
          );
        })
      )}
    </div>
  );
}
