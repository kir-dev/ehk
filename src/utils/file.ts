import { Media } from "@/payload-types";
import { isMedia } from "./isMedia";

export function getFileExtension(file: number | Media) {
  if (isMedia(file))
    return file.filename?.split(".").pop()?.toLowerCase() || "file";
  return "file";
}

export function getFileUrl(file: number | Media) {
  if (isMedia(file)) return file.url || "#";
  return "#";
}
