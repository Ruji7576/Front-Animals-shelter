import React from 'react';
import '../styles/petForm.css';

const PetForm = ({ handleChange, addPet, newPet, isEditing, updatePet, setIsEditing, cancelEdit }) => {
    if (!newPet) {
        return <div></div>;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            updatePet(newPet.id, newPet);
            setIsEditing(false);
        } else {
            addPet(e);
        }
    };

    return (
        <div>
            <h1 className="pet-list-title">Pet Form</h1>
            <form className="pet-form" onSubmit={handleSubmit}>
                <input 
                    name="petName" 
                    placeholder="Pet Name" 
                    onChange={handleChange} 
                    value={newPet.petName || ''} 
                />
                <input 
                    name="age" 
                    placeholder="Age" 
                    onChange={handleChange} 
                    value={newPet.age || ''} 
                />
                <input 
                    name="breed" 
                    placeholder="Breed" 
                    onChange={handleChange} 
                    value={newPet.breed || ''} 
                />
                <input 
                    name="petType" 
                    placeholder="Pet Type" 
                    onChange={handleChange} 
                    value={newPet.petType || ''} 
                />
                <textarea 
                    name="description" 
                    placeholder="Description" 
                    onChange={handleChange} 
                    value={newPet.description || ''} 
                />
                <div className="checkbox-container">
                    <input
                        type="checkbox"
                        id="sterilized"
                        name="sterilized"
                        onChange={handleChange}
                        checked={newPet.sterilized || false}
                    />
                    <label htmlFor="sterilized" className="checkbox-label">
                        Sterilized
                    </label>
                </div>
                <label>
                    <input
                        type="datetime-local"
                        name="dateBirth"
                        onChange={handleChange}
                        value={newPet.dateBirth ? newPet.dateBirth.slice(0, 16) : ''}
                    />
                    Date of Birth
                </label>
                <input 
                    name="url" 
                    placeholder="Image URL" 
                    onChange={handleChange} 
                    value={newPet.url || ''} 
                />
                <div className="form-buttons">
                    {isEditing ? (
                        <>
                            <button type="submit" className="btn btn-update">Save Changes</button>
                            <button type="button" className="btn btn-cancel" onClick={cancelEdit}>Cancel</button>
                        </>
                    ) : (
                        <button type="submit" className="btn btn-add">Add Pet</button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default PetForm;
