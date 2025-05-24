/**
 * Actions to handle localstorage
 */

import { randomId } from "./util";

export class LDevLocalStorageHandler {
  /**
   * Returns all localstorage items.
   * @returns (object) local storage items
   */
  static getAll = (): Array<{ [key: string]: any }> => {
    const keys = Object.keys(localStorage);

    return keys.map((key: string) => {
      return {
        id: randomId(),

        key: key,

        value: localStorage.getItem(key),
      };
    });
  };

  /**
   * Return local storage item
   * @param key local storage key
   * @returns local storage item
   */
  static get = (key: string): string | null => {
    return localStorage.getItem(key);
  };

  /**
   * Set local storage item
   * @param key key
   * @param values value to set in local storage
   */
  static set = (key: string, values: any): void => {
    localStorage.setItem(key, JSON.stringify(values));
  };

  /**
   * Remove item from localstorage
   * @param key item's key
   */
  static removeItem = (key: string): void => {
    localStorage.removeItem(key);
  };

  /**
   * Remove multiple items from local storage.
   * @param keys
   */
  static removeItems = (keys: Array<string>) => {
    keys.forEach((key) => this.removeItem(key));
  };

  /**
   * Clear all local storage items.
   */
  static clearAll = () => {
    localStorage.clear();
  };
}

/**
 *Class to handle all local storage action in chrome extension.
 */
export class EsLocalStorageManager {
  /**
   * Returns all local storage items
   * @returns
   */
  static getAll = async () => {
    return new Promise((resolve) => {
      (globalThis as any).chrome.storage.local.get(null, (result: any) => {
        resolve(result);
      });
    });
  };

  /**
   * Return local storage by key.
   * @param {string} keyName
   * @returns
   */
  static get = async (keyName: string) => {
    return new Promise((resolve) => {
      (globalThis as any).chrome.storage.local.get(
        [keyName],

        (result: any) => {
          resolve(result);
        }
      );
    });
  };

  /**
   * Set local storage item.
   * @param keyName
   * @param value
   */
  static set = (keyName: string, value: any) => {
    (globalThis as any).chrome.storage.local.set(
      {
        [keyName]: JSON.stringify(value),
      },
      () => {
        if ((globalThis as any).chrome.runtime.lastError) {
          console.error(
            "Failed to set local storage:",
            (globalThis as any).chrome.runtime.lastError
          );
        } else {
          console.log("Local storage set successfully");
        }
      }
    );
  };

  /**
   * Remove single item from local storage.
   * @param keys
   */
  static removeItem = (key: string) => {
    (globalThis as any).chrome.storage.local.remove(key, () => {
      console.log("Keys removed");
    });
  };

  /**
   * Remove multiple items from local storage.
   * @param keys
   */
  static removeItems = (keys: Array<string>) => {
    (globalThis as any).chrome.storage.local.remove([...keys], () => {
      console.log("Keys removed");
    });
  };

  /**
   * Clear all local storage
   */
  static clearAll = () => {
    (globalThis as any).chrome.storage.local.clear(() => {
      console.log("All local storage cleared");
    });
  };
}

/**
 * Parse a local storage value
 * @param value
 * @returns
 */
export const parseLsItem = (value: string): { [key: string]: any } => {
  return JSON.parse(JSON.parse(value));
};
