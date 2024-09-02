// pages/signup.js
import { SignUp } from '@clerk/nextjs';

const Signup = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
            <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">Sign Up</h1>
                <SignUp
                    afterSignUpUrl="/company-details" // Redirect to company details after sign-up
                />
            </div>
        </div>
    );
};

export default Signup;
