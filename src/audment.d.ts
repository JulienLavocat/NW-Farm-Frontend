// in your theme file that you call `createTheme()`
import { Theme } from "@mui/material/styles";

declare module "@mui/styles" {
	interface DefaultTheme extends Theme {}
}
