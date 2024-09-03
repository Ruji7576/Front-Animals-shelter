// src/components/FirstPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FirstPageList from './FirstPageList';
import { useUser } from '../context/UserContext';

const FirstPage = () => {
    const [pets, setPets] = useState([]);
    const { userId } = useUser();

    useEffect(() => {
        const fetchPets = async () => {

            try {
                const response = await axios.get('http://localhost:8080/pets/withoutAdopted');
                setPets(response.data);
            } catch (error) {
                console.error("Error fetching pets", error);
            }
        };

        fetchPets();
    }, [userId]);

    return (
        <div className="first-page">
            <h1>Available Pets</h1>
            <FirstPageList pets={pets} />
        </div>
    );
};

export default FirstPage;
