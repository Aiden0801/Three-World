import { atom } from 'recoil'
export const currentUser = atom({
   key: 'currentUser',
   default: null,
})
