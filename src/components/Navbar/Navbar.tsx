import { Flex, Hide, Image } from '@chakra-ui/react';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/clientApp';
import RightContent from './RightContent/RightContent';
import Searchinput from './Searchinput';

const Navbar:React.FC = () => {
    const [user, loading, error] = useAuthState(auth);
    return (
        <Flex bg="gray.800" height="44px" padding="6px 12px">
            <Flex align="center">
                <Image src='images/logoface.svg' height="30px"/>
                <Hide below='md'>
                    <Image ml='2' mr='4' src='images/logotext.svg' height="70px"/>
                </Hide>
            </Flex>
                <Searchinput/>
                <RightContent user={user}/>
        </Flex>
    )
}
export default Navbar;