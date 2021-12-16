/**
 * @license
 * Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {JSONSchema7 as JSONSchema} from 'json-schema';

/**
 * The top-level interface of a web widget application manifest file.
 */
export interface Package {
  /**
   * The version of the schema used in this file.
   */
  schemaVersion: string;

  /**
   * Package name.
   */
  name: string;

  /**
   * Package version.
   */
  version: string;

  /**
   * The display name for the extension used in the Marketplace.
   */
  displayName?: string;

  /**
   * ES Module path
   */
  path: string;

  /**
   * SystemJS module path. It exists to solve browser compatibility issues.
   */
  fallbackPath?: string;

  /**
   * A markdown summary suitable for display in a listing.
   */
  summary?: string;

  icons?: Icon[];

  /**
   * The Markdown to use for the main readme of this package.
   *
   * This can be used to override the readme used by Github or npm if that
   * file contains information irrelevant to web widget application catalogs
   * and documentation viewers.
   */
  description?: string;

  /**
   * The shadow dom content slots that this element accepts.
   */
  slots?: Slot[];

  cssParts?: CssPart[];

  cssProperties?: CssCustomProperty[];

  dataSchema?: JSONSchema;

  dataUserInterface?: DataUserInterface;

  /* TODO:
   - categories
   - keywords
   - template || preview || placeholder
   - parameters
   - portals
   - sandboxed
   - features
   - csp
   - resources
   - locales
   - sharedDependencies
   - size
   */
}

/**
 * @see https://www.w3.org/TR/appmanifest/#icons-member
 */
export interface Icon {
  path: string;

  sizes: string;

  type?: string;
}

export interface Slot {
  /**
   * The slot name, or the empty string for an unnamed slot.
   */
  name: string;

  /**
   * A markdown summary suitable for display in a listing.
   */
  summary?: string;

  /**
   * A markdown description.
   */
  description?: string;
}

/**
 * The description of a CSS Part
 */
export interface CssPart {
  name: string;

  /**
   * A markdown summary suitable for display in a listing.
   */
  summary?: string;

  /**
   * A markdown description.
   */
  description?: string;
}

export interface CssCustomProperty {
  /**
   * The name of the property, including leading `--`.
   */
  name: string;

  /**
   * The expected syntax of the defined property. Defaults to "*".
   *
   * The syntax must be a valid CSS [syntax string](https://developer.mozilla.org/en-US/docs/Web/CSS/@property/syntax)
   * as defined in the CSS Properties and Values API.
   *
   * Examples:
   *
   * "<color>": accepts a color
   * "<length> | <percentage>": accepts lengths or percentages but not calc expressions with a combination of the two
   * "small | medium | large": accepts one of these values set as custom idents.
   * "*": any valid token
   */
  syntax?: string;

  default?: string;

  /**
   * A markdown summary suitable for display in a listing.
   */
  summary?: string;

  /**
   * A markdown description.
   */
  description?: string;
}

export {JSONSchema};

/**
 * Read and write data through the user interface
 */
export interface DataUserInterface {
  /**
   * ES Module path
   */
  path: string;

  /**
   * SystemJS module path. It exists to solve browser compatibility issues.
   */
  fallbackPath?: string;

  /* TODO:
   - size?: Size;
   - schema?: UISchema;
   */
}
