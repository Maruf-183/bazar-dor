import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import { ProductsProvider } from "@/components/ProductsProvider";
import "./globals.css";

export const dynamic = "force-dynamic";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" suppressHydrationWarning className={`${hindSiliguri.variable} h-full antialiased`}>
      <body className="min-h-screen bg-page text-ink">
        <ProductsProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <PriceTicker />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster position="top-center" />
        </ProductsProvider>
      </body>
    </html>
  );
}
