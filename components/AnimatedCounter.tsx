'use client'
import React from 'react'
import CountUp from 'react-countup'

const AnimatedCounter = ({ amount }: { amount: number }) => {
  return (
    <div className='w-full'>
      <CountUp end={amount}
        duration={2}
        decimal=','
        prefix='$'></CountUp>
    </div>
  )
}

export default AnimatedCounter