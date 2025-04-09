import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PromptService {

  constructor() { }

  getQuizPrompt(texto: string, tnum_preguntas:number): string {
    return `
    Genera ${tnum_preguntas} preguntas basadas en el siguiente texto, cumpliendo estrictamente estas instrucciones:
    - La pregunta debe estar basada exclusivamente en el texto proporcionado.
    - Devuelve únicamente un objeto JSON válido, sin ningún texto adicional.
    - Debe generarse exactamente **${tnum_preguntas} * preguntas.
    - Cada pregunta debe incluir una única respuesta correcta.
    - Cada pregunta debe incluir exactamente tres respuestas incorrectas.
    - Una explicación detallada.
    - El objeto JSON debe seguir exactamente esta estructura:

    [
      {
        "pregunta": "Pregunta",
        "respuesta_correcta": "Respuesta correcta",
        "respuestas_incorrectas": ["Incorrecta 1", "Incorrecta 2", "Incorrecta 3"],
        "explicacion": "Explicación detallada basada en el texto."
      },
      ...
    ]

    Asegúrate de que:
    - Se utilicen correctamente las comillas y comas propias del JSON.
    - Se generen exactamente **dos preguntas**.
    - No se incluya texto adicional fuera del JSON.

    Texto base: ${texto} 
    `;
  }


  getSumarizePrompt(text: string): string {
    return `Tu tarea es hacer un *resumen* del siguiente texto.
  
  Un resumen consiste en identificar y expresar de forma breve y clara las ideas principales del contenido, sin repetirlo palabra por palabra ni incluir detalles innecesarios. No debes agregar opiniones ni comentarios personales, solo condensar la información esencial.
  
  Realiza lo siguiente:
  
  1. Genera un único título general que represente el contenido completo del texto.
  2. Extrae los puntos clave del texto y devuélvelos en un array de diccionarios JSON, cada uno con un título breve y una descripción del punto clave.
  
  Devuelve el resultado en un objeto JSON con el siguiente formato:
  
  {
    "titulo_general": "título que resume el texto completo",
    "resumenes": [
      {
        "titulo": "título breve del punto clave",
        "descripcion": "descripción del punto clave"
      },
      ...
    ]
  }
  
  No agregues información adicional ni comentarios. Solo responde en *formato JSON válido*.
  
  Aquí está el texto: ${text}`
  }
  


  getConceptMap(text: string): string {
    return `
  Eres un asistente experto en análisis de textos y generación de mapas conceptuales. 
  Tu tarea es leer un texto que se te proporcionará y extraer los conceptos clave
   y sus relaciones, para generar un mapa conceptual. El resultado debe estar 
   estructurado en un objeto JSON con dos propiedades: "nodes" y "links". 
   La propiedad "nodes" es un arreglo de objetos, donde cada objeto representa 
   un nodo con las siguientes propiedades: "id" (un identificador único en forma de cadena), 
   "label" (el nombre o etiqueta del concepto) y, de manera opcional, "rank" (por ejemplo, "first", cuando sea relevante). 
   La propiedad "links" es un arreglo de objetos, donde cada objeto representa una conexión entre dos nodos, con 
   las siguientes propiedades: "source" (el identificador del nodo origen) y "target" (el identificador del nodo destino).
  Por ejemplo, si se tuviera el siguiente mapa conceptual, Devuelve únicamente el JSON generado, sin texto adicional.:

{
  "links": [
    {"source": "start", "target": "1"},
    {"source": "start", "target": "2"},
    {"source": "1", "target": "3"},
    {"source": "2", "target": "4"},
    {"source": "2", "target": "6"},
    {"source": "3", "target": "5"}
  ],
  "nodes": [
    {"id": "start", "label": "start"},
    {"id": "1", "label": "id 1", "rank": "first"},
    {"id": "2", "label": "Query XForce", "rank": "first"},
    {"id": "3", "label": "Format Results"},
    {"id": "4", "label": "Search Splunk"},
    {"id": "5", "label": "Descripcion del punto"},
    {"id": "6", "label": "Email Results"}
  ]
}

Tu tarea es procesar el siguiente texto y devolver un objeto JSON siguiendo el mismo formato, 
en el cual extraigas los conceptos importantes como nodos y establezcas las relaciones 
o conexiones entre ellos (traducidas en "links"). A continuación se te proporcionará 
el texto; por favor, analiza el contenido, identifica las entidades clave y sus relaciones, 
y genera el mapa conceptual en el formato JSON especificado.

  
  Texto: ${text}
    `;
}


getFlashCardPrompt(text: string): string {
  return `Extrae la información del siguiente texto para crear tarjetas flash que incluyan tanto una pregunta con huecos y su respuesta completada, como preguntas y respuestas completas. El resultado debe ser un JSON EXACTO siguiendo el siguiente esquema, sin ningún texto o comentario adicional:

[
  {
    "question": "La bandera de Venezuela tiene franjas ____ (color) en la parte superior, ____ (color) en el centro y ____ (color) en la parte inferior.",
    "answer": "amarillo azul rojo",
    "flipped": false
  },
  {
    "question": "Pregunta completa",
    "answer": "Respuesta completa dividas por una coma",
    "flipped": false
  }
]

Texto: ${text}`;
}


  
  
  
  
}  
