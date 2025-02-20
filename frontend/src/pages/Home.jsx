import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");
  const navigate = useNavigate();

  const createRoom = () => {
    const newRoomId = uuidv4();
    setRoomId(newRoomId); // Set the generated Room ID
  };

  const joinRoom = () => {
    if (joinRoomId) navigate(`/editor/${joinRoomId}`);
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    alert("Room ID copied! 📋");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-96 text-center">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Collaborative Code Editor</h1>

        {/* Generate Room Box */}
        <div className="mb-4">
          <button
            onClick={createRoom}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all"
          >
            Create Room
          </button>
          {roomId && (
            <div className="flex items-center mt-3 border border-gray-300 rounded-lg p-2 bg-gray-100">
              <input
                type="text"
                className="w-full bg-transparent text-gray-700 focus:outline-none"
                value={roomId}
                readOnly
              />
              <button
                onClick={copyRoomId}
                className="ml-2 px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg transition-all"
              >
                📋 Copy
              </button>
            </div>
          )}
        </div>

        {/* Join Room Box */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter Room ID to Join"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={joinRoomId}
            onChange={(e) => setJoinRoomId(e.target.value)}
          />
          <button
            onClick={joinRoom}
            className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all"
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

