"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { apiHost } from "../../utils";
import { auth } from "../../firebase/firebase";

const modalContext = createContext();

export function ModalContextProvider({ children }) {
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [cancelSubModalOpen, setCancelSubModalOpen] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState({});

  function toggleEmailModal() {
    setEmailModalOpen(!emailModalOpen);
  }

  function toggleCancelSubModal() {
    setCancelSubModalOpen(!cancelSubModalOpen);
  }

  async function fetchData() {
    await fetch(`${apiHost}/api/subscription/data/${auth?.currentUser?.uid}`)
      .then(async (response) => {
        if (response.ok) {
          const result = await response.json();
          setSubscriptionData(result.data);
        } else {
          setSubscriptionData(null)
        }
      })
      .catch((error) => {
        setSubscriptionData(null)
        console.log(error);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <modalContext.Provider
      value={{
        emailModalOpen,
        setEmailModalOpen,
        toggleEmailModal,
        cancelSubModalOpen,
        setCancelSubModalOpen,
        toggleCancelSubModal,
        subscriptionData,
        setSubscriptionData,
      }}
    >
      {children}
    </modalContext.Provider>
  );
}

export const useModalContext = () => {
  return useContext(modalContext);
};
