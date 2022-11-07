import { Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react';
import React from 'react';
import {FaStumbleuponCircle} from 'react-icons/fa'
import { Community } from '../../atoms/communitiesAtom';
import useCommunityData from '../../hooks/useCommunityData'

type HeaderProps = {
    communityData: Community;
};


const Header:React.FC<HeaderProps> = ({communityData}) => {
    
    const {communityStateValue, onJoinOrLeaveCommunity,loading} = useCommunityData();
    
    
    const isJoined=!!communityStateValue.mySnippets.find(
        (item)=>item.communityId === communityData.id);

    return (
        <Flex
        direction='column'
        width="100%"
        height='146px'
        >
            <Box 
            height="50%"
            bg="cyan.200"
            />
            <Flex
            justify='center'
            bg="gray.800"
            flexGrow={1}
            >
                <Flex
                width='95%'
                maxWidth='860px'
                >
                    {communityStateValue.currentCommunity?.imageURL ?(
                        <Image 
                        borderRadius="full"
                        boxSize="64px"
                        position="relative"
                        top={-3}
                        color="cyan.200"
                        src={communityStateValue.currentCommunity.imageURL}/>
                    ):(
                    <Icon
                    as={FaStumbleuponCircle}
                    fontSize={64}
                    position='relative'
                    top={-3}
                    color="red.400"
                    borderRadius="50%"
                    />
                    )}
                    <Flex padding="10px 16px">
                        <Flex
                        direction='column'
                        mr={6}
                        >
                            <Text
                            fontWeight={800}
                            fontSize="16pt"
                            >{communityData.id}</Text>
                            <Text
                            fontWeight={600}
                            fontSize="10pt"
                            color='gray.400'
                            >p/ {communityData.id}</Text>
                        </Flex>
                        <Button
                        isLoading={loading}
                        variant={isJoined?"outline":"solid"}
                        height="25px"
                        mt={2}
                        pr={6}
                        pl={6}
                        onClick={()=>onJoinOrLeaveCommunity(communityData,isJoined)}
                        >{isJoined?"Joined":"Join"}</Button>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
export default Header;