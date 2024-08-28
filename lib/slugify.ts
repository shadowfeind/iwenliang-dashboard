export function slugify(name: string): string {
  return name.toLocaleLowerCase().split(" ").join("_");
}
