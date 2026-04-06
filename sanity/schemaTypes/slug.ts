export const DEFAULT_SLUG_MAX_LENGTH = 96;

export function slugifyValue(input: string, maxLength = DEFAULT_SLUG_MAX_LENGTH) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, maxLength)
    .replace(/-+$/g, "");
}

export function validateSlug(value?: {current?: string}) {
  if (!value?.current) {
    return true;
  }

  return value.current === slugifyValue(value.current)
    ? true
    : "Usa solo letras minúsculas, números y guiones; sin espacios.";
}
