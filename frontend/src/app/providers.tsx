"use client";

import { AuthProvider } from "@/contexts/authContext";
import { ModalContextProvider } from "@/contexts/modalContext";
import React from "react";
import { CookiesProvider } from "react-cookie";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/commons/ScrollToTop";
import { ToastContainer } from "react-toastify";
import EmailVerifyModal from "@/components/commons/EmailVerifyModal";
import CancelSubModal from "@/components/commons/CancelSubVerifyModal";
import Footer from "@/components/Footer2";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
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
  );
}
