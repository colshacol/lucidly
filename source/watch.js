import fs from "fs"
import sane from "sane"
import path from "path"
import chokidar from "chokidar"
import pathExists from "path-exists"
import { createDreamtsoftClient } from "dsfs-remote"

const cwdPackage = require(`${process.cwd()}/package.json`)
const dsfsRemote = createDreamtsoftClient(cwdPackage.lucidly.access)

const handleChange = (data) => {
  fs.readFile(data.lucidlyData.fullPath, "utf8", (error, content) => {
    if (error) {
      throw error
      return console.log("LUCIDLY DEVELOPER MUST HANDLE THIS ERROR, YO.")
    }

    const handleSuccess = (responseData) => {
      console.log(`lucidly pushed contents of ${data.dsData.fullPath}.`)
    }

    const handleError = (error) => {
      throw error
    }

    dsfsRemote
      .writeFile(data.dsData.fullPath, content)
      .then(handleSuccess)
      .catch(handleError)
  })
}

const handleAdd = (data) => {
  handleChange(data)
}

const handleDelete = (data) => {
  const handleSuccess = (responseData) => {
    console.log(`lucidly deleted ${data.dsData.fullPath}.`)
  }

  dsfsRemote
    .deleteFile(data.dsData.fullPath)
    .then(handleSuccess)
    .catch((error) => console.log(error))
}

export const watch = (directoryPath, options) => {
  var watcher = sane(directoryPath, { glob: options.watchPatterns })
  const dsDirectory = "/" + directoryPath.split("/").reverse()[0]

  const getDsPath = (target) => {
    return `${dsDirectory}/${target}`
  }

  const getDsData = (filePath) => {
    const fileName = filePath.split("/").reverse()[0]
    const fullPath = getDsPath(filePath)
    const directoryPath = fullPath.replace(fileName, "")

    return {
      directory: dsDirectory,
      directoryPath,
      fileName,
      fullPath,
      filePath
    }
  }

  const getLucidlyData = (filePath) => {
    return {
      fullPath: path.resolve(directoryPath, filePath)
    }
  }

  watcher.on("ready", () => {
    console.log(`lucidly developing ${dsDirectory}`)
  })

  watcher.on("change", (filepath, root, stat) => {
    const dsData = getDsData(filepath)
    const lucidlyData = getLucidlyData(filepath)
    console.log("lucidly detected a change to " + dsData.fullPath)

    handleChange({
      dsData,
      lucidlyData,
      root,
      // stat,
      filepath,
      directoryPath,
      options
    })
  })

  watcher.on("add", (filepath, root, stat) => {
    const dsData = getDsData(filepath)
    const lucidlyData = getLucidlyData(filepath)
    console.log("lucidly detected a file created at " + dsData.fullPath)

    handleAdd({
      dsData,
      lucidlyData,
      root,
      // stat,
      filepath,
      directoryPath,
      options
    })
  })

  watcher.on("delete", (filepath, root, stat) => {
    const dsData = getDsData(filepath)
    const lucidlyData = getLucidlyData(filepath)
    console.log("lucidly detected a deleted file, " + dsData.fullPath)

    handleDelete({
      dsData,
      lucidlyData,
      root,
      // stat,
      filepath,
      directoryPath,
      options
    })
  })
}
