import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import {User} from 'firebase/auth'

type SearchinputProps = {
   user: User | null | undefined; 
};

const Searchinput:React.FC<SearchinputProps> = ({user}) => {
    
    return (
        <Flex 
        flexGrow={1}
        mr={3}
        maxWidth={user ? 'auto':'700px'}
        align='center'
        >
            <InputGroup>
            <InputLeftElement pointerEvents='none'>
                <SearchIcon color='white' mb={2}/>
            </InputLeftElement>
            <Input
            placeholder='Search Postit'
            fontSize='10pt'
            variant='filled'
            _placeholder={{color: "white"}}
            _hover={{
                bg:"gray.900",
                border:'1px solid',
                borderColor:"gray.600"
            }}
            _focus={{
                bg:"gray.900",
                outline:"none",
                border:"1px solid",
                borderColor:"gray.600",
            }}
            height="30px"
            bg="blackAlpha.900"
            />
            </InputGroup>
        </Flex>
    )
}
export default Searchinput;