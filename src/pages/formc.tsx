import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (

    <div style={{textAlign: "center"}}>
    < h1>遷移元</h1>
     {/* ②Linkコンポーネントでaタグを包む */}
      <Link href="/NextPage">
      <a>次のページへ進む</a>
     </Link>
   </div>


  )
}
