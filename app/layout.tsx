import "@/styles/globals.css";
import type { Metadata } from "next";
import AEMSTopbar from "@/components/layout/AEMSTopbar";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import PageTransition from "@/components/layout/PageTransition";

export const metadata: Metadata = {
  title: "AEMS-System",
  description: "Antifragile Energy Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        {/* Theme + globale Klassen auf <body> */}
        <ThemeProvider>
          <AEMSTopbar />
          <PageTransition>{children}</PageTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}
