export const getMessage = (payload: unknown): string | null => {
  if (!payload || typeof payload !== "object") return null;

  const rec = payload as Record<string, unknown>;

  const msg = rec["message"];
  if (typeof msg === "string" && msg.trim()) return msg;

  const err = rec["error"];
  if (typeof err === "string" && err.trim()) return err;

  return null;
};