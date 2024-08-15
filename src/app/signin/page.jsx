import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function SignIn() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign In</h1>
        <LoginLink>
          <button
            type="button"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          >
            Sign in 
          </button>
        </LoginLink>
      </div>
    </div>
  );
}
