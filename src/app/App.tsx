import { Text } from '@chakra-ui/react';
import { useState } from 'react';
import { InputForm, MeowButton } from '../common/ui';
import { Modal } from '../common/ui/patterns/Modal/Modal';

function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Text>Hehsyruthsyutnrysoun</Text>
      <MeowButton
        label="Click me"
        onClick={() => setOpen(true)}
      />
      <InputForm
        label="Email"
        placeholder="me@example.com"
        value=""
        onChange={() => {}}
        isRequired
      />
      <Modal
        open={open}
        setOpen={setOpen}
        title="Modal">
        <Text>Modal</Text>
      </Modal>
    </>
  );
}

export default App;
