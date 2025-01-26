import { useEffect,useState } from 'react'
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'
import UserProfile from './components/user-profile'
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import ProductCarousel from './components/product-carousel';

const products = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#' },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#' },
  { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#' },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#' },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#' },
]
const callsToAction = [
  { name: 'Watch demo', href: '#' },
  { name: 'Contact sales', href: '#' },
]


export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      <header className="bg-white p-6 sticky top-0 z-50">
        <nav aria-label="Global" className="mx-auto flex justify-between">
          <div className="flex">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          <div className="flex">
            <a href="#" className="-m-1.5 p-1.5">
              <img
                alt=""
                src="src/assets/logo.svg"
                className="h-8 w-auto"
              />
            </a>
            <h1 className="text-[19.05px] ml-[10px] font-bold ">Audio</h1>
          </div>

          <UserProfile/>
          
        </nav>

        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-10 bg-black bg-opacity-25" />
          <DialogPanel className="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>

              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src="src/assets/logo.svg"
                  className="h-8 w-auto"
                />
              </a>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Disclosure as="div" className="-mx-3">
                    <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base font-semibold text-gray-900 hover:bg-gray-50">
                      Product
                      <ChevronDownIcon aria-hidden="true" className="h-5 w-5 group-data-open:rotate-180" />
                    </DisclosureButton>
                    <DisclosurePanel className="mt-2 space-y-2">
                      {[...products, ...callsToAction].map((item) => (
                        <DisclosureButton
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="block rounded-lg py-2 pr-3 pl-6 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                        >
                          {item.name}
                        </DisclosureButton>
                      ))}
                    </DisclosurePanel>
                  </Disclosure>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Features
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Marketplace
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Company
                  </a>
                </div>
                <div className="py-6">
                  <a
                    onClick={handleLogout}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log out
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

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
  
      <div className="relative my-6 mx-6">
        <AiOutlineSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
              type="text"
              placeholder="Search headphone"
              className="w-full h-[50px] text-black pl-12 py-2 px-4 bg-white border border-gray-500 rounded-[10px]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
          />
      </div>
      <ProductCarousel/>

    </body>
    
  )
}
