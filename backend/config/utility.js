const ValidateEmail = (mail) => {
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  if (mail.value.match(validRegex)) {
    return true
  } else {
    throw new Error('email Id format is incorrect')
    return false
  }
}

module.exports = { ValidateEmail }
