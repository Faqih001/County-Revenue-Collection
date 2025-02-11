"use client";

import { Footer } from "@/components/admin-panel/footer";
import { Sidebar } from "@/components/admin-panel/sidebar";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";

// Define the AdminPanelLayout component that will be rendered by the server and the client
export default function AdminPanelLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Get the sidebar object from the useSidebar hook
  const sidebar = useStore(useSidebar, (x) => x);

  // If the sidebar object is not loaded, return null
  if (!sidebar) return null;

  // Get the open state and settings from the sidebar object
  const { getOpenState, settings } = sidebar;
  return (
    <>
      <Sidebar />
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
          !settings.disabled && (!getOpenState() ? "lg:ml-[90px]" : "lg:ml-72")
        )}
      >
        {children}
      </main>
      <footer
        className={cn(
          "transition-[margin-left] ease-in-out duration-300",
          !settings.disabled && (!getOpenState() ? "lg:ml-[90px]" : "lg:ml-72")
        )}
      >
        <Footer />
      </footer>
    </>
  );
}
