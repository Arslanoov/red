import Link from 'next/link';

import MainLayout from '@/ui/layouts/main/MainLayout';

import styles from '@/ui/styles/pages/contact.module.scss';

export default function Contact() {
  return (
    <>
      <div className={styles.preview}>
        <Link href="/"><a className={styles.back}>Back to Home</a></Link>
        <h2 className={styles.title}>Contact</h2>
      </div>

      <div className="container">
        <div className={styles.wrapper}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <a
                href="https://www.linkedin.com/in/arslanoov/"
                target="_blank"
                rel="noreferrer"
              >
                Linked<span className={styles.colored}>in</span>
              </a>
            </li>
            <li className={styles.item}>
              <a
                href="https://github.com/Arslanoov"
                target="_blank"
                rel="noreferrer"
              >
                Git<span className={styles.colored}>Hub</span>
              </a>
            </li>
            <li className={styles.item}>
              <a
                href="https://career.habr.com/arslanoov"
                target="_blank"
                rel="noreferrer"
              >
                Habr<span className={styles.colored}>Career</span>
              </a>
            </li>
            <li className={styles.item}>
              <a href="mailto:rasularslanoov@gmail.com">
                rasularslanoov<span className={styles.colored}>@gmail.com</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

Contact.getLayout = (page) => <MainLayout title="Contact Me">{page}</MainLayout>;