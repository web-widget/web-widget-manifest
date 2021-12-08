# web-widget-manifest

A file format for describing web widget applications.

The schema is published as a [JSON Schema](https://json-schema.org/) file, in `schema.json`. The schema is written in TypeScript (see [schema.d.ts](https://github.com/web-widget/web-widget-manifest/blob/master/schema.d.ts)) and then compiled to JSON Schema.

# Usage

Install:

```sh
npm i -D @web-widget/manifest
```

Require the JSON Schema:

```ts
const webWidgetManifestSchema = require('@web-widget/manifest');
```

Import the TypeScript types:

```ts
import * as schema from '@web-widget/manifest/schema';
```

## Referencing manifests from npm packages

In order to allow tools to find npm packages with web widget application manifests without having to download package tarballs, packages should have a `"webWidget"` field in their `package.json` that points to the manifest:

```json
{
  "name": "example-package",
  "webWidget": "web-widget.json",
}
```

## Schema Versioning

The schema has a `schemaVersion` field in the top-level object to facilitate
evolution of the schema. The schema follows [semver](https://semver.org/) versioning, the current schema version is `1.0.0`.

This version will not always match the npm package version, as some changes to the npm package might not have changes to the schema. We will publish a list of schema versions and their associated npm versions and git tags.

# Motivation

Many tools need some machine-readable descriptions of web widget applications: IDEs, documentation viewers, linters, graphical design tools, etc.

There have been several efforts in this area, including:

- [Custom Elements Manifest](https://github.com/webcomponents/custom-elements-manifest)
- [Web Application Manifest](https://www.w3.org/TR/appmanifest/)
- [Packaged Web Apps (Widgets)](https://www.w3.org/TR/2018/OBSL-widgets-20181011)
- [Chrome Extensions: Manifest file format](https://developer.chrome.com/docs/extensions/mv3/manifest/)
- [VS Code: Extension Manifest](https://code.visualstudio.com/api/references/extension-manifest)

This repository is an effort to bring together tool owners to standardize on a common specification for a description format.