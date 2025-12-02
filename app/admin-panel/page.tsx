"use client";

import React, { useState } from "react";
import styles from "./page.module.css";

import AdminSidebar from "@/components/admin-page/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

import NewsControl from "@/components/admin-page/NewsControl";

export default function Page() {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <SidebarProvider>
      <main className={styles.main}>
        
        <AdminSidebar onSelect={setActiveSection} />

        <div className={styles.content}>
          {activeSection === "news" && <NewsControl />}
          
          {activeSection === "dashboard" && (
            <h2>Dashboard Content Here</h2>
          )}

          {activeSection === "projects" && (
            <h2>Projects Content Here</h2>
          )}

          {activeSection === "settings" && (
            <h2>Settings Content Here</h2>
          )}
        </div>

      </main>
    </SidebarProvider>
  );
}
