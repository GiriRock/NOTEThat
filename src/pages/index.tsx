import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <span className="text-[hsl(280,100%,70%)]">NOTEit</span>
          </h1>
          
          <div className="grid grid-cols-1 gap-4 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href= "/auth/login"
            >
              <h3 className="text-2xl font-bold">Login →</h3>
              <div className="text-lg">
                Simple Note Taking Application
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
