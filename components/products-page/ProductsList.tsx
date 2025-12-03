import React from 'react'
import styles from './ProductsList.module.css'

export default function ProductsList() {
    return (
        <div className={styles.container}>
            <div className={styles.productsCard}>
                <h3>Store</h3>
                <p>Shop our catalog</p>
            </div>
            <div className={styles.productsCard}>
                <h3>Rover</h3>
                <p>All-terrain exploration</p>
            </div>
            <div className={styles.productsCard}>
                <h3>Autonomous Drone</h3>
                <p>Aerial surveillance</p>
            </div>
            <div className={styles.productsCard}>
                <h3>Robotic Arm</h3>
                <p>Precision manipulation</p>
            </div>
            <div className={styles.productsCard}>
                <h3>Submarine</h3>
                <p>Deep-sea operations</p>
            </div>
            <div className={styles.productsCard}>
                <h3>Inspection Bot</h3>
                <p>Hazard assessment</p>
            </div>
        </div>
    )
}
