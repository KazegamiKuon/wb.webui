# Summary of the React Typescript Application creation

To work in react application, you need install [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

## Create react-redux-typescript

- Run script to install react application with redux and typescript.

> `npx create-react-app my-app --template redux-typescript`

- Prettier help us to auto format and organize code. Add file `.prettierrc` at root and copy config from [Prettier](https://prettier.io/playground/).

- To combile, we add source path to [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).

```json
{
  "compilerOptions": {
    ...
    "baseUrl": "./src"
  },
  ...
}
```

- Creating base folder `components`, `constants`, `hooks`, `api`, `utils` in `src` folder.