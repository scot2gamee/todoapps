/**
 * An object containing font sizes for various text elements.
 * @typedef {Object} SizeFonts
 * @property {number} h1 - The font size for a `h1` header element.
 * @property {number} h2 - The font size for a `h2` header element.
 * @property {number} h3 - The font size for a `h3` header element.
 * @property {number} h4 - The font size for a `h4` header element.
 * @property {number} h5 - The font size for a `h5` header element.
 * @property {number} l - The font size for a large text element.
 * @property {number} m - The font size for a medium text element.
 * @property {number} s - The font size for a small text element.
 * @property {number} xs - The font size for an extra small text element.
 */
export const SizeFonts = {
  /**
   * The font size for a `h1` header element. This size is typically used for the main header on a page.
   * @type {number}
   * @constant
   * @default 36
   */
  h1: 36,
  /**
   * The font size for a `h2` header element. This size is typically used for subheadings within the main content.
   * @type {number}
   * @constant
   * @default 28
   */
  h2: 28,
  /**
   * The font size for a `h3` header element. This size is typically used for sub-subheadings within the main content.
   * @type {number}
   * @constant
   * @default 24
   */
  h3: 24,
  /**
   * The font size for a `h4` header element. This size is typically used for smaller headings within the main content.
   * @type {number}
   * @constant
   * @default 20
   */
  h4: 20,
  /**
   * The font size for a `h5` header element. This size is typically used for even smaller headings within the main content.
   * @type {number}
   * @constant
   * @default 18
   */
  h5: 18,
  /**
   * The font size for a large text element. This size is typically used for large blocks of text, such as paragraphs.
   * @type {number}
   * @constant
   * @default 16
   */
  l: 16,
  /**
   * The font size for a medium text element. This size is typically used for smaller blocks of text, such as captions or subtitles.
   * @type {number}
   * @constant
   * @default 14
   */
  m: 14,
  /**
   * The font size for a small text element. This size is typically used for even smaller blocks of text, such as labels or annotations.
   * @type {number}
   * @constant
   * @default 12
   */
  s: 12,
  /**
   * The font size for an extra small text element. This size is typically used for the smallest blocks of text
   * @type {number}
   * @constant
   * @default 12
   */
  xs: 10,
};

/**
 * An object containing border radii for various UI elements.
 * @typedef {Object} Radius
 * @property {number} l - The border radius for a large UI element.
 * @property {number} m - The border radius for a medium UI element.
 * @property {number} s - The border radius for a small UI element.
 */
export const Radius = {
  /**
   * The border radius for a large UI element. This radius is typically used for larger components, such as buttons or cards.
   * @type {number}
   * @constant
   * @default 10
   */
  l: 10,
  /**
   * The border radius for a medium UI element. This radius is typically used for medium-sized components, such as icons or avatars.
   * @type {number}
   * @constant
   * @default 8
   */
  m: 8,
  /**
   * The border radius for a small UI element. This radius is typically used for smaller components, such as checkboxes or switches.
   * @type {number}
   * @constant
   * @default 6
   */
  s: 6,
};
