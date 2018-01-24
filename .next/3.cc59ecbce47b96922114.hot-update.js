webpackHotUpdate(3,{

/***/ 2259:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.2.0
 * react-dom-server.browser.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

var invariant = __webpack_require__(33);
var _assign = __webpack_require__(56);
var React = __webpack_require__(17);
var emptyFunction = __webpack_require__(31);
var emptyObject = __webpack_require__(86);
var hyphenateStyleName = __webpack_require__(358);
var memoizeStringOnly = __webpack_require__(2260);
var warning = __webpack_require__(34);
var checkPropTypes = __webpack_require__(57);
var camelizeStyleName = __webpack_require__(360);

/**
 * WARNING: DO NOT manually require this module.
 * This is a replacement for `invariant(...)` used by the error code system
 * and will _only_ be required by the corresponding babel pass.
 * It always throws.
 */

// These attributes should be all lowercase to allow for
// case insensitive checks
var RESERVED_PROPS = {
  children: true,
  dangerouslySetInnerHTML: true,
  defaultValue: true,
  defaultChecked: true,
  innerHTML: true,
  suppressContentEditableWarning: true,
  suppressHydrationWarning: true,
  style: true
};

function checkMask(value, bitmask) {
  return (value & bitmask) === bitmask;
}

var DOMPropertyInjection = {
  /**
   * Mapping from normalized, camelcased property names to a configuration that
   * specifies how the associated DOM property should be accessed or rendered.
   */
  MUST_USE_PROPERTY: 0x1,
  HAS_BOOLEAN_VALUE: 0x4,
  HAS_NUMERIC_VALUE: 0x8,
  HAS_POSITIVE_NUMERIC_VALUE: 0x10 | 0x8,
  HAS_OVERLOADED_BOOLEAN_VALUE: 0x20,
  HAS_STRING_BOOLEAN_VALUE: 0x40,

  /**
   * Inject some specialized knowledge about the DOM. This takes a config object
   * with the following properties:
   *
   * Properties: object mapping DOM property name to one of the
   * DOMPropertyInjection constants or null. If your attribute isn't in here,
   * it won't get written to the DOM.
   *
   * DOMAttributeNames: object mapping React attribute name to the DOM
   * attribute name. Attribute names not specified use the **lowercase**
   * normalized name.
   *
   * DOMAttributeNamespaces: object mapping React attribute name to the DOM
   * attribute namespace URL. (Attribute names not specified use no namespace.)
   *
   * DOMPropertyNames: similar to DOMAttributeNames but for DOM properties.
   * Property names not specified use the normalized name.
   *
   * DOMMutationMethods: Properties that require special mutation methods. If
   * `value` is undefined, the mutation method should unset the property.
   *
   * @param {object} domPropertyConfig the config as described above.
   */
  injectDOMPropertyConfig: function (domPropertyConfig) {
    var Injection = DOMPropertyInjection;
    var Properties = domPropertyConfig.Properties || {};
    var DOMAttributeNamespaces = domPropertyConfig.DOMAttributeNamespaces || {};
    var DOMAttributeNames = domPropertyConfig.DOMAttributeNames || {};
    var DOMMutationMethods = domPropertyConfig.DOMMutationMethods || {};

    for (var propName in Properties) {
      !!properties.hasOwnProperty(propName) ? invariant(false, "injectDOMPropertyConfig(...): You're trying to inject DOM property '%s' which has already been injected. You may be accidentally injecting the same DOM property config twice, or you may be injecting two configs that have conflicting property names.", propName) : void 0;

      var lowerCased = propName.toLowerCase();
      var propConfig = Properties[propName];

      var propertyInfo = {
        attributeName: lowerCased,
        attributeNamespace: null,
        propertyName: propName,
        mutationMethod: null,

        mustUseProperty: checkMask(propConfig, Injection.MUST_USE_PROPERTY),
        hasBooleanValue: checkMask(propConfig, Injection.HAS_BOOLEAN_VALUE),
        hasNumericValue: checkMask(propConfig, Injection.HAS_NUMERIC_VALUE),
        hasPositiveNumericValue: checkMask(propConfig, Injection.HAS_POSITIVE_NUMERIC_VALUE),
        hasOverloadedBooleanValue: checkMask(propConfig, Injection.HAS_OVERLOADED_BOOLEAN_VALUE),
        hasStringBooleanValue: checkMask(propConfig, Injection.HAS_STRING_BOOLEAN_VALUE)
      };
      !(propertyInfo.hasBooleanValue + propertyInfo.hasNumericValue + propertyInfo.hasOverloadedBooleanValue <= 1) ? invariant(false, "DOMProperty: Value can be one of boolean, overloaded boolean, or numeric value, but not a combination: %s", propName) : void 0;

      if (DOMAttributeNames.hasOwnProperty(propName)) {
        var attributeName = DOMAttributeNames[propName];

        propertyInfo.attributeName = attributeName;
      }

      if (DOMAttributeNamespaces.hasOwnProperty(propName)) {
        propertyInfo.attributeNamespace = DOMAttributeNamespaces[propName];
      }

      if (DOMMutationMethods.hasOwnProperty(propName)) {
        propertyInfo.mutationMethod = DOMMutationMethods[propName];
      }

      // Downcase references to whitelist properties to check for membership
      // without case-sensitivity. This allows the whitelist to pick up
      // `allowfullscreen`, which should be written using the property configuration
      // for `allowFullscreen`
      properties[propName] = propertyInfo;
    }
  }
};

/* eslint-disable max-len */
var ATTRIBUTE_NAME_START_CHAR = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
/* eslint-enable max-len */
var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040";


var ROOT_ATTRIBUTE_NAME = 'data-reactroot';

/**
 * Map from property "standard name" to an object with info about how to set
 * the property in the DOM. Each object contains:
 *
 * attributeName:
 *   Used when rendering markup or with `*Attribute()`.
 * attributeNamespace
 * propertyName:
 *   Used on DOM node instances. (This includes properties that mutate due to
 *   external factors.)
 * mutationMethod:
 *   If non-null, used instead of the property or `setAttribute()` after
 *   initial render.
 * mustUseProperty:
 *   Whether the property must be accessed and mutated as an object property.
 * hasBooleanValue:
 *   Whether the property should be removed when set to a falsey value.
 * hasNumericValue:
 *   Whether the property must be numeric or parse as a numeric and should be
 *   removed when set to a falsey value.
 * hasPositiveNumericValue:
 *   Whether the property must be positive numeric or parse as a positive
 *   numeric and should be removed when set to a falsey value.
 * hasOverloadedBooleanValue:
 *   Whether the property can be used as a flag as well as with a value.
 *   Removed when strictly equal to false; present without a value when
 *   strictly equal to true; present with a value otherwise.
 */
var properties = {};

/**
 * Checks whether a property name is a writeable attribute.
 * @method
 */
function shouldSetAttribute(name, value) {
  if (isReservedProp(name)) {
    return false;
  }
  if (name.length > 2 && (name[0] === 'o' || name[0] === 'O') && (name[1] === 'n' || name[1] === 'N')) {
    return false;
  }
  if (value === null) {
    return true;
  }
  switch (typeof value) {
    case 'boolean':
      return shouldAttributeAcceptBooleanValue(name);
    case 'undefined':
    case 'number':
    case 'string':
    case 'object':
      return true;
    default:
      // function, symbol
      return false;
  }
}

function getPropertyInfo(name) {
  return properties.hasOwnProperty(name) ? properties[name] : null;
}

function shouldAttributeAcceptBooleanValue(name) {
  if (isReservedProp(name)) {
    return true;
  }
  var propertyInfo = getPropertyInfo(name);
  if (propertyInfo) {
    return propertyInfo.hasBooleanValue || propertyInfo.hasStringBooleanValue || propertyInfo.hasOverloadedBooleanValue;
  }
  var prefix = name.toLowerCase().slice(0, 5);
  return prefix === 'data-' || prefix === 'aria-';
}

/**
 * Checks to see if a property name is within the list of properties
 * reserved for internal React operations. These properties should
 * not be set on an HTML element.
 *
 * @private
 * @param {string} name
 * @return {boolean} If the name is within reserved props
 */
function isReservedProp(name) {
  return RESERVED_PROPS.hasOwnProperty(name);
}

var injection = DOMPropertyInjection;

var MUST_USE_PROPERTY = injection.MUST_USE_PROPERTY;
var HAS_BOOLEAN_VALUE = injection.HAS_BOOLEAN_VALUE;
var HAS_NUMERIC_VALUE = injection.HAS_NUMERIC_VALUE;
var HAS_POSITIVE_NUMERIC_VALUE = injection.HAS_POSITIVE_NUMERIC_VALUE;
var HAS_OVERLOADED_BOOLEAN_VALUE = injection.HAS_OVERLOADED_BOOLEAN_VALUE;
var HAS_STRING_BOOLEAN_VALUE = injection.HAS_STRING_BOOLEAN_VALUE;

var HTMLDOMPropertyConfig = {
  // When adding attributes to this list, be sure to also add them to
  // the `possibleStandardNames` module to ensure casing and incorrect
  // name warnings.
  Properties: {
    allowFullScreen: HAS_BOOLEAN_VALUE,
    // specifies target context for links with `preload` type
    async: HAS_BOOLEAN_VALUE,
    // Note: there is a special case that prevents it from being written to the DOM
    // on the client side because the browsers are inconsistent. Instead we call focus().
    autoFocus: HAS_BOOLEAN_VALUE,
    autoPlay: HAS_BOOLEAN_VALUE,
    capture: HAS_OVERLOADED_BOOLEAN_VALUE,
    checked: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    cols: HAS_POSITIVE_NUMERIC_VALUE,
    contentEditable: HAS_STRING_BOOLEAN_VALUE,
    controls: HAS_BOOLEAN_VALUE,
    'default': HAS_BOOLEAN_VALUE,
    defer: HAS_BOOLEAN_VALUE,
    disabled: HAS_BOOLEAN_VALUE,
    download: HAS_OVERLOADED_BOOLEAN_VALUE,
    draggable: HAS_STRING_BOOLEAN_VALUE,
    formNoValidate: HAS_BOOLEAN_VALUE,
    hidden: HAS_BOOLEAN_VALUE,
    loop: HAS_BOOLEAN_VALUE,
    // Caution; `option.selected` is not updated if `select.multiple` is
    // disabled with `removeAttribute`.
    multiple: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    muted: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    noValidate: HAS_BOOLEAN_VALUE,
    open: HAS_BOOLEAN_VALUE,
    playsInline: HAS_BOOLEAN_VALUE,
    readOnly: HAS_BOOLEAN_VALUE,
    required: HAS_BOOLEAN_VALUE,
    reversed: HAS_BOOLEAN_VALUE,
    rows: HAS_POSITIVE_NUMERIC_VALUE,
    rowSpan: HAS_NUMERIC_VALUE,
    scoped: HAS_BOOLEAN_VALUE,
    seamless: HAS_BOOLEAN_VALUE,
    selected: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    size: HAS_POSITIVE_NUMERIC_VALUE,
    start: HAS_NUMERIC_VALUE,
    // support for projecting regular DOM Elements via V1 named slots ( shadow dom )
    span: HAS_POSITIVE_NUMERIC_VALUE,
    spellCheck: HAS_STRING_BOOLEAN_VALUE,
    // Style must be explicitly set in the attribute list. React components
    // expect a style object
    style: 0,
    // Keep it in the whitelist because it is case-sensitive for SVG.
    tabIndex: 0,
    // itemScope is for for Microdata support.
    // See http://schema.org/docs/gs.html
    itemScope: HAS_BOOLEAN_VALUE,
    // These attributes must stay in the white-list because they have
    // different attribute names (see DOMAttributeNames below)
    acceptCharset: 0,
    className: 0,
    htmlFor: 0,
    httpEquiv: 0,
    // Attributes with mutation methods must be specified in the whitelist
    // Set the string boolean flag to allow the behavior
    value: HAS_STRING_BOOLEAN_VALUE
  },
  DOMAttributeNames: {
    acceptCharset: 'accept-charset',
    className: 'class',
    htmlFor: 'for',
    httpEquiv: 'http-equiv'
  },
  DOMMutationMethods: {
    value: function (node, value) {
      if (value == null) {
        return node.removeAttribute('value');
      }

      // Number inputs get special treatment due to some edge cases in
      // Chrome. Let everything else assign the value attribute as normal.
      // https://github.com/facebook/react/issues/7253#issuecomment-236074326
      if (node.type !== 'number' || node.hasAttribute('value') === false) {
        node.setAttribute('value', '' + value);
      } else if (node.validity && !node.validity.badInput && node.ownerDocument.activeElement !== node) {
        // Don't assign an attribute if validation reports bad
        // input. Chrome will clear the value. Additionally, don't
        // operate on inputs that have focus, otherwise Chrome might
        // strip off trailing decimal places and cause the user's
        // cursor position to jump to the beginning of the input.
        //
        // In ReactDOMInput, we have an onBlur event that will trigger
        // this function again when focus is lost.
        node.setAttribute('value', '' + value);
      }
    }
  }
};

var HAS_STRING_BOOLEAN_VALUE$1 = injection.HAS_STRING_BOOLEAN_VALUE;


var NS = {
  xlink: 'http://www.w3.org/1999/xlink',
  xml: 'http://www.w3.org/XML/1998/namespace'
};

/**
 * This is a list of all SVG attributes that need special casing,
 * namespacing, or boolean value assignment.
 *
 * When adding attributes to this list, be sure to also add them to
 * the `possibleStandardNames` module to ensure casing and incorrect
 * name warnings.
 *
 * SVG Attributes List:
 * https://www.w3.org/TR/SVG/attindex.html
 * SMIL Spec:
 * https://www.w3.org/TR/smil
 */
var ATTRS = ['accent-height', 'alignment-baseline', 'arabic-form', 'baseline-shift', 'cap-height', 'clip-path', 'clip-rule', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'dominant-baseline', 'enable-background', 'fill-opacity', 'fill-rule', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'glyph-name', 'glyph-orientation-horizontal', 'glyph-orientation-vertical', 'horiz-adv-x', 'horiz-origin-x', 'image-rendering', 'letter-spacing', 'lighting-color', 'marker-end', 'marker-mid', 'marker-start', 'overline-position', 'overline-thickness', 'paint-order', 'panose-1', 'pointer-events', 'rendering-intent', 'shape-rendering', 'stop-color', 'stop-opacity', 'strikethrough-position', 'strikethrough-thickness', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke-width', 'text-anchor', 'text-decoration', 'text-rendering', 'underline-position', 'underline-thickness', 'unicode-bidi', 'unicode-range', 'units-per-em', 'v-alphabetic', 'v-hanging', 'v-ideographic', 'v-mathematical', 'vector-effect', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'word-spacing', 'writing-mode', 'x-height', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xmlns:xlink', 'xml:lang', 'xml:space'];

var SVGDOMPropertyConfig = {
  Properties: {
    autoReverse: HAS_STRING_BOOLEAN_VALUE$1,
    externalResourcesRequired: HAS_STRING_BOOLEAN_VALUE$1,
    preserveAlpha: HAS_STRING_BOOLEAN_VALUE$1
  },
  DOMAttributeNames: {
    autoReverse: 'autoReverse',
    externalResourcesRequired: 'externalResourcesRequired',
    preserveAlpha: 'preserveAlpha'
  },
  DOMAttributeNamespaces: {
    xlinkActuate: NS.xlink,
    xlinkArcrole: NS.xlink,
    xlinkHref: NS.xlink,
    xlinkRole: NS.xlink,
    xlinkShow: NS.xlink,
    xlinkTitle: NS.xlink,
    xlinkType: NS.xlink,
    xmlBase: NS.xml,
    xmlLang: NS.xml,
    xmlSpace: NS.xml
  }
};

var CAMELIZE = /[\-\:]([a-z])/g;
var capitalize = function (token) {
  return token[1].toUpperCase();
};

ATTRS.forEach(function (original) {
  var reactName = original.replace(CAMELIZE, capitalize);

  SVGDOMPropertyConfig.Properties[reactName] = 0;
  SVGDOMPropertyConfig.DOMAttributeNames[reactName] = original;
});

injection.injectDOMPropertyConfig(HTMLDOMPropertyConfig);
injection.injectDOMPropertyConfig(SVGDOMPropertyConfig);

// TODO: this is special because it gets imported during build.

var ReactVersion = '16.2.0';

var describeComponentFrame = function (name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
};

var ReactInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

var ReactCurrentOwner = ReactInternals.ReactCurrentOwner;
var ReactDebugCurrentFrame = ReactInternals.ReactDebugCurrentFrame;

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol['for'];





var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol['for']('react.fragment') : 0xeacb;

// code copied and modified from escape-html
/**
 * Module variables.
 * @private
 */

var matchHtmlRegExp = /["'&<>]/;

/**
 * Escapes special characters and HTML entities in a given html string.
 *
 * @param  {string} string HTML string to escape for later insertion
 * @return {string}
 * @public
 */

function escapeHtml(string) {
  var str = '' + string;
  var match = matchHtmlRegExp.exec(str);

  if (!match) {
    return str;
  }

  var escape;
  var html = '';
  var index = 0;
  var lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34:
        // "
        escape = '&quot;';
        break;
      case 38:
        // &
        escape = '&amp;';
        break;
      case 39:
        // '
        escape = '&#x27;'; // modified from escape-html; used to be '&#39'
        break;
      case 60:
        // <
        escape = '&lt;';
        break;
      case 62:
        // >
        escape = '&gt;';
        break;
      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
}
// end code copied and modified from escape-html

/**
 * Escapes text to prevent scripting attacks.
 *
 * @param {*} text Text value to escape.
 * @return {string} An escaped string.
 */
function escapeTextForBrowser(text) {
  if (typeof text === 'boolean' || typeof text === 'number') {
    // this shortcircuit helps perf for types that we know will never have
    // special characters, especially given that this function is used often
    // for numeric dom ids.
    return '' + text;
  }
  return escapeHtml(text);
}

/**
 * Escapes attribute value to prevent scripting attacks.
 *
 * @param {*} value Value to escape.
 * @return {string} An escaped string.
 */
function quoteAttributeValueForBrowser(value) {
  return '"' + escapeTextForBrowser(value) + '"';
}

// isAttributeNameSafe() is currently duplicated in DOMPropertyOperations.
// TODO: Find a better place for this.
var VALID_ATTRIBUTE_NAME_REGEX = new RegExp('^[' + ATTRIBUTE_NAME_START_CHAR + '][' + ATTRIBUTE_NAME_CHAR + ']*$');
var illegalAttributeNameCache = {};
var validatedAttributeNameCache = {};
function isAttributeNameSafe(attributeName) {
  if (validatedAttributeNameCache.hasOwnProperty(attributeName)) {
    return true;
  }
  if (illegalAttributeNameCache.hasOwnProperty(attributeName)) {
    return false;
  }
  if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) {
    validatedAttributeNameCache[attributeName] = true;
    return true;
  }
  illegalAttributeNameCache[attributeName] = true;
  {
    warning(false, 'Invalid attribute name: `%s`', attributeName);
  }
  return false;
}

// shouldIgnoreValue() is currently duplicated in DOMPropertyOperations.
// TODO: Find a better place for this.
function shouldIgnoreValue(propertyInfo, value) {
  return value == null || propertyInfo.hasBooleanValue && !value || propertyInfo.hasNumericValue && isNaN(value) || propertyInfo.hasPositiveNumericValue && value < 1 || propertyInfo.hasOverloadedBooleanValue && value === false;
}

/**
 * Operations for dealing with DOM properties.
 */

/**
 * Creates markup for the ID property.
 *
 * @param {string} id Unescaped ID.
 * @return {string} Markup string.
 */


function createMarkupForRoot() {
  return ROOT_ATTRIBUTE_NAME + '=""';
}

/**
 * Creates markup for a property.
 *
 * @param {string} name
 * @param {*} value
 * @return {?string} Markup string, or null if the property was invalid.
 */
function createMarkupForProperty(name, value) {
  var propertyInfo = getPropertyInfo(name);
  if (propertyInfo) {
    if (shouldIgnoreValue(propertyInfo, value)) {
      return '';
    }
    var attributeName = propertyInfo.attributeName;
    if (propertyInfo.hasBooleanValue || propertyInfo.hasOverloadedBooleanValue && value === true) {
      return attributeName + '=""';
    } else if (typeof value !== 'boolean' || shouldAttributeAcceptBooleanValue(name)) {
      return attributeName + '=' + quoteAttributeValueForBrowser(value);
    }
  } else if (shouldSetAttribute(name, value)) {
    if (value == null) {
      return '';
    }
    return name + '=' + quoteAttributeValueForBrowser(value);
  }
  return null;
}

/**
 * Creates markup for a custom property.
 *
 * @param {string} name
 * @param {*} value
 * @return {string} Markup string, or empty string if the property was invalid.
 */
function createMarkupForCustomAttribute(name, value) {
  if (!isAttributeNameSafe(name) || value == null) {
    return '';
  }
  return name + '=' + quoteAttributeValueForBrowser(value);
}

var HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
var MATH_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

var Namespaces = {
  html: HTML_NAMESPACE,
  mathml: MATH_NAMESPACE,
  svg: SVG_NAMESPACE
};

// Assumes there is no parent namespace.
function getIntrinsicNamespace(type) {
  switch (type) {
    case 'svg':
      return SVG_NAMESPACE;
    case 'math':
      return MATH_NAMESPACE;
    default:
      return HTML_NAMESPACE;
  }
}

function getChildNamespace(parentNamespace, type) {
  if (parentNamespace == null || parentNamespace === HTML_NAMESPACE) {
    // No (or default) parent namespace: potential entry point.
    return getIntrinsicNamespace(type);
  }
  if (parentNamespace === SVG_NAMESPACE && type === 'foreignObject') {
    // We're leaving SVG.
    return HTML_NAMESPACE;
  }
  // By default, pass namespace below.
  return parentNamespace;
}

var ReactControlledValuePropTypes = {
  checkPropTypes: null
};

{
  var hasReadOnlyValue = {
    button: true,
    checkbox: true,
    image: true,
    hidden: true,
    radio: true,
    reset: true,
    submit: true
  };

  var propTypes = {
    value: function (props, propName, componentName) {
      if (!props[propName] || hasReadOnlyValue[props.type] || props.onChange || props.readOnly || props.disabled) {
        return null;
      }
      return new Error('You provided a `value` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultValue`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
    },
    checked: function (props, propName, componentName) {
      if (!props[propName] || props.onChange || props.readOnly || props.disabled) {
        return null;
      }
      return new Error('You provided a `checked` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultChecked`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
    }
  };

  /**
   * Provide a linked `value` attribute for controlled forms. You should not use
   * this outside of the ReactDOM controlled form components.
   */
  ReactControlledValuePropTypes.checkPropTypes = function (tagName, props, getStack) {
    checkPropTypes(propTypes, props, 'prop', tagName, getStack);
  };
}

// For HTML, certain tags should omit their close tag. We keep a whitelist for
// those special-case tags.

var omittedCloseTags = {
  area: true,
  base: true,
  br: true,
  col: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true
};

// For HTML, certain tags cannot have children. This has the same purpose as
// `omittedCloseTags` except that `menuitem` should still have its closing tag.

var voidElementTags = _assign({
  menuitem: true
}, omittedCloseTags);

var HTML = '__html';

function assertValidProps(tag, props, getStack) {
  if (!props) {
    return;
  }
  // Note the use of `==` which checks for null or undefined.
  if (voidElementTags[tag]) {
    !(props.children == null && props.dangerouslySetInnerHTML == null) ? invariant(false, '%s is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.%s', tag, getStack()) : void 0;
  }
  if (props.dangerouslySetInnerHTML != null) {
    !(props.children == null) ? invariant(false, 'Can only set one of `children` or `props.dangerouslySetInnerHTML`.') : void 0;
    !(typeof props.dangerouslySetInnerHTML === 'object' && HTML in props.dangerouslySetInnerHTML) ? invariant(false, '`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://fb.me/react-invariant-dangerously-set-inner-html for more information.') : void 0;
  }
  {
    warning(props.suppressContentEditableWarning || !props.contentEditable || props.children == null, 'A component is `contentEditable` and contains `children` managed by ' + 'React. It is now your responsibility to guarantee that none of ' + 'those nodes are unexpectedly modified or duplicated. This is ' + 'probably not intentional.%s', getStack());
  }
  !(props.style == null || typeof props.style === 'object') ? invariant(false, 'The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + \'em\'}} when using JSX.%s', getStack()) : void 0;
}

/**
 * CSS properties which accept numbers but are not in units of "px".
 */
var isUnitlessNumber = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};

/**
 * @param {string} prefix vendor-specific prefix, eg: Webkit
 * @param {string} key style name, eg: transitionDuration
 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
 * WebkitTransitionDuration
 */
function prefixKey(prefix, key) {
  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
}

/**
 * Support style names that may come passed in prefixed by adding permutations
 * of vendor prefixes.
 */
var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
// infinite loop, because it iterates over the newly added props too.
Object.keys(isUnitlessNumber).forEach(function (prop) {
  prefixes.forEach(function (prefix) {
    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
  });
});

/**
 * Convert a value into the proper css writable value. The style name `name`
 * should be logical (no hyphens), as specified
 * in `CSSProperty.isUnitlessNumber`.
 *
 * @param {string} name CSS property name such as `topMargin`.
 * @param {*} value CSS property value such as `10px`.
 * @return {string} Normalized style value with dimensions applied.
 */
function dangerousStyleValue(name, value, isCustomProperty) {
  // Note that we've removed escapeTextForBrowser() calls here since the
  // whole string will be escaped when the attribute is injected into
  // the markup. If you provide unsafe user data here they can inject
  // arbitrary CSS which may be problematic (I couldn't repro this):
  // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
  // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
  // This is not an XSS hole but instead a potential CSS injection issue
  // which has lead to a greater discussion about how we're going to
  // trust URLs moving forward. See #2115901

  var isEmpty = value == null || typeof value === 'boolean' || value === '';
  if (isEmpty) {
    return '';
  }

  if (!isCustomProperty && typeof value === 'number' && value !== 0 && !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name])) {
    return value + 'px'; // Presumes implicit 'px' suffix for unitless numbers
  }

  return ('' + value).trim();
}

function isCustomComponent(tagName, props) {
  if (tagName.indexOf('-') === -1) {
    return typeof props.is === 'string';
  }
  switch (tagName) {
    // These are reserved SVG and MathML elements.
    // We don't mind this whitelist too much because we expect it to never grow.
    // The alternative is to track the namespace in a few places which is convoluted.
    // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
    case 'annotation-xml':
    case 'color-profile':
    case 'font-face':
    case 'font-face-src':
    case 'font-face-uri':
    case 'font-face-format':
    case 'font-face-name':
    case 'missing-glyph':
      return false;
    default:
      return true;
  }
}

var warnValidStyle = emptyFunction;

{
  // 'msTransform' is correct, but the other prefixes should be capitalized
  var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;

  // style values shouldn't contain a semicolon
  var badStyleValueWithSemicolonPattern = /;\s*$/;

  var warnedStyleNames = {};
  var warnedStyleValues = {};
  var warnedForNaNValue = false;
  var warnedForInfinityValue = false;

  var warnHyphenatedStyleName = function (name, getStack) {
    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
      return;
    }

    warnedStyleNames[name] = true;
    warning(false, 'Unsupported style property %s. Did you mean %s?%s', name, camelizeStyleName(name), getStack());
  };

  var warnBadVendoredStyleName = function (name, getStack) {
    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
      return;
    }

    warnedStyleNames[name] = true;
    warning(false, 'Unsupported vendor-prefixed style property %s. Did you mean %s?%s', name, name.charAt(0).toUpperCase() + name.slice(1), getStack());
  };

  var warnStyleValueWithSemicolon = function (name, value, getStack) {
    if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
      return;
    }

    warnedStyleValues[value] = true;
    warning(false, "Style property values shouldn't contain a semicolon. " + 'Try "%s: %s" instead.%s', name, value.replace(badStyleValueWithSemicolonPattern, ''), getStack());
  };

  var warnStyleValueIsNaN = function (name, value, getStack) {
    if (warnedForNaNValue) {
      return;
    }

    warnedForNaNValue = true;
    warning(false, '`NaN` is an invalid value for the `%s` css style property.%s', name, getStack());
  };

  var warnStyleValueIsInfinity = function (name, value, getStack) {
    if (warnedForInfinityValue) {
      return;
    }

    warnedForInfinityValue = true;
    warning(false, '`Infinity` is an invalid value for the `%s` css style property.%s', name, getStack());
  };

  warnValidStyle = function (name, value, getStack) {
    if (name.indexOf('-') > -1) {
      warnHyphenatedStyleName(name, getStack);
    } else if (badVendoredStyleNamePattern.test(name)) {
      warnBadVendoredStyleName(name, getStack);
    } else if (badStyleValueWithSemicolonPattern.test(value)) {
      warnStyleValueWithSemicolon(name, value, getStack);
    }

    if (typeof value === 'number') {
      if (isNaN(value)) {
        warnStyleValueIsNaN(name, value, getStack);
      } else if (!isFinite(value)) {
        warnStyleValueIsInfinity(name, value, getStack);
      }
    }
  };
}

var warnValidStyle$1 = warnValidStyle;

var ariaProperties = {
  'aria-current': 0, // state
  'aria-details': 0,
  'aria-disabled': 0, // state
  'aria-hidden': 0, // state
  'aria-invalid': 0, // state
  'aria-keyshortcuts': 0,
  'aria-label': 0,
  'aria-roledescription': 0,
  // Widget Attributes
  'aria-autocomplete': 0,
  'aria-checked': 0,
  'aria-expanded': 0,
  'aria-haspopup': 0,
  'aria-level': 0,
  'aria-modal': 0,
  'aria-multiline': 0,
  'aria-multiselectable': 0,
  'aria-orientation': 0,
  'aria-placeholder': 0,
  'aria-pressed': 0,
  'aria-readonly': 0,
  'aria-required': 0,
  'aria-selected': 0,
  'aria-sort': 0,
  'aria-valuemax': 0,
  'aria-valuemin': 0,
  'aria-valuenow': 0,
  'aria-valuetext': 0,
  // Live Region Attributes
  'aria-atomic': 0,
  'aria-busy': 0,
  'aria-live': 0,
  'aria-relevant': 0,
  // Drag-and-Drop Attributes
  'aria-dropeffect': 0,
  'aria-grabbed': 0,
  // Relationship Attributes
  'aria-activedescendant': 0,
  'aria-colcount': 0,
  'aria-colindex': 0,
  'aria-colspan': 0,
  'aria-controls': 0,
  'aria-describedby': 0,
  'aria-errormessage': 0,
  'aria-flowto': 0,
  'aria-labelledby': 0,
  'aria-owns': 0,
  'aria-posinset': 0,
  'aria-rowcount': 0,
  'aria-rowindex': 0,
  'aria-rowspan': 0,
  'aria-setsize': 0
};

var warnedProperties = {};
var rARIA = new RegExp('^(aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$');
var rARIACamel = new RegExp('^(aria)[A-Z][' + ATTRIBUTE_NAME_CHAR + ']*$');

var hasOwnProperty = Object.prototype.hasOwnProperty;

function getStackAddendum$1() {
  var stack = ReactDebugCurrentFrame.getStackAddendum();
  return stack != null ? stack : '';
}

function validateProperty(tagName, name) {
  if (hasOwnProperty.call(warnedProperties, name) && warnedProperties[name]) {
    return true;
  }

  if (rARIACamel.test(name)) {
    var ariaName = 'aria-' + name.slice(4).toLowerCase();
    var correctName = ariaProperties.hasOwnProperty(ariaName) ? ariaName : null;

    // If this is an aria-* attribute, but is not listed in the known DOM
    // DOM properties, then it is an invalid aria-* attribute.
    if (correctName == null) {
      warning(false, 'Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.%s', name, getStackAddendum$1());
      warnedProperties[name] = true;
      return true;
    }
    // aria-* attributes should be lowercase; suggest the lowercase version.
    if (name !== correctName) {
      warning(false, 'Invalid ARIA attribute `%s`. Did you mean `%s`?%s', name, correctName, getStackAddendum$1());
      warnedProperties[name] = true;
      return true;
    }
  }

  if (rARIA.test(name)) {
    var lowerCasedName = name.toLowerCase();
    var standardName = ariaProperties.hasOwnProperty(lowerCasedName) ? lowerCasedName : null;

    // If this is an aria-* attribute, but is not listed in the known DOM
    // DOM properties, then it is an invalid aria-* attribute.
    if (standardName == null) {
      warnedProperties[name] = true;
      return false;
    }
    // aria-* attributes should be lowercase; suggest the lowercase version.
    if (name !== standardName) {
      warning(false, 'Unknown ARIA attribute `%s`. Did you mean `%s`?%s', name, standardName, getStackAddendum$1());
      warnedProperties[name] = true;
      return true;
    }
  }

  return true;
}

function warnInvalidARIAProps(type, props) {
  var invalidProps = [];

  for (var key in props) {
    var isValid = validateProperty(type, key);
    if (!isValid) {
      invalidProps.push(key);
    }
  }

  var unknownPropString = invalidProps.map(function (prop) {
    return '`' + prop + '`';
  }).join(', ');

  if (invalidProps.length === 1) {
    warning(false, 'Invalid aria prop %s on <%s> tag. ' + 'For details, see https://fb.me/invalid-aria-prop%s', unknownPropString, type, getStackAddendum$1());
  } else if (invalidProps.length > 1) {
    warning(false, 'Invalid aria props %s on <%s> tag. ' + 'For details, see https://fb.me/invalid-aria-prop%s', unknownPropString, type, getStackAddendum$1());
  }
}

function validateProperties(type, props) {
  if (isCustomComponent(type, props)) {
    return;
  }
  warnInvalidARIAProps(type, props);
}

var didWarnValueNull = false;

function getStackAddendum$2() {
  var stack = ReactDebugCurrentFrame.getStackAddendum();
  return stack != null ? stack : '';
}

function validateProperties$1(type, props) {
  if (type !== 'input' && type !== 'textarea' && type !== 'select') {
    return;
  }

  if (props != null && props.value === null && !didWarnValueNull) {
    didWarnValueNull = true;
    if (type === 'select' && props.multiple) {
      warning(false, '`value` prop on `%s` should not be null. ' + 'Consider using an empty array when `multiple` is set to `true` ' + 'to clear the component or `undefined` for uncontrolled components.%s', type, getStackAddendum$2());
    } else {
      warning(false, '`value` prop on `%s` should not be null. ' + 'Consider using an empty string to clear the component or `undefined` ' + 'for uncontrolled components.%s', type, getStackAddendum$2());
    }
  }
}

/**
 * Registers plugins so that they can extract and dispatch events.
 *
 * @see {EventPluginHub}
 */

/**
 * Ordered list of injected plugins.
 */


/**
 * Mapping from event name to dispatch config
 */


/**
 * Mapping from registration name to plugin module
 */
var registrationNameModules = {};

/**
 * Mapping from registration name to event name
 */


/**
 * Mapping from lowercase registration names to the properly cased version,
 * used to warn in the case of missing event handlers. Available
 * only in true.
 * @type {Object}
 */
var possibleRegistrationNames = {};
// Trust the developer to only use possibleRegistrationNames in true

/**
 * Injects an ordering of plugins (by plugin name). This allows the ordering
 * to be decoupled from injection of the actual plugins so that ordering is
 * always deterministic regardless of packaging, on-the-fly injection, etc.
 *
 * @param {array} InjectedEventPluginOrder
 * @internal
 * @see {EventPluginHub.injection.injectEventPluginOrder}
 */


/**
 * Injects plugins to be used by `EventPluginHub`. The plugin names must be
 * in the ordering injected by `injectEventPluginOrder`.
 *
 * Plugins can be injected as part of page initialization or on-the-fly.
 *
 * @param {object} injectedNamesToPlugins Map from names to plugin modules.
 * @internal
 * @see {EventPluginHub.injection.injectEventPluginsByName}
 */

// When adding attributes to the HTML or SVG whitelist, be sure to
// also add them to this module to ensure casing and incorrect name
// warnings.
var possibleStandardNames = {
  // HTML
  accept: 'accept',
  acceptcharset: 'acceptCharset',
  'accept-charset': 'acceptCharset',
  accesskey: 'accessKey',
  action: 'action',
  allowfullscreen: 'allowFullScreen',
  alt: 'alt',
  as: 'as',
  async: 'async',
  autocapitalize: 'autoCapitalize',
  autocomplete: 'autoComplete',
  autocorrect: 'autoCorrect',
  autofocus: 'autoFocus',
  autoplay: 'autoPlay',
  autosave: 'autoSave',
  capture: 'capture',
  cellpadding: 'cellPadding',
  cellspacing: 'cellSpacing',
  challenge: 'challenge',
  charset: 'charSet',
  checked: 'checked',
  children: 'children',
  cite: 'cite',
  'class': 'className',
  classid: 'classID',
  classname: 'className',
  cols: 'cols',
  colspan: 'colSpan',
  content: 'content',
  contenteditable: 'contentEditable',
  contextmenu: 'contextMenu',
  controls: 'controls',
  controlslist: 'controlsList',
  coords: 'coords',
  crossorigin: 'crossOrigin',
  dangerouslysetinnerhtml: 'dangerouslySetInnerHTML',
  data: 'data',
  datetime: 'dateTime',
  'default': 'default',
  defaultchecked: 'defaultChecked',
  defaultvalue: 'defaultValue',
  defer: 'defer',
  dir: 'dir',
  disabled: 'disabled',
  download: 'download',
  draggable: 'draggable',
  enctype: 'encType',
  'for': 'htmlFor',
  form: 'form',
  formmethod: 'formMethod',
  formaction: 'formAction',
  formenctype: 'formEncType',
  formnovalidate: 'formNoValidate',
  formtarget: 'formTarget',
  frameborder: 'frameBorder',
  headers: 'headers',
  height: 'height',
  hidden: 'hidden',
  high: 'high',
  href: 'href',
  hreflang: 'hrefLang',
  htmlfor: 'htmlFor',
  httpequiv: 'httpEquiv',
  'http-equiv': 'httpEquiv',
  icon: 'icon',
  id: 'id',
  innerhtml: 'innerHTML',
  inputmode: 'inputMode',
  integrity: 'integrity',
  is: 'is',
  itemid: 'itemID',
  itemprop: 'itemProp',
  itemref: 'itemRef',
  itemscope: 'itemScope',
  itemtype: 'itemType',
  keyparams: 'keyParams',
  keytype: 'keyType',
  kind: 'kind',
  label: 'label',
  lang: 'lang',
  list: 'list',
  loop: 'loop',
  low: 'low',
  manifest: 'manifest',
  marginwidth: 'marginWidth',
  marginheight: 'marginHeight',
  max: 'max',
  maxlength: 'maxLength',
  media: 'media',
  mediagroup: 'mediaGroup',
  method: 'method',
  min: 'min',
  minlength: 'minLength',
  multiple: 'multiple',
  muted: 'muted',
  name: 'name',
  nonce: 'nonce',
  novalidate: 'noValidate',
  open: 'open',
  optimum: 'optimum',
  pattern: 'pattern',
  placeholder: 'placeholder',
  playsinline: 'playsInline',
  poster: 'poster',
  preload: 'preload',
  profile: 'profile',
  radiogroup: 'radioGroup',
  readonly: 'readOnly',
  referrerpolicy: 'referrerPolicy',
  rel: 'rel',
  required: 'required',
  reversed: 'reversed',
  role: 'role',
  rows: 'rows',
  rowspan: 'rowSpan',
  sandbox: 'sandbox',
  scope: 'scope',
  scoped: 'scoped',
  scrolling: 'scrolling',
  seamless: 'seamless',
  selected: 'selected',
  shape: 'shape',
  size: 'size',
  sizes: 'sizes',
  span: 'span',
  spellcheck: 'spellCheck',
  src: 'src',
  srcdoc: 'srcDoc',
  srclang: 'srcLang',
  srcset: 'srcSet',
  start: 'start',
  step: 'step',
  style: 'style',
  summary: 'summary',
  tabindex: 'tabIndex',
  target: 'target',
  title: 'title',
  type: 'type',
  usemap: 'useMap',
  value: 'value',
  width: 'width',
  wmode: 'wmode',
  wrap: 'wrap',

  // SVG
  about: 'about',
  accentheight: 'accentHeight',
  'accent-height': 'accentHeight',
  accumulate: 'accumulate',
  additive: 'additive',
  alignmentbaseline: 'alignmentBaseline',
  'alignment-baseline': 'alignmentBaseline',
  allowreorder: 'allowReorder',
  alphabetic: 'alphabetic',
  amplitude: 'amplitude',
  arabicform: 'arabicForm',
  'arabic-form': 'arabicForm',
  ascent: 'ascent',
  attributename: 'attributeName',
  attributetype: 'attributeType',
  autoreverse: 'autoReverse',
  azimuth: 'azimuth',
  basefrequency: 'baseFrequency',
  baselineshift: 'baselineShift',
  'baseline-shift': 'baselineShift',
  baseprofile: 'baseProfile',
  bbox: 'bbox',
  begin: 'begin',
  bias: 'bias',
  by: 'by',
  calcmode: 'calcMode',
  capheight: 'capHeight',
  'cap-height': 'capHeight',
  clip: 'clip',
  clippath: 'clipPath',
  'clip-path': 'clipPath',
  clippathunits: 'clipPathUnits',
  cliprule: 'clipRule',
  'clip-rule': 'clipRule',
  color: 'color',
  colorinterpolation: 'colorInterpolation',
  'color-interpolation': 'colorInterpolation',
  colorinterpolationfilters: 'colorInterpolationFilters',
  'color-interpolation-filters': 'colorInterpolationFilters',
  colorprofile: 'colorProfile',
  'color-profile': 'colorProfile',
  colorrendering: 'colorRendering',
  'color-rendering': 'colorRendering',
  contentscripttype: 'contentScriptType',
  contentstyletype: 'contentStyleType',
  cursor: 'cursor',
  cx: 'cx',
  cy: 'cy',
  d: 'd',
  datatype: 'datatype',
  decelerate: 'decelerate',
  descent: 'descent',
  diffuseconstant: 'diffuseConstant',
  direction: 'direction',
  display: 'display',
  divisor: 'divisor',
  dominantbaseline: 'dominantBaseline',
  'dominant-baseline': 'dominantBaseline',
  dur: 'dur',
  dx: 'dx',
  dy: 'dy',
  edgemode: 'edgeMode',
  elevation: 'elevation',
  enablebackground: 'enableBackground',
  'enable-background': 'enableBackground',
  end: 'end',
  exponent: 'exponent',
  externalresourcesrequired: 'externalResourcesRequired',
  fill: 'fill',
  fillopacity: 'fillOpacity',
  'fill-opacity': 'fillOpacity',
  fillrule: 'fillRule',
  'fill-rule': 'fillRule',
  filter: 'filter',
  filterres: 'filterRes',
  filterunits: 'filterUnits',
  floodopacity: 'floodOpacity',
  'flood-opacity': 'floodOpacity',
  floodcolor: 'floodColor',
  'flood-color': 'floodColor',
  focusable: 'focusable',
  fontfamily: 'fontFamily',
  'font-family': 'fontFamily',
  fontsize: 'fontSize',
  'font-size': 'fontSize',
  fontsizeadjust: 'fontSizeAdjust',
  'font-size-adjust': 'fontSizeAdjust',
  fontstretch: 'fontStretch',
  'font-stretch': 'fontStretch',
  fontstyle: 'fontStyle',
  'font-style': 'fontStyle',
  fontvariant: 'fontVariant',
  'font-variant': 'fontVariant',
  fontweight: 'fontWeight',
  'font-weight': 'fontWeight',
  format: 'format',
  from: 'from',
  fx: 'fx',
  fy: 'fy',
  g1: 'g1',
  g2: 'g2',
  glyphname: 'glyphName',
  'glyph-name': 'glyphName',
  glyphorientationhorizontal: 'glyphOrientationHorizontal',
  'glyph-orientation-horizontal': 'glyphOrientationHorizontal',
  glyphorientationvertical: 'glyphOrientationVertical',
  'glyph-orientation-vertical': 'glyphOrientationVertical',
  glyphref: 'glyphRef',
  gradienttransform: 'gradientTransform',
  gradientunits: 'gradientUnits',
  hanging: 'hanging',
  horizadvx: 'horizAdvX',
  'horiz-adv-x': 'horizAdvX',
  horizoriginx: 'horizOriginX',
  'horiz-origin-x': 'horizOriginX',
  ideographic: 'ideographic',
  imagerendering: 'imageRendering',
  'image-rendering': 'imageRendering',
  in2: 'in2',
  'in': 'in',
  inlist: 'inlist',
  intercept: 'intercept',
  k1: 'k1',
  k2: 'k2',
  k3: 'k3',
  k4: 'k4',
  k: 'k',
  kernelmatrix: 'kernelMatrix',
  kernelunitlength: 'kernelUnitLength',
  kerning: 'kerning',
  keypoints: 'keyPoints',
  keysplines: 'keySplines',
  keytimes: 'keyTimes',
  lengthadjust: 'lengthAdjust',
  letterspacing: 'letterSpacing',
  'letter-spacing': 'letterSpacing',
  lightingcolor: 'lightingColor',
  'lighting-color': 'lightingColor',
  limitingconeangle: 'limitingConeAngle',
  local: 'local',
  markerend: 'markerEnd',
  'marker-end': 'markerEnd',
  markerheight: 'markerHeight',
  markermid: 'markerMid',
  'marker-mid': 'markerMid',
  markerstart: 'markerStart',
  'marker-start': 'markerStart',
  markerunits: 'markerUnits',
  markerwidth: 'markerWidth',
  mask: 'mask',
  maskcontentunits: 'maskContentUnits',
  maskunits: 'maskUnits',
  mathematical: 'mathematical',
  mode: 'mode',
  numoctaves: 'numOctaves',
  offset: 'offset',
  opacity: 'opacity',
  operator: 'operator',
  order: 'order',
  orient: 'orient',
  orientation: 'orientation',
  origin: 'origin',
  overflow: 'overflow',
  overlineposition: 'overlinePosition',
  'overline-position': 'overlinePosition',
  overlinethickness: 'overlineThickness',
  'overline-thickness': 'overlineThickness',
  paintorder: 'paintOrder',
  'paint-order': 'paintOrder',
  panose1: 'panose1',
  'panose-1': 'panose1',
  pathlength: 'pathLength',
  patterncontentunits: 'patternContentUnits',
  patterntransform: 'patternTransform',
  patternunits: 'patternUnits',
  pointerevents: 'pointerEvents',
  'pointer-events': 'pointerEvents',
  points: 'points',
  pointsatx: 'pointsAtX',
  pointsaty: 'pointsAtY',
  pointsatz: 'pointsAtZ',
  prefix: 'prefix',
  preservealpha: 'preserveAlpha',
  preserveaspectratio: 'preserveAspectRatio',
  primitiveunits: 'primitiveUnits',
  property: 'property',
  r: 'r',
  radius: 'radius',
  refx: 'refX',
  refy: 'refY',
  renderingintent: 'renderingIntent',
  'rendering-intent': 'renderingIntent',
  repeatcount: 'repeatCount',
  repeatdur: 'repeatDur',
  requiredextensions: 'requiredExtensions',
  requiredfeatures: 'requiredFeatures',
  resource: 'resource',
  restart: 'restart',
  result: 'result',
  results: 'results',
  rotate: 'rotate',
  rx: 'rx',
  ry: 'ry',
  scale: 'scale',
  security: 'security',
  seed: 'seed',
  shaperendering: 'shapeRendering',
  'shape-rendering': 'shapeRendering',
  slope: 'slope',
  spacing: 'spacing',
  specularconstant: 'specularConstant',
  specularexponent: 'specularExponent',
  speed: 'speed',
  spreadmethod: 'spreadMethod',
  startoffset: 'startOffset',
  stddeviation: 'stdDeviation',
  stemh: 'stemh',
  stemv: 'stemv',
  stitchtiles: 'stitchTiles',
  stopcolor: 'stopColor',
  'stop-color': 'stopColor',
  stopopacity: 'stopOpacity',
  'stop-opacity': 'stopOpacity',
  strikethroughposition: 'strikethroughPosition',
  'strikethrough-position': 'strikethroughPosition',
  strikethroughthickness: 'strikethroughThickness',
  'strikethrough-thickness': 'strikethroughThickness',
  string: 'string',
  stroke: 'stroke',
  strokedasharray: 'strokeDasharray',
  'stroke-dasharray': 'strokeDasharray',
  strokedashoffset: 'strokeDashoffset',
  'stroke-dashoffset': 'strokeDashoffset',
  strokelinecap: 'strokeLinecap',
  'stroke-linecap': 'strokeLinecap',
  strokelinejoin: 'strokeLinejoin',
  'stroke-linejoin': 'strokeLinejoin',
  strokemiterlimit: 'strokeMiterlimit',
  'stroke-miterlimit': 'strokeMiterlimit',
  strokewidth: 'strokeWidth',
  'stroke-width': 'strokeWidth',
  strokeopacity: 'strokeOpacity',
  'stroke-opacity': 'strokeOpacity',
  suppresscontenteditablewarning: 'suppressContentEditableWarning',
  suppresshydrationwarning: 'suppressHydrationWarning',
  surfacescale: 'surfaceScale',
  systemlanguage: 'systemLanguage',
  tablevalues: 'tableValues',
  targetx: 'targetX',
  targety: 'targetY',
  textanchor: 'textAnchor',
  'text-anchor': 'textAnchor',
  textdecoration: 'textDecoration',
  'text-decoration': 'textDecoration',
  textlength: 'textLength',
  textrendering: 'textRendering',
  'text-rendering': 'textRendering',
  to: 'to',
  transform: 'transform',
  'typeof': 'typeof',
  u1: 'u1',
  u2: 'u2',
  underlineposition: 'underlinePosition',
  'underline-position': 'underlinePosition',
  underlinethickness: 'underlineThickness',
  'underline-thickness': 'underlineThickness',
  unicode: 'unicode',
  unicodebidi: 'unicodeBidi',
  'unicode-bidi': 'unicodeBidi',
  unicoderange: 'unicodeRange',
  'unicode-range': 'unicodeRange',
  unitsperem: 'unitsPerEm',
  'units-per-em': 'unitsPerEm',
  unselectable: 'unselectable',
  valphabetic: 'vAlphabetic',
  'v-alphabetic': 'vAlphabetic',
  values: 'values',
  vectoreffect: 'vectorEffect',
  'vector-effect': 'vectorEffect',
  version: 'version',
  vertadvy: 'vertAdvY',
  'vert-adv-y': 'vertAdvY',
  vertoriginx: 'vertOriginX',
  'vert-origin-x': 'vertOriginX',
  vertoriginy: 'vertOriginY',
  'vert-origin-y': 'vertOriginY',
  vhanging: 'vHanging',
  'v-hanging': 'vHanging',
  videographic: 'vIdeographic',
  'v-ideographic': 'vIdeographic',
  viewbox: 'viewBox',
  viewtarget: 'viewTarget',
  visibility: 'visibility',
  vmathematical: 'vMathematical',
  'v-mathematical': 'vMathematical',
  vocab: 'vocab',
  widths: 'widths',
  wordspacing: 'wordSpacing',
  'word-spacing': 'wordSpacing',
  writingmode: 'writingMode',
  'writing-mode': 'writingMode',
  x1: 'x1',
  x2: 'x2',
  x: 'x',
  xchannelselector: 'xChannelSelector',
  xheight: 'xHeight',
  'x-height': 'xHeight',
  xlinkactuate: 'xlinkActuate',
  'xlink:actuate': 'xlinkActuate',
  xlinkarcrole: 'xlinkArcrole',
  'xlink:arcrole': 'xlinkArcrole',
  xlinkhref: 'xlinkHref',
  'xlink:href': 'xlinkHref',
  xlinkrole: 'xlinkRole',
  'xlink:role': 'xlinkRole',
  xlinkshow: 'xlinkShow',
  'xlink:show': 'xlinkShow',
  xlinktitle: 'xlinkTitle',
  'xlink:title': 'xlinkTitle',
  xlinktype: 'xlinkType',
  'xlink:type': 'xlinkType',
  xmlbase: 'xmlBase',
  'xml:base': 'xmlBase',
  xmllang: 'xmlLang',
  'xml:lang': 'xmlLang',
  xmlns: 'xmlns',
  'xml:space': 'xmlSpace',
  xmlnsxlink: 'xmlnsXlink',
  'xmlns:xlink': 'xmlnsXlink',
  xmlspace: 'xmlSpace',
  y1: 'y1',
  y2: 'y2',
  y: 'y',
  ychannelselector: 'yChannelSelector',
  z: 'z',
  zoomandpan: 'zoomAndPan'
};

function getStackAddendum$3() {
  var stack = ReactDebugCurrentFrame.getStackAddendum();
  return stack != null ? stack : '';
}

{
  var warnedProperties$1 = {};
  var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  var EVENT_NAME_REGEX = /^on./;
  var INVALID_EVENT_NAME_REGEX = /^on[^A-Z]/;
  var rARIA$1 = new RegExp('^(aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$');
  var rARIACamel$1 = new RegExp('^(aria)[A-Z][' + ATTRIBUTE_NAME_CHAR + ']*$');

  var validateProperty$1 = function (tagName, name, value, canUseEventSystem) {
    if (hasOwnProperty$1.call(warnedProperties$1, name) && warnedProperties$1[name]) {
      return true;
    }

    var lowerCasedName = name.toLowerCase();
    if (lowerCasedName === 'onfocusin' || lowerCasedName === 'onfocusout') {
      warning(false, 'React uses onFocus and onBlur instead of onFocusIn and onFocusOut. ' + 'All React events are normalized to bubble, so onFocusIn and onFocusOut ' + 'are not needed/supported by React.');
      warnedProperties$1[name] = true;
      return true;
    }

    // We can't rely on the event system being injected on the server.
    if (canUseEventSystem) {
      if (registrationNameModules.hasOwnProperty(name)) {
        return true;
      }
      var registrationName = possibleRegistrationNames.hasOwnProperty(lowerCasedName) ? possibleRegistrationNames[lowerCasedName] : null;
      if (registrationName != null) {
        warning(false, 'Invalid event handler property `%s`. Did you mean `%s`?%s', name, registrationName, getStackAddendum$3());
        warnedProperties$1[name] = true;
        return true;
      }
      if (EVENT_NAME_REGEX.test(name)) {
        warning(false, 'Unknown event handler property `%s`. It will be ignored.%s', name, getStackAddendum$3());
        warnedProperties$1[name] = true;
        return true;
      }
    } else if (EVENT_NAME_REGEX.test(name)) {
      // If no event plugins have been injected, we are in a server environment.
      // So we can't tell if the event name is correct for sure, but we can filter
      // out known bad ones like `onclick`. We can't suggest a specific replacement though.
      if (INVALID_EVENT_NAME_REGEX.test(name)) {
        warning(false, 'Invalid event handler property `%s`. ' + 'React events use the camelCase naming convention, for example `onClick`.%s', name, getStackAddendum$3());
      }
      warnedProperties$1[name] = true;
      return true;
    }

    // Let the ARIA attribute hook validate ARIA attributes
    if (rARIA$1.test(name) || rARIACamel$1.test(name)) {
      return true;
    }

    if (lowerCasedName === 'innerhtml') {
      warning(false, 'Directly setting property `innerHTML` is not permitted. ' + 'For more information, lookup documentation on `dangerouslySetInnerHTML`.');
      warnedProperties$1[name] = true;
      return true;
    }

    if (lowerCasedName === 'aria') {
      warning(false, 'The `aria` attribute is reserved for future use in React. ' + 'Pass individual `aria-` attributes instead.');
      warnedProperties$1[name] = true;
      return true;
    }

    if (lowerCasedName === 'is' && value !== null && value !== undefined && typeof value !== 'string') {
      warning(false, 'Received a `%s` for a string attribute `is`. If this is expected, cast ' + 'the value to a string.%s', typeof value, getStackAddendum$3());
      warnedProperties$1[name] = true;
      return true;
    }

    if (typeof value === 'number' && isNaN(value)) {
      warning(false, 'Received NaN for the `%s` attribute. If this is expected, cast ' + 'the value to a string.%s', name, getStackAddendum$3());
      warnedProperties$1[name] = true;
      return true;
    }

    var isReserved = isReservedProp(name);

    // Known attributes should match the casing specified in the property config.
    if (possibleStandardNames.hasOwnProperty(lowerCasedName)) {
      var standardName = possibleStandardNames[lowerCasedName];
      if (standardName !== name) {
        warning(false, 'Invalid DOM property `%s`. Did you mean `%s`?%s', name, standardName, getStackAddendum$3());
        warnedProperties$1[name] = true;
        return true;
      }
    } else if (!isReserved && name !== lowerCasedName) {
      // Unknown attributes should have lowercase casing since that's how they
      // will be cased anyway with server rendering.
      warning(false, 'React does not recognize the `%s` prop on a DOM element. If you ' + 'intentionally want it to appear in the DOM as a custom ' + 'attribute, spell it as lowercase `%s` instead. ' + 'If you accidentally passed it from a parent component, remove ' + 'it from the DOM element.%s', name, lowerCasedName, getStackAddendum$3());
      warnedProperties$1[name] = true;
      return true;
    }

    if (typeof value === 'boolean' && !shouldAttributeAcceptBooleanValue(name)) {
      if (value) {
        warning(false, 'Received `%s` for a non-boolean attribute `%s`.\n\n' + 'If you want to write it to the DOM, pass a string instead: ' + '%s="%s" or %s={value.toString()}.%s', value, name, name, value, name, getStackAddendum$3());
      } else {
        warning(false, 'Received `%s` for a non-boolean attribute `%s`.\n\n' + 'If you want to write it to the DOM, pass a string instead: ' + '%s="%s" or %s={value.toString()}.\n\n' + 'If you used to conditionally omit it with %s={condition && value}, ' + 'pass %s={condition ? value : undefined} instead.%s', value, name, name, value, name, name, name, getStackAddendum$3());
      }
      warnedProperties$1[name] = true;
      return true;
    }

    // Now that we've validated casing, do not validate
    // data types for reserved props
    if (isReserved) {
      return true;
    }

    // Warn when a known attribute is a bad type
    if (!shouldSetAttribute(name, value)) {
      warnedProperties$1[name] = true;
      return false;
    }

    return true;
  };
}

var warnUnknownProperties = function (type, props, canUseEventSystem) {
  var unknownProps = [];
  for (var key in props) {
    var isValid = validateProperty$1(type, key, props[key], canUseEventSystem);
    if (!isValid) {
      unknownProps.push(key);
    }
  }

  var unknownPropString = unknownProps.map(function (prop) {
    return '`' + prop + '`';
  }).join(', ');
  if (unknownProps.length === 1) {
    warning(false, 'Invalid value for prop %s on <%s> tag. Either remove it from the element, ' + 'or pass a string or number value to keep it in the DOM. ' + 'For details, see https://fb.me/react-attribute-behavior%s', unknownPropString, type, getStackAddendum$3());
  } else if (unknownProps.length > 1) {
    warning(false, 'Invalid values for props %s on <%s> tag. Either remove them from the element, ' + 'or pass a string or number value to keep them in the DOM. ' + 'For details, see https://fb.me/react-attribute-behavior%s', unknownPropString, type, getStackAddendum$3());
  }
};

function validateProperties$2(type, props, canUseEventSystem) {
  if (isCustomComponent(type, props)) {
    return;
  }
  warnUnknownProperties(type, props, canUseEventSystem);
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Based on reading the React.Children implementation. TODO: type this somewhere?

var toArray = React.Children.toArray;

var getStackAddendum = emptyFunction.thatReturns('');

{
  var validatePropertiesInDevelopment = function (type, props) {
    validateProperties(type, props);
    validateProperties$1(type, props);
    validateProperties$2(type, props, /* canUseEventSystem */false);
  };

  var describeStackFrame = function (element) {
    var source = element._source;
    var type = element.type;
    var name = getComponentName(type);
    var ownerName = null;
    return describeComponentFrame(name, source, ownerName);
  };

  var currentDebugStack = null;
  var currentDebugElementStack = null;
  var setCurrentDebugStack = function (stack) {
    var frame = stack[stack.length - 1];
    currentDebugElementStack = frame.debugElementStack;
    // We are about to enter a new composite stack, reset the array.
    currentDebugElementStack.length = 0;
    currentDebugStack = stack;
    ReactDebugCurrentFrame.getCurrentStack = getStackAddendum;
  };
  var pushElementToDebugStack = function (element) {
    if (currentDebugElementStack !== null) {
      currentDebugElementStack.push(element);
    }
  };
  var resetCurrentDebugStack = function () {
    currentDebugElementStack = null;
    currentDebugStack = null;
    ReactDebugCurrentFrame.getCurrentStack = null;
  };
  getStackAddendum = function () {
    if (currentDebugStack === null) {
      return '';
    }
    var stack = '';
    var debugStack = currentDebugStack;
    for (var i = debugStack.length - 1; i >= 0; i--) {
      var frame = debugStack[i];
      var _debugElementStack = frame.debugElementStack;
      for (var ii = _debugElementStack.length - 1; ii >= 0; ii--) {
        stack += describeStackFrame(_debugElementStack[ii]);
      }
    }
    return stack;
  };
}

var didWarnDefaultInputValue = false;
var didWarnDefaultChecked = false;
var didWarnDefaultSelectValue = false;
var didWarnDefaultTextareaValue = false;
var didWarnInvalidOptionChildren = false;
var didWarnAboutNoopUpdateForComponent = {};
var valuePropNames = ['value', 'defaultValue'];
var newlineEatingTags = {
  listing: true,
  pre: true,
  textarea: true
};

function getComponentName(type) {
  return typeof type === 'string' ? type : typeof type === 'function' ? type.displayName || type.name : null;
}

// We accept any tag to be rendered but since this gets injected into arbitrary
// HTML, we want to make sure that it's a safe tag.
// http://www.w3.org/TR/REC-xml/#NT-Name
var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/; // Simplified subset
var validatedTagCache = {};
function validateDangerousTag(tag) {
  if (!validatedTagCache.hasOwnProperty(tag)) {
    !VALID_TAG_REGEX.test(tag) ? invariant(false, 'Invalid tag: %s', tag) : void 0;
    validatedTagCache[tag] = true;
  }
}

var processStyleName = memoizeStringOnly(function (styleName) {
  return hyphenateStyleName(styleName);
});

function createMarkupForStyles(styles) {
  var serialized = '';
  var delimiter = '';
  for (var styleName in styles) {
    if (!styles.hasOwnProperty(styleName)) {
      continue;
    }
    var isCustomProperty = styleName.indexOf('--') === 0;
    var styleValue = styles[styleName];
    {
      if (!isCustomProperty) {
        warnValidStyle$1(styleName, styleValue, getStackAddendum);
      }
    }
    if (styleValue != null) {
      serialized += delimiter + processStyleName(styleName) + ':';
      serialized += dangerousStyleValue(styleName, styleValue, isCustomProperty);

      delimiter = ';';
    }
  }
  return serialized || null;
}

function warnNoop(publicInstance, callerName) {
  {
    var constructor = publicInstance.constructor;
    var componentName = constructor && getComponentName(constructor) || 'ReactClass';
    var warningKey = componentName + '.' + callerName;
    if (didWarnAboutNoopUpdateForComponent[warningKey]) {
      return;
    }

    warning(false, '%s(...): Can only update a mounting component. ' + 'This usually means you called %s() outside componentWillMount() on the server. ' + 'This is a no-op.\n\nPlease check the code for the %s component.', callerName, callerName, componentName);
    didWarnAboutNoopUpdateForComponent[warningKey] = true;
  }
}

function shouldConstruct(Component) {
  return Component.prototype && Component.prototype.isReactComponent;
}

function getNonChildrenInnerMarkup(props) {
  var innerHTML = props.dangerouslySetInnerHTML;
  if (innerHTML != null) {
    if (innerHTML.__html != null) {
      return innerHTML.__html;
    }
  } else {
    var content = props.children;
    if (typeof content === 'string' || typeof content === 'number') {
      return escapeTextForBrowser(content);
    }
  }
  return null;
}

function flattenTopLevelChildren(children) {
  if (!React.isValidElement(children)) {
    return toArray(children);
  }
  var element = children;
  if (element.type !== REACT_FRAGMENT_TYPE) {
    return [element];
  }
  var fragmentChildren = element.props.children;
  if (!React.isValidElement(fragmentChildren)) {
    return toArray(fragmentChildren);
  }
  var fragmentChildElement = fragmentChildren;
  return [fragmentChildElement];
}

function flattenOptionChildren(children) {
  var content = '';
  // Flatten children and warn if they aren't strings or numbers;
  // invalid types are ignored.
  React.Children.forEach(children, function (child) {
    if (child == null) {
      return;
    }
    if (typeof child === 'string' || typeof child === 'number') {
      content += child;
    } else {
      {
        if (!didWarnInvalidOptionChildren) {
          didWarnInvalidOptionChildren = true;
          warning(false, 'Only strings and numbers are supported as <option> children.');
        }
      }
    }
  });
  return content;
}

function maskContext(type, context) {
  var contextTypes = type.contextTypes;
  if (!contextTypes) {
    return emptyObject;
  }
  var maskedContext = {};
  for (var contextName in contextTypes) {
    maskedContext[contextName] = context[contextName];
  }
  return maskedContext;
}

function checkContextTypes(typeSpecs, values, location) {
  {
    checkPropTypes(typeSpecs, values, location, 'Component', getStackAddendum);
  }
}

function processContext(type, context) {
  var maskedContext = maskContext(type, context);
  {
    if (type.contextTypes) {
      checkContextTypes(type.contextTypes, maskedContext, 'context');
    }
  }
  return maskedContext;
}

var STYLE = 'style';
var RESERVED_PROPS$1 = {
  children: null,
  dangerouslySetInnerHTML: null,
  suppressContentEditableWarning: null,
  suppressHydrationWarning: null
};

function createOpenTagMarkup(tagVerbatim, tagLowercase, props, namespace, makeStaticMarkup, isRootElement) {
  var ret = '<' + tagVerbatim;

  for (var propKey in props) {
    if (!props.hasOwnProperty(propKey)) {
      continue;
    }
    var propValue = props[propKey];
    if (propValue == null) {
      continue;
    }
    if (propKey === STYLE) {
      propValue = createMarkupForStyles(propValue);
    }
    var markup = null;
    if (isCustomComponent(tagLowercase, props)) {
      if (!RESERVED_PROPS$1.hasOwnProperty(propKey)) {
        markup = createMarkupForCustomAttribute(propKey, propValue);
      }
    } else {
      markup = createMarkupForProperty(propKey, propValue);
    }
    if (markup) {
      ret += ' ' + markup;
    }
  }

  // For static pages, no need to put React ID and checksum. Saves lots of
  // bytes.
  if (makeStaticMarkup) {
    return ret;
  }

  if (isRootElement) {
    ret += ' ' + createMarkupForRoot();
  }
  return ret;
}

function validateRenderResult(child, type) {
  if (child === undefined) {
    invariant(false, '%s(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.', getComponentName(type) || 'Component');
  }
}

function resolve(child, context) {
  while (React.isValidElement(child)) {
    // Safe because we just checked it's an element.
    var element = child;
    {
      pushElementToDebugStack(element);
    }
    var Component = element.type;
    if (typeof Component !== 'function') {
      break;
    }
    var publicContext = processContext(Component, context);
    var inst;
    var queue = [];
    var replace = false;
    var updater = {
      isMounted: function (publicInstance) {
        return false;
      },
      enqueueForceUpdate: function (publicInstance) {
        if (queue === null) {
          warnNoop(publicInstance, 'forceUpdate');
          return null;
        }
      },
      enqueueReplaceState: function (publicInstance, completeState) {
        replace = true;
        queue = [completeState];
      },
      enqueueSetState: function (publicInstance, partialState) {
        if (queue === null) {
          warnNoop(publicInstance, 'setState');
          return null;
        }
        queue.push(partialState);
      }
    };

    if (shouldConstruct(Component)) {
      inst = new Component(element.props, publicContext, updater);
    } else {
      inst = Component(element.props, publicContext, updater);
      if (inst == null || inst.render == null) {
        child = inst;
        validateRenderResult(child, Component);
        continue;
      }
    }

    inst.props = element.props;
    inst.context = publicContext;
    inst.updater = updater;

    var initialState = inst.state;
    if (initialState === undefined) {
      inst.state = initialState = null;
    }
    if (inst.componentWillMount) {
      inst.componentWillMount();
      if (queue.length) {
        var oldQueue = queue;
        var oldReplace = replace;
        queue = null;
        replace = false;

        if (oldReplace && oldQueue.length === 1) {
          inst.state = oldQueue[0];
        } else {
          var nextState = oldReplace ? oldQueue[0] : inst.state;
          var dontMutate = true;
          for (var i = oldReplace ? 1 : 0; i < oldQueue.length; i++) {
            var partial = oldQueue[i];
            var partialState = typeof partial === 'function' ? partial.call(inst, nextState, element.props, publicContext) : partial;
            if (partialState) {
              if (dontMutate) {
                dontMutate = false;
                nextState = _assign({}, nextState, partialState);
              } else {
                _assign(nextState, partialState);
              }
            }
          }
          inst.state = nextState;
        }
      } else {
        queue = null;
      }
    }
    child = inst.render();

    {
      if (child === undefined && inst.render._isMockFunction) {
        // This is probably bad practice. Consider warning here and
        // deprecating this convenience.
        child = null;
      }
    }
    validateRenderResult(child, Component);

    var childContext;
    if (typeof inst.getChildContext === 'function') {
      var childContextTypes = Component.childContextTypes;
      if (typeof childContextTypes === 'object') {
        childContext = inst.getChildContext();
        for (var contextKey in childContext) {
          !(contextKey in childContextTypes) ? invariant(false, '%s.getChildContext(): key "%s" is not defined in childContextTypes.', getComponentName(Component) || 'Unknown', contextKey) : void 0;
        }
      } else {
        warning(false, '%s.getChildContext(): childContextTypes must be defined in order to ' + 'use getChildContext().', getComponentName(Component) || 'Unknown');
      }
    }
    if (childContext) {
      context = _assign({}, context, childContext);
    }
  }
  return { child: child, context: context };
}

var ReactDOMServerRenderer = function () {
  function ReactDOMServerRenderer(children, makeStaticMarkup) {
    _classCallCheck(this, ReactDOMServerRenderer);

    var flatChildren = flattenTopLevelChildren(children);

    var topFrame = {
      // Assume all trees start in the HTML namespace (not totally true, but
      // this is what we did historically)
      domNamespace: Namespaces.html,
      children: flatChildren,
      childIndex: 0,
      context: emptyObject,
      footer: ''
    };
    {
      topFrame.debugElementStack = [];
    }
    this.stack = [topFrame];
    this.exhausted = false;
    this.currentSelectValue = null;
    this.previousWasTextNode = false;
    this.makeStaticMarkup = makeStaticMarkup;
  }
  // TODO: type this more strictly:


  ReactDOMServerRenderer.prototype.read = function read(bytes) {
    if (this.exhausted) {
      return null;
    }

    var out = '';
    while (out.length < bytes) {
      if (this.stack.length === 0) {
        this.exhausted = true;
        break;
      }
      var frame = this.stack[this.stack.length - 1];
      if (frame.childIndex >= frame.children.length) {
        var footer = frame.footer;
        out += footer;
        if (footer !== '') {
          this.previousWasTextNode = false;
        }
        this.stack.pop();
        if (frame.tag === 'select') {
          this.currentSelectValue = null;
        }
        continue;
      }
      var child = frame.children[frame.childIndex++];
      {
        setCurrentDebugStack(this.stack);
      }
      out += this.render(child, frame.context, frame.domNamespace);
      {
        // TODO: Handle reentrant server render calls. This doesn't.
        resetCurrentDebugStack();
      }
    }
    return out;
  };

  ReactDOMServerRenderer.prototype.render = function render(child, context, parentNamespace) {
    if (typeof child === 'string' || typeof child === 'number') {
      var text = '' + child;
      if (text === '') {
        return '';
      }
      if (this.makeStaticMarkup) {
        return escapeTextForBrowser(text);
      }
      if (this.previousWasTextNode) {
        return '<!-- -->' + escapeTextForBrowser(text);
      }
      this.previousWasTextNode = true;
      return escapeTextForBrowser(text);
    } else {
      var nextChild;

      var _resolve = resolve(child, context);

      nextChild = _resolve.child;
      context = _resolve.context;

      if (nextChild === null || nextChild === false) {
        return '';
      } else if (!React.isValidElement(nextChild)) {
        var nextChildren = toArray(nextChild);
        var frame = {
          domNamespace: parentNamespace,
          children: nextChildren,
          childIndex: 0,
          context: context,
          footer: ''
        };
        {
          frame.debugElementStack = [];
        }
        this.stack.push(frame);
        return '';
      } else if (nextChild.type === REACT_FRAGMENT_TYPE) {
        var _nextChildren = toArray(nextChild.props.children);
        var _frame = {
          domNamespace: parentNamespace,
          children: _nextChildren,
          childIndex: 0,
          context: context,
          footer: ''
        };
        {
          _frame.debugElementStack = [];
        }
        this.stack.push(_frame);
        return '';
      } else {
        // Safe because we just checked it's an element.
        var nextElement = nextChild;
        return this.renderDOM(nextElement, context, parentNamespace);
      }
    }
  };

  ReactDOMServerRenderer.prototype.renderDOM = function renderDOM(element, context, parentNamespace) {
    var tag = element.type.toLowerCase();

    var namespace = parentNamespace;
    if (parentNamespace === Namespaces.html) {
      namespace = getIntrinsicNamespace(tag);
    }

    {
      if (namespace === Namespaces.html) {
        // Should this check be gated by parent namespace? Not sure we want to
        // allow <SVG> or <mATH>.
        warning(tag === element.type, '<%s /> is using uppercase HTML. Always use lowercase HTML tags ' + 'in React.', element.type);
      }
    }

    validateDangerousTag(tag);

    var props = element.props;
    if (tag === 'input') {
      {
        ReactControlledValuePropTypes.checkPropTypes('input', props, getStackAddendum);

        if (props.checked !== undefined && props.defaultChecked !== undefined && !didWarnDefaultChecked) {
          warning(false, '%s contains an input of type %s with both checked and defaultChecked props. ' + 'Input elements must be either controlled or uncontrolled ' + '(specify either the checked prop, or the defaultChecked prop, but not ' + 'both). Decide between using a controlled or uncontrolled input ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components', 'A component', props.type);
          didWarnDefaultChecked = true;
        }
        if (props.value !== undefined && props.defaultValue !== undefined && !didWarnDefaultInputValue) {
          warning(false, '%s contains an input of type %s with both value and defaultValue props. ' + 'Input elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled input ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components', 'A component', props.type);
          didWarnDefaultInputValue = true;
        }
      }

      props = _assign({
        type: undefined
      }, props, {
        defaultChecked: undefined,
        defaultValue: undefined,
        value: props.value != null ? props.value : props.defaultValue,
        checked: props.checked != null ? props.checked : props.defaultChecked
      });
    } else if (tag === 'textarea') {
      {
        ReactControlledValuePropTypes.checkPropTypes('textarea', props, getStackAddendum);
        if (props.value !== undefined && props.defaultValue !== undefined && !didWarnDefaultTextareaValue) {
          warning(false, 'Textarea elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled textarea ' + 'and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components');
          didWarnDefaultTextareaValue = true;
        }
      }

      var initialValue = props.value;
      if (initialValue == null) {
        var defaultValue = props.defaultValue;
        // TODO (yungsters): Remove support for children content in <textarea>.
        var textareaChildren = props.children;
        if (textareaChildren != null) {
          {
            warning(false, 'Use the `defaultValue` or `value` props instead of setting ' + 'children on <textarea>.');
          }
          !(defaultValue == null) ? invariant(false, 'If you supply `defaultValue` on a <textarea>, do not pass children.') : void 0;
          if (Array.isArray(textareaChildren)) {
            !(textareaChildren.length <= 1) ? invariant(false, '<textarea> can only have at most one child.') : void 0;
            textareaChildren = textareaChildren[0];
          }

          defaultValue = '' + textareaChildren;
        }
        if (defaultValue == null) {
          defaultValue = '';
        }
        initialValue = defaultValue;
      }

      props = _assign({}, props, {
        value: undefined,
        children: '' + initialValue
      });
    } else if (tag === 'select') {
      {
        ReactControlledValuePropTypes.checkPropTypes('select', props, getStackAddendum);

        for (var i = 0; i < valuePropNames.length; i++) {
          var propName = valuePropNames[i];
          if (props[propName] == null) {
            continue;
          }
          var isArray = Array.isArray(props[propName]);
          if (props.multiple && !isArray) {
            warning(false, 'The `%s` prop supplied to <select> must be an array if ' + '`multiple` is true.%s', propName, '');
          } else if (!props.multiple && isArray) {
            warning(false, 'The `%s` prop supplied to <select> must be a scalar ' + 'value if `multiple` is false.%s', propName, '');
          }
        }

        if (props.value !== undefined && props.defaultValue !== undefined && !didWarnDefaultSelectValue) {
          warning(false, 'Select elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled select ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components');
          didWarnDefaultSelectValue = true;
        }
      }
      this.currentSelectValue = props.value != null ? props.value : props.defaultValue;
      props = _assign({}, props, {
        value: undefined
      });
    } else if (tag === 'option') {
      var selected = null;
      var selectValue = this.currentSelectValue;
      var optionChildren = flattenOptionChildren(props.children);
      if (selectValue != null) {
        var value;
        if (props.value != null) {
          value = props.value + '';
        } else {
          value = optionChildren;
        }
        selected = false;
        if (Array.isArray(selectValue)) {
          // multiple
          for (var j = 0; j < selectValue.length; j++) {
            if ('' + selectValue[j] === value) {
              selected = true;
              break;
            }
          }
        } else {
          selected = '' + selectValue === value;
        }

        props = _assign({
          selected: undefined,
          children: undefined
        }, props, {
          selected: selected,
          children: optionChildren
        });
      }
    }

    {
      validatePropertiesInDevelopment(tag, props);
    }

    assertValidProps(tag, props, getStackAddendum);

    var out = createOpenTagMarkup(element.type, tag, props, namespace, this.makeStaticMarkup, this.stack.length === 1);
    var footer = '';
    if (omittedCloseTags.hasOwnProperty(tag)) {
      out += '/>';
    } else {
      out += '>';
      footer = '</' + element.type + '>';
    }
    var children;
    var innerMarkup = getNonChildrenInnerMarkup(props);
    if (innerMarkup != null) {
      children = [];
      if (newlineEatingTags[tag] && innerMarkup.charAt(0) === '\n') {
        // text/html ignores the first character in these tags if it's a newline
        // Prefer to break application/xml over text/html (for now) by adding
        // a newline specifically to get eaten by the parser. (Alternately for
        // textareas, replacing "^\n" with "\r\n" doesn't get eaten, and the first
        // \r is normalized out by HTMLTextAreaElement#value.)
        // See: <http://www.w3.org/TR/html-polyglot/#newlines-in-textarea-and-pre>
        // See: <http://www.w3.org/TR/html5/syntax.html#element-restrictions>
        // See: <http://www.w3.org/TR/html5/syntax.html#newlines>
        // See: Parsing of "textarea" "listing" and "pre" elements
        //  from <http://www.w3.org/TR/html5/syntax.html#parsing-main-inbody>
        out += '\n';
      }
      out += innerMarkup;
    } else {
      children = toArray(props.children);
    }
    var frame = {
      domNamespace: getChildNamespace(parentNamespace, element.type),
      tag: tag,
      children: children,
      childIndex: 0,
      context: context,
      footer: footer
    };
    {
      frame.debugElementStack = [];
    }
    this.stack.push(frame);
    this.previousWasTextNode = false;
    return out;
  };

  return ReactDOMServerRenderer;
}();

/**
 * Render a ReactElement to its initial HTML. This should only be used on the
 * server.
 * See https://reactjs.org/docs/react-dom-server.html#rendertostring
 */
function renderToString(element) {
  var renderer = new ReactDOMServerRenderer(element, false);
  var markup = renderer.read(Infinity);
  return markup;
}

/**
 * Similar to renderToString, except this doesn't create extra DOM attributes
 * such as data-react-id that React uses internally.
 * See https://reactjs.org/docs/react-dom-server.html#rendertostaticmarkup
 */
function renderToStaticMarkup(element) {
  var renderer = new ReactDOMServerRenderer(element, true);
  var markup = renderer.read(Infinity);
  return markup;
}

function renderToNodeStream() {
  invariant(false, 'ReactDOMServer.renderToNodeStream(): The streaming API is not available in the browser. Use ReactDOMServer.renderToString() instead.');
}

function renderToStaticNodeStream() {
  invariant(false, 'ReactDOMServer.renderToStaticNodeStream(): The streaming API is not available in the browser. Use ReactDOMServer.renderToStaticMarkup() instead.');
}

// Note: when changing this, also consider https://github.com/facebook/react/issues/11526
var ReactDOMServerBrowser = {
  renderToString: renderToString,
  renderToStaticMarkup: renderToStaticMarkup,
  renderToNodeStream: renderToNodeStream,
  renderToStaticNodeStream: renderToStaticNodeStream,
  version: ReactVersion
};

var ReactDOMServerBrowser$1 = Object.freeze({
	default: ReactDOMServerBrowser
});

var ReactDOMServer = ( ReactDOMServerBrowser$1 && ReactDOMServerBrowser ) || ReactDOMServerBrowser$1;

// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest
var server_browser = ReactDOMServer['default'] ? ReactDOMServer['default'] : ReactDOMServer;

module.exports = server_browser;
  })();
}


/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMy5jYzU5ZWNiY2U0N2I5NjkyMjExNC5ob3QtdXBkYXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWRvbS9janMvcmVhY3QtZG9tLXNlcnZlci5icm93c2VyLmRldmVsb3BtZW50LmpzP2JjNGJmNGUiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBsaWNlbnNlIFJlYWN0IHYxNi4yLjBcbiAqIHJlYWN0LWRvbS1zZXJ2ZXIuYnJvd3Nlci5kZXZlbG9wbWVudC5qc1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5RnVuY3Rpb24nKTtcbnZhciBlbXB0eU9iamVjdCA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5T2JqZWN0Jyk7XG52YXIgaHlwaGVuYXRlU3R5bGVOYW1lID0gcmVxdWlyZSgnZmJqcy9saWIvaHlwaGVuYXRlU3R5bGVOYW1lJyk7XG52YXIgbWVtb2l6ZVN0cmluZ09ubHkgPSByZXF1aXJlKCdmYmpzL2xpYi9tZW1vaXplU3RyaW5nT25seScpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG52YXIgY2hlY2tQcm9wVHlwZXMgPSByZXF1aXJlKCdwcm9wLXR5cGVzL2NoZWNrUHJvcFR5cGVzJyk7XG52YXIgY2FtZWxpemVTdHlsZU5hbWUgPSByZXF1aXJlKCdmYmpzL2xpYi9jYW1lbGl6ZVN0eWxlTmFtZScpO1xuXG4vKipcbiAqIFdBUk5JTkc6IERPIE5PVCBtYW51YWxseSByZXF1aXJlIHRoaXMgbW9kdWxlLlxuICogVGhpcyBpcyBhIHJlcGxhY2VtZW50IGZvciBgaW52YXJpYW50KC4uLilgIHVzZWQgYnkgdGhlIGVycm9yIGNvZGUgc3lzdGVtXG4gKiBhbmQgd2lsbCBfb25seV8gYmUgcmVxdWlyZWQgYnkgdGhlIGNvcnJlc3BvbmRpbmcgYmFiZWwgcGFzcy5cbiAqIEl0IGFsd2F5cyB0aHJvd3MuXG4gKi9cblxuLy8gVGhlc2UgYXR0cmlidXRlcyBzaG91bGQgYmUgYWxsIGxvd2VyY2FzZSB0byBhbGxvdyBmb3Jcbi8vIGNhc2UgaW5zZW5zaXRpdmUgY2hlY2tzXG52YXIgUkVTRVJWRURfUFJPUFMgPSB7XG4gIGNoaWxkcmVuOiB0cnVlLFxuICBkYW5nZXJvdXNseVNldElubmVySFRNTDogdHJ1ZSxcbiAgZGVmYXVsdFZhbHVlOiB0cnVlLFxuICBkZWZhdWx0Q2hlY2tlZDogdHJ1ZSxcbiAgaW5uZXJIVE1MOiB0cnVlLFxuICBzdXBwcmVzc0NvbnRlbnRFZGl0YWJsZVdhcm5pbmc6IHRydWUsXG4gIHN1cHByZXNzSHlkcmF0aW9uV2FybmluZzogdHJ1ZSxcbiAgc3R5bGU6IHRydWVcbn07XG5cbmZ1bmN0aW9uIGNoZWNrTWFzayh2YWx1ZSwgYml0bWFzaykge1xuICByZXR1cm4gKHZhbHVlICYgYml0bWFzaykgPT09IGJpdG1hc2s7XG59XG5cbnZhciBET01Qcm9wZXJ0eUluamVjdGlvbiA9IHtcbiAgLyoqXG4gICAqIE1hcHBpbmcgZnJvbSBub3JtYWxpemVkLCBjYW1lbGNhc2VkIHByb3BlcnR5IG5hbWVzIHRvIGEgY29uZmlndXJhdGlvbiB0aGF0XG4gICAqIHNwZWNpZmllcyBob3cgdGhlIGFzc29jaWF0ZWQgRE9NIHByb3BlcnR5IHNob3VsZCBiZSBhY2Nlc3NlZCBvciByZW5kZXJlZC5cbiAgICovXG4gIE1VU1RfVVNFX1BST1BFUlRZOiAweDEsXG4gIEhBU19CT09MRUFOX1ZBTFVFOiAweDQsXG4gIEhBU19OVU1FUklDX1ZBTFVFOiAweDgsXG4gIEhBU19QT1NJVElWRV9OVU1FUklDX1ZBTFVFOiAweDEwIHwgMHg4LFxuICBIQVNfT1ZFUkxPQURFRF9CT09MRUFOX1ZBTFVFOiAweDIwLFxuICBIQVNfU1RSSU5HX0JPT0xFQU5fVkFMVUU6IDB4NDAsXG5cbiAgLyoqXG4gICAqIEluamVjdCBzb21lIHNwZWNpYWxpemVkIGtub3dsZWRnZSBhYm91dCB0aGUgRE9NLiBUaGlzIHRha2VzIGEgY29uZmlnIG9iamVjdFxuICAgKiB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAgICpcbiAgICogUHJvcGVydGllczogb2JqZWN0IG1hcHBpbmcgRE9NIHByb3BlcnR5IG5hbWUgdG8gb25lIG9mIHRoZVxuICAgKiBET01Qcm9wZXJ0eUluamVjdGlvbiBjb25zdGFudHMgb3IgbnVsbC4gSWYgeW91ciBhdHRyaWJ1dGUgaXNuJ3QgaW4gaGVyZSxcbiAgICogaXQgd29uJ3QgZ2V0IHdyaXR0ZW4gdG8gdGhlIERPTS5cbiAgICpcbiAgICogRE9NQXR0cmlidXRlTmFtZXM6IG9iamVjdCBtYXBwaW5nIFJlYWN0IGF0dHJpYnV0ZSBuYW1lIHRvIHRoZSBET01cbiAgICogYXR0cmlidXRlIG5hbWUuIEF0dHJpYnV0ZSBuYW1lcyBub3Qgc3BlY2lmaWVkIHVzZSB0aGUgKipsb3dlcmNhc2UqKlxuICAgKiBub3JtYWxpemVkIG5hbWUuXG4gICAqXG4gICAqIERPTUF0dHJpYnV0ZU5hbWVzcGFjZXM6IG9iamVjdCBtYXBwaW5nIFJlYWN0IGF0dHJpYnV0ZSBuYW1lIHRvIHRoZSBET01cbiAgICogYXR0cmlidXRlIG5hbWVzcGFjZSBVUkwuIChBdHRyaWJ1dGUgbmFtZXMgbm90IHNwZWNpZmllZCB1c2Ugbm8gbmFtZXNwYWNlLilcbiAgICpcbiAgICogRE9NUHJvcGVydHlOYW1lczogc2ltaWxhciB0byBET01BdHRyaWJ1dGVOYW1lcyBidXQgZm9yIERPTSBwcm9wZXJ0aWVzLlxuICAgKiBQcm9wZXJ0eSBuYW1lcyBub3Qgc3BlY2lmaWVkIHVzZSB0aGUgbm9ybWFsaXplZCBuYW1lLlxuICAgKlxuICAgKiBET01NdXRhdGlvbk1ldGhvZHM6IFByb3BlcnRpZXMgdGhhdCByZXF1aXJlIHNwZWNpYWwgbXV0YXRpb24gbWV0aG9kcy4gSWZcbiAgICogYHZhbHVlYCBpcyB1bmRlZmluZWQsIHRoZSBtdXRhdGlvbiBtZXRob2Qgc2hvdWxkIHVuc2V0IHRoZSBwcm9wZXJ0eS5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGRvbVByb3BlcnR5Q29uZmlnIHRoZSBjb25maWcgYXMgZGVzY3JpYmVkIGFib3ZlLlxuICAgKi9cbiAgaW5qZWN0RE9NUHJvcGVydHlDb25maWc6IGZ1bmN0aW9uIChkb21Qcm9wZXJ0eUNvbmZpZykge1xuICAgIHZhciBJbmplY3Rpb24gPSBET01Qcm9wZXJ0eUluamVjdGlvbjtcbiAgICB2YXIgUHJvcGVydGllcyA9IGRvbVByb3BlcnR5Q29uZmlnLlByb3BlcnRpZXMgfHwge307XG4gICAgdmFyIERPTUF0dHJpYnV0ZU5hbWVzcGFjZXMgPSBkb21Qcm9wZXJ0eUNvbmZpZy5ET01BdHRyaWJ1dGVOYW1lc3BhY2VzIHx8IHt9O1xuICAgIHZhciBET01BdHRyaWJ1dGVOYW1lcyA9IGRvbVByb3BlcnR5Q29uZmlnLkRPTUF0dHJpYnV0ZU5hbWVzIHx8IHt9O1xuICAgIHZhciBET01NdXRhdGlvbk1ldGhvZHMgPSBkb21Qcm9wZXJ0eUNvbmZpZy5ET01NdXRhdGlvbk1ldGhvZHMgfHwge307XG5cbiAgICBmb3IgKHZhciBwcm9wTmFtZSBpbiBQcm9wZXJ0aWVzKSB7XG4gICAgICAhIXByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpID8gaW52YXJpYW50KGZhbHNlLCBcImluamVjdERPTVByb3BlcnR5Q29uZmlnKC4uLik6IFlvdSdyZSB0cnlpbmcgdG8gaW5qZWN0IERPTSBwcm9wZXJ0eSAnJXMnIHdoaWNoIGhhcyBhbHJlYWR5IGJlZW4gaW5qZWN0ZWQuIFlvdSBtYXkgYmUgYWNjaWRlbnRhbGx5IGluamVjdGluZyB0aGUgc2FtZSBET00gcHJvcGVydHkgY29uZmlnIHR3aWNlLCBvciB5b3UgbWF5IGJlIGluamVjdGluZyB0d28gY29uZmlncyB0aGF0IGhhdmUgY29uZmxpY3RpbmcgcHJvcGVydHkgbmFtZXMuXCIsIHByb3BOYW1lKSA6IHZvaWQgMDtcblxuICAgICAgdmFyIGxvd2VyQ2FzZWQgPSBwcm9wTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgdmFyIHByb3BDb25maWcgPSBQcm9wZXJ0aWVzW3Byb3BOYW1lXTtcblxuICAgICAgdmFyIHByb3BlcnR5SW5mbyA9IHtcbiAgICAgICAgYXR0cmlidXRlTmFtZTogbG93ZXJDYXNlZCxcbiAgICAgICAgYXR0cmlidXRlTmFtZXNwYWNlOiBudWxsLFxuICAgICAgICBwcm9wZXJ0eU5hbWU6IHByb3BOYW1lLFxuICAgICAgICBtdXRhdGlvbk1ldGhvZDogbnVsbCxcblxuICAgICAgICBtdXN0VXNlUHJvcGVydHk6IGNoZWNrTWFzayhwcm9wQ29uZmlnLCBJbmplY3Rpb24uTVVTVF9VU0VfUFJPUEVSVFkpLFxuICAgICAgICBoYXNCb29sZWFuVmFsdWU6IGNoZWNrTWFzayhwcm9wQ29uZmlnLCBJbmplY3Rpb24uSEFTX0JPT0xFQU5fVkFMVUUpLFxuICAgICAgICBoYXNOdW1lcmljVmFsdWU6IGNoZWNrTWFzayhwcm9wQ29uZmlnLCBJbmplY3Rpb24uSEFTX05VTUVSSUNfVkFMVUUpLFxuICAgICAgICBoYXNQb3NpdGl2ZU51bWVyaWNWYWx1ZTogY2hlY2tNYXNrKHByb3BDb25maWcsIEluamVjdGlvbi5IQVNfUE9TSVRJVkVfTlVNRVJJQ19WQUxVRSksXG4gICAgICAgIGhhc092ZXJsb2FkZWRCb29sZWFuVmFsdWU6IGNoZWNrTWFzayhwcm9wQ29uZmlnLCBJbmplY3Rpb24uSEFTX09WRVJMT0FERURfQk9PTEVBTl9WQUxVRSksXG4gICAgICAgIGhhc1N0cmluZ0Jvb2xlYW5WYWx1ZTogY2hlY2tNYXNrKHByb3BDb25maWcsIEluamVjdGlvbi5IQVNfU1RSSU5HX0JPT0xFQU5fVkFMVUUpXG4gICAgICB9O1xuICAgICAgIShwcm9wZXJ0eUluZm8uaGFzQm9vbGVhblZhbHVlICsgcHJvcGVydHlJbmZvLmhhc051bWVyaWNWYWx1ZSArIHByb3BlcnR5SW5mby5oYXNPdmVybG9hZGVkQm9vbGVhblZhbHVlIDw9IDEpID8gaW52YXJpYW50KGZhbHNlLCBcIkRPTVByb3BlcnR5OiBWYWx1ZSBjYW4gYmUgb25lIG9mIGJvb2xlYW4sIG92ZXJsb2FkZWQgYm9vbGVhbiwgb3IgbnVtZXJpYyB2YWx1ZSwgYnV0IG5vdCBhIGNvbWJpbmF0aW9uOiAlc1wiLCBwcm9wTmFtZSkgOiB2b2lkIDA7XG5cbiAgICAgIGlmIChET01BdHRyaWJ1dGVOYW1lcy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgICAgdmFyIGF0dHJpYnV0ZU5hbWUgPSBET01BdHRyaWJ1dGVOYW1lc1twcm9wTmFtZV07XG5cbiAgICAgICAgcHJvcGVydHlJbmZvLmF0dHJpYnV0ZU5hbWUgPSBhdHRyaWJ1dGVOYW1lO1xuICAgICAgfVxuXG4gICAgICBpZiAoRE9NQXR0cmlidXRlTmFtZXNwYWNlcy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgICAgcHJvcGVydHlJbmZvLmF0dHJpYnV0ZU5hbWVzcGFjZSA9IERPTUF0dHJpYnV0ZU5hbWVzcGFjZXNbcHJvcE5hbWVdO1xuICAgICAgfVxuXG4gICAgICBpZiAoRE9NTXV0YXRpb25NZXRob2RzLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgICBwcm9wZXJ0eUluZm8ubXV0YXRpb25NZXRob2QgPSBET01NdXRhdGlvbk1ldGhvZHNbcHJvcE5hbWVdO1xuICAgICAgfVxuXG4gICAgICAvLyBEb3duY2FzZSByZWZlcmVuY2VzIHRvIHdoaXRlbGlzdCBwcm9wZXJ0aWVzIHRvIGNoZWNrIGZvciBtZW1iZXJzaGlwXG4gICAgICAvLyB3aXRob3V0IGNhc2Utc2Vuc2l0aXZpdHkuIFRoaXMgYWxsb3dzIHRoZSB3aGl0ZWxpc3QgdG8gcGljayB1cFxuICAgICAgLy8gYGFsbG93ZnVsbHNjcmVlbmAsIHdoaWNoIHNob3VsZCBiZSB3cml0dGVuIHVzaW5nIHRoZSBwcm9wZXJ0eSBjb25maWd1cmF0aW9uXG4gICAgICAvLyBmb3IgYGFsbG93RnVsbHNjcmVlbmBcbiAgICAgIHByb3BlcnRpZXNbcHJvcE5hbWVdID0gcHJvcGVydHlJbmZvO1xuICAgIH1cbiAgfVxufTtcblxuLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xudmFyIEFUVFJJQlVURV9OQU1FX1NUQVJUX0NIQVIgPSBcIjpBLVpfYS16XFxcXHUwMEMwLVxcXFx1MDBENlxcXFx1MDBEOC1cXFxcdTAwRjZcXFxcdTAwRjgtXFxcXHUwMkZGXFxcXHUwMzcwLVxcXFx1MDM3RFxcXFx1MDM3Ri1cXFxcdTFGRkZcXFxcdTIwMEMtXFxcXHUyMDBEXFxcXHUyMDcwLVxcXFx1MjE4RlxcXFx1MkMwMC1cXFxcdTJGRUZcXFxcdTMwMDEtXFxcXHVEN0ZGXFxcXHVGOTAwLVxcXFx1RkRDRlxcXFx1RkRGMC1cXFxcdUZGRkRcIjtcbi8qIGVzbGludC1lbmFibGUgbWF4LWxlbiAqL1xudmFyIEFUVFJJQlVURV9OQU1FX0NIQVIgPSBBVFRSSUJVVEVfTkFNRV9TVEFSVF9DSEFSICsgXCJcXFxcLS4wLTlcXFxcdTAwQjdcXFxcdTAzMDAtXFxcXHUwMzZGXFxcXHUyMDNGLVxcXFx1MjA0MFwiO1xuXG5cbnZhciBST09UX0FUVFJJQlVURV9OQU1FID0gJ2RhdGEtcmVhY3Ryb290JztcblxuLyoqXG4gKiBNYXAgZnJvbSBwcm9wZXJ0eSBcInN0YW5kYXJkIG5hbWVcIiB0byBhbiBvYmplY3Qgd2l0aCBpbmZvIGFib3V0IGhvdyB0byBzZXRcbiAqIHRoZSBwcm9wZXJ0eSBpbiB0aGUgRE9NLiBFYWNoIG9iamVjdCBjb250YWluczpcbiAqXG4gKiBhdHRyaWJ1dGVOYW1lOlxuICogICBVc2VkIHdoZW4gcmVuZGVyaW5nIG1hcmt1cCBvciB3aXRoIGAqQXR0cmlidXRlKClgLlxuICogYXR0cmlidXRlTmFtZXNwYWNlXG4gKiBwcm9wZXJ0eU5hbWU6XG4gKiAgIFVzZWQgb24gRE9NIG5vZGUgaW5zdGFuY2VzLiAoVGhpcyBpbmNsdWRlcyBwcm9wZXJ0aWVzIHRoYXQgbXV0YXRlIGR1ZSB0b1xuICogICBleHRlcm5hbCBmYWN0b3JzLilcbiAqIG11dGF0aW9uTWV0aG9kOlxuICogICBJZiBub24tbnVsbCwgdXNlZCBpbnN0ZWFkIG9mIHRoZSBwcm9wZXJ0eSBvciBgc2V0QXR0cmlidXRlKClgIGFmdGVyXG4gKiAgIGluaXRpYWwgcmVuZGVyLlxuICogbXVzdFVzZVByb3BlcnR5OlxuICogICBXaGV0aGVyIHRoZSBwcm9wZXJ0eSBtdXN0IGJlIGFjY2Vzc2VkIGFuZCBtdXRhdGVkIGFzIGFuIG9iamVjdCBwcm9wZXJ0eS5cbiAqIGhhc0Jvb2xlYW5WYWx1ZTpcbiAqICAgV2hldGhlciB0aGUgcHJvcGVydHkgc2hvdWxkIGJlIHJlbW92ZWQgd2hlbiBzZXQgdG8gYSBmYWxzZXkgdmFsdWUuXG4gKiBoYXNOdW1lcmljVmFsdWU6XG4gKiAgIFdoZXRoZXIgdGhlIHByb3BlcnR5IG11c3QgYmUgbnVtZXJpYyBvciBwYXJzZSBhcyBhIG51bWVyaWMgYW5kIHNob3VsZCBiZVxuICogICByZW1vdmVkIHdoZW4gc2V0IHRvIGEgZmFsc2V5IHZhbHVlLlxuICogaGFzUG9zaXRpdmVOdW1lcmljVmFsdWU6XG4gKiAgIFdoZXRoZXIgdGhlIHByb3BlcnR5IG11c3QgYmUgcG9zaXRpdmUgbnVtZXJpYyBvciBwYXJzZSBhcyBhIHBvc2l0aXZlXG4gKiAgIG51bWVyaWMgYW5kIHNob3VsZCBiZSByZW1vdmVkIHdoZW4gc2V0IHRvIGEgZmFsc2V5IHZhbHVlLlxuICogaGFzT3ZlcmxvYWRlZEJvb2xlYW5WYWx1ZTpcbiAqICAgV2hldGhlciB0aGUgcHJvcGVydHkgY2FuIGJlIHVzZWQgYXMgYSBmbGFnIGFzIHdlbGwgYXMgd2l0aCBhIHZhbHVlLlxuICogICBSZW1vdmVkIHdoZW4gc3RyaWN0bHkgZXF1YWwgdG8gZmFsc2U7IHByZXNlbnQgd2l0aG91dCBhIHZhbHVlIHdoZW5cbiAqICAgc3RyaWN0bHkgZXF1YWwgdG8gdHJ1ZTsgcHJlc2VudCB3aXRoIGEgdmFsdWUgb3RoZXJ3aXNlLlxuICovXG52YXIgcHJvcGVydGllcyA9IHt9O1xuXG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIGEgcHJvcGVydHkgbmFtZSBpcyBhIHdyaXRlYWJsZSBhdHRyaWJ1dGUuXG4gKiBAbWV0aG9kXG4gKi9cbmZ1bmN0aW9uIHNob3VsZFNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSkge1xuICBpZiAoaXNSZXNlcnZlZFByb3AobmFtZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKG5hbWUubGVuZ3RoID4gMiAmJiAobmFtZVswXSA9PT0gJ28nIHx8IG5hbWVbMF0gPT09ICdPJykgJiYgKG5hbWVbMV0gPT09ICduJyB8fCBuYW1lWzFdID09PSAnTicpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHN3aXRjaCAodHlwZW9mIHZhbHVlKSB7XG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICByZXR1cm4gc2hvdWxkQXR0cmlidXRlQWNjZXB0Qm9vbGVhblZhbHVlKG5hbWUpO1xuICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBkZWZhdWx0OlxuICAgICAgLy8gZnVuY3Rpb24sIHN5bWJvbFxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFByb3BlcnR5SW5mbyhuYW1lKSB7XG4gIHJldHVybiBwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KG5hbWUpID8gcHJvcGVydGllc1tuYW1lXSA6IG51bGw7XG59XG5cbmZ1bmN0aW9uIHNob3VsZEF0dHJpYnV0ZUFjY2VwdEJvb2xlYW5WYWx1ZShuYW1lKSB7XG4gIGlmIChpc1Jlc2VydmVkUHJvcChuYW1lKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHZhciBwcm9wZXJ0eUluZm8gPSBnZXRQcm9wZXJ0eUluZm8obmFtZSk7XG4gIGlmIChwcm9wZXJ0eUluZm8pIHtcbiAgICByZXR1cm4gcHJvcGVydHlJbmZvLmhhc0Jvb2xlYW5WYWx1ZSB8fCBwcm9wZXJ0eUluZm8uaGFzU3RyaW5nQm9vbGVhblZhbHVlIHx8IHByb3BlcnR5SW5mby5oYXNPdmVybG9hZGVkQm9vbGVhblZhbHVlO1xuICB9XG4gIHZhciBwcmVmaXggPSBuYW1lLnRvTG93ZXJDYXNlKCkuc2xpY2UoMCwgNSk7XG4gIHJldHVybiBwcmVmaXggPT09ICdkYXRhLScgfHwgcHJlZml4ID09PSAnYXJpYS0nO1xufVxuXG4vKipcbiAqIENoZWNrcyB0byBzZWUgaWYgYSBwcm9wZXJ0eSBuYW1lIGlzIHdpdGhpbiB0aGUgbGlzdCBvZiBwcm9wZXJ0aWVzXG4gKiByZXNlcnZlZCBmb3IgaW50ZXJuYWwgUmVhY3Qgb3BlcmF0aW9ucy4gVGhlc2UgcHJvcGVydGllcyBzaG91bGRcbiAqIG5vdCBiZSBzZXQgb24gYW4gSFRNTCBlbGVtZW50LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHJldHVybiB7Ym9vbGVhbn0gSWYgdGhlIG5hbWUgaXMgd2l0aGluIHJlc2VydmVkIHByb3BzXG4gKi9cbmZ1bmN0aW9uIGlzUmVzZXJ2ZWRQcm9wKG5hbWUpIHtcbiAgcmV0dXJuIFJFU0VSVkVEX1BST1BTLmhhc093blByb3BlcnR5KG5hbWUpO1xufVxuXG52YXIgaW5qZWN0aW9uID0gRE9NUHJvcGVydHlJbmplY3Rpb247XG5cbnZhciBNVVNUX1VTRV9QUk9QRVJUWSA9IGluamVjdGlvbi5NVVNUX1VTRV9QUk9QRVJUWTtcbnZhciBIQVNfQk9PTEVBTl9WQUxVRSA9IGluamVjdGlvbi5IQVNfQk9PTEVBTl9WQUxVRTtcbnZhciBIQVNfTlVNRVJJQ19WQUxVRSA9IGluamVjdGlvbi5IQVNfTlVNRVJJQ19WQUxVRTtcbnZhciBIQVNfUE9TSVRJVkVfTlVNRVJJQ19WQUxVRSA9IGluamVjdGlvbi5IQVNfUE9TSVRJVkVfTlVNRVJJQ19WQUxVRTtcbnZhciBIQVNfT1ZFUkxPQURFRF9CT09MRUFOX1ZBTFVFID0gaW5qZWN0aW9uLkhBU19PVkVSTE9BREVEX0JPT0xFQU5fVkFMVUU7XG52YXIgSEFTX1NUUklOR19CT09MRUFOX1ZBTFVFID0gaW5qZWN0aW9uLkhBU19TVFJJTkdfQk9PTEVBTl9WQUxVRTtcblxudmFyIEhUTUxET01Qcm9wZXJ0eUNvbmZpZyA9IHtcbiAgLy8gV2hlbiBhZGRpbmcgYXR0cmlidXRlcyB0byB0aGlzIGxpc3QsIGJlIHN1cmUgdG8gYWxzbyBhZGQgdGhlbSB0b1xuICAvLyB0aGUgYHBvc3NpYmxlU3RhbmRhcmROYW1lc2AgbW9kdWxlIHRvIGVuc3VyZSBjYXNpbmcgYW5kIGluY29ycmVjdFxuICAvLyBuYW1lIHdhcm5pbmdzLlxuICBQcm9wZXJ0aWVzOiB7XG4gICAgYWxsb3dGdWxsU2NyZWVuOiBIQVNfQk9PTEVBTl9WQUxVRSxcbiAgICAvLyBzcGVjaWZpZXMgdGFyZ2V0IGNvbnRleHQgZm9yIGxpbmtzIHdpdGggYHByZWxvYWRgIHR5cGVcbiAgICBhc3luYzogSEFTX0JPT0xFQU5fVkFMVUUsXG4gICAgLy8gTm90ZTogdGhlcmUgaXMgYSBzcGVjaWFsIGNhc2UgdGhhdCBwcmV2ZW50cyBpdCBmcm9tIGJlaW5nIHdyaXR0ZW4gdG8gdGhlIERPTVxuICAgIC8vIG9uIHRoZSBjbGllbnQgc2lkZSBiZWNhdXNlIHRoZSBicm93c2VycyBhcmUgaW5jb25zaXN0ZW50LiBJbnN0ZWFkIHdlIGNhbGwgZm9jdXMoKS5cbiAgICBhdXRvRm9jdXM6IEhBU19CT09MRUFOX1ZBTFVFLFxuICAgIGF1dG9QbGF5OiBIQVNfQk9PTEVBTl9WQUxVRSxcbiAgICBjYXB0dXJlOiBIQVNfT1ZFUkxPQURFRF9CT09MRUFOX1ZBTFVFLFxuICAgIGNoZWNrZWQ6IE1VU1RfVVNFX1BST1BFUlRZIHwgSEFTX0JPT0xFQU5fVkFMVUUsXG4gICAgY29sczogSEFTX1BPU0lUSVZFX05VTUVSSUNfVkFMVUUsXG4gICAgY29udGVudEVkaXRhYmxlOiBIQVNfU1RSSU5HX0JPT0xFQU5fVkFMVUUsXG4gICAgY29udHJvbHM6IEhBU19CT09MRUFOX1ZBTFVFLFxuICAgICdkZWZhdWx0JzogSEFTX0JPT0xFQU5fVkFMVUUsXG4gICAgZGVmZXI6IEhBU19CT09MRUFOX1ZBTFVFLFxuICAgIGRpc2FibGVkOiBIQVNfQk9PTEVBTl9WQUxVRSxcbiAgICBkb3dubG9hZDogSEFTX09WRVJMT0FERURfQk9PTEVBTl9WQUxVRSxcbiAgICBkcmFnZ2FibGU6IEhBU19TVFJJTkdfQk9PTEVBTl9WQUxVRSxcbiAgICBmb3JtTm9WYWxpZGF0ZTogSEFTX0JPT0xFQU5fVkFMVUUsXG4gICAgaGlkZGVuOiBIQVNfQk9PTEVBTl9WQUxVRSxcbiAgICBsb29wOiBIQVNfQk9PTEVBTl9WQUxVRSxcbiAgICAvLyBDYXV0aW9uOyBgb3B0aW9uLnNlbGVjdGVkYCBpcyBub3QgdXBkYXRlZCBpZiBgc2VsZWN0Lm11bHRpcGxlYCBpc1xuICAgIC8vIGRpc2FibGVkIHdpdGggYHJlbW92ZUF0dHJpYnV0ZWAuXG4gICAgbXVsdGlwbGU6IE1VU1RfVVNFX1BST1BFUlRZIHwgSEFTX0JPT0xFQU5fVkFMVUUsXG4gICAgbXV0ZWQ6IE1VU1RfVVNFX1BST1BFUlRZIHwgSEFTX0JPT0xFQU5fVkFMVUUsXG4gICAgbm9WYWxpZGF0ZTogSEFTX0JPT0xFQU5fVkFMVUUsXG4gICAgb3BlbjogSEFTX0JPT0xFQU5fVkFMVUUsXG4gICAgcGxheXNJbmxpbmU6IEhBU19CT09MRUFOX1ZBTFVFLFxuICAgIHJlYWRPbmx5OiBIQVNfQk9PTEVBTl9WQUxVRSxcbiAgICByZXF1aXJlZDogSEFTX0JPT0xFQU5fVkFMVUUsXG4gICAgcmV2ZXJzZWQ6IEhBU19CT09MRUFOX1ZBTFVFLFxuICAgIHJvd3M6IEhBU19QT1NJVElWRV9OVU1FUklDX1ZBTFVFLFxuICAgIHJvd1NwYW46IEhBU19OVU1FUklDX1ZBTFVFLFxuICAgIHNjb3BlZDogSEFTX0JPT0xFQU5fVkFMVUUsXG4gICAgc2VhbWxlc3M6IEhBU19CT09MRUFOX1ZBTFVFLFxuICAgIHNlbGVjdGVkOiBNVVNUX1VTRV9QUk9QRVJUWSB8IEhBU19CT09MRUFOX1ZBTFVFLFxuICAgIHNpemU6IEhBU19QT1NJVElWRV9OVU1FUklDX1ZBTFVFLFxuICAgIHN0YXJ0OiBIQVNfTlVNRVJJQ19WQUxVRSxcbiAgICAvLyBzdXBwb3J0IGZvciBwcm9qZWN0aW5nIHJlZ3VsYXIgRE9NIEVsZW1lbnRzIHZpYSBWMSBuYW1lZCBzbG90cyAoIHNoYWRvdyBkb20gKVxuICAgIHNwYW46IEhBU19QT1NJVElWRV9OVU1FUklDX1ZBTFVFLFxuICAgIHNwZWxsQ2hlY2s6IEhBU19TVFJJTkdfQk9PTEVBTl9WQUxVRSxcbiAgICAvLyBTdHlsZSBtdXN0IGJlIGV4cGxpY2l0bHkgc2V0IGluIHRoZSBhdHRyaWJ1dGUgbGlzdC4gUmVhY3QgY29tcG9uZW50c1xuICAgIC8vIGV4cGVjdCBhIHN0eWxlIG9iamVjdFxuICAgIHN0eWxlOiAwLFxuICAgIC8vIEtlZXAgaXQgaW4gdGhlIHdoaXRlbGlzdCBiZWNhdXNlIGl0IGlzIGNhc2Utc2Vuc2l0aXZlIGZvciBTVkcuXG4gICAgdGFiSW5kZXg6IDAsXG4gICAgLy8gaXRlbVNjb3BlIGlzIGZvciBmb3IgTWljcm9kYXRhIHN1cHBvcnQuXG4gICAgLy8gU2VlIGh0dHA6Ly9zY2hlbWEub3JnL2RvY3MvZ3MuaHRtbFxuICAgIGl0ZW1TY29wZTogSEFTX0JPT0xFQU5fVkFMVUUsXG4gICAgLy8gVGhlc2UgYXR0cmlidXRlcyBtdXN0IHN0YXkgaW4gdGhlIHdoaXRlLWxpc3QgYmVjYXVzZSB0aGV5IGhhdmVcbiAgICAvLyBkaWZmZXJlbnQgYXR0cmlidXRlIG5hbWVzIChzZWUgRE9NQXR0cmlidXRlTmFtZXMgYmVsb3cpXG4gICAgYWNjZXB0Q2hhcnNldDogMCxcbiAgICBjbGFzc05hbWU6IDAsXG4gICAgaHRtbEZvcjogMCxcbiAgICBodHRwRXF1aXY6IDAsXG4gICAgLy8gQXR0cmlidXRlcyB3aXRoIG11dGF0aW9uIG1ldGhvZHMgbXVzdCBiZSBzcGVjaWZpZWQgaW4gdGhlIHdoaXRlbGlzdFxuICAgIC8vIFNldCB0aGUgc3RyaW5nIGJvb2xlYW4gZmxhZyB0byBhbGxvdyB0aGUgYmVoYXZpb3JcbiAgICB2YWx1ZTogSEFTX1NUUklOR19CT09MRUFOX1ZBTFVFXG4gIH0sXG4gIERPTUF0dHJpYnV0ZU5hbWVzOiB7XG4gICAgYWNjZXB0Q2hhcnNldDogJ2FjY2VwdC1jaGFyc2V0JyxcbiAgICBjbGFzc05hbWU6ICdjbGFzcycsXG4gICAgaHRtbEZvcjogJ2ZvcicsXG4gICAgaHR0cEVxdWl2OiAnaHR0cC1lcXVpdidcbiAgfSxcbiAgRE9NTXV0YXRpb25NZXRob2RzOiB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIChub2RlLCB2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG5vZGUucmVtb3ZlQXR0cmlidXRlKCd2YWx1ZScpO1xuICAgICAgfVxuXG4gICAgICAvLyBOdW1iZXIgaW5wdXRzIGdldCBzcGVjaWFsIHRyZWF0bWVudCBkdWUgdG8gc29tZSBlZGdlIGNhc2VzIGluXG4gICAgICAvLyBDaHJvbWUuIExldCBldmVyeXRoaW5nIGVsc2UgYXNzaWduIHRoZSB2YWx1ZSBhdHRyaWJ1dGUgYXMgbm9ybWFsLlxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2lzc3Vlcy83MjUzI2lzc3VlY29tbWVudC0yMzYwNzQzMjZcbiAgICAgIGlmIChub2RlLnR5cGUgIT09ICdudW1iZXInIHx8IG5vZGUuaGFzQXR0cmlidXRlKCd2YWx1ZScpID09PSBmYWxzZSkge1xuICAgICAgICBub2RlLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnJyArIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAobm9kZS52YWxpZGl0eSAmJiAhbm9kZS52YWxpZGl0eS5iYWRJbnB1dCAmJiBub2RlLm93bmVyRG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gbm9kZSkge1xuICAgICAgICAvLyBEb24ndCBhc3NpZ24gYW4gYXR0cmlidXRlIGlmIHZhbGlkYXRpb24gcmVwb3J0cyBiYWRcbiAgICAgICAgLy8gaW5wdXQuIENocm9tZSB3aWxsIGNsZWFyIHRoZSB2YWx1ZS4gQWRkaXRpb25hbGx5LCBkb24ndFxuICAgICAgICAvLyBvcGVyYXRlIG9uIGlucHV0cyB0aGF0IGhhdmUgZm9jdXMsIG90aGVyd2lzZSBDaHJvbWUgbWlnaHRcbiAgICAgICAgLy8gc3RyaXAgb2ZmIHRyYWlsaW5nIGRlY2ltYWwgcGxhY2VzIGFuZCBjYXVzZSB0aGUgdXNlcidzXG4gICAgICAgIC8vIGN1cnNvciBwb3NpdGlvbiB0byBqdW1wIHRvIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGlucHV0LlxuICAgICAgICAvL1xuICAgICAgICAvLyBJbiBSZWFjdERPTUlucHV0LCB3ZSBoYXZlIGFuIG9uQmx1ciBldmVudCB0aGF0IHdpbGwgdHJpZ2dlclxuICAgICAgICAvLyB0aGlzIGZ1bmN0aW9uIGFnYWluIHdoZW4gZm9jdXMgaXMgbG9zdC5cbiAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJycgKyB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG52YXIgSEFTX1NUUklOR19CT09MRUFOX1ZBTFVFJDEgPSBpbmplY3Rpb24uSEFTX1NUUklOR19CT09MRUFOX1ZBTFVFO1xuXG5cbnZhciBOUyA9IHtcbiAgeGxpbms6ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyxcbiAgeG1sOiAnaHR0cDovL3d3dy53My5vcmcvWE1MLzE5OTgvbmFtZXNwYWNlJ1xufTtcblxuLyoqXG4gKiBUaGlzIGlzIGEgbGlzdCBvZiBhbGwgU1ZHIGF0dHJpYnV0ZXMgdGhhdCBuZWVkIHNwZWNpYWwgY2FzaW5nLFxuICogbmFtZXNwYWNpbmcsIG9yIGJvb2xlYW4gdmFsdWUgYXNzaWdubWVudC5cbiAqXG4gKiBXaGVuIGFkZGluZyBhdHRyaWJ1dGVzIHRvIHRoaXMgbGlzdCwgYmUgc3VyZSB0byBhbHNvIGFkZCB0aGVtIHRvXG4gKiB0aGUgYHBvc3NpYmxlU3RhbmRhcmROYW1lc2AgbW9kdWxlIHRvIGVuc3VyZSBjYXNpbmcgYW5kIGluY29ycmVjdFxuICogbmFtZSB3YXJuaW5ncy5cbiAqXG4gKiBTVkcgQXR0cmlidXRlcyBMaXN0OlxuICogaHR0cHM6Ly93d3cudzMub3JnL1RSL1NWRy9hdHRpbmRleC5odG1sXG4gKiBTTUlMIFNwZWM6XG4gKiBodHRwczovL3d3dy53My5vcmcvVFIvc21pbFxuICovXG52YXIgQVRUUlMgPSBbJ2FjY2VudC1oZWlnaHQnLCAnYWxpZ25tZW50LWJhc2VsaW5lJywgJ2FyYWJpYy1mb3JtJywgJ2Jhc2VsaW5lLXNoaWZ0JywgJ2NhcC1oZWlnaHQnLCAnY2xpcC1wYXRoJywgJ2NsaXAtcnVsZScsICdjb2xvci1pbnRlcnBvbGF0aW9uJywgJ2NvbG9yLWludGVycG9sYXRpb24tZmlsdGVycycsICdjb2xvci1wcm9maWxlJywgJ2NvbG9yLXJlbmRlcmluZycsICdkb21pbmFudC1iYXNlbGluZScsICdlbmFibGUtYmFja2dyb3VuZCcsICdmaWxsLW9wYWNpdHknLCAnZmlsbC1ydWxlJywgJ2Zsb29kLWNvbG9yJywgJ2Zsb29kLW9wYWNpdHknLCAnZm9udC1mYW1pbHknLCAnZm9udC1zaXplJywgJ2ZvbnQtc2l6ZS1hZGp1c3QnLCAnZm9udC1zdHJldGNoJywgJ2ZvbnQtc3R5bGUnLCAnZm9udC12YXJpYW50JywgJ2ZvbnQtd2VpZ2h0JywgJ2dseXBoLW5hbWUnLCAnZ2x5cGgtb3JpZW50YXRpb24taG9yaXpvbnRhbCcsICdnbHlwaC1vcmllbnRhdGlvbi12ZXJ0aWNhbCcsICdob3Jpei1hZHYteCcsICdob3Jpei1vcmlnaW4teCcsICdpbWFnZS1yZW5kZXJpbmcnLCAnbGV0dGVyLXNwYWNpbmcnLCAnbGlnaHRpbmctY29sb3InLCAnbWFya2VyLWVuZCcsICdtYXJrZXItbWlkJywgJ21hcmtlci1zdGFydCcsICdvdmVybGluZS1wb3NpdGlvbicsICdvdmVybGluZS10aGlja25lc3MnLCAncGFpbnQtb3JkZXInLCAncGFub3NlLTEnLCAncG9pbnRlci1ldmVudHMnLCAncmVuZGVyaW5nLWludGVudCcsICdzaGFwZS1yZW5kZXJpbmcnLCAnc3RvcC1jb2xvcicsICdzdG9wLW9wYWNpdHknLCAnc3RyaWtldGhyb3VnaC1wb3NpdGlvbicsICdzdHJpa2V0aHJvdWdoLXRoaWNrbmVzcycsICdzdHJva2UtZGFzaGFycmF5JywgJ3N0cm9rZS1kYXNob2Zmc2V0JywgJ3N0cm9rZS1saW5lY2FwJywgJ3N0cm9rZS1saW5lam9pbicsICdzdHJva2UtbWl0ZXJsaW1pdCcsICdzdHJva2Utb3BhY2l0eScsICdzdHJva2Utd2lkdGgnLCAndGV4dC1hbmNob3InLCAndGV4dC1kZWNvcmF0aW9uJywgJ3RleHQtcmVuZGVyaW5nJywgJ3VuZGVybGluZS1wb3NpdGlvbicsICd1bmRlcmxpbmUtdGhpY2tuZXNzJywgJ3VuaWNvZGUtYmlkaScsICd1bmljb2RlLXJhbmdlJywgJ3VuaXRzLXBlci1lbScsICd2LWFscGhhYmV0aWMnLCAndi1oYW5naW5nJywgJ3YtaWRlb2dyYXBoaWMnLCAndi1tYXRoZW1hdGljYWwnLCAndmVjdG9yLWVmZmVjdCcsICd2ZXJ0LWFkdi15JywgJ3ZlcnQtb3JpZ2luLXgnLCAndmVydC1vcmlnaW4teScsICd3b3JkLXNwYWNpbmcnLCAnd3JpdGluZy1tb2RlJywgJ3gtaGVpZ2h0JywgJ3hsaW5rOmFjdHVhdGUnLCAneGxpbms6YXJjcm9sZScsICd4bGluazpocmVmJywgJ3hsaW5rOnJvbGUnLCAneGxpbms6c2hvdycsICd4bGluazp0aXRsZScsICd4bGluazp0eXBlJywgJ3htbDpiYXNlJywgJ3htbG5zOnhsaW5rJywgJ3htbDpsYW5nJywgJ3htbDpzcGFjZSddO1xuXG52YXIgU1ZHRE9NUHJvcGVydHlDb25maWcgPSB7XG4gIFByb3BlcnRpZXM6IHtcbiAgICBhdXRvUmV2ZXJzZTogSEFTX1NUUklOR19CT09MRUFOX1ZBTFVFJDEsXG4gICAgZXh0ZXJuYWxSZXNvdXJjZXNSZXF1aXJlZDogSEFTX1NUUklOR19CT09MRUFOX1ZBTFVFJDEsXG4gICAgcHJlc2VydmVBbHBoYTogSEFTX1NUUklOR19CT09MRUFOX1ZBTFVFJDFcbiAgfSxcbiAgRE9NQXR0cmlidXRlTmFtZXM6IHtcbiAgICBhdXRvUmV2ZXJzZTogJ2F1dG9SZXZlcnNlJyxcbiAgICBleHRlcm5hbFJlc291cmNlc1JlcXVpcmVkOiAnZXh0ZXJuYWxSZXNvdXJjZXNSZXF1aXJlZCcsXG4gICAgcHJlc2VydmVBbHBoYTogJ3ByZXNlcnZlQWxwaGEnXG4gIH0sXG4gIERPTUF0dHJpYnV0ZU5hbWVzcGFjZXM6IHtcbiAgICB4bGlua0FjdHVhdGU6IE5TLnhsaW5rLFxuICAgIHhsaW5rQXJjcm9sZTogTlMueGxpbmssXG4gICAgeGxpbmtIcmVmOiBOUy54bGluayxcbiAgICB4bGlua1JvbGU6IE5TLnhsaW5rLFxuICAgIHhsaW5rU2hvdzogTlMueGxpbmssXG4gICAgeGxpbmtUaXRsZTogTlMueGxpbmssXG4gICAgeGxpbmtUeXBlOiBOUy54bGluayxcbiAgICB4bWxCYXNlOiBOUy54bWwsXG4gICAgeG1sTGFuZzogTlMueG1sLFxuICAgIHhtbFNwYWNlOiBOUy54bWxcbiAgfVxufTtcblxudmFyIENBTUVMSVpFID0gL1tcXC1cXDpdKFthLXpdKS9nO1xudmFyIGNhcGl0YWxpemUgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgcmV0dXJuIHRva2VuWzFdLnRvVXBwZXJDYXNlKCk7XG59O1xuXG5BVFRSUy5mb3JFYWNoKGZ1bmN0aW9uIChvcmlnaW5hbCkge1xuICB2YXIgcmVhY3ROYW1lID0gb3JpZ2luYWwucmVwbGFjZShDQU1FTElaRSwgY2FwaXRhbGl6ZSk7XG5cbiAgU1ZHRE9NUHJvcGVydHlDb25maWcuUHJvcGVydGllc1tyZWFjdE5hbWVdID0gMDtcbiAgU1ZHRE9NUHJvcGVydHlDb25maWcuRE9NQXR0cmlidXRlTmFtZXNbcmVhY3ROYW1lXSA9IG9yaWdpbmFsO1xufSk7XG5cbmluamVjdGlvbi5pbmplY3RET01Qcm9wZXJ0eUNvbmZpZyhIVE1MRE9NUHJvcGVydHlDb25maWcpO1xuaW5qZWN0aW9uLmluamVjdERPTVByb3BlcnR5Q29uZmlnKFNWR0RPTVByb3BlcnR5Q29uZmlnKTtcblxuLy8gVE9ETzogdGhpcyBpcyBzcGVjaWFsIGJlY2F1c2UgaXQgZ2V0cyBpbXBvcnRlZCBkdXJpbmcgYnVpbGQuXG5cbnZhciBSZWFjdFZlcnNpb24gPSAnMTYuMi4wJztcblxudmFyIGRlc2NyaWJlQ29tcG9uZW50RnJhbWUgPSBmdW5jdGlvbiAobmFtZSwgc291cmNlLCBvd25lck5hbWUpIHtcbiAgcmV0dXJuICdcXG4gICAgaW4gJyArIChuYW1lIHx8ICdVbmtub3duJykgKyAoc291cmNlID8gJyAoYXQgJyArIHNvdXJjZS5maWxlTmFtZS5yZXBsYWNlKC9eLipbXFxcXFxcL10vLCAnJykgKyAnOicgKyBzb3VyY2UubGluZU51bWJlciArICcpJyA6IG93bmVyTmFtZSA/ICcgKGNyZWF0ZWQgYnkgJyArIG93bmVyTmFtZSArICcpJyA6ICcnKTtcbn07XG5cbnZhciBSZWFjdEludGVybmFscyA9IFJlYWN0Ll9fU0VDUkVUX0lOVEVSTkFMU19ET19OT1RfVVNFX09SX1lPVV9XSUxMX0JFX0ZJUkVEO1xuXG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSBSZWFjdEludGVybmFscy5SZWFjdEN1cnJlbnRPd25lcjtcbnZhciBSZWFjdERlYnVnQ3VycmVudEZyYW1lID0gUmVhY3RJbnRlcm5hbHMuUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZTtcblxuLy8gVGhlIFN5bWJvbCB1c2VkIHRvIHRhZyB0aGUgUmVhY3RFbGVtZW50LWxpa2UgdHlwZXMuIElmIHRoZXJlIGlzIG5vIG5hdGl2ZSBTeW1ib2xcbi8vIG5vciBwb2x5ZmlsbCwgdGhlbiBhIHBsYWluIG51bWJlciBpcyB1c2VkIGZvciBwZXJmb3JtYW5jZS5cbnZhciBoYXNTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbFsnZm9yJ107XG5cblxuXG5cblxudmFyIFJFQUNUX0ZSQUdNRU5UX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2xbJ2ZvciddKCdyZWFjdC5mcmFnbWVudCcpIDogMHhlYWNiO1xuXG4vLyBjb2RlIGNvcGllZCBhbmQgbW9kaWZpZWQgZnJvbSBlc2NhcGUtaHRtbFxuLyoqXG4gKiBNb2R1bGUgdmFyaWFibGVzLlxuICogQHByaXZhdGVcbiAqL1xuXG52YXIgbWF0Y2hIdG1sUmVnRXhwID0gL1tcIicmPD5dLztcblxuLyoqXG4gKiBFc2NhcGVzIHNwZWNpYWwgY2hhcmFjdGVycyBhbmQgSFRNTCBlbnRpdGllcyBpbiBhIGdpdmVuIGh0bWwgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gc3RyaW5nIEhUTUwgc3RyaW5nIHRvIGVzY2FwZSBmb3IgbGF0ZXIgaW5zZXJ0aW9uXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKiBAcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZXNjYXBlSHRtbChzdHJpbmcpIHtcbiAgdmFyIHN0ciA9ICcnICsgc3RyaW5nO1xuICB2YXIgbWF0Y2ggPSBtYXRjaEh0bWxSZWdFeHAuZXhlYyhzdHIpO1xuXG4gIGlmICghbWF0Y2gpIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG5cbiAgdmFyIGVzY2FwZTtcbiAgdmFyIGh0bWwgPSAnJztcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGxhc3RJbmRleCA9IDA7XG5cbiAgZm9yIChpbmRleCA9IG1hdGNoLmluZGV4OyBpbmRleCA8IHN0ci5sZW5ndGg7IGluZGV4KyspIHtcbiAgICBzd2l0Y2ggKHN0ci5jaGFyQ29kZUF0KGluZGV4KSkge1xuICAgICAgY2FzZSAzNDpcbiAgICAgICAgLy8gXCJcbiAgICAgICAgZXNjYXBlID0gJyZxdW90Oyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzODpcbiAgICAgICAgLy8gJlxuICAgICAgICBlc2NhcGUgPSAnJmFtcDsnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzk6XG4gICAgICAgIC8vICdcbiAgICAgICAgZXNjYXBlID0gJyYjeDI3Oyc7IC8vIG1vZGlmaWVkIGZyb20gZXNjYXBlLWh0bWw7IHVzZWQgdG8gYmUgJyYjMzknXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA2MDpcbiAgICAgICAgLy8gPFxuICAgICAgICBlc2NhcGUgPSAnJmx0Oyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA2MjpcbiAgICAgICAgLy8gPlxuICAgICAgICBlc2NhcGUgPSAnJmd0Oyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGxhc3RJbmRleCAhPT0gaW5kZXgpIHtcbiAgICAgIGh0bWwgKz0gc3RyLnN1YnN0cmluZyhsYXN0SW5kZXgsIGluZGV4KTtcbiAgICB9XG5cbiAgICBsYXN0SW5kZXggPSBpbmRleCArIDE7XG4gICAgaHRtbCArPSBlc2NhcGU7XG4gIH1cblxuICByZXR1cm4gbGFzdEluZGV4ICE9PSBpbmRleCA/IGh0bWwgKyBzdHIuc3Vic3RyaW5nKGxhc3RJbmRleCwgaW5kZXgpIDogaHRtbDtcbn1cbi8vIGVuZCBjb2RlIGNvcGllZCBhbmQgbW9kaWZpZWQgZnJvbSBlc2NhcGUtaHRtbFxuXG4vKipcbiAqIEVzY2FwZXMgdGV4dCB0byBwcmV2ZW50IHNjcmlwdGluZyBhdHRhY2tzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdGV4dCBUZXh0IHZhbHVlIHRvIGVzY2FwZS5cbiAqIEByZXR1cm4ge3N0cmluZ30gQW4gZXNjYXBlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZVRleHRGb3JCcm93c2VyKHRleHQpIHtcbiAgaWYgKHR5cGVvZiB0ZXh0ID09PSAnYm9vbGVhbicgfHwgdHlwZW9mIHRleHQgPT09ICdudW1iZXInKSB7XG4gICAgLy8gdGhpcyBzaG9ydGNpcmN1aXQgaGVscHMgcGVyZiBmb3IgdHlwZXMgdGhhdCB3ZSBrbm93IHdpbGwgbmV2ZXIgaGF2ZVxuICAgIC8vIHNwZWNpYWwgY2hhcmFjdGVycywgZXNwZWNpYWxseSBnaXZlbiB0aGF0IHRoaXMgZnVuY3Rpb24gaXMgdXNlZCBvZnRlblxuICAgIC8vIGZvciBudW1lcmljIGRvbSBpZHMuXG4gICAgcmV0dXJuICcnICsgdGV4dDtcbiAgfVxuICByZXR1cm4gZXNjYXBlSHRtbCh0ZXh0KTtcbn1cblxuLyoqXG4gKiBFc2NhcGVzIGF0dHJpYnV0ZSB2YWx1ZSB0byBwcmV2ZW50IHNjcmlwdGluZyBhdHRhY2tzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVmFsdWUgdG8gZXNjYXBlLlxuICogQHJldHVybiB7c3RyaW5nfSBBbiBlc2NhcGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gcXVvdGVBdHRyaWJ1dGVWYWx1ZUZvckJyb3dzZXIodmFsdWUpIHtcbiAgcmV0dXJuICdcIicgKyBlc2NhcGVUZXh0Rm9yQnJvd3Nlcih2YWx1ZSkgKyAnXCInO1xufVxuXG4vLyBpc0F0dHJpYnV0ZU5hbWVTYWZlKCkgaXMgY3VycmVudGx5IGR1cGxpY2F0ZWQgaW4gRE9NUHJvcGVydHlPcGVyYXRpb25zLlxuLy8gVE9ETzogRmluZCBhIGJldHRlciBwbGFjZSBmb3IgdGhpcy5cbnZhciBWQUxJRF9BVFRSSUJVVEVfTkFNRV9SRUdFWCA9IG5ldyBSZWdFeHAoJ15bJyArIEFUVFJJQlVURV9OQU1FX1NUQVJUX0NIQVIgKyAnXVsnICsgQVRUUklCVVRFX05BTUVfQ0hBUiArICddKiQnKTtcbnZhciBpbGxlZ2FsQXR0cmlidXRlTmFtZUNhY2hlID0ge307XG52YXIgdmFsaWRhdGVkQXR0cmlidXRlTmFtZUNhY2hlID0ge307XG5mdW5jdGlvbiBpc0F0dHJpYnV0ZU5hbWVTYWZlKGF0dHJpYnV0ZU5hbWUpIHtcbiAgaWYgKHZhbGlkYXRlZEF0dHJpYnV0ZU5hbWVDYWNoZS5oYXNPd25Qcm9wZXJ0eShhdHRyaWJ1dGVOYW1lKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChpbGxlZ2FsQXR0cmlidXRlTmFtZUNhY2hlLmhhc093blByb3BlcnR5KGF0dHJpYnV0ZU5hbWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChWQUxJRF9BVFRSSUJVVEVfTkFNRV9SRUdFWC50ZXN0KGF0dHJpYnV0ZU5hbWUpKSB7XG4gICAgdmFsaWRhdGVkQXR0cmlidXRlTmFtZUNhY2hlW2F0dHJpYnV0ZU5hbWVdID0gdHJ1ZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpbGxlZ2FsQXR0cmlidXRlTmFtZUNhY2hlW2F0dHJpYnV0ZU5hbWVdID0gdHJ1ZTtcbiAge1xuICAgIHdhcm5pbmcoZmFsc2UsICdJbnZhbGlkIGF0dHJpYnV0ZSBuYW1lOiBgJXNgJywgYXR0cmlidXRlTmFtZSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBzaG91bGRJZ25vcmVWYWx1ZSgpIGlzIGN1cnJlbnRseSBkdXBsaWNhdGVkIGluIERPTVByb3BlcnR5T3BlcmF0aW9ucy5cbi8vIFRPRE86IEZpbmQgYSBiZXR0ZXIgcGxhY2UgZm9yIHRoaXMuXG5mdW5jdGlvbiBzaG91bGRJZ25vcmVWYWx1ZShwcm9wZXJ0eUluZm8sIHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsIHx8IHByb3BlcnR5SW5mby5oYXNCb29sZWFuVmFsdWUgJiYgIXZhbHVlIHx8IHByb3BlcnR5SW5mby5oYXNOdW1lcmljVmFsdWUgJiYgaXNOYU4odmFsdWUpIHx8IHByb3BlcnR5SW5mby5oYXNQb3NpdGl2ZU51bWVyaWNWYWx1ZSAmJiB2YWx1ZSA8IDEgfHwgcHJvcGVydHlJbmZvLmhhc092ZXJsb2FkZWRCb29sZWFuVmFsdWUgJiYgdmFsdWUgPT09IGZhbHNlO1xufVxuXG4vKipcbiAqIE9wZXJhdGlvbnMgZm9yIGRlYWxpbmcgd2l0aCBET00gcHJvcGVydGllcy5cbiAqL1xuXG4vKipcbiAqIENyZWF0ZXMgbWFya3VwIGZvciB0aGUgSUQgcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGlkIFVuZXNjYXBlZCBJRC5cbiAqIEByZXR1cm4ge3N0cmluZ30gTWFya3VwIHN0cmluZy5cbiAqL1xuXG5cbmZ1bmN0aW9uIGNyZWF0ZU1hcmt1cEZvclJvb3QoKSB7XG4gIHJldHVybiBST09UX0FUVFJJQlVURV9OQU1FICsgJz1cIlwiJztcbn1cblxuLyoqXG4gKiBDcmVhdGVzIG1hcmt1cCBmb3IgYSBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHJldHVybiB7P3N0cmluZ30gTWFya3VwIHN0cmluZywgb3IgbnVsbCBpZiB0aGUgcHJvcGVydHkgd2FzIGludmFsaWQuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZU1hcmt1cEZvclByb3BlcnR5KG5hbWUsIHZhbHVlKSB7XG4gIHZhciBwcm9wZXJ0eUluZm8gPSBnZXRQcm9wZXJ0eUluZm8obmFtZSk7XG4gIGlmIChwcm9wZXJ0eUluZm8pIHtcbiAgICBpZiAoc2hvdWxkSWdub3JlVmFsdWUocHJvcGVydHlJbmZvLCB2YWx1ZSkpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgdmFyIGF0dHJpYnV0ZU5hbWUgPSBwcm9wZXJ0eUluZm8uYXR0cmlidXRlTmFtZTtcbiAgICBpZiAocHJvcGVydHlJbmZvLmhhc0Jvb2xlYW5WYWx1ZSB8fCBwcm9wZXJ0eUluZm8uaGFzT3ZlcmxvYWRlZEJvb2xlYW5WYWx1ZSAmJiB2YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIGF0dHJpYnV0ZU5hbWUgKyAnPVwiXCInO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlICE9PSAnYm9vbGVhbicgfHwgc2hvdWxkQXR0cmlidXRlQWNjZXB0Qm9vbGVhblZhbHVlKG5hbWUpKSB7XG4gICAgICByZXR1cm4gYXR0cmlidXRlTmFtZSArICc9JyArIHF1b3RlQXR0cmlidXRlVmFsdWVGb3JCcm93c2VyKHZhbHVlKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoc2hvdWxkU2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKSkge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiBuYW1lICsgJz0nICsgcXVvdGVBdHRyaWJ1dGVWYWx1ZUZvckJyb3dzZXIodmFsdWUpO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgbWFya3VwIGZvciBhIGN1c3RvbSBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHJldHVybiB7c3RyaW5nfSBNYXJrdXAgc3RyaW5nLCBvciBlbXB0eSBzdHJpbmcgaWYgdGhlIHByb3BlcnR5IHdhcyBpbnZhbGlkLlxuICovXG5mdW5jdGlvbiBjcmVhdGVNYXJrdXBGb3JDdXN0b21BdHRyaWJ1dGUobmFtZSwgdmFsdWUpIHtcbiAgaWYgKCFpc0F0dHJpYnV0ZU5hbWVTYWZlKG5hbWUpIHx8IHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbiAgcmV0dXJuIG5hbWUgKyAnPScgKyBxdW90ZUF0dHJpYnV0ZVZhbHVlRm9yQnJvd3Nlcih2YWx1ZSk7XG59XG5cbnZhciBIVE1MX05BTUVTUEFDRSA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJztcbnZhciBNQVRIX05BTUVTUEFDRSA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MJztcbnZhciBTVkdfTkFNRVNQQUNFID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcblxudmFyIE5hbWVzcGFjZXMgPSB7XG4gIGh0bWw6IEhUTUxfTkFNRVNQQUNFLFxuICBtYXRobWw6IE1BVEhfTkFNRVNQQUNFLFxuICBzdmc6IFNWR19OQU1FU1BBQ0Vcbn07XG5cbi8vIEFzc3VtZXMgdGhlcmUgaXMgbm8gcGFyZW50IG5hbWVzcGFjZS5cbmZ1bmN0aW9uIGdldEludHJpbnNpY05hbWVzcGFjZSh0eXBlKSB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ3N2Zyc6XG4gICAgICByZXR1cm4gU1ZHX05BTUVTUEFDRTtcbiAgICBjYXNlICdtYXRoJzpcbiAgICAgIHJldHVybiBNQVRIX05BTUVTUEFDRTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIEhUTUxfTkFNRVNQQUNFO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldENoaWxkTmFtZXNwYWNlKHBhcmVudE5hbWVzcGFjZSwgdHlwZSkge1xuICBpZiAocGFyZW50TmFtZXNwYWNlID09IG51bGwgfHwgcGFyZW50TmFtZXNwYWNlID09PSBIVE1MX05BTUVTUEFDRSkge1xuICAgIC8vIE5vIChvciBkZWZhdWx0KSBwYXJlbnQgbmFtZXNwYWNlOiBwb3RlbnRpYWwgZW50cnkgcG9pbnQuXG4gICAgcmV0dXJuIGdldEludHJpbnNpY05hbWVzcGFjZSh0eXBlKTtcbiAgfVxuICBpZiAocGFyZW50TmFtZXNwYWNlID09PSBTVkdfTkFNRVNQQUNFICYmIHR5cGUgPT09ICdmb3JlaWduT2JqZWN0Jykge1xuICAgIC8vIFdlJ3JlIGxlYXZpbmcgU1ZHLlxuICAgIHJldHVybiBIVE1MX05BTUVTUEFDRTtcbiAgfVxuICAvLyBCeSBkZWZhdWx0LCBwYXNzIG5hbWVzcGFjZSBiZWxvdy5cbiAgcmV0dXJuIHBhcmVudE5hbWVzcGFjZTtcbn1cblxudmFyIFJlYWN0Q29udHJvbGxlZFZhbHVlUHJvcFR5cGVzID0ge1xuICBjaGVja1Byb3BUeXBlczogbnVsbFxufTtcblxue1xuICB2YXIgaGFzUmVhZE9ubHlWYWx1ZSA9IHtcbiAgICBidXR0b246IHRydWUsXG4gICAgY2hlY2tib3g6IHRydWUsXG4gICAgaW1hZ2U6IHRydWUsXG4gICAgaGlkZGVuOiB0cnVlLFxuICAgIHJhZGlvOiB0cnVlLFxuICAgIHJlc2V0OiB0cnVlLFxuICAgIHN1Ym1pdDogdHJ1ZVxuICB9O1xuXG4gIHZhciBwcm9wVHlwZXMgPSB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIChwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpIHtcbiAgICAgIGlmICghcHJvcHNbcHJvcE5hbWVdIHx8IGhhc1JlYWRPbmx5VmFsdWVbcHJvcHMudHlwZV0gfHwgcHJvcHMub25DaGFuZ2UgfHwgcHJvcHMucmVhZE9ubHkgfHwgcHJvcHMuZGlzYWJsZWQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IEVycm9yKCdZb3UgcHJvdmlkZWQgYSBgdmFsdWVgIHByb3AgdG8gYSBmb3JtIGZpZWxkIHdpdGhvdXQgYW4gJyArICdgb25DaGFuZ2VgIGhhbmRsZXIuIFRoaXMgd2lsbCByZW5kZXIgYSByZWFkLW9ubHkgZmllbGQuIElmICcgKyAndGhlIGZpZWxkIHNob3VsZCBiZSBtdXRhYmxlIHVzZSBgZGVmYXVsdFZhbHVlYC4gT3RoZXJ3aXNlLCAnICsgJ3NldCBlaXRoZXIgYG9uQ2hhbmdlYCBvciBgcmVhZE9ubHlgLicpO1xuICAgIH0sXG4gICAgY2hlY2tlZDogZnVuY3Rpb24gKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSkge1xuICAgICAgaWYgKCFwcm9wc1twcm9wTmFtZV0gfHwgcHJvcHMub25DaGFuZ2UgfHwgcHJvcHMucmVhZE9ubHkgfHwgcHJvcHMuZGlzYWJsZWQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IEVycm9yKCdZb3UgcHJvdmlkZWQgYSBgY2hlY2tlZGAgcHJvcCB0byBhIGZvcm0gZmllbGQgd2l0aG91dCBhbiAnICsgJ2BvbkNoYW5nZWAgaGFuZGxlci4gVGhpcyB3aWxsIHJlbmRlciBhIHJlYWQtb25seSBmaWVsZC4gSWYgJyArICd0aGUgZmllbGQgc2hvdWxkIGJlIG11dGFibGUgdXNlIGBkZWZhdWx0Q2hlY2tlZGAuIE90aGVyd2lzZSwgJyArICdzZXQgZWl0aGVyIGBvbkNoYW5nZWAgb3IgYHJlYWRPbmx5YC4nKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFByb3ZpZGUgYSBsaW5rZWQgYHZhbHVlYCBhdHRyaWJ1dGUgZm9yIGNvbnRyb2xsZWQgZm9ybXMuIFlvdSBzaG91bGQgbm90IHVzZVxuICAgKiB0aGlzIG91dHNpZGUgb2YgdGhlIFJlYWN0RE9NIGNvbnRyb2xsZWQgZm9ybSBjb21wb25lbnRzLlxuICAgKi9cbiAgUmVhY3RDb250cm9sbGVkVmFsdWVQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMgPSBmdW5jdGlvbiAodGFnTmFtZSwgcHJvcHMsIGdldFN0YWNrKSB7XG4gICAgY2hlY2tQcm9wVHlwZXMocHJvcFR5cGVzLCBwcm9wcywgJ3Byb3AnLCB0YWdOYW1lLCBnZXRTdGFjayk7XG4gIH07XG59XG5cbi8vIEZvciBIVE1MLCBjZXJ0YWluIHRhZ3Mgc2hvdWxkIG9taXQgdGhlaXIgY2xvc2UgdGFnLiBXZSBrZWVwIGEgd2hpdGVsaXN0IGZvclxuLy8gdGhvc2Ugc3BlY2lhbC1jYXNlIHRhZ3MuXG5cbnZhciBvbWl0dGVkQ2xvc2VUYWdzID0ge1xuICBhcmVhOiB0cnVlLFxuICBiYXNlOiB0cnVlLFxuICBicjogdHJ1ZSxcbiAgY29sOiB0cnVlLFxuICBlbWJlZDogdHJ1ZSxcbiAgaHI6IHRydWUsXG4gIGltZzogdHJ1ZSxcbiAgaW5wdXQ6IHRydWUsXG4gIGtleWdlbjogdHJ1ZSxcbiAgbGluazogdHJ1ZSxcbiAgbWV0YTogdHJ1ZSxcbiAgcGFyYW06IHRydWUsXG4gIHNvdXJjZTogdHJ1ZSxcbiAgdHJhY2s6IHRydWUsXG4gIHdicjogdHJ1ZVxufTtcblxuLy8gRm9yIEhUTUwsIGNlcnRhaW4gdGFncyBjYW5ub3QgaGF2ZSBjaGlsZHJlbi4gVGhpcyBoYXMgdGhlIHNhbWUgcHVycG9zZSBhc1xuLy8gYG9taXR0ZWRDbG9zZVRhZ3NgIGV4Y2VwdCB0aGF0IGBtZW51aXRlbWAgc2hvdWxkIHN0aWxsIGhhdmUgaXRzIGNsb3NpbmcgdGFnLlxuXG52YXIgdm9pZEVsZW1lbnRUYWdzID0gX2Fzc2lnbih7XG4gIG1lbnVpdGVtOiB0cnVlXG59LCBvbWl0dGVkQ2xvc2VUYWdzKTtcblxudmFyIEhUTUwgPSAnX19odG1sJztcblxuZnVuY3Rpb24gYXNzZXJ0VmFsaWRQcm9wcyh0YWcsIHByb3BzLCBnZXRTdGFjaykge1xuICBpZiAoIXByb3BzKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIE5vdGUgdGhlIHVzZSBvZiBgPT1gIHdoaWNoIGNoZWNrcyBmb3IgbnVsbCBvciB1bmRlZmluZWQuXG4gIGlmICh2b2lkRWxlbWVudFRhZ3NbdGFnXSkge1xuICAgICEocHJvcHMuY2hpbGRyZW4gPT0gbnVsbCAmJiBwcm9wcy5kYW5nZXJvdXNseVNldElubmVySFRNTCA9PSBudWxsKSA/IGludmFyaWFudChmYWxzZSwgJyVzIGlzIGEgdm9pZCBlbGVtZW50IHRhZyBhbmQgbXVzdCBuZWl0aGVyIGhhdmUgYGNoaWxkcmVuYCBub3IgdXNlIGBkYW5nZXJvdXNseVNldElubmVySFRNTGAuJXMnLCB0YWcsIGdldFN0YWNrKCkpIDogdm9pZCAwO1xuICB9XG4gIGlmIChwcm9wcy5kYW5nZXJvdXNseVNldElubmVySFRNTCAhPSBudWxsKSB7XG4gICAgIShwcm9wcy5jaGlsZHJlbiA9PSBudWxsKSA/IGludmFyaWFudChmYWxzZSwgJ0NhbiBvbmx5IHNldCBvbmUgb2YgYGNoaWxkcmVuYCBvciBgcHJvcHMuZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxgLicpIDogdm9pZCAwO1xuICAgICEodHlwZW9mIHByb3BzLmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MID09PSAnb2JqZWN0JyAmJiBIVE1MIGluIHByb3BzLmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MKSA/IGludmFyaWFudChmYWxzZSwgJ2Bwcm9wcy5kYW5nZXJvdXNseVNldElubmVySFRNTGAgbXVzdCBiZSBpbiB0aGUgZm9ybSBge19faHRtbDogLi4ufWAuIFBsZWFzZSB2aXNpdCBodHRwczovL2ZiLm1lL3JlYWN0LWludmFyaWFudC1kYW5nZXJvdXNseS1zZXQtaW5uZXItaHRtbCBmb3IgbW9yZSBpbmZvcm1hdGlvbi4nKSA6IHZvaWQgMDtcbiAgfVxuICB7XG4gICAgd2FybmluZyhwcm9wcy5zdXBwcmVzc0NvbnRlbnRFZGl0YWJsZVdhcm5pbmcgfHwgIXByb3BzLmNvbnRlbnRFZGl0YWJsZSB8fCBwcm9wcy5jaGlsZHJlbiA9PSBudWxsLCAnQSBjb21wb25lbnQgaXMgYGNvbnRlbnRFZGl0YWJsZWAgYW5kIGNvbnRhaW5zIGBjaGlsZHJlbmAgbWFuYWdlZCBieSAnICsgJ1JlYWN0LiBJdCBpcyBub3cgeW91ciByZXNwb25zaWJpbGl0eSB0byBndWFyYW50ZWUgdGhhdCBub25lIG9mICcgKyAndGhvc2Ugbm9kZXMgYXJlIHVuZXhwZWN0ZWRseSBtb2RpZmllZCBvciBkdXBsaWNhdGVkLiBUaGlzIGlzICcgKyAncHJvYmFibHkgbm90IGludGVudGlvbmFsLiVzJywgZ2V0U3RhY2soKSk7XG4gIH1cbiAgIShwcm9wcy5zdHlsZSA9PSBudWxsIHx8IHR5cGVvZiBwcm9wcy5zdHlsZSA9PT0gJ29iamVjdCcpID8gaW52YXJpYW50KGZhbHNlLCAnVGhlIGBzdHlsZWAgcHJvcCBleHBlY3RzIGEgbWFwcGluZyBmcm9tIHN0eWxlIHByb3BlcnRpZXMgdG8gdmFsdWVzLCBub3QgYSBzdHJpbmcuIEZvciBleGFtcGxlLCBzdHlsZT17e21hcmdpblJpZ2h0OiBzcGFjaW5nICsgXFwnZW1cXCd9fSB3aGVuIHVzaW5nIEpTWC4lcycsIGdldFN0YWNrKCkpIDogdm9pZCAwO1xufVxuXG4vKipcbiAqIENTUyBwcm9wZXJ0aWVzIHdoaWNoIGFjY2VwdCBudW1iZXJzIGJ1dCBhcmUgbm90IGluIHVuaXRzIG9mIFwicHhcIi5cbiAqL1xudmFyIGlzVW5pdGxlc3NOdW1iZXIgPSB7XG4gIGFuaW1hdGlvbkl0ZXJhdGlvbkNvdW50OiB0cnVlLFxuICBib3JkZXJJbWFnZU91dHNldDogdHJ1ZSxcbiAgYm9yZGVySW1hZ2VTbGljZTogdHJ1ZSxcbiAgYm9yZGVySW1hZ2VXaWR0aDogdHJ1ZSxcbiAgYm94RmxleDogdHJ1ZSxcbiAgYm94RmxleEdyb3VwOiB0cnVlLFxuICBib3hPcmRpbmFsR3JvdXA6IHRydWUsXG4gIGNvbHVtbkNvdW50OiB0cnVlLFxuICBjb2x1bW5zOiB0cnVlLFxuICBmbGV4OiB0cnVlLFxuICBmbGV4R3JvdzogdHJ1ZSxcbiAgZmxleFBvc2l0aXZlOiB0cnVlLFxuICBmbGV4U2hyaW5rOiB0cnVlLFxuICBmbGV4TmVnYXRpdmU6IHRydWUsXG4gIGZsZXhPcmRlcjogdHJ1ZSxcbiAgZ3JpZFJvdzogdHJ1ZSxcbiAgZ3JpZFJvd0VuZDogdHJ1ZSxcbiAgZ3JpZFJvd1NwYW46IHRydWUsXG4gIGdyaWRSb3dTdGFydDogdHJ1ZSxcbiAgZ3JpZENvbHVtbjogdHJ1ZSxcbiAgZ3JpZENvbHVtbkVuZDogdHJ1ZSxcbiAgZ3JpZENvbHVtblNwYW46IHRydWUsXG4gIGdyaWRDb2x1bW5TdGFydDogdHJ1ZSxcbiAgZm9udFdlaWdodDogdHJ1ZSxcbiAgbGluZUNsYW1wOiB0cnVlLFxuICBsaW5lSGVpZ2h0OiB0cnVlLFxuICBvcGFjaXR5OiB0cnVlLFxuICBvcmRlcjogdHJ1ZSxcbiAgb3JwaGFuczogdHJ1ZSxcbiAgdGFiU2l6ZTogdHJ1ZSxcbiAgd2lkb3dzOiB0cnVlLFxuICB6SW5kZXg6IHRydWUsXG4gIHpvb206IHRydWUsXG5cbiAgLy8gU1ZHLXJlbGF0ZWQgcHJvcGVydGllc1xuICBmaWxsT3BhY2l0eTogdHJ1ZSxcbiAgZmxvb2RPcGFjaXR5OiB0cnVlLFxuICBzdG9wT3BhY2l0eTogdHJ1ZSxcbiAgc3Ryb2tlRGFzaGFycmF5OiB0cnVlLFxuICBzdHJva2VEYXNob2Zmc2V0OiB0cnVlLFxuICBzdHJva2VNaXRlcmxpbWl0OiB0cnVlLFxuICBzdHJva2VPcGFjaXR5OiB0cnVlLFxuICBzdHJva2VXaWR0aDogdHJ1ZVxufTtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4IHZlbmRvci1zcGVjaWZpYyBwcmVmaXgsIGVnOiBXZWJraXRcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgc3R5bGUgbmFtZSwgZWc6IHRyYW5zaXRpb25EdXJhdGlvblxuICogQHJldHVybiB7c3RyaW5nfSBzdHlsZSBuYW1lIHByZWZpeGVkIHdpdGggYHByZWZpeGAsIHByb3Blcmx5IGNhbWVsQ2FzZWQsIGVnOlxuICogV2Via2l0VHJhbnNpdGlvbkR1cmF0aW9uXG4gKi9cbmZ1bmN0aW9uIHByZWZpeEtleShwcmVmaXgsIGtleSkge1xuICByZXR1cm4gcHJlZml4ICsga2V5LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsga2V5LnN1YnN0cmluZygxKTtcbn1cblxuLyoqXG4gKiBTdXBwb3J0IHN0eWxlIG5hbWVzIHRoYXQgbWF5IGNvbWUgcGFzc2VkIGluIHByZWZpeGVkIGJ5IGFkZGluZyBwZXJtdXRhdGlvbnNcbiAqIG9mIHZlbmRvciBwcmVmaXhlcy5cbiAqL1xudmFyIHByZWZpeGVzID0gWydXZWJraXQnLCAnbXMnLCAnTW96JywgJ08nXTtcblxuLy8gVXNpbmcgT2JqZWN0LmtleXMgaGVyZSwgb3IgZWxzZSB0aGUgdmFuaWxsYSBmb3ItaW4gbG9vcCBtYWtlcyBJRTggZ28gaW50byBhblxuLy8gaW5maW5pdGUgbG9vcCwgYmVjYXVzZSBpdCBpdGVyYXRlcyBvdmVyIHRoZSBuZXdseSBhZGRlZCBwcm9wcyB0b28uXG5PYmplY3Qua2V5cyhpc1VuaXRsZXNzTnVtYmVyKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wKSB7XG4gIHByZWZpeGVzLmZvckVhY2goZnVuY3Rpb24gKHByZWZpeCkge1xuICAgIGlzVW5pdGxlc3NOdW1iZXJbcHJlZml4S2V5KHByZWZpeCwgcHJvcCldID0gaXNVbml0bGVzc051bWJlcltwcm9wXTtcbiAgfSk7XG59KTtcblxuLyoqXG4gKiBDb252ZXJ0IGEgdmFsdWUgaW50byB0aGUgcHJvcGVyIGNzcyB3cml0YWJsZSB2YWx1ZS4gVGhlIHN0eWxlIG5hbWUgYG5hbWVgXG4gKiBzaG91bGQgYmUgbG9naWNhbCAobm8gaHlwaGVucyksIGFzIHNwZWNpZmllZFxuICogaW4gYENTU1Byb3BlcnR5LmlzVW5pdGxlc3NOdW1iZXJgLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIENTUyBwcm9wZXJ0eSBuYW1lIHN1Y2ggYXMgYHRvcE1hcmdpbmAuXG4gKiBAcGFyYW0geyp9IHZhbHVlIENTUyBwcm9wZXJ0eSB2YWx1ZSBzdWNoIGFzIGAxMHB4YC5cbiAqIEByZXR1cm4ge3N0cmluZ30gTm9ybWFsaXplZCBzdHlsZSB2YWx1ZSB3aXRoIGRpbWVuc2lvbnMgYXBwbGllZC5cbiAqL1xuZnVuY3Rpb24gZGFuZ2Vyb3VzU3R5bGVWYWx1ZShuYW1lLCB2YWx1ZSwgaXNDdXN0b21Qcm9wZXJ0eSkge1xuICAvLyBOb3RlIHRoYXQgd2UndmUgcmVtb3ZlZCBlc2NhcGVUZXh0Rm9yQnJvd3NlcigpIGNhbGxzIGhlcmUgc2luY2UgdGhlXG4gIC8vIHdob2xlIHN0cmluZyB3aWxsIGJlIGVzY2FwZWQgd2hlbiB0aGUgYXR0cmlidXRlIGlzIGluamVjdGVkIGludG9cbiAgLy8gdGhlIG1hcmt1cC4gSWYgeW91IHByb3ZpZGUgdW5zYWZlIHVzZXIgZGF0YSBoZXJlIHRoZXkgY2FuIGluamVjdFxuICAvLyBhcmJpdHJhcnkgQ1NTIHdoaWNoIG1heSBiZSBwcm9ibGVtYXRpYyAoSSBjb3VsZG4ndCByZXBybyB0aGlzKTpcbiAgLy8gaHR0cHM6Ly93d3cub3dhc3Aub3JnL2luZGV4LnBocC9YU1NfRmlsdGVyX0V2YXNpb25fQ2hlYXRfU2hlZXRcbiAgLy8gaHR0cDovL3d3dy50aGVzcGFubmVyLmNvLnVrLzIwMDcvMTEvMjYvdWx0aW1hdGUteHNzLWNzcy1pbmplY3Rpb24vXG4gIC8vIFRoaXMgaXMgbm90IGFuIFhTUyBob2xlIGJ1dCBpbnN0ZWFkIGEgcG90ZW50aWFsIENTUyBpbmplY3Rpb24gaXNzdWVcbiAgLy8gd2hpY2ggaGFzIGxlYWQgdG8gYSBncmVhdGVyIGRpc2N1c3Npb24gYWJvdXQgaG93IHdlJ3JlIGdvaW5nIHRvXG4gIC8vIHRydXN0IFVSTHMgbW92aW5nIGZvcndhcmQuIFNlZSAjMjExNTkwMVxuXG4gIHZhciBpc0VtcHR5ID0gdmFsdWUgPT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJyB8fCB2YWx1ZSA9PT0gJyc7XG4gIGlmIChpc0VtcHR5KSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgaWYgKCFpc0N1c3RvbVByb3BlcnR5ICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgdmFsdWUgIT09IDAgJiYgIShpc1VuaXRsZXNzTnVtYmVyLmhhc093blByb3BlcnR5KG5hbWUpICYmIGlzVW5pdGxlc3NOdW1iZXJbbmFtZV0pKSB7XG4gICAgcmV0dXJuIHZhbHVlICsgJ3B4JzsgLy8gUHJlc3VtZXMgaW1wbGljaXQgJ3B4JyBzdWZmaXggZm9yIHVuaXRsZXNzIG51bWJlcnNcbiAgfVxuXG4gIHJldHVybiAoJycgKyB2YWx1ZSkudHJpbSgpO1xufVxuXG5mdW5jdGlvbiBpc0N1c3RvbUNvbXBvbmVudCh0YWdOYW1lLCBwcm9wcykge1xuICBpZiAodGFnTmFtZS5pbmRleE9mKCctJykgPT09IC0xKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBwcm9wcy5pcyA9PT0gJ3N0cmluZyc7XG4gIH1cbiAgc3dpdGNoICh0YWdOYW1lKSB7XG4gICAgLy8gVGhlc2UgYXJlIHJlc2VydmVkIFNWRyBhbmQgTWF0aE1MIGVsZW1lbnRzLlxuICAgIC8vIFdlIGRvbid0IG1pbmQgdGhpcyB3aGl0ZWxpc3QgdG9vIG11Y2ggYmVjYXVzZSB3ZSBleHBlY3QgaXQgdG8gbmV2ZXIgZ3Jvdy5cbiAgICAvLyBUaGUgYWx0ZXJuYXRpdmUgaXMgdG8gdHJhY2sgdGhlIG5hbWVzcGFjZSBpbiBhIGZldyBwbGFjZXMgd2hpY2ggaXMgY29udm9sdXRlZC5cbiAgICAvLyBodHRwczovL3czYy5naXRodWIuaW8vd2ViY29tcG9uZW50cy9zcGVjL2N1c3RvbS8jY3VzdG9tLWVsZW1lbnRzLWNvcmUtY29uY2VwdHNcbiAgICBjYXNlICdhbm5vdGF0aW9uLXhtbCc6XG4gICAgY2FzZSAnY29sb3ItcHJvZmlsZSc6XG4gICAgY2FzZSAnZm9udC1mYWNlJzpcbiAgICBjYXNlICdmb250LWZhY2Utc3JjJzpcbiAgICBjYXNlICdmb250LWZhY2UtdXJpJzpcbiAgICBjYXNlICdmb250LWZhY2UtZm9ybWF0JzpcbiAgICBjYXNlICdmb250LWZhY2UtbmFtZSc6XG4gICAgY2FzZSAnbWlzc2luZy1nbHlwaCc6XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cbnZhciB3YXJuVmFsaWRTdHlsZSA9IGVtcHR5RnVuY3Rpb247XG5cbntcbiAgLy8gJ21zVHJhbnNmb3JtJyBpcyBjb3JyZWN0LCBidXQgdGhlIG90aGVyIHByZWZpeGVzIHNob3VsZCBiZSBjYXBpdGFsaXplZFxuICB2YXIgYmFkVmVuZG9yZWRTdHlsZU5hbWVQYXR0ZXJuID0gL14oPzp3ZWJraXR8bW96fG8pW0EtWl0vO1xuXG4gIC8vIHN0eWxlIHZhbHVlcyBzaG91bGRuJ3QgY29udGFpbiBhIHNlbWljb2xvblxuICB2YXIgYmFkU3R5bGVWYWx1ZVdpdGhTZW1pY29sb25QYXR0ZXJuID0gLztcXHMqJC87XG5cbiAgdmFyIHdhcm5lZFN0eWxlTmFtZXMgPSB7fTtcbiAgdmFyIHdhcm5lZFN0eWxlVmFsdWVzID0ge307XG4gIHZhciB3YXJuZWRGb3JOYU5WYWx1ZSA9IGZhbHNlO1xuICB2YXIgd2FybmVkRm9ySW5maW5pdHlWYWx1ZSA9IGZhbHNlO1xuXG4gIHZhciB3YXJuSHlwaGVuYXRlZFN0eWxlTmFtZSA9IGZ1bmN0aW9uIChuYW1lLCBnZXRTdGFjaykge1xuICAgIGlmICh3YXJuZWRTdHlsZU5hbWVzLmhhc093blByb3BlcnR5KG5hbWUpICYmIHdhcm5lZFN0eWxlTmFtZXNbbmFtZV0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB3YXJuZWRTdHlsZU5hbWVzW25hbWVdID0gdHJ1ZTtcbiAgICB3YXJuaW5nKGZhbHNlLCAnVW5zdXBwb3J0ZWQgc3R5bGUgcHJvcGVydHkgJXMuIERpZCB5b3UgbWVhbiAlcz8lcycsIG5hbWUsIGNhbWVsaXplU3R5bGVOYW1lKG5hbWUpLCBnZXRTdGFjaygpKTtcbiAgfTtcblxuICB2YXIgd2FybkJhZFZlbmRvcmVkU3R5bGVOYW1lID0gZnVuY3Rpb24gKG5hbWUsIGdldFN0YWNrKSB7XG4gICAgaWYgKHdhcm5lZFN0eWxlTmFtZXMuaGFzT3duUHJvcGVydHkobmFtZSkgJiYgd2FybmVkU3R5bGVOYW1lc1tuYW1lXSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHdhcm5lZFN0eWxlTmFtZXNbbmFtZV0gPSB0cnVlO1xuICAgIHdhcm5pbmcoZmFsc2UsICdVbnN1cHBvcnRlZCB2ZW5kb3ItcHJlZml4ZWQgc3R5bGUgcHJvcGVydHkgJXMuIERpZCB5b3UgbWVhbiAlcz8lcycsIG5hbWUsIG5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBuYW1lLnNsaWNlKDEpLCBnZXRTdGFjaygpKTtcbiAgfTtcblxuICB2YXIgd2FyblN0eWxlVmFsdWVXaXRoU2VtaWNvbG9uID0gZnVuY3Rpb24gKG5hbWUsIHZhbHVlLCBnZXRTdGFjaykge1xuICAgIGlmICh3YXJuZWRTdHlsZVZhbHVlcy5oYXNPd25Qcm9wZXJ0eSh2YWx1ZSkgJiYgd2FybmVkU3R5bGVWYWx1ZXNbdmFsdWVdKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgd2FybmVkU3R5bGVWYWx1ZXNbdmFsdWVdID0gdHJ1ZTtcbiAgICB3YXJuaW5nKGZhbHNlLCBcIlN0eWxlIHByb3BlcnR5IHZhbHVlcyBzaG91bGRuJ3QgY29udGFpbiBhIHNlbWljb2xvbi4gXCIgKyAnVHJ5IFwiJXM6ICVzXCIgaW5zdGVhZC4lcycsIG5hbWUsIHZhbHVlLnJlcGxhY2UoYmFkU3R5bGVWYWx1ZVdpdGhTZW1pY29sb25QYXR0ZXJuLCAnJyksIGdldFN0YWNrKCkpO1xuICB9O1xuXG4gIHZhciB3YXJuU3R5bGVWYWx1ZUlzTmFOID0gZnVuY3Rpb24gKG5hbWUsIHZhbHVlLCBnZXRTdGFjaykge1xuICAgIGlmICh3YXJuZWRGb3JOYU5WYWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHdhcm5lZEZvck5hTlZhbHVlID0gdHJ1ZTtcbiAgICB3YXJuaW5nKGZhbHNlLCAnYE5hTmAgaXMgYW4gaW52YWxpZCB2YWx1ZSBmb3IgdGhlIGAlc2AgY3NzIHN0eWxlIHByb3BlcnR5LiVzJywgbmFtZSwgZ2V0U3RhY2soKSk7XG4gIH07XG5cbiAgdmFyIHdhcm5TdHlsZVZhbHVlSXNJbmZpbml0eSA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSwgZ2V0U3RhY2spIHtcbiAgICBpZiAod2FybmVkRm9ySW5maW5pdHlWYWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHdhcm5lZEZvckluZmluaXR5VmFsdWUgPSB0cnVlO1xuICAgIHdhcm5pbmcoZmFsc2UsICdgSW5maW5pdHlgIGlzIGFuIGludmFsaWQgdmFsdWUgZm9yIHRoZSBgJXNgIGNzcyBzdHlsZSBwcm9wZXJ0eS4lcycsIG5hbWUsIGdldFN0YWNrKCkpO1xuICB9O1xuXG4gIHdhcm5WYWxpZFN0eWxlID0gZnVuY3Rpb24gKG5hbWUsIHZhbHVlLCBnZXRTdGFjaykge1xuICAgIGlmIChuYW1lLmluZGV4T2YoJy0nKSA+IC0xKSB7XG4gICAgICB3YXJuSHlwaGVuYXRlZFN0eWxlTmFtZShuYW1lLCBnZXRTdGFjayk7XG4gICAgfSBlbHNlIGlmIChiYWRWZW5kb3JlZFN0eWxlTmFtZVBhdHRlcm4udGVzdChuYW1lKSkge1xuICAgICAgd2FybkJhZFZlbmRvcmVkU3R5bGVOYW1lKG5hbWUsIGdldFN0YWNrKTtcbiAgICB9IGVsc2UgaWYgKGJhZFN0eWxlVmFsdWVXaXRoU2VtaWNvbG9uUGF0dGVybi50ZXN0KHZhbHVlKSkge1xuICAgICAgd2FyblN0eWxlVmFsdWVXaXRoU2VtaWNvbG9uKG5hbWUsIHZhbHVlLCBnZXRTdGFjayk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIGlmIChpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgd2FyblN0eWxlVmFsdWVJc05hTihuYW1lLCB2YWx1ZSwgZ2V0U3RhY2spO1xuICAgICAgfSBlbHNlIGlmICghaXNGaW5pdGUodmFsdWUpKSB7XG4gICAgICAgIHdhcm5TdHlsZVZhbHVlSXNJbmZpbml0eShuYW1lLCB2YWx1ZSwgZ2V0U3RhY2spO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxudmFyIHdhcm5WYWxpZFN0eWxlJDEgPSB3YXJuVmFsaWRTdHlsZTtcblxudmFyIGFyaWFQcm9wZXJ0aWVzID0ge1xuICAnYXJpYS1jdXJyZW50JzogMCwgLy8gc3RhdGVcbiAgJ2FyaWEtZGV0YWlscyc6IDAsXG4gICdhcmlhLWRpc2FibGVkJzogMCwgLy8gc3RhdGVcbiAgJ2FyaWEtaGlkZGVuJzogMCwgLy8gc3RhdGVcbiAgJ2FyaWEtaW52YWxpZCc6IDAsIC8vIHN0YXRlXG4gICdhcmlhLWtleXNob3J0Y3V0cyc6IDAsXG4gICdhcmlhLWxhYmVsJzogMCxcbiAgJ2FyaWEtcm9sZWRlc2NyaXB0aW9uJzogMCxcbiAgLy8gV2lkZ2V0IEF0dHJpYnV0ZXNcbiAgJ2FyaWEtYXV0b2NvbXBsZXRlJzogMCxcbiAgJ2FyaWEtY2hlY2tlZCc6IDAsXG4gICdhcmlhLWV4cGFuZGVkJzogMCxcbiAgJ2FyaWEtaGFzcG9wdXAnOiAwLFxuICAnYXJpYS1sZXZlbCc6IDAsXG4gICdhcmlhLW1vZGFsJzogMCxcbiAgJ2FyaWEtbXVsdGlsaW5lJzogMCxcbiAgJ2FyaWEtbXVsdGlzZWxlY3RhYmxlJzogMCxcbiAgJ2FyaWEtb3JpZW50YXRpb24nOiAwLFxuICAnYXJpYS1wbGFjZWhvbGRlcic6IDAsXG4gICdhcmlhLXByZXNzZWQnOiAwLFxuICAnYXJpYS1yZWFkb25seSc6IDAsXG4gICdhcmlhLXJlcXVpcmVkJzogMCxcbiAgJ2FyaWEtc2VsZWN0ZWQnOiAwLFxuICAnYXJpYS1zb3J0JzogMCxcbiAgJ2FyaWEtdmFsdWVtYXgnOiAwLFxuICAnYXJpYS12YWx1ZW1pbic6IDAsXG4gICdhcmlhLXZhbHVlbm93JzogMCxcbiAgJ2FyaWEtdmFsdWV0ZXh0JzogMCxcbiAgLy8gTGl2ZSBSZWdpb24gQXR0cmlidXRlc1xuICAnYXJpYS1hdG9taWMnOiAwLFxuICAnYXJpYS1idXN5JzogMCxcbiAgJ2FyaWEtbGl2ZSc6IDAsXG4gICdhcmlhLXJlbGV2YW50JzogMCxcbiAgLy8gRHJhZy1hbmQtRHJvcCBBdHRyaWJ1dGVzXG4gICdhcmlhLWRyb3BlZmZlY3QnOiAwLFxuICAnYXJpYS1ncmFiYmVkJzogMCxcbiAgLy8gUmVsYXRpb25zaGlwIEF0dHJpYnV0ZXNcbiAgJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCc6IDAsXG4gICdhcmlhLWNvbGNvdW50JzogMCxcbiAgJ2FyaWEtY29saW5kZXgnOiAwLFxuICAnYXJpYS1jb2xzcGFuJzogMCxcbiAgJ2FyaWEtY29udHJvbHMnOiAwLFxuICAnYXJpYS1kZXNjcmliZWRieSc6IDAsXG4gICdhcmlhLWVycm9ybWVzc2FnZSc6IDAsXG4gICdhcmlhLWZsb3d0byc6IDAsXG4gICdhcmlhLWxhYmVsbGVkYnknOiAwLFxuICAnYXJpYS1vd25zJzogMCxcbiAgJ2FyaWEtcG9zaW5zZXQnOiAwLFxuICAnYXJpYS1yb3djb3VudCc6IDAsXG4gICdhcmlhLXJvd2luZGV4JzogMCxcbiAgJ2FyaWEtcm93c3Bhbic6IDAsXG4gICdhcmlhLXNldHNpemUnOiAwXG59O1xuXG52YXIgd2FybmVkUHJvcGVydGllcyA9IHt9O1xudmFyIHJBUklBID0gbmV3IFJlZ0V4cCgnXihhcmlhKS1bJyArIEFUVFJJQlVURV9OQU1FX0NIQVIgKyAnXSokJyk7XG52YXIgckFSSUFDYW1lbCA9IG5ldyBSZWdFeHAoJ14oYXJpYSlbQS1aXVsnICsgQVRUUklCVVRFX05BTUVfQ0hBUiArICddKiQnKTtcblxudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuZnVuY3Rpb24gZ2V0U3RhY2tBZGRlbmR1bSQxKCkge1xuICB2YXIgc3RhY2sgPSBSZWFjdERlYnVnQ3VycmVudEZyYW1lLmdldFN0YWNrQWRkZW5kdW0oKTtcbiAgcmV0dXJuIHN0YWNrICE9IG51bGwgPyBzdGFjayA6ICcnO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZVByb3BlcnR5KHRhZ05hbWUsIG5hbWUpIHtcbiAgaWYgKGhhc093blByb3BlcnR5LmNhbGwod2FybmVkUHJvcGVydGllcywgbmFtZSkgJiYgd2FybmVkUHJvcGVydGllc1tuYW1lXSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWYgKHJBUklBQ2FtZWwudGVzdChuYW1lKSkge1xuICAgIHZhciBhcmlhTmFtZSA9ICdhcmlhLScgKyBuYW1lLnNsaWNlKDQpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIGNvcnJlY3ROYW1lID0gYXJpYVByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoYXJpYU5hbWUpID8gYXJpYU5hbWUgOiBudWxsO1xuXG4gICAgLy8gSWYgdGhpcyBpcyBhbiBhcmlhLSogYXR0cmlidXRlLCBidXQgaXMgbm90IGxpc3RlZCBpbiB0aGUga25vd24gRE9NXG4gICAgLy8gRE9NIHByb3BlcnRpZXMsIHRoZW4gaXQgaXMgYW4gaW52YWxpZCBhcmlhLSogYXR0cmlidXRlLlxuICAgIGlmIChjb3JyZWN0TmFtZSA9PSBudWxsKSB7XG4gICAgICB3YXJuaW5nKGZhbHNlLCAnSW52YWxpZCBBUklBIGF0dHJpYnV0ZSBgJXNgLiBBUklBIGF0dHJpYnV0ZXMgZm9sbG93IHRoZSBwYXR0ZXJuIGFyaWEtKiBhbmQgbXVzdCBiZSBsb3dlcmNhc2UuJXMnLCBuYW1lLCBnZXRTdGFja0FkZGVuZHVtJDEoKSk7XG4gICAgICB3YXJuZWRQcm9wZXJ0aWVzW25hbWVdID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvLyBhcmlhLSogYXR0cmlidXRlcyBzaG91bGQgYmUgbG93ZXJjYXNlOyBzdWdnZXN0IHRoZSBsb3dlcmNhc2UgdmVyc2lvbi5cbiAgICBpZiAobmFtZSAhPT0gY29ycmVjdE5hbWUpIHtcbiAgICAgIHdhcm5pbmcoZmFsc2UsICdJbnZhbGlkIEFSSUEgYXR0cmlidXRlIGAlc2AuIERpZCB5b3UgbWVhbiBgJXNgPyVzJywgbmFtZSwgY29ycmVjdE5hbWUsIGdldFN0YWNrQWRkZW5kdW0kMSgpKTtcbiAgICAgIHdhcm5lZFByb3BlcnRpZXNbbmFtZV0gPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgaWYgKHJBUklBLnRlc3QobmFtZSkpIHtcbiAgICB2YXIgbG93ZXJDYXNlZE5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIHN0YW5kYXJkTmFtZSA9IGFyaWFQcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KGxvd2VyQ2FzZWROYW1lKSA/IGxvd2VyQ2FzZWROYW1lIDogbnVsbDtcblxuICAgIC8vIElmIHRoaXMgaXMgYW4gYXJpYS0qIGF0dHJpYnV0ZSwgYnV0IGlzIG5vdCBsaXN0ZWQgaW4gdGhlIGtub3duIERPTVxuICAgIC8vIERPTSBwcm9wZXJ0aWVzLCB0aGVuIGl0IGlzIGFuIGludmFsaWQgYXJpYS0qIGF0dHJpYnV0ZS5cbiAgICBpZiAoc3RhbmRhcmROYW1lID09IG51bGwpIHtcbiAgICAgIHdhcm5lZFByb3BlcnRpZXNbbmFtZV0gPSB0cnVlO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBhcmlhLSogYXR0cmlidXRlcyBzaG91bGQgYmUgbG93ZXJjYXNlOyBzdWdnZXN0IHRoZSBsb3dlcmNhc2UgdmVyc2lvbi5cbiAgICBpZiAobmFtZSAhPT0gc3RhbmRhcmROYW1lKSB7XG4gICAgICB3YXJuaW5nKGZhbHNlLCAnVW5rbm93biBBUklBIGF0dHJpYnV0ZSBgJXNgLiBEaWQgeW91IG1lYW4gYCVzYD8lcycsIG5hbWUsIHN0YW5kYXJkTmFtZSwgZ2V0U3RhY2tBZGRlbmR1bSQxKCkpO1xuICAgICAgd2FybmVkUHJvcGVydGllc1tuYW1lXSA9IHRydWU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gd2FybkludmFsaWRBUklBUHJvcHModHlwZSwgcHJvcHMpIHtcbiAgdmFyIGludmFsaWRQcm9wcyA9IFtdO1xuXG4gIGZvciAodmFyIGtleSBpbiBwcm9wcykge1xuICAgIHZhciBpc1ZhbGlkID0gdmFsaWRhdGVQcm9wZXJ0eSh0eXBlLCBrZXkpO1xuICAgIGlmICghaXNWYWxpZCkge1xuICAgICAgaW52YWxpZFByb3BzLnB1c2goa2V5KTtcbiAgICB9XG4gIH1cblxuICB2YXIgdW5rbm93blByb3BTdHJpbmcgPSBpbnZhbGlkUHJvcHMubWFwKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgcmV0dXJuICdgJyArIHByb3AgKyAnYCc7XG4gIH0pLmpvaW4oJywgJyk7XG5cbiAgaWYgKGludmFsaWRQcm9wcy5sZW5ndGggPT09IDEpIHtcbiAgICB3YXJuaW5nKGZhbHNlLCAnSW52YWxpZCBhcmlhIHByb3AgJXMgb24gPCVzPiB0YWcuICcgKyAnRm9yIGRldGFpbHMsIHNlZSBodHRwczovL2ZiLm1lL2ludmFsaWQtYXJpYS1wcm9wJXMnLCB1bmtub3duUHJvcFN0cmluZywgdHlwZSwgZ2V0U3RhY2tBZGRlbmR1bSQxKCkpO1xuICB9IGVsc2UgaWYgKGludmFsaWRQcm9wcy5sZW5ndGggPiAxKSB7XG4gICAgd2FybmluZyhmYWxzZSwgJ0ludmFsaWQgYXJpYSBwcm9wcyAlcyBvbiA8JXM+IHRhZy4gJyArICdGb3IgZGV0YWlscywgc2VlIGh0dHBzOi8vZmIubWUvaW52YWxpZC1hcmlhLXByb3AlcycsIHVua25vd25Qcm9wU3RyaW5nLCB0eXBlLCBnZXRTdGFja0FkZGVuZHVtJDEoKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVQcm9wZXJ0aWVzKHR5cGUsIHByb3BzKSB7XG4gIGlmIChpc0N1c3RvbUNvbXBvbmVudCh0eXBlLCBwcm9wcykpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgd2FybkludmFsaWRBUklBUHJvcHModHlwZSwgcHJvcHMpO1xufVxuXG52YXIgZGlkV2FyblZhbHVlTnVsbCA9IGZhbHNlO1xuXG5mdW5jdGlvbiBnZXRTdGFja0FkZGVuZHVtJDIoKSB7XG4gIHZhciBzdGFjayA9IFJlYWN0RGVidWdDdXJyZW50RnJhbWUuZ2V0U3RhY2tBZGRlbmR1bSgpO1xuICByZXR1cm4gc3RhY2sgIT0gbnVsbCA/IHN0YWNrIDogJyc7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlUHJvcGVydGllcyQxKHR5cGUsIHByb3BzKSB7XG4gIGlmICh0eXBlICE9PSAnaW5wdXQnICYmIHR5cGUgIT09ICd0ZXh0YXJlYScgJiYgdHlwZSAhPT0gJ3NlbGVjdCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAocHJvcHMgIT0gbnVsbCAmJiBwcm9wcy52YWx1ZSA9PT0gbnVsbCAmJiAhZGlkV2FyblZhbHVlTnVsbCkge1xuICAgIGRpZFdhcm5WYWx1ZU51bGwgPSB0cnVlO1xuICAgIGlmICh0eXBlID09PSAnc2VsZWN0JyAmJiBwcm9wcy5tdWx0aXBsZSkge1xuICAgICAgd2FybmluZyhmYWxzZSwgJ2B2YWx1ZWAgcHJvcCBvbiBgJXNgIHNob3VsZCBub3QgYmUgbnVsbC4gJyArICdDb25zaWRlciB1c2luZyBhbiBlbXB0eSBhcnJheSB3aGVuIGBtdWx0aXBsZWAgaXMgc2V0IHRvIGB0cnVlYCAnICsgJ3RvIGNsZWFyIHRoZSBjb21wb25lbnQgb3IgYHVuZGVmaW5lZGAgZm9yIHVuY29udHJvbGxlZCBjb21wb25lbnRzLiVzJywgdHlwZSwgZ2V0U3RhY2tBZGRlbmR1bSQyKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3YXJuaW5nKGZhbHNlLCAnYHZhbHVlYCBwcm9wIG9uIGAlc2Agc2hvdWxkIG5vdCBiZSBudWxsLiAnICsgJ0NvbnNpZGVyIHVzaW5nIGFuIGVtcHR5IHN0cmluZyB0byBjbGVhciB0aGUgY29tcG9uZW50IG9yIGB1bmRlZmluZWRgICcgKyAnZm9yIHVuY29udHJvbGxlZCBjb21wb25lbnRzLiVzJywgdHlwZSwgZ2V0U3RhY2tBZGRlbmR1bSQyKCkpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFJlZ2lzdGVycyBwbHVnaW5zIHNvIHRoYXQgdGhleSBjYW4gZXh0cmFjdCBhbmQgZGlzcGF0Y2ggZXZlbnRzLlxuICpcbiAqIEBzZWUge0V2ZW50UGx1Z2luSHVifVxuICovXG5cbi8qKlxuICogT3JkZXJlZCBsaXN0IG9mIGluamVjdGVkIHBsdWdpbnMuXG4gKi9cblxuXG4vKipcbiAqIE1hcHBpbmcgZnJvbSBldmVudCBuYW1lIHRvIGRpc3BhdGNoIGNvbmZpZ1xuICovXG5cblxuLyoqXG4gKiBNYXBwaW5nIGZyb20gcmVnaXN0cmF0aW9uIG5hbWUgdG8gcGx1Z2luIG1vZHVsZVxuICovXG52YXIgcmVnaXN0cmF0aW9uTmFtZU1vZHVsZXMgPSB7fTtcblxuLyoqXG4gKiBNYXBwaW5nIGZyb20gcmVnaXN0cmF0aW9uIG5hbWUgdG8gZXZlbnQgbmFtZVxuICovXG5cblxuLyoqXG4gKiBNYXBwaW5nIGZyb20gbG93ZXJjYXNlIHJlZ2lzdHJhdGlvbiBuYW1lcyB0byB0aGUgcHJvcGVybHkgY2FzZWQgdmVyc2lvbixcbiAqIHVzZWQgdG8gd2FybiBpbiB0aGUgY2FzZSBvZiBtaXNzaW5nIGV2ZW50IGhhbmRsZXJzLiBBdmFpbGFibGVcbiAqIG9ubHkgaW4gdHJ1ZS5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbnZhciBwb3NzaWJsZVJlZ2lzdHJhdGlvbk5hbWVzID0ge307XG4vLyBUcnVzdCB0aGUgZGV2ZWxvcGVyIHRvIG9ubHkgdXNlIHBvc3NpYmxlUmVnaXN0cmF0aW9uTmFtZXMgaW4gdHJ1ZVxuXG4vKipcbiAqIEluamVjdHMgYW4gb3JkZXJpbmcgb2YgcGx1Z2lucyAoYnkgcGx1Z2luIG5hbWUpLiBUaGlzIGFsbG93cyB0aGUgb3JkZXJpbmdcbiAqIHRvIGJlIGRlY291cGxlZCBmcm9tIGluamVjdGlvbiBvZiB0aGUgYWN0dWFsIHBsdWdpbnMgc28gdGhhdCBvcmRlcmluZyBpc1xuICogYWx3YXlzIGRldGVybWluaXN0aWMgcmVnYXJkbGVzcyBvZiBwYWNrYWdpbmcsIG9uLXRoZS1mbHkgaW5qZWN0aW9uLCBldGMuXG4gKlxuICogQHBhcmFtIHthcnJheX0gSW5qZWN0ZWRFdmVudFBsdWdpbk9yZGVyXG4gKiBAaW50ZXJuYWxcbiAqIEBzZWUge0V2ZW50UGx1Z2luSHViLmluamVjdGlvbi5pbmplY3RFdmVudFBsdWdpbk9yZGVyfVxuICovXG5cblxuLyoqXG4gKiBJbmplY3RzIHBsdWdpbnMgdG8gYmUgdXNlZCBieSBgRXZlbnRQbHVnaW5IdWJgLiBUaGUgcGx1Z2luIG5hbWVzIG11c3QgYmVcbiAqIGluIHRoZSBvcmRlcmluZyBpbmplY3RlZCBieSBgaW5qZWN0RXZlbnRQbHVnaW5PcmRlcmAuXG4gKlxuICogUGx1Z2lucyBjYW4gYmUgaW5qZWN0ZWQgYXMgcGFydCBvZiBwYWdlIGluaXRpYWxpemF0aW9uIG9yIG9uLXRoZS1mbHkuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGluamVjdGVkTmFtZXNUb1BsdWdpbnMgTWFwIGZyb20gbmFtZXMgdG8gcGx1Z2luIG1vZHVsZXMuXG4gKiBAaW50ZXJuYWxcbiAqIEBzZWUge0V2ZW50UGx1Z2luSHViLmluamVjdGlvbi5pbmplY3RFdmVudFBsdWdpbnNCeU5hbWV9XG4gKi9cblxuLy8gV2hlbiBhZGRpbmcgYXR0cmlidXRlcyB0byB0aGUgSFRNTCBvciBTVkcgd2hpdGVsaXN0LCBiZSBzdXJlIHRvXG4vLyBhbHNvIGFkZCB0aGVtIHRvIHRoaXMgbW9kdWxlIHRvIGVuc3VyZSBjYXNpbmcgYW5kIGluY29ycmVjdCBuYW1lXG4vLyB3YXJuaW5ncy5cbnZhciBwb3NzaWJsZVN0YW5kYXJkTmFtZXMgPSB7XG4gIC8vIEhUTUxcbiAgYWNjZXB0OiAnYWNjZXB0JyxcbiAgYWNjZXB0Y2hhcnNldDogJ2FjY2VwdENoYXJzZXQnLFxuICAnYWNjZXB0LWNoYXJzZXQnOiAnYWNjZXB0Q2hhcnNldCcsXG4gIGFjY2Vzc2tleTogJ2FjY2Vzc0tleScsXG4gIGFjdGlvbjogJ2FjdGlvbicsXG4gIGFsbG93ZnVsbHNjcmVlbjogJ2FsbG93RnVsbFNjcmVlbicsXG4gIGFsdDogJ2FsdCcsXG4gIGFzOiAnYXMnLFxuICBhc3luYzogJ2FzeW5jJyxcbiAgYXV0b2NhcGl0YWxpemU6ICdhdXRvQ2FwaXRhbGl6ZScsXG4gIGF1dG9jb21wbGV0ZTogJ2F1dG9Db21wbGV0ZScsXG4gIGF1dG9jb3JyZWN0OiAnYXV0b0NvcnJlY3QnLFxuICBhdXRvZm9jdXM6ICdhdXRvRm9jdXMnLFxuICBhdXRvcGxheTogJ2F1dG9QbGF5JyxcbiAgYXV0b3NhdmU6ICdhdXRvU2F2ZScsXG4gIGNhcHR1cmU6ICdjYXB0dXJlJyxcbiAgY2VsbHBhZGRpbmc6ICdjZWxsUGFkZGluZycsXG4gIGNlbGxzcGFjaW5nOiAnY2VsbFNwYWNpbmcnLFxuICBjaGFsbGVuZ2U6ICdjaGFsbGVuZ2UnLFxuICBjaGFyc2V0OiAnY2hhclNldCcsXG4gIGNoZWNrZWQ6ICdjaGVja2VkJyxcbiAgY2hpbGRyZW46ICdjaGlsZHJlbicsXG4gIGNpdGU6ICdjaXRlJyxcbiAgJ2NsYXNzJzogJ2NsYXNzTmFtZScsXG4gIGNsYXNzaWQ6ICdjbGFzc0lEJyxcbiAgY2xhc3NuYW1lOiAnY2xhc3NOYW1lJyxcbiAgY29sczogJ2NvbHMnLFxuICBjb2xzcGFuOiAnY29sU3BhbicsXG4gIGNvbnRlbnQ6ICdjb250ZW50JyxcbiAgY29udGVudGVkaXRhYmxlOiAnY29udGVudEVkaXRhYmxlJyxcbiAgY29udGV4dG1lbnU6ICdjb250ZXh0TWVudScsXG4gIGNvbnRyb2xzOiAnY29udHJvbHMnLFxuICBjb250cm9sc2xpc3Q6ICdjb250cm9sc0xpc3QnLFxuICBjb29yZHM6ICdjb29yZHMnLFxuICBjcm9zc29yaWdpbjogJ2Nyb3NzT3JpZ2luJyxcbiAgZGFuZ2Vyb3VzbHlzZXRpbm5lcmh0bWw6ICdkYW5nZXJvdXNseVNldElubmVySFRNTCcsXG4gIGRhdGE6ICdkYXRhJyxcbiAgZGF0ZXRpbWU6ICdkYXRlVGltZScsXG4gICdkZWZhdWx0JzogJ2RlZmF1bHQnLFxuICBkZWZhdWx0Y2hlY2tlZDogJ2RlZmF1bHRDaGVja2VkJyxcbiAgZGVmYXVsdHZhbHVlOiAnZGVmYXVsdFZhbHVlJyxcbiAgZGVmZXI6ICdkZWZlcicsXG4gIGRpcjogJ2RpcicsXG4gIGRpc2FibGVkOiAnZGlzYWJsZWQnLFxuICBkb3dubG9hZDogJ2Rvd25sb2FkJyxcbiAgZHJhZ2dhYmxlOiAnZHJhZ2dhYmxlJyxcbiAgZW5jdHlwZTogJ2VuY1R5cGUnLFxuICAnZm9yJzogJ2h0bWxGb3InLFxuICBmb3JtOiAnZm9ybScsXG4gIGZvcm1tZXRob2Q6ICdmb3JtTWV0aG9kJyxcbiAgZm9ybWFjdGlvbjogJ2Zvcm1BY3Rpb24nLFxuICBmb3JtZW5jdHlwZTogJ2Zvcm1FbmNUeXBlJyxcbiAgZm9ybW5vdmFsaWRhdGU6ICdmb3JtTm9WYWxpZGF0ZScsXG4gIGZvcm10YXJnZXQ6ICdmb3JtVGFyZ2V0JyxcbiAgZnJhbWVib3JkZXI6ICdmcmFtZUJvcmRlcicsXG4gIGhlYWRlcnM6ICdoZWFkZXJzJyxcbiAgaGVpZ2h0OiAnaGVpZ2h0JyxcbiAgaGlkZGVuOiAnaGlkZGVuJyxcbiAgaGlnaDogJ2hpZ2gnLFxuICBocmVmOiAnaHJlZicsXG4gIGhyZWZsYW5nOiAnaHJlZkxhbmcnLFxuICBodG1sZm9yOiAnaHRtbEZvcicsXG4gIGh0dHBlcXVpdjogJ2h0dHBFcXVpdicsXG4gICdodHRwLWVxdWl2JzogJ2h0dHBFcXVpdicsXG4gIGljb246ICdpY29uJyxcbiAgaWQ6ICdpZCcsXG4gIGlubmVyaHRtbDogJ2lubmVySFRNTCcsXG4gIGlucHV0bW9kZTogJ2lucHV0TW9kZScsXG4gIGludGVncml0eTogJ2ludGVncml0eScsXG4gIGlzOiAnaXMnLFxuICBpdGVtaWQ6ICdpdGVtSUQnLFxuICBpdGVtcHJvcDogJ2l0ZW1Qcm9wJyxcbiAgaXRlbXJlZjogJ2l0ZW1SZWYnLFxuICBpdGVtc2NvcGU6ICdpdGVtU2NvcGUnLFxuICBpdGVtdHlwZTogJ2l0ZW1UeXBlJyxcbiAga2V5cGFyYW1zOiAna2V5UGFyYW1zJyxcbiAga2V5dHlwZTogJ2tleVR5cGUnLFxuICBraW5kOiAna2luZCcsXG4gIGxhYmVsOiAnbGFiZWwnLFxuICBsYW5nOiAnbGFuZycsXG4gIGxpc3Q6ICdsaXN0JyxcbiAgbG9vcDogJ2xvb3AnLFxuICBsb3c6ICdsb3cnLFxuICBtYW5pZmVzdDogJ21hbmlmZXN0JyxcbiAgbWFyZ2lud2lkdGg6ICdtYXJnaW5XaWR0aCcsXG4gIG1hcmdpbmhlaWdodDogJ21hcmdpbkhlaWdodCcsXG4gIG1heDogJ21heCcsXG4gIG1heGxlbmd0aDogJ21heExlbmd0aCcsXG4gIG1lZGlhOiAnbWVkaWEnLFxuICBtZWRpYWdyb3VwOiAnbWVkaWFHcm91cCcsXG4gIG1ldGhvZDogJ21ldGhvZCcsXG4gIG1pbjogJ21pbicsXG4gIG1pbmxlbmd0aDogJ21pbkxlbmd0aCcsXG4gIG11bHRpcGxlOiAnbXVsdGlwbGUnLFxuICBtdXRlZDogJ211dGVkJyxcbiAgbmFtZTogJ25hbWUnLFxuICBub25jZTogJ25vbmNlJyxcbiAgbm92YWxpZGF0ZTogJ25vVmFsaWRhdGUnLFxuICBvcGVuOiAnb3BlbicsXG4gIG9wdGltdW06ICdvcHRpbXVtJyxcbiAgcGF0dGVybjogJ3BhdHRlcm4nLFxuICBwbGFjZWhvbGRlcjogJ3BsYWNlaG9sZGVyJyxcbiAgcGxheXNpbmxpbmU6ICdwbGF5c0lubGluZScsXG4gIHBvc3RlcjogJ3Bvc3RlcicsXG4gIHByZWxvYWQ6ICdwcmVsb2FkJyxcbiAgcHJvZmlsZTogJ3Byb2ZpbGUnLFxuICByYWRpb2dyb3VwOiAncmFkaW9Hcm91cCcsXG4gIHJlYWRvbmx5OiAncmVhZE9ubHknLFxuICByZWZlcnJlcnBvbGljeTogJ3JlZmVycmVyUG9saWN5JyxcbiAgcmVsOiAncmVsJyxcbiAgcmVxdWlyZWQ6ICdyZXF1aXJlZCcsXG4gIHJldmVyc2VkOiAncmV2ZXJzZWQnLFxuICByb2xlOiAncm9sZScsXG4gIHJvd3M6ICdyb3dzJyxcbiAgcm93c3BhbjogJ3Jvd1NwYW4nLFxuICBzYW5kYm94OiAnc2FuZGJveCcsXG4gIHNjb3BlOiAnc2NvcGUnLFxuICBzY29wZWQ6ICdzY29wZWQnLFxuICBzY3JvbGxpbmc6ICdzY3JvbGxpbmcnLFxuICBzZWFtbGVzczogJ3NlYW1sZXNzJyxcbiAgc2VsZWN0ZWQ6ICdzZWxlY3RlZCcsXG4gIHNoYXBlOiAnc2hhcGUnLFxuICBzaXplOiAnc2l6ZScsXG4gIHNpemVzOiAnc2l6ZXMnLFxuICBzcGFuOiAnc3BhbicsXG4gIHNwZWxsY2hlY2s6ICdzcGVsbENoZWNrJyxcbiAgc3JjOiAnc3JjJyxcbiAgc3JjZG9jOiAnc3JjRG9jJyxcbiAgc3JjbGFuZzogJ3NyY0xhbmcnLFxuICBzcmNzZXQ6ICdzcmNTZXQnLFxuICBzdGFydDogJ3N0YXJ0JyxcbiAgc3RlcDogJ3N0ZXAnLFxuICBzdHlsZTogJ3N0eWxlJyxcbiAgc3VtbWFyeTogJ3N1bW1hcnknLFxuICB0YWJpbmRleDogJ3RhYkluZGV4JyxcbiAgdGFyZ2V0OiAndGFyZ2V0JyxcbiAgdGl0bGU6ICd0aXRsZScsXG4gIHR5cGU6ICd0eXBlJyxcbiAgdXNlbWFwOiAndXNlTWFwJyxcbiAgdmFsdWU6ICd2YWx1ZScsXG4gIHdpZHRoOiAnd2lkdGgnLFxuICB3bW9kZTogJ3dtb2RlJyxcbiAgd3JhcDogJ3dyYXAnLFxuXG4gIC8vIFNWR1xuICBhYm91dDogJ2Fib3V0JyxcbiAgYWNjZW50aGVpZ2h0OiAnYWNjZW50SGVpZ2h0JyxcbiAgJ2FjY2VudC1oZWlnaHQnOiAnYWNjZW50SGVpZ2h0JyxcbiAgYWNjdW11bGF0ZTogJ2FjY3VtdWxhdGUnLFxuICBhZGRpdGl2ZTogJ2FkZGl0aXZlJyxcbiAgYWxpZ25tZW50YmFzZWxpbmU6ICdhbGlnbm1lbnRCYXNlbGluZScsXG4gICdhbGlnbm1lbnQtYmFzZWxpbmUnOiAnYWxpZ25tZW50QmFzZWxpbmUnLFxuICBhbGxvd3Jlb3JkZXI6ICdhbGxvd1Jlb3JkZXInLFxuICBhbHBoYWJldGljOiAnYWxwaGFiZXRpYycsXG4gIGFtcGxpdHVkZTogJ2FtcGxpdHVkZScsXG4gIGFyYWJpY2Zvcm06ICdhcmFiaWNGb3JtJyxcbiAgJ2FyYWJpYy1mb3JtJzogJ2FyYWJpY0Zvcm0nLFxuICBhc2NlbnQ6ICdhc2NlbnQnLFxuICBhdHRyaWJ1dGVuYW1lOiAnYXR0cmlidXRlTmFtZScsXG4gIGF0dHJpYnV0ZXR5cGU6ICdhdHRyaWJ1dGVUeXBlJyxcbiAgYXV0b3JldmVyc2U6ICdhdXRvUmV2ZXJzZScsXG4gIGF6aW11dGg6ICdhemltdXRoJyxcbiAgYmFzZWZyZXF1ZW5jeTogJ2Jhc2VGcmVxdWVuY3knLFxuICBiYXNlbGluZXNoaWZ0OiAnYmFzZWxpbmVTaGlmdCcsXG4gICdiYXNlbGluZS1zaGlmdCc6ICdiYXNlbGluZVNoaWZ0JyxcbiAgYmFzZXByb2ZpbGU6ICdiYXNlUHJvZmlsZScsXG4gIGJib3g6ICdiYm94JyxcbiAgYmVnaW46ICdiZWdpbicsXG4gIGJpYXM6ICdiaWFzJyxcbiAgYnk6ICdieScsXG4gIGNhbGNtb2RlOiAnY2FsY01vZGUnLFxuICBjYXBoZWlnaHQ6ICdjYXBIZWlnaHQnLFxuICAnY2FwLWhlaWdodCc6ICdjYXBIZWlnaHQnLFxuICBjbGlwOiAnY2xpcCcsXG4gIGNsaXBwYXRoOiAnY2xpcFBhdGgnLFxuICAnY2xpcC1wYXRoJzogJ2NsaXBQYXRoJyxcbiAgY2xpcHBhdGh1bml0czogJ2NsaXBQYXRoVW5pdHMnLFxuICBjbGlwcnVsZTogJ2NsaXBSdWxlJyxcbiAgJ2NsaXAtcnVsZSc6ICdjbGlwUnVsZScsXG4gIGNvbG9yOiAnY29sb3InLFxuICBjb2xvcmludGVycG9sYXRpb246ICdjb2xvckludGVycG9sYXRpb24nLFxuICAnY29sb3ItaW50ZXJwb2xhdGlvbic6ICdjb2xvckludGVycG9sYXRpb24nLFxuICBjb2xvcmludGVycG9sYXRpb25maWx0ZXJzOiAnY29sb3JJbnRlcnBvbGF0aW9uRmlsdGVycycsXG4gICdjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnMnOiAnY29sb3JJbnRlcnBvbGF0aW9uRmlsdGVycycsXG4gIGNvbG9ycHJvZmlsZTogJ2NvbG9yUHJvZmlsZScsXG4gICdjb2xvci1wcm9maWxlJzogJ2NvbG9yUHJvZmlsZScsXG4gIGNvbG9ycmVuZGVyaW5nOiAnY29sb3JSZW5kZXJpbmcnLFxuICAnY29sb3ItcmVuZGVyaW5nJzogJ2NvbG9yUmVuZGVyaW5nJyxcbiAgY29udGVudHNjcmlwdHR5cGU6ICdjb250ZW50U2NyaXB0VHlwZScsXG4gIGNvbnRlbnRzdHlsZXR5cGU6ICdjb250ZW50U3R5bGVUeXBlJyxcbiAgY3Vyc29yOiAnY3Vyc29yJyxcbiAgY3g6ICdjeCcsXG4gIGN5OiAnY3knLFxuICBkOiAnZCcsXG4gIGRhdGF0eXBlOiAnZGF0YXR5cGUnLFxuICBkZWNlbGVyYXRlOiAnZGVjZWxlcmF0ZScsXG4gIGRlc2NlbnQ6ICdkZXNjZW50JyxcbiAgZGlmZnVzZWNvbnN0YW50OiAnZGlmZnVzZUNvbnN0YW50JyxcbiAgZGlyZWN0aW9uOiAnZGlyZWN0aW9uJyxcbiAgZGlzcGxheTogJ2Rpc3BsYXknLFxuICBkaXZpc29yOiAnZGl2aXNvcicsXG4gIGRvbWluYW50YmFzZWxpbmU6ICdkb21pbmFudEJhc2VsaW5lJyxcbiAgJ2RvbWluYW50LWJhc2VsaW5lJzogJ2RvbWluYW50QmFzZWxpbmUnLFxuICBkdXI6ICdkdXInLFxuICBkeDogJ2R4JyxcbiAgZHk6ICdkeScsXG4gIGVkZ2Vtb2RlOiAnZWRnZU1vZGUnLFxuICBlbGV2YXRpb246ICdlbGV2YXRpb24nLFxuICBlbmFibGViYWNrZ3JvdW5kOiAnZW5hYmxlQmFja2dyb3VuZCcsXG4gICdlbmFibGUtYmFja2dyb3VuZCc6ICdlbmFibGVCYWNrZ3JvdW5kJyxcbiAgZW5kOiAnZW5kJyxcbiAgZXhwb25lbnQ6ICdleHBvbmVudCcsXG4gIGV4dGVybmFscmVzb3VyY2VzcmVxdWlyZWQ6ICdleHRlcm5hbFJlc291cmNlc1JlcXVpcmVkJyxcbiAgZmlsbDogJ2ZpbGwnLFxuICBmaWxsb3BhY2l0eTogJ2ZpbGxPcGFjaXR5JyxcbiAgJ2ZpbGwtb3BhY2l0eSc6ICdmaWxsT3BhY2l0eScsXG4gIGZpbGxydWxlOiAnZmlsbFJ1bGUnLFxuICAnZmlsbC1ydWxlJzogJ2ZpbGxSdWxlJyxcbiAgZmlsdGVyOiAnZmlsdGVyJyxcbiAgZmlsdGVycmVzOiAnZmlsdGVyUmVzJyxcbiAgZmlsdGVydW5pdHM6ICdmaWx0ZXJVbml0cycsXG4gIGZsb29kb3BhY2l0eTogJ2Zsb29kT3BhY2l0eScsXG4gICdmbG9vZC1vcGFjaXR5JzogJ2Zsb29kT3BhY2l0eScsXG4gIGZsb29kY29sb3I6ICdmbG9vZENvbG9yJyxcbiAgJ2Zsb29kLWNvbG9yJzogJ2Zsb29kQ29sb3InLFxuICBmb2N1c2FibGU6ICdmb2N1c2FibGUnLFxuICBmb250ZmFtaWx5OiAnZm9udEZhbWlseScsXG4gICdmb250LWZhbWlseSc6ICdmb250RmFtaWx5JyxcbiAgZm9udHNpemU6ICdmb250U2l6ZScsXG4gICdmb250LXNpemUnOiAnZm9udFNpemUnLFxuICBmb250c2l6ZWFkanVzdDogJ2ZvbnRTaXplQWRqdXN0JyxcbiAgJ2ZvbnQtc2l6ZS1hZGp1c3QnOiAnZm9udFNpemVBZGp1c3QnLFxuICBmb250c3RyZXRjaDogJ2ZvbnRTdHJldGNoJyxcbiAgJ2ZvbnQtc3RyZXRjaCc6ICdmb250U3RyZXRjaCcsXG4gIGZvbnRzdHlsZTogJ2ZvbnRTdHlsZScsXG4gICdmb250LXN0eWxlJzogJ2ZvbnRTdHlsZScsXG4gIGZvbnR2YXJpYW50OiAnZm9udFZhcmlhbnQnLFxuICAnZm9udC12YXJpYW50JzogJ2ZvbnRWYXJpYW50JyxcbiAgZm9udHdlaWdodDogJ2ZvbnRXZWlnaHQnLFxuICAnZm9udC13ZWlnaHQnOiAnZm9udFdlaWdodCcsXG4gIGZvcm1hdDogJ2Zvcm1hdCcsXG4gIGZyb206ICdmcm9tJyxcbiAgZng6ICdmeCcsXG4gIGZ5OiAnZnknLFxuICBnMTogJ2cxJyxcbiAgZzI6ICdnMicsXG4gIGdseXBobmFtZTogJ2dseXBoTmFtZScsXG4gICdnbHlwaC1uYW1lJzogJ2dseXBoTmFtZScsXG4gIGdseXBob3JpZW50YXRpb25ob3Jpem9udGFsOiAnZ2x5cGhPcmllbnRhdGlvbkhvcml6b250YWwnLFxuICAnZ2x5cGgtb3JpZW50YXRpb24taG9yaXpvbnRhbCc6ICdnbHlwaE9yaWVudGF0aW9uSG9yaXpvbnRhbCcsXG4gIGdseXBob3JpZW50YXRpb252ZXJ0aWNhbDogJ2dseXBoT3JpZW50YXRpb25WZXJ0aWNhbCcsXG4gICdnbHlwaC1vcmllbnRhdGlvbi12ZXJ0aWNhbCc6ICdnbHlwaE9yaWVudGF0aW9uVmVydGljYWwnLFxuICBnbHlwaHJlZjogJ2dseXBoUmVmJyxcbiAgZ3JhZGllbnR0cmFuc2Zvcm06ICdncmFkaWVudFRyYW5zZm9ybScsXG4gIGdyYWRpZW50dW5pdHM6ICdncmFkaWVudFVuaXRzJyxcbiAgaGFuZ2luZzogJ2hhbmdpbmcnLFxuICBob3JpemFkdng6ICdob3JpekFkdlgnLFxuICAnaG9yaXotYWR2LXgnOiAnaG9yaXpBZHZYJyxcbiAgaG9yaXpvcmlnaW54OiAnaG9yaXpPcmlnaW5YJyxcbiAgJ2hvcml6LW9yaWdpbi14JzogJ2hvcml6T3JpZ2luWCcsXG4gIGlkZW9ncmFwaGljOiAnaWRlb2dyYXBoaWMnLFxuICBpbWFnZXJlbmRlcmluZzogJ2ltYWdlUmVuZGVyaW5nJyxcbiAgJ2ltYWdlLXJlbmRlcmluZyc6ICdpbWFnZVJlbmRlcmluZycsXG4gIGluMjogJ2luMicsXG4gICdpbic6ICdpbicsXG4gIGlubGlzdDogJ2lubGlzdCcsXG4gIGludGVyY2VwdDogJ2ludGVyY2VwdCcsXG4gIGsxOiAnazEnLFxuICBrMjogJ2syJyxcbiAgazM6ICdrMycsXG4gIGs0OiAnazQnLFxuICBrOiAnaycsXG4gIGtlcm5lbG1hdHJpeDogJ2tlcm5lbE1hdHJpeCcsXG4gIGtlcm5lbHVuaXRsZW5ndGg6ICdrZXJuZWxVbml0TGVuZ3RoJyxcbiAga2VybmluZzogJ2tlcm5pbmcnLFxuICBrZXlwb2ludHM6ICdrZXlQb2ludHMnLFxuICBrZXlzcGxpbmVzOiAna2V5U3BsaW5lcycsXG4gIGtleXRpbWVzOiAna2V5VGltZXMnLFxuICBsZW5ndGhhZGp1c3Q6ICdsZW5ndGhBZGp1c3QnLFxuICBsZXR0ZXJzcGFjaW5nOiAnbGV0dGVyU3BhY2luZycsXG4gICdsZXR0ZXItc3BhY2luZyc6ICdsZXR0ZXJTcGFjaW5nJyxcbiAgbGlnaHRpbmdjb2xvcjogJ2xpZ2h0aW5nQ29sb3InLFxuICAnbGlnaHRpbmctY29sb3InOiAnbGlnaHRpbmdDb2xvcicsXG4gIGxpbWl0aW5nY29uZWFuZ2xlOiAnbGltaXRpbmdDb25lQW5nbGUnLFxuICBsb2NhbDogJ2xvY2FsJyxcbiAgbWFya2VyZW5kOiAnbWFya2VyRW5kJyxcbiAgJ21hcmtlci1lbmQnOiAnbWFya2VyRW5kJyxcbiAgbWFya2VyaGVpZ2h0OiAnbWFya2VySGVpZ2h0JyxcbiAgbWFya2VybWlkOiAnbWFya2VyTWlkJyxcbiAgJ21hcmtlci1taWQnOiAnbWFya2VyTWlkJyxcbiAgbWFya2Vyc3RhcnQ6ICdtYXJrZXJTdGFydCcsXG4gICdtYXJrZXItc3RhcnQnOiAnbWFya2VyU3RhcnQnLFxuICBtYXJrZXJ1bml0czogJ21hcmtlclVuaXRzJyxcbiAgbWFya2Vyd2lkdGg6ICdtYXJrZXJXaWR0aCcsXG4gIG1hc2s6ICdtYXNrJyxcbiAgbWFza2NvbnRlbnR1bml0czogJ21hc2tDb250ZW50VW5pdHMnLFxuICBtYXNrdW5pdHM6ICdtYXNrVW5pdHMnLFxuICBtYXRoZW1hdGljYWw6ICdtYXRoZW1hdGljYWwnLFxuICBtb2RlOiAnbW9kZScsXG4gIG51bW9jdGF2ZXM6ICdudW1PY3RhdmVzJyxcbiAgb2Zmc2V0OiAnb2Zmc2V0JyxcbiAgb3BhY2l0eTogJ29wYWNpdHknLFxuICBvcGVyYXRvcjogJ29wZXJhdG9yJyxcbiAgb3JkZXI6ICdvcmRlcicsXG4gIG9yaWVudDogJ29yaWVudCcsXG4gIG9yaWVudGF0aW9uOiAnb3JpZW50YXRpb24nLFxuICBvcmlnaW46ICdvcmlnaW4nLFxuICBvdmVyZmxvdzogJ292ZXJmbG93JyxcbiAgb3ZlcmxpbmVwb3NpdGlvbjogJ292ZXJsaW5lUG9zaXRpb24nLFxuICAnb3ZlcmxpbmUtcG9zaXRpb24nOiAnb3ZlcmxpbmVQb3NpdGlvbicsXG4gIG92ZXJsaW5ldGhpY2tuZXNzOiAnb3ZlcmxpbmVUaGlja25lc3MnLFxuICAnb3ZlcmxpbmUtdGhpY2tuZXNzJzogJ292ZXJsaW5lVGhpY2tuZXNzJyxcbiAgcGFpbnRvcmRlcjogJ3BhaW50T3JkZXInLFxuICAncGFpbnQtb3JkZXInOiAncGFpbnRPcmRlcicsXG4gIHBhbm9zZTE6ICdwYW5vc2UxJyxcbiAgJ3Bhbm9zZS0xJzogJ3Bhbm9zZTEnLFxuICBwYXRobGVuZ3RoOiAncGF0aExlbmd0aCcsXG4gIHBhdHRlcm5jb250ZW50dW5pdHM6ICdwYXR0ZXJuQ29udGVudFVuaXRzJyxcbiAgcGF0dGVybnRyYW5zZm9ybTogJ3BhdHRlcm5UcmFuc2Zvcm0nLFxuICBwYXR0ZXJudW5pdHM6ICdwYXR0ZXJuVW5pdHMnLFxuICBwb2ludGVyZXZlbnRzOiAncG9pbnRlckV2ZW50cycsXG4gICdwb2ludGVyLWV2ZW50cyc6ICdwb2ludGVyRXZlbnRzJyxcbiAgcG9pbnRzOiAncG9pbnRzJyxcbiAgcG9pbnRzYXR4OiAncG9pbnRzQXRYJyxcbiAgcG9pbnRzYXR5OiAncG9pbnRzQXRZJyxcbiAgcG9pbnRzYXR6OiAncG9pbnRzQXRaJyxcbiAgcHJlZml4OiAncHJlZml4JyxcbiAgcHJlc2VydmVhbHBoYTogJ3ByZXNlcnZlQWxwaGEnLFxuICBwcmVzZXJ2ZWFzcGVjdHJhdGlvOiAncHJlc2VydmVBc3BlY3RSYXRpbycsXG4gIHByaW1pdGl2ZXVuaXRzOiAncHJpbWl0aXZlVW5pdHMnLFxuICBwcm9wZXJ0eTogJ3Byb3BlcnR5JyxcbiAgcjogJ3InLFxuICByYWRpdXM6ICdyYWRpdXMnLFxuICByZWZ4OiAncmVmWCcsXG4gIHJlZnk6ICdyZWZZJyxcbiAgcmVuZGVyaW5naW50ZW50OiAncmVuZGVyaW5nSW50ZW50JyxcbiAgJ3JlbmRlcmluZy1pbnRlbnQnOiAncmVuZGVyaW5nSW50ZW50JyxcbiAgcmVwZWF0Y291bnQ6ICdyZXBlYXRDb3VudCcsXG4gIHJlcGVhdGR1cjogJ3JlcGVhdER1cicsXG4gIHJlcXVpcmVkZXh0ZW5zaW9uczogJ3JlcXVpcmVkRXh0ZW5zaW9ucycsXG4gIHJlcXVpcmVkZmVhdHVyZXM6ICdyZXF1aXJlZEZlYXR1cmVzJyxcbiAgcmVzb3VyY2U6ICdyZXNvdXJjZScsXG4gIHJlc3RhcnQ6ICdyZXN0YXJ0JyxcbiAgcmVzdWx0OiAncmVzdWx0JyxcbiAgcmVzdWx0czogJ3Jlc3VsdHMnLFxuICByb3RhdGU6ICdyb3RhdGUnLFxuICByeDogJ3J4JyxcbiAgcnk6ICdyeScsXG4gIHNjYWxlOiAnc2NhbGUnLFxuICBzZWN1cml0eTogJ3NlY3VyaXR5JyxcbiAgc2VlZDogJ3NlZWQnLFxuICBzaGFwZXJlbmRlcmluZzogJ3NoYXBlUmVuZGVyaW5nJyxcbiAgJ3NoYXBlLXJlbmRlcmluZyc6ICdzaGFwZVJlbmRlcmluZycsXG4gIHNsb3BlOiAnc2xvcGUnLFxuICBzcGFjaW5nOiAnc3BhY2luZycsXG4gIHNwZWN1bGFyY29uc3RhbnQ6ICdzcGVjdWxhckNvbnN0YW50JyxcbiAgc3BlY3VsYXJleHBvbmVudDogJ3NwZWN1bGFyRXhwb25lbnQnLFxuICBzcGVlZDogJ3NwZWVkJyxcbiAgc3ByZWFkbWV0aG9kOiAnc3ByZWFkTWV0aG9kJyxcbiAgc3RhcnRvZmZzZXQ6ICdzdGFydE9mZnNldCcsXG4gIHN0ZGRldmlhdGlvbjogJ3N0ZERldmlhdGlvbicsXG4gIHN0ZW1oOiAnc3RlbWgnLFxuICBzdGVtdjogJ3N0ZW12JyxcbiAgc3RpdGNodGlsZXM6ICdzdGl0Y2hUaWxlcycsXG4gIHN0b3Bjb2xvcjogJ3N0b3BDb2xvcicsXG4gICdzdG9wLWNvbG9yJzogJ3N0b3BDb2xvcicsXG4gIHN0b3BvcGFjaXR5OiAnc3RvcE9wYWNpdHknLFxuICAnc3RvcC1vcGFjaXR5JzogJ3N0b3BPcGFjaXR5JyxcbiAgc3RyaWtldGhyb3VnaHBvc2l0aW9uOiAnc3RyaWtldGhyb3VnaFBvc2l0aW9uJyxcbiAgJ3N0cmlrZXRocm91Z2gtcG9zaXRpb24nOiAnc3RyaWtldGhyb3VnaFBvc2l0aW9uJyxcbiAgc3RyaWtldGhyb3VnaHRoaWNrbmVzczogJ3N0cmlrZXRocm91Z2hUaGlja25lc3MnLFxuICAnc3RyaWtldGhyb3VnaC10aGlja25lc3MnOiAnc3RyaWtldGhyb3VnaFRoaWNrbmVzcycsXG4gIHN0cmluZzogJ3N0cmluZycsXG4gIHN0cm9rZTogJ3N0cm9rZScsXG4gIHN0cm9rZWRhc2hhcnJheTogJ3N0cm9rZURhc2hhcnJheScsXG4gICdzdHJva2UtZGFzaGFycmF5JzogJ3N0cm9rZURhc2hhcnJheScsXG4gIHN0cm9rZWRhc2hvZmZzZXQ6ICdzdHJva2VEYXNob2Zmc2V0JyxcbiAgJ3N0cm9rZS1kYXNob2Zmc2V0JzogJ3N0cm9rZURhc2hvZmZzZXQnLFxuICBzdHJva2VsaW5lY2FwOiAnc3Ryb2tlTGluZWNhcCcsXG4gICdzdHJva2UtbGluZWNhcCc6ICdzdHJva2VMaW5lY2FwJyxcbiAgc3Ryb2tlbGluZWpvaW46ICdzdHJva2VMaW5lam9pbicsXG4gICdzdHJva2UtbGluZWpvaW4nOiAnc3Ryb2tlTGluZWpvaW4nLFxuICBzdHJva2VtaXRlcmxpbWl0OiAnc3Ryb2tlTWl0ZXJsaW1pdCcsXG4gICdzdHJva2UtbWl0ZXJsaW1pdCc6ICdzdHJva2VNaXRlcmxpbWl0JyxcbiAgc3Ryb2tld2lkdGg6ICdzdHJva2VXaWR0aCcsXG4gICdzdHJva2Utd2lkdGgnOiAnc3Ryb2tlV2lkdGgnLFxuICBzdHJva2VvcGFjaXR5OiAnc3Ryb2tlT3BhY2l0eScsXG4gICdzdHJva2Utb3BhY2l0eSc6ICdzdHJva2VPcGFjaXR5JyxcbiAgc3VwcHJlc3Njb250ZW50ZWRpdGFibGV3YXJuaW5nOiAnc3VwcHJlc3NDb250ZW50RWRpdGFibGVXYXJuaW5nJyxcbiAgc3VwcHJlc3NoeWRyYXRpb253YXJuaW5nOiAnc3VwcHJlc3NIeWRyYXRpb25XYXJuaW5nJyxcbiAgc3VyZmFjZXNjYWxlOiAnc3VyZmFjZVNjYWxlJyxcbiAgc3lzdGVtbGFuZ3VhZ2U6ICdzeXN0ZW1MYW5ndWFnZScsXG4gIHRhYmxldmFsdWVzOiAndGFibGVWYWx1ZXMnLFxuICB0YXJnZXR4OiAndGFyZ2V0WCcsXG4gIHRhcmdldHk6ICd0YXJnZXRZJyxcbiAgdGV4dGFuY2hvcjogJ3RleHRBbmNob3InLFxuICAndGV4dC1hbmNob3InOiAndGV4dEFuY2hvcicsXG4gIHRleHRkZWNvcmF0aW9uOiAndGV4dERlY29yYXRpb24nLFxuICAndGV4dC1kZWNvcmF0aW9uJzogJ3RleHREZWNvcmF0aW9uJyxcbiAgdGV4dGxlbmd0aDogJ3RleHRMZW5ndGgnLFxuICB0ZXh0cmVuZGVyaW5nOiAndGV4dFJlbmRlcmluZycsXG4gICd0ZXh0LXJlbmRlcmluZyc6ICd0ZXh0UmVuZGVyaW5nJyxcbiAgdG86ICd0bycsXG4gIHRyYW5zZm9ybTogJ3RyYW5zZm9ybScsXG4gICd0eXBlb2YnOiAndHlwZW9mJyxcbiAgdTE6ICd1MScsXG4gIHUyOiAndTInLFxuICB1bmRlcmxpbmVwb3NpdGlvbjogJ3VuZGVybGluZVBvc2l0aW9uJyxcbiAgJ3VuZGVybGluZS1wb3NpdGlvbic6ICd1bmRlcmxpbmVQb3NpdGlvbicsXG4gIHVuZGVybGluZXRoaWNrbmVzczogJ3VuZGVybGluZVRoaWNrbmVzcycsXG4gICd1bmRlcmxpbmUtdGhpY2tuZXNzJzogJ3VuZGVybGluZVRoaWNrbmVzcycsXG4gIHVuaWNvZGU6ICd1bmljb2RlJyxcbiAgdW5pY29kZWJpZGk6ICd1bmljb2RlQmlkaScsXG4gICd1bmljb2RlLWJpZGknOiAndW5pY29kZUJpZGknLFxuICB1bmljb2RlcmFuZ2U6ICd1bmljb2RlUmFuZ2UnLFxuICAndW5pY29kZS1yYW5nZSc6ICd1bmljb2RlUmFuZ2UnLFxuICB1bml0c3BlcmVtOiAndW5pdHNQZXJFbScsXG4gICd1bml0cy1wZXItZW0nOiAndW5pdHNQZXJFbScsXG4gIHVuc2VsZWN0YWJsZTogJ3Vuc2VsZWN0YWJsZScsXG4gIHZhbHBoYWJldGljOiAndkFscGhhYmV0aWMnLFxuICAndi1hbHBoYWJldGljJzogJ3ZBbHBoYWJldGljJyxcbiAgdmFsdWVzOiAndmFsdWVzJyxcbiAgdmVjdG9yZWZmZWN0OiAndmVjdG9yRWZmZWN0JyxcbiAgJ3ZlY3Rvci1lZmZlY3QnOiAndmVjdG9yRWZmZWN0JyxcbiAgdmVyc2lvbjogJ3ZlcnNpb24nLFxuICB2ZXJ0YWR2eTogJ3ZlcnRBZHZZJyxcbiAgJ3ZlcnQtYWR2LXknOiAndmVydEFkdlknLFxuICB2ZXJ0b3JpZ2lueDogJ3ZlcnRPcmlnaW5YJyxcbiAgJ3ZlcnQtb3JpZ2luLXgnOiAndmVydE9yaWdpblgnLFxuICB2ZXJ0b3JpZ2lueTogJ3ZlcnRPcmlnaW5ZJyxcbiAgJ3ZlcnQtb3JpZ2luLXknOiAndmVydE9yaWdpblknLFxuICB2aGFuZ2luZzogJ3ZIYW5naW5nJyxcbiAgJ3YtaGFuZ2luZyc6ICd2SGFuZ2luZycsXG4gIHZpZGVvZ3JhcGhpYzogJ3ZJZGVvZ3JhcGhpYycsXG4gICd2LWlkZW9ncmFwaGljJzogJ3ZJZGVvZ3JhcGhpYycsXG4gIHZpZXdib3g6ICd2aWV3Qm94JyxcbiAgdmlld3RhcmdldDogJ3ZpZXdUYXJnZXQnLFxuICB2aXNpYmlsaXR5OiAndmlzaWJpbGl0eScsXG4gIHZtYXRoZW1hdGljYWw6ICd2TWF0aGVtYXRpY2FsJyxcbiAgJ3YtbWF0aGVtYXRpY2FsJzogJ3ZNYXRoZW1hdGljYWwnLFxuICB2b2NhYjogJ3ZvY2FiJyxcbiAgd2lkdGhzOiAnd2lkdGhzJyxcbiAgd29yZHNwYWNpbmc6ICd3b3JkU3BhY2luZycsXG4gICd3b3JkLXNwYWNpbmcnOiAnd29yZFNwYWNpbmcnLFxuICB3cml0aW5nbW9kZTogJ3dyaXRpbmdNb2RlJyxcbiAgJ3dyaXRpbmctbW9kZSc6ICd3cml0aW5nTW9kZScsXG4gIHgxOiAneDEnLFxuICB4MjogJ3gyJyxcbiAgeDogJ3gnLFxuICB4Y2hhbm5lbHNlbGVjdG9yOiAneENoYW5uZWxTZWxlY3RvcicsXG4gIHhoZWlnaHQ6ICd4SGVpZ2h0JyxcbiAgJ3gtaGVpZ2h0JzogJ3hIZWlnaHQnLFxuICB4bGlua2FjdHVhdGU6ICd4bGlua0FjdHVhdGUnLFxuICAneGxpbms6YWN0dWF0ZSc6ICd4bGlua0FjdHVhdGUnLFxuICB4bGlua2FyY3JvbGU6ICd4bGlua0FyY3JvbGUnLFxuICAneGxpbms6YXJjcm9sZSc6ICd4bGlua0FyY3JvbGUnLFxuICB4bGlua2hyZWY6ICd4bGlua0hyZWYnLFxuICAneGxpbms6aHJlZic6ICd4bGlua0hyZWYnLFxuICB4bGlua3JvbGU6ICd4bGlua1JvbGUnLFxuICAneGxpbms6cm9sZSc6ICd4bGlua1JvbGUnLFxuICB4bGlua3Nob3c6ICd4bGlua1Nob3cnLFxuICAneGxpbms6c2hvdyc6ICd4bGlua1Nob3cnLFxuICB4bGlua3RpdGxlOiAneGxpbmtUaXRsZScsXG4gICd4bGluazp0aXRsZSc6ICd4bGlua1RpdGxlJyxcbiAgeGxpbmt0eXBlOiAneGxpbmtUeXBlJyxcbiAgJ3hsaW5rOnR5cGUnOiAneGxpbmtUeXBlJyxcbiAgeG1sYmFzZTogJ3htbEJhc2UnLFxuICAneG1sOmJhc2UnOiAneG1sQmFzZScsXG4gIHhtbGxhbmc6ICd4bWxMYW5nJyxcbiAgJ3htbDpsYW5nJzogJ3htbExhbmcnLFxuICB4bWxuczogJ3htbG5zJyxcbiAgJ3htbDpzcGFjZSc6ICd4bWxTcGFjZScsXG4gIHhtbG5zeGxpbms6ICd4bWxuc1hsaW5rJyxcbiAgJ3htbG5zOnhsaW5rJzogJ3htbG5zWGxpbmsnLFxuICB4bWxzcGFjZTogJ3htbFNwYWNlJyxcbiAgeTE6ICd5MScsXG4gIHkyOiAneTInLFxuICB5OiAneScsXG4gIHljaGFubmVsc2VsZWN0b3I6ICd5Q2hhbm5lbFNlbGVjdG9yJyxcbiAgejogJ3onLFxuICB6b29tYW5kcGFuOiAnem9vbUFuZFBhbidcbn07XG5cbmZ1bmN0aW9uIGdldFN0YWNrQWRkZW5kdW0kMygpIHtcbiAgdmFyIHN0YWNrID0gUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5nZXRTdGFja0FkZGVuZHVtKCk7XG4gIHJldHVybiBzdGFjayAhPSBudWxsID8gc3RhY2sgOiAnJztcbn1cblxue1xuICB2YXIgd2FybmVkUHJvcGVydGllcyQxID0ge307XG4gIHZhciBoYXNPd25Qcm9wZXJ0eSQxID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIEVWRU5UX05BTUVfUkVHRVggPSAvXm9uLi87XG4gIHZhciBJTlZBTElEX0VWRU5UX05BTUVfUkVHRVggPSAvXm9uW15BLVpdLztcbiAgdmFyIHJBUklBJDEgPSBuZXcgUmVnRXhwKCdeKGFyaWEpLVsnICsgQVRUUklCVVRFX05BTUVfQ0hBUiArICddKiQnKTtcbiAgdmFyIHJBUklBQ2FtZWwkMSA9IG5ldyBSZWdFeHAoJ14oYXJpYSlbQS1aXVsnICsgQVRUUklCVVRFX05BTUVfQ0hBUiArICddKiQnKTtcblxuICB2YXIgdmFsaWRhdGVQcm9wZXJ0eSQxID0gZnVuY3Rpb24gKHRhZ05hbWUsIG5hbWUsIHZhbHVlLCBjYW5Vc2VFdmVudFN5c3RlbSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eSQxLmNhbGwod2FybmVkUHJvcGVydGllcyQxLCBuYW1lKSAmJiB3YXJuZWRQcm9wZXJ0aWVzJDFbbmFtZV0pIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHZhciBsb3dlckNhc2VkTmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAobG93ZXJDYXNlZE5hbWUgPT09ICdvbmZvY3VzaW4nIHx8IGxvd2VyQ2FzZWROYW1lID09PSAnb25mb2N1c291dCcpIHtcbiAgICAgIHdhcm5pbmcoZmFsc2UsICdSZWFjdCB1c2VzIG9uRm9jdXMgYW5kIG9uQmx1ciBpbnN0ZWFkIG9mIG9uRm9jdXNJbiBhbmQgb25Gb2N1c091dC4gJyArICdBbGwgUmVhY3QgZXZlbnRzIGFyZSBub3JtYWxpemVkIHRvIGJ1YmJsZSwgc28gb25Gb2N1c0luIGFuZCBvbkZvY3VzT3V0ICcgKyAnYXJlIG5vdCBuZWVkZWQvc3VwcG9ydGVkIGJ5IFJlYWN0LicpO1xuICAgICAgd2FybmVkUHJvcGVydGllcyQxW25hbWVdID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIFdlIGNhbid0IHJlbHkgb24gdGhlIGV2ZW50IHN5c3RlbSBiZWluZyBpbmplY3RlZCBvbiB0aGUgc2VydmVyLlxuICAgIGlmIChjYW5Vc2VFdmVudFN5c3RlbSkge1xuICAgICAgaWYgKHJlZ2lzdHJhdGlvbk5hbWVNb2R1bGVzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgdmFyIHJlZ2lzdHJhdGlvbk5hbWUgPSBwb3NzaWJsZVJlZ2lzdHJhdGlvbk5hbWVzLmhhc093blByb3BlcnR5KGxvd2VyQ2FzZWROYW1lKSA/IHBvc3NpYmxlUmVnaXN0cmF0aW9uTmFtZXNbbG93ZXJDYXNlZE5hbWVdIDogbnVsbDtcbiAgICAgIGlmIChyZWdpc3RyYXRpb25OYW1lICE9IG51bGwpIHtcbiAgICAgICAgd2FybmluZyhmYWxzZSwgJ0ludmFsaWQgZXZlbnQgaGFuZGxlciBwcm9wZXJ0eSBgJXNgLiBEaWQgeW91IG1lYW4gYCVzYD8lcycsIG5hbWUsIHJlZ2lzdHJhdGlvbk5hbWUsIGdldFN0YWNrQWRkZW5kdW0kMygpKTtcbiAgICAgICAgd2FybmVkUHJvcGVydGllcyQxW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoRVZFTlRfTkFNRV9SRUdFWC50ZXN0KG5hbWUpKSB7XG4gICAgICAgIHdhcm5pbmcoZmFsc2UsICdVbmtub3duIGV2ZW50IGhhbmRsZXIgcHJvcGVydHkgYCVzYC4gSXQgd2lsbCBiZSBpZ25vcmVkLiVzJywgbmFtZSwgZ2V0U3RhY2tBZGRlbmR1bSQzKCkpO1xuICAgICAgICB3YXJuZWRQcm9wZXJ0aWVzJDFbbmFtZV0gPSB0cnVlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKEVWRU5UX05BTUVfUkVHRVgudGVzdChuYW1lKSkge1xuICAgICAgLy8gSWYgbm8gZXZlbnQgcGx1Z2lucyBoYXZlIGJlZW4gaW5qZWN0ZWQsIHdlIGFyZSBpbiBhIHNlcnZlciBlbnZpcm9ubWVudC5cbiAgICAgIC8vIFNvIHdlIGNhbid0IHRlbGwgaWYgdGhlIGV2ZW50IG5hbWUgaXMgY29ycmVjdCBmb3Igc3VyZSwgYnV0IHdlIGNhbiBmaWx0ZXJcbiAgICAgIC8vIG91dCBrbm93biBiYWQgb25lcyBsaWtlIGBvbmNsaWNrYC4gV2UgY2FuJ3Qgc3VnZ2VzdCBhIHNwZWNpZmljIHJlcGxhY2VtZW50IHRob3VnaC5cbiAgICAgIGlmIChJTlZBTElEX0VWRU5UX05BTUVfUkVHRVgudGVzdChuYW1lKSkge1xuICAgICAgICB3YXJuaW5nKGZhbHNlLCAnSW52YWxpZCBldmVudCBoYW5kbGVyIHByb3BlcnR5IGAlc2AuICcgKyAnUmVhY3QgZXZlbnRzIHVzZSB0aGUgY2FtZWxDYXNlIG5hbWluZyBjb252ZW50aW9uLCBmb3IgZXhhbXBsZSBgb25DbGlja2AuJXMnLCBuYW1lLCBnZXRTdGFja0FkZGVuZHVtJDMoKSk7XG4gICAgICB9XG4gICAgICB3YXJuZWRQcm9wZXJ0aWVzJDFbbmFtZV0gPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gTGV0IHRoZSBBUklBIGF0dHJpYnV0ZSBob29rIHZhbGlkYXRlIEFSSUEgYXR0cmlidXRlc1xuICAgIGlmIChyQVJJQSQxLnRlc3QobmFtZSkgfHwgckFSSUFDYW1lbCQxLnRlc3QobmFtZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmIChsb3dlckNhc2VkTmFtZSA9PT0gJ2lubmVyaHRtbCcpIHtcbiAgICAgIHdhcm5pbmcoZmFsc2UsICdEaXJlY3RseSBzZXR0aW5nIHByb3BlcnR5IGBpbm5lckhUTUxgIGlzIG5vdCBwZXJtaXR0ZWQuICcgKyAnRm9yIG1vcmUgaW5mb3JtYXRpb24sIGxvb2t1cCBkb2N1bWVudGF0aW9uIG9uIGBkYW5nZXJvdXNseVNldElubmVySFRNTGAuJyk7XG4gICAgICB3YXJuZWRQcm9wZXJ0aWVzJDFbbmFtZV0gPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGxvd2VyQ2FzZWROYW1lID09PSAnYXJpYScpIHtcbiAgICAgIHdhcm5pbmcoZmFsc2UsICdUaGUgYGFyaWFgIGF0dHJpYnV0ZSBpcyByZXNlcnZlZCBmb3IgZnV0dXJlIHVzZSBpbiBSZWFjdC4gJyArICdQYXNzIGluZGl2aWR1YWwgYGFyaWEtYCBhdHRyaWJ1dGVzIGluc3RlYWQuJyk7XG4gICAgICB3YXJuZWRQcm9wZXJ0aWVzJDFbbmFtZV0gPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGxvd2VyQ2FzZWROYW1lID09PSAnaXMnICYmIHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgd2FybmluZyhmYWxzZSwgJ1JlY2VpdmVkIGEgYCVzYCBmb3IgYSBzdHJpbmcgYXR0cmlidXRlIGBpc2AuIElmIHRoaXMgaXMgZXhwZWN0ZWQsIGNhc3QgJyArICd0aGUgdmFsdWUgdG8gYSBzdHJpbmcuJXMnLCB0eXBlb2YgdmFsdWUsIGdldFN0YWNrQWRkZW5kdW0kMygpKTtcbiAgICAgIHdhcm5lZFByb3BlcnRpZXMkMVtuYW1lXSA9IHRydWU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiBpc05hTih2YWx1ZSkpIHtcbiAgICAgIHdhcm5pbmcoZmFsc2UsICdSZWNlaXZlZCBOYU4gZm9yIHRoZSBgJXNgIGF0dHJpYnV0ZS4gSWYgdGhpcyBpcyBleHBlY3RlZCwgY2FzdCAnICsgJ3RoZSB2YWx1ZSB0byBhIHN0cmluZy4lcycsIG5hbWUsIGdldFN0YWNrQWRkZW5kdW0kMygpKTtcbiAgICAgIHdhcm5lZFByb3BlcnRpZXMkMVtuYW1lXSA9IHRydWU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YXIgaXNSZXNlcnZlZCA9IGlzUmVzZXJ2ZWRQcm9wKG5hbWUpO1xuXG4gICAgLy8gS25vd24gYXR0cmlidXRlcyBzaG91bGQgbWF0Y2ggdGhlIGNhc2luZyBzcGVjaWZpZWQgaW4gdGhlIHByb3BlcnR5IGNvbmZpZy5cbiAgICBpZiAocG9zc2libGVTdGFuZGFyZE5hbWVzLmhhc093blByb3BlcnR5KGxvd2VyQ2FzZWROYW1lKSkge1xuICAgICAgdmFyIHN0YW5kYXJkTmFtZSA9IHBvc3NpYmxlU3RhbmRhcmROYW1lc1tsb3dlckNhc2VkTmFtZV07XG4gICAgICBpZiAoc3RhbmRhcmROYW1lICE9PSBuYW1lKSB7XG4gICAgICAgIHdhcm5pbmcoZmFsc2UsICdJbnZhbGlkIERPTSBwcm9wZXJ0eSBgJXNgLiBEaWQgeW91IG1lYW4gYCVzYD8lcycsIG5hbWUsIHN0YW5kYXJkTmFtZSwgZ2V0U3RhY2tBZGRlbmR1bSQzKCkpO1xuICAgICAgICB3YXJuZWRQcm9wZXJ0aWVzJDFbbmFtZV0gPSB0cnVlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFpc1Jlc2VydmVkICYmIG5hbWUgIT09IGxvd2VyQ2FzZWROYW1lKSB7XG4gICAgICAvLyBVbmtub3duIGF0dHJpYnV0ZXMgc2hvdWxkIGhhdmUgbG93ZXJjYXNlIGNhc2luZyBzaW5jZSB0aGF0J3MgaG93IHRoZXlcbiAgICAgIC8vIHdpbGwgYmUgY2FzZWQgYW55d2F5IHdpdGggc2VydmVyIHJlbmRlcmluZy5cbiAgICAgIHdhcm5pbmcoZmFsc2UsICdSZWFjdCBkb2VzIG5vdCByZWNvZ25pemUgdGhlIGAlc2AgcHJvcCBvbiBhIERPTSBlbGVtZW50LiBJZiB5b3UgJyArICdpbnRlbnRpb25hbGx5IHdhbnQgaXQgdG8gYXBwZWFyIGluIHRoZSBET00gYXMgYSBjdXN0b20gJyArICdhdHRyaWJ1dGUsIHNwZWxsIGl0IGFzIGxvd2VyY2FzZSBgJXNgIGluc3RlYWQuICcgKyAnSWYgeW91IGFjY2lkZW50YWxseSBwYXNzZWQgaXQgZnJvbSBhIHBhcmVudCBjb21wb25lbnQsIHJlbW92ZSAnICsgJ2l0IGZyb20gdGhlIERPTSBlbGVtZW50LiVzJywgbmFtZSwgbG93ZXJDYXNlZE5hbWUsIGdldFN0YWNrQWRkZW5kdW0kMygpKTtcbiAgICAgIHdhcm5lZFByb3BlcnRpZXMkMVtuYW1lXSA9IHRydWU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicgJiYgIXNob3VsZEF0dHJpYnV0ZUFjY2VwdEJvb2xlYW5WYWx1ZShuYW1lKSkge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHdhcm5pbmcoZmFsc2UsICdSZWNlaXZlZCBgJXNgIGZvciBhIG5vbi1ib29sZWFuIGF0dHJpYnV0ZSBgJXNgLlxcblxcbicgKyAnSWYgeW91IHdhbnQgdG8gd3JpdGUgaXQgdG8gdGhlIERPTSwgcGFzcyBhIHN0cmluZyBpbnN0ZWFkOiAnICsgJyVzPVwiJXNcIiBvciAlcz17dmFsdWUudG9TdHJpbmcoKX0uJXMnLCB2YWx1ZSwgbmFtZSwgbmFtZSwgdmFsdWUsIG5hbWUsIGdldFN0YWNrQWRkZW5kdW0kMygpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdhcm5pbmcoZmFsc2UsICdSZWNlaXZlZCBgJXNgIGZvciBhIG5vbi1ib29sZWFuIGF0dHJpYnV0ZSBgJXNgLlxcblxcbicgKyAnSWYgeW91IHdhbnQgdG8gd3JpdGUgaXQgdG8gdGhlIERPTSwgcGFzcyBhIHN0cmluZyBpbnN0ZWFkOiAnICsgJyVzPVwiJXNcIiBvciAlcz17dmFsdWUudG9TdHJpbmcoKX0uXFxuXFxuJyArICdJZiB5b3UgdXNlZCB0byBjb25kaXRpb25hbGx5IG9taXQgaXQgd2l0aCAlcz17Y29uZGl0aW9uICYmIHZhbHVlfSwgJyArICdwYXNzICVzPXtjb25kaXRpb24gPyB2YWx1ZSA6IHVuZGVmaW5lZH0gaW5zdGVhZC4lcycsIHZhbHVlLCBuYW1lLCBuYW1lLCB2YWx1ZSwgbmFtZSwgbmFtZSwgbmFtZSwgZ2V0U3RhY2tBZGRlbmR1bSQzKCkpO1xuICAgICAgfVxuICAgICAgd2FybmVkUHJvcGVydGllcyQxW25hbWVdID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIE5vdyB0aGF0IHdlJ3ZlIHZhbGlkYXRlZCBjYXNpbmcsIGRvIG5vdCB2YWxpZGF0ZVxuICAgIC8vIGRhdGEgdHlwZXMgZm9yIHJlc2VydmVkIHByb3BzXG4gICAgaWYgKGlzUmVzZXJ2ZWQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIFdhcm4gd2hlbiBhIGtub3duIGF0dHJpYnV0ZSBpcyBhIGJhZCB0eXBlXG4gICAgaWYgKCFzaG91bGRTZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpKSB7XG4gICAgICB3YXJuZWRQcm9wZXJ0aWVzJDFbbmFtZV0gPSB0cnVlO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9O1xufVxuXG52YXIgd2FyblVua25vd25Qcm9wZXJ0aWVzID0gZnVuY3Rpb24gKHR5cGUsIHByb3BzLCBjYW5Vc2VFdmVudFN5c3RlbSkge1xuICB2YXIgdW5rbm93blByb3BzID0gW107XG4gIGZvciAodmFyIGtleSBpbiBwcm9wcykge1xuICAgIHZhciBpc1ZhbGlkID0gdmFsaWRhdGVQcm9wZXJ0eSQxKHR5cGUsIGtleSwgcHJvcHNba2V5XSwgY2FuVXNlRXZlbnRTeXN0ZW0pO1xuICAgIGlmICghaXNWYWxpZCkge1xuICAgICAgdW5rbm93blByb3BzLnB1c2goa2V5KTtcbiAgICB9XG4gIH1cblxuICB2YXIgdW5rbm93blByb3BTdHJpbmcgPSB1bmtub3duUHJvcHMubWFwKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgcmV0dXJuICdgJyArIHByb3AgKyAnYCc7XG4gIH0pLmpvaW4oJywgJyk7XG4gIGlmICh1bmtub3duUHJvcHMubGVuZ3RoID09PSAxKSB7XG4gICAgd2FybmluZyhmYWxzZSwgJ0ludmFsaWQgdmFsdWUgZm9yIHByb3AgJXMgb24gPCVzPiB0YWcuIEVpdGhlciByZW1vdmUgaXQgZnJvbSB0aGUgZWxlbWVudCwgJyArICdvciBwYXNzIGEgc3RyaW5nIG9yIG51bWJlciB2YWx1ZSB0byBrZWVwIGl0IGluIHRoZSBET00uICcgKyAnRm9yIGRldGFpbHMsIHNlZSBodHRwczovL2ZiLm1lL3JlYWN0LWF0dHJpYnV0ZS1iZWhhdmlvciVzJywgdW5rbm93blByb3BTdHJpbmcsIHR5cGUsIGdldFN0YWNrQWRkZW5kdW0kMygpKTtcbiAgfSBlbHNlIGlmICh1bmtub3duUHJvcHMubGVuZ3RoID4gMSkge1xuICAgIHdhcm5pbmcoZmFsc2UsICdJbnZhbGlkIHZhbHVlcyBmb3IgcHJvcHMgJXMgb24gPCVzPiB0YWcuIEVpdGhlciByZW1vdmUgdGhlbSBmcm9tIHRoZSBlbGVtZW50LCAnICsgJ29yIHBhc3MgYSBzdHJpbmcgb3IgbnVtYmVyIHZhbHVlIHRvIGtlZXAgdGhlbSBpbiB0aGUgRE9NLiAnICsgJ0ZvciBkZXRhaWxzLCBzZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC1hdHRyaWJ1dGUtYmVoYXZpb3IlcycsIHVua25vd25Qcm9wU3RyaW5nLCB0eXBlLCBnZXRTdGFja0FkZGVuZHVtJDMoKSk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIHZhbGlkYXRlUHJvcGVydGllcyQyKHR5cGUsIHByb3BzLCBjYW5Vc2VFdmVudFN5c3RlbSkge1xuICBpZiAoaXNDdXN0b21Db21wb25lbnQodHlwZSwgcHJvcHMpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHdhcm5Vbmtub3duUHJvcGVydGllcyh0eXBlLCBwcm9wcywgY2FuVXNlRXZlbnRTeXN0ZW0pO1xufVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vLyBCYXNlZCBvbiByZWFkaW5nIHRoZSBSZWFjdC5DaGlsZHJlbiBpbXBsZW1lbnRhdGlvbi4gVE9ETzogdHlwZSB0aGlzIHNvbWV3aGVyZT9cblxudmFyIHRvQXJyYXkgPSBSZWFjdC5DaGlsZHJlbi50b0FycmF5O1xuXG52YXIgZ2V0U3RhY2tBZGRlbmR1bSA9IGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnMoJycpO1xuXG57XG4gIHZhciB2YWxpZGF0ZVByb3BlcnRpZXNJbkRldmVsb3BtZW50ID0gZnVuY3Rpb24gKHR5cGUsIHByb3BzKSB7XG4gICAgdmFsaWRhdGVQcm9wZXJ0aWVzKHR5cGUsIHByb3BzKTtcbiAgICB2YWxpZGF0ZVByb3BlcnRpZXMkMSh0eXBlLCBwcm9wcyk7XG4gICAgdmFsaWRhdGVQcm9wZXJ0aWVzJDIodHlwZSwgcHJvcHMsIC8qIGNhblVzZUV2ZW50U3lzdGVtICovZmFsc2UpO1xuICB9O1xuXG4gIHZhciBkZXNjcmliZVN0YWNrRnJhbWUgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIHZhciBzb3VyY2UgPSBlbGVtZW50Ll9zb3VyY2U7XG4gICAgdmFyIHR5cGUgPSBlbGVtZW50LnR5cGU7XG4gICAgdmFyIG5hbWUgPSBnZXRDb21wb25lbnROYW1lKHR5cGUpO1xuICAgIHZhciBvd25lck5hbWUgPSBudWxsO1xuICAgIHJldHVybiBkZXNjcmliZUNvbXBvbmVudEZyYW1lKG5hbWUsIHNvdXJjZSwgb3duZXJOYW1lKTtcbiAgfTtcblxuICB2YXIgY3VycmVudERlYnVnU3RhY2sgPSBudWxsO1xuICB2YXIgY3VycmVudERlYnVnRWxlbWVudFN0YWNrID0gbnVsbDtcbiAgdmFyIHNldEN1cnJlbnREZWJ1Z1N0YWNrID0gZnVuY3Rpb24gKHN0YWNrKSB7XG4gICAgdmFyIGZyYW1lID0gc3RhY2tbc3RhY2subGVuZ3RoIC0gMV07XG4gICAgY3VycmVudERlYnVnRWxlbWVudFN0YWNrID0gZnJhbWUuZGVidWdFbGVtZW50U3RhY2s7XG4gICAgLy8gV2UgYXJlIGFib3V0IHRvIGVudGVyIGEgbmV3IGNvbXBvc2l0ZSBzdGFjaywgcmVzZXQgdGhlIGFycmF5LlxuICAgIGN1cnJlbnREZWJ1Z0VsZW1lbnRTdGFjay5sZW5ndGggPSAwO1xuICAgIGN1cnJlbnREZWJ1Z1N0YWNrID0gc3RhY2s7XG4gICAgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5nZXRDdXJyZW50U3RhY2sgPSBnZXRTdGFja0FkZGVuZHVtO1xuICB9O1xuICB2YXIgcHVzaEVsZW1lbnRUb0RlYnVnU3RhY2sgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIGlmIChjdXJyZW50RGVidWdFbGVtZW50U3RhY2sgIT09IG51bGwpIHtcbiAgICAgIGN1cnJlbnREZWJ1Z0VsZW1lbnRTdGFjay5wdXNoKGVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbiAgdmFyIHJlc2V0Q3VycmVudERlYnVnU3RhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgY3VycmVudERlYnVnRWxlbWVudFN0YWNrID0gbnVsbDtcbiAgICBjdXJyZW50RGVidWdTdGFjayA9IG51bGw7XG4gICAgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5nZXRDdXJyZW50U3RhY2sgPSBudWxsO1xuICB9O1xuICBnZXRTdGFja0FkZGVuZHVtID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChjdXJyZW50RGVidWdTdGFjayA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICB2YXIgc3RhY2sgPSAnJztcbiAgICB2YXIgZGVidWdTdGFjayA9IGN1cnJlbnREZWJ1Z1N0YWNrO1xuICAgIGZvciAodmFyIGkgPSBkZWJ1Z1N0YWNrLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgZnJhbWUgPSBkZWJ1Z1N0YWNrW2ldO1xuICAgICAgdmFyIF9kZWJ1Z0VsZW1lbnRTdGFjayA9IGZyYW1lLmRlYnVnRWxlbWVudFN0YWNrO1xuICAgICAgZm9yICh2YXIgaWkgPSBfZGVidWdFbGVtZW50U3RhY2subGVuZ3RoIC0gMTsgaWkgPj0gMDsgaWktLSkge1xuICAgICAgICBzdGFjayArPSBkZXNjcmliZVN0YWNrRnJhbWUoX2RlYnVnRWxlbWVudFN0YWNrW2lpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdGFjaztcbiAgfTtcbn1cblxudmFyIGRpZFdhcm5EZWZhdWx0SW5wdXRWYWx1ZSA9IGZhbHNlO1xudmFyIGRpZFdhcm5EZWZhdWx0Q2hlY2tlZCA9IGZhbHNlO1xudmFyIGRpZFdhcm5EZWZhdWx0U2VsZWN0VmFsdWUgPSBmYWxzZTtcbnZhciBkaWRXYXJuRGVmYXVsdFRleHRhcmVhVmFsdWUgPSBmYWxzZTtcbnZhciBkaWRXYXJuSW52YWxpZE9wdGlvbkNoaWxkcmVuID0gZmFsc2U7XG52YXIgZGlkV2FybkFib3V0Tm9vcFVwZGF0ZUZvckNvbXBvbmVudCA9IHt9O1xudmFyIHZhbHVlUHJvcE5hbWVzID0gWyd2YWx1ZScsICdkZWZhdWx0VmFsdWUnXTtcbnZhciBuZXdsaW5lRWF0aW5nVGFncyA9IHtcbiAgbGlzdGluZzogdHJ1ZSxcbiAgcHJlOiB0cnVlLFxuICB0ZXh0YXJlYTogdHJ1ZVxufTtcblxuZnVuY3Rpb24gZ2V0Q29tcG9uZW50TmFtZSh0eXBlKSB7XG4gIHJldHVybiB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgPyB0eXBlIDogdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicgPyB0eXBlLmRpc3BsYXlOYW1lIHx8IHR5cGUubmFtZSA6IG51bGw7XG59XG5cbi8vIFdlIGFjY2VwdCBhbnkgdGFnIHRvIGJlIHJlbmRlcmVkIGJ1dCBzaW5jZSB0aGlzIGdldHMgaW5qZWN0ZWQgaW50byBhcmJpdHJhcnlcbi8vIEhUTUwsIHdlIHdhbnQgdG8gbWFrZSBzdXJlIHRoYXQgaXQncyBhIHNhZmUgdGFnLlxuLy8gaHR0cDovL3d3dy53My5vcmcvVFIvUkVDLXhtbC8jTlQtTmFtZVxudmFyIFZBTElEX1RBR19SRUdFWCA9IC9eW2EtekEtWl1bYS16QS1aOl9cXC5cXC1cXGRdKiQvOyAvLyBTaW1wbGlmaWVkIHN1YnNldFxudmFyIHZhbGlkYXRlZFRhZ0NhY2hlID0ge307XG5mdW5jdGlvbiB2YWxpZGF0ZURhbmdlcm91c1RhZyh0YWcpIHtcbiAgaWYgKCF2YWxpZGF0ZWRUYWdDYWNoZS5oYXNPd25Qcm9wZXJ0eSh0YWcpKSB7XG4gICAgIVZBTElEX1RBR19SRUdFWC50ZXN0KHRhZykgPyBpbnZhcmlhbnQoZmFsc2UsICdJbnZhbGlkIHRhZzogJXMnLCB0YWcpIDogdm9pZCAwO1xuICAgIHZhbGlkYXRlZFRhZ0NhY2hlW3RhZ10gPSB0cnVlO1xuICB9XG59XG5cbnZhciBwcm9jZXNzU3R5bGVOYW1lID0gbWVtb2l6ZVN0cmluZ09ubHkoZnVuY3Rpb24gKHN0eWxlTmFtZSkge1xuICByZXR1cm4gaHlwaGVuYXRlU3R5bGVOYW1lKHN0eWxlTmFtZSk7XG59KTtcblxuZnVuY3Rpb24gY3JlYXRlTWFya3VwRm9yU3R5bGVzKHN0eWxlcykge1xuICB2YXIgc2VyaWFsaXplZCA9ICcnO1xuICB2YXIgZGVsaW1pdGVyID0gJyc7XG4gIGZvciAodmFyIHN0eWxlTmFtZSBpbiBzdHlsZXMpIHtcbiAgICBpZiAoIXN0eWxlcy5oYXNPd25Qcm9wZXJ0eShzdHlsZU5hbWUpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgdmFyIGlzQ3VzdG9tUHJvcGVydHkgPSBzdHlsZU5hbWUuaW5kZXhPZignLS0nKSA9PT0gMDtcbiAgICB2YXIgc3R5bGVWYWx1ZSA9IHN0eWxlc1tzdHlsZU5hbWVdO1xuICAgIHtcbiAgICAgIGlmICghaXNDdXN0b21Qcm9wZXJ0eSkge1xuICAgICAgICB3YXJuVmFsaWRTdHlsZSQxKHN0eWxlTmFtZSwgc3R5bGVWYWx1ZSwgZ2V0U3RhY2tBZGRlbmR1bSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzdHlsZVZhbHVlICE9IG51bGwpIHtcbiAgICAgIHNlcmlhbGl6ZWQgKz0gZGVsaW1pdGVyICsgcHJvY2Vzc1N0eWxlTmFtZShzdHlsZU5hbWUpICsgJzonO1xuICAgICAgc2VyaWFsaXplZCArPSBkYW5nZXJvdXNTdHlsZVZhbHVlKHN0eWxlTmFtZSwgc3R5bGVWYWx1ZSwgaXNDdXN0b21Qcm9wZXJ0eSk7XG5cbiAgICAgIGRlbGltaXRlciA9ICc7JztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHNlcmlhbGl6ZWQgfHwgbnVsbDtcbn1cblxuZnVuY3Rpb24gd2Fybk5vb3AocHVibGljSW5zdGFuY2UsIGNhbGxlck5hbWUpIHtcbiAge1xuICAgIHZhciBjb25zdHJ1Y3RvciA9IHB1YmxpY0luc3RhbmNlLmNvbnN0cnVjdG9yO1xuICAgIHZhciBjb21wb25lbnROYW1lID0gY29uc3RydWN0b3IgJiYgZ2V0Q29tcG9uZW50TmFtZShjb25zdHJ1Y3RvcikgfHwgJ1JlYWN0Q2xhc3MnO1xuICAgIHZhciB3YXJuaW5nS2V5ID0gY29tcG9uZW50TmFtZSArICcuJyArIGNhbGxlck5hbWU7XG4gICAgaWYgKGRpZFdhcm5BYm91dE5vb3BVcGRhdGVGb3JDb21wb25lbnRbd2FybmluZ0tleV0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB3YXJuaW5nKGZhbHNlLCAnJXMoLi4uKTogQ2FuIG9ubHkgdXBkYXRlIGEgbW91bnRpbmcgY29tcG9uZW50LiAnICsgJ1RoaXMgdXN1YWxseSBtZWFucyB5b3UgY2FsbGVkICVzKCkgb3V0c2lkZSBjb21wb25lbnRXaWxsTW91bnQoKSBvbiB0aGUgc2VydmVyLiAnICsgJ1RoaXMgaXMgYSBuby1vcC5cXG5cXG5QbGVhc2UgY2hlY2sgdGhlIGNvZGUgZm9yIHRoZSAlcyBjb21wb25lbnQuJywgY2FsbGVyTmFtZSwgY2FsbGVyTmFtZSwgY29tcG9uZW50TmFtZSk7XG4gICAgZGlkV2FybkFib3V0Tm9vcFVwZGF0ZUZvckNvbXBvbmVudFt3YXJuaW5nS2V5XSA9IHRydWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2hvdWxkQ29uc3RydWN0KENvbXBvbmVudCkge1xuICByZXR1cm4gQ29tcG9uZW50LnByb3RvdHlwZSAmJiBDb21wb25lbnQucHJvdG90eXBlLmlzUmVhY3RDb21wb25lbnQ7XG59XG5cbmZ1bmN0aW9uIGdldE5vbkNoaWxkcmVuSW5uZXJNYXJrdXAocHJvcHMpIHtcbiAgdmFyIGlubmVySFRNTCA9IHByb3BzLmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MO1xuICBpZiAoaW5uZXJIVE1MICE9IG51bGwpIHtcbiAgICBpZiAoaW5uZXJIVE1MLl9faHRtbCAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gaW5uZXJIVE1MLl9faHRtbDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGNvbnRlbnQgPSBwcm9wcy5jaGlsZHJlbjtcbiAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBjb250ZW50ID09PSAnbnVtYmVyJykge1xuICAgICAgcmV0dXJuIGVzY2FwZVRleHRGb3JCcm93c2VyKGNvbnRlbnQpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gZmxhdHRlblRvcExldmVsQ2hpbGRyZW4oY2hpbGRyZW4pIHtcbiAgaWYgKCFSZWFjdC5pc1ZhbGlkRWxlbWVudChjaGlsZHJlbikpIHtcbiAgICByZXR1cm4gdG9BcnJheShjaGlsZHJlbik7XG4gIH1cbiAgdmFyIGVsZW1lbnQgPSBjaGlsZHJlbjtcbiAgaWYgKGVsZW1lbnQudHlwZSAhPT0gUkVBQ1RfRlJBR01FTlRfVFlQRSkge1xuICAgIHJldHVybiBbZWxlbWVudF07XG4gIH1cbiAgdmFyIGZyYWdtZW50Q2hpbGRyZW4gPSBlbGVtZW50LnByb3BzLmNoaWxkcmVuO1xuICBpZiAoIVJlYWN0LmlzVmFsaWRFbGVtZW50KGZyYWdtZW50Q2hpbGRyZW4pKSB7XG4gICAgcmV0dXJuIHRvQXJyYXkoZnJhZ21lbnRDaGlsZHJlbik7XG4gIH1cbiAgdmFyIGZyYWdtZW50Q2hpbGRFbGVtZW50ID0gZnJhZ21lbnRDaGlsZHJlbjtcbiAgcmV0dXJuIFtmcmFnbWVudENoaWxkRWxlbWVudF07XG59XG5cbmZ1bmN0aW9uIGZsYXR0ZW5PcHRpb25DaGlsZHJlbihjaGlsZHJlbikge1xuICB2YXIgY29udGVudCA9ICcnO1xuICAvLyBGbGF0dGVuIGNoaWxkcmVuIGFuZCB3YXJuIGlmIHRoZXkgYXJlbid0IHN0cmluZ3Mgb3IgbnVtYmVycztcbiAgLy8gaW52YWxpZCB0eXBlcyBhcmUgaWdub3JlZC5cbiAgUmVhY3QuQ2hpbGRyZW4uZm9yRWFjaChjaGlsZHJlbiwgZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgaWYgKGNoaWxkID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBjaGlsZCA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIGNoaWxkID09PSAnbnVtYmVyJykge1xuICAgICAgY29udGVudCArPSBjaGlsZDtcbiAgICB9IGVsc2Uge1xuICAgICAge1xuICAgICAgICBpZiAoIWRpZFdhcm5JbnZhbGlkT3B0aW9uQ2hpbGRyZW4pIHtcbiAgICAgICAgICBkaWRXYXJuSW52YWxpZE9wdGlvbkNoaWxkcmVuID0gdHJ1ZTtcbiAgICAgICAgICB3YXJuaW5nKGZhbHNlLCAnT25seSBzdHJpbmdzIGFuZCBudW1iZXJzIGFyZSBzdXBwb3J0ZWQgYXMgPG9wdGlvbj4gY2hpbGRyZW4uJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICByZXR1cm4gY29udGVudDtcbn1cblxuZnVuY3Rpb24gbWFza0NvbnRleHQodHlwZSwgY29udGV4dCkge1xuICB2YXIgY29udGV4dFR5cGVzID0gdHlwZS5jb250ZXh0VHlwZXM7XG4gIGlmICghY29udGV4dFR5cGVzKSB7XG4gICAgcmV0dXJuIGVtcHR5T2JqZWN0O1xuICB9XG4gIHZhciBtYXNrZWRDb250ZXh0ID0ge307XG4gIGZvciAodmFyIGNvbnRleHROYW1lIGluIGNvbnRleHRUeXBlcykge1xuICAgIG1hc2tlZENvbnRleHRbY29udGV4dE5hbWVdID0gY29udGV4dFtjb250ZXh0TmFtZV07XG4gIH1cbiAgcmV0dXJuIG1hc2tlZENvbnRleHQ7XG59XG5cbmZ1bmN0aW9uIGNoZWNrQ29udGV4dFR5cGVzKHR5cGVTcGVjcywgdmFsdWVzLCBsb2NhdGlvbikge1xuICB7XG4gICAgY2hlY2tQcm9wVHlwZXModHlwZVNwZWNzLCB2YWx1ZXMsIGxvY2F0aW9uLCAnQ29tcG9uZW50JywgZ2V0U3RhY2tBZGRlbmR1bSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcHJvY2Vzc0NvbnRleHQodHlwZSwgY29udGV4dCkge1xuICB2YXIgbWFza2VkQ29udGV4dCA9IG1hc2tDb250ZXh0KHR5cGUsIGNvbnRleHQpO1xuICB7XG4gICAgaWYgKHR5cGUuY29udGV4dFR5cGVzKSB7XG4gICAgICBjaGVja0NvbnRleHRUeXBlcyh0eXBlLmNvbnRleHRUeXBlcywgbWFza2VkQ29udGV4dCwgJ2NvbnRleHQnKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1hc2tlZENvbnRleHQ7XG59XG5cbnZhciBTVFlMRSA9ICdzdHlsZSc7XG52YXIgUkVTRVJWRURfUFJPUFMkMSA9IHtcbiAgY2hpbGRyZW46IG51bGwsXG4gIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MOiBudWxsLFxuICBzdXBwcmVzc0NvbnRlbnRFZGl0YWJsZVdhcm5pbmc6IG51bGwsXG4gIHN1cHByZXNzSHlkcmF0aW9uV2FybmluZzogbnVsbFxufTtcblxuZnVuY3Rpb24gY3JlYXRlT3BlblRhZ01hcmt1cCh0YWdWZXJiYXRpbSwgdGFnTG93ZXJjYXNlLCBwcm9wcywgbmFtZXNwYWNlLCBtYWtlU3RhdGljTWFya3VwLCBpc1Jvb3RFbGVtZW50KSB7XG4gIHZhciByZXQgPSAnPCcgKyB0YWdWZXJiYXRpbTtcblxuICBmb3IgKHZhciBwcm9wS2V5IGluIHByb3BzKSB7XG4gICAgaWYgKCFwcm9wcy5oYXNPd25Qcm9wZXJ0eShwcm9wS2V5KSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wS2V5XTtcbiAgICBpZiAocHJvcFZhbHVlID09IG51bGwpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAocHJvcEtleSA9PT0gU1RZTEUpIHtcbiAgICAgIHByb3BWYWx1ZSA9IGNyZWF0ZU1hcmt1cEZvclN0eWxlcyhwcm9wVmFsdWUpO1xuICAgIH1cbiAgICB2YXIgbWFya3VwID0gbnVsbDtcbiAgICBpZiAoaXNDdXN0b21Db21wb25lbnQodGFnTG93ZXJjYXNlLCBwcm9wcykpIHtcbiAgICAgIGlmICghUkVTRVJWRURfUFJPUFMkMS5oYXNPd25Qcm9wZXJ0eShwcm9wS2V5KSkge1xuICAgICAgICBtYXJrdXAgPSBjcmVhdGVNYXJrdXBGb3JDdXN0b21BdHRyaWJ1dGUocHJvcEtleSwgcHJvcFZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbWFya3VwID0gY3JlYXRlTWFya3VwRm9yUHJvcGVydHkocHJvcEtleSwgcHJvcFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKG1hcmt1cCkge1xuICAgICAgcmV0ICs9ICcgJyArIG1hcmt1cDtcbiAgICB9XG4gIH1cblxuICAvLyBGb3Igc3RhdGljIHBhZ2VzLCBubyBuZWVkIHRvIHB1dCBSZWFjdCBJRCBhbmQgY2hlY2tzdW0uIFNhdmVzIGxvdHMgb2ZcbiAgLy8gYnl0ZXMuXG4gIGlmIChtYWtlU3RhdGljTWFya3VwKSB7XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIGlmIChpc1Jvb3RFbGVtZW50KSB7XG4gICAgcmV0ICs9ICcgJyArIGNyZWF0ZU1hcmt1cEZvclJvb3QoKTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZVJlbmRlclJlc3VsdChjaGlsZCwgdHlwZSkge1xuICBpZiAoY2hpbGQgPT09IHVuZGVmaW5lZCkge1xuICAgIGludmFyaWFudChmYWxzZSwgJyVzKC4uLik6IE5vdGhpbmcgd2FzIHJldHVybmVkIGZyb20gcmVuZGVyLiBUaGlzIHVzdWFsbHkgbWVhbnMgYSByZXR1cm4gc3RhdGVtZW50IGlzIG1pc3NpbmcuIE9yLCB0byByZW5kZXIgbm90aGluZywgcmV0dXJuIG51bGwuJywgZ2V0Q29tcG9uZW50TmFtZSh0eXBlKSB8fCAnQ29tcG9uZW50Jyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzb2x2ZShjaGlsZCwgY29udGV4dCkge1xuICB3aGlsZSAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoY2hpbGQpKSB7XG4gICAgLy8gU2FmZSBiZWNhdXNlIHdlIGp1c3QgY2hlY2tlZCBpdCdzIGFuIGVsZW1lbnQuXG4gICAgdmFyIGVsZW1lbnQgPSBjaGlsZDtcbiAgICB7XG4gICAgICBwdXNoRWxlbWVudFRvRGVidWdTdGFjayhlbGVtZW50KTtcbiAgICB9XG4gICAgdmFyIENvbXBvbmVudCA9IGVsZW1lbnQudHlwZTtcbiAgICBpZiAodHlwZW9mIENvbXBvbmVudCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHZhciBwdWJsaWNDb250ZXh0ID0gcHJvY2Vzc0NvbnRleHQoQ29tcG9uZW50LCBjb250ZXh0KTtcbiAgICB2YXIgaW5zdDtcbiAgICB2YXIgcXVldWUgPSBbXTtcbiAgICB2YXIgcmVwbGFjZSA9IGZhbHNlO1xuICAgIHZhciB1cGRhdGVyID0ge1xuICAgICAgaXNNb3VudGVkOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSxcbiAgICAgIGVucXVldWVGb3JjZVVwZGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlKSB7XG4gICAgICAgIGlmIChxdWV1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgIHdhcm5Ob29wKHB1YmxpY0luc3RhbmNlLCAnZm9yY2VVcGRhdGUnKTtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGVucXVldWVSZXBsYWNlU3RhdGU6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSwgY29tcGxldGVTdGF0ZSkge1xuICAgICAgICByZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgcXVldWUgPSBbY29tcGxldGVTdGF0ZV07XG4gICAgICB9LFxuICAgICAgZW5xdWV1ZVNldFN0YXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIHBhcnRpYWxTdGF0ZSkge1xuICAgICAgICBpZiAocXVldWUgPT09IG51bGwpIHtcbiAgICAgICAgICB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgJ3NldFN0YXRlJyk7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcXVldWUucHVzaChwYXJ0aWFsU3RhdGUpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoc2hvdWxkQ29uc3RydWN0KENvbXBvbmVudCkpIHtcbiAgICAgIGluc3QgPSBuZXcgQ29tcG9uZW50KGVsZW1lbnQucHJvcHMsIHB1YmxpY0NvbnRleHQsIHVwZGF0ZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnN0ID0gQ29tcG9uZW50KGVsZW1lbnQucHJvcHMsIHB1YmxpY0NvbnRleHQsIHVwZGF0ZXIpO1xuICAgICAgaWYgKGluc3QgPT0gbnVsbCB8fCBpbnN0LnJlbmRlciA9PSBudWxsKSB7XG4gICAgICAgIGNoaWxkID0gaW5zdDtcbiAgICAgICAgdmFsaWRhdGVSZW5kZXJSZXN1bHQoY2hpbGQsIENvbXBvbmVudCk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGluc3QucHJvcHMgPSBlbGVtZW50LnByb3BzO1xuICAgIGluc3QuY29udGV4dCA9IHB1YmxpY0NvbnRleHQ7XG4gICAgaW5zdC51cGRhdGVyID0gdXBkYXRlcjtcblxuICAgIHZhciBpbml0aWFsU3RhdGUgPSBpbnN0LnN0YXRlO1xuICAgIGlmIChpbml0aWFsU3RhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaW5zdC5zdGF0ZSA9IGluaXRpYWxTdGF0ZSA9IG51bGw7XG4gICAgfVxuICAgIGlmIChpbnN0LmNvbXBvbmVudFdpbGxNb3VudCkge1xuICAgICAgaW5zdC5jb21wb25lbnRXaWxsTW91bnQoKTtcbiAgICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgdmFyIG9sZFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHZhciBvbGRSZXBsYWNlID0gcmVwbGFjZTtcbiAgICAgICAgcXVldWUgPSBudWxsO1xuICAgICAgICByZXBsYWNlID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKG9sZFJlcGxhY2UgJiYgb2xkUXVldWUubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgaW5zdC5zdGF0ZSA9IG9sZFF1ZXVlWzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBuZXh0U3RhdGUgPSBvbGRSZXBsYWNlID8gb2xkUXVldWVbMF0gOiBpbnN0LnN0YXRlO1xuICAgICAgICAgIHZhciBkb250TXV0YXRlID0gdHJ1ZTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gb2xkUmVwbGFjZSA/IDEgOiAwOyBpIDwgb2xkUXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBwYXJ0aWFsID0gb2xkUXVldWVbaV07XG4gICAgICAgICAgICB2YXIgcGFydGlhbFN0YXRlID0gdHlwZW9mIHBhcnRpYWwgPT09ICdmdW5jdGlvbicgPyBwYXJ0aWFsLmNhbGwoaW5zdCwgbmV4dFN0YXRlLCBlbGVtZW50LnByb3BzLCBwdWJsaWNDb250ZXh0KSA6IHBhcnRpYWw7XG4gICAgICAgICAgICBpZiAocGFydGlhbFN0YXRlKSB7XG4gICAgICAgICAgICAgIGlmIChkb250TXV0YXRlKSB7XG4gICAgICAgICAgICAgICAgZG9udE11dGF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIG5leHRTdGF0ZSA9IF9hc3NpZ24oe30sIG5leHRTdGF0ZSwgcGFydGlhbFN0YXRlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfYXNzaWduKG5leHRTdGF0ZSwgcGFydGlhbFN0YXRlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpbnN0LnN0YXRlID0gbmV4dFN0YXRlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIGNoaWxkID0gaW5zdC5yZW5kZXIoKTtcblxuICAgIHtcbiAgICAgIGlmIChjaGlsZCA9PT0gdW5kZWZpbmVkICYmIGluc3QucmVuZGVyLl9pc01vY2tGdW5jdGlvbikge1xuICAgICAgICAvLyBUaGlzIGlzIHByb2JhYmx5IGJhZCBwcmFjdGljZS4gQ29uc2lkZXIgd2FybmluZyBoZXJlIGFuZFxuICAgICAgICAvLyBkZXByZWNhdGluZyB0aGlzIGNvbnZlbmllbmNlLlxuICAgICAgICBjaGlsZCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIHZhbGlkYXRlUmVuZGVyUmVzdWx0KGNoaWxkLCBDb21wb25lbnQpO1xuXG4gICAgdmFyIGNoaWxkQ29udGV4dDtcbiAgICBpZiAodHlwZW9mIGluc3QuZ2V0Q2hpbGRDb250ZXh0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB2YXIgY2hpbGRDb250ZXh0VHlwZXMgPSBDb21wb25lbnQuY2hpbGRDb250ZXh0VHlwZXM7XG4gICAgICBpZiAodHlwZW9mIGNoaWxkQ29udGV4dFR5cGVzID09PSAnb2JqZWN0Jykge1xuICAgICAgICBjaGlsZENvbnRleHQgPSBpbnN0LmdldENoaWxkQ29udGV4dCgpO1xuICAgICAgICBmb3IgKHZhciBjb250ZXh0S2V5IGluIGNoaWxkQ29udGV4dCkge1xuICAgICAgICAgICEoY29udGV4dEtleSBpbiBjaGlsZENvbnRleHRUeXBlcykgPyBpbnZhcmlhbnQoZmFsc2UsICclcy5nZXRDaGlsZENvbnRleHQoKToga2V5IFwiJXNcIiBpcyBub3QgZGVmaW5lZCBpbiBjaGlsZENvbnRleHRUeXBlcy4nLCBnZXRDb21wb25lbnROYW1lKENvbXBvbmVudCkgfHwgJ1Vua25vd24nLCBjb250ZXh0S2V5KSA6IHZvaWQgMDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2FybmluZyhmYWxzZSwgJyVzLmdldENoaWxkQ29udGV4dCgpOiBjaGlsZENvbnRleHRUeXBlcyBtdXN0IGJlIGRlZmluZWQgaW4gb3JkZXIgdG8gJyArICd1c2UgZ2V0Q2hpbGRDb250ZXh0KCkuJywgZ2V0Q29tcG9uZW50TmFtZShDb21wb25lbnQpIHx8ICdVbmtub3duJyk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChjaGlsZENvbnRleHQpIHtcbiAgICAgIGNvbnRleHQgPSBfYXNzaWduKHt9LCBjb250ZXh0LCBjaGlsZENvbnRleHQpO1xuICAgIH1cbiAgfVxuICByZXR1cm4geyBjaGlsZDogY2hpbGQsIGNvbnRleHQ6IGNvbnRleHQgfTtcbn1cblxudmFyIFJlYWN0RE9NU2VydmVyUmVuZGVyZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFJlYWN0RE9NU2VydmVyUmVuZGVyZXIoY2hpbGRyZW4sIG1ha2VTdGF0aWNNYXJrdXApIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUmVhY3RET01TZXJ2ZXJSZW5kZXJlcik7XG5cbiAgICB2YXIgZmxhdENoaWxkcmVuID0gZmxhdHRlblRvcExldmVsQ2hpbGRyZW4oY2hpbGRyZW4pO1xuXG4gICAgdmFyIHRvcEZyYW1lID0ge1xuICAgICAgLy8gQXNzdW1lIGFsbCB0cmVlcyBzdGFydCBpbiB0aGUgSFRNTCBuYW1lc3BhY2UgKG5vdCB0b3RhbGx5IHRydWUsIGJ1dFxuICAgICAgLy8gdGhpcyBpcyB3aGF0IHdlIGRpZCBoaXN0b3JpY2FsbHkpXG4gICAgICBkb21OYW1lc3BhY2U6IE5hbWVzcGFjZXMuaHRtbCxcbiAgICAgIGNoaWxkcmVuOiBmbGF0Q2hpbGRyZW4sXG4gICAgICBjaGlsZEluZGV4OiAwLFxuICAgICAgY29udGV4dDogZW1wdHlPYmplY3QsXG4gICAgICBmb290ZXI6ICcnXG4gICAgfTtcbiAgICB7XG4gICAgICB0b3BGcmFtZS5kZWJ1Z0VsZW1lbnRTdGFjayA9IFtdO1xuICAgIH1cbiAgICB0aGlzLnN0YWNrID0gW3RvcEZyYW1lXTtcbiAgICB0aGlzLmV4aGF1c3RlZCA9IGZhbHNlO1xuICAgIHRoaXMuY3VycmVudFNlbGVjdFZhbHVlID0gbnVsbDtcbiAgICB0aGlzLnByZXZpb3VzV2FzVGV4dE5vZGUgPSBmYWxzZTtcbiAgICB0aGlzLm1ha2VTdGF0aWNNYXJrdXAgPSBtYWtlU3RhdGljTWFya3VwO1xuICB9XG4gIC8vIFRPRE86IHR5cGUgdGhpcyBtb3JlIHN0cmljdGx5OlxuXG5cbiAgUmVhY3RET01TZXJ2ZXJSZW5kZXJlci5wcm90b3R5cGUucmVhZCA9IGZ1bmN0aW9uIHJlYWQoYnl0ZXMpIHtcbiAgICBpZiAodGhpcy5leGhhdXN0ZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciBvdXQgPSAnJztcbiAgICB3aGlsZSAob3V0Lmxlbmd0aCA8IGJ5dGVzKSB7XG4gICAgICBpZiAodGhpcy5zdGFjay5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5leGhhdXN0ZWQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHZhciBmcmFtZSA9IHRoaXMuc3RhY2tbdGhpcy5zdGFjay5sZW5ndGggLSAxXTtcbiAgICAgIGlmIChmcmFtZS5jaGlsZEluZGV4ID49IGZyYW1lLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICB2YXIgZm9vdGVyID0gZnJhbWUuZm9vdGVyO1xuICAgICAgICBvdXQgKz0gZm9vdGVyO1xuICAgICAgICBpZiAoZm9vdGVyICE9PSAnJykge1xuICAgICAgICAgIHRoaXMucHJldmlvdXNXYXNUZXh0Tm9kZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhY2sucG9wKCk7XG4gICAgICAgIGlmIChmcmFtZS50YWcgPT09ICdzZWxlY3QnKSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50U2VsZWN0VmFsdWUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgdmFyIGNoaWxkID0gZnJhbWUuY2hpbGRyZW5bZnJhbWUuY2hpbGRJbmRleCsrXTtcbiAgICAgIHtcbiAgICAgICAgc2V0Q3VycmVudERlYnVnU3RhY2sodGhpcy5zdGFjayk7XG4gICAgICB9XG4gICAgICBvdXQgKz0gdGhpcy5yZW5kZXIoY2hpbGQsIGZyYW1lLmNvbnRleHQsIGZyYW1lLmRvbU5hbWVzcGFjZSk7XG4gICAgICB7XG4gICAgICAgIC8vIFRPRE86IEhhbmRsZSByZWVudHJhbnQgc2VydmVyIHJlbmRlciBjYWxscy4gVGhpcyBkb2Vzbid0LlxuICAgICAgICByZXNldEN1cnJlbnREZWJ1Z1N0YWNrKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG4gIH07XG5cbiAgUmVhY3RET01TZXJ2ZXJSZW5kZXJlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKGNoaWxkLCBjb250ZXh0LCBwYXJlbnROYW1lc3BhY2UpIHtcbiAgICBpZiAodHlwZW9mIGNoaWxkID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgY2hpbGQgPT09ICdudW1iZXInKSB7XG4gICAgICB2YXIgdGV4dCA9ICcnICsgY2hpbGQ7XG4gICAgICBpZiAodGV4dCA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMubWFrZVN0YXRpY01hcmt1cCkge1xuICAgICAgICByZXR1cm4gZXNjYXBlVGV4dEZvckJyb3dzZXIodGV4dCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5wcmV2aW91c1dhc1RleHROb2RlKSB7XG4gICAgICAgIHJldHVybiAnPCEtLSAtLT4nICsgZXNjYXBlVGV4dEZvckJyb3dzZXIodGV4dCk7XG4gICAgICB9XG4gICAgICB0aGlzLnByZXZpb3VzV2FzVGV4dE5vZGUgPSB0cnVlO1xuICAgICAgcmV0dXJuIGVzY2FwZVRleHRGb3JCcm93c2VyKHRleHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbmV4dENoaWxkO1xuXG4gICAgICB2YXIgX3Jlc29sdmUgPSByZXNvbHZlKGNoaWxkLCBjb250ZXh0KTtcblxuICAgICAgbmV4dENoaWxkID0gX3Jlc29sdmUuY2hpbGQ7XG4gICAgICBjb250ZXh0ID0gX3Jlc29sdmUuY29udGV4dDtcblxuICAgICAgaWYgKG5leHRDaGlsZCA9PT0gbnVsbCB8fCBuZXh0Q2hpbGQgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH0gZWxzZSBpZiAoIVJlYWN0LmlzVmFsaWRFbGVtZW50KG5leHRDaGlsZCkpIHtcbiAgICAgICAgdmFyIG5leHRDaGlsZHJlbiA9IHRvQXJyYXkobmV4dENoaWxkKTtcbiAgICAgICAgdmFyIGZyYW1lID0ge1xuICAgICAgICAgIGRvbU5hbWVzcGFjZTogcGFyZW50TmFtZXNwYWNlLFxuICAgICAgICAgIGNoaWxkcmVuOiBuZXh0Q2hpbGRyZW4sXG4gICAgICAgICAgY2hpbGRJbmRleDogMCxcbiAgICAgICAgICBjb250ZXh0OiBjb250ZXh0LFxuICAgICAgICAgIGZvb3RlcjogJydcbiAgICAgICAgfTtcbiAgICAgICAge1xuICAgICAgICAgIGZyYW1lLmRlYnVnRWxlbWVudFN0YWNrID0gW107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGFjay5wdXNoKGZyYW1lKTtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfSBlbHNlIGlmIChuZXh0Q2hpbGQudHlwZSA9PT0gUkVBQ1RfRlJBR01FTlRfVFlQRSkge1xuICAgICAgICB2YXIgX25leHRDaGlsZHJlbiA9IHRvQXJyYXkobmV4dENoaWxkLnByb3BzLmNoaWxkcmVuKTtcbiAgICAgICAgdmFyIF9mcmFtZSA9IHtcbiAgICAgICAgICBkb21OYW1lc3BhY2U6IHBhcmVudE5hbWVzcGFjZSxcbiAgICAgICAgICBjaGlsZHJlbjogX25leHRDaGlsZHJlbixcbiAgICAgICAgICBjaGlsZEluZGV4OiAwLFxuICAgICAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG4gICAgICAgICAgZm9vdGVyOiAnJ1xuICAgICAgICB9O1xuICAgICAgICB7XG4gICAgICAgICAgX2ZyYW1lLmRlYnVnRWxlbWVudFN0YWNrID0gW107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGFjay5wdXNoKF9mcmFtZSk7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFNhZmUgYmVjYXVzZSB3ZSBqdXN0IGNoZWNrZWQgaXQncyBhbiBlbGVtZW50LlxuICAgICAgICB2YXIgbmV4dEVsZW1lbnQgPSBuZXh0Q2hpbGQ7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlckRPTShuZXh0RWxlbWVudCwgY29udGV4dCwgcGFyZW50TmFtZXNwYWNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgUmVhY3RET01TZXJ2ZXJSZW5kZXJlci5wcm90b3R5cGUucmVuZGVyRE9NID0gZnVuY3Rpb24gcmVuZGVyRE9NKGVsZW1lbnQsIGNvbnRleHQsIHBhcmVudE5hbWVzcGFjZSkge1xuICAgIHZhciB0YWcgPSBlbGVtZW50LnR5cGUudG9Mb3dlckNhc2UoKTtcblxuICAgIHZhciBuYW1lc3BhY2UgPSBwYXJlbnROYW1lc3BhY2U7XG4gICAgaWYgKHBhcmVudE5hbWVzcGFjZSA9PT0gTmFtZXNwYWNlcy5odG1sKSB7XG4gICAgICBuYW1lc3BhY2UgPSBnZXRJbnRyaW5zaWNOYW1lc3BhY2UodGFnKTtcbiAgICB9XG5cbiAgICB7XG4gICAgICBpZiAobmFtZXNwYWNlID09PSBOYW1lc3BhY2VzLmh0bWwpIHtcbiAgICAgICAgLy8gU2hvdWxkIHRoaXMgY2hlY2sgYmUgZ2F0ZWQgYnkgcGFyZW50IG5hbWVzcGFjZT8gTm90IHN1cmUgd2Ugd2FudCB0b1xuICAgICAgICAvLyBhbGxvdyA8U1ZHPiBvciA8bUFUSD4uXG4gICAgICAgIHdhcm5pbmcodGFnID09PSBlbGVtZW50LnR5cGUsICc8JXMgLz4gaXMgdXNpbmcgdXBwZXJjYXNlIEhUTUwuIEFsd2F5cyB1c2UgbG93ZXJjYXNlIEhUTUwgdGFncyAnICsgJ2luIFJlYWN0LicsIGVsZW1lbnQudHlwZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFsaWRhdGVEYW5nZXJvdXNUYWcodGFnKTtcblxuICAgIHZhciBwcm9wcyA9IGVsZW1lbnQucHJvcHM7XG4gICAgaWYgKHRhZyA9PT0gJ2lucHV0Jykge1xuICAgICAge1xuICAgICAgICBSZWFjdENvbnRyb2xsZWRWYWx1ZVByb3BUeXBlcy5jaGVja1Byb3BUeXBlcygnaW5wdXQnLCBwcm9wcywgZ2V0U3RhY2tBZGRlbmR1bSk7XG5cbiAgICAgICAgaWYgKHByb3BzLmNoZWNrZWQgIT09IHVuZGVmaW5lZCAmJiBwcm9wcy5kZWZhdWx0Q2hlY2tlZCAhPT0gdW5kZWZpbmVkICYmICFkaWRXYXJuRGVmYXVsdENoZWNrZWQpIHtcbiAgICAgICAgICB3YXJuaW5nKGZhbHNlLCAnJXMgY29udGFpbnMgYW4gaW5wdXQgb2YgdHlwZSAlcyB3aXRoIGJvdGggY2hlY2tlZCBhbmQgZGVmYXVsdENoZWNrZWQgcHJvcHMuICcgKyAnSW5wdXQgZWxlbWVudHMgbXVzdCBiZSBlaXRoZXIgY29udHJvbGxlZCBvciB1bmNvbnRyb2xsZWQgJyArICcoc3BlY2lmeSBlaXRoZXIgdGhlIGNoZWNrZWQgcHJvcCwgb3IgdGhlIGRlZmF1bHRDaGVja2VkIHByb3AsIGJ1dCBub3QgJyArICdib3RoKS4gRGVjaWRlIGJldHdlZW4gdXNpbmcgYSBjb250cm9sbGVkIG9yIHVuY29udHJvbGxlZCBpbnB1dCAnICsgJ2VsZW1lbnQgYW5kIHJlbW92ZSBvbmUgb2YgdGhlc2UgcHJvcHMuIE1vcmUgaW5mbzogJyArICdodHRwczovL2ZiLm1lL3JlYWN0LWNvbnRyb2xsZWQtY29tcG9uZW50cycsICdBIGNvbXBvbmVudCcsIHByb3BzLnR5cGUpO1xuICAgICAgICAgIGRpZFdhcm5EZWZhdWx0Q2hlY2tlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLnZhbHVlICE9PSB1bmRlZmluZWQgJiYgcHJvcHMuZGVmYXVsdFZhbHVlICE9PSB1bmRlZmluZWQgJiYgIWRpZFdhcm5EZWZhdWx0SW5wdXRWYWx1ZSkge1xuICAgICAgICAgIHdhcm5pbmcoZmFsc2UsICclcyBjb250YWlucyBhbiBpbnB1dCBvZiB0eXBlICVzIHdpdGggYm90aCB2YWx1ZSBhbmQgZGVmYXVsdFZhbHVlIHByb3BzLiAnICsgJ0lucHV0IGVsZW1lbnRzIG11c3QgYmUgZWl0aGVyIGNvbnRyb2xsZWQgb3IgdW5jb250cm9sbGVkICcgKyAnKHNwZWNpZnkgZWl0aGVyIHRoZSB2YWx1ZSBwcm9wLCBvciB0aGUgZGVmYXVsdFZhbHVlIHByb3AsIGJ1dCBub3QgJyArICdib3RoKS4gRGVjaWRlIGJldHdlZW4gdXNpbmcgYSBjb250cm9sbGVkIG9yIHVuY29udHJvbGxlZCBpbnB1dCAnICsgJ2VsZW1lbnQgYW5kIHJlbW92ZSBvbmUgb2YgdGhlc2UgcHJvcHMuIE1vcmUgaW5mbzogJyArICdodHRwczovL2ZiLm1lL3JlYWN0LWNvbnRyb2xsZWQtY29tcG9uZW50cycsICdBIGNvbXBvbmVudCcsIHByb3BzLnR5cGUpO1xuICAgICAgICAgIGRpZFdhcm5EZWZhdWx0SW5wdXRWYWx1ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcHJvcHMgPSBfYXNzaWduKHtcbiAgICAgICAgdHlwZTogdW5kZWZpbmVkXG4gICAgICB9LCBwcm9wcywge1xuICAgICAgICBkZWZhdWx0Q2hlY2tlZDogdW5kZWZpbmVkLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgdmFsdWU6IHByb3BzLnZhbHVlICE9IG51bGwgPyBwcm9wcy52YWx1ZSA6IHByb3BzLmRlZmF1bHRWYWx1ZSxcbiAgICAgICAgY2hlY2tlZDogcHJvcHMuY2hlY2tlZCAhPSBudWxsID8gcHJvcHMuY2hlY2tlZCA6IHByb3BzLmRlZmF1bHRDaGVja2VkXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHRhZyA9PT0gJ3RleHRhcmVhJykge1xuICAgICAge1xuICAgICAgICBSZWFjdENvbnRyb2xsZWRWYWx1ZVByb3BUeXBlcy5jaGVja1Byb3BUeXBlcygndGV4dGFyZWEnLCBwcm9wcywgZ2V0U3RhY2tBZGRlbmR1bSk7XG4gICAgICAgIGlmIChwcm9wcy52YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHByb3BzLmRlZmF1bHRWYWx1ZSAhPT0gdW5kZWZpbmVkICYmICFkaWRXYXJuRGVmYXVsdFRleHRhcmVhVmFsdWUpIHtcbiAgICAgICAgICB3YXJuaW5nKGZhbHNlLCAnVGV4dGFyZWEgZWxlbWVudHMgbXVzdCBiZSBlaXRoZXIgY29udHJvbGxlZCBvciB1bmNvbnRyb2xsZWQgJyArICcoc3BlY2lmeSBlaXRoZXIgdGhlIHZhbHVlIHByb3AsIG9yIHRoZSBkZWZhdWx0VmFsdWUgcHJvcCwgYnV0IG5vdCAnICsgJ2JvdGgpLiBEZWNpZGUgYmV0d2VlbiB1c2luZyBhIGNvbnRyb2xsZWQgb3IgdW5jb250cm9sbGVkIHRleHRhcmVhICcgKyAnYW5kIHJlbW92ZSBvbmUgb2YgdGhlc2UgcHJvcHMuIE1vcmUgaW5mbzogJyArICdodHRwczovL2ZiLm1lL3JlYWN0LWNvbnRyb2xsZWQtY29tcG9uZW50cycpO1xuICAgICAgICAgIGRpZFdhcm5EZWZhdWx0VGV4dGFyZWFWYWx1ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIGluaXRpYWxWYWx1ZSA9IHByb3BzLnZhbHVlO1xuICAgICAgaWYgKGluaXRpYWxWYWx1ZSA9PSBudWxsKSB7XG4gICAgICAgIHZhciBkZWZhdWx0VmFsdWUgPSBwcm9wcy5kZWZhdWx0VmFsdWU7XG4gICAgICAgIC8vIFRPRE8gKHl1bmdzdGVycyk6IFJlbW92ZSBzdXBwb3J0IGZvciBjaGlsZHJlbiBjb250ZW50IGluIDx0ZXh0YXJlYT4uXG4gICAgICAgIHZhciB0ZXh0YXJlYUNoaWxkcmVuID0gcHJvcHMuY2hpbGRyZW47XG4gICAgICAgIGlmICh0ZXh0YXJlYUNoaWxkcmVuICE9IG51bGwpIHtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB3YXJuaW5nKGZhbHNlLCAnVXNlIHRoZSBgZGVmYXVsdFZhbHVlYCBvciBgdmFsdWVgIHByb3BzIGluc3RlYWQgb2Ygc2V0dGluZyAnICsgJ2NoaWxkcmVuIG9uIDx0ZXh0YXJlYT4uJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgICEoZGVmYXVsdFZhbHVlID09IG51bGwpID8gaW52YXJpYW50KGZhbHNlLCAnSWYgeW91IHN1cHBseSBgZGVmYXVsdFZhbHVlYCBvbiBhIDx0ZXh0YXJlYT4sIGRvIG5vdCBwYXNzIGNoaWxkcmVuLicpIDogdm9pZCAwO1xuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRleHRhcmVhQ2hpbGRyZW4pKSB7XG4gICAgICAgICAgICAhKHRleHRhcmVhQ2hpbGRyZW4ubGVuZ3RoIDw9IDEpID8gaW52YXJpYW50KGZhbHNlLCAnPHRleHRhcmVhPiBjYW4gb25seSBoYXZlIGF0IG1vc3Qgb25lIGNoaWxkLicpIDogdm9pZCAwO1xuICAgICAgICAgICAgdGV4dGFyZWFDaGlsZHJlbiA9IHRleHRhcmVhQ2hpbGRyZW5bMF07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZGVmYXVsdFZhbHVlID0gJycgKyB0ZXh0YXJlYUNoaWxkcmVuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkZWZhdWx0VmFsdWUgPT0gbnVsbCkge1xuICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIGluaXRpYWxWYWx1ZSA9IGRlZmF1bHRWYWx1ZTtcbiAgICAgIH1cblxuICAgICAgcHJvcHMgPSBfYXNzaWduKHt9LCBwcm9wcywge1xuICAgICAgICB2YWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICBjaGlsZHJlbjogJycgKyBpbml0aWFsVmFsdWVcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodGFnID09PSAnc2VsZWN0Jykge1xuICAgICAge1xuICAgICAgICBSZWFjdENvbnRyb2xsZWRWYWx1ZVByb3BUeXBlcy5jaGVja1Byb3BUeXBlcygnc2VsZWN0JywgcHJvcHMsIGdldFN0YWNrQWRkZW5kdW0pO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVQcm9wTmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgcHJvcE5hbWUgPSB2YWx1ZVByb3BOYW1lc1tpXTtcbiAgICAgICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkocHJvcHNbcHJvcE5hbWVdKTtcbiAgICAgICAgICBpZiAocHJvcHMubXVsdGlwbGUgJiYgIWlzQXJyYXkpIHtcbiAgICAgICAgICAgIHdhcm5pbmcoZmFsc2UsICdUaGUgYCVzYCBwcm9wIHN1cHBsaWVkIHRvIDxzZWxlY3Q+IG11c3QgYmUgYW4gYXJyYXkgaWYgJyArICdgbXVsdGlwbGVgIGlzIHRydWUuJXMnLCBwcm9wTmFtZSwgJycpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoIXByb3BzLm11bHRpcGxlICYmIGlzQXJyYXkpIHtcbiAgICAgICAgICAgIHdhcm5pbmcoZmFsc2UsICdUaGUgYCVzYCBwcm9wIHN1cHBsaWVkIHRvIDxzZWxlY3Q+IG11c3QgYmUgYSBzY2FsYXIgJyArICd2YWx1ZSBpZiBgbXVsdGlwbGVgIGlzIGZhbHNlLiVzJywgcHJvcE5hbWUsICcnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMudmFsdWUgIT09IHVuZGVmaW5lZCAmJiBwcm9wcy5kZWZhdWx0VmFsdWUgIT09IHVuZGVmaW5lZCAmJiAhZGlkV2FybkRlZmF1bHRTZWxlY3RWYWx1ZSkge1xuICAgICAgICAgIHdhcm5pbmcoZmFsc2UsICdTZWxlY3QgZWxlbWVudHMgbXVzdCBiZSBlaXRoZXIgY29udHJvbGxlZCBvciB1bmNvbnRyb2xsZWQgJyArICcoc3BlY2lmeSBlaXRoZXIgdGhlIHZhbHVlIHByb3AsIG9yIHRoZSBkZWZhdWx0VmFsdWUgcHJvcCwgYnV0IG5vdCAnICsgJ2JvdGgpLiBEZWNpZGUgYmV0d2VlbiB1c2luZyBhIGNvbnRyb2xsZWQgb3IgdW5jb250cm9sbGVkIHNlbGVjdCAnICsgJ2VsZW1lbnQgYW5kIHJlbW92ZSBvbmUgb2YgdGhlc2UgcHJvcHMuIE1vcmUgaW5mbzogJyArICdodHRwczovL2ZiLm1lL3JlYWN0LWNvbnRyb2xsZWQtY29tcG9uZW50cycpO1xuICAgICAgICAgIGRpZFdhcm5EZWZhdWx0U2VsZWN0VmFsdWUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmN1cnJlbnRTZWxlY3RWYWx1ZSA9IHByb3BzLnZhbHVlICE9IG51bGwgPyBwcm9wcy52YWx1ZSA6IHByb3BzLmRlZmF1bHRWYWx1ZTtcbiAgICAgIHByb3BzID0gX2Fzc2lnbih7fSwgcHJvcHMsIHtcbiAgICAgICAgdmFsdWU6IHVuZGVmaW5lZFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0YWcgPT09ICdvcHRpb24nKSB7XG4gICAgICB2YXIgc2VsZWN0ZWQgPSBudWxsO1xuICAgICAgdmFyIHNlbGVjdFZhbHVlID0gdGhpcy5jdXJyZW50U2VsZWN0VmFsdWU7XG4gICAgICB2YXIgb3B0aW9uQ2hpbGRyZW4gPSBmbGF0dGVuT3B0aW9uQ2hpbGRyZW4ocHJvcHMuY2hpbGRyZW4pO1xuICAgICAgaWYgKHNlbGVjdFZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICBpZiAocHJvcHMudmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgIHZhbHVlID0gcHJvcHMudmFsdWUgKyAnJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YWx1ZSA9IG9wdGlvbkNoaWxkcmVuO1xuICAgICAgICB9XG4gICAgICAgIHNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHNlbGVjdFZhbHVlKSkge1xuICAgICAgICAgIC8vIG11bHRpcGxlXG4gICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzZWxlY3RWYWx1ZS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgaWYgKCcnICsgc2VsZWN0VmFsdWVbal0gPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgIHNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbGVjdGVkID0gJycgKyBzZWxlY3RWYWx1ZSA9PT0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBwcm9wcyA9IF9hc3NpZ24oe1xuICAgICAgICAgIHNlbGVjdGVkOiB1bmRlZmluZWQsXG4gICAgICAgICAgY2hpbGRyZW46IHVuZGVmaW5lZFxuICAgICAgICB9LCBwcm9wcywge1xuICAgICAgICAgIHNlbGVjdGVkOiBzZWxlY3RlZCxcbiAgICAgICAgICBjaGlsZHJlbjogb3B0aW9uQ2hpbGRyZW5cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAge1xuICAgICAgdmFsaWRhdGVQcm9wZXJ0aWVzSW5EZXZlbG9wbWVudCh0YWcsIHByb3BzKTtcbiAgICB9XG5cbiAgICBhc3NlcnRWYWxpZFByb3BzKHRhZywgcHJvcHMsIGdldFN0YWNrQWRkZW5kdW0pO1xuXG4gICAgdmFyIG91dCA9IGNyZWF0ZU9wZW5UYWdNYXJrdXAoZWxlbWVudC50eXBlLCB0YWcsIHByb3BzLCBuYW1lc3BhY2UsIHRoaXMubWFrZVN0YXRpY01hcmt1cCwgdGhpcy5zdGFjay5sZW5ndGggPT09IDEpO1xuICAgIHZhciBmb290ZXIgPSAnJztcbiAgICBpZiAob21pdHRlZENsb3NlVGFncy5oYXNPd25Qcm9wZXJ0eSh0YWcpKSB7XG4gICAgICBvdXQgKz0gJy8+JztcbiAgICB9IGVsc2Uge1xuICAgICAgb3V0ICs9ICc+JztcbiAgICAgIGZvb3RlciA9ICc8LycgKyBlbGVtZW50LnR5cGUgKyAnPic7XG4gICAgfVxuICAgIHZhciBjaGlsZHJlbjtcbiAgICB2YXIgaW5uZXJNYXJrdXAgPSBnZXROb25DaGlsZHJlbklubmVyTWFya3VwKHByb3BzKTtcbiAgICBpZiAoaW5uZXJNYXJrdXAgIT0gbnVsbCkge1xuICAgICAgY2hpbGRyZW4gPSBbXTtcbiAgICAgIGlmIChuZXdsaW5lRWF0aW5nVGFnc1t0YWddICYmIGlubmVyTWFya3VwLmNoYXJBdCgwKSA9PT0gJ1xcbicpIHtcbiAgICAgICAgLy8gdGV4dC9odG1sIGlnbm9yZXMgdGhlIGZpcnN0IGNoYXJhY3RlciBpbiB0aGVzZSB0YWdzIGlmIGl0J3MgYSBuZXdsaW5lXG4gICAgICAgIC8vIFByZWZlciB0byBicmVhayBhcHBsaWNhdGlvbi94bWwgb3ZlciB0ZXh0L2h0bWwgKGZvciBub3cpIGJ5IGFkZGluZ1xuICAgICAgICAvLyBhIG5ld2xpbmUgc3BlY2lmaWNhbGx5IHRvIGdldCBlYXRlbiBieSB0aGUgcGFyc2VyLiAoQWx0ZXJuYXRlbHkgZm9yXG4gICAgICAgIC8vIHRleHRhcmVhcywgcmVwbGFjaW5nIFwiXlxcblwiIHdpdGggXCJcXHJcXG5cIiBkb2Vzbid0IGdldCBlYXRlbiwgYW5kIHRoZSBmaXJzdFxuICAgICAgICAvLyBcXHIgaXMgbm9ybWFsaXplZCBvdXQgYnkgSFRNTFRleHRBcmVhRWxlbWVudCN2YWx1ZS4pXG4gICAgICAgIC8vIFNlZTogPGh0dHA6Ly93d3cudzMub3JnL1RSL2h0bWwtcG9seWdsb3QvI25ld2xpbmVzLWluLXRleHRhcmVhLWFuZC1wcmU+XG4gICAgICAgIC8vIFNlZTogPGh0dHA6Ly93d3cudzMub3JnL1RSL2h0bWw1L3N5bnRheC5odG1sI2VsZW1lbnQtcmVzdHJpY3Rpb25zPlxuICAgICAgICAvLyBTZWU6IDxodHRwOi8vd3d3LnczLm9yZy9UUi9odG1sNS9zeW50YXguaHRtbCNuZXdsaW5lcz5cbiAgICAgICAgLy8gU2VlOiBQYXJzaW5nIG9mIFwidGV4dGFyZWFcIiBcImxpc3RpbmdcIiBhbmQgXCJwcmVcIiBlbGVtZW50c1xuICAgICAgICAvLyAgZnJvbSA8aHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDUvc3ludGF4Lmh0bWwjcGFyc2luZy1tYWluLWluYm9keT5cbiAgICAgICAgb3V0ICs9ICdcXG4nO1xuICAgICAgfVxuICAgICAgb3V0ICs9IGlubmVyTWFya3VwO1xuICAgIH0gZWxzZSB7XG4gICAgICBjaGlsZHJlbiA9IHRvQXJyYXkocHJvcHMuY2hpbGRyZW4pO1xuICAgIH1cbiAgICB2YXIgZnJhbWUgPSB7XG4gICAgICBkb21OYW1lc3BhY2U6IGdldENoaWxkTmFtZXNwYWNlKHBhcmVudE5hbWVzcGFjZSwgZWxlbWVudC50eXBlKSxcbiAgICAgIHRhZzogdGFnLFxuICAgICAgY2hpbGRyZW46IGNoaWxkcmVuLFxuICAgICAgY2hpbGRJbmRleDogMCxcbiAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG4gICAgICBmb290ZXI6IGZvb3RlclxuICAgIH07XG4gICAge1xuICAgICAgZnJhbWUuZGVidWdFbGVtZW50U3RhY2sgPSBbXTtcbiAgICB9XG4gICAgdGhpcy5zdGFjay5wdXNoKGZyYW1lKTtcbiAgICB0aGlzLnByZXZpb3VzV2FzVGV4dE5vZGUgPSBmYWxzZTtcbiAgICByZXR1cm4gb3V0O1xuICB9O1xuXG4gIHJldHVybiBSZWFjdERPTVNlcnZlclJlbmRlcmVyO1xufSgpO1xuXG4vKipcbiAqIFJlbmRlciBhIFJlYWN0RWxlbWVudCB0byBpdHMgaW5pdGlhbCBIVE1MLiBUaGlzIHNob3VsZCBvbmx5IGJlIHVzZWQgb24gdGhlXG4gKiBzZXJ2ZXIuXG4gKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWRvbS1zZXJ2ZXIuaHRtbCNyZW5kZXJ0b3N0cmluZ1xuICovXG5mdW5jdGlvbiByZW5kZXJUb1N0cmluZyhlbGVtZW50KSB7XG4gIHZhciByZW5kZXJlciA9IG5ldyBSZWFjdERPTVNlcnZlclJlbmRlcmVyKGVsZW1lbnQsIGZhbHNlKTtcbiAgdmFyIG1hcmt1cCA9IHJlbmRlcmVyLnJlYWQoSW5maW5pdHkpO1xuICByZXR1cm4gbWFya3VwO1xufVxuXG4vKipcbiAqIFNpbWlsYXIgdG8gcmVuZGVyVG9TdHJpbmcsIGV4Y2VwdCB0aGlzIGRvZXNuJ3QgY3JlYXRlIGV4dHJhIERPTSBhdHRyaWJ1dGVzXG4gKiBzdWNoIGFzIGRhdGEtcmVhY3QtaWQgdGhhdCBSZWFjdCB1c2VzIGludGVybmFsbHkuXG4gKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWRvbS1zZXJ2ZXIuaHRtbCNyZW5kZXJ0b3N0YXRpY21hcmt1cFxuICovXG5mdW5jdGlvbiByZW5kZXJUb1N0YXRpY01hcmt1cChlbGVtZW50KSB7XG4gIHZhciByZW5kZXJlciA9IG5ldyBSZWFjdERPTVNlcnZlclJlbmRlcmVyKGVsZW1lbnQsIHRydWUpO1xuICB2YXIgbWFya3VwID0gcmVuZGVyZXIucmVhZChJbmZpbml0eSk7XG4gIHJldHVybiBtYXJrdXA7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclRvTm9kZVN0cmVhbSgpIHtcbiAgaW52YXJpYW50KGZhbHNlLCAnUmVhY3RET01TZXJ2ZXIucmVuZGVyVG9Ob2RlU3RyZWFtKCk6IFRoZSBzdHJlYW1pbmcgQVBJIGlzIG5vdCBhdmFpbGFibGUgaW4gdGhlIGJyb3dzZXIuIFVzZSBSZWFjdERPTVNlcnZlci5yZW5kZXJUb1N0cmluZygpIGluc3RlYWQuJyk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclRvU3RhdGljTm9kZVN0cmVhbSgpIHtcbiAgaW52YXJpYW50KGZhbHNlLCAnUmVhY3RET01TZXJ2ZXIucmVuZGVyVG9TdGF0aWNOb2RlU3RyZWFtKCk6IFRoZSBzdHJlYW1pbmcgQVBJIGlzIG5vdCBhdmFpbGFibGUgaW4gdGhlIGJyb3dzZXIuIFVzZSBSZWFjdERPTVNlcnZlci5yZW5kZXJUb1N0YXRpY01hcmt1cCgpIGluc3RlYWQuJyk7XG59XG5cbi8vIE5vdGU6IHdoZW4gY2hhbmdpbmcgdGhpcywgYWxzbyBjb25zaWRlciBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzLzExNTI2XG52YXIgUmVhY3RET01TZXJ2ZXJCcm93c2VyID0ge1xuICByZW5kZXJUb1N0cmluZzogcmVuZGVyVG9TdHJpbmcsXG4gIHJlbmRlclRvU3RhdGljTWFya3VwOiByZW5kZXJUb1N0YXRpY01hcmt1cCxcbiAgcmVuZGVyVG9Ob2RlU3RyZWFtOiByZW5kZXJUb05vZGVTdHJlYW0sXG4gIHJlbmRlclRvU3RhdGljTm9kZVN0cmVhbTogcmVuZGVyVG9TdGF0aWNOb2RlU3RyZWFtLFxuICB2ZXJzaW9uOiBSZWFjdFZlcnNpb25cbn07XG5cbnZhciBSZWFjdERPTVNlcnZlckJyb3dzZXIkMSA9IE9iamVjdC5mcmVlemUoe1xuXHRkZWZhdWx0OiBSZWFjdERPTVNlcnZlckJyb3dzZXJcbn0pO1xuXG52YXIgUmVhY3RET01TZXJ2ZXIgPSAoIFJlYWN0RE9NU2VydmVyQnJvd3NlciQxICYmIFJlYWN0RE9NU2VydmVyQnJvd3NlciApIHx8IFJlYWN0RE9NU2VydmVyQnJvd3NlciQxO1xuXG4vLyBUT0RPOiBkZWNpZGUgb24gdGhlIHRvcC1sZXZlbCBleHBvcnQgZm9ybS5cbi8vIFRoaXMgaXMgaGFja3kgYnV0IG1ha2VzIGl0IHdvcmsgd2l0aCBib3RoIFJvbGx1cCBhbmQgSmVzdFxudmFyIHNlcnZlcl9icm93c2VyID0gUmVhY3RET01TZXJ2ZXJbJ2RlZmF1bHQnXSA/IFJlYWN0RE9NU2VydmVyWydkZWZhdWx0J10gOiBSZWFjdERPTVNlcnZlcjtcblxubW9kdWxlLmV4cG9ydHMgPSBzZXJ2ZXJfYnJvd3NlcjtcbiAgfSkoKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LWRvbS9janMvcmVhY3QtZG9tLXNlcnZlci5icm93c2VyLmRldmVsb3BtZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAyMjU5XG4vLyBtb2R1bGUgY2h1bmtzID0gMyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBIiwic291cmNlUm9vdCI6IiJ9