import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react/jsx-runtime";

export default function NextPage() {
  return (
    <Fragment>
      <div className="grid grid-col-1 text-2xl w-full text-center">
        <div>
          <Image
            className="ml-auto mr-auto"
            src="/images/logo.png"
            alt="Logo image"
            width={256}
            height={256}
          />
        </div>
        <span>⚡ Nextron ⚡</span>
      </div>
      <div className="mt-1 w-full flex-wrap flex justify-center">
        <Link href="/home">Go to home page</Link>
      </div>
    </Fragment>
  );
}
