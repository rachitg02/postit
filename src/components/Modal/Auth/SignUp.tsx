import { Text, Input, Button, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/clientApp'
import { FIREBASE_ERRORS } from '../../../firebase/errors';

const SignUp:React.FC = () => {
    
    const setAuthModalState = useSetRecoilState(authModalState);
    const [signUpForm, setSignUpForm] =useState({
        email:"",
        password:"",
        confirmPassword:"",
    })
    const onChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
        setSignUpForm((prev)=>({
            ...prev,
            [event.target.name]:event.target.value,
        }))
    };
    const [error,setError]= useState('');
    const [createUserWithEmailAndPassword,user,loading,userError] = useCreateUserWithEmailAndPassword(auth);
    const onSubmit=(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        if(error) setError('')
        if(signUpForm.password!==signUpForm.confirmPassword)
        {
            setError('Password does not match')
            return;
        }
        createUserWithEmailAndPassword(signUpForm.email,signUpForm.password);
    };

    return (
        <form onSubmit={onSubmit}>
            <Input
            required
            name="email"
            placeholder="email"
            type="email"
            mb={2}
            onChange={onChange}
            fontSize="10pt"
            _placeholder={{color:"gray.500"}}
            _hover={{
                border:"2px solid",
                borderColor:"cyan.100"
            }}
            _focus={{
                outline:"none",
                border:"2px solid",
                borderColor:"cyan.100"
            }}
            bg="white"
            textColor='black'
            />
            <Input
            required
            name="password"
            placeholder="password"
            type="password"
            mb={2}
            onChange={onChange}
            fontSize="10pt"
            _placeholder={{color:"gray.500"}}
            _hover={{
                border:"2px solid",
                borderColor:"cyan.100"
            }}
            _focus={{
                outline:"none",
                border:"2px solid",
                borderColor:"cyan.100"
            }}
            bg="white"
            textColor='black'
            />
            <Input
            required
            name="confirmPassword"
            placeholder="confirm password"
            type="password"
            mb={3}
            onChange={onChange}
            fontSize="10pt"
            _placeholder={{color:"gray.500"}}
            _hover={{
                border:"2px solid",
                borderColor:"cyan.100"
            }}
            _focus={{
                outline:"none",
                border:"2px solid",
                borderColor:"cyan.100"
            }}
            bg="white"
            textColor='black'
            />
            <Text textAlign='center' color='red'>
                {error || FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
            </Text>
            <Button 
            width='100%'
            height="36px"
            mt={2}
            mb={2}
            type='submit'
            isLoading={loading}
            >Sign Up</Button>
            <Flex fontSize="9pt" justifyContent="center">
                <Text mr={1}>Already a member?</Text>
                <Text 
                color="cyan.500" 
                fontWeight={700}
                cursor="pointer"
                onClick={()=>setAuthModalState(prev=>({
                    ...prev,
                    view:'login'
                }))}
                >Log In</Text>
            </Flex>
        </form>
    )
}
export default SignUp;