// Logica para trabjar con archivos y rutas del proyecto

// importacion de modulos

import { fileURLToPath } from "url";
import { dirname, join } from "path";

// -Obtener el nombre del archivo actual
const __filename = fileURLToPath(import.meta.url); // Convierte la URL del módulo en una ruta de archivo

// -Obtener el directorio actual
const __dirname = join(dirname(__filename), "../../../"); // Obtiene el directorio del archivo actual y con join sube dos niveles para situarse en la raiz del proyecto Utils -> api -> src /

export { __dirname, join };
