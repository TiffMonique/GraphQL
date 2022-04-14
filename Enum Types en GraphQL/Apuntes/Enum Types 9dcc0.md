# Enum Types en GraphQL

[https://www.youtube.com/watch?v=W63nU-co5cA&ab_channel=midudev](https://www.youtube.com/watch?v=W63nU-co5cA&ab_channel=midudev)

En GraphQL existe otra forma de crear Datos, y es a través de los ENUMS

## Definir ENUM en las TYPE DEFINITIONS

```graphql
enum YesNo{
	YES
	NO
}
```

Ahora este Enum que hemos definido lo vamos a usar como parametro para la Query

EN EL RESOLVER:

```graphql
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
}
```

Me filtra las personas que **SI** tienen teléfono

![Untitled](Enum%20Types%209dcc0/Untitled.png)

Juan NO tiene telefono:

![Untitled](Enum%20Types%209dcc0/Untitled%201.png)

[GraphQL/Enum Types en GraphQL at main · TiffMonique/GraphQL](https://github.com/TiffMonique/GraphQL/tree/main/Enum%20Types%20en%20GraphQL)