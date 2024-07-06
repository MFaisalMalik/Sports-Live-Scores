import { createContext, useContext, useState } from "react";

const context = createContext();

export function ModalContextProvider({ children }) {
  const [modalOpen, setModalOpen] = useState(false);

  function toggleModal() {
    setModalOpen(!modalOpen);
  }
  return (
    <context.Provider value={{ modalOpen, setModalOpen, toggleModal }}>
      {children}
    </context.Provider>
  );
}

export const ModalContext = () => {
  return useContext(context);
};
