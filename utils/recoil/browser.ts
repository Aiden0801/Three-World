import { selectorFamily, selector, atom } from 'recoil'
import { fetcher } from '../../lib/fetcher'
import { serverURL } from '../../config/urlcontrol'
export const getCurrentBrowsers = selector({
   key: 'currentUserBrowser',
   get: ({ get }) => get(fetchBrowserByEmail(get(currentUser))),
})
export const currentBrowserIndex = atom({
   key: 'currentBrowserIndex',
   default: 0,
})
export const currentUser = atom({
   key: 'currentUser',
   default: null,
})

export const currentBrowsers = atom({
   key: 'currentBrowsers',
   default: selector({
      key: 'currentBrowsers/Default',
      get: ({ get }) => get(fetchBrowserByEmail(get(currentUser))),
   }),
})
export const getFocusedBrowser = selector({
   key: 'focusedBrowser',
   get: ({ get }) => {
      return currentBrowsers[get(currentUser)]
   },
})
export const fetchBrowserByEmail = selectorFamily({
   key: 'fetchBrowserByEmail',
   get: (userEmail) => async () => {
      console.log('recoil', userEmail)
      try {
         const response = await fetcher(
            `${serverURL}/api/users/getBrowsersByEmail`,
            {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({
                  email: userEmail,
               }),
            }
         )
         let data = []
         if (response.browsers) {
            for (const browser of response.browsers) {
               let embed_URL = ''
               if (browser.id) {
                  const result = await fetcher('api/session/getSessionByID', {
                     method: 'POST',
                     headers: { 'Content-Type': 'application/json' },
                     body: JSON.stringify({
                        _id: browser.id,
                     }),
                  })
                  console.log(result)
                  data = [
                     ...data,
                     {
                        name: result['name'],
                        url: result['embed_url'],
                     },
                  ]
               } else
                  data = [
                     ...data,
                     {
                        name: 'No Session',
                        url: 'No Session',
                     },
                  ]
            }
         }
         console.log('recoil', data)
         return data
      } catch (err) {
         console.error(err.message)
      }
   },
})
