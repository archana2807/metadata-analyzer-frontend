import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#00E5FF",
      light: "#7CFFFF",
      dark: "#00A3B8",
      contrastText: "#001018",
    },

    secondary: {
      main: "#FF6B6B",
      light: "#FF9B9B",
      dark: "#D64545",
      contrastText: "#ffffff",
    },

    background: {
      default: "#050A12",
      paper: "#0A1220",
    },

    text: {
      primary: "#EAF2FF",
      secondary: "#9AB0C8",
      disabled: "#5C6F85",
    },

    divider: "rgba(0,229,255,0.08)",
  },

  typography: {
    fontFamily: "Inter, Arial, sans-serif",
  },

  shape: {
    borderRadius: 14,
  },
});

export default theme;