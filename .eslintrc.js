module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: ["plugin:vue/recommended"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "no-console": "off",
    "no-debugger": "off"
    // "import/no-unresolved": 0
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
