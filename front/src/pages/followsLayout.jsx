import { useEffect } from "react";
import Layout from "./Layout";
import { Box, Container, Heading, ListItem, UnorderedList } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

function FollowsLayout(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;

    const handleFollowing = () => {
        console.log(currentPath);
        navigate('/profile/following');
    };

    const handleFollowers = () => {
        console.log(currentPath);
        navigate('/profile/followers');
    };

    return (
        <Layout>
            <Box
                bg={"black"}
                color={"white"}
                height={"70px"}
                borderBottom={"1px"}
                borderColor={"gray.700"}
            >
                <Container textAlign={"center"} height={"full"}>
                    <UnorderedList
                        height={"full"}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        listStyleType={"none"}
                    >
                        <ListItem
                            marginX={"70px"}
                            marginTop={"35px"}
                            borderBottom={currentPath.includes("/followers") ? "4px solid lightblue" : ""}
                            borderRadius={"2px"}
                            onClick={handleFollowers}
                        >
                            <Heading as={"h3"} size={"sm"} padding={"5px"}>
                                Followers
                            </Heading>
                        </ListItem>
                        <ListItem
                            marginX={"70px"}
                            marginTop={"35px"}
                            borderBottom={currentPath.includes("/following") ? "4px solid lightblue" : ""}
                            borderRadius={"2px"}
                            onClick={handleFollowing}
                        >
                            <Heading as={"h3"} size={"sm"} padding={"5px"}>
                                Following
                            </Heading>
                        </ListItem>
                    </UnorderedList>
                </Container>
            </Box>
            {props.children}
        </Layout>
    );
}

export default FollowsLayout;
