export const sanitize = string => string.trim().toLowerCase().replace(/(\s|\.|-|_)/g, '')
