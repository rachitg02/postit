import { Menu, MenuButton, Text, MenuList, MenuItem, Flex, Icon } from '@chakra-ui/react';
import React from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { ImHome } from 'react-icons/im'
import Communities from './Communities';

const UserMenu:React.FC = () => {
return (
<Menu>
  <MenuButton
    cursor='pointer'
    padding='0px 6px'
    borderRadius={4}
    mr={2}
    ml={{base:2,md:0}}
    _hover={{outline:"1px solid", outlineColor:"gray.600",bg:"gray.900"}}
  >
    <Flex 
    align='center' 
    justify="space-between"
    width={{base:"auto",lg:"100px"}}
    >
      <Flex align='center'>
        <Icon 
        fontSize={20} 
        mr={{base:1, md:2}}
        mb={1}
        as={ImHome}/>
        <Flex
        display={{base:"none",lg:"flex"}}>
            <Text
            color="cyan.100"
            fontSize='11pt'
            fontWeight={600}
            >Home</Text>
        </Flex>
        </Flex>
        <ChevronDownIcon/>
      </Flex>
  </MenuButton>
  
  <MenuList 
  bg='gray.800'
  borderColor='black'
  >
   <Communities/>
  </MenuList>
</Menu>
)}
export default UserMenu;