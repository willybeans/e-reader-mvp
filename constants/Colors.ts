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
  colorLightPurple: "#EFE8F7", // "#EFE8F7", // "#E2D1F0",
  transparent: "rgba(52, 52, 52, alpha)",
  colorGold: "#C7AC16", // "#FFD700"
};

export default {
  light: {
    text: pallatte.colorBlack,
    background: pallatte.colorWhite,
    tint: pallatte.colorDarkPurple,
    tabIconDefault: pallatte.colorDarkGrey,
    tabIconSelected: pallatte.colorDarkPurple,
    buttonDefault: pallatte.colorGrey,
    border: pallatte.colorDarkGrey,
    matchTint: pallatte.colorLightPurple,
    placeholder: pallatte.colorDarkGrey,
  },
  dark: {
    text: pallatte.colorWhite,
    background: pallatte.colorBlack,
    tint: pallatte.colorLightPurple,
    tabIconDefault: pallatte.colorLightGrey,
    tabIconSelected: pallatte.colorLightPurple,
    buttonDefault: pallatte.colorDarkGrey,
    border: pallatte.colorLightGrey,
    matchTint: pallatte.colorDarkPurple,
    placeholder: pallatte.colorGrey,
  },
};
