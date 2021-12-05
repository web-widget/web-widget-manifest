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
   * The Markdown to use for the main readme of this package.
   *
   * This can be used to override the readme used by Github or npm if that
   * file contains information irrelevant to web widget application catalogs
   * and documentation viewers.
   */
  readme?: string;

  /**
   * An array of the modules this package contains.
   */
  modules: Array<Module>;
}

// This type may expand in the future to include JavaScript, JSON, CSS, or HTML
// modules.
export type Module = WebWidgetApplication;

export interface WebWidgetApplication {
  kind: 'web-widget-application';

  path: string;

  /**
   * A markdown summary suitable for display in a listing.
   */
  summary?: string;

  /**
   * A markdown description of the module.
   */
  description?: string;

  /**
   * The declaration of a module.
   */
  declaration?: Declaration;
}

export type Declaration = WebWidgetApplicationDeclaration;

/**
 * A description of a web widget application.
 */
export type WebWidgetApplicationDeclaration = {

  /**
   * The parameters that this element is known to understand.
   */
  parameters?: Parameter[];

  portals?: Portal[];

  /**
   * The shadow dom content slots that this element accepts.
   */
  slots?: Slot[];

  cssParts?: CssPart[];

  cssProperties?: CssCustomProperty[];

  data?: Data;

  sandboxed?: boolean;

  // TODO features, locales, sharedDependencies, placeholder, fallback, width, height
};

export interface Parameter {
  name: string;

  /**
   * A markdown summary suitable for display in a listing.
   */
  summary?: string;

  /**
   * A markdown description.
   */
  description?: string;

  /**
   * The default value of the attribute, if any.
   *
   * As parameters are always strings, this is the actual value, not a human
   * readable description.
   */
  default?: string;

  /**
   * Whether the parameter is optional. Undefined implies non-optional.
   */
  optional?: boolean;
}

export interface Portal {
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

export interface Data {
  name: string;

  /**
   * A markdown summary suitable for display in a listing.
   */
  summary?: string;

  /**
   * A markdown description.
   */
  description?: string;

  /**
   * The type that the data will be serialized/deserialized as.
   */
  declaration?: JSONSchema;

  /**
   * The default value of the data, if any.
   *
   * This is the actual value, not a human readable description.
   */
  default?: object;
}
