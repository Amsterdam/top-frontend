export const listsDay = (listsWeek: SettingsLists, dayOfWeek: number) => {
  const isWeekend = dayOfWeek > 4
  const isSunday = dayOfWeek === 6
  const start = isSunday ? 11 : dayOfWeek * 2
  const length = isWeekend ? 1 : 2
  return listsWeek.slice(start, start + length)
}
