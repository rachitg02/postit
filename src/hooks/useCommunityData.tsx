import React from 'react';
import { useRecoilState } from 'recoil';
import { Community, communityState } from '../atoms/communitiesAtom';

const useCommunityData = () => {
    const [communityStateValue,setCommunityStateValue] = useRecoilState(communityState)
    
    const onJoinOrLeaveCommunity=(communityData: Community,isJoined:boolean)=>{
        //if user is not logged in open auth modal
        
        if(isJoined){
            leaveCommunity(communityData.id)
        }

        joinCommunity(communityData)
    }
    const joinCommunity=(communityData:Community)=>{}
    const leaveCommunity=(communityId:string)=>{}
    return {
        communityStateValue,
        onJoinOrLeaveCommunity,
    }
}
export default useCommunityData;