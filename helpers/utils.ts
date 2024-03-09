export const cleanString = (str: string): string => {
  console.log("str", str);
  // const cleanSlash = str.replace("/\\n|\\/gm", " ");
  const cleanSlash = str.replace(/(\r\n|\n|\r)/gm, " ");
  console.log("cleanSlash", cleanSlash);
  let pattern = /\n/;
  let result = str.search(pattern);
  console.log("result", result);
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
