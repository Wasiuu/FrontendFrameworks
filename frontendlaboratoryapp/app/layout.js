"use client";
import { useState } from "react";
import { AuthProvider } from "@/app/lib/AuthContext";
import PropTypes from "prop-types";
import localFont from "next/font/local";
import Link from "next/link";
import UserMenu from "@/app/components/UserMenu";
import "./globals.css";
import { FaBars, FaTimes } from "react-icons/fa";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          {/* Sidebar */}
          <nav
            className={`fixed top-0 left-0 h-screen bg-gray-800 text-white w-64 z-50 transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
              } transition-transform lg:translate-x-0 lg:w-64`}
          >
            <h1 className="text-xl lg:text-2xl font-bold my-6 text-center">Menu</h1>
            <ul className="space-y-4 text-center">
              <li>
                <Link href="/Home" className="p-3 block hover:bg-gray-700 rounded">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/Calendar" className="p-3 block hover:bg-gray-700 rounded">
                  Calendar
                </Link>
              </li>
              <li>
                <Link href="/user/profile" className="p-3 block hover:bg-gray-700 rounded">
                  Profile
                </Link>
              </li>
            </ul>
          </nav>

          {/* Main layout */}
          <div className="lg:ml-64 flex flex-col min-h-screen">
            {/* Header */}
            <header className="bg-white shadow-md p-4 flex items-center justify-between lg:justify-start z-40 relative">
              {/* Przycisk hamburger */}
              <button
                className="lg:hidden bg-gray-800 text-white p-2 rounded-full z-50 relative"
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
              <h2 className="text-xl font-semibold text-gray-800 ml-4">Kalendarz</h2>
              <div className="flex items-center ml-auto space-x-4">
                {/* Przyciski logowania/rejestracji */}
                <div className="flex lg:hidden">
                  <Link href="/user/signin">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                      Log in
                    </button>
                  </Link>
                  <Link href="/user/register">
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition ml-2">
                      Register
                    </button>
                  </Link>
                </div>
                {/* Menu użytkownika */}
                <div className="hidden lg:flex">
                  <UserMenu />
                </div>
              </div>
            </header>
            <nav
              className={`fixed top-0 left-0 h-screen bg-gray-800 text-white w-64 z-40 transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform lg:translate-x-0 lg:w-64`}
            >
              <h1 className="text-xl lg:text-2xl font-bold my-6 text-center">Menu</h1>
              <ul className="space-y-4 text-center">
                <li>
                  <Link href="/Home" className="p-3 block hover:bg-gray-700 rounded">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/Calendar" className="p-3 block hover:bg-gray-700 rounded">
                    Calendar
                  </Link>
                </li>
                <li>
                  <Link href="/user/profile" className="p-3 block hover:bg-gray-700 rounded">
                    Profile
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Content */}
            <main className="p-6 flex-1 bg-gray-100">{children}</main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white text-center py-4">
              &copy; 2024 Calendar App. All rights reserved.
              <a href="https://github.com/Wasiuu">
                <br></br>
                <br></br>
                GitHub: Wasiuu
              </a>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
