import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  CompleteJourney,
  FinalCta,
  Hero,
  HowItWorks,
  PersonalizedTravel,
  SmartFeatures,
  WhatIfMode,
  WhyTripora,
} from '../components/home'

export function HomePage() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }
    const target = document.querySelector(location.hash)
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [location.hash])

  return (
    <>
      <Hero />
      <WhyTripora />
      <HowItWorks />
      <PersonalizedTravel />
      <SmartFeatures />
      <WhatIfMode />
      <CompleteJourney />
      <FinalCta />
    </>
  )
}
