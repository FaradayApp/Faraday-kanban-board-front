export async function tryCopyText(text: string) {
  return navigator.clipboard.writeText(text);
}
