import Image from "next/image";
import logo from "../../public/images/logo.png";
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-grey-10">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          alt=""
          height={50}
          width={50}
          src={logo}
          className="mx-auto w-auto"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-700">
          Sign in your account
        </h2>
        <AuthForm />
      </div>
    </div>
  );
}
