import React from 'react';
import { useReducer, createContext, ReactElement } from 'react';

type AuthContextProviderProps = {
  children: ReactElement
}

enum AuthActionKind {
  CHANGE_USER = 'CHANGE_USER',
  CHANGE_EMAIL = 'CHANGE_EMAIL',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT'
}

interface IAuthAction {
  type: AuthActionKind;
  value: {
    username: string;
    email: string;
  };
}

interface IAuthState {
  status: boolean;
  username: string;
  email: string;
}

interface IAuthContext {
  auth: IAuthState;
  dispatchAuth: React.Dispatch<IAuthAction>;
}

export const AuthContext = createContext<IAuthContext>({ auth: { status: false, username: '', email: '' }, dispatchAuth: () => { } });

function AuthContextProvider({ children }: AuthContextProviderProps) {
  const authReducer = (state: IAuthState, action: IAuthAction) => {
    switch (action.type) {
      case 'CHANGE_USER':
        return { ...state, username: action.value.username };
      case 'CHANGE_EMAIL':
        return { ...state, email: action.value.email };
      case 'LOGIN':
        return {
          status: true,
          username: action.value.username,
          email: action.value.email,
        };
      case 'LOGOUT':
      default:
        return {
          status: false,
          username: '',
          email: '',
        };
    }
  };

  const initialAuth = JSON.parse(localStorage.getItem('AUTH_DATA') || '');

  const [auth, dispatchAuth] = useReducer(authReducer, initialAuth);

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        auth,
        dispatchAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
