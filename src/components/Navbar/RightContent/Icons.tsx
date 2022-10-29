import { Flex, Icon } from '@chakra-ui/react';
import React from 'react';
import { IoAddSharp } from "react-icons/io5";

const Icons:React.FC = () => {
    
    return (
         <Flex alignItems="center" flexGrow={1}>
        <Flex
          display={{ base: "none", md: "flex" }}
          mr={2}
          ml={1}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ 
            bg: "cyan.500"}}
        >
          <Icon as={IoAddSharp} fontSize={22} color='white' />
        </Flex>
    </Flex>
    )
}
export default Icons;