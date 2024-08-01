import React, { useState, useEffect } from 'react';
import { votingBackend } from './agent';

function App() {
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState({ title: '', description: '' });

  useEffect(() => {
    const fetchTopics = async () => {
      const fetchedTopics = await votingBackend.getTopics();
      setTopics(fetchedTopics);
    };
    fetchTopics();
  }, []);

  const createTopic = async () => {
    await votingBackend.createTopic(newTopic.title, newTopic.description);
    const fetchedTopics = await votingBackend.getTopics();
    setTopics(fetchedTopics);
  };

  const voteForTopic = async (title) => {
    await votingBackend.voteForTopic(title);
    const fetchedTopics = await votingBackend.getTopics();
    setTopics(fetchedTopics);
  };

  return (
    <div>
      <h1>Voting System</h1>
      <input
        type="text"
        placeholder="Title"
        value={newTopic.title}
        onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newTopic.description}
        onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })}
      />
      <button onClick={createTopic}>Create Topic</button>

      <ul>
        {topics.map((topic, index) => (
          <li key={index}>
            <h2>{topic[0]}</h2>
            <p>{topic[1]}</p>
            <p>Votes: {topic[2].toString()}</p>
            <button onClick={() => voteForTopic(topic[0])}>Vote</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

