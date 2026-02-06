import { useEffect, useRef, useState } from "react";

function jsonEqual(a: unknown, b: unknown) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function useSettingsForm<T extends Record<string, any>>(initialData: T) {
  const initialRef = useRef<T>(initialData);
  const [formData, setFormData] = useState<T>(initialData);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    initialRef.current = initialData;
    setFormData(initialData);
    setHasChanges(false);
  }, [initialData]);

  useEffect(() => {
    setHasChanges(!jsonEqual(formData, initialRef.current));
  }, [formData]);

  function reset() {
    setFormData(initialRef.current);
  }

  function updateField<K extends keyof T>(field: K, value: T[K]) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function commit(data: T) {
    initialRef.current = data;
    setFormData(data);
    setHasChanges(false);
  }

  return { formData, setFormData, updateField, hasChanges, reset, commit };
}
