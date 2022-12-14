import { collection, doc, getDocs, increment, writeBatch } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { authModalState } from '../atoms/authModalAtom';
import { Community, CommunitySnippet, communityState } from '../atoms/communitiesAtom';
import { auth, firestore } from '../firebase/clientApp';

const useCommunityData = () => {
    const [user] = useAuthState(auth)
    const [communityStateValue,setCommunityStateValue] = useRecoilState(communityState)
    const [loading,setLoading]= useState(false);
    const [error,setError]= useState("")
    const setAuthModalState= useSetRecoilState(authModalState)

    const onJoinOrLeaveCommunity=(communityData: Community,isJoined:boolean)=>{
        //if user is not logged in open auth modal
        if(!user){
            setAuthModalState({open:true, view:"login"});
            return;
        }
        if(isJoined){
            leaveCommunity(communityData.id);
            return;
        }

        joinCommunity(communityData)
    }
    const getMySnippets = async()=>{
        setLoading(true)
        try {
            const snippetDocs = await getDocs(collection(firestore,`users/${user?.uid}/communitySnippets`));
            const snippets = snippetDocs.docs.map((doc)=>({...doc.data()}));
            
            setCommunityStateValue(prev=>({
                ...prev,
                mySnippets:snippets as CommunitySnippet[],
            }))
        } catch (error:any) {
            console.log('getMySnippets error',error)
            setError(error.message)
        }
        setLoading(false);
    }
    const joinCommunity=async (communityData:Community)=>{
        
        //creating a new snippet
        //updating the numberOfMembers
        //update recoil state
        try {
            const batch = writeBatch(firestore);
            const newSnippet: CommunitySnippet={
                communityId:communityData.id,
                imageURL:communityData.imageURL || "",
            };

            batch.set(
                doc(firestore,`users/${user?.uid}/communitySnippets`,communityData.id),
                newSnippet
            );

            batch.update(doc(firestore,"communities",communityData.id),{
                numberOfMember:increment(1),
            })
            await batch.commit();

            setCommunityStateValue(prev=>({
                ...prev,
                mySnippets:[...prev.mySnippets,newSnippet],
            }))
        } catch (error:any) {
            console.log('joinCommunityError',error)
            setError(error.message)
        }
        setLoading(false)

    }
    const leaveCommunity=async (communityId:string)=>{

        //deleting a snippet
        //updating the numberOfMembers
        //update recoil state
        try {
            const batch = writeBatch(firestore)

            batch.delete(
                doc(firestore,`users/${user?.uid}/communitySnippets`,communityId))

            batch.update(doc(firestore,'communities',communityId),{
                numberOfMember: increment(-1),
            })  

            await batch.commit();

            setCommunityStateValue((prev)=>({
                ...prev,
                mySnippets:prev.mySnippets.filter((item)=>item.communityId !== communityId),
            }))
        } catch (error:any) {
            console.log("leave community error",error.message)
            setError(error.message);
        }
        setLoading(false);
    }

    useEffect(()=>{
        if(!user) return;
        getMySnippets();
    },[user]);

    return {
        communityStateValue,
        onJoinOrLeaveCommunity,
        loading,
    }
}
export default useCommunityData;