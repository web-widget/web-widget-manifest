# web-widget-manifest
A file format for describing web widget application.

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

In order to allow tools to find npm packages with web widget application manifests without having to download package tarballs, packages should have a `"webWidgets"` field in their `package.json` that points to the manifest:

```json
{
  "name": "example-package",
  "webWidgets": "custom-elements.json",
}
```

## Schema Versioning

The schema has a `schemaVersion` field in the top-level object to facilitate
evolution of the schema. The schema follows [semver](https://semver.org/) versioning, the current schema version is `1.0.0`.

This version will not always match the npm package version, as some changes to the npm package might not have changes to the schema. We will publish a list of schema versions and their associated npm versions and git tags.