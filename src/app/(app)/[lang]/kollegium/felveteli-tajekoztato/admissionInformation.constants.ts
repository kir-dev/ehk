import type { FacultyCode } from "./admissionInformation.types";

export const FACULTY_LINKS: ReadonlyArray<{
  code: FacultyCode;
  href: string;
}> = [
  { code: "ÉMK", href: "https://emkhk.bme.hu/" },
  { code: "GPK", href: "https://ghk.bme.hu/" },
  { code: "ÉPK", href: "https://epiteszhk.bme.hu/" },
  { code: "VBK", href: "https://www.vegyeszhk.hu/" },
  { code: "VIK", href: "https://vik.hk/" },
  { code: "KJK", href: "https://kozlekhk.hu/" },
  { code: "TTK", href: "https://ttkhk.bme.hu/" },
  { code: "GTK", href: "https://gtkhk.hu/" },
];
