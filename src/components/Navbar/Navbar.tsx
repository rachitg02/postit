import { Flex, Hide, Image } from '@chakra-ui/react';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/clientApp';
import Directory from './Directory/Directory';
import RightContent from './RightContent/RightContent';
import Searchinput from './Searchinput';

const Navbar:React.FC = () => {
    const [user, loading, error] = useAuthState(auth);
    return (
        <Flex 
        bg="gray.800" 
        height="44px" 
        padding="6px 12px"
        justify={{md:"space-between"}}
        >
            <Flex 
            align="center"
            width={{base:"40px",md:"auto"}}
            mr={{base:0, md:2}}
            >
                <Image 
                src='images/logoface.svg' 
                height="30px"
                />
                 <Image 
                 ml='2' 
                 mr='4' 
                 src='images/logotext.svg' 
                 height="70px" 
                 display={{base:"none",md:"unset"}}/>
            </Flex>
                {user && <Directory/>}
                <Searchinput user={user}/>
                <RightContent user={user}/>
        </Flex>
    )
}
export default Navbar;