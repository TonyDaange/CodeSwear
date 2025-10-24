import Head from "next/head";
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Codeswear - Wear the code</title>
        <meta name="description" content="Codeswear - Wear the code" />
        <link rel="icon" href="/tshirt.png" />
      </Head>
      <h1 className="text-4xl font-bold text-center mb-8">
        Welcome to Codeswear
      </h1>
      <div className="mx-4">This is me</div>
      <div className="mx-4 bg-slate-500">This is me</div>
      <div className="mx-60 bg-green-800">Dos bro's tacos</div>
    </div>
  );
}
