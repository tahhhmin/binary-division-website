import React from "react";
import styles from "./Footer.module.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"

export default function Footer() {
    return (
        <footer className={styles.footer}>
        {/* Top Section: Company Info + Newsletter */}
        <div className={styles.top}>
            <div className={styles.companyInfo}>
                <h2>Binary Division</h2>
                <p>Sher-E-Bangla Nagar, Dhaka, Bangladesh</p>
                <p>Email: <a href="mailto:official@binarydivision.org">official@binarydivision.org</a></p>
            </div>

            <div className={styles.container}>
                <h4>Socials</h4>
                <Link href="#" aria-label="Instagram">Instagram</Link>
                <Link href="#" aria-label="Facebook">Facebook</Link>
                <Link href="#" aria-label="LinkedIn">LinkedIn</Link>
            </div>
         
            <div className={styles.container}>
                <h4>Company</h4>
                <a href="#">About Us</a>
                <a href="#">Careers</a>
                <a href="#">Blog</a>
            </div>
            <div className={styles.container}>
                <h4>Services</h4>
                <a href="#">Web Development</a>
                <a href="#">Mobile Apps</a>
                <a href="#">UI/UX Design</a>
            </div>
            <div className={styles.container}>
                <h4>Support</h4>
                <a href="#">Contact</a>
                <a href="#">FAQs</a>
                <a href="#">Help Center</a>
            </div>



            <div className={styles.newsletter}>
                <h3>Subscribe to our Newsletter</h3>
                <form className={styles.form}>
                    <Input type="email" placeholder="Email" />
                    <Button variant="outline">Button</Button>
                </form>
            </div>
        </div>

        <div className={styles.border}></div>


        {/* Bottom Section: Copyright */}
        <div className={styles.bottom}>
            <p>&copy; 2025 Binary Division. All Rights Reserved.</p>
            <div className={styles.policy}>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms & Services</a>
            </div>
        </div>
        </footer>
    );
}
