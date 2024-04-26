import React from "react";
import { FaCheck } from "react-icons/fa";
import Layout from "../layouts/Layout";
import DefaultLayout from "../layouts/DefaultLayout";
const Subscriptions = () => {
  return (
    <DefaultLayout>
      <div className=" text-red-500 p-6">
        <h1 className="text-3xl font-bold mb-4">Planes de Suscripción</h1>
        <p className= "text-black text-lg mb-6">Elige tu plan y empieza a disfrutar de la mejor música sin anuncios.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {/* Planes Premium */}
          <div className="border-2 border-transparent border-shadow-2xl p-6 rounded-lg shadow-lg bg-white hover:scale-105 transition-transform duration-300 ease-in-out">
            <h2 className="text-2xl font-bold mb-4">Premium Individual</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center"><FaCheck className="mr-2 text-green-500" /> Escucha música sin anuncios</li>
              <li className="flex items-center"><FaCheck className="mr-2 text-green-500" /> Descarga canciones para escuchar sin conexión</li>
              <li className="flex items-center"><FaCheck className="mr-2 text-green-500" /> Escucha canciones en cualquier orden</li>
              <li className="flex items-center"><FaCheck className="mr-2 text-green-500" /> Calidad de audio superior</li>
              <li className="flex items-center"><FaCheck className="mr-2 text-green-500" /> Organiza la cola de reproducción</li>
            </ul>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-600 transition-colors duration-300 ease-in-out hover:shadow-lg">
              Probar gratis durante 1 mes
            </button>
          </div>

          <div className="border-2 border-transparent border-shadow-2xl p-6 rounded-lg shadow-lg bg-white hover:scale-105 transition-transform duration-300 ease-in-out">
            <h2 className="text-2xl font-bold mb-4">Premium para Estudiantes</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center"><FaCheck className="mr-2 text-green-500" /> 1 cuenta Premium verificada</li>
              <li className="flex items-center"><FaCheck className="mr-2 text-green-500" /> Descuento para estudiantes que cumplan los requisitos</li>
              <li className="flex items-center"><FaCheck className="mr-2 text-green-500" /> Cancelar cuando quieras</li>
            </ul>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-600 transition-colors duration-300 ease-in-out hover:shadow-lg">
              Probar gratis durante 1 mes
            </button>
          </div>

          <div className="border-transparent border-shadow-2xl p-6 rounded-lg shadow-lg bg-white hover:scale-105 transition-transform duration-300 ease-in-out">
            <h2 className="text-2xl font-bold mb-4">Premium Familiar</h2>
            <p className="text-2xl font-bold mb-4">69,99 €/mes</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center"><FaCheck className="mr-2 text-green-500" /> Hasta 6 cuentas Premium</li>
              <li className="flex items-center"><FaCheck className="mr-2 text-green-500" /> Controla el contenido etiquetado como explícito</li>
              <li className="flex items-center"><FaCheck className="mr-2 text-green-500" /> Cancelar cuando quieras</li>
            </ul>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-600 transition-colors duration-300 ease-in-out hover:shadow-lg">
              Conseguir Premium Familiar
            </button>
          </div>

          <div className="border-2 border-transparent border-shadow-2xl p-6 rounded-lg shadow-lg bg-white hover:scale-105 transition-transform duration-300 ease-in-out">
            <h2 className="text-2xl font-bold mb-4">Premium Duo</h2>
            <p className="text-2xl font-bold mb-4">49,99 €/mes</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center"><FaCheck className="mr-2 text-green-500" /> 2 cuentas Premium</li>
              <li className="flex items-center"><FaCheck className="mr-2 text-green-500" /> Cancelar cuando quieras</li>
            </ul>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-600 transition-colors duration-300 ease-in-out hover:shadow-lg">
              Conseguir Premium Duo
            </button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
export default Subscriptions;
