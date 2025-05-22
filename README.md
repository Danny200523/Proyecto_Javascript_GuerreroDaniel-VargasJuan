# F1 Simulator Project

## Descripción del Proyecto

Este proyecto consiste en una aplicación web interactiva titulada **F1 Simulator**, diseñada con un estilo visual futurista, enfocada en proporcionar información detallada sobre equipos y pilotos actuales de Fórmula 1. El diseño fue realizado utilizando Figma, y puedes acceder al archivo original aquí:

👉 [**Enlace al diseño en Figma**](https://www.figma.com/design/5Rg8oGb2wKA8mgbUdWxUfm/F1_Simulator?node-id=0-1&t=lndWNdKVdqUdpTR2-1)

---

## Estructura del Proyecto

```
Proyecto_Javascript_GuerreroDaniel-VargasJuan/
├── data.json               # Archivo de datos en formato JSON con equipos y pilotos
├── index.html              # Página principal (login)
├── STORAGE/                # Carpeta que contiene recursos multimedia
│   ├── ff.mp4              # Video de fondo de la interfaz
│   └── img-dash/           # Imágenes utilizadas en la interfaz
├── styles/                 # Hojas de estilo CSS
├── scripts/                # Scripts JavaScript para funcionalidad dinámica
└── README.md               # Documentación del proyecto
```

---

## Funcionalidades Principales

* **Interfaz de Inicio de Sesión Futurista**: Visualmente atractiva con video de fondo, diseñada para ofrecer una experiencia inmersiva.
* **Visualización de Equipos y Pilotos**: Muestra información detallada de los equipos actuales de F1, como país, motor, logo y pilotos.

---

## Datos Importantes (`data.json`)

El archivo `data.json` es crucial, pues almacena toda la información referente a los equipos de Fórmula 1 y sus respectivos pilotos. La estructura sigue este formato:

```json
"equipos": [
    {
        "id": 1,
        "nombre": "Red Bull Racing",
        "bg_default": "URL de imagen",
        "pais": "Austria",
        "motor": "Honda",
        "logo": "URL del logo",
        "pilotos": [1, 2]
    },
    ...
]
```

Cada piloto está referenciado por su ID, el cual corresponde a otro listado detallado dentro del mismo archivo.

---

## Advertencias y Notas Importantes ⚠️

* **Dependencias Externas**:

  * Fuentes externas cargadas desde Google Fonts.
  * Iconos provenientes de Font Awesome.
  * Imágenes alojadas externamente; asegúrate de mantener la accesibilidad.

* **Compatibilidad**:

  * Se recomienda utilizar navegadores actualizados para una mejor experiencia visual.
  * Revisar la compatibilidad con dispositivos móviles debido al uso intensivo de recursos visuales.

* **Recursos Multimedia**:

  * El video de fondo puede afectar el rendimiento en equipos de bajos recursos. Considerar optimizar o ofrecer opciones alternativas.

---

## Instalación y Uso Local 🚀

Para ejecutar localmente:

1. Clona o descarga el proyecto desde GitHub.
2. Abre el archivo `index.html` en tu navegador favorito.
3. Asegúrate de mantener la estructura de archivos intacta para evitar errores en la carga de recursos.

---

## Créditos 📌

* **Daniel Guerrero & Juan Vargas**
* Diseño original en [Figma](https://www.figma.com/design/5Rg8oGb2wKA8mgbUdWxUfm/F1_Simulator?node-id=0-1&t=lndWNdKVdqUdpTR2-1)

---

📢 **¡Disfruta explorando la emoción de la Fórmula 1 con esta interfaz única y dinámica!** 🏎️💨
