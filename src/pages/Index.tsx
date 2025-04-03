
import Game from '../components/Game';
import { Toaster } from '../components/ui/sonner';

const Index = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <header className="py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md">
        <div className="container mx-auto">
          <h1 className="text-center text-3xl font-bold">Pharma Bros</h1>
          <p className="text-center text-sm mt-1">A pharmaceutical platformer game</p>
        </div>
      </header>
      
      <main>
        <Game />
      </main>
      
      <footer className="text-center text-sm text-gray-500 py-4 mt-6">
        <p>Pharma Bros - A 2-player pharmaceutical platformer game</p>
        <p className="text-xs mt-1">Use WASD and Arrow keys to play</p>
      </footer>
      
      <Toaster />
    </div>
  );
};

export default Index;
