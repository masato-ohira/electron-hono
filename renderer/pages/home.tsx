import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react/jsx-runtime";

export default function HomePage() {
  return (
    <Fragment>
      <div className="grid grid-col-1 text-2xl w-full text-center">
        <div>
          <Image
            className="ml-auto mr-auto mix-blend-overlay"
            src="/images/logo.png"
            alt="Logo image"
            width={256}
            height={256}
          />
        </div>
        <span className={`text-4xl`}>⚡ Electron ⚡</span>
        <span>+</span>
        <span className={"text-5xl"}>Next.js</span>
        <span>+</span>
        <span>tailwindcss</span>
        <span>=</span>
        <span>💕 </span>
      </div>
      <div className="mt-1 w-full flex-wrap flex justify-center">
        <Link href="/foo">Go to next page</Link>
      </div>
    </Fragment>
  );
}
