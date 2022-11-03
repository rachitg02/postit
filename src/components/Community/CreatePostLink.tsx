import { Flex, Icon, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsLink45Deg } from "react-icons/bs";
import { GoDiffAdded } from "react-icons/go";
import { IoImageOutline } from "react-icons/io5";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../atoms/authModalAtom";
import { auth } from "../../firebase/clientApp";


const CreatePostLink: React.FC = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);

  const onClick=()=>{
    if(!user){
        setAuthModalState({open:true,view:"login"});
        return;
    }
    const {communityId}=router.query;
    router.push(`/p/${communityId}/submit`);
  }
  return (
    <Flex
      justify="space-evenly"
      align="center"
      bg="gray.800"
      height="50px"
      borderRadius={4}
      border="1px solid"
      borderColor="gray.700"
      p={2}
      mb={4}
    >
      <Icon as={GoDiffAdded} fontSize={24} color="cyan.500" mr={4} />
      <Input
        placeholder="Create Post"
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "gray.900",
          border: "1px solid",
          borderColor: "gray.700",
        }}
        _focus={{
          outline: "none",
          bg: "gray.900",
          border: "1px solid",
          borderColor: "gray.700",
        }}
        _active={{
          bg: "gray.900",
          border: "1px solid",
          borderColor: "gray.700",
        }}
        bg="black"
        borderColor="gray.700"
        height="34px"
        borderRadius={4}
        mr={4}
        onClick={onClick}
      />
      <Icon
        as={IoImageOutline}
        fontSize={24}
        mr={4}
        color="cyan.500"
        cursor="pointer"
      />
      <Icon 
      as={BsLink45Deg} 
      fontSize={24} 
      color="cyan.500" 
      cursor="pointer" />
    </Flex>
  );
};
export default CreatePostLink;