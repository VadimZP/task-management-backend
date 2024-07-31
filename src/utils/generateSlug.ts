import slugify from "slugify";

export function generateSlug(value: string) {
  const slug = slugify(value, {
    replacement: "-",
    lower: true,
    strict: false,
    trim: true,
  });

  return slug;
}
