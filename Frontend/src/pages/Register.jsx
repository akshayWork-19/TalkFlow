import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/axios';
import { UserPlus, Mail, Lock, User, Shield, AlertCircle } from 'lucide-react'

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'user'
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        try {
            const response = await api.post('/auth/register', formData);
            if (response.data.success) {
                navigate('/login');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Registration Failed')
        }
    }


    return (
        <div className="flex min-h-[80vh] items-center justify-center">
            <div className="w-full max-w-md space-y-8 rounded-2xl border bg-card p-8 shadow-xl">
                <div className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <UserPlus className="h-6 w-6" />
                    </div>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight">
                        Create Account
                    </h2>
                    <p className="mt-2 text-muted-foreground">Join the TalkFlow community
                    </p>
                </div>

                {error && (<div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                </div>)
                }

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-1">
                        <label className="text-sm font-medium">Username</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <input type="text" required className="flex h-10 w-full rounded-md border border-input bg-background px-10 py-2 text-sm outline-none focus:ring-2 focus:ring-primary" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <input type="email" required className="flex h-10 w-full rounded-md border border-input bg-background px-10 py-2 text-sm outline-none focus:ring-2 focus:ring-primary" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <input type="password" required className="flex h-10 w-full rounded-md border border-input bg-background px-10 py-2 text-sm outline-none focus:ring-2 focus:ring-primary" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                        </div>
                    </div>


                    <div className="space-y-1">
                        <label className="text-sm font-medium">Role</label>
                        <div className="relative">
                            <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-10 py-2 text-sm outline-none focus:ring-2 focus:ring-primary appearance-none"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-md bg-primary py-2 font-bold text-primary-foreground hover:bg-primary/90 transition-colors mt-4"
                    >
                        Create Account
                    </button>


                </form>

                <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-primary hover:underline">
                        Login here
                    </Link>
                </p>


            </div>

        </div >
    )
}