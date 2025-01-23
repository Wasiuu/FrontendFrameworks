"use client";
import Image from 'next/image';
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase/firebase";
import Link from "next/link";

export default function UserMenu() {
    const [currentUser, setCurrentUser] = useState(null);


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
    };

    return (

        <div className="space-x-4">
            {currentUser ? (
                <div className="flex items-center space-x-4">
                    <span className="font-bold">{currentUser.displayName || "User"}</span>
                    {currentUser.photoURL && (
                        <Image
                            src={currentUser.photoURL || "/default-profile.png"}
                            alt="Zdjęcie profilowe"
                            className="rounded-full object-cover"
                            width={96}
                            height={96}
                        />
                    )}
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                        Log out
                    </button>
                </div>
            ) : (
                <>
                    <Link href="/user/signin">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded">
                            Log in
                        </button>
                    </Link>
                    <Link href="/user/register">
                        <button className="bg-green-500 text-white px-4 py-2 rounded">
                            Register
                        </button>
                    </Link>
                </>
            )}
        </div>
    );
}
