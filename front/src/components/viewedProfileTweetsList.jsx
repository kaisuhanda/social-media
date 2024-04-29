import { Box, ListItem, UnorderedList } from "@chakra-ui/react"
import TweetBox from "./customComponents/tweetBox"

function ViewedProfileTweetsList({ viewedAccount, viewedAccountTweets }) {
    const getUser = () => {
        return {
            username: viewedAccount.username,
            name: viewedAccount.name
        }
    }

    const updateComments = (newComment) => {
        setComments([newComment, ...comments])
    }
    return (
        <Box overflowY={"auto"} >
            <UnorderedList margin={0} maxHeight={'580px'}>
                {viewedAccountTweets.map((tweet, index) => (
                    <ListItem
                        key={index}
                        listStyleType={"none"}
                    >
                        <TweetBox tweet={tweet} getUser={getUser} updateComments={updateComments} />
                    </ListItem>
                ))}
            </UnorderedList>
        </Box>
    )
}

export default ViewedProfileTweetsList