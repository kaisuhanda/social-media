import { Box, Heading, ListItem, UnorderedList, } from "@chakra-ui/react";
import AccountListItem from "./customComponents/accountListItem";
import { useEffect } from "react";

function FollowSuggestions({ accounts, currentUserId }) {
    useEffect(() => {
        console.log('test fol', accounts);
    })
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