import React from "react"
import styles from "./page.module.css"
import AdminSidebar from "@/components/admin-page/AdminSidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider>
      <main className={styles.main}>
        <AdminSidebar />
      </main>
    </SidebarProvider>
  )
}
