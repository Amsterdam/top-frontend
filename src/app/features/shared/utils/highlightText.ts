type Options = {
  caseSensitive?: boolean
}

const highlightText = (needle: string | string[], haystack: string, options?: Options) => {
  const needles: string[] = Array.isArray(needle) ? needle : [ needle ]
  const flag = options && options.caseSensitive ? "g" : "gi"

  return needles.reduce((acc: string, needle: string) => {
    const re = new RegExp(needle, flag)
    return acc.replace(re, needle => `<mark>${ needle }</mark>`)
  }, haystack)
}

export default highlightText
