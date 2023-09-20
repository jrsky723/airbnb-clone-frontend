import {
  Box,
  Grid,
  Heading,
  Image,
  VStack,
  Text,
  HStack,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

export default function Home() {
  return (
    <Grid
      mt={10}
      px={10}
      columnGap={4}
      rowGap={8}
      templateColumns={"repeat(5, 1fr)"}
    >
      <VStack alignItems={"flex-start"}>
        <Box overflow={"hidden"} mb={3} rounded="3xl">
          <Image
            h="280"
            src="https://a0.muscache.com/im/pictures/miso/Hosting-13903824/original/82d996fb-d7c4-46a8-a713-febd281cd69f.jpeg?im_w=320"
          />
        </Box>
        <Box>
          <Grid gap={2} templateColumns={"6fr 1fr"}>
            <Text as="b" noOfLines={1} fontSize="md">
              Torino, Piemonte, Italy
            </Text>
            <HStack spacing={1}>
              <FaStar size={15} />
              <Text>5.0</Text>
            </HStack>
          </Grid>
          <Text fontSize={"sm"} color="gray.600">
            Seoul, S. Korea
          </Text>
        </Box>
        <Text fontSize={"sm"} color="gray.600">
          <Text as="b">$72</Text> / night
        </Text>
      </VStack>
    </Grid>
  );
}
