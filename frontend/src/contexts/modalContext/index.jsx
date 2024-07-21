import { createContext, useContext, useEffect, useState } from "react";
import { apiHost } from "../../utils";
import { auth } from "../../firebase/firebase";

const context = createContext();

export function ModalContextProvider({ children }) {
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [cancelSubModalOpen, setCancelSubModalOpen] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState(null);

  function toggleEmailModal() {
    setEmailModalOpen(!emailModalOpen);
  }

  function toggleCancelSubModal() {
    setCancelSubModalOpen(!cancelSubModalOpen);
  }

  async function fetchData() {
    await fetch(`${apiHost}/api/subscription/data/${auth.currentUser.uid}`)
      .then(async (response) => {
        if (response.ok) {
          const result = await response.json();
          setSubscriptionData(result.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <context.Provider
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
    </context.Provider>
  );
}

export const ModalContext = () => {
  return useContext(context);
};
