import { Grid, Heading, Spinner, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSendMailForVerificationMutation } from "../../store/api/authApi";

const SendEmail = () => {
  const toast = useToast();
  const { state } = useLocation();

  const [sendMail, { data, isLoading, error, isError }] =
    useSendMailForVerificationMutation();

  if (isError) {
    toast({
      title: error.data.message,
      description: "",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }
  console.log("data", data);

  useEffect(() => {
    try {
      sendMail({ email: state.email });
    } catch (error) {
      toast({
        title: error.message,
        description: "",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [sendMail, toast, state]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Grid placeItems="center" h="100vh">
          <Heading
            fontSize="lg"
            fontWeight="semibold"
            textAlign="center"
            color="teal"
          >
            Email Sent Successfully
          </Heading>
        </Grid>
      )}
    </>
  );
};

export default SendEmail;
