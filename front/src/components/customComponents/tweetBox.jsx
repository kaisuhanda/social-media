import { Box, Flex, Heading, UnorderedList, ListItem, Textarea, Button } from "@chakra-ui/react";
import { RiAccountCircleFill } from "react-icons/ri";
import { FaBookmark, FaHeart, FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import IconContainer from "./IconContainer";
import CommentBox from "./commentBox";
import { useEffect, useState } from "react";
import axios from "axios";

function TweetBox({ tweet, getUser, updateComments }) {
    const [textAreaVisible, setTextAreaVisible] = useState(false);
    const [liked, setLiked] = useState(false)
    const [bookMarked, setBookMarked] = useState(false)
    const [comment, setComment] = useState('');
    const [currentUserId, setCurrentUserId] = useState(0)

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
    })

    const handleComment = (tweet_id) => {
        try {
            const url = `http://localhost:2066/tweets/comment/${tweet_id}`;
            axios.post(url, {
                comment: comment
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(response => {
                console.log(response.data);
                updateComments(response.data.comment);
                setComment('');
                setTextAreaVisible(false)
            }).catch(error => {
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleLike = (tweet_id) => {
        try {
            console.log(localStorage.getItem('token'));
            const url = `http://localhost:2066/tweets/like/${tweet_id}`
            axios.post(url, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(response => {
                console.log(response.data);
                setLiked(true)
            }).catch(error => {
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleUnlike = (tweet_id) => {
        try {
            const url = `http://localhost:2066/tweets/unlike/${tweet_id}`
            axios.post(url, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(response => {
                console.log(response.data);
                setLiked(false)
            }).catch(error => {
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const response = await axios.get("http://localhost:2066/tweets/likes");
                const likes = response.data.likes;
                const currentUserLike = likes.find(like => like.user_id === currentUserId && like.tweet_id === tweet.id);
                setLiked(currentUserLike !== undefined)
            } catch (error) {
                console.log(error);
            }
        };
        fetchLikes();
    }, [currentUserId, tweet.id]);

    return (
        <Box>
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
                        <Heading as={'h2'} size={'sm'}>{getUser(tweet.user_id).name}</Heading>
                        <Heading as={'h2'} size={'sm'} color={"gray"}>@{getUser(tweet.user_id).username}</Heading>
                    </Box>
                    {tweet.tweet}
                    <UnorderedList display={"flex"} listStyleType={"none"} paddingY={'10px'} color={"twitter"} margin={0}>
                        <ListItem
                            marginRight={'10px'}
                            onClick={() => !liked ? handleLike(tweet.id) : handleUnlike(tweet.id)}
                        >
                            <Flex>
                                {!liked ? <FaRegHeart size={20} /> : <FaHeart size={20} />}
                                {tweet.likes > 0 ? tweet.likes : ''}
                            </Flex>
                        </ListItem>
                        <ListItem
                            marginRight={'10px'}
                            onClick={() => setTextAreaVisible(!textAreaVisible)}
                        >
                            <FaRegComment size={20} />
                        </ListItem>
                        <ListItem
                            marginRight={'10px'}
                            onClick={() => setBookMarked(!bookMarked)}
                        >
                            {!bookMarked ? <FaRegBookmark size={20} /> : <FaBookmark size={20} />}
                        </ListItem>
                    </UnorderedList>
                    {textAreaVisible && (
                        <Box>
                            <Textarea
                                placeholder="comment?"
                                border={"none"}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <Button
                                colorScheme="twitter"
                                borderRadius={'20px'}
                                marginTop={'10px'}
                                onClick={() => handleComment(tweet.id)}
                            >
                                comment
                            </Button>
                        </Box>
                    )}
                </Box>
            </Flex>
            <Box margin={0}>
                {tweet?.comments?.length > 0 && (
                    <CommentBox comments={tweet.comments} />
                )}
            </Box>
        </Box>
    );
}

export default TweetBox;
