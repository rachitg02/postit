import { Button, Flex,Icon,Text} from '@chakra-ui/react';
import React from 'react';
import Link from "next/link";
import {BiError} from 'react-icons/bi'


const NotFound:React.FC = () => {
    
    return (
        <Flex
        direction="column"
        justifyContent='center'
        alignItems='center'
        minHeight="60vh"
        >
            <Icon color="red.300" fontSize="180px" as={BiError}/>
            <Text mt={1} fontSize="23px" fontWeight={600}>Sorry, that community does not exist.</Text>
            <Link href="/">
            <Button mt={6}>Go Home</Button>
            </Link>
        </Flex>
    )
}
export default NotFound;