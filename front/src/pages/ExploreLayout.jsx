import { Container, Flex } from "@chakra-ui/react"
import LeftBar from "../components/leftBar"
import RightBarNoSearch from "../components/rightBarNoSearch"

function ExploreLayout(props) {
    return (
        <Flex>
            <LeftBar />
            <Container
                bg={"black"}
                color={"white"}
                p={0} m={0}
                maxW={'3xl'}
                overflowY={'auto'}
            >
                {props.children}
            </Container>
            <RightBarNoSearch accounts={props.accounts} />
        </Flex>
    )
}

export default ExploreLayout