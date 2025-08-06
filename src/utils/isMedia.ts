/*dzsapetta generalta*/
import {Media} from "@/payload-types";

export const isMedia = (picture: number | Media): picture is Media => {
  return (picture as Media).url !== undefined;
};
