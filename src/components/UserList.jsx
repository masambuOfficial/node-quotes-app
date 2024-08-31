import { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users'); // Adjust the URL as needed
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">User List</h2>
      <ul className="bg-white shadow-md rounded-lg">
        {users.map(user => (
          <li key={user.id} className="p-4 border-b last:border-b-0">
            <div className="font-medium text-lg">{user.username}</div>
            <div className="text-sm text-gray-600">{user.email}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
