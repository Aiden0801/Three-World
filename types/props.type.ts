import { ISessionData } from './session.type'
export interface IPropsSessionData {
  sessionID: string
}
export interface IPropsProjectPgae {
  name: string
  savedData: object
}
export interface IPropsCreateForm {
  url?: string
  savedData?: {
    name: string
    global: object
    template: object
  }
  handleOnSubmit?: Function
}
