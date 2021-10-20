import type { NextPage } from 'next';

import Head from 'next/head';

import TextBox from '../components/text-box/TextBox.component';
import Avatar from '../components/avatar/Avatar.component';
import Footer from '../components/footer/Footer.component';

import styles from '../styles/pages/home.module.scss';

import { textBoxTitle, textBoxContent } from '../dummy/text';
import PanelsList from '../components/panels/list/PanelsList';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>arslanoov.red</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={`container ${styles.container}`}>
          <div className={styles.box}>
            <TextBox title={textBoxTitle} content={textBoxContent} />
          </div>
          <div className={styles.avatar}>
            <Avatar />
            <PanelsList />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Home;
