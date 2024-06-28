import React, { useEffect, useState } from 'react';
import pk1 from './Assets/pk1.jpg.jfif'
import {
    Box,
    Button,
    VStack,
    Heading,
    Text,
    Spinner,
    Image,
    Stack,
    HStack,
    SimpleGrid,
    Icon,
    Flex,
    Container,
} from '@chakra-ui/react';
import { FaReact, FaHtml5, FaCss3Alt, FaJsSquare } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logout, isAuthenticated } from '../auth/Auth';

const Portfolio = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/');
        } else {
            axios
                .get('http://localhost:3001/user')
                .then((response) => {
                    console.log('Data fetched successfully:', response.data);
                    setData(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    setLoading(false);
                });
        }
    }, [navigate]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (loading) {
        return <Spinner size="xl" />;
    }

    if (!data) {
        return <Text>Error loading data</Text>;
    }

    return (
        <Box
            bgGradient="linear(to-r, teal.500, blue.500)"
            // color="white"
            p={8} minHeight="100vh">
            <Flex as="nav" align="center" justify="space-between" wrap="wrap" w="100%" p={4} bg="black"
                position="fixed"
                top={0}
                left={0}
                right={0}
                zIndex={1}
                color="white">
                <Flex align="center">
                    <Heading as="h1" size="lg" letterSpacing={'tighter'}>
                        Portfolio
                    </Heading>
                </Flex>
                <Button onClick={handleLogout} colorScheme="purple">
                    Logout
                </Button>
            </Flex>
            <Container maxW="container.lg" py={8} mt={16}>
                <VStack spacing={8} mt={8}>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={20} w="100%">
                        <Flex
                            direction={{ base: 'column', md: 'row' }}
                            align="center"
                            w="100%"
                            maxW="800px"
                            bg="grey"
                            p={6}
                            borderRadius="md"
                            boxShadow="md"
                        >
                            <Image
                                borderRadius="full"
                                boxSize="150px"
                                src={pk1}
                                alt="Profile Image"
                                mb={{ base: 4, md: 0 }}
                                mr={{ md: 6 }}
                            />
                            <Box textAlign={{ base: 'center', md: 'left' }}>
                                <Heading as="h1" size="xl">
                                    Hi, I'm {data.name}
                                </Heading>
                                <Text mt={2} fontSize="lg">
                                    A passionate Front-End Developer specializing in building
                                    responsive and interactive websites using modern technologies.
                                </Text>
                            </Box>

                        </Flex>

                        <Box w="100%" maxW="800px" bg="grey" p={6} borderRadius="md" boxShadow="md">
                            <Heading as="h2" size="lg" mb={4}>
                                About Me
                            </Heading>
                            <Stack spacing={4}>
                                <HStack>
                                    <Text fontWeight="bold">Name:</Text>
                                    <Text>{data.name}</Text>
                                </HStack>
                                <HStack>
                                    <Text fontWeight="bold">Username:</Text>
                                    <Text>{data.username}</Text>
                                </HStack>
                                <HStack>
                                    <Text fontWeight="bold">Email:</Text>
                                    <Text>{data.email}</Text>
                                </HStack>
                                <HStack>
                                    <Text fontWeight="bold">Phone:</Text>
                                    <Text>{data.phone}</Text>
                                </HStack>
                                <HStack>
                                    <Text fontWeight="bold">Address:</Text>
                                    <Text>{`${data.address.street}, ${data.address.city}, ${data.address.zipcode}`}</Text>
                                </HStack>
                            </Stack>
                        </Box>
                        <Box w="100%" maxW="800px" bg="grey" p={6} borderRadius="md" boxShadow="md">
                            <Heading as="h2" size="lg" mb={4}>
                                Skills
                            </Heading>
                            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={10}>
                                {data.skills.map((skill, index) => (
                                    <Box key={index} textAlign="center">
                                        {skill === 'React' && <Icon as={FaReact} w={10} h={10} color="blue.500" />}
                                        {skill === 'HTML5' && <Icon as={FaHtml5} w={10} h={10} color="orange.500" />}
                                        {skill === 'CSS3' && <Icon as={FaCss3Alt} w={10} h={10} color="blue.600" />}
                                        {skill === 'JavaScript' && <Icon as={FaJsSquare} w={10} h={10} color="yellow.500" />}
                                        <Text mt={2}>{skill}</Text>
                                    </Box>
                                ))}
                            </SimpleGrid>
                        </Box>
                        <Box w="100%" maxW="800px" bg="grey" p={6} borderRadius="md" boxShadow="md">
                            <Heading as="h2" size="lg" mb={4}>
                                Projects
                            </Heading>
                            <Stack spacing={4}>
                                {data.projects.map((project, index) => (
                                    <Box key={index}>
                                        <Heading as="h3" size="md">{project.title}</Heading>
                                        <Text>{project.description}</Text>
                                    </Box>
                                ))}
                            </Stack>
                        </Box>
                    </SimpleGrid>
                </VStack>
            </Container>
        </Box>
    );
};

export default Portfolio;
