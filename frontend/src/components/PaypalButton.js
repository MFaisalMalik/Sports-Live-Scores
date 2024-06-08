import React from 'react';
import axios from 'axios';

export default function PayPalButton({subscriptionType}) {
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`http://localhost:5001/api/subscription/subscribe/${subscriptionType}`);

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

    return (
        <button
            id="custom-paypal-button"
            onClick={handleSubmit}
            className="bg-[#FEC33A] text-[#002F86] px-7 py-3 rounded-full font-medium focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500 flex items-center"
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
};