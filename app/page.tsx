"use client";

import "./globals.css";
import React, { useState } from "react";
import { Formik, Field } from "formik";
import { Box, Button, Flex, FormControl, FormLabel, Input, VStack, Spinner, Heading, Text, useColorModeValue, FormErrorMessage } from "@chakra-ui/react";

export default function Home() {
  const [gratitude, setGratitude] = useState("");
  const [gratitudeLoading, setGratitudeLoading] = useState(false);
  const [gratitudeLoadingError, setGratitudeLoadingError] = useState(false);

  const initialValues = {
    temaDelPoema: "",
  };

  async function repeat(prompt: string) {
    setGratitude("");
    setGratitudeLoadingError(false);
    setGratitudeLoading(true);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({prompt}),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGratitude((prev) => prev + chunkValue);
    }

    setGratitudeLoading(false);
  }

  async function handleSubmit(
    temaDelPoema: string,
  ) {
    const prompt = `Crea un hermoso poema con 3 estrofas sobre este tema: ${temaDelPoema}. Devuelve solo el poema, no pongas cosas como "Estrofa 1:" por ejemplo.`;
    console.log("prompt: " + prompt)


    try {
      repeat(prompt);
    } catch (error) {
      console.error(error);
      setGratitudeLoadingError(true);
    } finally {
      setGratitudeLoading(false);
    }
                  
  }

  return (
    <main>
      <Flex
        bg={useColorModeValue("gray.50", "gray.700")}
        color={useColorModeValue("gray.700", "gray.200")}
        align="center"
        justify="center"
        alignItems="flex-start"
        h="83vh"
      >
        <VStack spacing={4} align="center" textAlign={"center"}>
          <Box p={{ base: 2, md: 6 }}>
            <Heading
              fontWeight={700}
              fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
              lineHeight={"110%"}
            >
                Crea poesía úncia con <br />
              <Text as={"span"} color={"green.400"}>
                inspiración
              </Text>
              {" y con "}
              <Text as={"span"} color={"orange.400"}>
                un click
              </Text>
            </Heading>
          </Box>

          <Box p={6} rounded="md" w={80} bg="white" color="black">
            <Formik
              initialValues={initialValues}
              onSubmit={(values, { resetForm }) => {
                handleSubmit(
                  values["temaDelPoema"],
                );

                resetForm();
              }}
              // validationSchema={validationSchema}
            >
              {({ handleSubmit, values, errors }) => (
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4} align="flex-start">
                  <>
                        <FormControl isRequired>
                          <FormLabel htmlFor="temaDelPoema">
                            Sobre qué será tu poema?
                          </FormLabel>
                          <Field
                            as={Input}
                            id="temaDelPoema"
                            name="temaDelPoema"
                            type="name"
                            variant="filled"
                            bg="gray.200"
                          />
                          <FormErrorMessage>
                            {errors.temaDelPoema}
                          </FormErrorMessage>
                        </FormControl>

                      </>

                    <Button type="submit" colorScheme="green" width="full">
                      Generar poema
                    </Button>
                  </VStack>
                </form>
              )}
            </Formik>
            {gratitudeLoading && (
              <Box py={4}>
                <Spinner />
              </Box>
            )}
            {gratitudeLoadingError && "Algo salió mal. Por favor intenta nuevamente."}
          </Box>
          {gratitude && (
            <Box bg="white" p={6} rounded="md" maxW={600}>
              <Text fontWeight={700} color={"green.400"} className="poem-text">
                {gratitude}
              </Text>
            </Box>
          )}
        </VStack>
      </Flex>
    </main>
  );
}
