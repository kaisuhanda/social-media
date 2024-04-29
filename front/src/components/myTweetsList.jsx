import { Box, Container, Heading, ListItem, UnorderedList } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import TweetBox from "./customComponents/tweetBox"
import axios from "axios"

function MyTweetsList({ myTweets }) {
    const [myAccount, setMyAccount] = useState({})

    useEffect(() => {
        const token = localStorage.getItem('token');
        const url = "http://localhost:2066/accounts/keep-login";
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            const account = response.data.findAccount;
            setMyAccount(account);
        });
    }, []);

    useEffect(() => {
        console.log('My Tweets ', myTweets);
    }, [])

    const getUser = () => {
        return {
            username: myAccount.username,
            name: myAccount.name
        }
    }

    const updateComments = (newComment) => {
        setComments([newComment, ...comments])
    }
    
    return (
        <Box>
            <Box overflowY={"auto"} >
                <UnorderedList margin={0} maxHeight={'580px'}>
                    {myTweets.map((tweet, index) => (
                        <ListItem
                            key={index}
                            listStyleType={"none"}
                        >
                            <TweetBox tweet={tweet} getUser={getUser} updateComments={updateComments} />
                        </ListItem>
                    ))}
                </UnorderedList>
            </Box>
        </Box>
    )
}

export default MyTweetsList