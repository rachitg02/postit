import { Button } from '@chakra-ui/react';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtom';

const AuthButtons:React.FC = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    return (
        <>
        <Button 
        variant='outline'
        height='25px'
        display={{base:"none", sm:"flex"}}
        width={{base:"70px", md:"100px"}}
        mr={2}
        onClick={()=>setAuthModalState({open: true, view:"login"})}
        >
            Log In</Button>
        
        
        <Button
        height='25px'
        display={{base:"none", sm:"flex"}}
        width={{base:"70px", md:"100px"}}
        mr={2}
        onClick={()=>setAuthModalState({open: true, view:"signup"})}
        >
            Sign Up</Button>
        </>
    )
}
export default AuthButtons;