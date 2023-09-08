import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const AgentDetail = ({ isLoggedIn, setIsLoggedIn }) => {
  const [agentData, setAgentData] = useState([]);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/agent');
      setAgentData(response.data);
    } catch (error) {
      console.error('Failed to fetch agents:', error);
    }
  };

  const handleAgentClick = (agent) => {
    // Handle button click for a specific agent
    // You can perform any action here based on the selected agent
    console.log('Selected agent:', agent);
  };

  return (
    <div className="container">
      <div className='class'>
      <h1 className='header'>choose the agent you need </h1>
      <ul>
        {agentData.map((agent) => (
          <li key={agent.id}>
            <button type="button" onClick={() => handleAgentClick(agent)}>
              {agent.agentName}
            </button>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default AgentDetail;