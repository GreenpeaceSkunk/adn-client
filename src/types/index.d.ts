import { env } from "process";
declare global {
  interface Window {
      dataLayer: [{
        event: EventType,
      }];

      navigator;
  }
}

export interface IUser {
  fullName: string;
  email: string;
  birthday: string;
  userAgent?: string;
}

export type OnChangeEvent = MouseEvent<HTMLButtonElement> | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>;

export type EventType =
  | 'pageview'
export interface GenericReducerFn<S, A> { 
  (state: S, action: A): S;
}

export type StylesType = {
  [el: string]: React.CSSProperties,
};
  
export type AxiosResquestError = {
  error: boolean,
  status: number,
  message: string,
};

export type SharedState = {
  user: IUser;
  submitting?: boolean,
  submitted?: boolean,
  error: string | null,
};

export type SharedActions = 
  | { type: 'SUBMIT' }
  | { type: 'SUBMITTED' }
  | { type: 'CANCEL' }
  | { type: 'FAILURE', error: any }
export interface IAnimal {
  name: string;
  label: string;
  picture: string;
  description: string;
  group: 'A' | 'B' | 'C' | 'D' | 'E';
}