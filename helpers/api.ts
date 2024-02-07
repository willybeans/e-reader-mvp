import { Platform } from "react-native";

export type ReqBody = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  body: any;
  headers?: {
    [key: string]: string;
  };
};

export const buildUrl = (): string => {
  return `http://${getLocalType()}:8080`;
};

export const getLocalType = (): string =>
  Platform.OS === "android" ? "10.0.2.2" : "localhost";

export function api<T>(url: string, reqBody?: ReqBody): Promise<T> {
  return fetch(url, reqBody)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<T>;
    })
    .catch((e) => {
      console.error("problem with fetch: ", e);
      throw e;
    });
}
