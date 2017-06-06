import slug from 'slug'

export const sanitize = string => string.trim().toLowerCase().replace(/(\s|\.|-|_)/g, '')

export const slugify = (text) => slug(text, { lower: true })
  .replace(/[\s_-]/g, '-')  // Replace spaces with -
  .replace(/^-+/, '')       // Trim - from start of text
  .replace(/-+$/, '')      // Trim - from end of text

