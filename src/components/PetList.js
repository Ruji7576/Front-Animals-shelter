// src/components/PetList.js
import React, { useEffect, useState } from 'react';
import '../styles/petList.css'; // Import the updated CSS file

const PetList = ({ pets, deletePet, editPet, adoptPet }) => {
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.role) {
            setUserRole(user.role);
        } else {
            console.error('User role is not available or user is not found in localStorage');
        }
    }, []);

    return (
        <div className="pet-list">
            <h1 className="pet-list-title">Pet List</h1>
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
                                <div className="pet-actions">
                                    {userRole === 'ADMIN' ? (
                                        <>
                                            <button className="btn btn-edit" onClick={() => editPet(pet)}>Edit</button>
                                            <button className="btn btn-delete" onClick={() => deletePet(pet.id)}>Delete</button>
                                        </>
                                    ) : (
                                        <button className="btn btn-adopt" onClick={() => adoptPet(pet.id)}>Adopt</button>
                                    )}
                                </div>
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

export default PetList;