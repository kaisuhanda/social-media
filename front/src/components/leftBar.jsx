import { Box, UnorderedList, ListItem, Button, Flex, Heading } from '@chakra-ui/react';
import { IoLogoYen } from "react-icons/io";
import { GoHomeFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { RiSendPlane2Fill } from "react-icons/ri";
import { IoNotifications } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa";
import { RiAccountCircleFill } from "react-icons/ri";
import { CgMoreO } from "react-icons/cg";
import IconContainer from './customComponents/IconContainer';

function LeftBar() {
    const username = localStorage.getItem('username');
    const name = localStorage.getItem('name');
    return (
        <>
            <Box
                bg={'black'}
                color={'white'}
                height={'100vh'}
                paddingX={'120px'}
                paddingY={'30px'}
                borderRight={'1px'}
                borderColor={'gray'}
            >
                <UnorderedList listStyleType={'none'} fontSize={'2xl'} spacing={6}>
                    <ListItem>
                        {<IoLogoYen />}
                    </ListItem>
                    <ListItem display={'flex'}>
                        <IconContainer>
                            {<GoHomeFill />}
                        </IconContainer>
                        Home
                    </ListItem>
                    <ListItem display={'flex'}>
                        <IconContainer>
                            {<FaSearch />}
                        </IconContainer>
                        Explore
                    </ListItem>
                    <ListItem display={'flex'}>
                        <IconContainer>
                            {<RiSendPlane2Fill />}
                        </IconContainer>
                        Messages
                    </ListItem>
                    <ListItem display={'flex'}>
                        <IconContainer>
                            {<IoNotifications />}
                        </IconContainer>
                        Notifications
                    </ListItem>
                    <ListItem display={'flex'}>
                        <IconContainer>
                            {<FaBookmark />}
                        </IconContainer>
                        Bookmarks
                    </ListItem>
                    <ListItem display={'flex'}>
                        <IconContainer>
                            {<RiAccountCircleFill />}
                        </IconContainer>
                        Profile
                    </ListItem>
                    <ListItem display={'flex'}>
                        <IconContainer>
                            {<CgMoreO />}
                        </IconContainer>
                        More
                    </ListItem>
                    <ListItem>
                        <Button colorScheme="twitter" size={'lg'} width={'180px'} borderRadius={'40px'}>
                            Post
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Box
                            width={'180px'}
                            h={'200px'}
                            marginLeft={"auto"}
                            display={"flex"}
                            flexDirection={"column"}
                            justifyContent={"flex-end"}
                        >
                            <Flex
                                h={'50%'}
                            >
                                {<RiAccountCircleFill size={70} />}
                                <Box paddingLeft={'5px'}>
                                    <Heading as={'h2'} size={'md'}>{name}</Heading>
                                    <Heading as={'h4'} size={'sm'} color={'gray'}>@{username}</Heading>
                                </Box>
                            </Flex>
                        </Box>
                    </ListItem>
                </UnorderedList>
            </Box>
        </>
    )
}

export default LeftBar;
