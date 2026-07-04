import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "SabarKoti — Home Services Marketplace Finland",
  description: "Book trusted home service professionals in Helsinki. Cleaning, handyman, laundry and more. Kotitalousvähennys tax receipt included.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: "#f8f9fa", minHeight: "100vh" }}>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
