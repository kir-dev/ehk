export const MONTHS_HU = ["JAN.", "FEB.", "MÁRC.", "ÁPR.", "MÁJ.", "JÚN.", "JÚL.", "AUG.", "SZEPT.", "OKT.", "NOV.", "DEC."]
export const MONTHS_EN = ["JAN.", "FEB.", "MAR.", "APR.", "MAY", "JUN.", "JUL.", "AUG.", "SEP.", "OCT.", "NOV.", "DEC."]

export const DAYS_HU = ["VASÁRNAP", "HÉTFŐ", "KEDD", "SZERDA", "CSÜTÖRTÖK", "PÉNTEK", "SZOMBAT"]
export const DAYS_EN = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]

export const TOTAL_WEEKS_COUNT = 16
export const VISIBLE_WEEKS_IN_TIMELINE = 3
export const SLIDING_WINDOW_SIZE = 8

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
