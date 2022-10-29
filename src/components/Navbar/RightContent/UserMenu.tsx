import { ChevronDownIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, Button, MenuList, MenuItem } from '@chakra-ui/react';
import React from 'react';
import {User} from 'firebase/auth'

type UserMenuProps = {
    user?: User | null; 
};

const UserMenu:React.FC<UserMenuProps> = ({user}) => {
    
    return (
<Menu>
  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
    Actions
  </MenuButton>
  <MenuList bg='black'>
    <MenuItem>Download</MenuItem>
    <MenuItem>Create a Copy</MenuItem>
    <MenuItem>Mark as Draft</MenuItem>
    <MenuItem>Delete</MenuItem>
    <MenuItem>Attend a Workshop</MenuItem>
  </MenuList>
</Menu>
    )
}
export default UserMenu;