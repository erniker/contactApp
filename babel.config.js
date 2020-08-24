module.exports = {
  plugins: [
    "@babel/plugin-syntax-object-rest-spread",
    [
      "module-resolver",
      {
        alias: {
          test: "./test",
          "@": "./src"
        }
      }
    ]
  ],
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current"
        }
      }
    ]
  ],
  ignore: ["node_modules"]
};
