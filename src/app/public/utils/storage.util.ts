export class StorageUtil {

  static setValueToStorage(key: string, value: string | object) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  static getValueFromStorage(key: string) {
    const storageData = JSON.parse(sessionStorage.getItem(key));
    if (storageData) {
      return storageData;
    }
  }

  static removeValueFromStorage(key: string) {
    const storage = this.getValueFromStorage(key);
    if (storage) {
      sessionStorage.removeItem(key);
    }
  }

}
