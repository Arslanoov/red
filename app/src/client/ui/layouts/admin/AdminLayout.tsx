import React from 'react';
import Head from 'next/head';

import Header from '@/ui/components/header/Header.component';

import styles from './admin-layout.module.scss';

const AdminLayout: React.FC = ({ children }) => {
  return (
    <div>
      <Head>
        <title>arslanoov.red - Admin panel</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Red" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.layout}>
        <Header />

        <main>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;