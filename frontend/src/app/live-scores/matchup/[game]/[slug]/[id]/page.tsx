import MatchupPage from '@/components/matchup/MatchupPage'
import type { Metadata } from 'next';
import React from 'react'



export const metadata: Metadata = {
  title: "Single Match | Simplicity Sport Picks",
  description: "",
};

export default function Page() {
  return (
    <MatchupPage/>
  )
}
