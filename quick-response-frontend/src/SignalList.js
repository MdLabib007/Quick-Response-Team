import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const SignalList = () => {
  const [signals, setSignals] = useState([]);

  useEffect(() => {
    fetchSignals();
  }, []);

  const fetchSignals = async () => {
    try {
      const response = await axios.get('http://localhost:1355/api/signals');
      setSignals(response.data);
    } catch (error) {
      console.error('Error fetching signals:', error);
    }
  };

  const handleSignalAction = async (id, action) => {
    try {
      const url = `http://localhost:1355/api/signals/${id}/${action}`;
      const body = action === 'accept' ? { volunteerName: 'Jane Smith' } : {};
      await axios.post(url, body);

      alert(`Signal ${action}ed successfully!`);
      setSignals(signals.filter(signal => signal._id !== id));
    } catch (error) {
      console.error(`Error ${action}ing signal:`, error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Pending Signals</h1>
      {signals.length === 0 ? (
        <p className="text-center text-muted">No pending signals available.</p>
      ) : (
        signals.map(signal => (
          <div className="card mb-3" key={signal._id}>
            <div className="card-body">
              <h5 className="card-title">User: {signal.userName}</h5>
              <p className="card-text">Message: {signal.message}</p>
              <p className="card-text">Location: {signal.location.lat}, {signal.location.lon}</p>
              <button className="btn btn-success me-2" onClick={() => handleSignalAction(signal._id, 'accept')}>Accept</button>
              <button className="btn btn-danger" onClick={() => handleSignalAction(signal._id, 'reject')}>Reject</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SignalList;