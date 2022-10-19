import type { ComponentStyleConfig } from "@chakra-ui/theme";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "60px",
    fontSize: "10pt",
    fontWeight: 700,
    _focus: {
      boxShadow: "none",
    },
  },
  sizes: {
    sm: {
      fontSize: "7pt",
    },
    md: {
      fontSize: "9pt",
      // height: "28px",
    },
  },
  variants: {
    solid: {
      color: "white",
      bg: "cyan.500",
      _hover: {
        bg: "cyan.600",
      },
    },
    outline: {
      color: "cyan.500",
      border: "2px solid",
      borderColor: "cyan.500",
      _hover:{
        bg:"blackAlpha.900",
        color:"white"
      }
    },
    oauth: {
      bg:'black',
      height: "34px",
      border: "1px solid",
      borderColor: "gray.300",
      _hover: {
        bg: "gray.50",
        textColor:"black"
      },
    },
  },
};