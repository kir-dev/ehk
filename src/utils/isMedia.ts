/*dzsapetta generalta*/
import {Media} from "@/payload-types";

export function isMedia(obj: unknown): obj is Media {
  return typeof obj === "object"
    && obj !== null
    && obj !== undefined
    && "url" in obj // or another field you know Media always has
    && typeof (obj as Media).url === "string";
}
