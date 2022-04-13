import { ApolloServer, gql } from "apollo-server";
import { v1 as uuid } from "uuid";

//Es indiferente de donde salgan los datos:
const persons = [
  {
    name: "Juan", //name: 'Juan',
    age: 20, //age: 20,
    country: "MX", //country: 'MX'
    id: "defrgrovkr",
  },
  {
    name: "Pedro", //name: 'Pedro',
    age: 30, //age: 30,
    country: "MX", //country: 'MX'
    id: "defrgrovks",
  },
  {
    name: "Maria", //name: 'Maria',
    age: 25, //age: 25,
    country: "MX", //country: 'MX'
    id: "defrgrovkp",
  },
];

//Debemos de describir los datos con graphql:
//gql lo que hace es ejecutar un string
//   Si queremos hacer peticiones a graphql, debemos de describir las peticiones
//El signo de exclamacion es para declarar que algo es obligatorio
const typeDefinitions = gql`
  type Info {
    county: String!
    name: String!
  }
  type Person {
    name: String!
    age: Int
    country: String!
    info: Info!
    id: ID!
  }
  type Query {
    personCount: Int!
    allPersons: [Person]!
    findPerson(name: String!): Person
  }
  type Mutation {
    createPerson(name: String!, age: Int!, country: String!): Person
  }
`;

//Cuando yo le pido una persona, De donde saca los datos?w
const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: () => persons,
    findPerson: (root, args) => {
      const { name } = args;
      return persons.find((person) => person.name === name);
    },
  },
  Person: {
    info: (root) => {
      return {
        county: root.country,
        name: root.name,
      };
    },
    // canDrink: (root) => {
    //   root.age >= 18 ? "yes" : "no";
    // },
    // info: (root) => {
    //   return `${root.country} ${root.name}`;
    // },
    //check: () => "minu",
  },
};

//Esta es una mutacion
Mutation: {
  createPerson: (root, args) => {
    //const { name, age, country } = args;
    const person = { ...args, id: uuid() };

    persons.push(person);
    return person;
  };
}
//Creacion del Servidor
const server = new ApolloServer({
  typeDefs: typeDefinitions,
  resolvers,
});

//iniciondo el servidor
//listen inicializa y luego devuelve una promesa y recuperamos la url del servidor
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
