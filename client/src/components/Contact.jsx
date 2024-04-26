import React from "react";

const Contact = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-5xl font-bold text-center tracking-tight animate-pulse animate-fade-in-down text-red-500">
                    Contact
                </h1>
                <p className="mt-4 max-w-2xl text-xl animate-fade-in-up text-center">
                    If you have any questions, please feel free to contact us.
                </p>
            </div>
        </div>
    );
};

export default Contact;