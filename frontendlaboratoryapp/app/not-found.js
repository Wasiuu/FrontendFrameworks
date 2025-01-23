"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-lg text-gray-600 mb-6">
                Przepraszamy, ale strona, której szukasz, nie istnieje.
            </p>
            <button
                onClick={() => router.push("/")}
                className="bg-blue-500 text-white px-6 py-3 rounded font-bold hover:bg-blue-600 transition"
            >
                Powrót do strony głównej
            </button>
        </div>
    );
}
