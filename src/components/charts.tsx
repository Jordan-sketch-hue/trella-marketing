"use client";
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";

export const BRAND = "#16019a";
export const BRIGHT = "#2e1fe0";
export const ACCENT = "#ed1c24";
export const PALETTE = ["#16019a", "#2e1fe0", "#ed1c24", "#0a4d5c", "#b8860b", "#7c3aed"];

const axis = { fontSize: 12, fill: "#6b6b78" };
const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid #e8e8ef",
  boxShadow: "0 12px 32px -12px rgba(22,1,154,0.25)",
  fontSize: 12,
};

const fmtCompact = (v: any) => new Intl.NumberFormat("en", { notation: "compact" }).format(Number(v));

export function AreaTrend({
  data, dataKey, color = BRAND, height = 260, money = false,
}: {
  data: any[]; dataKey: string; color?: string; height?: number; money?: boolean;
}) {
  const id = `g-${dataKey}`;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef0f4" />
        <XAxis dataKey="label" tick={axis} tickLine={false} axisLine={false} />
        <YAxis tick={axis} tickLine={false} axisLine={false} tickFormatter={fmtCompact} width={44} />
        <Tooltip contentStyle={tooltipStyle} formatter={(v: any) => (money ? `$${fmtCompact(v)}` : fmtCompact(v))} />
        <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2.5} fill={`url(#${id})`} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function MultiLine({
  data, lines, height = 280,
}: {
  data: any[]; lines: { key: string; color: string; name: string }[]; height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef0f4" />
        <XAxis dataKey="label" tick={axis} tickLine={false} axisLine={false} />
        <YAxis tick={axis} tickLine={false} axisLine={false} tickFormatter={fmtCompact} width={44} />
        <Tooltip contentStyle={tooltipStyle} formatter={(v: any) => fmtCompact(v)} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
        {lines.map((l) => (
          <Line key={l.key} type="monotone" dataKey={l.key} name={l.name} stroke={l.color} strokeWidth={2.5} dot={false} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

export function Bars({
  data, dataKey, color = BRAND, height = 260, money = false,
}: {
  data: any[]; dataKey: string; color?: string; height?: number; money?: boolean;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef0f4" />
        <XAxis dataKey="label" tick={axis} tickLine={false} axisLine={false} />
        <YAxis tick={axis} tickLine={false} axisLine={false} tickFormatter={fmtCompact} width={44} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(22,1,154,0.05)" }} formatter={(v: any) => (money ? `$${fmtCompact(v)}` : fmtCompact(v))} />
        <Bar dataKey={dataKey} fill={color} radius={[6, 6, 0, 0]} maxBarSize={42} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function Donut({
  data, height = 240, money = false,
}: {
  data: { name: string; value: number }[]; height?: number; money?: boolean;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius="58%" outerRadius="88%" paddingAngle={2} stroke="none">
          {data.map((_, i) => <Cell key={i} fill={PALETTE[i % PALETTE.length]} />)}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} formatter={(v: any) => (money ? `$${fmtCompact(v)}` : `${v}%`)} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function Spark({ data, dataKey, color = BRAND, height = 48 }: { data: any[]; dataKey: string; color?: string; height?: number }) {
  const id = `s-${dataKey}-${color}`;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} fill={`url(#${id})`} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
