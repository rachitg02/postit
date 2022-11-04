import { Flex,Icon } from '@chakra-ui/react';
import React, { useState } from 'react';
import {HiDocumentText} from 'react-icons/hi'
import {GoFileMedia} from 'react-icons/go'
import {BiLink} from 'react-icons/bi'
import {FaPoll} from 'react-icons/fa'
import TabItem from './TabItem';
import { async } from '@firebase/util';
import TextInputs from './PostForm/TextInputs';
import ImageUpload from './PostForm/ImageUpload';
type NewPostFormProps = {
    
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

const NewPostForm:React.FC<NewPostFormProps> = () => {
    const [selectedTab,setSelectedTab]=useState(formTabs[0].title)
    const [loading,setLoading]= useState(false)
    const [textInputs,setTextInputs]= useState({
        title:"",
        body:"",
    })
    const [selectedFile,setSelectedFile]= useState<string>();


    const handleCreatePost =async()=>{

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
        </Flex>
    )
}
export default NewPostForm;