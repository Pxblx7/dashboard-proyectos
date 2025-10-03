// Esta es la nueva versión de tu función, ahora usando SheetDB.

// ▼▼▼ PEGA TU URL DE LA API DE SHEETDB AQUÍ ▼▼▼
const SHEETDB_API_URL = 'https://sheetdb.io/api/v1/oigbg9o19pmwk?sheet=Objetivos_Q4';
// ▲▲▲ PEGA TU URL DE LA API DE SHEETDB AQUÍ ▲▲▲


// No necesitas modificar nada debajo de esta línea.
// -------------------------------------------------

exports.handler = async (event, context) => {
  // Verificamos que la URL haya sido reemplazada.
  if (SHEETDB_API_URL.includes('URL_DE_TU_API_DE_SHEETDB_AQUI')) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'La URL de SheetDB no ha sido configurada en la función de Netlify.' }),
    };
  }

  try {
    const response = await fetch(SHEETDB_API_URL);
    if (!response.ok) {
      throw new Error(`SheetDB API respondió con un error: ${response.statusText}`);
    }
    const data = await response.json();

    // SheetDB devuelve un array. Lo envolvemos en el formato que espera el frontend.
    const formattedData = {
        kpis: data.map(row => ({
            sub_kpi: row['Sub KPI'],
            kpi_global: row['KPI Global'],
            formula_explicacion: row['Formula/Explicación'],
            cronograma: {
                inicio: row['Inicio'],
                entrega_estimada: row['Entrega Estimada']
            },
            metrica: {
                baseline: row['Baseline'],
                target: row['Target'],
                tipo: row['Tipo']
            },
            niveles_logro: {
                '1': row['Nivel 1'],
                '2': row['Nivel 2'],
                '3': row['Nivel 3'],
                '4': row['Nivel 4'],
                '5': row['Nivel 5']
            },
            responsables: {
                area: row['Área'],
                stakeholder: row['Stakeholder']
            }
        }))
    };
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formattedData),
    };

  } catch (error) {
    console.error('Error en la función de Netlify:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};



