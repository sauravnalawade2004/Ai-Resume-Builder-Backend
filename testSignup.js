import axios from 'axios';

const testSignup = async () => {
    try {
        const response = await axios.post('http://localhost:3000/app/users/signup', {
            username: 'exampleUser',
            email: 'example@example.com',
            password: 'password123'
        });
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
};

testSignup();