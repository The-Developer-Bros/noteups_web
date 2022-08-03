import { Grid, Heading, Spinner } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSendMailForVerificationMutation } from "../../../redux/store/api/authApi";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SendEmail = () => {
  const { state } = useLocation();

  const [sendMail, { data, isLoading, error, isError }] =
    useSendMailForVerificationMutation();

  if (isError) {
    toast.error(error.data.message);
  }

  useEffect(() => {
    try {
      sendMail({ email: state.email });
      toast.success("Email sent successfully");
      toast.info("Please check your email.Redirecting to login page");
      setTimeout(() => {
        window.location.href = "/signin";
      }, 5000);
    } catch (error) {
      toast.error(error.message);
    }
  }, [sendMail, state]);

  return (
    <>
      <ToastContainer />
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
