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

const DATABASE_ID =
  process.env.NOTION_DATABASE_ID;

app.get("/propiedades", async (req, res) => {

  try {

    const respuesta =
      await notion.dataSources.query({

        data_source_id: DATABASE_ID

      });

    const propiedades =
      respuesta.results.map((item) => {

        const p = item.properties;

        return {

          nombre:
            p.Nombre?.title?.[0]
              ?.plain_text ||
            "Sin nombre",

          provincia:
            p.Provincia
              ?.select?.name ||
            "",

          negocio:
            p.Negocio
              ?.select?.name ||
            "",

          precio:
            p.Precio?.number || 0,

          habitaciones:
            p.Habitaciones
              ?.number || 0,

          banos:
            p["Baños"]
              ?.number || 0

        };

      });

    res.json(propiedades);

  }

  catch(error){

    console.log(error);

    res.status(500).json({
      error:error.message
    });

  }

});

app.listen(3001, () => {

  console.log(
    "Servidor en puerto 3001"
  );

});