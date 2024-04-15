import { Box, ListItem, UnorderedList, } from "@chakra-ui/react";
import TweetBox from "./customComponents/tweetBox";

function TweetsList({ tweets, getUser, updateComments }) {
    return (
        <Box overflowY={"auto"} >
            <UnorderedList margin={0} maxHeight={'580px'}>
                {tweets.map((tweet, index) => (
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

export default TweetsList;