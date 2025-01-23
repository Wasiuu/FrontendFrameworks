"use client";
import { useState, useEffect } from "react";
import { updateProfile } from "firebase/auth";
import { auth, db } from "@/app/lib/firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        displayName: "",
        photoURL: "",
        address: {
            street: "",
            city: "",
            zipCode: "",
        },
    });

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            try {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setFormData({
                        displayName: data.displayName || "",
                        photoURL: data.photoURL || "",
                        address: data.address || { street: "", city: "", zipCode: "" },
                    });
                }
            } catch (error) {
                console.error("Błąd podczas pobierania danych:", error.message);
                setError("Nie udało się pobrać danych użytkownika.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            if (user) {
                await updateProfile(user, {
                    displayName: formData.displayName,
                    photoURL: formData.photoURL,
                });

                await setDoc(doc(db, "users", user.uid), {
                    displayName: formData.displayName,
                    photoURL: formData.photoURL,
                    address: formData.address,
                });

                setSuccessMessage("Profil został zaktualizowany!");
                setError("");
            }
        } catch (error) {
            setError("Nie udało się zaktualizować profilu: " + error.message);
            setSuccessMessage("");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <p className="text-lg text-secondary">Ładowanie danych...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <p className="text-lg text-secondary">Musisz być zalogowany, aby zobaczyć tę stronę.</p>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-background px-4">
            <form
                onSubmit={onSubmit}
                className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center mb-6">Twój profil</h2>

                {successMessage && (
                    <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
                        {successMessage}
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <div className="flex justify-center mb-6">
                    {formData.photoURL ? (
                        <img
                            src={formData.photoURL}
                            alt="Zdjęcie profilowe"
                            className="rounded-full h-24 w-24 object-cover"
                        />
                    ) : (
                        <div className="bg-gray-300 rounded-full h-24 w-24 flex items-center justify-center">
                            <span className="text-gray-600">Brak zdjęcia</span>
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="displayName"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Nazwa wyświetlana
                    </label>
                    <input
                        type="text"
                        id="displayName"
                        value={formData.displayName}
                        onChange={(e) =>
                            setFormData({ ...formData, displayName: e.target.value })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary focus:border-primary"
                        placeholder="Wprowadź nazwę wyświetlaną"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="photoURL"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Adres zdjęcia profilowego
                    </label>
                    <input
                        type="text"
                        id="photoURL"
                        value={formData.photoURL}
                        onChange={(e) =>
                            setFormData({ ...formData, photoURL: e.target.value })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary focus:border-primary"
                        placeholder="Wprowadź URL zdjęcia"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="street"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Ulica
                    </label>
                    <input
                        type="text"
                        id="street"
                        value={formData.address.street}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                address: { ...formData.address, street: e.target.value },
                            })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary focus:border-primary"
                        placeholder="Wprowadź ulicę"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Miasto
                    </label>
                    <input
                        type="text"
                        id="city"
                        value={formData.address.city}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                address: { ...formData.address, city: e.target.value },
                            })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary focus:border-primary"
                        placeholder="Wprowadź miasto"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="zipCode"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Kod pocztowy
                    </label>
                    <input
                        type="text"
                        id="zipCode"
                        value={formData.address.zipCode}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                address: { ...formData.address, zipCode: e.target.value },
                            })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary focus:border-primary"
                        placeholder="Wprowadź kod pocztowy"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition"
                >
                    Zapisz zmiany
                </button>
            </form>
        </div>
    );
}
