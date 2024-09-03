import React, { useEffect, useState } from 'react';

const DonationList = ({ donations, editDonation, deleteDonation }) => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')); 
    if (user && user.role) {
      setUserRole(user.role);
    } else {
      console.error('User role is not available or user is not found in localStorage');
    }
  }, []);

  console.log('User Role:', userRole);
  console.log('Donations:', donations);

  return (
    <div className="donation-list">
  {userRole === 'ADMIN' ? (
      <h1 className="donation-list-title">Donation</h1>
    ) : (
      <h1 className="donation-list-title">My Donation</h1>
    )}
      <table className="donation-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            {userRole === 'ADMIN' && ( 
              <th>Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {donations.length > 0 ? (
            donations.map((donation) => (
              <tr key={donation.id}>
                <td>{donation.name}</td>
                <td>{donation.donation}</td>
                {userRole === 'ADMIN' && ( 
                  <td>
                    <button
                      className="btn btn-edit"
                      onClick={() => editDonation(donation)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => deleteDonation(donation.id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={userRole === 'ADMIN' ? 3 : 2}>No donations available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DonationList;
