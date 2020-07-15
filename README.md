## Secure
  PWA for saving passwords and saving your bank balance

## Features
  - Base template made with [React](https://github.com/facebook/react/) and [TypeScript](https://github.com/microsoft/TypeScript).
  - API connections with [Firebase](https://firebase.google.com/docs)
  - UI managed with [Material UI](https://github.com/mui-org/material-ui).
  - Styling with [Styled-component](https://github.com/styled-components/styled-components).
  - Identation made with [Eslint](https://github.com/eslint/eslint).
  - Forms and validations managed with [React Final Form](https://github.com/final-form/react-final-form) and [Yup](https://github.com/jquense/yup)

## Getting started

  ```
  git clone https://github.com/damian5/secure
  cd secure
  yarn
  ```

  ```
  npm start
  ```

  Then open `http://localhost:3000/` to see your app.

## Deployment
  This project has continuous integration (CI) and continuous deployment (CD)
  [Circle CI](https://circleci.com/), the deployment will be triggered to Firebase when the branch gets merged into Development

## Local Deployment
  If you need to try the build in your local machine run:

  ```
    npm run build
  ```

  ```
    serve -s build
  ```

  Then open http://localhost:5000/ to see your app

  You have to get serve installed globally: [Serve](https://github.com/zeit/serve)

## Structure overview
  ```
    ├── README.md
    ├── scripts
    ├── public
    ├── src
    │   ├── assets
    │   ├── components
    │   ├── config
    │   ├── constant
    │   ├── helpers
    │   ├── mocks
    │   ├── services
    │   ├── style
    │   ├── types
    │   ├── App.tsx
    │   ├── index.tsx
    │   ├── routes.tsx
    │   ├── serviceWorker.ts
    │   ├── setupTest.ts
    ├── typings
    ├── .eslintrc.js
    ├── .prettierrc.js
    ├── appspec.yml
    ├── bitbucket-pipelines.yml
    ├── package.json
    ├── tsconfig.json
    └── package-lock.json
  ```