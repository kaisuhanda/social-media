import { Box, ListItem, UnorderedList, } from "@chakra-ui/react";
import TweetBox from "./customComponents/tweetBox";
import { useEffect, useState } from "react";
import axios from "axios";

function SavedTweetsList({ tweets, getUser, updateComments }) {
    const [bookmarks, setBookmarks] = useState([])
    const [savedTweets, setSavedTweets] = useState([])
    const [savedTweetsID, setSavedTweetsID] = useState([])
    const [currentUserId, setCurrentUserId] = useState(0)
    const [currentUserBookmarks, setCurrentUserBookmarks] = useState([])

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
    }, [])

    useEffect(() => {
        const fetchBookmarks = async () => {
            const url = "http://localhost:2066/tweets/bookmarks"
            const response = await axios.get(url)
            const bookmarksResponse = response.data.bookmarks
            setBookmarks(bookmarksResponse)
        }
        fetchBookmarks()
    }, [])

    useEffect(() => {
        console.log("All bookmarks : ", bookmarks);
        setCurrentUserBookmarks(bookmarks.filter(bookmark => bookmark.user_id === currentUserId));
    }, [bookmarks, currentUserId]);
    
    useEffect(() => {
        console.log("My bookmarks : ", currentUserBookmarks);
        const bookmarkIDs = currentUserBookmarks.map(bookmark => bookmark.tweet_id);
        setSavedTweetsID(bookmarkIDs);
    }, [currentUserBookmarks]);
    
    useEffect(() => {
        console.log("Tweets: ", tweets);
        console.log("Saved Tweet IDs: ", savedTweetsID);
        const filteredTweets = tweets.filter(tweet => savedTweetsID.includes(tweet.id));
        console.log("Filtered Tweets: ", filteredTweets);
        setSavedTweets(filteredTweets);
    }, [savedTweetsID, tweets]);
    

    return (
        <Box overflowY={"auto"} >
            <UnorderedList margin={0} maxHeight={'580px'}>
                {savedTweets.map((tweet, index) => (
                    <ListItem
                        key={index}
                        listStyleType={"none"}
                    >
                        <TweetBox tweet={tweet} getUser={getUser} updateComments={updateComments} />
                    </ListItem>
                ))}
            </UnorderedList>
        </Box>
    );
}

export default SavedTweetsList;
