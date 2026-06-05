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

        const datos =
          await getPropiedades();

        setPropiedades(datos);

      } catch (error) {

        console.error(error);

      }

    }

    cargar();

  }, []);

  const filtradas = propiedades.filter((p) => {

if (busqueda.trim() === "") {
return true;
}

const texto = busqueda.toLowerCase();

return (

```
(p.nombre || "")
  .toLowerCase()
  .includes(texto)

||

(p.provincia || "")
  .toLowerCase()
  .includes(texto)

||

(p.negocio || "")
  .toLowerCase()
  .includes(texto)

||

String(
  p.precio || ""
).includes(busqueda)
```

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
          onChange={(e)=>
            setBusqueda(e.target.value)
          }
        />

      </div>

      <div className="tablaContainer">


        <div className="tablaContainer">

          <table className="tabla">

            <thead>

              <tr>

                <th>Propiedad</th>
                <th>Provincia</th>
                <th>Negocio</th>
                <th>Precio</th>

              </tr>

            </thead>

            <tbody>

              {filtradas.map((p, i)=>(

                <tr
                  key={i}
                  onClick={() =>
                    setSeleccionada(p)
                  }
                >

                  <td>{p.nombre}</td>

                  <td>{p.provincia}</td>

                  <td>

                    <span className="badge">
                      {p.negocio}
                    </span>

                  </td>

                  <td>

                    $
                    {p.precio?.toLocaleString()}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

      {seleccionada && (

        <div
          className="modalFondo"
          onClick={() =>
            setSeleccionada(null)
          }
        >

          <div
            className="modal"
            onClick={(e)=>
              e.stopPropagation()
            }
          >

            <h2>
              {seleccionada.nombre}
            </h2>

            <p>
              📍 Provincia:
              {" "}
              {seleccionada.provincia}
            </p>

            <p>
              💰 Precio:
              {" "}
              $
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

                <p>
                  📋 Información:
                </p>

                <p>
                  {seleccionada.informacion}
                </p>

              </div>

            )}

            <button
  className="cerrar"
  onClick={() =>
    setSeleccionada(null)
  }
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