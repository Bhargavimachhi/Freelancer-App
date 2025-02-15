import { SignUp } from '@clerk/clerk-react'

const SignUpPage = () => {
    return (
        <>
            <div className="flex-1 p-8 flex items-center justify-center mt-10">
                <SignUp />
            </div>
        </>
    )
}

export default SignUpPage;