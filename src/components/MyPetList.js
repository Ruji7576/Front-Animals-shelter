import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/myPetList.css'; 

const MyPetList = ({ userId, adoptPet }) => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        const getAllMyPets = async () => {
            if (!userId) {
                return;
            }

            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/pets/adopted/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPets(response.data);
            } catch (error) {
                console.error("Error fetching pets", error);
            }
        };

        getAllMyPets();
    }, [userId]);

    return (
        <div className="my-pet-list">
            <h1 className="my-pet-list-title">My Pet List</h1>
            <div className="pet-card-container">
                {pets.length > 0 ? (
                    pets.map(pet => (
                        <div key={pet.id} className="pet-card">
                            <div className="pet-photo-container">
                                {pet.url ? (
                                    <img
                                        src={pet.url}
                                        alt={pet.petName}
                                        className="pet-photo"
                                    />
                                ) : (
                                    <div className="no-image">No Image</div>
                                )}
                            </div>
                            <div className="pet-details">
                                <h2 className="pet-name">{pet.petName}</h2>
                                <p><strong>Age:</strong> {pet.age}</p>
                                <p><strong>Breed:</strong> {pet.breed}</p>
                                <p><strong>Type:</strong> {pet.petType}</p>
                                <p><strong>Description:</strong> {pet.description}</p>
                                <p><strong>Sterilized:</strong> {pet.sterilized ? 'Yes' : 'No'}</p>
                                <p><strong>Date of Birth:</strong> {pet.dateBirth ? new Date(pet.dateBirth).toLocaleDateString() : '-'}</p>
                                <p><strong>Adopted:</strong> {pet.adopted ? 'Yes' : 'No'}</p>
                                <button className="btn btn-return" onClick={() => adoptPet(pet.id)}>Return</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No pets available.</p>
                )}
            </div>
        </div>
    );
}

export default MyPetList;
