export async function getPropiedades() {

  const response = await fetch(
    "http://localhost:3001/propiedades"
  );

  return await response.json();

}