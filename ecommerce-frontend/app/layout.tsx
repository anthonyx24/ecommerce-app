import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import NavBar from "./components/NavBar";
import { UserProvider } from "./contexts/UserContext";
import { CartProvider } from "./contexts/CartContext";

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Ecommerce App",
  description: "Innocaption Showcase Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
      <html lang="en" className={`${jakarta.variable}`}>
          <body>
              <UserProvider>
                <CartProvider>
                  <div className="flex-col w-full">
                    <div className="fixed w-full z-10">
                      <NavBar/>
                    </div>
                    <main className="flex pt-[16vh] px-[14vw] justify-center">
                      {children}
                    </main>
                  </div>
                </CartProvider>
              </UserProvider>
          </body> 
      </html>
  );
}
