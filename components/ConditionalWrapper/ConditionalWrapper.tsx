import { PropsWithChildren } from "react"

export type ConditionalWrapperProps = PropsWithChildren<{
  /**
   * Condition to check
   */
  condition: boolean
  /**
   * Wrapper component
   */
  wrapper: (children: React.ReactNode) => React.ReactNode
}>

/**
 * Allows you to conditionally wrap a component with another component
 * if the given condition is true
 * @param condition - condition to check
 * @param wrapper - wrapper component
 * @example
 * ```tsx
 * // will render <div><p>hello</p></div>
 * <ConditionalWrapper
 *   condition={true}
 *   wrapper={(children) => <div>{children}</div>}
 * >
 *   <p>hello</p>
 * </ConditionalWrapper>
 * ```
 */
export function ConditionalWrapper({
  condition,
  wrapper,
  children,
}: ConditionalWrapperProps) {
  return condition ? <>{wrapper(children)}</> : <>{children}</>
}
