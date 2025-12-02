import React from 'react'
import styles from './page.module.css'
import { Button } from '@/components/ui/button'

import { ChevronLeft } from 'lucide-react'

export default function page() {
    return (
        <main className={styles.main}>
            <div className={styles.imageContainer}>

            </div>
            <div className={styles.formContainer}>
                <div className={styles.formContainerHeader}>
                    <Button variant="outline" size="icon">
                        <ChevronLeft />
                    </Button>
                </div>
                <div className={styles.formWrapper}>
                    <h3>Create an account</h3>
                    <p className='muted-text'>Enter your email below to create your account</p>
                    <form className={styles.form} action="">
                        <Button variant="outline">
                            Google
                        </Button>

                        <Button variant="outline">
                            GitHub
                        </Button>
                    </form>
                    <p className='muted-text'>
                        By clicking continue, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>
            </div>
        </main>
    )
}