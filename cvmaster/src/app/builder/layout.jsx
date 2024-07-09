import { TopLoader } from "@/components/TopLoader";
export default function RootLayout({ children }) {
  return (
    <main>
      <TopLoader />
      {children}
    </main>
  );
}
