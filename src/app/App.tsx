import { Text } from '@chakra-ui/react';
import { InputForm, MeowButton } from '../common/ui';

function App() {
  return (
    <>
      <Text>Hehsyruthsyutnrysoun</Text>
      <MeowButton label="Click me" />
      <InputForm
        label="Email"
        placeholder="me@example.com"
        value=""
        onChange={() => {}}
        isRequired
      />
    </>
  );
}

export default App;
