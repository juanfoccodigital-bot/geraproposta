"use client";

import { useState, useEffect } from "react";
import type { CountdownData, BiolinkTheme } from "@/types/biolink";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(target: string): TimeLeft | null {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function CardsStyle({ time, theme }: { time: TimeLeft; theme: BiolinkTheme }) {
  const units = [
    { value: time.days, label: "Dias" },
    { value: time.hours, label: "Horas" },
    { value: time.minutes, label: "Min" },
    { value: time.seconds, label: "Seg" },
  ];

  return (
    <div className="flex gap-2 justify-center">
      {units.map((u) => (
        <div
          key={u.label}
          className="flex flex-col items-center rounded-xl px-3 py-2 min-w-[56px]"
          style={{
            background: `${theme.buttonColor}20`,
            border: `1px solid ${theme.buttonColor}30`,
            backdropFilter: "blur(8px)",
          }}
        >
          <span className="font-bold text-xl tabular-nums" style={{ color: theme.buttonColor }}>
            {pad(u.value)}
          </span>
          <span className="text-[10px] uppercase tracking-wider opacity-50 mt-0.5">{u.label}</span>
        </div>
      ))}
    </div>
  );
}

function InlineStyle({ time, theme }: { time: TimeLeft; theme: BiolinkTheme }) {
  return (
    <div className="flex items-center justify-center gap-1.5 font-mono font-bold text-2xl" style={{ color: theme.buttonColor }}>
      <span>{pad(time.days)}</span><span className="opacity-40">:</span>
      <span>{pad(time.hours)}</span><span className="opacity-40">:</span>
      <span>{pad(time.minutes)}</span><span className="opacity-40">:</span>
      <span>{pad(time.seconds)}</span>
    </div>
  );
}

function MinimalStyle({ time, theme }: { time: TimeLeft; theme: BiolinkTheme }) {
  const parts: string[] = [];
  if (time.days > 0) parts.push(`${time.days}d`);
  parts.push(`${pad(time.hours)}h`);
  parts.push(`${pad(time.minutes)}m`);
  parts.push(`${pad(time.seconds)}s`);
  return (
    <p className="text-center font-semibold text-lg tracking-wide" style={{ color: theme.buttonColor }}>
      {parts.join(" ")}
    </p>
  );
}

export default function CountdownBlock({ data, theme }: { data: CountdownData; theme: BiolinkTheme }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() => calcTimeLeft(data.targetDate));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft(data.targetDate)), 1000);
    return () => clearInterval(id);
  }, [data.targetDate]);

  if (!timeLeft) {
    return (
      <div className="text-center py-4">
        <p className="font-semibold text-sm opacity-70">{data.endMessage || "Tempo esgotado!"}</p>
      </div>
    );
  }

  return (
    <div className="py-3 space-y-2">
      {data.label && <p className="text-center text-xs font-medium uppercase tracking-wider opacity-60">{data.label}</p>}
      {data.style === "inline" ? (
        <InlineStyle time={timeLeft} theme={theme} />
      ) : data.style === "minimal" ? (
        <MinimalStyle time={timeLeft} theme={theme} />
      ) : (
        <CardsStyle time={timeLeft} theme={theme} />
      )}
    </div>
  );
}
