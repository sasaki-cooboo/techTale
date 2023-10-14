import Head from "next/head";
import { Noto_Sans_JP } from "next/font/google";
import Layout from "@/features/jobs/Layout";
import SearchContents from "@/features/jobs/SearchContents";

const notojp = Noto_Sans_JP({ subsets: ["latin"], display: "swap" });

export default function Search() {
  return (
    <>
      <Head>
        <title>エンジニア求人サイト</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={notojp.className}>
        <Layout>
          <SearchContents />
        </Layout>
      </div>
    </>
  );
}
