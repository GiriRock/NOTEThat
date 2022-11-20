import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

const Container: React.FC = () => {

    const [error, setError] = React.useState('')
    const [username, setUserName] = React.useState('')
    const [name, setName] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [cpassword, setCPassword] = React.useState('')
    
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
        if (password != cpassword){
            if (loader){
                if(form){
                    loader.style.display = 'none'
                    form.style.display = 'block'
                }
            }
           return setError('Passwords Must Match')
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": username,
                "name": name,
                "password": password
            })
        })
        if (loader){
            if(form){
                loader.style.display = 'none'
                form.style.display = 'block'
            }
        }

        if (response.status == 200) {
            router.replace('/auth/login')
            
        } else {
            const data = await response.json()
            setError(data.message)
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
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
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
                    <h1 className="text-3xl font-semibold text-center text-purple-700 underline ">
                        Sign up
                    </h1>

                    {error && (
                        <h1 className='p-3 text-2xl font-semibold text-center text-red-500'>{error}</h1>
                    )}
                    <form
                        onSubmit={(e) => handleSubmit(e)}
                        className="mt-6">
                        <div className="mb-2">
                            <label
                                htmlFor="text"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Full Name
                            </label>
                            <input
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                onChange={(e) => setUserName(e.target.value)}
                                required
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
                                required
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold text-gray-800"
                            >
                               Confirm Password
                            </label>
                            <input
                                type="password"
                                onChange={(e) => setCPassword(e.target.value)}
                                required
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <a
                            href=""
                            className="text-xs text-purple-600 hover:underline"
                        >
                            Forget Password?
                        </a>
                        <div className="mt-6">
                            <button type='submit'
                                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                Register
                            </button>
                        </div>
                    </form>

                    <p className="mt-8 text-xs font-light text-center text-gray-700">
                        &nbsp;
                        already have an account?&nbsp;
                        <Link
                            href="/auth/login"
                            className="font-medium text-purple-600 hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Container