import { ISessionData } from './session.type'
export interface IPropsSessionData {
   sessionID: string
}
export interface IPropsProjectPgae {
   name: string
}
export interface IPropsCreateForm {
   schema: any
   initialData?: object
   handleOnSubmit: Function
}
