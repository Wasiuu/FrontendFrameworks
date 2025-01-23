// app/home/page.jsx

export default function Home() {
    return (
        <div className="container flex flex-col items-center justify-center min-h-screen">
            <div className="card text-center w-full max-w-3xl">
                <h1 className="text-4xl font-bold mb-6 text-primary">O Aplikacji</h1>
                <div className="text-lg mb-6">
                    <p className="mb-4">
                        Aplikacja została stworzona, aby umożliwić użytkownikom efektywne zarządzanie zadaniami w intuicyjny i prosty sposób. Główna funkcjonalność opiera się na kalendarzu, który pozwala na przypisywanie zadań do wybranych dni, ich edytowanie, a także usuwanie. Dzięki przejrzystemu interfejsowi użytkownik może szybko przeglądać i organizować swoje obowiązki.
                    </p>
                    <p className="mb-4">
                        Aplikacja oferuje możliwość logowania i rejestracji, co pozwala na personalizację danych oraz przypisanie zadań do konkretnego użytkownika. Każdy użytkownik może zarządzać swoim profilem, edytować dane, takie jak nazwa wyświetlana czy zdjęcie profilowe, co sprawia, że aplikacja jest dostosowana do indywidualnych potrzeb.
                    </p>
                    <p>
                        Interfejs aplikacji został zaprojektowany z myślą o responsywności, co oznacza, że działa równie dobrze na komputerach, jak i na urządzeniach mobilnych. Menu boczne typu &quot;hamburger&quot; ułatwia nawigację na mniejszych ekranach, a przyjazny design, oparty na nowoczesnych technologiach takich jak React, Next.js i Tailwind CSS, zapewnia estetykę oraz komfort użytkowania. Aplikacja jest idealnym narzędziem do organizacji codziennych zadań i efektywnego zarządzania czasem.
                    </p>
                </div>
            </div>
            <div className="card text-center w-full max-w-3xl mt-6">
                <h2 className="text-2xl font-bold mb-4 text-secondary">Autor</h2>
                <p className="text-lg">
                    Stworzono przez <span className="font-bold">Jakub Wasylik</span> jako projekt edukacyjny
                    w ramach przedmiotu Frameworki Frontendowe.
                </p>
            </div>
        </div>
    );
}
