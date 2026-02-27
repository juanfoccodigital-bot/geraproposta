import { useEffect, useRef, useState, useCallback } from "react";

interface UseAutosaveOptions {
  data: unknown;
  onSave: () => Promise<void>;
  delay?: number;
  enabled?: boolean;
}

export function useAutosave({ data, onSave, delay = 3000, enabled = true }: UseAutosaveOptions) {
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const previousData = useRef<string>("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const onSaveRef = useRef(onSave);
  onSaveRef.current = onSave;

  // Detect changes
  useEffect(() => {
    if (!enabled) return;
    const serialized = JSON.stringify(data);
    if (previousData.current && serialized !== previousData.current) {
      setIsDirty(true);

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(async () => {
        setSaving(true);
        try {
          await onSaveRef.current();
          setLastSaved(new Date());
          setIsDirty(false);
        } catch {
          // Save failed silently — will retry on next change
        } finally {
          setSaving(false);
        }
      }, delay);
    }
    previousData.current = serialized;

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [data, delay, enabled]);

  // Initialize previous data on first render
  useEffect(() => {
    previousData.current = JSON.stringify(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const markClean = useCallback(() => {
    setIsDirty(false);
    setLastSaved(new Date());
    previousData.current = JSON.stringify(data);
  }, [data]);

  return { saving, lastSaved, isDirty, markClean };
}
