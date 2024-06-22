import { ITheme } from "../../types/go.types";

export default () => (localStorage.getItem("goTheme") as keyof ITheme) ?? "paper";
