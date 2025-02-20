import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import CodeEditor from "../components/CodeEditor";

const socket = io("https://colab-433t.onrender.com");

const EditorPage = () => {
  const { roomId } = useParams();
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("vs-dark");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const fetchPreviousCode = async () => {
      try {
        const res = await axios.get(`https://colab-433t.onrender.com/api/code/${roomId}`, { withCredentials: true });
        if (res.data) {
          setCode(res.data.code);
          setLanguage(res.data.language || "javascript");
        }
      } catch (error) {
        console.error("Error fetching previous code:", error);
      }
    };

    fetchPreviousCode();
    socket.emit("joinRoom", roomId);

    socket.on("codeUpdate", (newCode) => {
      setCode((prev) => (prev !== newCode ? newCode : prev));
    });

    socket.on("languageUpdate", (newLanguage) => {
      setLanguage(newLanguage);
    });

    socket.on("userJoined", (message) => {
      setNotification(message);
      setTimeout(() => setNotification(""), 5000);
    });

    return () => {
      socket.off("codeUpdate");
      socket.off("languageUpdate");
      socket.off("userJoined");
    };
  }, [roomId]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleSaveCode = () => {
    axios
      .post(
        "https://colab-433t.onrender.com/api/code/save",
        { roomId, code, language },
        { withCredentials: true }
      )
      .then(() => console.log("✅ Code saved successfully!"))
      .catch((err) => console.error("Error saving code:", err));

    socket.emit("codeChange", { roomId, code });
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-900 text-white font-sans">
      {/* Notification Bar */}
      {notification && (
        <div className="absolute top-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-md animate-fade-in">
          {notification}
        </div>
      )}

      {/* Language & Theme Selection */}
      <div className="flex gap-6 bg-gray-800 p-4 w-full justify-center shadow-lg">
        <label className="flex items-center gap-2">
          <span className="text-gray-300 font-medium">Language:</span>
          <select
            className="p-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500 transition"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="csharp">C#</option>
            <option value="go">Go</option>
            <option value="ruby">Ruby</option>
          </select>
        </label>

        <label className="flex items-center gap-2">
          <span className="text-gray-300 font-medium">Theme:</span>
          <select
            className="p-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500 transition"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="vs-dark">Dark</option>
            <option value="vs-light">Light</option>
            <option value="hc-black">High Contrast Black</option>
          </select>
        </label>
      </div>

      {/* Main Content (Editor + Save Button) */}
      <div className="flex flex-col w-full max-w-5xl flex-1 p-4">
        <div className="flex-1 rounded-lg overflow-hidden shadow-lg">
          <CodeEditor code={code} onChange={handleCodeChange} language={language} theme={theme} />
        </div>

        {/* Save Button Fixed at Bottom */}
        <div className="flex justify-center bg-gray-800 p-4 w-full mt-4 rounded-lg shadow-lg">
          <button
            onClick={handleSaveCode}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-105"
          >
            💾 Save Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
