// Esta es tu Netlify Function. Actuará como un intermediario seguro.

// Reemplaza esta URL con la URL REAL de tu Google Apps Script.
const SCRIPT_URL = 'https://script.google.com/a/macros/zeb.mx/s/AKfycbzU5htWeKa8KWe3a12h_Xvtg_nFd8UiVxEQjjjjeBZRk1AeyOfR5v-W4yRt2F6emYz4/exec';

exports.handler = async (event, context) => {
  try {
    // Hacemos una llamada desde el servidor de Netlify al script de Google.
    // Como esta llamada es de servidor a servidor, no hay problemas de CORS.
    const response = await fetch(SCRIPT_URL);
    const data = await response.json();

    // Devolvemos los datos obtenidos a la página principal (index.html).
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Permite que la función sea llamada desde cualquier sitio
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    // Si algo sale mal, devolvemos un error.
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data from Google Script' }),
    };
  }
};


