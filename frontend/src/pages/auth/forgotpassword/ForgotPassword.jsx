import { Grid, Heading, Stack, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { InputControl, SubmitButton } from "formik-chakra-ui";
import React from "react";
import { useSendMailForgotPasswordMutation } from "../../../redux/store/api/authApi";

const ForgotPassword = () => {
  const [sendMail, { data, isLoading, error, isError }] =
    useSendMailForgotPasswordMutation();

  const toast = useToast();
  if (isError) {
    toast({
      title: (error).data.message,
      description: "",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }

  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={(values) => {
        console.log("values", values);
        sendMail({ ...values });
      }}
    >
      <Form>
        <Grid h="100vh" placeItems="center">
          <Stack p={4} boxShadow="xl" borderRadius="md">
            <Heading
              fontSize="lg"
              fontWeight="semibold"
              textAlign="center"
              color="teal"
            >
              Forgot Password
            </Heading>
            <InputControl
              name="email"
              label="Email"
              inputProps={{
                placeholder: "Enter your email",
                type: "email",
                size: "lg",
                variant: "outline",
                rounded: "md",
                width: "100%",
              }}
            />

            <SubmitButton isLoading={isLoading} type="submit" size="lg">
              Send Mail for Reset Password
            </SubmitButton>
          </Stack>
        </Grid>
      </Form>
    </Formik>
  );
};

export default ForgotPassword;
