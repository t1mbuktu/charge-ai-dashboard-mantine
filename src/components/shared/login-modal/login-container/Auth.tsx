import { useState } from 'react';
import { TextInput, PasswordInput, Paper, Group, Button, Title, Text, Container, Center, Stack } from '@mantine/core';
import { useAppDispatch } from '../../../../hooks/storeHooks';
import { signInUser, signInUserGoogle, signUpUser } from '../../../../redux/common/CommonSlice';


function Auth() {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error] = useState<string | null>(null);
  
    const handleSignUp = async () => {
      dispatch(signUpUser({email: email, password: password}))
    };
  
    const handleSignIn = async () => {
      dispatch(signInUser({email: email, password: password}));
    };
  
    const handleGoogleSignIn = () => {
      dispatch(signInUserGoogle())
    };
  
    return (
      <Container size={420} my={40}>
        <Center>
          <Stack>
            <Title >Welcome to ChargeAI</Title>
            <Title c="dimmed" size="sm" mt={5}>
              Please sign in to continue
            </Title>
          </Stack>
        </Center>
        
  
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          {error && <Text c="red">{error}</Text>}
          <TextInput
            label="Email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            mt="md"
          />
          <Group justify='end' mt="lg">
            <Button variant='outline' onClick={handleSignUp}>Sign Up</Button>
            <Button onClick={handleSignIn}>Sign In</Button>
          </Group>
          <Center mt="lg">
            <Button variant="outline" onClick={handleGoogleSignIn}>
              Sign In with Google
            </Button>
          </Center>
        </Paper>
      </Container>
    );
}

export default Auth