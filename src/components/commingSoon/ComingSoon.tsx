import { FaRegFaceSadTear } from "react-icons/fa6";
import Head from "next/head";

export default function ComingSoon() {
  return (
    <>
      <Head>
        <title>Page Under Maintenance | RandomDecision</title>
        <meta name="description" content="This page is currently under maintenance. Please check back soon." />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <main className="flex justify-center items-center h-screen w-full bg-gray-50">
        <section
          className="flex justify-center items-center space-x-4 text-center"
          aria-label="Maintenance message"
        >
          <h1 className="text-xl font-semibold text-gray-800">
            Sorry, this page is under maintenance
          </h1>
          <FaRegFaceSadTear className="text-4xl text-blue-600" aria-hidden />
        </section>
      </main>
    </>
  );
}
