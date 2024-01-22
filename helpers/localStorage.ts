import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (newKey: string, value: string | Object) => {
  try {
    if (typeof value === "string") {
      console.log("testing string", value);

      await AsyncStorage.setItem(newKey, value);
    } else if (typeof value === "object") {
      console.log("testing obj", value);
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(newKey, jsonValue);
    }
  } catch (e) {
    console.error("error reading storage value: ", e);
  }
};

// export const storeDataObject = async (value: {}) => {
//   try {
//     const jsonValue = JSON.stringify(value);
//     await AsyncStorage.setItem("my-key", jsonValue);
//   } catch (e) {
//     console.error("error reading storage value: ", e);
//   }
// };

export const getDataString = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? value : null;
    // if (value !== null) {
    //   // value previously stored
    //   return null;
    // }
  } catch (e) {
    console.error("error reading storage value: ", e);
  }
};

export const getDataObject = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("error reading storage value: ", e);
  }
};

export const removeValue = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error("error removing storage value: ", e);
  }
};
