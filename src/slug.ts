export function slugify(value: string): string {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "sitestencil";
}

export function pascalCase(value: string): string {
  const parts = slugify(value).split("-").filter(Boolean);
  return parts.map((part) => part[0]!.toUpperCase() + part.slice(1)).join("") || "SiteStencil";
}

export function displayName(value: string): string {
  return value.trim() || "Untitled Protocol";
}
