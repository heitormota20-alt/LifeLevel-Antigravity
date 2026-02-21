import React, { useState } from 'react'
import { supabase } from './supabaseClient'
import { LogIn, UserPlus, Mail, Lock, Loader2, Sparkles, Flame } from 'lucide-react'

export default function AuthModal({ onComplete }) {
    const [isLogin, setIsLogin] = useState(true)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [error, setError] = useState(null)

    const handleAuth = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password
                })
                if (error) throw error
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: fullName,
                            character_class: 'CLTROUXA' // Default class
                        }
                    }
                })
                if (error) throw error
                setError('Verifique seu e-mail para confirmar o cadastro!')
                return
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-deep/95 backdrop-blur-md animate-fade-in">
            <div className="w-full max-w-md bg-[#0d1117] border border-white/5 rounded-[32px] p-8 shadow-2xl relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange/10 blur-[80px] rounded-full" />

                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl bg-orange flex items-center justify-center mb-6 shadow-lg shadow-orange/20">
                        <Flame size={32} className="text-deep fill-deep" />
                    </div>

                    <h2 className="font-pixel text-2xl text-bright mb-2 tracking-[2px]">
                        {isLogin ? 'BEM-VINDO' : 'NOVO HERÓI'}
                    </h2>
                    <p className="font-pixel text-[10px] text-dim uppercase tracking-[3px] mb-8">
                        {isLogin ? 'CONECTE-SE AO SEU DESTINO' : 'INICIE SUA JORNADA HOJE'}
                    </p>

                    <form onSubmit={handleAuth} className="w-full space-y-4">
                        {!isLogin && (
                            <div className="relative">
                                <UserPlus size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-dim" />
                                <input
                                    type="text"
                                    placeholder="NOME COMPLETO"
                                    className="w-full bg-surface border border-white/5 rounded-2xl py-4 pl-12 pr-4 font-pixel text-[10px] text-bright outline-none focus:border-orange/50 transition-all"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                />
                            </div>
                        )}

                        <div className="relative">
                            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-dim" />
                            <input
                                type="email"
                                placeholder="E-MAIL"
                                className="w-full bg-surface border border-white/5 rounded-2xl py-4 pl-12 pr-4 font-pixel text-[10px] text-bright outline-none focus:border-orange/50 transition-all"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="relative">
                            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-dim" />
                            <input
                                type="password"
                                placeholder="SENHA"
                                className="w-full bg-surface border border-white/5 rounded-2xl py-4 pl-12 pr-4 font-pixel text-[10px] text-bright outline-none focus:border-orange/50 transition-all"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && (
                            <div className="bg-hp-red/10 border border-hp-red/20 rounded-xl p-3">
                                <p className="font-pixel text-[8px] text-hp-red text-center leading-relaxed">
                                    {error}
                                </p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange hover:bg-[#ff8533] text-deep font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-orange/20 disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    <Sparkles size={18} />
                                    <span className="font-pixel text-[10px] tracking-[2px]">
                                        {isLogin ? 'ENTRAR NA ARENA' : 'CRIAR CONTA'}
                                    </span>
                                </>
                            )}
                        </button>
                    </form>

                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="mt-6 font-pixel text-[8px] text-dim hover:text-bright uppercase tracking-[2px] transition-colors"
                    >
                        {isLogin ? 'NÃO TEM CONTA? CADASTRE-SE' : 'JÁ TEM CONTA? FAÇA LOGIN'}
                    </button>
                </div>
            </div>
        </div>
    )
}
