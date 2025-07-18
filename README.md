# int_libros

## Iniciar el entorno de desarrollo

Para levantar el entorno de desarrollo, ejecuta (desde la carpeta Backend):

```bash
npm run dev
```

Para levantar la base de datos usando docker, ejecuta (en la terminal):

```bash
docker-compose up --build
```

**Recordar tener configurado el .env**

Para poder visualizar la documentación swagger dirigirse a:

```bash
http://localhost:3000/docs
```

Para visualizar en pgadmin la base de datos dirigirse a: 

```bash
http://localhost:8080
```

Loguearse en pgadmin con los datos:
```bash
username: admin@admin.com
password: admin
```

Asegúrate de tener instaladas las dependencias con:

```bash
npm install
```

---