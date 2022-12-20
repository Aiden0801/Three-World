import { useForm, UseFormReturnType } from '@mantine/form'
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { parseSchema } from './parse-schema'
import { useConfig } from './use-config'
import { useMemo } from 'react'
import { parseGlobalConfig } from './parse-global-config'

interface FormContextValue {
  global: ReturnType<typeof useConfig>
  theme: any
  sections: any
  fixedSections: any
  formValue: UseFormReturnType<FormValues>
  selectedTemplate: string
  onSelectTemplate: (template: string) => void
}
interface FormValues {
  name?: string
  global?: object
  template?: {
    theme: any
    sections: Array<any>
    fixed: any
  }
}
const FormContext = createContext<FormContextValue>(null)

export const useFormContext = () => useContext(FormContext)

export function useGlobalConfig() {
  const { global } = useFormContext()
  return global
}
export function useThemeConfig() {
  const { theme } = useFormContext()
  const vara = 5
  return theme
}
export function useFixedSectionsConfig() {
  const { fixedSections } = useFormContext()
  return fixedSections
}
export function useSectionsConfig() {
  const { sections } = useFormContext()
  return sections
}

export function useTemplateConfig() {
  const theme = useThemeConfig()
  const sections = useSectionsConfig()
  return { theme, sections }
}

export function useTemplateSelection() {
  const { selectedTemplate, onSelectTemplate } = useFormContext()
  return { selectedTemplate, onSelectTemplate }
}
export function useFormValue() {
  const { formValue } = useFormContext()
  return formValue
}
export interface FormContextProviderProps extends PropsWithChildren {
  baseUrl: string
  configData?: any
}

/**
 * Landing pages form custom context provider. Takes care of fetching and parsing
 * global and template schemas, managing template selections and provides
 * all the data to child components, including "correct empty defaults" if necessary
 */
export function FormContextProvider({ baseUrl, configData, children }: FormContextProviderProps) {
  const global = useConfig({
    type: 'global',
    base_url: baseUrl,
    parser: parseGlobalConfig,
  })
  const [templateName, setTemplateName] = useState<string>(configData?.global?.template ?? '')
  const template = useConfig({
    type: 'template',
    base_url: baseUrl,
    parser: parseSchema,
    template: templateName,
  })
  const formValue = useForm<FormValues>({
    initialValues: {
      name: configData?.name ?? '',
      global: configData?.global ?? global?.[1] ?? {},
      template: configData?.template ?? {
        theme: template?.[1]?.theme ?? {},
        sections: template?.[1]?.sections ?? [],
        fixed: template?.[1]?.fixed ?? {},
      },
    },
  })
  const value: FormContextValue = {
    global,
    theme: [getThemeConfig(template?.[0]) ?? {}, template?.[1]?.theme ?? {}],
    sections: [getSectionsConfig(template?.[0]) ?? {}, template?.[1]?.sections ?? undefined],
    fixedSections: [getFixedSectionsConfig(template?.[0]) ?? {}, template?.[1]?.fixed ?? undefined],
    formValue,
    selectedTemplate: templateName,
    onSelectTemplate: setTemplateName,
  }

  // console.log('TEMPLATE', configData?.global, formValue.values)
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}
function getSectionsConfig(config: any) {
  return config?.fields?.[1] ?? {}
}
function getThemeConfig(config: any) {
  return config?.fields?.[0] ?? {}
}
function getFixedSectionsConfig(config: any) {
  return config?.fields?.[2] ?? {}
}
