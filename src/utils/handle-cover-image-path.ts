export function handleCoverImagePath(imageUrl: string) {
  return `${imageUrl.replace("public", "").replace(".jpg", ".png")}`
}
