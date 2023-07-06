// src/pages/_app.tsx
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import Home from './index';


const MyApp = ({ Component, pageProps }: AppProps) => {

	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>

				{/* ↓publicにあるfaviconをブラウザタブのアイコンとして表示する。 */}
				<link rel="icon" href="/favicon.ico" />  

			</Head>
			<DefaultSeo
				defaultTitle="コンパス掲示板"
				canonical="https://www.commpass-forum.net"
				description="ここはコンパスのメンバー募集や質問募集ができる掲示板です。"
				
				// ↓snsとかでurl貼ったら出てくる説明(opengraph)
				openGraph={{
					type: "website",
					title: "コンパス募集掲示板",
					description: "コンパスのメンバー募集や質問募集ができる掲示板です。",
					site_name: "COMPASS.NET",
					url: "https://www.compass-forum.net",
					images: [
					 {
						// ↓firebasestorageに保存した画像を引っ張ってくる所（url変更必要）
					 	url: "https://firebasestorage.googleapis.com/v0/b/test-nextjs-d6670.appspot.com/o/topicon.jpg?alt=media&token=471f438f-5e84-48e3-9bba-03461ec5fc13",
						width: 512,
						height: 512,
						alt: 'Og Image Alt',
						type: 'image/jpeg',
					 },
					],
				}}


				// twitter={{
				// 		handle: '@handle',
				// 		site: '@site',
				// 		cardType: "summary_large_image",
				// }}
			/>
			
			<Component {...pageProps} title={Home} />
		</>
	);
};

export default MyApp;