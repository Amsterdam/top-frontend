const currentDate = () => {
  const date = new Date()

  const twoDigits = (n: number) => `0${ n }`.slice(-2)

  const yyyy = date.getFullYear()
  const mm = twoDigits(date.getMonth() + 1)
  const dd = twoDigits(date.getDate())

  return [ yyyy, mm, dd ].join("-")
}

export default currentDate
