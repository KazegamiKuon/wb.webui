import React, { Dispatch } from "react";

type SetStateAction<S> = S | ((prev: S) => S);

type STATE<R> = [R, Dispatch<SetStateAction<Partial<R>>>];

const stateReducer = (state: any, action: any) => ({
  ...state,
  ...(typeof action === "function" ? action(state) : action),
});

const useStateReducer = <S,>(initial: S): STATE<S> => {
  const [state, setState] = React.useReducer(stateReducer, initial);

  return [state, setState];
};

export default useStateReducer;
