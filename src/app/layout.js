import { Poppins } from "next/font/google";
import "./globals.css";
import { EmployeeProvider } from "./context/EmployeeContext";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import Script from 'next/script';

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] 
});

export const metadata = {
  title: "Maneger",
  description: "An App that helps business manage their employee system",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.className}>
          <AuthProvider>
            <EmployeeProvider>
              <Header />
              {children}
              <Script
                src="https://sdk.scdn.co/spotify-player.js"
                strategy="beforeInteractive"
              />
            </EmployeeProvider>
          </AuthProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
