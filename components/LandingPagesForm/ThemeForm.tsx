import { useThemeConfig } from "../../lib/landing-pages";
import { SchemaViewer } from "./SchemaViewer";

export function ThemeForm() {
  const config = useThemeConfig()
  console.info('theme configuration', JSON.stringify(config ?? {}, null, 2))
  return (
    <>
      <h1>Theme Config</h1>
      <SchemaViewer title="Theme" schema={config} />
    </>
  )
}
