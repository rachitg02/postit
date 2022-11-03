import { Menu, MenuButton, Text, MenuList, MenuItem, Flex, Icon } from '@chakra-ui/react';
import React from 'react';
import {signOut, User} from 'firebase/auth'
import {FaUserCircle,FaUserAltSlash} from 'react-icons/fa'
import { ChevronDownIcon } from '@chakra-ui/icons';
import {RiUser4Line,RiLoginBoxLine} from 'react-icons/ri';
import { auth } from '../../../firebase/clientApp';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtom';
import { IoSparkles } from 'react-icons/io5';
import { communityState } from '../../../atoms/communitiesAtom';

type UserMenuProps = {
    user?: User | null; 
};

const UserMenu:React.FC<UserMenuProps> = ({user}) => {
    const setAuthModalState= useSetRecoilState(authModalState);
    const resetCommunityState=useResetRecoilState(communityState)
    const logout = async ()=> {
      signOut(auth);
      resetCommunityState();
    }

    return (
<Menu>
  <MenuButton
    cursor='pointer'
    padding='0px 6px'
    borderRadius={4}
    _hover={{outline:"1px solid", outlineColor:"gray.600",bg:"gray.900"}}
  >
    <Flex align='center'>
      <Flex align='center'>
    {user ? (

        <>
        <Icon fontSize={22} mr={1} color='gray.100' as={FaUserCircle}/>
        <Flex 
        direction="column"
        display={{base:"none",lg:"flex"}}
        fontSize="8pt"
        align="flex-start"
        mr={6}
        ml={2}
        >
          <Text color='cyan.300'>
            {user?.displayName || user.email?.split("@")[0]}
          </Text>
          <Flex>
            <Icon as={IoSparkles} color="yellow.300" mr={1}/>
            <Text color="red.300">1 karma</Text>
          </Flex>
        </Flex>
        </>

    ):(<Icon 
    as={FaUserAltSlash}
    fontSize={20}
    color='gray.100'
    mb={1}/>)}
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
    onClick={logout}
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