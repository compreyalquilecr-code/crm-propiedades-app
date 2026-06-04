import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Client } from "@notionhq/client";

dotenv.config();

const app = express();

app.use(cors());

const notion = new Client({
  auth: process.env.NOTION_TOKEN
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID;

app.get("/propiedades", async (req, res) => {

  try {

    const respuesta = await notion.dataSources.query({
      data_source_id: DATABASE_ID
    });

    const propiedades = respuesta.results.map((item) => {

      const p = item.properties;

      return {

        nombre:
          p.Nombre?.title?.[0]?.plain_text ||
          "Sin nombre",

        provincia:
          p.Provincia?.select?.name ||
          "",

        canton:
          p["Cantón"]?.rich_text?.[0]?.plain_text ||
          "",

        distrito:
          p["Distrito"]?.rich_text?.[0]?.plain_text ||
          "",

        negocio:
          p.Negocio?.select?.name ||
          "",

        tipoPropiedad:
          p["Tipo de propiedad"]?.select?.name ||
          "",

        precio:
          p.Precio?.number || 0,

        habitaciones:
          p.Habitaciones?.number || 0,

        banos:
          p["Baños"]?.number || 0,

        parqueo:
          p.Parqueo?.number || 0,

        terreno:
          p["Terreno m²"]?.number || 0,

        construccion:
          p["Construcción m²"]?.number || 0,

        contacto:
          p.Contacto?.rich_text?.[0]?.plain_text ||
          "",

        corredor:
          p.Corredor?.rich_text?.[0]?.plain_text ||
          "",

        comision:
          p["Comisión"]?.rich_text?.[0]?.plain_text ||
          "",

        informacion:
          p["Información"]?.rich_text?.[0]?.plain_text ||
          "",

        fichaTecnica:
          p["Ficha técnica"]?.rich_text?.[0]?.plain_text ||
          ""

      };

    });

    res.json(propiedades);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message
    });

  }

});

app.listen(3001, () => {

  console.log("Servidor en puerto 3001");

});