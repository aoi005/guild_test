
export default function Home(){
  return(<>
  
  <nav>
    <ul className="navul">
      <li className="navli"><a className="navbar" href="http://localhost:3000/#">Top</a></li>
      <li className="navli"><a className="navbar" href="#">投稿</a></li>
      <li className="navli"><a className="navbar" href="#">検索</a></li>
    </ul>
  </nav>

  <div className="menu">
    <ul className="menuul">
      <li className="menuli"><a className="menua" href="#">メンバー募集</a></li>
      <li className="menuli"><a className="menua" href="#">勧誘待ち</a></li>
      <li className="menuli"><a className="menua" href="#">固定募集</a></li>
      <li className="menuli"><a className="menua" href="#">質問</a></li>
      <li className="menuli"><a className="menua" href="#">HELP</a></li>
    </ul> 
  </div>

  <main>
    <div className="main">
      <h1><a href='http://localhost:3000/about'>link付き</a></h1>
      <h1>何となくわかってきたんちゃうこれ</h1>
      <p>改行の問題、ヨシ!</p>
      <p></p>
    </div>  
  </main>

  <div className="bbs">
    <ul className="bbsul">
      <p></p>
    </ul>
  </div>

  </>
  )
}
