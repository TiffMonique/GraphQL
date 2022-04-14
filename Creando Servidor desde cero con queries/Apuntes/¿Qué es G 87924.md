# ¿Qué es GraphQL? Creando un servidor desde cero con queries

[https://www.youtube.com/watch?v=QG-qbmW-wes&t=135s&ab_channel=midudev](https://www.youtube.com/watch?v=QG-qbmW-wes&t=135s&ab_channel=midudev)

# Primer Servidor GraphQL

```bash
npm init -y
```

![Untitled](%C2%BFQue%CC%81%20es%20G%2087924/Untitled.png)

## Instalación de dependencias: Iniciar un Proyecto

[Introduction to Apollo Server](https://www.apollographql.com/docs/apollo-server/)

**Apollo Server es un servidor GraphQL [de código abierto](https://github.com/apollographql/apollo-server)** que cumple con las especificaciones y es compatible con cualquier cliente GraphQL, incluido [Apollo Client](https://www.apollographql.com/docs/react) . Es la mejor manera de crear una API de GraphQL autodocumentada y lista para la producción que puede usar datos de cualquier fuente.

```python
npm i apollo-server graphql
```

Modificar el package.json agregar la siguiente Linea:

```python
"type":"module"  en el package para que se utilice el emma scrip module
```

Crear una Archivo index.js. Donde pondremos los datos a los que queremos hacer las consultas:

![Untitled](%C2%BFQue%CC%81%20es%20G%2087924/Untitled%201.png)

![Untitled](%C2%BFQue%CC%81%20es%20G%2087924/Untitled%202.png)

Una vez que ya tenemos los datos, vamos a describir los datos para ello necesitaremos Graphql. Por lo cual es necesario importarlo:

```graphql
import { gql } from "apollo-server";
```

## Definiciones de Datos

```graphql
//Debemos de describir los datos con graphql:
//gql lo que hace es ejecutar un string
//   Si queremos hacer peticiones a graphql, debemos de describir las peticiones
//El signo de exclamacion es para declarar que algo es obligatorio

const typeDefinitions = gql`
  type Person {
    name: String!
    age: Int
    country: String!
    info: Info!
    id: ID!
  }

Cuando queremos hacer peticiones tenemos un typeQuery
  type Query {
    personCount: Int!
    allPersons: [Person]!
    findPerson(name: String!): Person
  }
`;
```

En GraphQL tenemos : Las definiciones de los datos, y de donde sacamos estos datos

En el Código anterior cuando a la Query le pedimos el `personCount`  de donde saca el numero `Int`? Para ello vamos a crear una Constante que se llamara resolvers:

## Resolvers

```graphql
const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: () => persons
  },
```

## Creación Del Servidor

En la definición de datos, la constante siempre debe de llamarse `typeDefs`, en caso que le hayamos puesto otro nombre debemos pasarlo en la definición del servidor. De igual forma para los `resolvers`

```graphql
//Creacion del Servidor
const server = new ApolloServer({
  typeDefs: typeDefinitions,
  resolvers,
});
```

## Iniciar el Servidor

```graphql
//iniciondo el servidor
//listen inicializa y luego devuelve una promesa y recuperamos la url del servidor

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
```

## Correr el Servidor

```graphql
node index.js
```

![Untitled](%C2%BFQue%CC%81%20es%20G%2087924/Untitled%203.png)

Colocar la ruta [http://localhost](http://localhost):4000/ en nuestro navegador

![Untitled](%C2%BFQue%CC%81%20es%20G%2087924/Untitled%204.png)

## Comandos útiles en nuestro GraphQL playGround

| Comando | Función |
| --- | --- |
| crtl+space | saldrá un Autocomplete |
|  |  |

![Untitled](%C2%BFQue%CC%81%20es%20G%2087924/Untitled%205.png)

## Haciendo una Query en GraphQL

El lenguaje de consultas de GraphQL esta basado en brackets {} asi que para hacer una debemos utilizarlos

![Untitled](%C2%BFQue%CC%81%20es%20G%2087924/Untitled%206.png)

## Selección de Subcampos:

Cuando queremos recuperar allPersons que es una array de personas tenemos que decirle que campos queremos extraer.

![Untitled](%C2%BFQue%CC%81%20es%20G%2087924/Untitled%207.png)

Practicar con el **Ejemplo: API SPACEX**

[https://api.spacex.land/graphql/](https://api.spacex.land/graphql/)

---

### Agregando un Find Person a nuestra Query

```graphql
type Query {
    personCount: Int!
    allPersons: [Person]!
    findPerson(name: String!): Person
  }
```

## Resolviendo la Query

findPerson recibe root, args y retorna la persona con el nombre que le demos

```graphql
const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: () => persons,
    findPerson: (root, args) => {
      const { name } = args;
      return persons.find((person) => person.name === name);
    },
  },
}
```

Para Recuperar le damos el nombre de la persona y el campo a recuperar de dicha persona. En esta caso country

![Untitled](%C2%BFQue%CC%81%20es%20G%2087924/Untitled%208.png)

Si no encuentra la persona devuelve null

![Untitled](%C2%BFQue%CC%81%20es%20G%2087924/Untitled%209.png)

Apollo Server tiene un resolver por defecto que nos busca la propiedad que le mandamos y retorna el valor.

## Resolvers Complejos

Quiero resolver un campo que retorne el name + el country. Para poder acceder a ellos tenemos que describirlos

```graphql
Person: {
   
    info: (root) => `${root.country}, ${root.name}`,
    check: () => "minu",
  },
```

En la definición debemos de agregar los campos

```graphql
type Person {
    name: String!
    age: Int
    country: String!
    info: String!
    check: String!
    id: ID!
  }
```

![Untitled](%C2%BFQue%CC%81%20es%20G%2087924/Untitled%2010.png)

En GraphQL es mejor trabajar con objetos , así que el código anterior de la info de la persona lo vamos a transformar en un objeto

Definición:

```graphql
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
```

Resolver

```graphql
Person: {
   info: (root) => {
      return {
       county: root.country,
         name: root.name,
       };
  }
},
```

![Untitled](%C2%BFQue%CC%81%20es%20G%2087924/Untitled%2011.png)

[GraphQL/Creando Servidor desde cero con queries at main · TiffMonique/GraphQL](https://github.com/TiffMonique/GraphQL/tree/main/Creando%20Servidor%20desde%20cero%20con%20queries)