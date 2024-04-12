import { Box } from "@chakra-ui/react"

function IconContainer(props) {
    return (
        <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={'center'}
            marginRight={'10px'}
        >
            {props.children}
        </Box>
    )
}

export default IconContainer