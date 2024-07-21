import { createContext, useContext, useState } from "react";

const context = createContext();

export function ModalContextProvider({ children }) {
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [cancelSubModalOpen, setCancelSubModalOpen] = useState(false);

  function toggleEmailModal() {
    setEmailModalOpen(!emailModalOpen);
  }

  function toggleCancelSubModal() {
    setCancelSubModalOpen(!cancelSubModalOpen);
  }
  return (
    <context.Provider value={{ emailModalOpen, setEmailModalOpen, toggleEmailModal, cancelSubModalOpen, setCancelSubModalOpen, toggleCancelSubModal }}>
      {children}
    </context.Provider>
  );
}

export const ModalContext = () => {
  return useContext(context);
};
