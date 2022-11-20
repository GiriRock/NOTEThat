import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

const Container: React.FC = () => {

    const [error, setError] = React.useState('')
    const [username, setUserName] = React.useState('')
    const [password, setPassword] = React.useState('')

    const router = useRouter()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        const loader = document.getElementById('loader')
        const form = document.getElementById('form')
        if (loader) {
            if(form){
                loader.style.display = 'block'
                form.style.display = 'none'
            }
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": username,
                "password": password
            })
        })
        if (response.status == 401) {
            setError('Invalid Username or password')
        } else {
            console.log('sucess')
             return router.replace('/notes')
        }
        if (loader){
            if(form){
                loader.style.display = 'none'
                form.style.display = 'block'
            }
        }
    }
    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="p-12 w-4/5 m-auto bg-white rounded-md border border-black/30 shadow-md md:w-3/4 lg:max-w-xl">
                <div className='hidden' id='loader'>
                    <ThreeDots
                        height="100"
                        width="100"
                        radius="10"
                        color="#7e22ce"
                        ariaLabel="three-dots-loading"
                        wrapperClass='justify-center'
                    />
                </div>
                <div id = 'form'>
                    <h1 className="text-3xl font-semibold text-center text-black">
                        Sign in
                    </h1>

                    {error && (
                        <h1 className='p-3 text-2xl font-semibold text-center text-red-500'>{error}</h1>
                    )}
                    <form
                        onSubmit={(e) => handleSubmit(e)}
                        className="mt-6">
                        <div className="mb-2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Email
                            </label>
                            <input
                                placeholder='Enter The Username'
                                type="email"
                                onChange={(e) => setUserName(e.target.value)}
                                required
                                className="block w-full px-4 py-2 mt-2 text-white bg-black border border-black rounded-md focus:bg-white focus:outline-none focus:text-black"
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Enter The Password'
                                required
                                className="block w-full px-4 py-2 mt-2 text-white bg-black border border-black rounded-md focus:bg-white focus:outline-none focus:text-black"
                            />
                        </div>
                        <Link
                            href=""
                            className="text-xs font-semibold text-black hover:underline"
                        >
                            Forget Password?
                        </Link>
                        <div className="mt-6 flex justify-center">
                            <button type='submit'
                                className="w-2/4 px-4 py-2 tracking-wide text-black transition-colors duration-200 transform bg-white border border-black rounded-md hover:bg-black hover:text-white">
                                Login
                            </button>
                        </div>
                    </form>

                    <p className="mt-8 text-xs font-light text-center text-gray-700">
                        &nbsp;
                        Don&apos;t have an account?&nbsp;
                        <Link
                            href="/auth/register"
                            className="font-medium text-black hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Container