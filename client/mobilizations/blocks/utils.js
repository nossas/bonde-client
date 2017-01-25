//
// Check if bg_class key of block object has value starting with "bg-"
//
const isBackgroundClass = block => /^bg-\d+/.test(block.bg_class)

//
// Generate block component array of class names
//
export const generateClassName = block => {
  const { bg_class: backgroundClass, bg_image: backgroundImage } = block
  const className = []

  if (isBackgroundClass(block)) className.push(backgroundClass)
  if (backgroundImage) className.push('bg-cover')

  return className
}

//
// Check if bg_class key of block object has value starting with "{" and ends with "}"
//
const isBackgroundObject = block => !isBackgroundClass(block) && /^\{.*\}$/.test(block.bg_class)

//
// Generate block component style object
//
export const generateStyle = block => {
  const { bg_class: backgroundClass, bg_image: backgroundImage } = block

  let backgroundColor = null
  if (isBackgroundObject(block)) {
    const { r, g, b, a } = JSON.parse(backgroundClass)
    backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`
  }

  return {
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : null,
    backgroundColor
  }
}
