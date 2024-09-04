import React from 'react';
import '../styles/firstPageList.css';

const FirstPageList = ({ pets }) => {
    return (
        <div className="first-page-grid">
            {pets.map(pet => (
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
                        <h3 className="pet-name">{pet.petName}</h3>
                        <p><strong>Age:</strong> {pet.age}</p>
                        <p><strong>Breed:</strong> {pet.breed}</p>
                        <p><strong>Type:</strong> {pet.petType}</p>
                        <p><strong>Description:</strong> {pet.description}</p>
                        <p><strong>Sterilized:</strong> {pet.sterilized ? 'Yes' : 'No'}</p>
                        <p><strong>Date of Birth:</strong> {pet.dateBirth ? new Date(pet.dateBirth).toLocaleDateString() : '-'}</p>
                        <p><strong>Adopted:</strong> {pet.adopted ? 'Yes' : 'No'}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FirstPageList;
