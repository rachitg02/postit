import { Button, Flex, Image, Stack } from '@chakra-ui/react';
import React, { useRef } from 'react';

type ImageUploadProps = {
    selectedFile?:string;
    onSelectImage:(event:React.ChangeEvent<HTMLInputElement>)=>void;
    setSelectedTab:(value:string)=>void;
    setSelectedFile:(value:string)=> void;
};

const ImageUpload:React.FC<ImageUploadProps> = ({
    selectedFile,
    onSelectImage,
    setSelectedTab,
    setSelectedFile
}) => {
    const selectedFileRef= useRef<HTMLInputElement>(null);
    return (
        <Flex direction='column' justify='center' align='center' width='100%'>
                {selectedFile ? (
                    <>
                    <Image
                    maxWidth='400px'
                    maxHeight='400px' 
                    src={selectedFile}/>
                    <Stack direction='row' mt={6}>
                        <Button
                        height="25px"
                        onClick={()=>setSelectedTab("Post")}
                        >
                            Back to Post
                        </Button>
                        <Button
                        variant='outline'
                        height='25px'
                        onClick={()=>setSelectedFile('')}
                        >Remove</Button>
                    </Stack>
                    </>
                ):(
                    <Flex
                justify='center'
                align='center'
                p={28}
                border="1px dashed"
                borderColor="cyan.900"
                width="100%"
                borderRadius={4}
                >
                    <Button
                    variant='outline'
                    height='40px'
                    onClick={()=>selectedFileRef.current?.click()}
                    >Upload</Button>
                    <input
                    onChange={onSelectImage}
                    ref={selectedFileRef} 
                    type='file' 
                    hidden/>
                    </Flex>
                )} 
        </Flex>
    )
}
export default ImageUpload;