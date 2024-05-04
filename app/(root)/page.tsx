import HeaderBox from '@/components/HeaderBox';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';
import React from 'react'

const Home = async () => {

  const loggedIn = await getLoggedInUser();

  if (!loggedIn) {
    redirect('/sign-in');
  }
  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
            type="greeting"
            title="welcome"
            user={loggedIn?.name || "guest"}
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