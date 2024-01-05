export type ReqBody = {
  method: "POST" | "GET";
  body: any;
  headers: {
    [key: string]: string;
  };
};

export function api<T>(url: string, reqBody?: ReqBody): Promise<T> {
  return fetch(url, reqBody).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<T>;
  });
}
