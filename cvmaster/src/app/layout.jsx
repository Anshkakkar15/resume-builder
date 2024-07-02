import { Inter } from "next/font/google";
import "./globals.css";
import { TopLoader } from "@/components/TopLoader";
import ReduxProvider from "./ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopLoader />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
