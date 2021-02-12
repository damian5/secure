import React, { createContext, useState, useEffect, FC } from 'react';
import { encrypt, decrypt } from 'helpers/encryption';
import { LOCAL_STORAGE_KEY } from 'constant/localStorage';

interface PinCodeContextProps {
  pinCode: string;
  enablePinCode: (pin: string) => void;
  disablePinCode: () => void;
}

export const PinCodeContext = createContext({} as PinCodeContextProps);

const PinCodeContextProvider: FC = ({ children }) => {
  const { localStorage } = window;
  const { pinCode: pinCodeKey } = LOCAL_STORAGE_KEY;

  const [pinCode, setPinCode] = useState<string>(() => {
    const actualPin = localStorage.getItem(pinCodeKey);
    if (actualPin) {
      return decrypt(localStorage.getItem(pinCodeKey));
    }
    return '';
  });

  useEffect(() => {
    pinCode && localStorage.setItem(pinCodeKey, encrypt(pinCode));
  }, [pinCode, localStorage, pinCodeKey]);

  const enablePinCode = (pin: string) => {
    setPinCode(pin);
  };

  const disablePinCode = () => {
    localStorage.setItem(pinCodeKey, undefined);
    setPinCode(undefined);
  };

  return (
    <PinCodeContext.Provider value={{ pinCode, enablePinCode, disablePinCode }}>
      {children}
    </PinCodeContext.Provider>
  );
};

export default PinCodeContextProvider;
