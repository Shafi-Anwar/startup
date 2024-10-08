import { SignIn } from '@clerk/nextjs';

const SignInPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <SignIn
                signInUrl="/sign-in"
                afterSignInUrl="/company-details" // Redirect here after sign-in
            />
        </div>
    );
};

export default SignInPage;
