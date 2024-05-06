import React from 'react'

const RecentTransactions = ({ accounts,
  transactions = [],
  appwriteItemId,
  page = 1 }: RecentTransactionsProps) => {
  return (
    <section className='recent-trasnactions'>
      <header className='flex items-center justify-between'>
        <h2 className='recent-trasnactions-label'></h2>
      </header>
    </section>
  )
}

export default RecentTransactions