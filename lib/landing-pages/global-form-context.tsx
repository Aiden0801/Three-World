import { useForm, UseFormReturnType } from '@mantine/form'
import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { parseGlobalConfig } from './parse-global-config'
import { parseSchema } from './parse-schema'
import { useConfig } from './use-config'
import logger from '@/utils/logger'
interface GlobalContextValue {
  global: ReturnType<typeof useConfig>
  formValue: UseFormReturnType<FormValues>
  templateSetter: any
  configData?: any
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
const GlobalContext = createContext<GlobalContextValue>(null)

export const useGlobalContext = () => useContext(GlobalContext)

export function useGlobalConfig() {
  const { global } = useGlobalContext()
  return global
}

export function useConfigData() {
  const { configData } = useGlobalContext()
  return configData
}
export function useTemplateSelection() {
  const [templateName, setTemplateName] = useGlobalContext().templateSetter
  return [templateName, setTemplateName]
}
export function useFormValue() {
  const { formValue } = useGlobalContext()
  return formValue
}
export interface GlobalContextProviderProps extends PropsWithChildren {
  baseUrl: string
  configData?: any
}

/**
 * Landing pages form custom context provider. Takes care of fetching and parsing
 * global and template schemas, managing template selections and provides
 * all the data to child components, including "correct empty defaults" if necessary
 */
export function GlobalContextProvider({ baseUrl, configData, children }: GlobalContextProviderProps) {
  const global = useConfig({
    type: 'global',
    base_url: baseUrl,
    parser: parseGlobalConfig,
  })
  const templateSetter = useState<string>(configData?.global?.template ?? '')
  const template = useConfig({
    type: 'template',
    base_url: baseUrl,
    parser: parseSchema,
    template: templateSetter[0],
  })
  const formValue = useForm<FormValues>({
    initialValues: {
      name: configData?.name ?? '',
      global: configData?.global ?? global?.[1] ?? {},
      template: configData?.template ?? {
        theme: template?.[1]?.theme ?? undefined,
        sections: template?.[1]?.sections ?? [],
        fixed: template?.[1]?.fixed ?? undefined,
      },
    },
  })
  // logger.log('configData', formValue.values)
  const value: GlobalContextValue = {
    global,
    formValue,
    templateSetter: templateSetter,
    configData: configData ?? undefined,
  }

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}
