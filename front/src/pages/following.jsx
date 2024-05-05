import { Box, Heading, UnorderedList } from "@chakra-ui/react"
import FollowsLayout from "./followsLayout"
import { useEffect, useState } from "react"
import axios from "axios"
import FollowingListItem from "../components/customComponents/followingListItem"
import FollowSuggestions from "../components/followSuggestions"
function FollowingsPage() {
    const [myFollowings, setMyFollowings] = useState([])
    useEffect(() => {
        const token = localStorage.getItem('token')
        const url = "http://localhost:2066/accounts/my-followings"
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            console.log("response my followings : ", response.data.follows);
            setMyFollowings(response.data.follows)
        }).catch(error => {
            console.log(error);
        })
    }, [])

    return (
        <FollowsLayout>
            {myFollowings.length > 0 ? (
                <UnorderedList>
                    {myFollowings.map(account => (
                        <Box marginY={'20px'} marginRight={'20px'}>
                            <FollowingListItem
                                account={account}
                                followingPage={true}
                            />
                        </Box>
                    ))}
                </UnorderedList>
            ) : (
                <Box>
                    <Heading>You do not follow anyone :/</Heading>
                    <FollowSuggestions />
                </Box>
            )}
        </FollowsLayout>
    )
}

export default FollowingsPage