module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "max-len": ["error", { code: 120 }],
    "indent": ["error", 2],
    "object-curly-spacing": ["error", "always"],
    "semi": ["error", "always"],
    "no-console": "off"
  },
};
