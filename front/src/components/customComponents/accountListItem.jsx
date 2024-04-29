import { ListItem, Flex, Box, Button, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RiAccountCircleFill } from "react-icons/ri";
import IconContainer from "./IconContainer";
import axios from "axios";

function AccountListItem({ account, currentUserId }) {
    const [myFollowings, setMyFollowings] = useState([]);
    const [followed, setFollowed] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const url = "http://localhost:2066/accounts/my-followings";
        axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          setMyFollowings(response.data.follows);
          const isFollowed = response.data.follows.some(
            (following) => following.id === account.id // Correct condition
          );
          setFollowed(isFollowed);
        }).catch((error) => {
          console.error(error);
        });
      }, [account.id]); // Dependency on 'account.id'

    const handleFollow = (user_id) => {
        try {
            const url = `http://localhost:2066/accounts/follow/${user_id}`
            axios.post(url, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(response => {
                console.log(response.data);
                setFollowed(true)
            }).catch(error => {
                console.log(error);
            })
        } catch (error) {
            console.log("Handle follow error : ", error);
        }
    }

    const handleUnfollow = (user_id) => {
        try {
            const url = `http://localhost:2066/accounts/unfollow/${user_id}`
            axios.post(url, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(response => {
                console.log(response.data);
                setFollowed(false)
                console.log(user_id);
            }).catch(error => {
                console.log(error);
            })
        } catch (error) {
            console.log("Handle unfollow error : ", error);
        }
    }

    return (
        <ListItem display={"flex"} justifyContent={"space-between"} width={"100%"}>
            <Flex>
                <IconContainer>
                    <RiAccountCircleFill size={40} />
                </IconContainer>
                <Box>
                    <Heading as={"h2"} size={"md"}>
                        {account.name}
                    </Heading>
                    <Heading as={"h2"} size={"sm"} color={"gray"}>
                        @{account.username}
                    </Heading>
                </Box>
            </Flex>
            <Box>
                <Button
                    borderRadius={"20px"}
                    onClick={() => (followed ? handleUnfollow(account.id) : handleFollow(account.id))}
                >
                    {followed ? "Unfollow" : "Follow"}
                </Button>
            </Box>
        </ListItem>
    );
}

export default AccountListItem;
