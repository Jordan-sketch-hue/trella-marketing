import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Trella logo — uses the real client artwork (processed from tm.jpg).
 * variant "full"  → TM monogram + wordmark lockup
 * variant "mark"  → TM monogram only (square)
 * onDark          → wraps the colour logo in a white chip so it reads on dark surfaces
 */
export function Logo({
  variant = "full",
  height = 34,
  onDark = false,
  className,
  priority = false,
}: {
  variant?: "full" | "mark";
  height?: number;
  onDark?: boolean;
  className?: string;
  priority?: boolean;
}) {
  const isMark = variant === "mark";
  const src = isMark ? "/monogram-transparent.png" : "/logo-transparent.png";
  const intrinsic = isMark ? { w: 504, h: 504 } : { w: 1056, h: 484 };
  const ratio = intrinsic.w / intrinsic.h;

  const img = (
    <Image
      src={src}
      alt="Trella Marketing Consultant"
      width={intrinsic.w}
      height={intrinsic.h}
      priority={priority}
      style={{ height, width: height * ratio }}
      className="object-contain"
    />
  );

  if (onDark) {
    return (
      <span className={cn("inline-flex items-center rounded-lg bg-white px-2.5 py-1.5 shadow-sm", className)}>
        {img}
      </span>
    );
  }
  return <span className={cn("inline-flex items-center", className)}>{img}</span>;
}
