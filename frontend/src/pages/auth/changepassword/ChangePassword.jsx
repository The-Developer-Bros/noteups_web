import { Grid, Heading, Stack, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { InputControl, SubmitButton } from "formik-chakra-ui";
import React from "react";
import { useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../store/api/authApi";

const ChangePassword = () => {
  const { token } = useParams();
  const toast = useToast();
  console.log(token);

  const [resetPassword, { data, isError, isLoading, error, isSuccess }] =
    useResetPasswordMutation();
  if (isError) {
    toast({
      title: (error).data.message,
      status: "error",
      duration: 5000,
    });
  }
  console.log(data);
  if (isSuccess) {
    toast({
      title: "Password Reset Successfully",
      status: "success",
      duration: 5000,
    });
  }
  return (
    <Formik
      initialValues={{ password: "" }}
      onSubmit={(values) => {
        console.log("values", values);
        if (token) resetPassword({ ...values, token });
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
              Change Password
            </Heading>

            <InputControl
              name="password"
              label="Password"
              inputProps={{
                placeholder: "Enter your password",
                type: "password",
                size: "lg",
                variant: "outline",
                rounded: "md",
                width: "100%",
              }}
            />

            <SubmitButton isLoading={isLoading} type="submit" size="lg">
              Change Password
            </SubmitButton>
          </Stack>
        </Grid>
      </Form>
    </Formik>
  );
};

export default ChangePassword;
