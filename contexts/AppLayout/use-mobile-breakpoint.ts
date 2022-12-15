import { useAppLayoutContext } from "./AppLayoutContext";

/**
 * Returns the current global breakpoint for the layout to switch between
 * mobile and desktop views. This should be used throught the main app layout
 * and internal components when we want to switch from one to the other.
 * @returns
 */
export function useMobileBreakpoint() {
  const { breakpoint } = useAppLayoutContext()
  return breakpoint
}
