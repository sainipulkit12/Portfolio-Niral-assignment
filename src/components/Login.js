import React, { useState } from 'react';
import { Image, Button, Input, HStack, FormControl, FormLabel, Flex, Stack, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { login } from '../auth/Auth';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (login(username, password)) {
            navigate('/portfolio');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <HStack w="full" h="100vh">
            <Flex w="full" h="full" borderWidth={1}
                display={{ base: 'none', md: 'flex' }}
            >
                <Image
                    objectFit="cover"
                    w="full"
                    h="full"
                    src="https://images.unsplash.com/photo-1517191434949-5e90cd67d2b6?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </Flex>
            <Flex w="full" h="full" alignItems="center" justifyContent="center">
                <Stack w="full" maxW="md" spacing={4} p={6}>
                    <Heading fontSize="2xl" color="purple.500">
                        Log in to your account
                    </Heading>
                    <FormControl id="username">
                        <FormLabel>Username</FormLabel>
                        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </FormControl>
                    <Stack spacing={4}
                        direction="row" align="start" justify="space-between"></Stack>
                    <Button onClick={handleLogin} colorScheme="purple">Login</Button>
                </Stack>

            </Flex>



        </HStack>
    );
};

export default Login;
