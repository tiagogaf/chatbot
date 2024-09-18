import type { PropsWithChildren } from "react";
import type { Shadows, ThemeOptions } from "@mui/material";
import {
  createTheme,
  GlobalStyles,
  ScopedCssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";

export const colors = {
  blueViolet: "#7d37ff",
  magnolia: "#f4f2ff",
  white: "#FFFFFF",
  cultured: "#F5F5F5",
  cetaceanBlue: "#110331",
};

const theme = createTheme({
  shadows: Array(25).fill("none") as Shadows,
  palette: {
    mode: "light",
    primary: {
      main: colors.blueViolet,
      contrastText: colors.white,
    },
    secondary: {
      main: colors.magnolia,
    },
  },
  components: {
    MuiSvgIcon: {
      defaultProps: {
        htmlColor: colors.blueViolet,
      },
      styleOverrides: {
        colorPrimary: colors.blueViolet,
      },
    },
  },
} as ThemeOptions);

export const MaterialUIProvider = ({ children }: PropsWithChildren) => {
  return (
    <StyledEngineProvider injectFirst>
      <GlobalStyles
        styles={{
          body: { backgroundColor: colors.cetaceanBlue },
        }}
      />
      <ScopedCssBaseline>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ScopedCssBaseline>
    </StyledEngineProvider>
  );
};
