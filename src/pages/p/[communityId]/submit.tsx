import { Box,Text } from '@chakra-ui/react';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilValue } from 'recoil';
import { communityState } from '../../../atoms/communitiesAtom';
import PageContent from '../../../components/Layout/PageContent'
import NewPostForm from '../../../components/Posts/NewPostForm';
import { auth } from '../../../firebase/clientApp';

const SubmitPostPage:React.FC = () => {
    const [user] = useAuthState(auth);
    const setCommunityStateValue = useRecoilValue(communityState)
    console.log('COMMUNITY',setCommunityStateValue)
    return (
        <PageContent>
          <>
          <Box
          p='14px 0px'
          borderBottom='1px solid'
          borderColor='gray.700'>
            <Text fontWeight={700}>Create a Post</Text>
          </Box>
          {user && <NewPostForm user={user}/>}
          </>
          <>About</>  
        </PageContent>
    )
}
export default SubmitPostPage;