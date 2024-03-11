'use client'

import styles from "./page.module.css";
import Image from 'next/image';
import Link from "next/link";
import {ProfileClient} from "./ui/Profil";
import { useEffect, useState } from "react";

 export default function Home() {

  const [userData, setUserData] = useState({});
  
  
  const updateUserData = (data) => {
    setUserData(data);
  };


  
  return (
    <>
         <header>
            <nav className={styles.navigation}>
                <a className={styles.logo}>Uride</a>
                <div className={styles.navigationbox}>
                  <ul className={styles.navigationLink}>
                      <li><a href="#home">Home</a></li>
                      <li><a href="#about">About</a></li>
                      <li><a href="#services">Services</a></li>
                      <li><a href="#contact">Contact</a></li>
                      <li><Link href="/account"><Image src={userData.picture} alt="profile_picture" width={30} height={30}/></Link></li>
                  </ul>
                </div>
                
            </nav>
        </header>
        <main>
          <section id={styles.heroSection}>
            <div className={styles.heroTagLine}>
              
              <ProfileClient  onUpdateUserData={updateUserData}/>
              <h1><span>N</span>avigate Your World: <span>W</span>herever You Go, Get There with Ease</h1>
              <div className={styles.buttons}>
                {userData.name? <a href="/booking" className={styles.signIn}>Book</a> : <a className={styles.signIn} href="/api/auth/login" >Sign In</a>}
                {userData.name &&  <a className={styles.signOut} href="/api/auth/logout" >Sign Out</a>}
              
              </div>
            </div>
            <div className={styles.image}>
              <Image src="/img/mainimage.webp" alt="scooter-Rider" width={800} height={600}/>
            </div>
           
          </section> 
          
        </main>
    
    </>
      
  );
}






























{/* <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.js</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div> */}