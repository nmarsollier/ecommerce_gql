import {
  ApolloGateway,
  IntrospectAndCompose,
  RemoteGraphQLDataSource,
} from "@apollo/gateway";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
    request.http.headers.set("Authorization", context?.token || "");
  }
}

const services = [
  {
    name: "AuthService",
    url: process.env.AUTH_SERVICE_URL || "http://localhost:4000/query",
  },
  {
    name: "ImageService",
    url: process.env.IMAGE_SERVICE_URL || "http://localhost:4001/query",
  },
  {
    name: "CatalogService",
    url: process.env.CATALOG_SERVICE_URL || "http://localhost:4002/query",
  },
  {
    name: "CartService",
    url: process.env.CART_SERVICE_URL || "http://localhost:4003/query",
  },
  {
    name: "OrderService",
    url: process.env.ORDER_SERVICE_URL || "http://localhost:4004/query",
  },
];

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: services,
  }),
  buildService({ url }) {
    return new AuthenticatedDataSource({ url });
  },
});

const server = new ApolloServer({
  gateway,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4080 },
  context: async ({ req, res }) => {
    const token = req.headers.authorization || "";
    return { token };
  },
});
console.log(`🚀  Server ready at ${url}`);
