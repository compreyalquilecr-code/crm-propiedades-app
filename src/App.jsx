import { useEffect, useState } from "react";
import { getPropiedades } from "./notion";
import "./App.css";

import logo from "./assets/logo.png.png";

function App() {
  const [propiedades, setPropiedades] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [seleccionada, setSeleccionada] = useState(null);

  useEffect(() => {
    async function cargar() {
      try {
        const datos = await getPropiedades();
        setPropiedades(datos);
      } catch (error) {
        console.error(error);
      }
    }

    cargar();
  }, []);

  const filtradas = propiedades.filter((p) => {
    if (busqueda.trim() === "") return false;

    const texto = busqueda.toLowerCase();

    return (
      (p.nombre || "").toLowerCase().includes(texto) ||
      (p.provincia || "").toLowerCase().includes(texto) ||
      (p.negocio || "").toLowerCase().includes(texto) ||
      String(p.precio || "").includes(busqueda)
    );
  });

  return (
    <div className="contenedor">
      <div className="header">
        <img
          src={logo}
          alt="logo"
          className="logo"
        />

        <h1 className="titulo">
          CRM Inmobiliario
        </h1>
      </div>

      <div className="buscador">
        <input
          type="text"
          placeholder="Buscar propiedad, provincia o precio..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {busqueda.trim() !== "" && (

        <div className="resultados">

          {filtradas.length === 0 ? (

            <div className="sinResultados">
              No se encontraron propiedades.
            </div>

          ) : (

            filtradas.map((p, i) => (

              <div
                key={i}
                className="cardResultado"
                onClick={() => setSeleccionada(p)}
              >
                <h3>{p.nombre}</h3>

                <p>
                  📍 {p.provincia}
                </p>

                <p>
                  💰 $
                  {p.precio?.toLocaleString()}
                </p>

                <span className="badge">
                  {p.negocio}
                </span>
              </div>

            ))

          )}

        </div>

      )}

      {seleccionada && (

        <div
          className="modalFondo"
          onClick={() => setSeleccionada(null)}
        >

          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >

            <h2>{seleccionada.nombre}</h2>

            <p>
              📍 Provincia: {seleccionada.provincia}
            </p>

            <p>
              💰 Precio: $
              {seleccionada.precio?.toLocaleString()}
            </p>

            <p>
              🛏 Habitaciones:
              {" "}
              {seleccionada.habitaciones}
            </p>

            <p>
              🚿 Baños:
              {" "}
              {seleccionada.banos}
            </p>

            <p>
              📌 Negocio:
              {" "}
              {seleccionada.negocio}
            </p>

            {seleccionada.corredor && (
              <p>
                👨‍💼 Corredor:
                {" "}
                {seleccionada.corredor}
              </p>
            )}

            {seleccionada.contacto && (
              <p>
                📞 Contacto:
                {" "}
                {seleccionada.contacto}
              </p>
            )}

            {seleccionada.comision && (
              <p>
                💰 Comisión:
                {" "}
                {seleccionada.comision}
              </p>
            )}

            {seleccionada.informacion && (
              <div>
                <p>📋 Información:</p>
                <p>{seleccionada.informacion}</p>
              </div>
            )}

            <button
              className="cerrar"
              onClick={() => setSeleccionada(null)}
            >
              Cerrar
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;