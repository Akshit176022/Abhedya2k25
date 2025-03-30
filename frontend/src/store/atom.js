import { atom } from "recoil";

export const customCursorSizeAtom = atom({
  key: "customCursorSize",
  default: 50,
});

export const isNavOpenAtom = atom({
  key: "isNavOpenAtom",
  default: false,
});
