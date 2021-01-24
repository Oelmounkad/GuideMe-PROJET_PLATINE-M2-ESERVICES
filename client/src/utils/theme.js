import { extendTheme } from "@chakra-ui/react";

const colors = {
  primary: {
    100: "#FFB74D",
    200: "#27EF96",
    300: "#10DE82",
    400: "#0EBE6F",
    500: "#FF9100",
    600: "#FFB74D",
    700: "#FF9100",
    800: "#1a202c",
    900: "#064C2E"
  }
};

const customTheme = extendTheme({ colors });

export default customTheme;
