import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  InputGroup,
  InputLeftAddon,
  Select,
  Skeleton,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import "../calendar.css";
import { FaEdit, FaStar, FaUserFriends } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  checkBooking,
  getRoom,
  getRoomReviews,
  IRoomBookingError,
  IRoomBookingSuccess,
  IRoomBookingVariables,
  roomBooking,
} from "../api";
import { IReview, IRoomDetail } from "../types";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { formatDate } from "../lib/utils";

export default function RoomDetail() {
  const { register, handleSubmit } = useForm<IRoomBookingVariables>();
  const { roomPk } = useParams();
  const { isLoading, data } = useQuery<IRoomDetail>([`rooms`, roomPk], getRoom);
  const { data: reviewsData } = useQuery<IReview[]>(
    [`rooms`, roomPk, `reviews`],
    getRoomReviews
  );

  const [dates, setDates] = useState<Date[]>();
  const handleDateChange = (value: any) => {
    setDates(value);
  };
  const { data: checkBookingData, isLoading: isCheckingBooking } = useQuery(
    ["check", roomPk, dates],
    checkBooking,
    {
      cacheTime: 0,
      enabled: dates !== undefined,
    }
  );
  const navigate = useNavigate();
  const onEditClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(`/rooms/${data?.id}/edit`);
  };
  const toast = useToast();
  const roomBookingMutation = useMutation<
    IRoomBookingSuccess,
    IRoomBookingError,
    IRoomBookingVariables
  >(roomBooking, {
    onSuccess: (data) => {
      toast({
        title: "Booking complete!",
        description: `From: ${data.check_in} To: ${data.check_out} Booking Completed`,
        status: "success",
        position: "bottom-right",
      });
    },
  });
  const doBooking = (data: IRoomBookingVariables) => {
    if (dates && roomPk) {
      const [firstDate, secondDate] = dates;
      const checkIn = formatDate(firstDate);
      const checkOut = formatDate(secondDate);
      data.check_in = checkIn;
      data.check_out = checkOut;
      data.roomPk = roomPk;
      roomBookingMutation.mutate(data);
    }
  };
  return (
    <Box
      pb={40}
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
    >
      <Helmet>
        <title>{data ? data.name : "Loading..."}</title>
      </Helmet>
      <Skeleton height={"43px"} isLoaded={!isLoading}>
        <HStack>
          <Heading>{data?.name}</Heading>
          <Button variant={"unstyled"} onClick={onEditClick}>
            {data?.is_owner ? <FaEdit size={25} /> : null}
          </Button>
        </HStack>
      </Skeleton>
      <Grid
        mt={8}
        rounded="xl"
        overflow={"hidden"}
        gap={2}
        height="60vh"
        templateRows={"1fr 1fr"}
        templateColumns={"repeat(4, 1fr)"}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <GridItem
            colSpan={index === 0 ? 2 : 1}
            rowSpan={index === 0 ? 2 : 1}
            overflow={"hidden"}
            key={index}
          >
            <Skeleton isLoaded={!isLoading} h="100%" w="100%">
              {data?.photos && data.photos.length > 4 ? (
                <Image
                  objectFit={"cover"}
                  w="100%"
                  h="100%"
                  src={data?.photos[index].file}
                />
              ) : null}
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <Grid gap={20} templateColumns={"2fr 1fr"}>
        <Box>
          <HStack justifyContent={"space-between"} mt={10}>
            <VStack alignItems={"flex-start"}>
              <Skeleton isLoaded={!isLoading} height={"30px"}>
                <Heading fontSize={"2xl"}>
                  House hosted by {data?.owner.name}
                </Heading>
              </Skeleton>
              <Skeleton isLoaded={!isLoading} height={"30px"}>
                <HStack justifyContent={"flex-start"} w="100%" mt={5}>
                  <Text>
                    {data?.toilets} toliet{data?.toilets === 1 ? "" : "s"}
                  </Text>
                  <Text>∙</Text>
                  <Text>
                    {data?.rooms} room{data?.rooms === 1 ? "" : "s"}
                  </Text>
                </HStack>
              </Skeleton>
            </VStack>
            <Avatar
              name={data?.owner.name}
              size={"xl"}
              src={data?.owner.avatar}
            />
          </HStack>
          <Box mt={10}>
            <Heading mb={5} fontSize={"2xl"}>
              <HStack>
                <FaStar /> <Text>{data?.rating}</Text>
                <Text>∙</Text>
                <Text>
                  {reviewsData?.length} review
                  {reviewsData?.length === 1 ? "" : "s"}
                </Text>
              </HStack>
            </Heading>
            <Container mt={16} maxW="container.lg" marginX="none">
              <Grid gap={10} templateColumns={"1fr 1fr"}>
                {reviewsData?.map((review, index) => (
                  <VStack alignItems={"flex-start"} key={index}>
                    <HStack>
                      <Avatar
                        name={review.user.name}
                        src={review.user.avatar}
                        size="md"
                      />
                      <VStack spacing={0} alignItems={"flex-start"}>
                        <Heading fontSize={"md"}>{review.user.name}</Heading>
                        <HStack spacing={1}>
                          <FaStar size="12px" />
                          <Text>{review.rating}</Text>
                        </HStack>
                      </VStack>
                    </HStack>
                    <Text>{review.payload}</Text>
                  </VStack>
                ))}
              </Grid>
            </Container>
          </Box>
        </Box>
        <Box pt={10}>
          <Calendar
            onChange={handleDateChange}
            prev2Label={null}
            next2Label={null}
            minDetail="month"
            minDate={new Date()}
            maxDate={new Date(Date.now() + 60 * 60 * 24 * 7 * 4 * 6 * 1000)}
            selectRange
          />

          <Grid
            templateColumns={"1fr"}
            as={"form"}
            onSubmit={handleSubmit(doBooking)}
          >
            <HStack mt={5} mb={2}>
              <Text>Guests</Text>
              <InputGroup>
                <InputLeftAddon children={<FaUserFriends />} />
                <Select
                  {...register("guests", { required: true })}
                  defaultValue={1}
                  w={"55%"}
                >
                  {[1, 2, 3, 4, 5].map((guest) => (
                    <option key={guest} value={guest}>
                      {guest}
                    </option>
                  ))}
                </Select>
              </InputGroup>
            </HStack>
            <Button
              type={"submit"}
              isDisabled={!checkBookingData?.ok}
              isLoading={isCheckingBooking && dates !== undefined}
              w={"70%"}
              colorScheme={"red"}
            >
              Make Booking
            </Button>
            {!isCheckingBooking && !checkBookingData?.ok ? (
              <Text color="red.500">Can't book on those dates, sorry.</Text>
            ) : null}
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
}
