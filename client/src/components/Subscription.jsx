import React from "react";
//import "./Subscription.css"; // Importa el archivo CSS externo

const SubscriptionPage = () => {
  return (
    <div className="container">
      {/* Encabezado */}
      <div className="header">
        <h1 className="title">Planes asequibles para cualquier situación</h1>
        <p className="subtitle">
          Elige un plan Premium y escucha música sin anuncios y sin límites en
          teléfonos, altavoces y otros dispositivos. Paga de varias formas.
          Cancelas cuando quieras.
        </p>
      </div>

      {/* Características de los planes Premium */}
      <div className="features">
        <h2> Todos los planes Premium incluyen lo siguiente:</h2>
        <ul>
          <li>✓ Escucha tu música favorita sin anuncios</li>
          <li>✓ Descarga de canciones para disfrutarlas sin conexión</li>
          <li>✓ Escucha canciones en cualquier orden</li>
          <li>✓ Calidad de audio superior</li>
          <li>✓ Organiza la cola de reproducción</li>
        </ul>
      </div>

      {/* Contenido principal */}
      <div className="grid-container">
        {/* Plan Individual */}
        <div className="subscription-plan">
          <h2 className="subscription-title">GRATIS DURANTE 1 MES</h2>
          <p className="plan-details">Premium Individual</p>
          <ul className="plan-details">
            <li>1 cuenta Premium</li>
            <li>Cancelas cuando quieras</li>
            <li>Gratis para 1 mes</li>
          </ul>
          <button className="back-button" onClick={() => window.history.back()}>
            Probar gratis durante 1 mes
          </button>
        </div>

        {/* Plan para Estudiantes */}
        <div className="subscription-plan">
          <h2 className="subscription-title">GRATIS DURANTE 1 MES</h2>
          <p className="plan-details">Premium para Estudiantes</p>
          <ul className="plan-details">
            <li>1 cuenta Premium verificada</li>
            <li>Descuento para estudiantes que cumplan los requisitos</li>
            <li>Cancelas cuando quieras</li>
          </ul>
          <button className="back-button" onClick={() => window.history.back()}>
            Probar gratis durante 1 mes
          </button>
        </div>

        {/* Plan Familiar */}
        <div className="subscription-plan">
          <h2 className="subscription-title">Premium Familiar</h2>
          <p className="plan-price">17,99 €</p>
          <p className="plan-details">AL MES</p>
          <ul className="plan-details">
            <li>Hasta 6 cuentas Premium</li>
            <li>Controla el contenido etiquetado como explícito</li>
            <li>Cancelas cuando quieras</li>
          </ul>
          <button className="back-button" onClick={() => window.history.back()}>
            Conseguir Premium Familiar
          </button>
        </div>

        {/* Plan Duo */}
        <div className="subscription-plan">
          <h2 className="subscription-title">Premium Duo</h2>
          <p className="plan-price">14,99 €</p>
          <p className="plan-details">AL MES</p>
          <ul className="plan-details">
            <li>2 cuentas Premium</li>
            <li>Cancelas cuando quieras</li>
          </ul>
          <button className="back-button" onClick={() => window.history.back()}>
            Conseguir Premium Duo
          </button>
        </div>
      </div>

      {/* Botón para volver */}
      <div className="back-button-container">
        <button className="back-button" onClick={() => window.history.back()}>
          Volver
        </button>
      </div>

      {/* Pie de página */}
      <div className="text-center mt-8 text-xs text-gray-600">
        <p>© 2024 Todos los derechos reservados.</p>
      </div>
    </div>
  );
};

export default SubscriptionPage;
