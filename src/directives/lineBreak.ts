export default {
  mounted(el, binding) {
    if (binding.value) {
      el.innerHTML = formatLineBreaks(binding.value)
    }
  },
  updated(el, binding) {
    if (binding.value) {
      el.innerHTML = formatLineBreaks(binding.value)
    }
  },
}

function formatLineBreaks(input: string) {
  if (typeof input !== 'string') return ''

  let str = input

  // Step 1: Decode double-escaped backslashes (e.g., "\\r\\n" → "\r\n")
  str = str.replace(/\\\\/g, '\\')

  // Step 2: Normalize all newline types to '\n'
  str = str
    .replace(/\\r\\n|\\n\\r|\\r|\\n/g, '\n') // handle escaped newline strings
    .replace(/\r\n|\n\r|\r|\n/g, '\n') // handle actual characters

  // Step 3: Convert '\n' to <br>
  return str.replace(/\n/g, '<span class="line-break"></span>')
}
