import React, { useState } from 'react';
import { Post } from '../../atoms/postAtom';
import {AiFillDelete} from 'react-icons/ai'
import {BsFillBookmarkPlusFill,BsChatLeftFill,BsDot} from 'react-icons/bs'
import {} from 'react-icons/fa'
import {
IoArrowDownCircleOutline,
IoArrowDownCircleSharp,
IoArrowRedoOutline,
IoArrowUpCircleOutline,
IoArrowUpCircleSharp,
IoShareSocialSharp
} from 'react-icons/io5'
import { Image, Text, Flex, Icon, Stack, Skeleton } from '@chakra-ui/react';
import moment from 'moment';

type PostItemProps = {
    post:Post;
    userIsCreator:boolean;
    userVoteValue:any;
    onVote:()=>{};
    onDeletePost:()=>{};
    onSelectPost:()=>void;
};

const PostItem:React.FC<PostItemProps> = ({
post,
userIsCreator,
userVoteValue,
onVote,
onDeletePost,
onSelectPost,
}) => {
    
    const [loadingImage,setLoadingImage] = useState(true);

    return (
        <Flex 
        border='1px solid' 
        bg='gray.800'
        borderColor='gray.900'
        borderRadius={4}
        _hover={{borderColor:'gray.700'}}
        cursor="pointer"
        onClick={onSelectPost}
        >
            <Flex
            direction='column'
            align='center'
            bg="gray.700"
            p={2}
            width='40px'
            borderRadius={4}>
                <Icon
                as={userVoteValue ===1 ? IoArrowUpCircleSharp: IoArrowUpCircleOutline}
                color={userVoteValue === 1? "green.500":"white"}
                fontSize={22}
                onClick={onVote}
                cursor='pointer'
                />
                <Text p={2} fontSize='9pt'>{post.voteStatus}</Text>
                <Icon
                as={userVoteValue ===-1 ? IoArrowDownCircleSharp: IoArrowDownCircleOutline}
                color={userVoteValue === -1? "red.500":"white"}
                fontSize={22}
                onClick={onVote}
                cursor='pointer'
                />
            </Flex>
            <Flex p={1} direction='column' width='100%'>
                <Stack spacing={1} p='10px'>
                    <Stack
                    direction='row'
                    spacing={0.6}
                    align='center'
                    fontSize='9pt'>
                        <Text color='gray.400'>
                            Posted By u/{post.creatorDisplayName}<Icon color='cyan.500' as={BsDot}/>{moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
                        </Text>
                    </Stack>
                    <Text color='white' fontSize='12pt' fontWeight={700}>{post.title}</Text>
                    <Text fontSize='10pt' color='gray.100'>{post.body}</Text>
                    {post.imageURL && (
                        <Flex justify='center' align='center' p={2}>
                            {loadingImage && 
                            <Skeleton height="200px" width="100%" borderRadius={4}/> }
                            <Image
                            maxHeight='460px'
                            alt='Post Image'
                            display={loadingImage? "none":"unset"}
                            onLoad={()=>setLoadingImage(false)}
                             src={post.imageURL}/>
                        </Flex>
                    )}
                </Stack>
                <Flex ml={1} mb={0.5} color="gray.100">
                        <Flex
                        align='center'
                        p='8px 10px'
                        borderRadius={4}
                        _hover={{bg:"gray.700"}}
                        cursor="pointer"
                        >
                            <Icon as={BsChatLeftFill} mr={2}/>
                            <Text fontSize='9pt'>{post.numberOfComments}</Text>
                        </Flex>
                        <Flex
                        align='center'
                        p='8px 10px'
                        borderRadius={4}
                        _hover={{bg:"gray.700"}}
                        cursor="pointer"
                        >
                            <Icon as={IoShareSocialSharp} mr={2}/>
                            <Text fontSize='9pt'>Share</Text>
                        </Flex>
                        <Flex
                        align='center'
                        p='8px 10px'
                        borderRadius={4}
                        _hover={{bg:"gray.700"}}
                        cursor="pointer"
                        >
                            <Icon as={BsFillBookmarkPlusFill} mr={2}/>
                            <Text fontSize='9pt'>Save</Text>
                        </Flex>
                        {userIsCreator && 
                        <Flex
                        align='center'
                        p='8px 10px'
                        borderRadius={4}
                        _hover={{bg:"gray.700"}}
                        cursor="pointer"
                        onClick={onDeletePost}
                        >
                            <Icon as={AiFillDelete} mr={2}/>
                            <Text fontSize='9pt'>Delete</Text>
                        </Flex>}
                </Flex>
            </Flex>
        </Flex>
    )
}
export default PostItem;