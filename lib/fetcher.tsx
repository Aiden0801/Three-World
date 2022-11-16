/***
 * ! You must change the args to : ...args: Parameters<typeof fetch>
 */
 export const fetcher = async (...args: Parameters<typeof fetch>) => {
    return fetch(...args).then(async (res) => {
       console.log('fetcher.tsx', res)
       let payload
       try {
          if (res.status === 204) return null // 204 does not have body
          payload = await res.json()
       } catch (e) {
          /* noop */
       }
       if (res.ok) {
          return payload
       } else {
          return Promise.reject(
             payload.error || new Error('Something went wrong')
          )
       }
    })
 }