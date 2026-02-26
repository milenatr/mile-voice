import { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

const App = () => {
  // Estado para saber qué audio está sonando y animar el botón
  const [playing, setPlaying] = useState<string | null>(null);

  const sounds = [
    { id: 1, title: "", file: "teamounmonton.mp3", emoji: "✨", color: "from-pink-400 to-rose-600" },
    { id: 2, title: "", file: "soselamordemivida.mp3", emoji: "❤️", color: "from-orange-400 to-red-500" },
    { id: 3, title: "", file: "benditodia.mp3", emoji: "☀️", color: "from-amber-400 to-orange-500" },
    { id: 4, title: "", file: "tequieroparasiempre.mp3", emoji: "💋", color: "from-purple-500 to-indigo-600" },
  ];

  const playAudio = (file: string) => {
    // Evitamos que se solapen si toca rápido
    setPlaying(file);
    const audio = new Audio(`/sounds/${file}`);
    
    audio.play().catch(err => console.error("Error al reproducir:", err));
    
    audio.onended = () => setPlaying(null);
  };

  return (
    <div className="min-h-screen bg-rose-50 dark:bg-slate-950 p-6 font-sans flex flex-col items-center">
      {/* Header */}
      <header className="text-center py-8">
        <div className="inline-block p-4 bg-white dark:bg-slate-900 rounded-full shadow-xl mb-4 animate-bounce">
          <Heart className="text-rose-500 fill-rose-500" size={32} />
        </div>
        <h1 className="text-3xl font-black text-slate-800 dark:text-white">
          MILE <span className="text-rose-500">VOICE</span>
        </h1>
        <p className="text-slate-500 mt-2">Presioná para escucharme</p>
      </header>

      {/* Grid de Botones */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {sounds.map((sound) => (
          <button
            key={sound.id}
            onClick={() => playAudio(sound.file)}
            className={`
              relative overflow-hidden aspect-square rounded-[2rem] p-4
              bg-gradient-to-br ${sound.color}
              shadow-lg transform transition-all 
              active:scale-90 hover:scale-105
              flex flex-col items-center justify-center text-white
              ${playing === sound.file ? 'ring-4 ring-white ring-offset-2' : ''}
            `}
          >
            <span className="text-4xl mb-2">{sound.emoji}</span>
            <span className="font-bold text-sm text-center">{sound.title}</span>
            
            {/* Overlay de "Sonando" */}
            {playing === sound.file && (
              <div className="absolute inset-0 bg-white/20 flex items-center justify-center backdrop-blur-[2px]">
                <Sparkles className="animate-spin" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-auto py-8">
        <p className="text-rose-400 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
          Hecho con <Heart size={12} /> para vos
        </p>
      </footer>
    </div>
  );
};

export default App;
