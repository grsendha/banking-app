import HeaderBox from '@/components/HeaderBox';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import React from 'react'

const Home = () => {
  const loggedIn = { firstName: 'Gyanaranjan', lastName: 'Sendha', email: "grsendha11@gmail.com" }
  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
            type="greeting"
            title="welcome"
            user={loggedIn?.firstName || "guest"}
            subtext="Access the account" />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1010} />

        </header>

      </div>
      <RightSidebar
        user={loggedIn}
        banks={[{ currentBalance: 272 }, { currentBalance: 22 }]}
        transactions={[]} />
    </section>
  )
}

export default Home;