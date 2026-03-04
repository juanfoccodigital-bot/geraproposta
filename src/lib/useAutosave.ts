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
  const previousData = useRef<string>(JSON.stringify(data));
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const onSaveRef = useRef(onSave);
  const initialized = useRef(false);
  onSaveRef.current = onSave;

  // Detect changes
  useEffect(() => {
    if (!enabled) return;
    const serialized = JSON.stringify(data);

    // Skip the first render — just store the initial value
    if (!initialized.current) {
      previousData.current = serialized;
      initialized.current = true;
      return;
    }

    if (serialized !== previousData.current) {
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

  const markClean = useCallback(() => {
    setIsDirty(false);
    setLastSaved(new Date());
    previousData.current = JSON.stringify(data);
  }, [data]);

  return { saving, lastSaved, isDirty, markClean };
}
