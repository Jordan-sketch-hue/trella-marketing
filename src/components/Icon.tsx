import {
  Compass, Share2, Target, PenTool, Globe, BarChart3, Search, Map, Sparkles, Rocket,
  TrendingUp, type LucideIcon, Megaphone, Mail, Camera, Palette, LineChart, Users,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  Compass, Share2, Target, PenTool, Globe, BarChart3, Search, Map, Sparkles, Rocket,
  TrendingUp, Megaphone, Mail, Camera, Palette, LineChart, Users,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = map[name] ?? Sparkles;
  return <Cmp className={className} />;
}
