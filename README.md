<!-- cSpell:language es -->

# Gateway GraphQL

Este gateway GraphQL sirve para combinar todos los microservicios de la catedra Arquitectura de [Microservicios](https://github.com/nmarsollier/ecommerce).

El servidor GraphQL puede navegar en [localhost:4080](http://localhost:4080/)

## Microservicios

- [Seguridad en Go](https://github.com/nmarsollier/authgo)
- [Imágenes en Go](https://github.com/nmarsollier/imagego)
- [Carrito en Go](https://github.com/nmarsollier/cartgo)
- [Catálogo en Go](https://github.com/nmarsollier/cataloggo)
- [Órdenes en Go](https://github.com/nmarsollier/ordersgo)

## Docker

Estos comandos son para dockerizar el microservicio desde el codigo descargado localmente.

### Build

```bash
docker build -t gql_gateway .
```

### El contenedor

Mac | Windows

```bash
docker run -it --name gql_gateway -p 4080:4080 gql_gateway
```

Linux

```bash
docker run --add-host host.docker.internal:172.17.0.1 -it -d --name gql_gateway -p 4080:4080  gql_gateway
```
