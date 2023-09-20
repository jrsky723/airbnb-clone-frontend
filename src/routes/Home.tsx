import { Grid } from "@chakra-ui/react";
import Room from "../components/Room";

export default function Home() {
  return (
    <Grid
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
      columnGap={4}
      rowGap={8}
      templateColumns={{
        sm: "1fr",
        md: "1fr 1fr",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
        "2xl": "repeat(5, 1fr)",
      }}
    >
      {[
        1, 2, 3, 4, 56, 7, 7, 7, 7, 7, 7, 7, 1, 32, 2, 4, 3, 4, 1, 32, 4, 3, 2,
        5,
      ].map((index) => (
        <Room key={index} />
      ))}
    </Grid>
  );
}
