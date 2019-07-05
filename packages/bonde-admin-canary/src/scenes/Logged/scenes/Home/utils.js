const snakeCase = (key) => {
  return key.replace(/([A-Z])/g, '_$1').toLowerCase()
}

/**
 ** Reference: https://github.com/travelperk/case-converter/blob/master/src/index.js
 ** deeply converts keys of an object from one case to another
 ** @param {object} object to convert
 ** @param {function} function to convert key.
 ** @return converted object
 **/
const convertCase = (oldObject, converterFunction) => {
  let newObject

  if (!oldObject || typeof oldObject !== 'object' || !Object.keys(oldObject).length) {
    return oldObject
  }

  if (Array.isArray(oldObject)) {
    newObject = oldObject.map(element =>
      convertCase(element, converterFunction)
    )
  } else {
    newObject = {}
    Object.keys(oldObject).forEach(oldKey => {
      const newKey = converterFunction(oldKey)
      newObject[newKey] = convertCase(oldObject[oldKey], converterFunction)
    })
  }
  return newObject
}

export const toSnakeCase = obj => convertCase(obj, snakeCase)
