import { ListItem, Flex, Box, Button, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RiAccountCircleFill } from "react-icons/ri";
import IconContainer from "./IconContainer";
import axios from "axios";

function FollowListItem({ account, followingPage }) {
    const [followed, setFollowed] = useState(false);
    const [myFollowings, setMyFollowings] = useState([])
    const [accounts, setAccounts] = useState([])

    const fetchAccounts = async () => {
        try {
            const response = await axios.get('http://localhost:2066/accounts');
            setAccounts(response.data.accounts); 
        } catch (error) {
            console.error("Error fetching accounts:", error);
        }
    };

    useEffect(() => {
        fetchAccounts();
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const url = "http://localhost:2066/accounts/my-followings";
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            setMyFollowings(response.data.follows);
            let isFollowed;
                if (followingPage) {
                    isFollowed = response.data.follows.some(
                        (following) => following.id === account.id
                    );
                } else {
                    isFollowed = response.data.follows.some(
                        (following) => following.id === account.follower_id
                    );
                }
            setFollowed(isFollowed);
        }).catch((error) => {
            console.error(error);
        });
    }, [account.id]);

    const handleFollow = (user_id) => {
        try {
            const url = `http://localhost:2066/accounts/follow/${user_id}`
            axios.post(url, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(response => {
                console.log(response.data);
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
                console.log(response.data);
                setFollowed(false)
                console.log(user_id);
            }).catch(error => {
                console.log(error);
            })
        } catch (error) {
            console.log("Handle unfollow error : ", error);
        }
    }

    const getUser = (user_id) => {
        if (accounts.length === 0) {
            return { username: 'unknown', name: 'unknown' }; 
        }

        const foundAccount = accounts.find((acc) => acc.id === user_id);
        return foundAccount || { username: 'unknown', name: 'unknown' }; 
    };

    return (
        <Box>
            {followingPage ? (
                <ListItem display={"flex"} justifyContent={"space-between"} width={"100%"}>
                    <Flex>
                        <IconContainer>
                            <RiAccountCircleFill size={40} />
                        </IconContainer>
                        <Box>
                            <Heading as={"h2"} size={"md"}>
                                {account.name}
                            </Heading>
                            <Heading as={"h2"} size={"sm"} color={"gray"}>
                                @{account.username}
                            </Heading>
                        </Box>
                    </Flex>
                    <Box>
                        <Button
                            borderRadius={"20px"}
                            onClick={() => (followed ? handleUnfollow(account.id) : handleFollow(account.id))}
                        >
                            {followed ? "Unfollow" : "Follow"}
                        </Button>
                    </Box>
                </ListItem>
            ) : (
                <ListItem display={"flex"} justifyContent={"space-between"} width={"100%"}>
                    <Flex>
                        <IconContainer>
                            <RiAccountCircleFill size={40} />
                        </IconContainer>
                        <Box>
                            <Heading as={"h2"} size={"md"}>
                                {getUser(account.follower_id).name}
                            </Heading>
                            <Heading as={"h2"} size={"sm"} color={"gray"}>
                                @{getUser(account.follower_id).username}
                            </Heading>
                        </Box>
                    </Flex>
                    <Box>
                        <Button
                            borderRadius={"20px"}
                            onClick={() => (followed ? handleUnfollow(account.follower_id) : handleFollow(account.follower_id))}
                        >
                            {followed ? "Unfollow" : "Follow"}
                        </Button>
                    </Box>
                </ListItem>
            )}
        </Box>
    );
}

export default FollowListItem;
