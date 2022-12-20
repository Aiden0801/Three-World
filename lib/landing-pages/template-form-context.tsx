import { useForm, UseFormReturnType } from '@mantine/form'
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { parseSchema } from './parse-schema'
import { useConfig } from './use-config'
import { useMemo } from 'react'
import { parseGlobalConfig } from './parse-global-config'

interface TemplateContextValue {
  availableSections?: Array<string>
  theme?: any
  fixedSections?: any
  sections?: any
}
const TemplateContext = createContext<TemplateContextValue>(null)

export const useTemplateContext = () => useContext(TemplateContext)

export function useThemeConfig() {
  const { theme } = useTemplateContext()
  return theme
}
export function useFixedSectionsConfig() {
  const { fixedSections } = useTemplateContext()
  return fixedSections
}
export function useSectionsConfig() {
  const { sections } = useTemplateContext()
  return sections
}

export function useTemplateConfig() {
  const theme = useThemeConfig()
  const sections = useSectionsConfig()
  return { theme, sections }
}
export interface TemplateContextProviderProps extends PropsWithChildren {
  templateName?: string
  baseUrl?: string
}

/**
 * Landing pages form custom context provider. Takes care of fetching and parsing
 * global and template schemas, managing template selections and provides
 * all the data to child components, including "correct empty defaults" if necessary
 */
export function TemplateContextProvider({ baseUrl, templateName, children }: TemplateContextProviderProps) {
  console.log('templateContextProvider', templateName)
  const template = useConfig({
    type: 'template',
    base_url: baseUrl,
    parser: parseSchema,
    template: templateName,
  })
  const value: TemplateContextValue = {
    theme: [getThemeConfig(template?.[0]) ?? {}, template?.[1]?.theme ?? {}],
    sections: [getSectionsConfig(template?.[0]) ?? {}, template?.[1]?.sections ?? undefined],
    fixedSections: [getFixedSectionsConfig(template?.[0]) ?? {}, template?.[1]?.fixed ?? undefined],
  }
  console.log('TEmplate', value)

  // console.log('TEMPLATE', configData?.global, formValue.values)
  return <TemplateContext.Provider value={value}>{children}</TemplateContext.Provider>
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
