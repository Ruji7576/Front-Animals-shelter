import React from 'react';

const DonationForm = ({
  handleChange,
  addDonation,
  newDonation,
  isEditing,
  updateDonation,
  resetForm,
  currentDonationId,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateDonation(currentDonationId, newDonation);
    } else {
      addDonation(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="donation-form">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={newDonation.name}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="donation"
        placeholder="Donation Amount"
        value={newDonation.donation}
        onChange={handleChange}
        required
      />
      <button type="submit" className="btn">
        {isEditing ? 'Update Donation' : 'Add Donation'}
      </button>
      {isEditing && (
        <button type="button" className="btn btn-cancel" onClick={resetForm}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default DonationForm;
