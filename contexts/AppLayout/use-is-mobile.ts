import { useAppLayoutContext } from "./AppLayoutContext"

/**
 * true if current window width is less than the mobile breakpoint
 * set in the AppLayoutContext.
 */
export function useIsMobile() {
  const { isMobile } = useAppLayoutContext()
  return isMobile
}
