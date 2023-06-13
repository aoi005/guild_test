import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-1 ${inter.className}`}
    >
    <div className="container mx-auto bg-gray-800">
    <header 
        className='container mx-auto text-white'>
        <div className='flex justify-between items-senter '>
            <h1 className='text-4xl fonr-semibold md:text-xl'>CON</h1>
            <div>
            <button>
                <svg className='h-10 w-8 fill-currend items-senter' viewBox='0 0 24 24'>
                    <path d ="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"></path>
                </svg>
            </button>
            </div>
        </div>
   
    <div>
        <ul className='md:flex text-white md:justify-center'>
            <li className='border-b '>
                <a href="#" className='block px-8 py-2 my-3 hover:bg-gray-300 '
                    >Top
                </a>
            </li>{/*px-8:padding-right 2rem*/}
            <li className='border-b '>
                <a href="#" className='block px-8 py-2 my-3 hover:bg-gray-300'
                >投稿
                </a>
            </li>{/*py-2:padding-top 0.5rem*/}
            <li className='border-b'>
                <a href="#" className='block px-8 py-2 my-3 hover:bg-gray-300'
                >検索
                </a>
            </li>
        </ul>
    </div>
    </header>
    </div>

    <script>
 
</script>
    

    <div className='container mx-auto'>
        <p>掲示板</p>

    </div>



    
      
    
   
      

     

<div className='container grid grid-rows-4 grid-flow-col gap-1'>
        <div className="col-span-4">
            ログ
        </div>  
        
          <div className='border-l-2 border-r-2 text-center border-blue-300'>
                <div className=''>記事１</div>

          </div>

          <div className='border-r-2 text-center border-blue-300'>
                <div className='col-span-3'>記事２</div>
          </div>

    
   
</div>




            
       
       





    </main>
  )
}
