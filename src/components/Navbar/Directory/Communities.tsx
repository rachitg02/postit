import { Flex, Icon, MenuItem } from '@chakra-ui/react';
import React, { useState } from 'react';
import CreateCommunityModal from '../../Modal/CreateCommunityModal/CreateCommunityModal';
import { IoAddSharp } from "react-icons/io5";

type CommunitiesProps = {
    
};

const Communities:React.FC<CommunitiesProps> = () => {
    const [open, setOpen] = useState(false);
    return (
    <>
        <CreateCommunityModal open={open} handleClose={()=>setOpen(false)}/>
        <MenuItem
        width="100%"
        fontSize={14}
        fontWeight={700} 
        _hover={{bg:"cyan.500"}}
        _focus={{bg:"cyan.500"}}
        onClick={()=> setOpen(true)}
        >
        <Flex
        align='center'
        >
            <Icon 
            color='white' 
            fontSize={22} 
            mr={2}
            as={IoAddSharp}/>
            Create Community
        </Flex>
        </MenuItem>
    </>
    )
}
export default Communities;