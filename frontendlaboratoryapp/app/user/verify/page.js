"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase/firebase";

export default function VerifyEmail() {
    const user = auth.currentUser;

    if (user) {
        signOut(auth);
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <h1 className="text-xl text-center">
                Adres email {user?.email || "Twojego konta"} wymaga weryfikacji.
                <br />
                Sprawdź swoją skrzynkę pocztową i kliknij link weryfikacyjny.
            </h1>
        </div>
    );
}
