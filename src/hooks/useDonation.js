import { useState, useEffect } from 'react';
import axios from 'axios';

const useDonation = () => {
  const [donations, setDonations] = useState([]);
  const [newDonation, setNewDonation] = useState({ name: '', donation: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [currentDonationId, setCurrentDonationId] = useState(null);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user?.id; 
      let response;
      if (!userId) {
        console.error('User ID is not available');
        return;
      }
      if(user.role === "ADMIN") { 
    
        response = await axios.get(`http://localhost:8080/donations`, {
        headers: { Authorization: `Bearer ${token}` },
      })}
      else {
       response = await axios.get(`http://localhost:8080/donations/getAllByUser/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })};
  
      setDonations(response.data);
    } catch (error) {
      console.error('Error fetching donations', error);
    }
  };
  

  const addDonation = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user')); 
      const userId = user?.id;
      const donationWithUser = {
        ...newDonation,
        user: { id: userId }  
      };
  
      console.log('Donation Object:', donationWithUser);
  
      const response = await axios.post('http://localhost:8080/donations/create', donationWithUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setDonations([...donations, response.data]);
      resetForm();
    } catch (error) {
      console.error('Error adding donation', error);
    }
  };
  

  const updateDonation = async (id, updatedDonation) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8080/donations/update/${id}`, updatedDonation, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDonations(
        donations.map((donation) =>
          donation.id === id ? { ...donation, ...updatedDonation } : donation
        )
      );
      resetForm();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating donation', error);
    }
  };

  const deleteDonation = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/donations/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDonations(donations.filter((donation) => donation.id !== id));
    } catch (error) {
      console.error('Error deleting donation', error);
    }
  };

  const editDonation = (donation) => {
    setNewDonation(donation);
    setCurrentDonationId(donation.id);
    setIsEditing(true);
  };

  const resetForm = () => {
    setNewDonation({ name: '', donation: 0 });
    setIsEditing(false);
    setCurrentDonationId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDonation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    donations,
    newDonation,
    isEditing,
    currentDonationId,
    addDonation,
    updateDonation,
    deleteDonation,
    editDonation,
    resetForm,
    handleChange,
  };
};

export default useDonation;
