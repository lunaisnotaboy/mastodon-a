const DIGIT_CHARACTERS = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  '#',
  '$',
  '%',
  '*',
  '+',
  ',',
  '-',
  '.',
  ':',
  ';',
  '=',
  '?',
  '@',
  '[',
  ']',
  '^',
  '_',
  '{',
  '|',
  '}',
  '~'
]

export const decode83 = (str: string) => {
  let c: string
  let digit: number
  let value = 0

  for (let i = 0; i < str.length; i++) {
    c = str[i]
    digit = DIGIT_CHARACTERS.indexOf(c)
    value = value * 83 + digit
  }

  return value
}

export const intToRgb = (int: number) => ({
  r: Math.max(0, (int >> 16)),
  g: Math.max(0, (int >> 8) & 255),
  b: Math.max(0, (int & 255))
})

export const getAverageFromBlurhash = (blurhash: string | undefined) => {
  if (!blurhash) {
    return null
  }

  return intToRgb(decode83(blurhash.slice(2, 6)))
}
