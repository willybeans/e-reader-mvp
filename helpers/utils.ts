export const cleanString = (str: string): string => {
  const cleanSlash = str.replace("\\n|\\/gm", " ");
  return cleanSlash;
};

export const createPagination = (n: number, str: string) => {
  // should we set /n as a special count?
  let arr = str?.split(" ");
  let result = [];
  let subStr = arr[0];
  for (let i = 1; i < arr.length; i++) {
    let word = arr[i];
    if (subStr.length + word.length + 1 <= n) {
      subStr = subStr + " " + word;
    } else {
      result.push(subStr);
      subStr = word;
    }
  }
  if (subStr.length) {
    result.push(subStr);
  }
  return result;
};
