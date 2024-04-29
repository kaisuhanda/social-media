import { Box, Button, Flex, Heading, ListItem, UnorderedList } from "@chakra-ui/react";
import IconContainer from "./IconContainer";
import { RiAccountCircleFill } from "react-icons/ri";
import { useEffect } from "react";


function CommentBox({ comments }) {
    // useEffect(() => {
    //     console.log(comments);
    // }, [])
    return (
        <Box
            padding={'10px'}
        >
            <UnorderedList>
                {comments.map((commentObj, index) => (
                    <ListItem display={'flex'} justifyContent={"space-between"} width={'100%'} key={index}>
                        <Flex>
                            <IconContainer>
                                {<RiAccountCircleFill size={30} />}
                            </IconContainer>
                            <Box>
                                <Box>
                                    <Heading as={'h2'} size={'sm'}>{commentObj.commenter.name}</Heading>
                                    <Heading as={'h2'} size={'xs'} color={"gray"}>@{commentObj.commenter.username}</Heading>
                                </Box>
                                <Box>
                                    {commentObj.comment}
                                </Box>
                            </Box>
                        </Flex>
                    </ListItem>
                ))}
            </UnorderedList>
        </Box>
    )
}

export default CommentBox;
