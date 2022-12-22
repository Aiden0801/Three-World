import { useAppLayoutContext } from "./AppLayoutContext";

/**
 * Returns the configured height for the header base height.
 */
export function useHeaderHeight() {
  const { headerHeight } = useAppLayoutContext();
  return headerHeight;
}
