module.exports = {
  presets: [
    "@babel/preset-flow",
    [
      "@babel/preset-env",
      {
        targets: {
          node: "11.0.0"
        }
      }
    ]
  ],

  plugins: [
    // ['@babel/plugin-transform-runtime', {}],
    "babel-plugin-transform-dev-warning",
    "@babel/plugin-proposal-optional-chaining"
  ]
}
