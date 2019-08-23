const config = {
  input: "source/index.js",
  bundleNodeModules: true,

  output: {
    format: "cjs",
    fileName: "lucidly.js",
    sourceMap: true
  }
}

export default config
