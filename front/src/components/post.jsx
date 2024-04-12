import { Flex, Textarea, Box, UnorderedList, ListItem, Button } from "@chakra-ui/react";
import { RiAccountCircleFill } from "react-icons/ri";
import { MdEmojiEmotions } from "react-icons/md";
import { FaImage } from "react-icons/fa";
import { TiAttachment } from "react-icons/ti";
import { MdOutlineGifBox } from "react-icons/md";
import { useState } from "react";
import axios from "axios";

function Post({ updateTweets }) {
    const [tweet, setTweet] = useState('')
    const handlePost = () => {
        try {
            const url = 'http://localhost:2066/tweets/tweet'
            const response = axios.post(url,
                {
                    tweet: tweet
                }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(response => {
                console.log(response.data);
                updateTweets(response.data.tweet);
                setTweet("");
            }).catch(error => {
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Flex
            height={'150px'}
            borderBottom={'1px'}
            borderColor={"gray"}
        >
            <Box
                height={'100%'}
                width={'50px'}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <RiAccountCircleFill size={40} />
            </Box>
            <Box p={'20px'} width={'350px'}>
                <Textarea
                    placeholder="What's happening?"
                    border={"none"}
                    value={tweet}
                    onChange={(e) => setTweet(e.target.value)}
                />
                <UnorderedList display={"flex"} listStyleType={"none"} paddingY={'10px'} color={"twitter"}>
                    <ListItem marginRight={'10px'}><FaImage size={25} /></ListItem>
                    <ListItem marginRight={'10px'}><MdOutlineGifBox size={25} /></ListItem>
                    <ListItem marginRight={'10px'}><TiAttachment size={25} /></ListItem>
                    <ListItem marginRight={'10px'}><MdEmojiEmotions size={25} /></ListItem>
                </UnorderedList>
            </Box>
            <Box
                marginLeft={"auto"}
                height={'100%'}
                width={'150px'}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"flex-end"}
            >
                <Box
                    height={'50%'}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    <Button
                        colorScheme="twitter"
                        size={'md'}
                        width={'100px'}
                        borderRadius={'40px'}
                        onClick={handlePost}
                    >
                        Post
                    </Button>
                </Box>
            </Box>
        </Flex>
    )
}

export default Post;

// {FaImage}
// {MdGif}
// {FaFile}
// {MdEmojiEmotions}
