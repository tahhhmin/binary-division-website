import React from 'react'
import styles from './Footer.module.css'
import Image from 'next/image'
import Link from 'next/link'

import LogoLight from '@/public/bd-typo-logo-b1.svg'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.logoContainer}>
                 <Image
                    className={styles.logo}
                    src={LogoLight}
                    width={500}
                    height={500}
                    alt="Logo"
                />
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.infoWrapper}>
                    <div className={styles.infoLists}>
                        <h4>Solutions</h4>
                        <ul>
                            <li><p>Fusion Engine</p></li>
                            <li><p>Omicron Engine</p></li>
                        </ul>
                    </div>

                    <div className={styles.infoLists}>
                        <h4>Solutions</h4>
                        <ul>
                            <li><p>Fusion Engine</p></li>
                            <li><p>Omicron Engine</p></li>
                        </ul>
                    </div>

                    <div className={styles.infoLists}>
                        <h4>Solutions</h4>
                        <ul>
                            <li><p>Fusion Engine</p></li>
                            <li><p>Omicron Engine</p></li>
                        </ul>
                    </div>

                    <div className={styles.infoLists}>
                        <h4>Solutions</h4>
                        <ul>
                            <li><p>Fusion Engine</p></li>
                            <li><p>Omicron Engine</p></li>
                        </ul>
                    </div>
                </div>
                <div className={styles.infoContainerBottom}>
                    <div>
                        <p>info@binarydivision.com</p>
                        <p>+880 13 1234 1234</p>
                    </div>
                    <div>
                        <p>Cookie Preferences</p>
                    </div>
                    <div>
                        <p>Copyright &copy; 2025</p>
                        <p>Binary Divisio, Inc.</p>
                        <p>All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}