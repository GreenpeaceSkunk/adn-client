import {SharedState, SharedActions, GenericReducerFn, IUser} from 'greenpeace';

export type ContextStateType = SharedState;

export type ContextActionType = 
| { type: 'UPDATE_USER_DATA', payload: { [x: string]: string | number }}
| { type: 'RESET_USER_DATA' }
| { type: 'SET_ERROR', error: string | null }
| SharedActions;

export const initialState: ContextStateType = {
  user: {
    birthday: '',
    email: '',
    fullName: '',
  } as IUser,
  submitting: false,
  submitted: false,
  error: null,
}

export const reducer: GenericReducerFn<ContextStateType, ContextActionType> = (state: ContextStateType, action: ContextActionType) => {
  switch (action.type) {
    case 'UPDATE_USER_DATA':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        } as IUser,
      }
    case 'SUBMIT':
      return {
        ...state,
        submitting: true,
        submitted: false,
      };
    case 'SUBMITTED':
      return {
        ...state,
        submitting: false,
        submitted: true,
      };
    case 'RESET_USER_DATA': {
      return {
        ...state,
        user: {
          birthday: '',
          email: '',
          fullName: '',
        }
      }
    }
    case 'SET_ERROR':
      return {
        ...state,
        submitting: false,
        submitted: false,
        error: action.error,
      };
    default: {
      throw new Error('Context Error');
    }
  }
}