import React from "react";
import axios from "axios";
import { auth } from "../firebase/firebase";
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify";
import { useModalContext } from "../contexts/modalContext";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { PayPalMonogram } from "@/assets/images";

export default function PayPalButton({
  subscriptionType,
  return_url,
  cancel_url,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const {toggleEmailModal} = useModalContext()


  const createSubscription = async (uid) => {
    const params = {
      uid,
      return_url,
      cancel_url,
    };

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/subscription/subscribe/${subscriptionType}`,
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
        toggleEmailModal()
      }, 1000)
    } else {
      toast.warning("Please Login first!");
      setTimeout(() => {
        router.push(`/login?redirect=${pathname}`);
      }, 500);
    }
  };

  return (
    <button
      id="custom-paypal-button"
      onClick={handleSubmit}
      className="bg-[#FEC33A] text-[#002F86] px-7 py-3 w-full sm:w-auto rounded-full font-medium focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center sm:justify-normal"
    >
      <Image
        src={PayPalMonogram}
        alt="PayPal Logo"
        width="20"
        height="20"
      />
      <span className="mr-2 px-2 font-bold">Subscribe</span>
    </button>
  );
}
