import {extendTheme} from "@chakra-ui/react"
import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/400.css'
import '@fontsource/open-sans/700.css'
export const theme = extendTheme({
  colors: {
    brand: {
      100: "FF3c00",
    },
  },
  font:{
    body:"Open Sans,sans-serif",
  },
  styles:{
    global:()=>({
        body:{
            bg:'#0E0C0A',
            color:'white',
        },
    }),
  },
})
