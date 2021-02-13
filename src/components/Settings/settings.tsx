import React, { useContext, FC } from 'react';
import { ThemeContext } from 'hooks/useTheme';
import { FingerPrintContext } from 'hooks/useFingerPrint';
import { PinCodeContext } from 'hooks/usePinCode';
import { useFirebaseAuth } from 'hooks/useFirebaseAuth';
import { Wrapper } from './styles';
import Modal from 'components/shared/Modal';
import TextField from 'components/shared/TextField';
import { Form } from 'react-final-form';
import { validation } from 'constant/en.json';

const Settings: FC = () => {
  const { themeMode, setNewTheme } = useContext(ThemeContext);
  const {
    useFingerPrint,
    setFingerPrint,
  } = useContext(FingerPrintContext);
  const { enablePinCode, pinCode, disablePinCode } = useContext(PinCodeContext);

  const [showPinScreen, setShowPinScreen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>('');

  const { signOut } = useFirebaseAuth();

  const handleSignOut = () => {
    signOut();
  };

  const closeModal = () => {
    setShowPinScreen(false);
  };

  const submit = (values: Record<string, any>) => {
    if (values.pin && values.pin.length === 4) {
      setError('');
      enablePinCode(values.pin);
      closeModal();
    } else {
      setError(validation.minPinLenght);
    }
  };

  const disablePinCodeHandler = (values: Record<string, any>) => {
    if(values.pin && values.pin === pinCode) {
      disablePinCode();
      closeModal();
    } else {
      setError(validation.invalidPinCode);
    }
  };

  return (
    <Wrapper>
      <h1>Settings</h1>
      <div>
        <p>theme: {themeMode}</p>
        <button onClick={() => setNewTheme()}>switch theme</button>
      </div>
      <div>
        <p>fingerPrint: {useFingerPrint}</p>
        <button disabled={!pinCode} onClick={() => setFingerPrint()}>
          switch Finger print
        </button>
        {!pinCode && (
          <p>You must enable a pin code in order to enable fingerprint</p>
        )}
      </div>
      <div>
        <p>{pinCode ? 'edit or disable Pin' : 'enable pin'}</p>
        <button onClick={() => setShowPinScreen(true)}>switch pin code</button>
      </div>
      <button onClick={() => handleSignOut()}>Sign out</button>
      {showPinScreen ? (
        <Modal
          onClose={closeModal}
        >
          <Form
            onSubmit={(values) => submit(values)}
            render={({ handleSubmit, submitting, values }) => (
              <form onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <TextField type="tel" name="pin" label="Pin" maxLength={4} />
                <button disabled={submitting} type="submit">
                  Submit
                </button>
                {error && <div>{error}</div>}
                {pinCode && (
                  <button type="button" disabled={!values.pin} onClick={() => disablePinCodeHandler(values)}>
                    disable pin
                  </button>
                )}
              </form>
            )}
          />
        </Modal>
      ) : null}
    </Wrapper>
  );
};

export default Settings;
