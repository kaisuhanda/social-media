import { Box, Heading, ListItem, UnorderedList, } from "@chakra-ui/react";
import TweetBox from "./customComponents/tweetBox";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountListItem from "./customComponents/accountListItem";
import FollowSuggestions from "./followSuggestions";

function FollowingTweetsList({ tweets, getUser, updateComments }) {
    const [followingTweets, setFollowingTweets] = useState([])
    const [myFollowings, setMyFollowings] = useState([])
    const [currentUserId, setCurrentUserId] = useState(0)
    const [accounts, setAccounts] = useState([])

    useEffect(() => {
        const url = "http://localhost:2066/accounts"
        axios.get(url).then(response => {
            setAccounts(response.data.accounts)
        })
    })

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

    useEffect(() => {
        const filteredTweets = tweets.filter(tweet => {
            return myFollowings.some(following => following.id === tweet.user_id);
        })
        console.log("My Followings : ", myFollowings);
        console.log("Filtered Tweets : ", filteredTweets);
        setFollowingTweets(filteredTweets);
    }, [tweets, myFollowings]);

    useEffect(() => {
        const token = localStorage.getItem('token')
        const url = "http://localhost:2066/accounts/keep-login"
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            const { success: keepLoginSuccess, findAccount } = response.data;
            if (keepLoginSuccess && findAccount) {
                setCurrentUserId(findAccount.id)
            }
        })
        console.log("abchdbj ", currentUserId);
    }, [])

    return (
        <Box>
            {myFollowings.length > 0 ? (
                <Box overflowY={"auto"} >
                    <UnorderedList margin={0} maxHeight={'580px'}>
                        {followingTweets.map((tweet, index) => (
                            <ListItem
                                key={index}
                                listStyleType={"none"}
                            >
                                <TweetBox tweet={tweet} getUser={getUser} updateComments={updateComments} />
                            </ListItem>
                        ))}
                    </UnorderedList>
                </Box>
            ) : (
                <Box>
                    <Heading marginBottom={'30px'}>You have not followed anyone :/</Heading>
                    <FollowSuggestions accounts={accounts} currentUserId={currentUserId} />
                </Box>
            )}
        </Box>
    );
}

export default FollowingTweetsList;