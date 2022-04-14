import { ApolloServer, UserInputError, gql } from "apollo-server";
import { v1 as uuid } from "uuid";

//Es indiferente de donde salgan los datos:
const persons = [
  {
    name: "Juan", //name: 'Juan',
    //age: 20,
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
  enum YesNo {
    YES
    NO
  }
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
    allPersons(age: YesNo): [Person]!
    findPerson(name: String!): Person
  }
  type Mutation {
    createPerson(name: String!, age: Int!, country: String!): Person
    editAge(name: String!, age: Int): Person
  }
`;

//Cuando yo le pido una persona, De donde saca los datos?w
const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: (root, args) => {
      if (!args.age) return persons;
      const byAge = (person) => (args.age === "YES" ? person.age : !person.age);
      return persons.filter(byAge);
    },
    findPerson: (root, args) => {
      const { name } = args;
      return persons.find((person) => person.name === name);
    },
  },

  //Esta es una mutacion
  Mutation: {
    createPerson: (root, args) => {
      if (persons.find((person) => person.name === args.name)) {
        throw new UserInputError("Person already exists", {
          invalidArgs: args.name,
        });
      }
      //const { name, age, country } = args;
      const person = { ...args, id: uuid() };

      persons.push(person); //update dabase
      return person;
    },

    editAge: (root, args) => {
      const personIndex = persons.findIndex(
        (person) => person.name === args.name
      );
      if (personIndex === -1) return null;
      const person = persons[personIndex];
      const updatedPerson = (person = { ...person, age: args.age });
      persons[personIndex] = updatedPerson;
      return updatedPerson;
    },
  },

  Person: {
    info: (root) => {
      return {
        county: root.country,
        name: root.name,
      };
    },
  },
};

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
