import React from "react";

const AuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <main className="relative min-h-screen bg-black">
            <div className="auth-background">
                <div className="auth-background-floor"></div>
                <div className="auth-background-overlay"></div>

                <div className="z-10">
                    {children}
                </div>
            </div>

        </main>
    );
};

export default AuthLayout;