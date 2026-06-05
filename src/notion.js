export async function getPropiedades() {
  const response = await fetch(
    "https://crm-propiedades-app.onrender.com/propiedades"
  );

  if (!response.ok) {
    throw new Error("Error al cargar propiedades");
  }

  return await response.json();
}