import { Box, Flex, Button, Text, useColorModeValue, Stack, useColorMode } from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Flex h={16} alignItems={"center"}>
        <Box width={{ base: "100%"}} textAlign="center">
          <Text
            fontWeight={650}
            lineHeight={1.2}
            fontSize={{ base: "lg", md: "3xl" }}
            textAlign={{ base: "left", md: "center" }}
          >
            📜 Generador de poesía
          </Text>
        </Box>

        <Flex alignItems={"center"}>
          <Stack direction={"row"} mr={{ base: 2, md: 4, lg: 8 }}>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
}
