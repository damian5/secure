module.exports = {
  "env": {
      "browser": true,
      "es6": true,
      "node": true,
      "jest/globals": true,
  },
  "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
  ],
  "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": 2018,
      "sourceType": "module"
  },
  "plugins": [
      "react",
      "jest"
  ],
  "overrides": [{
      "parser": "@typescript-eslint/parser", // Specifies the ESLint parser
      "files": ["*.ts", "*.tsx", ".*.ts", ".*.tsx"],
      "extends": [
          "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
          "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        //   "prettier/@typescript-eslint", // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        //   "plugin:prettier/recommended" // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
      ],
      "rules": {
          "@typescript-eslint/explicit-function-return-type": "off",
          "react/prop-types": "off",
          "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
          "react-hooks/exhaustive-deps": "warn" // Checks effect dependencies
      }
  }, ],
  "rules": {
      "indent": [
          "error",
          2
      ],
      "linebreak-style": [
          "error",
          "unix"
      ],
      "quotes": [
          "error",
          "single"
      ],
      "semi": [
          "error",
          "always"
      ],
      "@typescript-eslint/interface-name-prefix": [
          "error",
          {
              "prefixWithI": "always"
          }
      ],
  },
  "settings": {
      "react": {
          "version": "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
      }
  }
};