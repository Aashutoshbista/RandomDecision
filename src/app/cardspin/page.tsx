import Head from "next/head";
import ComingSoon from "@/components/commingSoon/ComingSoon";

export default function CardSpin() {
  return (
    <>
      <Head>
        <title>Card Spin | RandomDecision</title>
        <meta name="description" content="Card Spin is coming soon on RandomDecision! Enjoy fun tools like the spinning wheel, coin flip, and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ComingSoon />
    </>
  );
}
