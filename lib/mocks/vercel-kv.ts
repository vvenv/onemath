// Local development mock for @vercel/kv
// Uses in-memory Map storage instead of Redis

const store = new Map<string, { value: string; expiry: number }>();

async function set(
  key: string,
  value: string,
  options?: { ex?: number },
): Promise<"OK"> {
  const expiry = options?.ex ? Date.now() + options.ex * 1000 : 0;
  store.set(key, { value, expiry });
  return "OK";
}

async function get(key: string): Promise<string | null> {
  const entry = store.get(key);
  if (!entry) return null;
  if (entry.expiry && Date.now() > entry.expiry) {
    store.delete(key);
    return null;
  }
  return entry.value;
}

async function getdel(key: string): Promise<string | null> {
  const value = await get(key);
  if (value !== null) {
    store.delete(key);
  }
  return value;
}

async function del(key: string): Promise<number> {
  const existed = store.has(key);
  store.delete(key);
  return existed ? 1 : 0;
}

export const kv = {
  set,
  get,
  getdel,
  del,
};
