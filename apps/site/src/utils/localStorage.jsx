export const localSave = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const localGet = (key) => {
  if (typeof window !== 'undefined') {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  }
}

export const localRemove = (key) => {
  localStorage.removeItem(key)
}
