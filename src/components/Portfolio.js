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
    useColorModeValue,
} from '@chakra-ui/react';
import { FaReact, FaHtml5, FaCss3Alt, FaJsSquare } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logout, isAuthenticated } from '../auth/Auth';

const Portfolio = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const bgColor = useColorModeValue('gray.100', 'gray.700');
    const cardBgColor = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('gray.800', 'white');

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/');
        } else {
            axios.get('/db.json')
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
        return (
            <Flex height="100vh" alignItems="center" justifyContent="center">
                <Spinner size="xl" thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" />
            </Flex>
        );
    }

    if (!data) {
        return <Text>Error loading data</Text>;
    }

    return (
        <Box bg={bgColor} minHeight="100vh">
            <Flex as="nav" align="center" justify="space-between" wrap="wrap" w="100%" p={4} bg="blue.500" color="white" position="fixed" top={0} left={0} right={0} zIndex={1}>
                <Flex align="center">
                    <Heading as="h1" size="lg" letterSpacing={'tighter'}>
                        Portfolio
                    </Heading>
                </Flex>
                <Button onClick={handleLogout} colorScheme="whiteAlpha" variant="outline">
                    Logout
                </Button>
            </Flex>

            <Container maxW="container.xl" py={16} mt={16}>
                <VStack spacing={12}>
                    <Flex direction={{ base: 'column', md: 'row' }} align="center" w="100%" bg={cardBgColor} p={8} borderRadius="lg" boxShadow="xl">
                        <Image
                            borderRadius="full"
                            boxSize="200px"
                            src={pk1}
                            alt="Profile Image"
                            mb={{ base: 6, md: 0 }}
                            mr={{ md: 8 }}
                        />
                        <Box>
                            <Heading as="h1" size="2xl" mb={4} color={textColor}>
                                Hi, I'm {data.user.name}
                            </Heading>
                            <Text fontSize="xl" color={textColor}>
                                A passionate Front-End Developer specializing in building
                                responsive and interactive websites using modern technologies.
                            </Text>
                        </Box>
                    </Flex>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} w="100%">
                        <Box bg={cardBgColor} p={8} borderRadius="lg" boxShadow="xl">
                            <Heading as="h2" size="xl" mb={6} color={textColor}>
                                About Me
                            </Heading>
                            <Stack spacing={4}>
                                {[
                                    { label: 'Name', value: data.user.name },
                                    { label: 'Username', value: data.user.username },
                                    { label: 'Email', value: data.user.email },
                                    { label: 'Phone', value: data.user.phone },
                                    { label: 'Address', value: `${data.user.address.street}, ${data.user.address.city}, ${data.user.address.zipcode}` },
                                ].map((item, index) => (
                                    <HStack key={index}>
                                        <Text fontWeight="bold" color={textColor}>{item.label}:</Text>
                                        <Text color={textColor}>{item.value}</Text>
                                    </HStack>
                                ))}
                            </Stack>
                        </Box>

                        <Box bg={cardBgColor} p={8} borderRadius="lg" boxShadow="xl">
                            <Heading as="h2" size="xl" mb={6} color={textColor}>
                                Skills
                            </Heading>
                            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={10}>
                                {data.user.skills.map((skill, index) => (
                                    <VStack key={index}>
                                        <Icon
                                            as={
                                                skill === 'React' ? FaReact :
                                                    skill === 'HTML5' ? FaHtml5 :
                                                        skill === 'CSS3' ? FaCss3Alt :
                                                            FaJsSquare
                                            }
                                            w={12}
                                            h={12}
                                            color={
                                                skill === 'React' ? 'blue.500' :
                                                    skill === 'HTML5' ? 'orange.500' :
                                                        skill === 'CSS3' ? 'blue.600' :
                                                            'yellow.500'
                                            }
                                        />
                                        <Text color={textColor} fontWeight="medium">{skill}</Text>
                                    </VStack>
                                ))}
                            </SimpleGrid>
                        </Box>
                    </SimpleGrid>

                    <Box w="100%" bg={cardBgColor} p={8} borderRadius="lg" boxShadow="xl">
                        <Heading as="h2" size="xl" mb={6} color={textColor}>
                            Projects
                        </Heading>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                            {data.user.projects.map((project, index) => (
                                <Box key={index} p={5} shadow="md" borderWidth="1px" borderRadius="md">
                                    <Heading as="h3" size="lg" mb={2} color={textColor}>{project.title}</Heading>
                                    <Text color={textColor} mb={4}>{project.description}</Text>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </Box>
                </VStack>
            </Container>
        </Box>
    );
};

export default Portfolio;