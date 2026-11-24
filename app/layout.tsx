import type { ReactNode } from "react";

export const metadata = { title: "Playwright + Next.js" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="th">
      <body style={{ fontFamily: "sans-serif", maxWidth: 720, margin: "2rem auto", padding: "0 1rem" }}>
        {children}
      </body>
    </html>
  );
}
