#!/usr/bin/env node

import fs from "fs"
import path from "path"
import pathExists from "path-exists"

import { watch } from "./watch"

const watchPatterns = [
  "**/*.js",
  "**/*.es6.js",
  "**/*.jsx",
  "**/*.json",
  "**/*.ts",
  "**/*.tsx",
  "**/*.md",
  "**/*.css",
  "**/*.scss",
  "**/*.sass",
  "**/*.styl",
  "**/*.pcss",
  "**/*.module.css"
]

const directoryPaths = [
  "./components",
  "./modules",
  "./content",
  "./security",
  "./actions",
  "./tests",
  "./auth"
]

const getAbsolutePath = (directoryPath) => {
  return path.resolve(process.cwd(), directoryPath)
}

const getAbsolutePaths = (directoryPaths) => {
  const paths = directoryPaths.map(getAbsolutePath)

  return paths.filter((directoryPath) => {
    return pathExists.sync(directoryPath)
  })
}

const start = (options) => {
  const paths = getAbsolutePaths(options.directoryPaths)

  paths.forEach((directoryPath) => {
    watch(directoryPath, options)
  })
}

start({
  directoryPaths,
  watchPatterns
})
