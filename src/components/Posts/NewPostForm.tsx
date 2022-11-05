import {Text, Alert, AlertIcon, Flex,Icon } from '@chakra-ui/react';
import React, { useState } from 'react';
import {HiDocumentText} from 'react-icons/hi'
import {GoFileMedia} from 'react-icons/go'
import TabItem from './TabItem';
import TextInputs from './PostForm/TextInputs';
import ImageUpload from './PostForm/ImageUpload';
import { Post } from '../../atoms/postAtom';
import {User} from "firebase/auth";
import { useRouter } from 'next/router';
import { addDoc, collection, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { firestore, storage } from '../../firebase/clientApp';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

type NewPostFormProps = {
    user: User;
};

const formTabs:TabItem[] =[
    {
        title: "Post",
        icon: HiDocumentText
    },
    {
        title: "Images & Video",
        icon: GoFileMedia
    },
]
export type TabItem={
    title: string;
    icon:typeof Icon.arguments;
}

const NewPostForm:React.FC<NewPostFormProps> = ({user}) => {
    const [selectedTab,setSelectedTab]=useState(formTabs[0].title)
    const [loading,setLoading]= useState(false)
    const [error,setError] = useState(false)
    const router = useRouter();
    const [textInputs,setTextInputs]= useState({
        title:"",
        body:"",
    })
    const [selectedFile,setSelectedFile]= useState<string>();


    const handleCreatePost =async()=>{
        const {communityId} = router.query;
        //create new post object => type Post
        const newPost: Post={
            communityId:communityId as string,
            creatorId: user.uid,
            creatorDisplayName:user.email!.split('@')[0],
            title: textInputs.title,
            body: textInputs.body,
            numberOfComments:0,
            voteStatus:0,
            createdAt:serverTimestamp() as Timestamp,
        }
        setLoading(true)
        //store the post in db
        try {
           const postDocRef = await addDoc(collection(firestore,"posts"),newPost)
           if(selectedFile){
            const imageRef=ref(storage,`posts/${postDocRef.id}/image`);
            await uploadString(imageRef,selectedFile,'data_url');
            const downloadURL = await getDownloadURL(imageRef);

            await updateDoc(postDocRef,{
                imageURL:downloadURL,
            })
           }
           router.back()
        } catch (error:any) {
            console.log("handleCreatePost error", error.message)
            setError(true);
        }
        setLoading(false)
        //check for selectedFile(Image)
            //if found store in storage
            //update post doc by adding img URL
        //redirect the user to the community page
    }

    const onSelectImage=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const reader = new FileReader();

        if(event.target.files?.[0]){
            reader.readAsDataURL(event.target.files[0]);
        }

        reader.onload =(readerEvent)=>{
            if(readerEvent.target?.result){
                setSelectedFile(readerEvent.target.result as string);
            }
        }
    }

    const onTextChange=(event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const {
            target:{name,value},
        }=event;
        setTextInputs((prev)=>({
            ...prev,
            [name]:value,
        }))
    }
    
    return (
        <Flex
        borderRadius={4}
        mt={2} 
        bg="gray.800"
        direction='column'>
            <Flex width="100%">
                {formTabs.map(item=>(
                    <TabItem 
                    key={item.title} 
                    item={item}
                    setSelectedTab={setSelectedTab}
                    selected={item.title === selectedTab}/>
                ))}
            </Flex>
            <Flex p={4}>
                {selectedTab ==="Post" &&(
                    <TextInputs
                    textInputs={textInputs}
                    handleCreatePost={handleCreatePost}
                    onChange={onTextChange}
                    loading={loading}
                />
                )
                }
                {selectedTab ==="Images & Video" &&(
                    <ImageUpload
                    selectedFile={selectedFile}
                    onSelectImage={onSelectImage}
                    setSelectedTab={setSelectedTab}
                    setSelectedFile={setSelectedFile}
                    />
                )
                }
            </Flex>
            {error && (
                <Alert status="error">
                    <AlertIcon/>
                    <Text mr={2}>Error creating post</Text>
                </Alert>
            )}
        </Flex>
    )
}
export default NewPostForm;