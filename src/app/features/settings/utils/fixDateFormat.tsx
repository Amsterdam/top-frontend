export const fixDateFormat = (date: string) => {
    if (date.match(/((?=.{10}$)\d{2}-\d{2}-\d{4})/)) {
      return date.split("-")[2] + 
      "-" + date.split("-")[1] + 
      "-" + date.split("-")[0]
    }
    return date
  }