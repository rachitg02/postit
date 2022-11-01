import { Text, Box, Button, Divider, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Input, Stack, Checkbox, Flex } from '@chakra-ui/react';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { setLazyProp } from 'next/dist/server/api-utils';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../../../firebase/clientApp';

type CreateCommunityModalProps = {
    open:boolean;
    handleClose:()=>void;
};

const CreateCommunityModal:React.FC<CreateCommunityModalProps> = ({open,handleClose}) => {
    
    const [user]=useAuthState(auth);
    const [communityName, setCommunityName]= useState('');
    const [charsRemaining,setCharsRemaining]= useState(27);
    const [communityType, setCommunityType]= useState("public");
    const [error,setError]= useState('');
    const [loading,setLoading]= useState(false);

    const handleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        if(event.target.value.length>27) return;

        setCommunityName(event.target.value);
        setCharsRemaining(27-event.target.value.length)
    }
 const onCommunityTypeChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
    setCommunityType(event.target.name)
 }

 const handleCreateCommunity = async ()=>{
   if(error) setError('');
    //Validate the community
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/; 
    if(format.test(communityName) || communityName.length<3)
    {
        setError('Name must be between 3-27 characters and with no special characters.')
        return;
    }
    setLoading(true);
    
    try {
        //Community document in Firestore
        const communityDocRef= doc(firestore,'communities',communityName);
        const communityDoc = await getDoc(communityDocRef);
    
        //Check that name is not taken
        if(communityDoc.exists()){
            throw new Error(`Sorry, p/${communityName} is taken. Try another`);
        }

    //If valid name, create community
    await setDoc(communityDocRef,{
        createrId: user?.uid,
        createdAt: serverTimestamp(),
        numberOfMember: 1,
        privacyType: communityType,
    });
    } catch (error:any) {
        console.log('handleCreateCommunity error', error);
        setError(error.message);
    }
    setLoading(false);
 }

    return (
        <>
      <Modal isOpen={open} onClose={handleClose} size='lg'>
        <ModalOverlay />
        <ModalContent bg="gray.700">
          <ModalHeader
          display='flex'
          flexDirection='column'
          fontSize={20}
          padding={3}
          >Create a community</ModalHeader>
          <Box pl={3} pr={3}>
            <Divider/>
            <ModalCloseButton />
            <ModalBody
            display='flex'
            flexDirection="column"
            padding="10px 0px"
            >
            <Text fontWeight={700} fontSize={20}>
                Name
            </Text>
            <Text fontSize={15} color='gray.400'>
                Community names including capitalization cannot be changed.
            </Text>
            <Text 
            position='relative'
            top='32px'
            left='8px'
            width='20px'
            color='gray.400'
            >p/</Text>
            <Input
            position='relative' 
            value={communityName} 
            size='md'
            pl='22px'
            onChange={handleChange}
            _hover={{
                border:"2px solid",
                borderColor:"cyan.500"
            }}
            _focus={{
                outline:"none",
                border:"2px solid",
                borderColor:"cyan.500"
            }}
            />
            <Text
            fontSize={12}
            mt={3}
            ml={1}
            color={charsRemaining === 0 ? "red.300": "green.300"}
            >{charsRemaining} characters remaining</Text>
            
            <Text mt={1} fontSize={10} color='red' pt={1}
            >{error}</Text>
            
            <Box
            mt={2}
            mb={4}
            >
                <Text 
                fontWeight={700}
                fontSize={20}
                mb={2}
                >
                    Community Type
                </Text>
                <Stack>
                    <Checkbox
                    colorScheme='cyan' 
                    name="public"
                    isChecked={communityType === 'public'}
                    onChange={onCommunityTypeChange}
                    >
                        <Flex align="center">
                            <Text ml={1} fontSize={16}>📢 Public</Text>
                            <Text ml={2} fontSize={12} color='gray.400'>
                                Anyone can view, post and comment.
                            </Text>
                        </Flex>
                    </Checkbox>
                    
                    <Checkbox
                    colorScheme='cyan' 
                    name="restricted"
                    isChecked={communityType === 'restricted'}
                    onChange={onCommunityTypeChange}
                    >
                        <Flex align="center">
                            <Text ml={1} fontSize={16}>⛔ Restricted</Text>
                            <Text ml={2} fontSize={12} color='gray.400'>
                                Anyone can view, but only approved users can post.
                            </Text>
                        </Flex>
                    </Checkbox>
                    
                    <Checkbox 
                    colorScheme='cyan'
                    name="private"
                    isChecked={communityType === 'private'}
                    onChange={onCommunityTypeChange}
                    >
                        <Flex align="center">
                            <Text ml={1} fontSize={16}>🔓 Private</Text>
                            <Text ml={2} fontSize={12} color='gray.400'>
                                Only approved users can view and post.
                            </Text>
                        </Flex>
                    </Checkbox>
                </Stack>
            </Box>
            </ModalBody>
            </Box>
          <ModalFooter bg='gray.800'>
            <Button 
            mr={3}
            variant="outline"
            height="34px"
            onClick={handleClose}
            >
              Cancel
            </Button>
            <Button 
            height="34px"
            onClick={handleCreateCommunity}
            isLoading={loading}
            >Create Community</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default CreateCommunityModal;