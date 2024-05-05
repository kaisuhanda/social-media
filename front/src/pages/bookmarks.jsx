import { useState, useEffect } from "react";
import SavedTweetsList from "../components/savedTweetsList";
import Layout from "./Layout"
import { Box, Container, Heading } from "@chakra-ui/react";

function BookMarksPage() {
    const [tweets, setTweets] = useState([])
    const [accounts, setAccounts] = useState([])

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

    return (
        <Layout>
            <Box textAlign={"center"} padding={'10px'}>
                <Heading as={'h2'}>
                    Bookmarks
                </Heading>
            </Box>
            <SavedTweetsList tweets={tweets} getUser={getUser} updateComments={updateComments} />
        </Layout>
    )
}

export default BookMarksPage;