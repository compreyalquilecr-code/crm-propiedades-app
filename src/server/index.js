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

    const respuesta = await notion.databases.query({
      database_id: DATABASE_ID
    });

    const propiedades = respuesta.results.map((item) => {

      const p = item.properties;

      return {
        nombre:
          p.Nombre?.title?.[0]?.plain_text ||
          "Sin nombre",

        provincia:
          p.Provincia?.select?.name ||
          p.Provincia?.rich_text?.[0]?.plain_text ||
          "",

        negocio:
          p.Negocio?.select?.name ||
          p.Negocio?.rich_text?.[0]?.plain_text ||
          "",

        precio:
          p.Precio?.number || 0,

        habitaciones:
          p.Habitaciones?.number || 0,

        banos:
          p["Baños"]?.number || 0,

        contacto:
          p.Contacto?.rich_text?.[0]?.plain_text ||
          p.Contacto?.phone_number ||
          "",

        corredor:
          p.Corredor?.rich_text?.[0]?.plain_text ||
          "",

        comision:
          p.Comision?.rich_text?.[0]?.plain_text ||
          p.Comision?.number ||
          "",

        informacion:
          p.Informacion?.rich_text?.[0]?.plain_text ||
          ""
      };

    });

    res.json(propiedades);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });

  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});