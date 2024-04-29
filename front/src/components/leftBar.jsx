import { Box, UnorderedList, ListItem, Button, Flex, Heading, useDisclosure } from '@chakra-ui/react';
import { IoLogoYen } from "react-icons/io";
import { GoHomeFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { RiSendPlane2Fill } from "react-icons/ri";
import { IoNotifications } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa";
import { RiAccountCircleFill } from "react-icons/ri";
import { CgMoreO } from "react-icons/cg";
import IconContainer from './customComponents/IconContainer';
import { useNavigate } from 'react-router-dom';
import ProfileModal from './profileModal';
import { IoIosMore } from "react-icons/io";
import { useEffect, useState } from 'react';

function LeftBar() {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const name = localStorage.getItem('name');
    const [settingsVisible, setSettingsVisible] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleLogout = () => {
        localStorage.setItem('token', '')
        navigate('/')
    }

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
                    <ListItem display={'flex'} onClick={() => navigate('/dashboard')}>
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
                    <ListItem display={'flex'} onClick={() => navigate('/bookmarks')}>
                        <IconContainer>
                            {<FaBookmark />}
                        </IconContainer>
                        Bookmarks
                    </ListItem>
                    <ListItem
                        onClick={() => navigate('/profile')}
                        display={'flex'}
                    >
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
                            {settingsVisible && (
                                <Box
                                    bg={'gray.900'}
                                    paddingY={'8px'}
                                    paddingX={'50px'}
                                    borderRadius={'20px'}
                                    zIndex={10}
                                    position={'absolute'}
                                    marginBottom={'90px'}
                                >
                                    <Box fontWeight={600} onClick={handleLogout}>log out</Box>
                                    <Box fontWeight={600} onClick={onOpen}>edit profile</Box>
                                    <ProfileModal onClose={onClose} isOpen={isOpen} />
                                </Box>
                            )}
                            <Box onClick={() => setSettingsVisible(!settingsVisible)}>
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
                        </Box>
                    </ListItem>
                </UnorderedList>
            </Box>
        </>
    )
}

export default LeftBar;
