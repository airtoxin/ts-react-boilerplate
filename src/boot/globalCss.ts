import { cssRule } from "typestyle";

let called = false;

export const setupGlobalCss = (appId: string) => {
  if (called) throw new Error("setupGlobalCss already called");
  called = true;

  cssRule(`html, body, #${appId}`, {
    height: "100vh",
    width: "100vw",
    padding: 0,
    margin: 0
  });

  cssRule(`#${appId}`, {
    display: "flex",
    flexDirection: "column"
  });
};
