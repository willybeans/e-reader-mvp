// const tintColorLight = "#2f95dc";
// const tintColorDark = "#fff";
// const tintColorLight = "#7C2EDB";
// const tintColorDark = "#e2d1f0";

export const pallatte = {
  colorWhite: "#FFFFFF",
  colorBlack: "#000000",
  colorDarkGrey: "#484848",
  colorGrey: "#B4B4B4",
  colorLightGrey: "#CCCCCC",
  colorDarkPurple: "#7C2EDB",
  colorLightPurple: "#E2D1F0",
  transparent: "rgba(52, 52, 52, alpha)",
};

export default {
  light: {
    text: pallatte.colorBlack,
    background: pallatte.colorWhite,
    tint: pallatte.colorDarkPurple,
    tabIconDefault: pallatte.colorLightGrey,
    tabIconSelected: pallatte.colorDarkPurple,
    buttonDefault: pallatte.colorGrey,
  },
  dark: {
    text: pallatte.colorWhite,
    background: pallatte.colorBlack,
    tint: pallatte.colorLightPurple,
    tabIconDefault: pallatte.colorLightGrey,
    tabIconSelected: pallatte.colorLightPurple,
    buttonDefault: pallatte.colorDarkGrey,
  },
};
