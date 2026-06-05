export async function getPropiedades() {

const response = await fetch(
"https://crm-propiedades-app.onrender.com/propiedades"
);

return await response.json();

}
