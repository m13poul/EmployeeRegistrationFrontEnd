import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setDarkTheme } from "../features/themeSlice";

function useTheme() {
  const dark = useSelector((state) => state.theme.dark);
  const dispatch = useDispatch();
  function changeTheme() {
    if (dark === "dark") {
      dispatch(setDarkTheme("light"));
      document.querySelector("html")?.classList?.remove?.("dark");
    } else {
      dispatch(setDarkTheme("dark"));
      document.querySelector("html")?.classList?.add?.("dark");
    }
  }

  useEffect(() => {
    const darkOS = matchMedia("(prefers-color-scheme: dark)").matches;
    if (darkOS) {
      changeTheme();
    }
  }, []);

  return { changeTheme };
}

export default useTheme;
