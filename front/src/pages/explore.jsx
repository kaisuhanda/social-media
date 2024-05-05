import { Box, Container, ListItem, UnorderedList } from "@chakra-ui/react"
import ExploreLayout from "./ExploreLayout"
import SearchBar from "../components/search"
import FollowSuggestions from "../components/followSuggestions"
import { useEffect, useState } from "react"
import axios from "axios"
import TweetsList from "../components/tweetsList"
import TweetBox from "../components/customComponents/tweetBox"

function ExplorePage() {
    const [currentUserId, setCurrentUserId] = useState(0)
    const [accounts, setAccounts] = useState([])
    const [tweets, setTweets] = useState([])
    const [comments, setComments] = useState([])

    useEffect(() => {
        const url = 'http://localhost:2066/accounts'
        axios.get(url).then(response => {
            setAccounts(response.data.accounts)
        })
    }, [])

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

    const updateTweets = (newTweet) => {
        setTweets([newTweet, ...tweets]);
    }

    const updateComments = (newComment) => {
        setComments([newComment, ...comments])
    }

    useEffect(() => {
        fetchTweets()
    }, [])

    return (
        <ExploreLayout>
            <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Box position={"fixed"} top={'20px'}>
                    <SearchBar width={'400px'} />
                </Box>
            </Box>
            <Box height={'40px'}></Box>
            <Box>
                <FollowSuggestions accounts={accounts} currentUserId={currentUserId} />
            </Box>
            <Box>
                <UnorderedList margin={0} maxHeight={'580px'}>
                    {tweets.map((tweet, index) => (
                        <ListItem
                            key={index}
                            listStyleType={"none"}
                        >
                            <TweetBox tweet={tweet} getUser={getUser} updateComments={updateComments} />
                        </ListItem>
                    ))}
                </UnorderedList>
            </Box>
        </ExploreLayout>
    )
}

export default ExplorePage