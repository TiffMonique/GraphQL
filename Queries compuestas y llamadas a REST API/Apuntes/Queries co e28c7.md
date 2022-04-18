# Queries compuestas y llamadas a REST API

[https://www.youtube.com/watch?v=ndQ6nWeQ7A0&ab_channel=midudev](https://www.youtube.com/watch?v=ndQ6nWeQ7A0&ab_channel=midudev)

En una sola query puedo hacer consultas anidadas

No puedo hacer dos veces la misma query dentro de la misma consulta, si queremos hacer eso debemos de agrupar las consultas.

![Untitled](Queries%20co%20e28c7/Untitled.png)

Crearemos un json Server para hacer peticiones a una REST API

[https://github.com/typicode/json-server](https://github.com/typicode/json-server)

```bash
npm install -g json-server
```

![Untitled](Queries%20co%20e28c7/Untitled%201.png)

Crear un archivo db.json, y colocar nuestro JSON.

![Untitled](Queries%20co%20e28c7/Untitled%202.png)

👁️‍🗨️Para transformar un arreglo a JSON ir a consola del navegador y colocar copy(JSON.stringify([arreglo]))

Luego ir al package.json y en la parte de scripts agregar nuestro server

```jsx
"json-server": "json-server --watch db.json",
```

Luego de esto, solo faltaría correr el servidor

```bash
npm run json-server
```

![Untitled](Queries%20co%20e28c7/Untitled%203.png)

![Untitled](Queries%20co%20e28c7/Untitled%204.png)

A partir del JSON hace una REST API

Vamos a instalar en nuestro servidor `axios` para poder hacer la query

```bash
npm install axios
```

En el resolver convertir el allPersons en una función asíncrona, para llamar a la Api que contiene las personas, recuperar la informacion de ahi para utilizarla

```graphql
const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: async (root, args) => {
      const { data: personFromRestAPI } = await axios.get(
        "http://localhost:3000/persons"
      );
      if (!args.age) return personFromRestAPI;
      const byAge = (person) => (args.age === "YES" ? person.age : !person.age);
      return personFromRestAPI.filter(byAge);
    },
    findPerson: (root, args) => {
      const { name } = args;
      return personFromRestAPI.find((person) => person.name === name);
    },
  },
```

![Untitled](Queries%20co%20e28c7/Untitled%205.png)

[GraphQL/Queries compuestas y llamadas a REST API/Practica at main · TiffMonique/GraphQL](https://github.com/TiffMonique/GraphQL/tree/main/Queries%20compuestas%20y%20llamadas%20a%20REST%20API/Practica)