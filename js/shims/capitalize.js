function capitalize (string) {
  let splitString = string.split('')

  splitString.unshift(splitString.shift().toUpperCase())

  return splitString.join('')
}

function capitalizeAll (string) {
  let splitString = string.split(' ')
  let ret = []

  splitString.forEach((word) => {
    ret.push(capitalize(word))
  })

  return ret.join(' ')
}

if (window) {
  window.capitalize = capitalize
  window.capitalizeAll = capitalizeAll
}
