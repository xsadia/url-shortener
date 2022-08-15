export const base62 = (counter: number) => {
  const base62String =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let hashString = "";

  while (counter > 0) {
    hashString += base62String[counter % 62];
    counter = Math.floor(counter / 62);
  }

  return hashString;
};

export const stringTodecimal = (str: string) => {
  let decOfStr = "";
  for (let i = 0; i < str.length; i++) {
    decOfStr += str.charCodeAt(i).toString(16);
  }
  return Number(decOfStr);
};

export const isExpired = (date: string) => {
  const currentDate = new Date();
  const expirationDate = new Date(date);

  return currentDate > expirationDate;
};

export const normalizeUrl = (url: string) => {
  if (!/((http|https):\/\/)/.test(url)) {
    return `http://${url}`;
  }

  return url;
};
