import { Dispatch, SetStateAction } from 'react'
import { useAppLayoutContext } from './AppLayoutContext'

/**
 * Use the main menu opened state from AppLayoutContext.
 * @returns [opened, setOpened]
 */
export function useNavbarState(): [boolean, Dispatch<SetStateAction<boolean>>] {
  const { opened, setOpened } = useAppLayoutContext()
  return [opened, setOpened]
}
