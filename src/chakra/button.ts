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
      _focus:{
        bg: "cyan.600",
      },
      _active:{
        bg: "cyan.400",
      },
    },
    outline: {
      color: "cyan.500",
      border: "2px solid",
      borderColor: "cyan.500",
      _hover:{
        borderColor:"cyan.700",
        color:"cyan.700",
        bg:"gray.800"
      },
      _focus:{
        borderColor:"cyan.700",
        color:"cyan.700",
        bg:"gray.800"
      },
      _active:{
        borderColor:"cyan.400",
        color:"cyan.400",
        bg:"gray.800"
      },
    },
    oauth: {
      bg:'white',
      height: "34px",
      textColor:"black",
      _hover: {
        bg: "gray.200",
        textColor:"black"
      },
    },
  },
};