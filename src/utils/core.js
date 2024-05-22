export const getData = (key) => {
  try {
    const value = localStorage.getItem(key)
    return value != null ? JSON.parse(value) : null;
  } catch (e) {
    console.error(e)
  }
}

export const storeData = (key, value) => {
  const jsonValue = JSON.stringify(value)
  try {
    localStorage.setItem(key, jsonValue)
  } catch (e) {
    console.error(e)
  }
}