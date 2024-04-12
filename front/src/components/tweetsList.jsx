import { Box, ListItem, UnorderedList, } from "@chakra-ui/react";
import TweetBox from "./customComponents/tweetBox";

function TweetsList({ tweets, getUsername }) {
    return (
        <Box overflowY={"auto"} >
            <UnorderedList margin={0} maxHeight={'580px'}>
                {tweets.map((tweet, index) => (
                    <ListItem
                        key={index}
                        listStyleType={"none"}
                    >
                        <TweetBox tweet={tweet} getUsername={getUsername} />
                    </ListItem>
                ))}
            </UnorderedList>
        </Box>
    );
}

export default TweetsList;