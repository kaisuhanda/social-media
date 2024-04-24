import { Box, ListItem, UnorderedList, } from "@chakra-ui/react";
import TweetBox from "./customComponents/tweetBox";
import { useEffect, useState } from "react";
import axios from "axios";

function FollowingTweetsList({ tweets, getUser, updateComments }) {
    const [followingTweets, setFollowingTweets] = useState([])
    const [myFollowings, setMyFollowings] = useState([])

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

    return (
        <Box overflowY={"auto"} >
            <UnorderedList margin={0} maxHeight={'580px'}>
                {followingTweets.map((tweet, index) => (
                    <ListItem
                        key={index}
                        listStyleType={"none"}
                    >
                        <TweetBox tweet={tweet} getUser={getUser} updateComments={updateComments}/>
                    </ListItem>
                ))}
            </UnorderedList>
        </Box>
    );
}

export default FollowingTweetsList;