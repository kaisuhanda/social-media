import { Box, Button, Container, Flex, Heading, ListItem, UnorderedList, useDisclosure } from "@chakra-ui/react"
import Layout from "./Layout"
import { FaArrowLeft } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import ProfileModal from "../components/profileModal";
import IconContainer from "../components/customComponents/IconContainer";
import MyTweetsList from "../components/myTweetsList";
import SavedTweetsList from "../components/savedTweetsList";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
    const [myAccount, setMyAccount] = useState({});
    const [tweets, setTweets] = useState([])
    const [myTweets, setMyTweets] = useState([])
    const [followers, setFollowers] = useState([])
    const [myPosts, setMyPosts] = useState(true)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [myFollowings, setMyFollowings] = useState([])
    const [accounts, setAccounts] = useState([])
    const navigate = useNavigate()

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
            // console.log("Account:", myAccount);
            // console.log("Tweets:", myTweets);
            // console.log("Followers:", followers);
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
            // console.log("response : ", response.data.follows);
            setMyFollowings(response.data.follows)
        }).catch(error => {
            console.log(token);
            console.log(error);
        })
    }, [])

    useEffect(() => {
        try {
            let url = 'http://localhost:2066/accounts'
            axios.get(url).then(response => {
                console.log("Accounts response : ", response.data.accounts);
                setAccounts(response.data.accounts)
            })
        } catch (error) {
            console.log(error);
        }
    }, [])

    useEffect(() => {
        try {
            let url = 'http://localhost:2066/tweets'
            axios.get(url).then(response => {
                console.log("Tweets response : ", response.data.tweets);
                setTweets(response.data.tweets)
            })
        } catch (error) {
            console.log(error);
        }
    }, [])

    const updateComments = (newComment) => {
        setComments([newComment, ...comments])
    }

    const getUser = (userID) => {
        for (const account of accounts) {
            if (account.id === userID) {
                return account
            }
        }
        return {
            username: 'unknown',
            name: 'unknown'
        }
    }

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
            <Flex paddingY={'10px'} borderBottom={'1px'} borderColor={"gray"}>
                <Box padding={'10px'} marginRight={'30px'} onClick={() => navigate(-1)}>
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
                    <Flex onClick={() => navigate('/profile/followers')}>
                        <Box color={"white"} fontWeight={'bold'} marginRight={'5px'}>{followers.length}</Box>
                        <Box color={"gray"}> followers</Box>
                    </Flex>
                    <Flex marginX={'20px'} onClick={() => navigate('/profile/following')}>
                        <Box color={"white"} fontWeight={'bold'} marginRight={'5px'}>{myFollowings.length}</Box>
                        <Box color={"gray"}> following</Box>
                    </Flex>
                </Flex>
            </Box>
            <Box
                bg={'black'}
                color={'white'}
                height={'70px'}
                borderBottom={'1px'}
                borderColor={'gray'}
            >
                <Container textAlign={'center'} height={'full'}>
                    <UnorderedList
                        height={'full'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        listStyleType={'none'}
                    >
                        <ListItem
                            marginX={'50px'}
                            marginTop={'35px'}
                            borderBottom={myPosts ? '4px' : ''}
                            borderRadius={'2px'}
                            borderColor={'lightblue'}
                            onClick={() => setMyPosts(true)}
                        >
                            <Heading as={'h3'} size={'sm'} padding={'5px'}>My Tweets</Heading>
                        </ListItem>
                        <ListItem
                            marginX={'50px'}
                            marginTop={'35px'}
                            borderBottom={!myPosts ? '4px' : ''}
                            borderRadius={'2px'}
                            borderColor={'lightblue'}
                            onClick={() => setMyPosts(false)}
                        >
                            <Heading as={'h3'} size={'sm'} padding={'5px'}>Bookmarked Tweets</Heading>
                        </ListItem>
                    </UnorderedList>
                </Container>
            </Box>
            {myPosts ?
                <MyTweetsList myTweets={myTweets} getUser={getUser} updateComments={updateComments} />
                :
                <SavedTweetsList tweets={tweets} getUser={getUser} updateComments={updateComments} />
            }
        </Layout>
    )
}

export default ProfilePage