export type FormFieldComponentType =
  /** this should be the default type */
  | 'text'
  /** number inputs should be handled differently (NumberInput component) */
  | 'number'
  /** Checkboxes are for boolean values */
  | 'checkbox'
  /**
   * all the fields with an enum should be Select
   * we may add subtypes for the select component (i.e. with custom Select Items)
   */
  | 'select'
  /**
   * These should be used ONLY for actual custom colors. ThemeOverride colors
   * shold use the 'select' component
   */
  | 'color-picker'
  /**
   * Custom "block" component type for Links.
   * we should use this for set of properties that represent a link with
   * different properties (text, href, target, etc) and render a whole set of
   * fields for it.
   */
  | 'link-group'
  /**
   * Custom block for array type. It should render a (reorderable) list of
   * fields for each item in the array
   */
  | 'list-group'
  /**
   *
   */
  | 'list-enum'
