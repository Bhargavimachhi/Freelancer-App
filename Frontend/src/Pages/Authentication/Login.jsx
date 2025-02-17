import { SignIn } from '@clerk/clerk-react'

const LoginPage = () => {
    return (
        <>
            <div className="flex-1 p-8 flex items-center justify-center mt-20">
                <SignIn />
            </div>
        </>
    )
}

export default LoginPage;