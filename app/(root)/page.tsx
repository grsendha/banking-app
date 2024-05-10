import HeaderBox from '@/components/HeaderBox';
import RecentTransactions from '@/components/RecentTransactions';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { Suspense } from 'react'
import Loading from './loading';

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  if (loggedIn == null) {
    redirect('/sign-in');
  }
  // console.log("Logged In", loggedIn);
  const accounts = await getAccounts({ userId: loggedIn?.$id })
  if (!accounts) return;
  const accountData = accounts?.data
  const appwriteItemId = (id as string) || accountData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId });
  // console.log("Account", account);



  return (
    <Suspense fallback={<Loading />}>
      <section className='home'>
        <div className='home-content'>
          <header className='home-header'>
            <HeaderBox
              type="greeting"
              title="welcome"
              user={loggedIn?.firstName || "guest"}
              subtext="Access the account" />
            <TotalBalanceBox
              accounts={accountData}
              totalBanks={accounts?.totalBanks}
              totalCurrentBalance={accounts?.totalCurrentBalance} />

          </header>
          <RecentTransactions
            accounts={accountData}
            transactions={account?.transactions}
            appwriteItemId={appwriteItemId}
            page={currentPage} />
        </div>
        <RightSidebar
          user={loggedIn}
          banks={accountData?.slice(0, 2) || []}
          transactions={account?.transactions} />
      </section>
    </Suspense>
  )
}

export default Home;