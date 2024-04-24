import { Box, Button, Container, Flex, Heading, useDisclosure } from "@chakra-ui/react"
import Layout from "./Layout"
import { FaArrowLeft } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import ProfileModal from "../components/profileModal";
import IconContainer from "../components/customComponents/IconContainer";
import MyTweetsList from "../components/myTweetsList";

function ProfilePage() {
    const [myAccount, setMyAccount] = useState({});
    const [myTweets, setMyTweets] = useState([])
    const [followers, setFollowers] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [myFollowings, setMyFollowings] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('token');
        const url = "http://localhost:2066/accounts/keep-login";
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            const account = response.data.findAccount;
            setMyAccount(account);
            setMyTweets(account.tweets)
            setFollowers(account.followers)
            console.log("Account:", myAccount); 
            console.log("Tweets:", myTweets);
            console.log("Followers:", followers); 
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token')
        const url = "http://localhost:2066/accounts/my-followings"
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            console.log("response : ", response.data.follows);
            setMyFollowings(response.data.follows)
        }).catch(error => {
            console.log(token);
            console.log(error);
        })
    }, [])

    function formatMonthYear(isoDateString) {
        if (!isoDateString) {
            return 'Invalid date';
        }     
        const date = new Date(isoDateString);     
        if (isNaN(date)) {
            return 'Invalid date';
        }  
        const formatter = new Intl.DateTimeFormat('en-GB', {
            year: 'numeric',
            month: 'long',
        });
        return formatter.format(date);
    }
    
    return (
        <Layout>
            <Container
                bg={"black"}
                color={"white"}
                p={0} m={0}
                maxW={'3xl'}
            >
                <Flex paddingY={'10px'} borderBottom={'1px'} borderColor={"gray"}>
                    <Box padding={'10px'} marginRight={'30px'}>
                        <FaArrowLeft size={20} />
                    </Box>
                    <Box>
                        <Heading as={'h2'} size={'md'}>{myAccount.name}</Heading>
                        <Heading as={'h4'} size={'sm'} color={'gray'}>{myTweets.length} posts</Heading>
                    </Box>
                </Flex>
                <Box padding={'20px'}>
                    <Flex justifyContent={'space-between'}>
                        <Box>
                            <Heading as={'h2'} size={'md'}>{myAccount.name}</Heading>
                            <Heading as={'h4'} size={'sm'} color={'gray'}>@{myAccount.username}</Heading>
                        </Box>
                        <Button
                            bg={'none'}
                            color={"white"}
                            border={'1px'}
                            borderColor={'white'}
                            borderRadius={'20px'}
                            onClick={onOpen}
                        >
                            Edit Profile
                        </Button>
                        <ProfileModal onClose={onClose} isOpen={isOpen} />
                    </Flex>
                    <Flex marginY={'10px'} color={"gray"}>
                        <IconContainer>
                            <FaCalendarAlt />
                        </IconContainer>
                        Joined {formatMonthYear(myAccount.createdAt)}
                    </Flex>
                    <Flex>
                        <Flex>
                            <Box color={"white"} fontWeight={'bold'} marginRight={'5px'}>{followers.length}</Box>
                            <Box color={"gray"}> followers</Box>
                        </Flex>
                        <Flex marginX={'20px'}>
                            <Box color={"white"} fontWeight={'bold'} marginRight={'5px'}>{myFollowings.length}</Box>
                            <Box color={"gray"}> following</Box>
                        </Flex>
                    </Flex>
                </Box>
                <MyTweetsList myTweets={myTweets}/>
            </Container>
        </Layout>
    )
}

export default ProfilePage