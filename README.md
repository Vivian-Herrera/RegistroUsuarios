# 🧩 Sistema de Autenticación de Usuarios — Vue.js + Node.js + Docker + KIND + Kubernetes

## 📋 Descripción general

Este proyecto implementa un **sistema de autenticación de usuarios** que permite registrar, iniciar sesión y gestionar credenciales de forma segura.  
La arquitectura está basada en contenedores Docker y se despliega tanto en **Docker Swarm** como en **Kubernetes (KIND)**.

---

## 🧱 Arquitectura general

**Componentes principales:**

| Servicio | Descripción | Tecnología | Puerto interno | Puerto externo |
|-----------|--------------|-------------|----------------|----------------|
| **frontend** | Interfaz web (formulario login/registro) | Vue.js (sirve con Nginx) | 80 | 8080 |
| **backend-api** | API REST con autenticación y persistencia | Node.js + Express | 3000 | 3001 |
| **db** | Archivo local `users.json` persistente | JSON (almacenado en volumen) | — | — |

La comunicación entre servicios se realiza mediante una red interna Docker (`auth-net`).  
En Kubernetes, se exponen servicios `ClusterIP` y `NodePort` para acceder desde el host.

---

## ⚙️ Requisitos previos

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas:

| Herramienta | Requisito mínimo | Notas |
|--------------|------------------|--------|
| Docker Desktop | Última versión (con WSL2 activado) | Debe estar ejecutándose (“Engine running”) |
| WSL2 (Ubuntu) | Versión 2 | Se usa para ejecutar comandos Linux |
| kubectl | v1.29+ | Cliente de Kubernetes |
| kind | v0.20+ | Kubernetes IN Docker |
| Node.js (opcional)** | v20+ | Solo si deseas probar fuera de Docker |

---

## Puesta en marcha

### 🔹 1. Clonar el repositorio

```bash
git clone https://github.com/Vivian-Herrera/RegistroUsuarios.git
cd RegistroUsuarios
