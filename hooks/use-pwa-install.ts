import { useRef, useState, useEffect, useCallback } from "react"
import { useWindowEvent, useMediaQuery } from "@mantine/hooks"

/**
 * Hook to defer the PWA install prompt until the user interacts with something.
 * Provides a callback to trigger the prompt, a boolean to indicate if it can be installed
 * and a boolean to indicate if the app is already running as a PWA.
 * @returns [callback, canInstall, isInstalled]
 */
export function usePwaInstall(): [prompt: () => Promise<void>, installed: boolean, available: boolean] {
  const installer = useRef<PWAInstallEvent>(null!)
  const [available, setAvailable] = useState(false)

  useWindowEvent('beforeinstallprompt', (event: PWAInstallEvent) => {
    // FIXME: this doesn't fire always for some reason, so everything breaks.
    // Tested on Brave only for now, but it should work regardless if the browser supports PWAs
    // TODO: Alternative event to listen to?
    console.info('beforeinstallprompt event fired', event)
    event.preventDefault()
    installer.current = event
  })

  useEffect(() => {
    console.info(installer.current)
    console.info('🏂 updating pwa install prompt availability', installer.current != null)
    setAvailable(installer.current != null)
  }, [installer.current])


  const callback = useCallback(async () => {
    // prompt not available. either browser doesn't support PWAs or the
    // user has already installed the app
    if (!installer.current != null) return

    installer.current.prompt()
    const { outcome } = await installer.current.userChoice
    if (outcome === 'accepted') {
      // user accepted the prompt and installed the app
      installer.current = null
    }
  }, [installer, available])

  const installed = usePwaStandaloneCheck()
  return [callback, installed, available]
}

/**
 * Checks if the app is installed as a PWA
 * @returns true if the app is installed as a PWA, false otherwise
 */
export function usePwaStandaloneCheck() {
  const [installed, setInstalled] = useState(false)
  const matches = useMediaQuery('(display-mode: standalone)')

  useEffect(() => {
    setInstalled(matches)
  }, [matches])
  return installed
}

/**
 * Since the PWA install prompt is only available in the beforeinstallprompt event,
 * which is not a standard available event on every browser, we need to define it
 * ourselves.
 */
export interface PWAInstallEvent extends CustomEvent {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}
