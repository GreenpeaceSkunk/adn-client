import { env } from "process";

declare global {
  interface Window {
      dataLayer: [{
        event: EventType,
      }];
  }
}

// export type SearchParamsType = {
//   ref?: string;
//   utm_medium?: string;
//   utm_campaign?: string;
// }

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
  data: IUserData;
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
  cod_area?: string;
  dni?: string;
  creditCardNumber?: string;
  campania?: string;
  email?: string;
  nombre?: string;
  apellido?: string;
  otherAmount?: string;
  telefono?: string;
  monto?: string;
}
