import React from "react";
import axios from "axios";
import { auth } from "../firebase/firebase";
import { useNavigate, useResolvedPath } from "react-router-dom";
import { toast } from "react-toastify";
import { ModalContext } from "../contexts/modalContext";

export default function PayPalButton({
  subscriptionType,
  return_url,
  cancel_url,
}) {
  const navigate = useNavigate();
  const { pathname } = useResolvedPath();
  const {toggleModal} = ModalContext()


  const createSubscription = async (uid) => {
    const params = {
      uid,
      return_url,
      cancel_url,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/subscription/subscribe/${subscriptionType}`,
        { params }
      );

      if (response.status === 200 || response.status === 201) {
        const approvalUrl = response.data.approveLink;
        window.location.href = approvalUrl;
      } else {
        console.error(response.data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (user && user.emailVerified) {
      await createSubscription(user.uid);
    } else if (user && !user.emailVerified) {
      toast.warning("Please verify your email.");
      setTimeout(()=> {
        toggleModal()
      }, 1000)
    } else {
      toast.warning("Please Login first!");
      setTimeout(() => {
        navigate(`/sign-in?redirect=${pathname}`);
      }, 500);
    }
  };

  return (
    <button
      id="custom-paypal-button"
      onClick={handleSubmit}
      className="bg-[#FEC33A] text-[#002F86] px-7 py-3 w-full sm:w-auto rounded-full font-medium focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center sm:justify-normal"
    >
      <img
        src="\images\PayPal_Monogram_Full_Color_RGB.ico"
        alt="PayPal Logo"
        width="20"
        height="20"
      />
      <span className="mr-2 px-2 font-bold">Subscribe</span>
    </button>
  );
}
