export const MONTHS_HU = ["JAN.", "FEB.", "MÁRC.", "ÁPR.", "MÁJ.", "JÚN.", "JÚL.", "AUG.", "SZEPT.", "OKT.", "NOV.", "DEC."]
export const MONTHS_EN = ["JAN.", "FEB.", "MAR.", "APR.", "MAY", "JUN.", "JUL.", "AUG.", "SEP.", "OCT.", "NOV.", "DEC."]

export const DAYS_HU = ["VASÁRNAP", "HÉTFŐ", "KEDD", "SZERDA", "CSÜTÖRTÖK", "PÉNTEK", "SZOMBAT"]
export const DAYS_EN = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]

export const TOTAL_WEEKS_COUNT = 16
export const VISIBLE_WEEKS_IN_TIMELINE = 3
/** Only two week buttons stay legible below the sm breakpoint. */
export const VISIBLE_WEEKS_IN_TIMELINE_MOBILE = 2
export const TIMELINE_MOBILE_BREAKPOINT = "(min-width: 640px)"
export const SLIDING_WINDOW_SIZE = 8

/** Scroll-spy line inside the scroll container, measured from its visible top. */
export const SCROLL_SPY_OFFSET_IN_CONTAINER = 40
/** Scroll-spy line in the viewport when the page scrolls instead (clears the navbar). */
export const SCROLL_SPY_OFFSET_IN_VIEWPORT = 140

// Format week range label (e.g. "ÁPR. 20 - 27" or "APR. 28 - MAY 4")
export const formatWeekRange = (monday: Date, sunday: Date, lang: "hu" | "en") => {
  const months = lang === "hu" ? MONTHS_HU : MONTHS_EN
  const startM = months[monday.getMonth()]
  const startD = monday.getDate()
  const endM = months[sunday.getMonth()]
  const endD = sunday.getDate()

  if (monday.getMonth() === sunday.getMonth()) {
    return `${startM} ${startD} - ${endD}`
  }
  return `${startM} ${startD} - ${endM} ${endD}`
}
