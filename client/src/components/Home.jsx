import React from "react";
import Layout from "../layouts/Layout";
import { useState, useEffect } from "react";

const Home = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("USER_ACCESS_TOKEN") !== null) {
        setIsAuthenticated(true);
    } else {
        setIsAuthenticated(false);
    }
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {isAuthenticated ? (
            <div className="flex flex-col items-center justify-center h-screen">
              <h1 className="text-5xl font-bold tracking-tight animate-pulse animate-fade-in-down">
                ¡Bienvenido!
              </h1>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-screen">
              <h1 className="text-5xl font-bold text-center tracking-tight animate-pulse animate-fade-in-down text-red-500">
                ¡Bienvenido a Alphonics!
              </h1>
              <p className="mt-4 max-w-2xl text-xl animate-fade-in-up text-center">
                Para poder disfrutar de escuchar, buscar o descubrir nueva música, inicia sesión o registrate si eres un nuevo usuario.
              </p>
              <p className="mt-4 max-w-2xl text-xl animate-fade-in-up text-center">¡Te damos la bienvenida!</p>
              <div className="mt-8">
                <a href="/subscriptions" className="bg-gradient-to-r from-red-700 via-red-500 to-gray-300 text-white font-medium text-lg hover:bg-gradient-to-br focus:outline-none focus:ring-offset focus:ring-4 focus:ring-red-30 py-3 px-6 rounded-lg">
                  Ver planes de suscripción
                </a>
              </div>
            </div>
          )}

        </div>
    </Layout>
  );
};

export default Home;
