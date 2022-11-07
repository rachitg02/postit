import {Spinner,Image, Box, Button, Divider, Flex, Icon, Stack, Text } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { Community, communityState } from '../../atoms/communitiesAtom';
import {TbInfoSquare} from 'react-icons/tb'
import {RiCakeLine} from 'react-icons/ri'
import {FaStumbleuponCircle} from 'react-icons/fa'
import moment from 'moment';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore, storage } from '../../firebase/clientApp';
import useSelectFile from '../../hooks/useSelectFile';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { useSetRecoilState } from 'recoil';

type AboutProps = {
    communityData: Community;
};

const About:React.FC<AboutProps> = ({communityData}) => {
    const {selectedFile,setSelectedFile,onSelectFile}= useSelectFile();
    const setCommunityStateValue =useSetRecoilState(communityState)
    const [user] = useAuthState(auth)
    const selectedFileRef = useRef<HTMLInputElement>(null)
    const [uploadingImage,setUploadingImage] = useState(false)

    const onUpdateImage = async () =>{
        if(!selectedFile) return;
        setUploadingImage(true)
        try {
            const imageRef = ref(storage,`communities/${communityData.id}/image`);
            await uploadString(imageRef,selectedFile,'data_url')
            const downloadURL = await getDownloadURL(imageRef)
            await updateDoc(doc(firestore,"communities",communityData.id),{
               imageURL:downloadURL, 
            })
            setCommunityStateValue(prev=>({
                ...prev,
                currentCommunity:{
                    ...prev.currentCommunity,
                    imageURL:downloadURL,
                } as Community,
            }))
        } catch (error) {
           console.log('onUpdateImage error',error)
        }
        setUploadingImage(false)
    }

    return (
        <Box position='sticky' top='14px'>
            <Flex 
            justify='space-between'
            align='center'
            bg='cyan.500'
            p='3'
            borderRadius='4px 4px 0px 0px'>
                <Text fontSize='10pt' fontWeight={700}>
                    About Community
                </Text>
                <Icon fontSize='22px' as={TbInfoSquare}/>
            </Flex>
            <Flex 
            direction='column'
            p={3}
            bg='gray.800'
            borderRadius='0px 0px 4px 4px'>
                <Stack>
                    <Flex borderBottom='1px solid' borderColor='gray.600' width='100%' p={2} fontSize='10pt' fontWeight={700}>
                        <Flex direction='column' flexGrow={1}>
                            <Text>{communityData.numberOfMember?.toLocaleString()}</Text>
                            <Text>Members</Text>
                        </Flex>
                        <Flex direction='column' flexGrow={1}>
                            <Text color='cyan.200'>{communityData.privacyType}</Text>
                            <Text>Visibility</Text>
                        </Flex>
                    </Flex>
                    <Flex
                    align='center'
                    width='100%'
                    p={1}
                    fontWeight={500}
                    fontSize='10pt'>
                        <Icon mr={2} fontSize={18} as={RiCakeLine}/>
                        {communityData.createdAt && (
                            <Text>
                                Created{" "}
                                {moment (
                                    new Date(communityData.createdAt.seconds * 1000)
                                ).format("MM DD, YYYY")}
                            </Text>
                        )}
                    </Flex>
                    <Link href={"/p/${communityData.id}/submit"}>
                        <Button
                        mt={3}
                        height="30px"
                        >Create Post</Button>
                    </Link>
                    {user?.uid === communityData.createrId && (
                        <>
                        <Divider/>
                        <Stack spacing={1} fontSize='10pt'>
                            <Text fontWeight={700}>Admin</Text>
                            <Flex align='center' justify='space-between'>
                                <Text 
                                color='cyan.500'
                                cursor='pointer'
                                _hover={{textDecoration:'underline'}}
                                onClick={()=>selectedFileRef.current?.click()}
                                >Change Image</Text>
                                {communityData.imageURL || selectedFile ?(
                                    <Image src={selectedFile || communityData.imageURL} borderRadius='full' boxSize="40px"/>
                                ):(
                                    <Icon
                                    as={FaStumbleuponCircle}
                                    fontSize={40}
                                    mb={3}
                                    position='relative'
                                    color="gray.300"
                                    borderRadius="50%"
                                    />
                                )}
                            </Flex>
                            {selectedFile && (uploadingImage ? (<Spinner/>) : (<Text
                            cursor='pointer'
                            color='gray.400'
                            onClick={onUpdateImage}>Save Changes</Text>)
                            )}
                            <input
                            id='file-upload'
                            type='file'
                            accept='image/x-png,image/gif,image/jpeg'
                            onChange={onSelectFile}
                            ref={selectedFileRef} 
                            hidden/>
                        </Stack>
                        </>
                    )}
                </Stack>
            </Flex>
        </Box>
    )
}
export default About;