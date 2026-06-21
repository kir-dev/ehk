import type { Media, Representative } from "@/payload-types";

export type RepresentativeLang = "HU" | "EN";

export const facultyStyles: Record<
  NonNullable<Representative["faculty"]>,
  string
> = {
  "ÉMK": "border-[#00582e] bg-[#cce6db] text-[#00582e]",
  GPK: "border-[#2f5f83] bg-[#d7e7f2] text-[#2f5f83]",
  "ÉPK": "border-[#a82030] bg-[#f2cfd2] text-[#a82030]",
  VBK: "border-[#00766c] bg-[#cce9e6] text-[#00766c]",
  VIK: "border-[#5c4192] bg-[#ded5f0] text-[#5c4192]",
  GTK: "border-[#00876b] bg-[#ccebe4] text-[#00876b]",
  TTK: "border-[#1b6fa8] bg-[#d1e6f4] text-[#1b6fa8]",
  KJK: "border-[#d98600] bg-[#f7dfb8] text-[#b56f00]",
};

export function getPrimaryPosition(
  representative: Representative,
  lang: RepresentativeLang,
) {
  const primaryPosition = representative.position?.[0];

  if (!primaryPosition) {
    return null;
  }

  return lang === "EN"
    ? primaryPosition.position_en || primaryPosition.position_hu
    : primaryPosition.position_hu || primaryPosition.position_en;
}

export function getPositionText(
  position: NonNullable<Representative["position"]>[number],
  lang: RepresentativeLang,
) {
  return lang === "EN"
    ? position.position_en || position.position_hu
    : position.position_hu || position.position_en;
}

export function getRepresentativePicture(representative: Representative) {
  const media =
    representative.picture && typeof representative.picture === "object"
      ? (representative.picture as Media)
      : null;

  return {
    url: media?.url || null,
    alt: media?.alt || representative.name,
  };
}

export function getRepresentativeInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

export function getFileInfo(file?: number | Media) {
  if (!file || typeof file === "number") {
    return { url: null, extension: "file", filesize: null };
  }

  const extension =
    file.filename?.split(".").pop()?.toLowerCase() ||
    file.mimeType?.split("/").pop()?.toLowerCase() ||
    "file";

  return {
    url: file.url || null,
    extension,
    filesize: file.filesize ?? null,
  };
}

export function formatFileSize(bytes?: number | null) {
  if (bytes === undefined || bytes === null || Number.isNaN(bytes) || bytes < 0) {
    return null;
  }

  if (bytes === 0) {
    return "0 B";
  }

  const units = ["B", "KB", "MB", "GB"];
  const unitIndex = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );
  const size = bytes / 1024 ** unitIndex;

  return `${parseFloat(size.toFixed(1))} ${units[unitIndex]}`;
}
