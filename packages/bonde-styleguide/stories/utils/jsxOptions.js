const displayNameFn = (fn) => fn.displayName || fn

export default {
  functionValue: displayNameFn
}

