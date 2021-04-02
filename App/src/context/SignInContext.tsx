import React, { useState } from "react";
import { UserInfo, SignInStatus } from "../types/types";

type SignInProviderProps = { children: React.ReactNode };

interface isSignedInContext {
  isSignedIn: SignInStatus;
  toggleSignIn: (signIn: SignInStatus) => void;
  userInfo: UserInfo | undefined;
  setUserInfo: (usrInfo: UserInfo | undefined) => void;
}

const SignInContext = React.createContext<isSignedInContext | undefined>(
  undefined
);

function SignInProvider({ children }: SignInProviderProps) {
  const [isSignedInState, setIsSignedInState] = useState<SignInStatus>({
    signInStatus: false,
  });
  const [userInfoState, setUserInfoState] = useState<UserInfo | undefined>(
    undefined
  );
  const value: isSignedInContext = {
    isSignedIn: isSignedInState,
    toggleSignIn: setIsSignedInState,
    userInfo: userInfoState,
    setUserInfo: setUserInfoState,
  };
  return (
    <SignInContext.Provider value={value}>{children}</SignInContext.Provider>
  );
}

function useSignInStatus() {
  const context = React.useContext(SignInContext);
  if (context === undefined) {
    throw new Error("useSignInStatus must be used within a SignInProvider");
  }
  return context;
}

export { SignInProvider, useSignInStatus };
