import { Box, Divider, HStack, Text, VStack, Button } from "@chakra-ui/react";
import { FaComment, FaGithub } from "react-icons/fa";

export default function SocialLogin() {
  const kakoParams = {
    client_id: "26dae3731df07117ed8cdd56751bc3cc",
    redirect_uri: "http://127.0.0.1:3000/social/kakao",
    response_type: "code",
  };
  const params = new URLSearchParams(kakoParams).toString();

  return (
    <Box mb={4}>
      <HStack my={8}>
        <Divider />
        <Text
          textTransform={"uppercase"}
          color={"gray.500"}
          fontSize="xs"
          as="b"
        >
          Or
        </Text>
        <Divider />
      </HStack>

      <VStack>
        <Button
          as="a"
          href="https://github.com/login/oauth/authorize?client_id=6323c9af1afeaa39f127&scope=read:user,user:email"
          w="100%"
          leftIcon={<FaGithub />}
        >
          Continue with Github
        </Button>
        <Button
          as="a"
          href={`https://kauth.kakao.com/oauth/authorize?${params}`}
          w="100%"
          leftIcon={<FaComment />}
          colorScheme={"yellow"}
        >
          Continue with Kakao
        </Button>
      </VStack>
    </Box>
  );
}
