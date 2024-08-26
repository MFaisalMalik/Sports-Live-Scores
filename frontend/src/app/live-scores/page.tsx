import LiveScoresPage from "@/components/livescores/LiveScoresPage";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Live scores | Simplicity Sport Picks",
  description: "",
};


export default function Page() {
  return <LiveScoresPage />;
}
