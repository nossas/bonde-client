// eslint-disable-next-line
const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const isValidEmail = email => regexEmail.test(email)

const regexDomain = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/
export const isValidDomain = domain => regexDomain.test(domain)

// Validates Google Analytics Code
const regexCodeGA = /(UA|YT|MO)-\d+-\d+/i
export const isValidCodeGA = codeGA => regexCodeGA.test(codeGA)

const regexDDMMYYYY = /^\d{2}\/\d{2}\/\d{4}$/ // 00/00/0000
export const date = value => ({
  ddmmyyyy: regexDDMMYYYY.test(value)
})

// Validate email from
export const isValidFromEmail = value => {
  const regex = /^[\w ]+<(.*)>$/
  if (regex.test(value)) {
    const email = value.match(regex)[1]
    return isValidEmail(email)
  }
  return false
}
