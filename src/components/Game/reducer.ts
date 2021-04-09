import {SharedState, SharedActions, GenericReducerFn, IAnimal} from 'greenpeace';

export type ContextStateType = { results: IAnimal[] } & SharedState;
export type ContextActionType = 
| { type: 'UPDATE_USER_GAME_DATA', payload: IAnimal[] }
| { type: 'RESET_USER_GAME_DATA' }
| SharedActions;

export const initialState: ContextStateType = {
  results: [],
  submitting: false,
  submitted: false,
  error: null,
}

export const reducer: GenericReducerFn<ContextStateType, ContextActionType> = (state: ContextStateType, action: ContextActionType) => {
  switch (action.type) {
    case 'UPDATE_USER_GAME_DATA':
      return {
        ...state,
        results: action.payload,
      }
    case 'RESET_USER_GAME_DATA':
      return {
        ...state,
      }
    default: {
      throw new Error('Context Error');
    }
  }
}