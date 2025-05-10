import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PromptService {

constructor() { }

getTitutloPrompt(text: string, type: string): string {
  return `
    Genera un título breve que resuma el siguiente texto de manera clara. 
    Solo proporciona el título sin ninguna explicación ni detalles adicionales.
    Texto: 
    ${text}

    Devuelve el título en el siguiente formato JSON:

    {
      "title": "titulo breve"
    }
  `;
}



getQuizPrompt(texto: string, num_preguntas:number, num_options:number, preguntas_generadas:any): string {
  console.log(num_options)
  let text_preguntas_generadas = `- no vuelvas a hacer estas preguntas ${preguntas_generadas} `
  return `
  Genera ${num_preguntas} preguntas basadas en el siguiente texto, cumpliendo estrictamente estas instrucciones:
  ${preguntas_generadas.length > 0 ? text_preguntas_generadas : ''}
  - La pregunta debe estar basada exclusivamente en el texto proporcionado.
  - Devuelve únicamente un objeto JSON válido, sin ningún texto adicional.
  - Debe generarse exactamente **${num_preguntas}** preguntas.
  - Cada pregunta debe incluir una única respuesta correcta.
  - Cada pregunta debe incluir exactamente **${num_options - 1}**  respuestas incorrectas.
  - Una explicación detallada del porque es correcta.
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
  Eres un asistente en análisis de textos y generación de mapas conceptuales.
  Tu tarea es extraer los conceptos clave y sus relaciones del siguiente texto, organizándolos según la siguiente estructura:

  1. Debe haber un nodo principal que resuma el tema general del mapa conceptual.
  2. Para cada punto relevante del tema:
      • Crea un nodo que sirva como título corto o subtítulo del punto.
      • Crea un nodo que contenga una descripción extendida y detallada del punto.
      • Si el punto tiene atributos o características específicas, para cada atributo:
            ▪ Crea un nodo con el nombre del atributo.
            ▪ Crea otro nodo que ofrezca una descripción profunda de dicho atributo.
  3. **Color**:
      • Cada grupo de nodos que pertenece a un mismo punto (incluyendo el nodo título, la descripción y, de haber atributos, los nodos relacionados) debe tener la misma propiedad de "color".
      • Los colores asignados deben ser tonos oscuros que combinen entre sí, ya que el color del texto será blanco y se requiere buen contraste.
      • El color puede determinarse de forma aleatoria o basado en alguna lógica, pero asegúrate de que todos los nodos correspondientes a un mismo punto tengan idéntico valor en la propiedad "color".

  La salida debe ser un JSON con dos propiedades principales:
    - "nodes": un arreglo de objetos, donde cada objeto debe incluir:
         - "id": un identificador único (cadena).
         - "label": el título o descripción del nodo.
         - "color": el color asignado al nodo.
    - "links": un arreglo de objetos que representan las conexiones entre nodos. Cada objeto debe incluir:
         - "source": el id del nodo origen.
         - "target": el id del nodo destino.

  Ejemplo de salida:
  {
    "nodes": [
      { "id": "main", "label": "Tema general del mapa conceptual", "color": "#FF5733" },
      { "id": "point1", "label": "Punto clave 1", "color": "#33FF57" },
      { "id": "detail1", "label": "Descripción extendida: Información detallada acerca del punto clave 1.", "color": "#33FF57" },
      { "id": "attributes1", "label": "Atributos de punto clave 1", "color": "#33FF57" },
      { "id": "attribute_name1", "label": "Atributo 1", "color": "#33FF57" },
      { "id": "attribute_detail1", "label": "Detalle profundo del atributo 1.", "color": "#33FF57" }
    ],
    "links": [
      { "source": "main", "target": "point1" },
      { "source": "point1", "target": "detail1" },
      { "source": "point1", "target": "attributes1" },
      { "source": "attributes1", "target": "attribute_name1" },
      { "source": "attribute_name1", "target": "attribute_detail1" }
    ]
  }

  Analiza el siguiente texto y genera el mapa conceptual en formato JSON siguiendo esta estructura. Devuelve únicamente el JSON generado, sin texto adicional.

  Texto: ${text}
  `;
}

getFlashCardPrompt(text: string): string {
  return `Extrae la información del siguiente texto para crear **hasta 20** tarjetas flash que incluyan:
        - Preguntas con huecos (de una, dos o hasta tres palabras) y su respuesta completada.
        - Preguntas completas y respuestas completas.

        El resultado debe ser un JSON EXACTO con el siguiente esquema, sin ningún texto o comentario adicional, y sin exceder las 20 entradas:

        [
          {
            "question": "La bandera de Venezuela tiene franjas ____ (color) en la parte superior, ____ (color) en el centro y ____ (color) en la parte inferior.",
            "answer": "amarillo, azul, rojo",
            "flipped": false
          },
          {
            "question": "¿Cuál es la capital de Francia?",
            "answer": "París",
            "flipped": false
          },
          {
            "question": "La fotosíntesis ocurre en los ____. ",
            "answer": "cloroplastos",
            "flipped": false
          }
        ]

        Texto: ${text}`;
}


}  
