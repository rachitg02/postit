import React from 'react';
import {TabItem} from './NewPostForm'
import {Flex, Text, Icon} from '@chakra-ui/react'
type TabItemProps = {
    item:TabItem;
    selected:boolean;
    setSelectedTab:(value: string)=> void;
};

const TabItem:React.FC<TabItemProps> = ({item, selected, setSelectedTab}) => {
    
    return (
        <Flex
        justify='center'
        align='center'
        flexGrow={1}
        p='14px 0px'
        cursor='pointer'
        fontWeight={700}
        _hover={{bg:'gray.700'}}
        color={selected ? "cyan.300":"gray.100"}
        borderWidth={selected ? "0px 1px 2px 0px":"0px 1px 1px 0px"}
        borderBottomColor={selected ? "cyan.300":"gray.700"}
        borderRightColor="gray.700"
        onClick={()=>setSelectedTab(item.title)}
        >
            <Flex 
            height="20px"
            mr={2}
            align='center'
            >
                <Icon as={item.icon}/>
            </Flex>
            <Text >{item.title}</Text>
        </Flex>
    )
}
export default TabItem;