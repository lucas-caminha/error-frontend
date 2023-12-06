'use client'
import styles from './page.module.css'
import DashBoard from './home/page';
import {NextUIProvider} from "@nextui-org/react";

export default function Home() {  
  return (
    <NextUIProvider>
      <main className={styles.main}>
        <div className={styles.description}>       
            <DashBoard/>
        </div>
      </main>
    </NextUIProvider>
  )
}
