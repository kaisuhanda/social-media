import LeftBar from "../components/leftBar";
import RightBar from "../components/rightBar";
import { Flex } from "@chakra-ui/react";

function Layout(props) {
    return (
        <Flex>
            <LeftBar />
            {props.children}
            <RightBar />
        </Flex>
    )
}

export default Layout;