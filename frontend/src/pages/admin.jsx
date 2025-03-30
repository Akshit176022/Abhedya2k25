import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const AdminPanel = ({ superuser_token }) => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState(null);
  
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    email: '',
    phone: '',
    rollNo: '',
    currentQuestion: 1, 
    issuperuser: false
  });

  const [newQuestion, setNewQuestion] = useState({
    id: '',
    question: '',
    answer: '',
    mediaItems: [{ url: '', type: 'image' }]
  });

  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('superuser_token')}`
    }
  });

  const fetchData = async () => {
    try {
      if (activeTab === 'users') {
        const response = await api.get('/sget');
        setUsers(response.data);
      } else if (activeTab === 'questions') {
        const response = await api.get('/sgetques');
        setQuestions(response.data);
      } else if (activeTab === 'leaderboard') {
        const response = await api.get('/board');
        setLeaderboard(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response?.status === 401) {
        alert('Session expired. Please login again.');
        window.location.reload();
      }
    }
  };

  const handleSearch = async () => {
    try {
      const response = await api.get(`/sget?username=${searchTerm}`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
      alert('Failed to search users');
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const userToAdd = {
        username: newUser.username,
        password: newUser.password,
        email: newUser.email,
        phone: newUser.phone,
        rollNo: newUser.rollNo,
        issuperuser: newUser.issuperuser,
        currentQuestion: newUser.currentQuestion,
        currentTimestamp: Date.now(),
        points: 0,
        totalTime: 0
      };

      await api.post('/sadd', userToAdd);
      setNewUser({
        username: '',
        password: '',
        email: '',
        phone: '',
        rollNo: '',
        currentQuestion: 1,
        issuperuser: false
      });
      fetchData();
      alert('User added successfully');
    } catch (error) {
      console.error('Error adding user:', error);
      alert(error.response?.data?.message || 'Failed to add user');
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      if (editingUser.currentQuestion && 
          (isNaN(editingUser.currentQuestion) || 
           editingUser.currentQuestion < 0 || 
           editingUser.currentQuestion > 16)) {
        throw new Error('Level must be between 0 and 16');
      }

      const updatePayload = {
        username: editingUser.username,
        updateddata: {
          ...(editingUser.password && { password: editingUser.password }),
          ...(editingUser.currentQuestion && { 
            currentQuestion: Number(editingUser.currentQuestion) 
          }),
          ...(editingUser.currentTimestamp && { 
            currentTimestamp: editingUser.currentTimestamp 
          }),
          ...(editingUser.email && { email: editingUser.email }),
          ...(editingUser.phone && { phone: editingUser.phone }),
          ...(editingUser.rollNo && { rollNo: editingUser.rollNo }),
          ...(editingUser.issuperuser !== undefined && { 
            issuperuser: editingUser.issuperuser 
          })
        }
      };

      await api.put('/supdate', updatePayload);
      setEditingUser(null);
      fetchData();
      alert('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      alert(error.message || error.response?.data?.message || 'Failed to update user');
    }
  };

  const handleDeleteUser = async (username) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete('/sdelete', { data: { username } });
        fetchData();
        alert('User deleted successfully');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user');
      }
    }
  };

  const handleMediaItemChange = (index, field, value) => {
    const updatedItems = [...newQuestion.mediaItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setNewQuestion({...newQuestion, mediaItems: updatedItems});
  };

  const handleEditMediaItemChange = (index, field, value) => {
    const updatedItems = [...editingQuestion.media];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setEditingQuestion({...editingQuestion, media: updatedItems});
  };

  const addMediaItemField = () => {
    setNewQuestion({
      ...newQuestion, 
      mediaItems: [...newQuestion.mediaItems, { url: '', type: 'image' }]
    });
  };

  const addEditMediaItemField = () => {
    setEditingQuestion({
      ...editingQuestion, 
      media: [...editingQuestion.media, { url: '', type: 'image' }]
    });
  };

  const removeMediaItemField = (index) => {
    const updatedItems = newQuestion.mediaItems.filter((_, i) => i !== index);
    setNewQuestion({...newQuestion, mediaItems: updatedItems});
  };

  const removeEditMediaItemField = (index) => {
    const updatedItems = editingQuestion.media.filter((_, i) => i !== index);
    setEditingQuestion({...editingQuestion, media: updatedItems});
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/saddques', {
        id: newQuestion.id,
        question: newQuestion.question,
        answer: newQuestion.answer,
        mediaItems: newQuestion.mediaItems.filter(item => item.url.trim() !== '')
      });

      setNewQuestion({
        id: '',
        question: '',
        answer: '',
        mediaItems: [{ url: '', type: 'image' }]
      });
      
      fetchData();
      alert('Question added successfully');
    } catch (error) {
      console.error('Error adding question:', error);
      alert(error.response?.data?.error || 'Failed to add question');
    }
  };

  const handleUpdateQuestion = async (e) => {
    e.preventDefault();
    try {
      const updatePayload = {
        id: Number(editingQuestion.id),
        ...(editingQuestion.question && { question: editingQuestion.question }),
        ...(editingQuestion.answer && { answer: editingQuestion.answer }),
        ...(editingQuestion.media?.length > 0 && { 
          mediaItems: editingQuestion.media.map(item => ({
            url: item.url,
            type: item.type
          }))
        })
      };

      await api.put('/squesupdate', updatePayload);
      setEditingQuestion(null);
      fetchData();
      alert('Question updated successfully');
    } catch (error) {
      console.error('Error updating question:', error);
      alert(error.response?.data?.error || 'Failed to update question');
    }
  };

  const handleDeleteQuestion = async (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await api.delete('/sdeleteques', { data: { id } });
        fetchData();
        alert('Question deleted successfully');
      } catch (error) {
        console.error('Error deleting question:', error);
        alert('Failed to delete question');
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
      </header>

      <nav className="bg-white shadow">
        <div className="container mx-auto flex">
          <button
            className={`px-4 py-3 font-medium ${activeTab === 'users' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button
            className={`px-4 py-3 font-medium ${activeTab === 'questions' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('questions')}
          >
            Questions
          </button>
          <button
            className={`px-4 py-3 font-medium ${activeTab === 'leaderboard' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('leaderboard')}
          >
            Leaderboard
          </button>
        </div>
      </nav>

      <main className="container mx-auto p-4">
        {activeTab === 'users' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">User Management</h2>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Search by username"
                  className="px-3 py-2 border rounded-l"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  onClick={handleSearch}
                  className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
                >
                  Search
                </button>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded shadow mb-6">
              <h3 className="font-bold mb-3">
                {editingUser ? 'Edit User' : 'Add New User'}
              </h3>
              <form onSubmit={editingUser ? handleUpdateUser : handleAddUser}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Username*</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded"
                      value={editingUser ? editingUser.username : newUser.username}
                      onChange={(e) => editingUser 
                          ? setEditingUser({...editingUser, username: e.target.value})
                          : setNewUser({...newUser, username: e.target.value})}
                      required
                      disabled={!!editingUser}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Password*</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border rounded"
                      value={editingUser ? editingUser.password : newUser.password}
                      onChange={(e) => editingUser 
                          ? setEditingUser({...editingUser, password: e.target.value})
                          : setNewUser({...newUser, password: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Email*</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border rounded"
                      value={editingUser ? editingUser.email : newUser.email}
                      onChange={(e) => editingUser 
                          ? setEditingUser({...editingUser, email: e.target.value})
                          : setNewUser({...newUser, email: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Phone</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded"
                      value={editingUser ? editingUser.phone : newUser.phone}
                      onChange={(e) => editingUser 
                          ? setEditingUser({...editingUser, phone: e.target.value})
                          : setNewUser({...newUser, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Roll No</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded"
                      value={editingUser ? editingUser.rollNo : newUser.rollNo}
                      onChange={(e) => editingUser 
                          ? setEditingUser({...editingUser, rollNo: e.target.value})
                          : setNewUser({...newUser, rollNo: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Level</label>
                    <input
                      type="number"
                      min="0"
                      max="16"
                      className="w-full px-3 py-2 border rounded"
                      value={editingUser ? editingUser.currentQuestion : newUser.currentQuestion}
                      onChange={(e) => editingUser 
                          ? setEditingUser({...editingUser, currentQuestion: e.target.value})
                          : setNewUser({...newUser, currentQuestion: e.target.value})}
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="issuperuser"
                      className="mr-2"
                      checked={editingUser ? editingUser.issuperuser : newUser.issuperuser}
                      onChange={(e) => editingUser 
                          ? setEditingUser({...editingUser, issuperuser: e.target.checked})
                          : setNewUser({...newUser, issuperuser: e.target.checked})}
                    />
                    <label htmlFor="issuperuser">Is Superuser</label>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    {editingUser ? 'Update User' : 'Add User'}
                  </button>
                  {editingUser && (
                    <button
                      type="button"
                      onClick={() => setEditingUser(null)}
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white rounded shadow overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Level</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rollno</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Superuser</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user._id}>
                      <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.currentQuestion}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.rollNo}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.issuperuser ? 'Yes' : 'No'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap space-x-2">
                        <button
                          onClick={() => setEditingUser(user)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.username)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'questions' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Question Management</h2>
            
            <div className="bg-white p-4 rounded shadow mb-6">
              <h3 className="font-bold mb-3">
                {editingQuestion ? 'Edit Question' : 'Add New Question'}
              </h3>
              <form onSubmit={editingQuestion ? handleUpdateQuestion : handleAddQuestion}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Question ID</label>
                    <input
                      type="number"
                      min="1"
                      max="15"
                      className="w-full px-3 py-2 border rounded"
                      value={editingQuestion ? editingQuestion.id : newQuestion.id}
                      onChange={(e) => editingQuestion 
                          ? setEditingQuestion({...editingQuestion, id: e.target.value})
                          : setNewQuestion({...newQuestion, id: e.target.value})}
                      required
                      disabled={!!editingQuestion}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Question Text</label>
                    <input
                      type="text"
                      className="w-[500px] px-3 py-2 border rounded"
                      value={editingQuestion ? editingQuestion.question : newQuestion.question}
                      onChange={(e) => editingQuestion 
                          ? setEditingQuestion({...editingQuestion, question: e.target.value})
                          : setNewQuestion({...newQuestion, question: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Answer</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded"
                      value={editingQuestion ? editingQuestion.answer : newQuestion.answer}
                      onChange={(e) => editingQuestion 
                          ? setEditingQuestion({...editingQuestion, answer: e.target.value})
                          : setNewQuestion({...newQuestion, answer: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Media Items</label>
                  {(editingQuestion ? editingQuestion.media : newQuestion.mediaItems).map((item, index) => (
                    <div key={index} className="flex items-center mb-2 gap-2">
                      <select
                        className="px-3 py-2 border rounded"
                        value={item.type}
                        onChange={(e) => editingQuestion
                          ? handleEditMediaItemChange(index, 'type', e.target.value)
                          : handleMediaItemChange(index, 'type', e.target.value)}
                      >
                        <option value="image">Image</option>
                        <option value="audio">Audio</option>
                        <option value="video">Video</option>
                        <option value="document">Document</option>
                      </select>
                      <input
                        type="text"
                        className="flex-grow px-3 py-2 border rounded"
                        value={item.url}
                        onChange={(e) => editingQuestion 
                            ? handleEditMediaItemChange(index, 'url', e.target.value)
                            : handleMediaItemChange(index, 'url', e.target.value)}
                        placeholder="Paste media URL"
                      />
                      {(editingQuestion ? editingQuestion.media.length : newQuestion.mediaItems.length) > 1 && (
                        <button
                          type="button"
                          onClick={() => editingQuestion
                            ? removeEditMediaItemField(index)
                            : removeMediaItemField(index)}
                          className="ml-2 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => editingQuestion
                      ? addEditMediaItemField()
                      : addMediaItemField()}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
                  >
                    Add Another Media Item
                  </button>
                </div>

                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    {editingQuestion ? 'Update Question' : 'Add Question'}
                  </button>
                  {editingQuestion && (
                    <button
                      type="button"
                      onClick={() => setEditingQuestion(null)}
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white rounded shadow overflow-x-scroll">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Question</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Media</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {questions.map((question) => (
                    <tr key={question._id}>
                      <td className="px-6 py-4 whitespace-nowrap">{question.id}</td>
                      <td className="px-6 py-4">{question.question}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {question.media && question.media.length > 0 ? (
                          question.media.map((media, i) => (
                            <div key={i} className="mb-1">
                              <span className="text-gray-600 mr-2">{media.type}:</span>
                              <a 
                                href={media.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                              >
                                {media.url.substring(0, 20)}...
                              </a>
                            </div>
                          ))
                        ) : 'None'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap space-x-2">
                        <button
                          onClick={() => setEditingQuestion(question)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteQuestion(question.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
            <div className="bg-white rounded shadow overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rank</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Question</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Points</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {leaderboard.map((user, index) => (
                    <tr key={user._id}>
                      <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.currentQuestion}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.points || 0}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.totalTime || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;