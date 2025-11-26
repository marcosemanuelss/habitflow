import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  MessageCircle, 
  User, 
  Coins, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  X, 
  Play, 
  Pause, 
  Gift, 
  Home, 
  ShoppingCart, 
  Menu, 
  Star 
} from 'lucide-react';

// --- Componente Principal do Aplicativo ---
export default function App() {
  // Estado para controlar a tela atual (navegação)
  const [page, setPage] = useState('login');
  
  // Estado para armazenar dados do usuário (simulado)
  const [user, setUser] = useState({
    name: 'Kauê', // Usei um nome do seu documento :)
    coins: 150,
    chatTime: 10, // em minutos
    avatar: {
      base: 'bg-blue-400',
      hat: null,
      shirt: '👕',
    }
  });

  // Estado para a sessão de estudo atual
  const [studySession, setStudySession] = useState(null);
  // Estado para os resultados do quiz
  const [quizResult, setQuizResult] = useState(null);

  // Função de navegação principal
  const navigate = (targetPage) => {
    setPage(targetPage);
  };

  // Simulação de "Roteador"
  const renderPage = () => {
    switch (page) {
      case 'login':
        return <LoginScreen setPage={navigate} />;
      case 'dashboard':
        return <DashboardScreen setPage={navigate} user={user} setStudySession={setStudySession} />;
      case 'study':
        return <StudyScreen setPage={navigate} studySession={studySession} setStudySession={setStudySession} user={user} setUser={setUser} setQuizResult={setQuizResult} />;
      case 'quiz':
        return <QuizScreen setPage={navigate} studySession={studySession} setUser={setUser} setQuizResult={setQuizResult} />;
      case 'results':
        return <ResultsScreen setPage={navigate} quizResult={quizResult} />;
      case 'chat':
        return <ChatScreen setPage={navigate} user={user} setUser={setUser} />;
      case 'store':
        return <StoreScreen setPage={navigate} user={user} setUser={setUser} />;
      default:
        return <LoginScreen setPage={navigate} />;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 p-4 font-inter">
      {/* Container simulando um celular */}
      <div className="w-full max-w-md h-[800px] bg-gray-900 text-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Conteúdo da Página */}
        <div className="flex-1 overflow-y-auto">
          {renderPage()}
        </div>
        
        {/* Barra de Navegação Inferior (se estiver logado e não em uma sessão) */}
        {['dashboard', 'chat', 'store'].includes(page) && (
          <BottomNavBar page={page} setPage={navigate} />
        )}
      </div>
    </div>
  );
}

// --- Tela 1: Login ---
function LoginScreen({ setPage }) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-b from-purple-800 to-gray-900">
      <BookOpen size={80} className="text-purple-300 mb-6" />
      <h1 className="text-3xl font-bold mb-2 text-center">HabitFlow</h1>
      <p className="text-lg text-gray-300 mb-10 text-center">Gamifique seus estudos.</p>
      
      <div className="w-full max-w-sm">
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-3 mb-4 bg-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          defaultValue="aluno@email.com"
        />
        <input 
          type="password" 
          placeholder="Senha" 
          className="w-full p-3 mb-6 bg-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          defaultValue="123456"
        />
        <button 
          onClick={() => setPage('dashboard')}
          className="w-full bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:bg-purple-700"
        >
          Entrar
        </button>
        <p className="text-center text-gray-400 mt-6">
          Não tem uma conta? <a href="#" className="text-purple-400 font-semibold">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
}

// --- Tela 2: Dashboard (Início) ---
function DashboardScreen({ setPage, user, setStudySession }) {
  const [topic, setTopic] = useState('Psicologia Comportamental');

  // Simula a criação de um plano de estudos
  const handleStartSession = () => {
    setStudySession({
      topic: topic,
      // API da OpenAI criaria isso (simulado)
      itinerary: [
        'Princípios do Condicionamento Operante',
        'Reforço Positivo vs. Negativo',
        'O papel da Punição',
        'Técnica Pomodoro (Metacognição)',
      ],
      totalTimeStudied: 0, // em segundos
    });
    setPage('study');
  };

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Olá, {user.name}!</h1>
          <p className="text-gray-400">Pronto para focar?</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-yellow-500 text-black px-3 py-1 rounded-full font-bold">
            <Coins size={18} />
            <span>{user.coins}</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center text-2xl shadow-md">
            {user.avatar.shirt || '👤'}
          </div>
        </div>
      </header>

      {/* Card Principal: Iniciar Estudo */}
      <div className="bg-purple-700 p-6 rounded-2xl shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Iniciar Sessão de Estudo</h2>
        <label htmlFor="topic" className="block text-sm font-medium text-purple-200 mb-2">Qual será sua temática de hoje?</label>
        <select 
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-3 bg-purple-900 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400 mb-4"
        >
          <option>Psicologia Comportamental</option>
          <option>Neurociência Cognitiva</option>
          <option>Psicanálise</option>
          <option>Gestão de Tempo</option>
        </select>
        <button 
          onClick={handleStartSession}
          className="w-full bg-white text-purple-800 font-bold py-3 px-6 rounded-lg shadow-lg transform transition-transform hover:scale-105"
        >
          Gerar Plano de Estudo (IA)
        </button>
      </div>

      {/* Stats Rápidos */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-2xl">
          <Clock size={24} className="text-blue-400 mb-2" />
          <p className="text-gray-400 text-sm">Tempo de Estudo</p>
          <p className="text-xl font-bold">2h 45m</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-2xl">
          <MessageCircle size={24} className="text-green-400 mb-2" />
          <p className="text-gray-400 text-sm">Tempo de Chat</p>
          <p className="text-xl font-bold">{user.chatTime} min</p>
        </div>
      </div>

      {/* Amigos (Avatar) */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Amigos Online</h3>
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-red-400 flex items-center justify-center text-2xl shadow-md border-2 border-green-500">{'👽'}</div>
            <span className="text-sm mt-1">Mylla</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-green-400 flex items-center justify-center text-2xl shadow-md border-2 border-green-500">{'🤖'}</div>
            <span className="text-sm mt-1">Marcos</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center text-2xl shadow-md">{'👩‍🚀'}</div>
            <span className="text-sm mt-1">Ingreed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Tela 3: Sessão de Estudo (Pomodoro) ---
function StudyScreen({ setPage, studySession, setStudySession, user, setUser, setQuizResult }) {
  const POMODORO_TIME = 25 * 60; // 25 min
  const BREAK_TIME = 10 * 60; // 10 min (Chat)
  
  const [isBreak, setIsBreak] = useState(false);
  const [timer, setTimer] = useState(POMODORO_TIME);
  const [isActive, setIsActive] = useState(false);
  const [totalStudied, setTotalStudied] = useState(0);

  // Lógica do Timer
  useEffect(() => {
    let interval;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
        if (!isBreak) {
          setTotalStudied(prev => prev + 1);
        }
      }, 1000);
    } else if (isActive && timer === 0) {
      // Timer acabou, troca o modo
      setIsActive(false);
      setIsBreak(prev => !prev);
      setTimer(isBreak ? POMODORO_TIME : BREAK_TIME);
      // Simula uma notificação
      alert(isBreak ? "Hora de voltar aos estudos!" : "Pausa de 10 min para chat!");
    }
    return () => clearInterval(interval);
  }, [isActive, timer, isBreak]);

  // Formata o tempo (mm:ss)
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // Finaliza a sessão e vai para o Quiz
  const handleFinishSession = () => {
    setIsActive(false);
    // Salva o tempo total estudado na sessão
    setStudySession(prev => ({ ...prev, totalTimeStudied: totalStudied }));
    setPage('quiz');
  };

  return (
    <div className="flex flex-col h-full p-6">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{studySession.topic}</h2>
        <button onClick={handleFinishSession} className="text-purple-400 font-semibold">
          Finalizar Sessão
        </button>
      </header>

      {/* Timer Gigante */}
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="w-64 h-64 rounded-full border-8 border-purple-600 flex flex-col items-center justify-center shadow-lg">
          <p className="text-lg font-medium text-purple-300">
            {isBreak ? 'Chat (Pausa)' : 'Foco Total'}
          </p>
          <h1 className="text-7xl font-bold">{formatTime(timer)}</h1>
        </div>
        <button 
          onClick={() => setIsActive(!isActive)}
          className={`mt-10 w-20 h-20 rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:scale-105 ${isActive ? 'bg-red-500' : 'bg-green-500'}`}
        >
          {isActive ? <Pause size={32} /> : <Play size={32} />}
        </button>
      </div>

      {/* Roteiro de Estudos (IA) */}
      <div className="bg-gray-800 p-4 rounded-2xl max-h-48 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-3">Roteiro de Estudos (IA)</h3>
        <ul className="list-disc list-inside space-y-2">
          {studySession.itinerary.map((item, index) => (
            <li key={index} className="text-gray-300">{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// --- Tela 4: Quiz (Exercício de Fixação) ---
function QuizScreen({ setPage, studySession, setUser, setQuizResult }) {
  // Perguntas simuladas baseadas no tópico
  const mockQuestions = [
    {
      q: 'O que é "reforço positivo" segundo Skinner?',
      options: ['Adicionar um estímulo punitivo', 'Remover um estímulo agradável', 'Adicionar um estímulo agradável', 'Ignorar o comportamento'],
      answer: 2
    },
    {
      q: 'Qual o tempo de foco da técnica Pomodoro?',
      options: ['15 minutos', '25 minutos', '45 minutos', '60 minutos'],
      answer: 1
    },
    {
      q: 'O chat no app serve como qual tipo de reforço?',
      options: ['Reforço positivo', 'Punição', 'Reforço negativo', 'Extinção'],
      answer: 0
    },
    {
      q: 'A gamificação usa "moedas" como reforço...',
      options: ['Extrínseco', 'Intrínseco', 'Negativo', 'Primário'],
      answer: 0
    }
  ];

  const [questions] = useState(mockQuestions);
  const [answers, setAnswers] = useState({});

  const handleSelectAnswer = (qIndex, oIndex) => {
    setAnswers(prev => ({ ...prev, [qIndex]: oIndex }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    questions.forEach((q, qIndex) => {
      if (answers[qIndex] === q.answer) {
        correctCount++;
      }
    });

    const score = (correctCount / questions.length) * 100;
    const studiedMinutes = Math.floor(studySession.totalTimeStudied / 60);
    
    let coinsEarned = 10;
    let chatTimeEarned = 0;

    // Lógica de Recompensa (do PDF)
    if (score >= 75) {
      // 10 a 100 moedas
      coinsEarned = Math.max(10, Math.min(100, Math.floor(score * 1.0)));
      // Tempo de chat equivalente ao tempo de estudo
      chatTimeEarned = studiedMinutes;
    } else {
      coinsEarned = 10; // Recompensa de consolação
    }

    // Atualiza o usuário
    setUser(prev => ({
      ...prev,
      coins: prev.coins + coinsEarned,
      chatTime: prev.chatTime + chatTimeEarned
    }));
    
    // Define os resultados para a próxima tela
    setQuizResult({
      score: score,
      coinsEarned: coinsEarned,
      chatTimeEarned: chatTimeEarned
    });

    setPage('results');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Exercício de Fixação</h1>
      <p className="text-lg text-gray-300 mb-6">Tópico: {studySession.topic}</p>

      <div className="space-y-6">
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="bg-gray-800 p-4 rounded-lg">
            <p className="font-semibold mb-3">{q.q}</p>
            <div className="space-y-2">
              {q.options.map((opt, oIndex) => (
                <button
                  key={oIndex}
                  onClick={() => handleSelectAnswer(qIndex, oIndex)}
                  className={`w-full text-left p-3 rounded-md transition-colors ${
                    answers[qIndex] === oIndex
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmitQuiz}
        className="w-full bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg mt-8 transform transition-transform hover:scale-105"
      >
        Entregar Atividade
      </button>
    </div>
  );
}

// --- Tela 5: Resultados / Recompensas ---
function ResultsScreen({ setPage, quizResult }) {
  const { score, coinsEarned, chatTimeEarned } = quizResult;
  const passed = score >= 75;

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-gray-900">
      {passed ? (
        <CheckCircle size={80} className="text-green-500 mb-6" />
      ) : (
        <X size={80} className="text-red-500 mb-6" />
      )}
      
      <h1 className="text-3xl font-bold mb-2">
        {passed ? "Bom trabalho!" : "Continue tentando!"}
      </h1>
      <p className="text-5xl font-bold mb-6">{score.toFixed(0)}%</p>

      {/* Recompensas */}
      <div className="bg-gray-800 p-6 rounded-2xl w-full max-w-sm mb-8">
        <h2 className="text-xl font-semibold mb-4">Recompensas</h2>
        <div className="flex justify-around">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-2xl font-bold text-yellow-500">
              <Coins size={24} />
              <span>+{coinsEarned}</span>
            </div>
            <p className="text-gray-400">Moedas</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-2xl font-bold text-green-500">
              <MessageCircle size={24} />
              <span>+{chatTimeEarned} min</span>
            </div>
            <p className="text-gray-400">Tempo de Chat</p>
          </div>
        </div>
      </div>
      
      {passed && (
        <button 
          onClick={() => setPage('chat')}
          className="w-full max-w-sm bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 mb-4"
        >
          Ir para o Chat
        </button>
      )}
      <button 
        onClick={() => setPage('dashboard')}
        className="w-full max-w-sm bg-gray-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-transform hover:scale-105"
      >
        Voltar ao Início
      </button>
    </div>
  );
}

// --- Tela 6: Chat (Estilo Habbo - Isométrico) ---

// Componente de Balão de Fala
function SpeechBubble({ text }) {
  return (
    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-max max-w-xs bg-white text-gray-900 px-3 py-1 rounded-lg shadow-lg text-sm z-20 whitespace-nowrap">
      {text}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white"></div>
    </div>
  );
}

// Componente do Avatar na Sala
function AvatarInRoom({ avatarData, message }) {
  const { name, avatar, position } = avatarData;
  return (
    <div className="absolute text-center" style={{ left: position.x, bottom: position.y }}>
      {/* Balão de fala */}
      {message && <SpeechBubble text={message} />}
      
      {/* Avatar */}
      <div className={`w-20 h-20 rounded-full flex flex-col items-center justify-center text-5xl shadow-lg relative ${avatar.base}`}>
        <div className="absolute -top-4 text-4xl">{avatar.hat}</div>
        {avatar.shirt}
      </div>
      
      {/* Nome */}
      <div className="mt-1 px-2 py-0.5 bg-black bg-opacity-50 rounded-full text-xs font-semibold">
        {name}
      </div>
    </div>
  );
}

function ChatScreen({ setPage, user, setUser }) {
  const [chatTime, setChatTime] = useState(user.chatTime * 60); // em segundos
  const [message, setMessage] = useState('');
  
  // Estado para os balões de fala
  // Cada item terá: { user: string, text: string, id: number }
  const [bubbles, setBubbles] = useState([]);
  
  // Dados simulados dos outros usuários na sala
  const [roomUsers, setRoomUsers] = useState([
    {
      name: user.name,
      avatar: user.avatar,
      position: { x: '50%', y: '40%' } // Posição do usuário principal (central)
    },
    {
      name: 'Mylla',
      avatar: { base: 'bg-red-400', hat: '🎩', shirt: '👽' },
      position: { x: '15%', y: '25%' } // Posição mais para a esquerda
    },
    {
      name: 'Marcos',
      avatar: { base: 'bg-green-400', hat: '🤖', shirt: '👕' },
      position: { x: '70%', y: '15%' } // Posição mais para a direita e abaixo
    }
  ]);

  // Timer do Chat
  useEffect(() => {
    if (chatTime > 0) {
      const interval = setInterval(() => {
        setChatTime(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setUser(prev => ({ ...prev, chatTime: 0 }));
    }
  }, [chatTime]);
  
  // Simulação de chat da "Mylla"
  useEffect(() => {
    if (chatTime <= 0) return;
    
    const messagesMylla = [
      "E aí, pessoal! Quem estudou hoje?",
      "Estou com uma dúvida em condicionamento operante.",
      "O quiz foi fácil, né?",
      "Alguém quer jogar um game depois?",
      "Esses avatares são show!"
    ];

    const simulateChat = () => {
      const randomTime = (Math.random() * 10000) + 5000; // entre 5 e 15 segundos
      
      setTimeout(() => {
        if (chatTime > 0) {
          const randomIndex = Math.floor(Math.random() * messagesMylla.length);
          const simulatedMessage = messagesMylla[randomIndex];
          const id = Date.now();
          setBubbles(prev => [...prev, { user: 'Mylla', text: simulatedMessage, id: id }]);
          
          // Remove o balão após 5 segundos
          setTimeout(() => {
            setBubbles(prev => prev.filter(b => b.id !== id));
          }, 5000);

          simulateChat(); // Chama a simulação novamente
        }
      }, randomTime);
    };

    const timeoutId = setTimeout(simulateChat, 7000); // Inicia a simulação após 7s

    return () => clearTimeout(timeoutId); // Limpa o timeout
  }, [chatTime]); // Depende do chatTime para parar

  const formatChatTime = (timeInSeconds) => {
    if (timeInSeconds <= 0) return "00:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleSend = () => {
    if (message.trim() === '' || chatTime <= 0) return;
    
    const id = Date.now();
    // Adiciona o balão de fala do usuário
    setBubbles(prev => [...prev, { user: user.name, text: message, id: id }]);
    setMessage('');

    // Remove o balão do usuário após 5 segundos
    setTimeout(() => {
      setBubbles(prev => prev.filter(b => b.id !== id));
    }, 5000);
  };

  // Encontra a mensagem atual para cada usuário
  const findLastBubble = (userName) => {
    return bubbles.filter(b => b.user === userName).pop()?.text;
  };

  return (
    <div className="flex flex-col h-full bg-gray-900">
      <header className="p-4 bg-gray-800 shadow-md flex justify-between items-center z-10">
        <h1 className="text-xl font-bold">Sala de Estudos Isométrica</h1>
        <div className="bg-green-600 text-white text-sm font-bold px-3 py-1 rounded-full">
          {formatChatTime(chatTime)}
        </div>
      </header>
      
      {/* "Sala" Virtual Isométrica */}
      <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-yellow-800 to-amber-900">
        {/* Chão (simulado isométrico) */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-yellow-700 transform -skew-y-12 origin-bottom-left"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-yellow-600 transform skew-y-12 origin-bottom-right opacity-70"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-yellow-500"></div> {/* Centro do chão */}

        {/* Paredes (simuladas) */}
        <div className="absolute top-0 left-0 w-full h-[60%] bg-amber-700"></div> {/* Parede de fundo */}
        <div className="absolute top-0 left-0 h-full w-[30%] bg-amber-800 transform skew-x-12 origin-top-left"></div> {/* Parede esquerda */}
        <div className="absolute top-0 right-0 h-full w-[30%] bg-amber-800 transform -skew-x-12 origin-top-right"></div> {/* Parede direita */}

        {/* Elementos de "Móveis" (simulados em pixel art) */}
        {/* Mesa de Estudo */}
        <div className="absolute left-[10%] bottom-[40%] w-24 h-16 bg-brown-700 border-b-4 border-brown-900" 
             style={{ transform: 'skewY(-12deg) rotateX(20deg)' }}> {/* Perspectiva */}
            <div className="absolute top-0 left-0 w-full h-8 bg-brown-600 border-b-2 border-brown-800"></div> {/* Tampo */}
            <div className="absolute left-2 top-8 w-4 h-8 bg-brown-800"></div> {/* Perna esquerda */}
            <div className="absolute right-2 top-8 w-4 h-8 bg-brown-800"></div> {/* Perna direita */}
        </div>
        
        {/* Estante */}
        <div className="absolute right-[5%] top-[10%] w-20 h-40 bg-gray-700 border-l-4 border-t-4 border-gray-900">
            <div className="absolute top-1/3 left-0 w-full h-4 bg-gray-600 border-t-2 border-gray-800"></div>
            <div className="absolute top-2/3 left-0 w-full h-4 bg-gray-600 border-t-2 border-gray-800"></div>
        </div>

        {/* Tapete */}
        <div className="absolute left-1/2 bottom-[10%] w-48 h-24 bg-purple-500 rounded-lg shadow-inner transform -translate-x-1/2 perspective-room-element"></div>


        {/* Avatares */}
        {roomUsers.map(roomUser => (
          <AvatarInRoom
            key={roomUser.name}
            avatarData={roomUser}
            message={findLastBubble(roomUser.name)}
          />
        ))}
        
        {chatTime <= 0 && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 p-4 rounded-lg z-20">
            <p className="text-center text-red-500 font-semibold">
              Seu tempo de chat bônus acabou! 
              <br />
              Estude e passe no quiz para ganhar mais.
            </p>
          </div>
        )}
      </div>

      {/* Input de Mensagem */}
      <div className="p-4 bg-gray-800 border-t border-gray-700 z-10">
        <div className="flex gap-2">
          <input 
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={chatTime > 0 ? "Falar..." : "Tempo esgotado"}
            className="flex-1 p-3 bg-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={chatTime <= 0}
          />
          <button 
            onClick={handleSend}
            className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center text-white"
            disabled={chatTime <= 0}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Tela 7: Loja do Avatar ---
function StoreScreen({ setPage, user, setUser }) {
  const storeItems = [
    { id: 'hat1', name: 'Boné Roxo', type: 'hat', icon: '🧢', price: 50 },
    { id: 'hat2', name: 'Chapéu de Mago', type: 'hat', icon: '🧙', price: 200 },
    { id: 'shirt1', name: 'Jaqueta', type: 'shirt', icon: '🧥', price: 100 },
    { id: 'shirt2', name: 'Kimono', type: 'shirt', icon: '🥋', price: 150 },
    { id: 'base1', name: 'Fundo Estrelado', type: 'base', icon: 'bg-indigo-900', price: 300 },
  ];

  const handleBuy = (item) => {
    if (user.coins >= item.price) {
      setUser(prev => ({
        ...prev,
        coins: prev.coins - item.price,
        avatar: { ...prev.avatar, [item.type]: item.icon }
      }));
      alert(`Você comprou: ${item.name}!`);
    } else {
      alert("Moedas insuficientes!");
    }
  };

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Loja do Avatar</h1>
        <div className="flex items-center gap-2 bg-yellow-500 text-black px-3 py-1 rounded-full font-bold">
          <Coins size={18} />
          <span>{user.coins}</span>
        </div>
      </header>

      {/* Preview do Avatar */}
      <div className="flex flex-col items-center mb-8">
        <div className={`w-32 h-32 rounded-full flex flex-col items-center justify-center text-6xl shadow-lg relative ${user.avatar.base}`}>
          <div className="absolute -top-4 text-5xl">{user.avatar.hat}</div>
          {user.avatar.shirt}
        </div>
        <p className="mt-2 text-lg font-semibold">{user.name}</p>
      </div>
      
      {/* Itens da Loja */}
      <div className="grid grid-cols-2 gap-4">
        {storeItems.map(item => (
          <div key={item.id} className="bg-gray-800 p-4 rounded-2xl text-center">
            <div className={`text-5xl mb-2 ${item.type === 'base' ? `${item.icon} w-16 h-16 rounded-lg mx-auto` : ''}`}>
              {item.type !== 'base' && item.icon}
            </div>
            <p className="font-semibold">{item.name}</p>
            <button 
              onClick={() => handleBuy(item)}
              className="mt-3 w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-lg text-sm flex items-center justify-center gap-2"
            >
              <Coins size={16} /> {item.price}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Componente: Barra de Navegação Inferior ---
function BottomNavBar({ page, setPage }) {
  const navItems = [
    { id: 'dashboard', label: 'Início', icon: Home },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'store', label: 'Loja', icon: ShoppingCart },
    { id: 'profile', label: 'Perfil', icon: User },
  ];

  return (
    <nav className="w-full bg-gray-800 p-2 flex justify-around items-center border-t border-gray-700">
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = page === item.id;
        return (
          <button 
            key={item.id}
            onClick={() => setPage(item.id)}
            className={`flex flex-col items-center p-2 rounded-lg ${isActive ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}
          >
            <Icon size={24} />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}