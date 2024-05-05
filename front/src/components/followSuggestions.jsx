import { Box, Heading, ListItem, UnorderedList, } from "@chakra-ui/react";
import AccountListItem from "./customComponents/accountListItem";
import { useEffect, useState } from "react";
import axios from "axios";

function FollowSuggestions() {
    const [currentUserId, setCurrentUserId] = useState(0)
    const [accounts, setAccounts] = useState([])

    useEffect(() => {
        console.log('test fol', accounts);
    })

    useEffect(() => {
        const url = 'http://localhost:2066/accounts'
        axios.get(url).then(response => {
            setAccounts(response.data.accounts)
        })
    }, [])

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
        console.log("current ", currentUserId);
    }, [])

    return (
        <Box overflowY={"auto"} padding={'30px'}>
            <UnorderedList listStyleType={'none'} spacing={6}>
                <ListItem>
                    <Heading as={'h2'} size={'md'}>Who to follow</Heading>
                </ListItem>
                {accounts
                    .filter(account => account.id != currentUserId).map((account, index) => (
                        <AccountListItem
                            key={index}
                            account={account}
                            currentUserId={currentUserId}
                        />
                    ))}
            </UnorderedList>
        </Box>
    )
}

export default FollowSuggestions