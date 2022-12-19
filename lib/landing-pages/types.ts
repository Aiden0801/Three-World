/**
 * @deprecated in favor of dynamic ComponentType below
 */
type _FormFieldComponentType =
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

export type GenericFormField = {
  /** label | title for the input component */
  label: string
  /** placeholder text for the inputs */
  placeholder?: string
  /** true if the field is in the `required` list of properties of the schema */
  isRequired?: boolean
  /** original JSON schema type */
  type: string
  // component: FormFieldComponentType // TODO: This is one of our components
}

export type TextFormField = GenericFormField & {
  component: 'text'
}

export type NumberFormField = GenericFormField & {
  component: 'number'
}

export type ListGroupFormField = GenericFormField & {
  component: 'list-group'
  items: AnyFormField[]
}
export type CheckboxFormField = GenericFormField & {
  component: 'checkbox'
  items: AnyFormField[]
}

export type LinkGroupFormField = GenericFormField & {
  component: 'link-group'
  items: AnyFormField[]
}

export type SelectFormField = GenericFormField & {
  component: 'select'
  // these comes from mantine's Select component
  data: string[] | { label: string; value: string }[]
}

export type FormComponentType = AnyFormField['component']

export type AnyFormField =
  | TextFormField
  | LinkGroupFormField
  | SelectFormField
  | ListGroupFormField
  | NumberFormField
  | CheckboxFormField

export type FormField<T extends any> = T extends FormComponentType ? Extract<AnyFormField, { component: T }> : AnyFormField
