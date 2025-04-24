export default function parseImage(): string {
  const image = (
    document.querySelector(
      'meta[property="og:image"]',
    ) as HTMLMetaElement | null
  )?.content;
  if (image) return image;
  return "";
}
