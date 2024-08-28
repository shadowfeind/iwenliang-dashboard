export function slugify(name: string): string {
  return name.split(" ").join("_");
}
