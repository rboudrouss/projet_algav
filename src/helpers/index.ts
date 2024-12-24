
// function to convert Map to Object, used in JSON.stringify for PatriciaTrie
// deno-lint-ignore no-explicit-any
export function replacer(_: string, value: any) {
  if (value instanceof Map) return Object.fromEntries(value);
  return value;
}