class LocalStorage extends Storage {
  constructor() { super(); }

  setItem(key: string, value: any) {
    super.setItem(key, JSON.stringify(value));
  }

  getItem(key: string) {
    return JSON.parse(super.getItem(key));
  }

  removeItem(key: string) {
    super.removeItem(key);
  }
}

class SessionStorage extends Storage {
  constructor() { super(); }

  setItem(key: string, value: any) {
    super.setItem(key, JSON.stringify(value));
  }

  getItem(key: string) {
    return JSON.parse(super.getItem(key));
  }

  removeItem(key: string) {
    super.removeItem(key);
  }
}
