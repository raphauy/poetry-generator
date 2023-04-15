"use client";

import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "./NavBar";
import Footer from "./Footer";


export default function ClientLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <ChakraProvider>
        <NavBar/>
          {children}
        <Footer/>
      </ChakraProvider>
    </>
  );
}
