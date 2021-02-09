import { env } from "process";

declare global {
  interface Window {
      dataLayer: [{
        event: EventType,
      }];
  }
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
  user: IUserData;
  submitting?: boolean,
  submitted?: boolean,
  error: string | null,
};

export type SharedActions = 
  | { type: 'SUBMIT' }
  | { type: 'SUBMITTED' }
  | { type: 'CANCEL' }
  | { type: 'FAILURE', error: any }

interface IUserData {
  email?: string;
  fullName?: string;
  birthday?: string;
}

export interface IAnimal {
  name: string;
  label: string;
  picture: string;
  description: string;
  group: 'A' | 'B' | 'C' | 'D' | 'E';
}