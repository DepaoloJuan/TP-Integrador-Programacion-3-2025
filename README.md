# 🧾 TP Integrador - Programación III (2025)

**Proyecto:** Sistema de Autoservicio  
**Integrantes:** Juan y Alejo  
**Docente:** Javier Rodriguez

---

## 📂 Estructura inicial del proyecto

TP-Integrador-Programacion-3-2025/
├─ frontend/ ← Aplicación cliente (autoservicio)
│ ├─ assets/ ← Imágenes, íconos, logos
│ ├─ scripts/ ← Archivos JavaScript (lógica del cliente)
│ ├─ styles/ ← Archivos CSS
│ ├─ index.html ← Página principal (entrada al autoservicio)
│ └─ pages/ (opcional) ← Subpáginas: bienvenida, productos, carrito, ticket
│
├─ backend/ ← Servidor / API / Vistas admin
│ ├─ routes/ ← Endpoints API y rutas web
│ ├─ controllers/ ← Lógica de negocio
│ ├─ models/ ← Tablas y conexión MySQL
│ ├─ views/ ← Vistas EJS (login, dashboard)
│ └─ server.js ← Arranque del servidor Express
│
└─ README.md

---

## 🧠 Descripción general

### 🟢 Frontend

Aplicación tipo autoservicio donde el usuario puede:

1. Ingresar su nombre (pantalla de bienvenida).
2. Ver y seleccionar productos (pantalla de productos).
3. Administrar su carrito (sumar, restar, eliminar productos).
4. Confirmar compra → generar ticket en PDF y registrar venta en la base de datos mediante la API.

👉 En esta etapa, el frontend reutiliza el **primer parcial**, pero ahora consumiendo la **API REST** del propio backend.

---

### 🟣 Backend

Servidor Node.js con Express que:

- Expone una **API REST** conectada a MySQL.
- Proporciona datos al frontend (productos, ventas, usuarios).
- Renderiza vistas **EJS** para el **panel de administración** (login, dashboard, ABM productos).

---

### 🗄️ Base de datos (MySQL)

Tablas mínimas:

- `productos` → id, nombre, precio, tipo (A/B), imagen, activo
- `ventas` → id, fecha, total, cliente_nombre
- `ventas_productos` → venta_id, producto_id, cantidad, precio_unitario
- `usuarios` → id, correo, clave_hash, rol

---

## ✅ Próximos pasos

- [ ] Crear estructura de carpetas base (front y back).
- [ ] Reutilizar el código del **1° Parcial** en `frontend/`.
- [ ] Crear `scripts/api.js` en frontend para consumir la API.
- [ ] Configurar servidor Express en backend.
- [ ] Crear tablas en MySQL (productos, ventas, usuarios).
- [ ] Conectar backend con MySQL (ORM o mysql2).
- [ ] Probar comunicación front ↔ back (`fetch` a API REST).

---

## 🧑‍💻 Créditos

Desarrollado por **Juan y Alejo**  
Cátedra: **Javier Rodriguez – UTN FRGP**
