import React, { useEffect, useState } from "react";
import PetForm from "./PetForm";
import PetList from "./PetList";
import axios from "axios";
import { useUser } from '../context/UserContext';
import MyPetList from "./MyPetList";

const Pet = () => {
    const [pets, setPets] = useState([]);
    const [adoptedPets, setAdoptedPets] = useState([]); 
    const [userRole, setUserRole] = useState(null);
    const [userIdes, setUserIdes] = useState(null);
    const { userId } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [newPet, setNewPet] = useState({
        petName: '',
        age: '',
        breed: '',
        petType: '',
        description: '',
        sterilized: false,
        adopted: false,
        url: '',
        dateBirth: '', 
        user: { id: 1 }
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')); 
        if (user && user.role) {
            setUserRole(user.role); 
        }
        if (user && user.id) {
            setUserIdes(user.id); 
        }
    }, []);

    useEffect(() => {
        if (userId) {
            setNewPet(prevPet => ({
                ...prevPet,
                user: { id: userId }
            }));
        }
    }, [userId]);

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setNewPet(prevPet => ({
            ...prevPet,
            [e.target.name]: value
        }));
    };

    const addPet = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8080/pets/create', newPet, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPets(prevPets => [...prevPets, response.data]);
            resetPetForm();
        } catch (error) {
            console.error("Error adding pet", error);
        }
    };
    

    const updatePet = async (id, updatedPet) => {
        const userId = 1;
    
        const petWithUserId = {
            ...updatedPet,
            user: { id: userId } 
        };
    
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:8080/pets/update/${id}`, petWithUserId, {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            setPets(prevPets =>
                prevPets.map(pet =>
                    pet.id === id ? response.data : pet
                )
            );
    
            resetPetForm();
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating pet", error);
        }
    };
    
    

    const adoptPet = async (petId) => {
        try {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user')); 
            const userId = user?.id; 

            await axios.post(`http://localhost:8080/pets/adopt/${petId}`, null, {
                headers: { Authorization: `Bearer ${token}` },
                params: { user_id: userId }
            });

            console.log('Pet adopted successfully');

            const url = userRole === "ADMIN"
                ? 'http://localhost:8080/pets'
                : 'http://localhost:8080/pets/withoutAdopted';

            const petsData = await fetchPets(url, token);
            setPets(petsData);

        } catch (error) {
            console.error('Error adopting pet:', error);
        }
    };

    const deletePet = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8080/pets/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPets(prevPets => prevPets.filter(pet => pet.id !== id));
        } catch (error) {
            console.error("Error deleting pet", error);
        }
    };

    useEffect(() => {
        const getAllPets = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("No token found");
                return;
            }

            const url = userRole === "ADMIN"
                ? 'http://localhost:8080/pets'
                : 'http://localhost:8080/pets/withoutAdopted';

            try {
                const petsData = await fetchPets(url, token);
                setPets(petsData);
            } catch (error) {
                console.error("Failed to fetch pets", error);
            }
        };

        if (userRole) {
            getAllPets();
        }
    }, [userRole]); 

    const fetchPets = async (url, token) => {
        try {
            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching pets", error);
            throw error; 
        }
    };

    const editPet = (pet) => {
        setNewPet(pet);
        setIsEditing(true);
    };

    const cancelEdit = () => {
        setIsEditing(false);
        resetPetForm();
    };

    const resetPetForm = () => {
        setNewPet({
            petName: '',
            age: '',
            breed: '',
            petType: '',
            description: '',
            sterilized: false,
            adopted: false,
            url: '',
            dateBirth: '', 
            user: { id: 1 }
        });
    };

    return (
        <div className="pet-container">
            {userRole === 'ADMIN' && (
                <PetForm
                    handleChange={handleChange}
                    addPet={addPet}
                    newPet={newPet}
                    isEditing={isEditing}
                    updatePet={updatePet}
                    setIsEditing={setIsEditing}
                    cancelEdit={cancelEdit}
                />
            )}
            <PetList
                pets={pets} 
                deletePet={deletePet}
                editPet={editPet}
                adoptPet={adoptPet}
            />
            {userRole !== 'ADMIN' && (
                <MyPetList
                    userId={userIdes}
                    adoptPet={adoptPet}
                />
            )}
        </div>
    );
};

export default Pet;