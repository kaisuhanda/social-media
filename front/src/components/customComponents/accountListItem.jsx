import { ListItem, Flex, Box, Button, Heading } from "@chakra-ui/react"
import { useState } from "react"
import { RiAccountCircleFill } from "react-icons/ri";
import IconContainer from './IconContainer';


function AccountListItem() {
    const [name, setName] = useState(null)
    const [username, setUsername] = useState(null)
    return (
        <ListItem display={'flex'} justifyContent={"space-between"} width={'100%'}>
            <Flex>
                <IconContainer>
                    {<RiAccountCircleFill size={40} />}
                </IconContainer>
                <Box>
                    <Heading as={'h2'} size={'md'}>Name</Heading>
                    <Heading as={'h2'} size={'sm'} color={"gray"}>@username</Heading>
                </Box>
            </Flex>
            <Box>
                <Button borderRadius={'20px'}>Follow</Button>
            </Box>
        </ListItem>
    )
}

export default AccountListItem