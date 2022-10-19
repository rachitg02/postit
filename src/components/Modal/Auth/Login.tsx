import { Text, Button, Flex, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtom';

type LoginProps = {
    
};

const Login:React.FC<LoginProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const [loginForm, setLoginForm] =useState({
        email:"",
        password:"",
    })
    const onChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
        setLoginForm((prev)=>({
            ...prev,
            [event.target.name]:event.target.value,
        }))
    };
    const onSubmit=()=>{};

    return (
        <form onSubmit={onSubmit}>
            <Input
            required
            name="email"
            placeholder="email"
            type="email"
            mb={3}
            onChange={onChange}
            fontSize="10pt"
            _placeholder={{color:"gray.300"}}
            _hover={{
                bg:"black",
                border:"1px solid",
                borderColor:"gray.700"
            }}
            _focus={{
                outline:"none",
                bg:"black",
                border:"1px solid",
                borderColor:"gray.700"
            }}
            bg="black"
            />
            <Input
            required
            name="password"
            placeholder="password"
            type="password"
            mb={2}
            onChange={onChange}
            fontSize="10pt"
            _placeholder={{color:"gray.300"}}
            _hover={{
                bg:"black",
                border:"1px solid",
                borderColor:"cyan.900"
            }}
            _focus={{
                outline:"none",
                bg:"black",
                border:"1px solid",
                borderColor:"cyan.900"
            }}
            bg="black"
            />
            <Button 
            width='100%'
            height="36px"
            mt={2}
            mb={2}
            type='submit'
            >Log In</Button>
            <Flex fontSize="9pt" justifyContent="center">
                <Text mr={1}>New here?</Text>
                <Text 
                color="cyan.500" 
                fontWeight={700}
                cursor="pointer"
                onClick={()=>setAuthModalState(prev=>({
                    ...prev,
                    view:'signup'
                }))}
                >Sign Up</Text>
            </Flex>
        </form>
    )
}
export default Login;