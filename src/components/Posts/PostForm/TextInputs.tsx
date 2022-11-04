import { Button, Flex, Input, Stack, Textarea } from '@chakra-ui/react';
import React from 'react';

type TextInputsProps = {
    textInputs:{
        title:string;
        body: string;
    }
    onChange:(
        event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    )=> void;
    handleCreatePost:()=>void;
    loading:boolean;
};

const TextInputs:React.FC<TextInputsProps> = ({
    textInputs,
    onChange,
    handleCreatePost,
    loading
}) => {
    
    return (
        <Stack
        spacing={4}
        width="100%">
            <Input
            value={textInputs.title}
            onChange={onChange}
            name='title'
            fontSize="12pt"
            borderRadius={4}
            borderColor='gray.600'
            placeholder="Title"
            _placeholder={{color:"gray.300"}}
            _hover={{
                bg:"gray.900",
                border:'1px solid',
                borderColor:"gray.600"
            }}
            _focus={{
                bg:"gray.900",
                outline:"none",
                border:"1px solid",
                borderColor:"cyan.500",
            }}
            />
            <Textarea
            value={textInputs.body}
            onChange={onChange}
            p={4}
            name='body'
            fontSize="12pt"
            borderRadius={4}
            height="160px"
            borderColor='gray.600'
            placeholder="Text"
            _placeholder={{color:"gray.300"}}
           _hover={{
                bg:"gray.900",
                border:'1px solid',
                borderColor:"gray.600"
            }}
            _focus={{
                bg:"gray.900",
                outline:"none",
                border:"1px solid",
                borderColor:"cyan.500",
            }}
            />
            <Flex justify='flex-end'>
                <Button
                isLoading={loading}
                onClick={handleCreatePost}
                height="34px"
                padding="0px 30px"
                disabled={!textInputs.title}
                >Post</Button>
            </Flex>
        </Stack>
    )
}
export default TextInputs;