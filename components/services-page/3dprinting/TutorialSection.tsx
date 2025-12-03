import React from 'react'
import styles from './TutorialSection.module.css'
import { Box, FileUp, PackageOpen, WalletCards } from 'lucide-react'

export default function TutorialSection() {
    return (
        <section className={styles.section}>
            <div className={styles.card}>
                <h4>Design Your 3D Model</h4>

                <Box size={48} className={styles.icon}/>

                <p>
                    You design your 3D 
                    part in any CAD 
                    software you want 
                    and generate the STL 
                    file. Or, you may 
                    just download a free 
                    STL models online.
                </p>
            </div>

            <div className={styles.card}>
                <h4>Upload Your Model</h4>

                <FileUp size={48} className={styles.icon}/>

                <p>
                    Now, upload your STL file on this page. 
                    You may require to login first. 
                    Click on the blue area below or 
                    drag & drop the file there.
                </p>
            </div>

            <div className={styles.card}>
                <h4>Receive Instant Quote</h4>

                <WalletCards size={48} className={styles.icon}/>

                <p>
                    Choose the material, color & 
                    quantity as per your requirements 
                    and receive quotation just in a 
                    few seconds. No wait, no delay 
                    or manual communication.
                </p>
            </div>

            <div className={styles.card}>
                <h4>Place Your Order</h4>

                <PackageOpen size={48} className={styles.icon}/>

                <p>
                    Now, place your order by finishing 
                    the checkout and let us take 
                    care of the printing and 
                    delivery of your 3D printed parts.
                </p>
            </div>
        </section>
    )
}