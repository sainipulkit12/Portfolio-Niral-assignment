import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Image, Button, Input, HStack, FormControl, FormLabel, Flex, Stack, Heading, Text, 
  Checkbox, Link,  FormErrorMessage
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { login } from '../auth/Auth';

const Login = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const navigate = useNavigate();
    const[Error, setError]=useState('');

    const onSubmit = async (data) => {
        try {
            if (await login(data.username, data.password)) {
                navigate('/portfolio');
            } else {
                setError('Username and password are required');
            return;
            }
        } catch (error) {
            setError('An unexpected error occurred');
        }
    };

    return (
        <HStack w="full" h="100vh">
            <Flex w="full" h="full" borderWidth={1} display={{ base: 'none', md: 'flex' }}>
                <Image
                    objectFit="cover"
                    w="full"
                    h="full"
                    src="https://images.unsplash.com/photo-1517191434949-5e90cd67d2b6?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Login background"
                />
            </Flex>
            <Flex w="full" h="full" alignItems="center" justifyContent="center">
                <Stack as="form" onSubmit={handleSubmit(onSubmit)} w="full" maxW="md" spacing={4} p={6}>
                    <Heading fontSize="2xl" color="purple.500">
                        Log in to your account
                    </Heading>
                    {Error && <Text color="red.500">{Error}</Text>}
                    <FormControl isInvalid={errors.username}>
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <Input 
                            id="username"
                            {...register("username", { 
                                required: "Username is required" 
                            })} 
                        />
                        <FormErrorMessage>
                            {errors.username && errors.username.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.password}>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input 
                            id="password"
                            type="password"
                            {...register("password", { 
                                required: "Password is required" 
                            })} 
                        />
                        <FormErrorMessage>
                            {errors.password && errors.password.message}
                        </FormErrorMessage>
                    </FormControl>
                    <Stack direction="row" align="start" justify="space-between">
                        <Checkbox {...register("rememberMe")}>
                            Remember me
                        </Checkbox>
                        <Link color="purple.500">Forgot password?</Link>
                    </Stack>
                    <Button type="submit" isLoading={isSubmitting} loadingText="Logging in" colorScheme="purple">
                        Login
                    </Button>
                </Stack>
            </Flex>
        </HStack>
    );
};

export default Login;