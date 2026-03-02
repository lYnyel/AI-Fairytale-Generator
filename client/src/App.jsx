import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [story, setStory] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return alert("Введите тему сказки!");

    setLoading(true);
    setStory("");
    setImage("");

    try {
      const response = await axios.post("/api/generate", { prompt });
      setStory(response.data.story);
      setImage(response.data.image);
    } catch (error) {
      console.error("Error:", error);
      alert("Error, try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>AI Generator-test</h1>

      <div className="input-group">
        <input
          type="text"
          placeholder="О ком будет сказка?"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={loading}
        />
        <button onClick={handleGenerate} disabled={loading}>
          {loading ? "Создаем" : "Создать"}
        </button>
      </div>

      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Идет генерация</p>
        </div>
      )}

      {(story || image) && !loading && (
        <div className="result-card">
          {image && <img src={image} alt="Иллюстрация" className="fade-in" />}
          {story && <p className="story-text">{story}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
