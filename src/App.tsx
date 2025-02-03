import { useEffect,useState } from 'react'
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import ProductCarousel from './components/ProductCarousel';
import Header from './components/header';




export default function HomePage() {
  const [username, setUsername] = useState<string|undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const auth = getAuth();


  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Logout realizado com sucesso.");
        navigate('/login');
      })
      .catch((error) => {
        console.error("Erro ao fazer logout:", error);
      });
  };

  const handleFocus = () => {
    navigate('/search', { state: { search } });
  };


  useEffect(() => {
  
    const getName = async () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUsername(user.displayName || user.email || "");
        } else {
          setUsername(undefined);
        }
        setIsLoading(false); // Conclui o carregamento
      });
    };

    getName();
  });

  if (isLoading) {
    // Exibe um indicador de carregamento enquanto os dados não são carregados
    return <div>Loading...</div>;
  }

  return (
    <body className="">
      <Header onLogout={handleLogout} />

      <div className='mx-6'>
        <div className='mt-2'>
          <div className='flex'>
            <p className='mr-2 text-[18px]'>Hi,</p>
            <p className='mr-2 text-[18px]'>{username}</p>
          </div>
        </div>

        <div className='mt-[5px]'>
          <div className='flex'>
            <p className='mr-2 text-[24px] font-bold'>What are you looking for today?</p>
          </div>
        </div>
      </div>
  
      <div className="relative mt-6 mb-9 mx-6">
        <AiOutlineSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
              type="text"
              placeholder="Search headphone"
              className="w-full h-[50px] text-black pl-12 py-2 px-4 bg-white border border-gray-300 rounded-[10px]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={handleFocus}
          />
      </div>
      <ProductCarousel/>

    </body>
    
  )
}
