/**
 * @license
 * Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

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
   * The declarations of a module.
   *
   * For documentation purposes, all declarations that are reachable from
   * exports should be described here. Ie, functions and objects that may be
   * properties of exported objects, or passed as arguments to functions.
   */
  declarations?: Array<Declaration>;

}

export type Declaration = WebWidgetApplicationDeclaration;

/**
 * A reference to an export of a module.
 *
 * All references are required to be publically accessible, so the canonical
 * representation of a reference is the export it's available from.
 *
 * `package` should generally refer to an npm package name. If `package` is
 * undefined then the reference is local to this package. If `module` is
 * undefined the reference is local to the containing module.
 *
 * References to global symbols like `Array`, `HTMLElement`, or `Event` should
 * use a `package` name of `"global:"`.
 */
export interface Reference {
  name: string;
  package?: string;
  module?: string;
}

/**
 * A reference to the source of a declaration or member.
 */
export interface SourceReference {
  /**
   * An absolute URL to the source (ie. a GitHub URL).
   */
  href: string;
}

/**
 * A description of a web widget application.
 */
export type WebWidgetApplicationDeclaration = {

  /**
   * The parameters that this element is known to understand.
   */
  parameters?: Parameter[];

  portals?: Portal[],

  /**
   * The shadow dom content slots that this element accepts.
   */
  slots?: Slot[];

  cssParts?: CssPart[];

  cssProperties?: CssCustomProperty[];

  demos?: Demo[];

  data?: Data;

  sandboxed?: boolean;

  // TODO sharedDependencies
}

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
   * The type that the attribute will be serialized/deserialized as.
   */
  type?: Type;

  /**
   * The default value of the attribute, if any.
   *
   * As parameters are always strings, this is the actual value, not a human
   * readable description.
   */
  default?: string;
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

export interface Type {
  /**
   * The full string representation of the type, in whatever type syntax is
   * used, such as JSDoc, Closure, or TypeScript.
   */
  text: string;

  /**
   * An array of references to the types in the type string.
   *
   * These references have optional indices into the type string so that tools
   * can understand the references in the type string independently of the type
   * system and syntax. For example, a documentation viewer could display the
   * type `Array<FooElement | BarElement>` with cross-references to `FooElement`
   * and `BarElement` without understanding arrays, generics, or union types.
   */
  references?: TypeReference[];

  source?: SourceReference;
}

/**
 * A reference that is associated with a type string and optionally a range
 * within the string.
 *
 * Start and end must both be present or not present. If they're present, they
 * are indices into the associated type string. If they are missing, the entire
 * type string is the symbol referenced and the name should match the type
 * string.
 */
export interface TypeReference extends Reference {
  start?: number;
  end?: number;
}

/**
 * The common interface of variables, class fields, and function
 * parameters.
 */
export interface PropertyLike {
  name: string;

  /**
   * A markdown summary suitable for display in a listing.
   */
  summary?: string;

  /**
   * A markdown description of the field.
   */
  description?: string;

  type?: Type;

  default?: string;
}

export interface Parameter extends PropertyLike {
  /**
   * Whether the parameter is optional. Undefined implies non-optional.
   */
  optional?: boolean;
}

export interface Demo {
  /**
   * A markdown description of the demo.
   */
  description?: string;

  /**
   * Relative URL of the demo if it's published with the package. Absolute URL
   * if it's hosted.
   */
  url: string;

  source?: SourceReference;
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
  type?: Type;

  /**
   * The default value of the data, if any.
   *
   * This is the actual value, not a human readable description.
   */
  default?: object;
}
