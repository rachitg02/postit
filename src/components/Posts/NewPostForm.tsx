import { Flex,Icon } from '@chakra-ui/react';
import React, { useState } from 'react';
import {HiDocumentText} from 'react-icons/hi'
import {GoFileMedia} from 'react-icons/go'
import {BiLink} from 'react-icons/bi'
import {FaPoll} from 'react-icons/fa'
import TabItem from './TabItem';
type NewPostFormProps = {
    
};

const formTabs =[
    {
        title: "Post",
        icon: HiDocumentText
    },
    {
        title: "Images & Video",
        icon: GoFileMedia
    },
    {
        title: "Link",
        icon: BiLink
    },
    {
        title: "Poll",
        icon: FaPoll
    }
]
export type TabItem={
    title: string;
    icon:typeof Icon.arguments;
}

const NewPostForm:React.FC<NewPostFormProps> = () => {
    const [selectionTab,setSelectedTab]=useState(formTabs[0].title)
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
                    selected={item.title === selectionTab}/>
                ))}
            </Flex>
        </Flex>
    )
}
export default NewPostForm;