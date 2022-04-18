# Mutation para editar datos en servidor de GraphQL

[https://www.youtube.com/watch?v=abRe0M7L5yo&ab_channel=midudev](https://www.youtube.com/watch?v=abRe0M7L5yo&ab_channel=midudev)

## Mutación para cambiar la edad

```graphql
type Mutation {
    createPerson(name: String!, age: Int!, country: String!): Person
    editAge(name: String!, age: Int): Person
  }
```

Cuando hacemos una mutación de un objeto, lo que devolvemos es otra vez ese objeto

```graphql
editAge: (root, args) => {
      const personIndex = persons.findIndex(
        (person) => person.name === args.name
      );
      if (personIndex === -1) return null;
      const person = persons[personIndex];
      const updatedPerson =  { ...person, age: args.age };
      persons[personIndex] = updatedPerson;
      return updatedPerson;
    },
```

Explicación del código anterior

- Vamos a recuperar la persona que le pasamos por el argumento
- Si el indice es -1 significa que no lo hemos encontrado asi que retornamos null
- Si existe, lo que hacemos es recuperar el array de la persona con el indice
- una vez que se obtuvo la persona, creamos un nuevo objeto, donde estan todas las propiedades de la persona, pero el telefono es el que le estamos pasando como parametro
- Ahora con el array de personas , en la posición donde encontramos la persona, le asignamos el update person

### Editar todos los campos

```graphql
edit: (root, args) => {
      const { id, input } = args;
      const personIndex = persons.findIndex((p) => p.id === id);
      if (personIndex === -1) throw new Error("Person not found");
      const person = persons[personIndex];
      const updatedPerson = { ...person, ...input };
      persons[personIndex] = updatedPerson;
      return updatedPerson;
    },
```

En el caso de las mutaciones, es necesario siempre poner un input

```graphql
type Info {
    county: String!
    name: String!
  }

  input InfoInput {
    county: String
    name: String
  }

  type Person {
    name: String!
    age: Int
    country: String!
    info: Info!
    id: ID!
  }

  input PersonInput {
    name: String
    age: Int
    country: String
    info: InfoInput
  }
```

![Untitled](Mutation%20p%205fddc/Untitled.png)