interface CookiesType {
  [key: string]: any;
}

/**
 * Action to fetch current active tabs
 * @returns {Array} Current tabs
 */
export const getTabs = async () => {
  return await (globalThis as any).chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
};

/**
 * Action to get current tabs url
 * @returns {string} Current tab's url
 */
export const getCurrentTabUrl = async () => {
  const tabs = await getTabs();
  return tabs[0].url;
};

/**
 * Action to get cookies for current tab
 * @returns {Array} Cookies for current tab
 */
export const getAllCookies = () => {
  if (!(globalThis as any).chrome?.tabs?.query) {
    return;
  }

  const url = getCurrentTabUrl();
  return new Promise((resolve) => {
    (globalThis as any).chrome.cookies.getAll(
      {
        url,
      },
      function (cookies: any) {
        return resolve(cookies);
      }
    );
  });
};

/**
 * Action to get cookies for current tab
 * @param url  - tab url
 * @param name - cookie name
 * @returns
 */
export const getCookie = (url: string, name: string) => {
  return new Promise((resolve) => {
    (globalThis as any).chrome.cookies.get(
      {
        url,
        name,
      },
      function (cookie: any) {
        return resolve(cookie);
      }
    );
  });
};

export const addCookiesForTest = () => {
  const cookies =
    "username=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
  document.cookie = cookies;
};

/**
 * Parse cookie string
 * @param cookies - cookie string
 * @returns {object} - parsed cookies
 */
export const parseCookies = (cookies: any) => {
  return cookies.split(";").reduce((cookies: CookiesType, keyValue: string) => {
    const idx = keyValue.indexOf("=");
    const key = keyValue.substring(0, idx);
    const values = keyValue.substring(idx + 1);

    cookies[key] = values
      .replaceAll('"', "")
      .split("&")
      .reduce(
        (
          valueMap: { [index: string]: string } | string,
          keyValuePairs: string,
          _idx: number,
          array: string[]
        ) => {
          if (array.length === 1) {
            return keyValuePairs;
          }

          const keyValueArr = keyValuePairs.split("=");
          const key = keyValueArr[0];
          const value = keyValueArr[1];
          if (typeof valueMap === "object") valueMap[key] = value;
          return valueMap;
        },
        {}
      );

    return cookies;
  }, {});
};

/**
 * Parsed cookies value
 * @param cookiesValue
 * @returns {Array} - Parsed cookie's value
 */
export const parseCookiesValue = (cookiesValue: any) => {
  return cookiesValue.split("&").reduce((acc: any, keyValuePair: string) => {
    const keyValueArray = keyValuePair.split("=");
    const key = keyValueArray[0];
    const value = keyValueArray[1];
    acc.push({ key, value });
    return acc;
  }, {});
};

/**
 * Join cookies object to string
 * @param object - cookies object
 * @param glue - identifier to join key and value
 * @param separator - identifier to join key-value pairs
 * @returns {string} - cookies string
 */
export const cookieJoin = (
  object: any,
  glue: string | undefined = "=",
  separator: string | undefined = "&"
): string => {
  return Object.keys(object)
    .map((key) => [key, object[key]].join(glue))
    .join(separator);
};

/**
 * Set cookies for current tab
 * @param name
 * @param value
 * @param domain
 * @param path
 * @param expirationDays
 * @param secure
 */
export const setCookies = (
  name: string,
  value: string,
  domain: string,
  path: string = "/",
  expirationDays: number = 0,
  secure: boolean = true
) => {
  const expirationDate =
    Math.floor(Date.now() / 1000) + expirationDays + 60 * 60;

  const url = getCurrentTabUrl();
  (globalThis as any).chrome.cookies.set(
    {
      url,
      name,
      value,
      domain,
      path,
      ...(expirationDate !== undefined && { expirationDate }),
      secure,
    },
    function (cookie: any) {
      if ((globalThis as any).chrome.runtime.lastError) {
        console.error(
          "Error setting cookie",
          (globalThis as any).chrome.runtime.lastError
        );
      } else {
        console.log("Cookie Set", cookie);
      }
    }
  );
};
