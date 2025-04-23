import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetchPendingProfiles();
  }, []);

  const fetchPendingProfiles = async () => {
    try {
      const response = await axios.get('http://localhost:1355/api/admin/pending');
      setProfiles(response.data);
    } catch (error) {
      console.error('Error fetching pending profiles:', error);
    }
  };

  const handleProfileAction = async (id, action) => {
    try {
      const url = `http://localhost:1355/api/admin/${id}/${action}`;
      await axios.post(url);

      alert(`Profile ${action}ed successfully!`);
      setProfiles(profiles.filter(profile => profile._id !== id));
    } catch (error) {
      console.error(`Error ${action}ing profile:`, error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Pending Profiles</h1>
      {profiles.length === 0 ? (
        <p className="text-center text-muted">No pending profiles available.</p>
      ) : (
        profiles.map(profile => (
          <div className="card mb-3" key={profile._id}>
            <div className="card-body">
              <h5 className="card-title">Name: {profile.name}</h5>
              <p className="card-text">Role: {profile.role}</p>
              <p className="card-text">Status: {profile.status}</p>
              <button
                className="btn btn-success me-2"
                onClick={() => handleProfileAction(profile._id, 'approve')}
              >
                Approve
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleProfileAction(profile._id, 'reject')}
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminPanel;