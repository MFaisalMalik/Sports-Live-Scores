"use client"

import { AuthProvider } from "@/contexts/authContext";
import { ModalContextProvider } from "@/contexts/modalContext";
import React from "react";
import { CookiesProvider } from "react-cookie";
import Navbar from "./Navbar";
import ScrollToTop from "./commons/ScrollToTop";
import { ToastContainer } from "react-toastify";
import EmailVerifyModal from "./commons/EmailVerifyModal";
import CancelSubModal from "./commons/CancelSubVerifyModal";
import Footer from "./Footer2";

export default function MainLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <CookiesProvider>
        <AuthProvider>
          <ModalContextProvider>
            <Navbar />
            <ScrollToTop />
            <ToastContainer />
            <EmailVerifyModal />
            <CancelSubModal />
            {children}
            <Footer />
          </ModalContextProvider>
        </AuthProvider>
      </CookiesProvider>
    </>
  );
}
