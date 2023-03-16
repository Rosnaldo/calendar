import { ReactNode, createContext, useReducer, useContext, useCallback } from 'react';
import { IMyEvent } from '../types';

type MyEventState = {
  selectedMyEvent: IMyEvent
}

type MyEventContextProps = {
  selectMyEvent: (data: IMyEvent) => void
} & MyEventState

type Props = {
  children: ReactNode
}

const initMyEventState: MyEventState = {
  selectedMyEvent: {
    id: '',
    title: '',
    start: new Date(),
    end: new Date(),
    resourceId: 1,
  }
}

const defaultParam = {
  ...initMyEventState,
  selectMyEvent: () => {},
}

export const MyEventContext = createContext<MyEventContextProps>(defaultParam);

export const MyEventAction = {
  SELECT_EVENT: 'SELECT_EVENT',
} as const;

export const reducer = (state: MyEventState, action: any) => {
  switch (action.type) {
    case MyEventAction.SELECT_EVENT: {
      const { data } = action.payload

      return {
        ...state,
        selectedMyEvent: data,
      }
    }
    default:
      throw new Error('Ação do reducer não encontrada');
  }
}

export const MyEventContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initMyEventState);
  const {
    selectedMyEvent,
  } = state;

  const selectMyEvent = useCallback((data: IMyEvent) => {
    dispatch({
      type: MyEventAction.SELECT_EVENT,
      payload: { data }
    })
  }, [])

  return (
    <MyEventContext.Provider
      value={{
        selectedMyEvent,
        selectMyEvent,
      }}
    >
      {children}
    </MyEventContext.Provider>
  )
}

export const useMyEventContext = () => useContext(MyEventContext)
