![Lucidly Logo](https://i.imgur.com/V1AGT6x.png)

A filesystem watcher for local Dreamtsoft codebases. Keeps local changes in sync with the Dreamtsoft filesystem.
</br>
</br>

## Installation

Install lucidly globally.

```sh
yarn add global lucidly
```

## Configuration

Add lucidly configuration to your `package.json`.

```json
{
  "lucidly": {
    "access": {
      "url": "https://foo.dreamtsoft.com",
      "space": "Bar",
      "bundle": "baz",
      "username": "tim",
      "password": "timrox"
    }
  }
}
```

## Usage

```sh
lucidly
```
