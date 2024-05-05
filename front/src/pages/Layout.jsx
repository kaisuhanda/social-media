import LeftBar from "../components/leftBar";
import RightBar from "../components/rightBar";
import { Container, Flex } from "@chakra-ui/react";
function Layout(props) {
    return (
        <Flex>
            <LeftBar />
            <Container
                bg={"black"}
                color={"white"}
                p={0} m={0}
                maxW={'3xl'}
            >
                {props.children}
            </Container>
            <RightBar accounts={props.accounts} />
        </Flex>
    )
}

export default Layout;