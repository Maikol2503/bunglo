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

getQuizPrompt(
  texto: string,
  num_preguntas: number,
  num_options: number,
  preguntas_generadas: any
): string {
  const bloqueNoRepetir = preguntas_generadas.length > 0
    ? `- No repitas estas preguntas ya generadas: ${JSON.stringify(preguntas_generadas)}`
    : '';

  // Calcula cuántas de cada tipo (al menos la mitad interrogativas y la mitad con puntos)
  const minInterrogativas = Math.floor(num_preguntas / 2);
  const minPuntos = num_preguntas - minInterrogativas;

  return `
Genera exactamente ${num_preguntas} preguntas de opción múltiple basadas exclusivamente en el siguiente texto:

${bloqueNoRepetir}

Instrucciones generales:
- Cubre siempre aspectos distintos del texto (nada todo en el mismo tema).
- **No** uses expresiones como “según el texto”, “de acuerdo con el texto” ni similares.
- Devuelve **solo** un JSON válido con esta estructura:

[
  {
    "pregunta": "Texto de la pregunta",
    "respuesta_correcta": "Texto de la respuesta correcta",
    "respuestas_incorrectas": ["Incorrecta 1", "Incorrecta 2", "Incorrecta 3"],
    "explicacion": "Explicación breve y argumentada de la respuesta correcta."
  },
  
]

Formato y estilos:
- Al menos ${minInterrogativas} preguntas deben ser **interrogativas** (empezando por ¿…?).
- Al menos ${minPuntos} preguntas deben ser **oraciones incompletas** que terminen en puntos suspensivos…
- Cada pregunta debe tener 1 respuesta correcta y ${num_options - 1} incorrectas.
- Incluye exactamente ${num_preguntas} preguntas, sin texto adicional fuera del JSON.

Texto base:
${texto}
  `.trim();
}

getSumarizePrompt(text: string, modo: string = ''): string {
  const divertido = `
✨ Estilo de resumen: **Divertido con equilibrio** (atractivo pero no exagerado)
😄 Usa un tono cercano, con un toque de humor moderado (nada que parezca forzado o ridículo).
🧠 Incluye ejemplos fáciles de entender o cotidianos que ayuden a comprender el tema (como comparar un algoritmo con una receta de cocina 🍳).
🎯 Usa emojis con sentido, solo si aportan claridad o mejoran la comprensión (por ejemplo: ✅ para listas, 💡 para ideas clave, 📊 para datos).
🚫 Evita exageraciones como gifs de texto o expresiones demasiado emocionadas (“OMG!”, “¡increíbleee!”).
📚 El objetivo es enseñar de forma entretenida, sin perder el foco en lo que importa.
`;

  const promptBase = `Tu tarea es generar un *resumen visual y estructurado* del siguiente texto usando **Markdown** únicamente en las descripciones.

El formato de salida debe ser estrictamente un objeto JSON válido con esta estructura:
- En "resumenes", el título debe tener un icono identificativo.
- En "resumenes", la descripción debe estar en formato Markdown:
{
  "titulo_general": "📘 Título que resume el texto completo",
  "resumenes": [
    {
      "titulo": "Título breve del punto clave",
      "descripcion": "Aquí va el resumen visual con recursos como:\\n- **Negritas** para conceptos clave \\n- ✅ Listas con viñetas\\n- 🔢 Pasos numerados\\n- 📊 Tablas en formato Markdown:\\n  | Concepto | Descripción |\\n  |----------|-------------|\\n  | Ejemplo  | Explicación |",
      "busqueda_youtube": "Frase breve para buscar video"
    },
    ...
  ],
  "frases_busqueda_imagenes_resumen": [
    "Frase 1 para buscar imagen",
    "Frase 2 para buscar imagen",
    "Frase 3 para buscar imagen",
    "Frase 4 para buscar imagen",
    "Frase 5 para buscar imagen"
  ]
}
`;

  const advertenciaFinal = `
⚠️ IMPORTANTE:
- Asegúrate de escapar correctamente todos los saltos de línea como \\n, las comillas dobles como \\", y cualquier otro carácter especial dentro de las cadenas para que el JSON sea válido.
- No agregues explicaciones fuera del JSON.
- Responde solo en *formato JSON válido*.

Aquí está el texto a resumir:
${text}`;

  const finalPrompt =
    promptBase +
    (modo === 'divertido' ? '\n\n' + divertido : '') +
    '\n' +
    advertenciaFinal;

  return finalPrompt;
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
