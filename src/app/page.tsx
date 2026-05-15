import Link from "next/link";

const Home = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>
        Click{" "}
        <Link href="/document/123">
          <span className="text-underline">here</span>
        </Link>{" "}
        to redirect.
      </p>
    </div>
  );
};
export default Home;
