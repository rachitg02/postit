import { Flex, Hide, Image } from '@chakra-ui/react';
import React from 'react';

const Navbar:React.FC = () => {
    
    return (
        <Flex bg="black" height="44px" padding="6px 12px">
            <Flex align="center">
                <Image src='images/logoface.svg' height="30px"/>
                <Hide below='md'>
                    <Image m='1' src='images/logotext.svg' height="70px"/>
                </Hide>
            </Flex>
        </Flex>
    )
}
export default Navbar;