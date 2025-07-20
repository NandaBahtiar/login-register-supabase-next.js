'use client'
import { login, signup } from './actions'
import { useState } from 'react'

export default function LoginPage() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async (formData: FormData) => {
        setErrorMessage(null) // Clear previous errors
        setIsLoading(true)
        const result = await login(formData)
        if (!result.success) {
            setErrorMessage(result.message || 'Login failed')
        }
        setIsLoading(false)
    }

    const handleSignup = async (formData: FormData) => {
        setErrorMessage(null) // Clear previous errors
        setIsLoading(true)
        const result = await signup(formData)
        if (!result.success) {
            setErrorMessage(result.message || 'Signup failed')
        }
        setIsLoading(false)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-900">Login</h1>
                {errorMessage && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline"> {errorMessage}</span>
                    </div>
                )}
                <form className="space-y-6">
                    <div>
                        <label className="text-sm font-medium text-gray-900" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-full text-gray-700  px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            id="email"
                            name="email"
                            type="email"
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-900" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="w-full text-gray-700 px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            id="password"
                            name="password"
                            type="password"
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={(e) => {
                                e.preventDefault()
                                const formData = new FormData(e.currentTarget.form!)
                                handleLogin(formData)
                            }}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Loading...' : 'Log in'}
                        </button>
                        <button
                            className="px-4 py-2 font-medium text-indigo-600 bg-transparent rounded-md hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={(e) => {
                                e.preventDefault()
                                const formData = new FormData(e.currentTarget.form!)
                                handleSignup(formData)
                            }}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Loading...' : 'Sign up'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
