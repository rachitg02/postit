import { Menu, MenuButton, Button, MenuList, MenuItem, Flex, Icon, MenuDivider } from '@chakra-ui/react';
import React from 'react';
import {signOut, User} from 'firebase/auth'
import {FaUserCircle,FaUserAltSlash} from 'react-icons/fa'
import { ChevronDownIcon } from '@chakra-ui/icons';
import {RiUser4Line,RiLoginBoxLine} from 'react-icons/ri';
import { auth } from '../../../firebase/clientApp';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtom';

type UserMenuProps = {
    user?: User | null; 
};

const UserMenu:React.FC<UserMenuProps> = ({user}) => {
    const setAuthModalState= useSetRecoilState(authModalState);
    return (
<Menu>
  <MenuButton
    cursor='pointer'
    padding='0px 6px'
    borderRadius={4}
    _hover={{outline:"1px solid", outlineColor:"gray.600"}}
  >
    <Flex align='center'>
      <Flex align='center'>
    {user ? (

        <>
        <Icon fontSize={24} mr={1} color='gray.100' as={FaUserCircle}/>
        </>

    ):(<Icon 
    as={FaUserAltSlash}
    fontSize={20}
    color='gray.100'
    mt={1}/>)}
        </Flex>
        <ChevronDownIcon/>
      </Flex>
  </MenuButton>
  <MenuList 
  bg='gray.800'
  borderColor='black'
  >
   {user ? (
    <>
     <MenuItem
    bg='gray.800'
    fontSize='10pt'
    fontWeight={700}
    _hover={{bg:"cyan.500", color:"white"}}
    _focus={{bg:"cyan.500", color:"white"}}
    >
    <Flex>
      <Icon fontSize={20} mr={2} as={RiUser4Line}/>
      Profile
    </Flex>
    </MenuItem>
    <MenuItem
    bg='gray.800'
    fontSize='10pt'
    fontWeight={700}
    _hover={{bg:"cyan.500", color:"white"}}
    _focus={{bg:"cyan.500", color:"white"}}
    onClick={()=> signOut(auth)}
    >
    <Flex>
      <Icon fontSize={20} mr={2} as={RiLoginBoxLine}/>
      Log Out
    </Flex>
    </MenuItem>
    </>
   ):(
    <>
    <MenuItem
    bg='gray.800'
    fontSize='10pt'
    fontWeight={700}
    _hover={{bg:"cyan.500", color:"white"}}
    _focus={{bg:"cyan.500", color:"white"}}
    onClick={()=>setAuthModalState({open:true, view:"login"})}
    >
    <Flex>
      <Icon fontSize={20} mr={2} as={RiLoginBoxLine}/>
      Log In / Sign Up
    </Flex>
    </MenuItem>
    </>
   )}
  </MenuList>
</Menu>
    )
}
export default UserMenu;