import { Box, Container, Heading, ListItem, UnorderedList } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import TweetBox from "./customComponents/tweetBox"
import axios from "axios"

function MyTweetsList({ myTweets }) {
    const [myPosts, setMyPosts] = useState(true)
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
            <Box
                bg={'black'}
                color={'white'}
                height={'70px'}
                borderBottom={'1px'}
                borderColor={'gray'}
            >
                <Container textAlign={'center'} height={'full'}>
                    <UnorderedList
                        height={'full'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        listStyleType={'none'}
                    >
                        <ListItem
                            marginX={'50px'}
                            marginTop={'35px'}
                            borderBottom={myPosts ? '4px' : ''}
                            borderRadius={'2px'}
                            borderColor={'lightblue'}
                            onClick={() => setMyPosts(true)}
                        >
                            <Heading as={'h3'} size={'sm'} padding={'5px'}>My Tweets</Heading>
                        </ListItem>
                        <ListItem
                            marginX={'50px'}
                            marginTop={'35px'}
                            borderBottom={!myPosts ? '4px' : ''}
                            borderRadius={'2px'}
                            borderColor={'lightblue'}
                            onClick={() => setMyPosts(false)}
                        >
                            <Heading as={'h3'} size={'sm'} padding={'5px'}>Bookmarked Tweets</Heading>
                        </ListItem>
                    </UnorderedList>
                </Container>
            </Box>
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