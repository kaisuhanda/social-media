import { Box, UnorderedList } from "@chakra-ui/react"
import FollowsLayout from "./followsLayout"
import { useEffect, useState } from "react"
import axios from "axios"
import FollowListItem from "../components/customComponents/followingListItem"

function FollowersPage() {
    const [followers, setFollowers] = useState([])
    useEffect(() => {
        const token = localStorage.getItem('token');
        const url = "http://localhost:2066/accounts/keep-login";
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            const account = response.data.findAccount;
            setFollowers(account.followers)
            console.log('followers ', account.followers);
        }).catch((error) => {
            console.error(error);
        });
    }, [])

    return (
        <FollowsLayout>
            <UnorderedList>
                {followers.map((account, index) => (
                    <Box marginY={'20px'} marginRight={'20px'}>
                        <FollowListItem account={account} followingPage={false}/>
                    </Box>
                ))}
            </UnorderedList>
        </FollowsLayout>
    )
}

export default FollowersPage