'use client';
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/app/lib/firebase/firebase";
import { useRouter } from "next/navigation";



export default function ArticlesPage() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                router.push("/user/signin");
                return;
            }

            try {
                const q = query(collection(db, "articles"), where("user", "==", user.uid));
                const querySnapshot = await getDocs(q);
                const fetchedArticles = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setArticles(fetchedArticles);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching articles:", err);
                setError("Failed to fetch articles. Please try again later.");
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [router]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Your Articles</h1>
            {articles.length === 0 ? (
                <p>No articles found.</p>
            ) : (
                <ul>
                    {articles.map((article) => (
                        <li key={article.id}>
                            <h2>{article.title}</h2>
                            <p>{article.content}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
