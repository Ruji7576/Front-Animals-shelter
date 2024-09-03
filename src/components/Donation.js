// src/components/DonationManager.js
import React from 'react';
import useDonation from '../hooks/useDonation';
import DonationForm from './DonationForm';
import DonationList from './DonationList';
import '../styles/donation.css';

const Donation = () => {
  const {
    donations,
    newDonation,
    isEditing,
    addDonation,
    updateDonation,
    deleteDonation,
    editDonation,
    resetForm,
    handleChange,
    currentDonationId,
  } = useDonation();

  return (
    <div className="donation-manager">
      <h1>Donation Management</h1>
      <DonationForm
        handleChange={handleChange}
        addDonation={addDonation}
        newDonation={newDonation}
        isEditing={isEditing}
        updateDonation={updateDonation}
        resetForm={resetForm}
        currentDonationId={currentDonationId}
      />
      <DonationList donations={donations} editDonation={editDonation} deleteDonation={deleteDonation} />
    </div>
  );
};

export default Donation;
