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
                        <p className='muted-text'>info@binarydivision.com</p>
                        <p className='muted-text'>+880 13 1234 1234</p>
                    </div>
                    <div>
                        <p className='muted-text'>Cookie Preferences</p>
                    </div>
                    <div>
                        <p className='muted-text'>Copyright &copy; 2025</p>
                        <p className='muted-text'>Binary Divisio, Inc.</p>
                        <p className='muted-text'>All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}