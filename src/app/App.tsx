import { ExpenseTrackerTablePage } from '@/modules';
import { Image, Stack } from '@chakra-ui/react';

function App() {
  return (
    <Stack
      w="100vw"
      h="100vh"
      gap={0}
      px={8}
      py={4}>
      <Image
        src="/purrse-logo.png"
        alt="logo"
        w="fit-content"
        objectFit="contain"
        h="64px"
      />
      <Stack
        w="100%"
        h="100%"
        p={4}>
        <ExpenseTrackerTablePage />
      </Stack>
    </Stack>
  );
}

export default App;
