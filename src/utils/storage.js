export const storageSetItem = (key, data) => localStorage.setItem(key, JSON.stringify(data));

export const storageGetItem = (key) => JSON.parse(localStorage.getItem(key));
