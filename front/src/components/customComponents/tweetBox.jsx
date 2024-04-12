import { Box, Flex, Heading, UnorderedList, ListItem } from "@chakra-ui/react";
import IconContainer from "./IconContainer";
import { RiAccountCircleFill } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";

function TweetBox({ tweet, getUsername }) {
    return (
        <Flex
            padding={'7px'}
            minHeight={'100px'}
            borderTop={'1px'}
            borderColor={'gray'}
        >
            <Box>
                <IconContainer>
                    <RiAccountCircleFill size={35} />
                </IconContainer>
            </Box>
            <Box>
                <Box paddingBottom={'10px'}>
                    <Heading as={'h2'} size={'sm'}>Name</Heading>
                    <Heading as={'h2'} size={'sm'} color={"gray"}>@{getUsername(tweet.user_id)}</Heading>
                </Box>
                {tweet.tweet}
                <UnorderedList display={"flex"} listStyleType={"none"} paddingY={'10px'} color={"twitter"} margin={0}>
                    <ListItem marginRight={'10px'}><FaRegHeart size={20} /></ListItem>
                    <ListItem marginRight={'10px'}><FaRegComment size={20} /></ListItem>
                    <ListItem marginRight={'10px'}><FaRegBookmark size={20} /></ListItem>
                </UnorderedList>
            </Box>
        </Flex>
    );
}

export default TweetBox;