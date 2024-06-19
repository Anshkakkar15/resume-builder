import { BuilderTopbar } from "@/components/BuilderTopbar";

export default function RootLayout({ children }) {
  return (
    <main>
      <BuilderTopbar />
      {children}
    </main>
  );
}
