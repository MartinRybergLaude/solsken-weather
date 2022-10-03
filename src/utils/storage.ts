export function getItem(key: string): string | null {
  if(!storageAvailable) return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
export function setItem(key: string, value: string): boolean {
  if(!storageAvailable) return false;
  let trySetLocalstorage = true;
  while(trySetLocalstorage) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (e) {
      if (e instanceof DOMException && (
      // everything except Firefox
        e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        // acknowledge QuotaExceededError only if there's something already stored
        (localStorage && localStorage.length !== 0)) {
        // Full storage, clear all weather data and try again
        clearAllData();
      } else {
        // Other error
        trySetLocalstorage = false;
      }
    }
  }
  return false;
}
export function deleteItem(key: string) {
  if(!storageAvailable) return false;
  localStorage.removeItem(key);
}

export function clearAllData() {
  if(!storageAvailable) return;
  Object.keys(localStorage).forEach(function(key){
    localStorage.removeItem(key);
  });
}

function storageAvailable(): boolean {
  let storage;
  try {
    storage = localStorage;
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch(e) {
    return false;
  }
}