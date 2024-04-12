import Layout from "./Layout"
import NavBar from "../components/upperNavBar"
import Post from "../components/post"
import TweetsList from "../components/tweetsList"
import { Container } from "@chakra-ui/react"
import { useEffect, useState } from "react"

function Dashboard() {
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

    const getUsername = (userID) => {
        for (const account of accounts) {
            if (account.id === userID) {
                return account.username
            }
        }
        return 'unknown'
    }

    const updateTweets = (newTweet) => {
        setTweets([newTweet, ...tweets]); 
    }

    useEffect(() => {
        fetchTweets()
        fetchAccounts()
        console.log(accounts);
    }, [])

    return (
        <Layout>
            <Container
                bg={"black"}
                color={"white"}
                p={0} m={0}
                maxW={'3xl'}
            >
                <NavBar />
                <Post updateTweets={updateTweets}/>
                <TweetsList tweets={tweets} getUsername={getUsername}/>
            </Container>
        </Layout>
    )
}

export default Dashboard