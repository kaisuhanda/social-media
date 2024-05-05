import { useState, useEffect } from "react";
import SavedTweetsList from "../components/savedTweetsList";
import Layout from "./Layout"
import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function BookMarksPage() {
    const [tweets, setTweets] = useState([])
    const [accounts, setAccounts] = useState([])
    const navigate = useNavigate()

    const fetchTweets = async () => {
        try {
            let url = 'http://localhost:2066/tweets'
            const response = await fetch(url);
            const tweetsResponse = await response.json();
            const tweetsData = tweetsResponse.tweets;
            setTweets(tweetsData)
            console.log("Tweets response : ", tweetsData);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchAccounts = async () => {
        try {
            let url = 'http://localhost:2066/accounts'
            const response = await fetch(url)
            const accountResponse = await response.json()
            const accountsData = accountResponse.accounts;
            setAccounts(accountsData);
            console.log("Accounts response : ", accountsData);
        } catch (error) {
            console.log(error);
        }
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

    const updateComments = (newComment) => {
        setComments([newComment, ...comments])
    }

    useEffect(() => {
        fetchTweets()
        fetchAccounts()
    }, [])

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
        <Layout>
            <Box textAlign={"center"}>
                <Flex paddingY={'10px'} borderBottom={'1px'} borderColor={"gray"}>
                    <Box padding={'10px'} marginRight={'30px'} onClick={() => navigate(-1)}>
                        <FaArrowLeft size={20} />
                    </Box>
                    <Box>
                        <Heading as={'h2'} size={'md'}>Bookmarks</Heading>
                        <Heading as={'h2'} size={'sm'} color={"gray"}>{savedTweets.length} Bookmarks</Heading>
                    </Box>
                </Flex>
            </Box>
            <SavedTweetsList tweets={tweets} getUser={getUser} updateComments={updateComments} savedTweets={savedTweets}/>
        </Layout>
    )
}

export default BookMarksPage;