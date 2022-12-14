import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { parseSchema } from './parse-schema'
import { useConfig } from './use-config'

interface FormContextValue {
  global: ReturnType<typeof useConfig>
  theme: ReturnType<typeof useConfig>
  sections: ReturnType<typeof useConfig>
  selectedTemplate: string
  onSelectTemplate: (template: string) => void
}

const FormContext = createContext<FormContextValue>(null)

export const useFormContext = () => useContext(FormContext)

export function useGlobalConfig() {
  const { global } = useFormContext()
  return global
}
export function useThemeConfig() {
  const { theme } = useFormContext()
  return theme
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

export interface FormContextProviderProps extends PropsWithChildren {
  baseUrl: string
}

/**
 * Landing pages form custom context provider. Takes care of fetching and parsing
 * global and template schemas, managing template selections and provides
 * all the data to child components, including "correct empty defaults" if necessary
 */
export function FormContextProvider({
  baseUrl,
  children,
}: FormContextProviderProps) {
  const global = useConfig({
    type: 'global',
    base_url: baseUrl,
    parser: parseSchema,
  })

  const [templateName, setTemplateName] = useState<string>()

  const template = useConfig({
    type: 'template',
    base_url: baseUrl,
    parser: parseSchema,
    template: templateName,
  })

  const value: FormContextValue = {
    global,
    theme: getThemeConfig(template?.[0]) ?? {},
    sections: getSectionsConfig(template?.[0]) ?? {},
    selectedTemplate: templateName,
    onSelectTemplate: setTemplateName,
  }
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

function getSectionsConfig(config: any) {
  return config?.sections ?? {}
}
function getThemeConfig(config: any) {
  return config?.theme ?? {}
}
