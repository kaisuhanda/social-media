import { Box, Button, Container, Flex, Heading, ListItem, UnorderedList, useDisclosure } from "@chakra-ui/react"
import Layout from "./Layout"
import { FaArrowLeft } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import IconContainer from "../components/customComponents/IconContainer";
import { useNavigate, useParams } from "react-router-dom";
import ViewedProfileTweetsList from "../components/viewedProfileTweetsList";

function ViewProfilePage() {
    const [viewedAccount, setViewedAccount] = useState({})
    const [viewedAccountTweets, setViewedAccountTweets] = useState([])
    const [followed, setFollowed] = useState(true)
    const [followers, setFollowers] = useState([])
    const [followings, setFollowings] = useState([])
    const { user_id } = useParams()
    const navigate = useNavigate()

    // useEffect(() => {
    //     const token = localStorage.getItem('token')
    //     axios.get("http://localhost:2066/accounts/keep-login", {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     }).then(response => {
    //         if (response.data.findAccount.id === parseInt(user_id)) {
    //             navigate('/profile')
    //         }
    //     })
    // })

    useEffect(() => {
        const token = localStorage.getItem("token");
        const url = "http://localhost:2066/accounts/my-followings";
        axios
            .get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const followings = response.data.follows;
                const isFollowed = followings.some(
                    (following) => following.id === parseInt(user_id)
                );
                setFollowed(isFollowed);
            })
            .catch((error) => {
                console.error("Error fetching followings:", error);
            });
    }, [user_id]);

    useEffect(() => {
        const url = `http://localhost:2066/accounts/find/${parseInt(user_id)}`
        axios.get(url).then(response => {
            console.log('viewed account : ', response.data);
            setViewedAccount(response.data.findAccount)
            setViewedAccountTweets(response.data.findAccount.tweets)
            setFollowers(response.data.findAccount.followers)
            setFollowings(response.data.findAccount.followings)
        }).catch(error => {
            console.log(error);
        })
    }, [])

    const handleFollow = (user_id) => {
        try {
            const url = `http://localhost:2066/accounts/follow/${user_id}`
            axios.post(url, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(response => {
                console.log('resp data fol', response.data);
                setFollowed(true)
            }).catch(error => {
                console.log(error);
            })
        } catch (error) {
            console.log("Handle follow error : ", error);
        }
    }

    const handleUnfollow = (user_id) => {
        try {
            const url = `http://localhost:2066/accounts/unfollow/${user_id}`
            axios.post(url, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(response => {
                console.log('resp data unfol', response.data);
                setFollowed(false)
                console.log(user_id);
            }).catch(error => {
                console.log(error);
            })
        } catch (error) {
            console.log("Handle unfollow error : ", error);
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
                    <Heading as={'h2'} size={'md'}>{viewedAccount.name}</Heading>
                    <Heading as={'h4'} size={'sm'} color={'gray'}>{viewedAccountTweets.length} posts</Heading>
                </Box>
            </Flex>
            <Box padding={'20px'} borderBottom={'1px'} borderColor={'gray'}>
                <Flex justifyContent={'space-between'}>
                    <Box>
                        <Heading as={'h2'} size={'md'}>{viewedAccount.name}</Heading>
                        <Heading as={'h4'} size={'sm'} color={'gray'}>@{viewedAccount.username}</Heading>
                    </Box>
                    <Button
                        bg={'white'}
                        borderRadius={'20px'}
                        onClick={() => (followed ? handleUnfollow(user_id) : handleFollow(user_id))}
                    >
                        {!followed ? 'follow' : 'unfollow'}
                    </Button>
                </Flex>
                <Flex marginY={'10px'} color={"gray"}>
                    <IconContainer>
                        <FaCalendarAlt />
                    </IconContainer>
                    Joined {formatMonthYear(viewedAccount.createdAt)}
                </Flex>
                <Flex>
                    <Flex>
                        <Box color={"white"} fontWeight={'bold'} marginRight={'5px'}>{followers.length}</Box>
                        <Box color={"gray"}> followers</Box>
                    </Flex>
                    <Flex marginX={'20px'}>
                        <Box color={"white"} fontWeight={'bold'} marginRight={'5px'}>{followings.length}</Box>
                        <Box color={"gray"}> following</Box>
                    </Flex>
                </Flex>
                <Heading fontSize={'20px'} marginTop={'40px'} fontWeight={700}>
                    {viewedAccount.username}'s tweets
                </Heading>
            </Box>
            <ViewedProfileTweetsList viewedAccount={viewedAccount} viewedAccountTweets={viewedAccountTweets} />
        </Layout>
    )
}

export default ViewProfilePage