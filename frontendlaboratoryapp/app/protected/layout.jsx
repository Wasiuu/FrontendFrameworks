'use client';

import { useAuth } from "@/app/lib/AuthContext";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';

function Protected({ children }) {
    const { user } = useAuth();
    const returnUrl = useRouter().asPath;
    const router = useRouter();

    useEffect(() => {
        if (!user) {

            router.push(`/user/signin?returnUrl=${returnUrl}`);
        }
    }, [user, returnUrl, router]);

    if (!user) {
        return <div>Ładowanie...</div>;
    }

    return <>{children}</>;
}


Protected.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Protected;
