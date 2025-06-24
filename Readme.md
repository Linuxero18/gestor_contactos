# 📇 Gestor de Contactos

**Gestor de Contactos** es una aplicación web diseñada para gestionar eficientemente la información de contactos asociados a una empresa. Permite crear, actualizar, visualizar y eliminar registros de contactos que incluyen datos como:

- RUC de la empresa
- Nombre y apellido del contacto
- Correo electrónico
- Teléfono y WhatsApp
- Rol asignado al contacto

---

## 🚀 Tecnologías Utilizadas

### 🧠 Backend
- **Node.js** + **Express 5**
- **MySQL2** para la base de datos
- **CORS**
- **Nodemon** (para desarrollo)

### 🎨 Frontend
- **React 19** + **React Router DOM 7**
- **Vite 6** (para desarrollo rápido)
- **TailwindCSS 4** (estilos modernos y responsivos)
- **Lucide-react** (íconos SVG)
- **SweetAlert2** (alertas amigables)
- **Axios** (llamadas HTTP)

### 📃 Base de Datos
- **MySQL** corriendo localmente con **XAMPP**

---

## 📂 Estructura del Proyecto

```
gestor_contactos/
├── backend/         # API con Node.js y Express
│   └── ...
├── frontend/        # Aplicación React
│   └── ...
├── DEPENDENCIAS.md  # Dependencias organizadas
├── README.md        # Este archivo
```

---

## ⚙️ Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/Linuxero18/gestor_contactos.git
cd gestor_contactos
```

### 2. Instalar dependencias

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd ../frontend
npm install
```

---

## 🛠️ Ejecución

### Iniciar el Backend
```bash
cd backend
nodemon index.js
```

### Iniciar el Frontend
```bash
cd frontend
npm run dev
```

Accede a la app en: [http://localhost:5173](http://localhost:5173)

---

## 📄 Funcionalidades Principales

✅ Crear nuevos contactos  
✅ Editar información existente  
✅ Eliminar contactos con confirmación  
✅ Modal unificado para crear y editar  
✅ Búsqueda y visualización clara  
✅ Roles dinámicos por contacto

---

## 💾 Producción (Build)

Para generar el build de producción del frontend:

```bash
cd frontend
npm run build
```

Los archivos generados estarán en `frontend/dist`.

---

## 📜 Licencia

Este proyecto es de uso público y educativo. Puedes usarlo, modificarlo o adaptarlo a tus necesidades.

---

## ✍️ Autor

**Piter Muñoz Pérez**  
📬 *Desarrollador web full-stack en crecimiento*