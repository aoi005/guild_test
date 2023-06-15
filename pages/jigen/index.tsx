import Image from 'next/image'
import { Inter } from 'next/font/google'

import image1 from './OIT.png'
import { useState, FormEvent } from 'react';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [inputValue, setInputValue] = useState('');

  const NavBar = () => {//上のバー
    return (
      <div className="fixed w-full bg-gray-200 p-4">
        <ul className="flex justify-around">
          <li><a href="#" className="text-blue-500 hover:text-blue-700">Menu Item 1</a></li>
          <li><a href="#" className="text-blue-500 hover:text-blue-700">Menu Item 2</a></li>
          <li><a href="#" className="text-blue-500 hover:text-blue-700">Menu Item 3</a></li>
          <li><a href="#" className="text-blue-500 hover:text-blue-700">Menu Item 4</a></li>
          <li><a href="#" className="text-blue-500 hover:text-blue-700">Menu Item 5</a></li>
        </ul>
      </div>
    )
  }
  

  // フォームの送信をハンドルする関数を作成します
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault(); // デフォルトのフォーム送信動作を防ぎます
    // ここに送信の処理を書くことができます
    console.log(inputValue); // 今回はコンソールに入力値を表示します
    setInputValue(''); // フォームの入力をリセットします
  }
  
  const id = "1234567890";
  const name = "ギルド名";

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />{/*上のバー*/}

    

    
    
    <div className="flex">
    { // メニューバー部分
    }
    <div className="w-64 min-h-screen bg-gray-200 p-4 mt-8">
      <h2 className="text-2xl mb-4">Menu</h2>
      <nav>
        <ul className="space-y-2">
          <li><a href="#" className="text-blue-500 hover:text-blue-700">Menu Item 1</a></li>
          <li><a href="#" className="text-blue-500 hover:text-blue-700">Menu Item 2</a></li>
          <li><a href="#" className="text-blue-500 hover:text-blue-700">Menu Item 3</a></li>
        </ul>
      </nav>
    </div>


    <main
      className={` w-full flex min-h-screen flex-col items-center  justify-between p-24 mt-8 ${inter.className}`}
    >
      
     
      
      <div className='w-full bg-gray-200'>
          <div className="mb-4">
                <h1 className="mb-3 text-2xl font-semibold bg-gray-300  pl-4">
                    ギルド名            
                </h1>
          </div>
          <div className=" pl-4 mb-4">
            <h2>{"リーダーID : "}{id}</h2>
            <h2>{"ギルドの説明"}</h2>
            <p className="opacity-50 h-[6em]">
            こんにちは、新しくギルドを作りました。
            よろしくお願いします。

            </p>
            <h2>{"方針"}</h2>
            <span className="inline-block bg-yellow-100 text-black px-2 py-1 mr-4">
                    tag1
            </span>
            <span className="inline-block bg-yellow-100 text-black px-2 py-1 mr-4">
                    tag2    
            </span>
            <span className="inline-block bg-yellow-100 text-black px-2 py-1 mr-4">
                    tag3        
            </span>
          </div> 
          
      </div>

      <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="mb-3 text-2xl font-semibold"
          />
          <button 
            type="submit" 
            className="inline-block px-4 py-2 border border-gray-300 text-white bg-blue-500 hover:bg-blue-700"
          >
            送信
          </button>
      </form>
    
    
{/*
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/pages/index.tsx</code>
        </p>
   
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-whute via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            
            <Image
              src="/next.svg"
              alt="Next.js Logo"
              className="dark:invert"
              width={180}
              height={37}
              priority
              //Logoの画像
            />
            
          </a>
        </div>
        
      </div>
      <h2>h2</h2>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          
          src="/vercel.svg"
          alt="Vercel Logo"
          
          width={100}
          height={24}
          priority
          //Logoの画像
        />
        <Image 
        src={image1} 
        alt="Vercel Logo"
        width={100}
        height={24}
        priority
        />
      </div>
      <h2>h3</h2>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-5 lg:text-left">
        {//lg は大画面のみに適用、grid-cols- 数　で一列の個数を変える
        }

      

        <a
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      
          
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{' '}
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Discover and deploy boilerplate example Next.js&nbsp;projects.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
        
      </div>
      */}
        
    </main>
    </div>{/*左のバー終わり*/}
    </div>

  )
}
