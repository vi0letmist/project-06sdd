import type { ReactNode } from "react";
import "@/app/globals.css";
import Layout from "@/components/layout/main";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
