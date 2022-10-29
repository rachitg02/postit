import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Flex, Text} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtom';
import { auth } from '../../../firebase/clientApp';
import Authinputs from './Authinputs';
import OAuthButtons from './OAuthButtons';
import ResetPassword from './ResetPassword';

const AuthModal:React.FC = () => {
    const [modalState,setModalState] = useRecoilState(authModalState);
    const [user, loading, error]=useAuthState(auth);
    const handleClose =()=>{
        setModalState((prev)=>({
            ...prev,
            open:false,
        }));
    };

    useEffect(()=>{
      if(user) handleClose();
    },[user])
  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent 
        bg='gray.900'
        >
          <ModalHeader textAlign='center'>
            {modalState.view === "login" && "Login"}
            {modalState.view === "signup" && "Sign Up"}
            {modalState.view === "resetPassword" && "Reset Password"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody 
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          pb={6}
          >
            <Flex
            direction="column"
            align="center"
            justify="center"
            width="70%"
            >
              {modalState.view === 'login' || modalState.view === 'signup'?(
                <>
                <OAuthButtons/>
                <Text color="gray.400" fontWeight={700}>
                  OR
                </Text>
                <Authinputs/>
                </>
              ):<ResetPassword/>}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
export default AuthModal;