import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    body: "'Roboto Condensed', sans-serif",
    heading: "'Bangers', sans-serif",
    menu: "'Montserrat Alternates', sans-serif",
  },
  colors: {
    brand: {
      background: "#D7E8D5",
      button: "#748B75",
      buttonText: "#1C1C1C",
      heading: "#92AD94",
    },
    login: {
      _hover: "#5E705B",
    },
  },
  styles: {
    global: {
      body: {
        bg: "#1C1C1C",
        color: "#F5FBEF",
        footer: "#303030",
      },
      a: {
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
});

export default theme;
