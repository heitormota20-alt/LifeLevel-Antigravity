import React, { useState, useEffect } from 'react'
import {
    Swords,
    Shield,
    Flame,
    Trophy,
    TrendingUp,
    CheckCircle2,
    Plus,
    Dumbbell,
    Zap,
    Star,
    Skull,
    Ghost,
    Target,
    Heart,
    Home,
    ClipboardList,
    Utensils,
    Users,
    Droplets,
    MessageSquare,
    Clock,
    Briefcase,
    Crown,
    HelpCircle,
    Pill,
    Globe,
    RotateCcw,
    Activity,
    Check,
    User
} from 'lucide-react'

// --- CONSTANTS ---
const CLASSES = [
    { id: 'PJEGUE', name: 'PJEGUE', desc: 'O tanque da rotina. Trabalha incansavelmente e resiste ao caos corporativo.', icon: Briefcase },
    { id: 'CLTROUXA', name: 'CLTROUXA', desc: 'O herói invisível do sistema. Mestre em bater ponto e sobreviver a reuniões.', icon: Clock },
    { id: 'HERDEIRO', name: 'HERDEIRO', desc: 'Dificuldade: Very Easy. O mundo já é seu, você só está de passagem.', icon: Crown },
    { id: 'MAROMBA', name: 'MAROMBA', desc: 'Focado na estética e no poder bruto. O corpo é seu templo e seu altar.', icon: Dumbbell },
    { id: 'NÃO SEI', name: 'NÃO SEI', desc: 'O viajante perdido entre dimensões. Suas habilidades mudam com o vento.', icon: HelpCircle },
]

const INITIAL_USER = {
    name: '',
    level: 1,
    title: 'NOVATO',
    characterClass: 'NÃO SEI',
    xp: 0,
    maxXp: 100,
    hp: 100,
    maxHp: 100,
    mp: 50,
    maxMp: 50,
    gold: 0,
    combo: 0,
    energy: 0,
    maxEnergy: 2180,
    water: 0,
    maxWater: 2450,
    weight: '',
    height: '',
    goals: [],
    hasHealthIssues: false,
    healthDescription: '',
    medications: [],
    quests: [
        { id: 1, title: 'Acordar cedo 7:00', desc: 'Despertar no horário sagrado para o bônus de produtividade.', category: 'GERAL', xpReward: 15, goldReward: 10, completed: false, createdAt: Date.now() },
        { id: 2, title: 'Café da manhã', desc: 'Poção de energia matinal para começar a jornada.', category: 'DIETA', xpReward: 10, goldReward: 5, completed: false, createdAt: Date.now() },
        { id: 3, title: 'Tomar banho', desc: 'Ritual de purificação para renovar a estamina.', category: 'GERAL', xpReward: 10, goldReward: 5, completed: false, createdAt: Date.now() },
        { id: 4, title: 'Escovar os dentes', desc: 'Manter a armadura do sorriso impecável.', category: 'GERAL', xpReward: 5, goldReward: 2, completed: false, createdAt: Date.now() },
        { id: 5, title: 'Fazer a marmita', desc: 'Alquimia culinária para garantir nutrição futura.', category: 'DIETA', xpReward: 25, goldReward: 15, completed: false, createdAt: Date.now() },
        { id: 6, title: 'Trabalhar', desc: 'A principal batalha diária por ouro e prestígio.', category: 'GERAL', xpReward: 100, goldReward: 50, completed: false, createdAt: Date.now() },
        { id: 7, title: 'Treinar', desc: 'Duelo na arena para aumentar os atributos de força.', category: 'ARENA', xpReward: 50, goldReward: 20, completed: false, createdAt: Date.now() },
        { id: 8, title: 'Jantar', desc: 'Recuperar mana e HP para o fim do turno.', category: 'DIETA', xpReward: 15, goldReward: 10, completed: false, createdAt: Date.now() },
        { id: 9, title: 'Dormir Cedo', desc: 'Entrar em estado de repouso para regeneração total.', category: 'GERAL', xpReward: 30, goldReward: 20, completed: false, createdAt: Date.now() },
    ],
    lastLoginDate: new Date().toLocaleDateString(),
    onboarded: false
}

// --- WORKOUT DATA ---
const WORKOUTS = {
    superiores: [
        { id: 's1', name: 'Flexão de Braço', detail: '3 séries de 12 repetições' },
        { id: 's2', name: 'Barra Fixa (ou Remada)', detail: '3 séries de 8 repetições' },
        { id: 's3', name: 'Desenvolvimento', detail: '3 séries de 10 repetições' },
        { id: 's4', name: 'Tríceps Banco', detail: '3 séries de 12 repetições' },
        { id: 's5', name: 'Rosca Direta', detail: '3 séries de 12 repetições' },
    ],
    inferiores: [
        { id: 'i1', name: 'Agachamento Livre', detail: '4 séries de 15 repetições' },
        { id: 'i2', name: 'Avanço (Passada)', detail: '3 séries de 12 repetições' },
        { id: 'i3', name: 'Stiff ou Flexão Nórdica', detail: '3 séries de 12 repetições' },
        { id: 'i4', name: 'Elevação Pélvica', detail: '3 séries de 15 repetições' },
        { id: 'i5', name: 'Panturrilha em Pé', detail: '4 séries de 20 repetições' },
    ]
}

// --- ONBOARDING COMPONENT ---
function Onboarding({ onComplete, onCancel }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        weight: '',
        height: '',
        goals: [],
        characterClass: 'NÃO SEI',
        hasHealthIssues: false,
        healthDescription: '',
        medications: []
    });

    const [medInput, setMedInput] = useState({ name: '', time: '' });

    const nextStep = () => {
        if (step === 1 && !formData.name) return alert('Escolha um nome!');
        setStep(step + 1);
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-deep">
            <div className="w-full max-w-xl animate-slide-up">
                <div className="premium-card glass text-center border-violet">
                    <p className="font-pixel text-[8px] mb-8 text-violet">CRIAÇÃO DE PERSONAGEM - ETAPA {step} / 4</p>

                    {step === 1 && (
                        <div className="space-y-6">
                            <input
                                placeholder="NOME DO HERÓI"
                                className="w-full uppercase text-center py-4"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input placeholder="PESO (KG)" type="number" className="text-center" value={formData.weight} onChange={e => setFormData({ ...formData, weight: e.target.value })} />
                                <input placeholder="ALTURA (CM)" type="number" className="text-center" value={formData.height} onChange={e => setFormData({ ...formData, height: e.target.value })} />
                            </div>
                            <div className="space-y-4">
                                <button onClick={nextStep} className="btn-premium w-full">PRÓXIMO</button>
                                <button onClick={onCancel} className="w-full text-[8px] font-pixel text-dim hover:text-white transition-colors uppercase">
                                    Voltar
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <p className="font-pixel text-[10px] mb-6 text-violet">QUAL O SEU DESTINO? (OBJETIVOS)</p>
                            <div className="grid grid-cols-1 gap-3">
                                {[
                                    { id: 'Controlar rotina', label: 'Controlar rotina', icon: ClipboardList },
                                    { id: 'Ganhar massa', label: 'Ganhar massa', icon: Dumbbell },
                                    { id: 'Emagrecer', label: 'Emagrecer', icon: TrendingUp },
                                    { id: 'Gamificar Vida', label: 'Gamificar Vida', icon: Zap },
                                ].map(goal => (
                                    <div
                                        key={goal.id}
                                        onClick={() => setFormData({ ...formData, goals: formData.goals.includes(goal.id) ? formData.goals.filter(g => g !== goal.id) : [...formData.goals, goal.id] })}
                                        className={`selectable-card ${formData.goals.includes(goal.id) ? 'selected pulse-selected' : ''}`}
                                    >
                                        <div className={`p-3 rounded-lg ${formData.goals.includes(goal.id) ? 'bg-violet' : 'bg-surface'}`}>
                                            <goal.icon size={24} className={formData.goals.includes(goal.id) ? 'text-white' : 'text-violet'} />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <h4 className={`font-pixel text-[9px] uppercase ${formData.goals.includes(goal.id) ? 'text-white' : 'text-dim'}`}>
                                                {goal.label}
                                            </h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button onClick={nextStep} className="btn-premium w-full mt-8">PRÓXIMO</button>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4">
                            <p className="font-pixel text-[10px] text-violet mb-6 uppercase">Escolha sua Classe</p>
                            <div className="grid gap-3">
                                {CLASSES.map(cls => (
                                    <div
                                        key={cls.id}
                                        onClick={() => setFormData({ ...formData, characterClass: cls.id })}
                                        className={`selectable-card ${formData.characterClass === cls.id ? 'selected pulse-selected' : ''}`}
                                    >
                                        <div className={`p-3 rounded-lg ${formData.characterClass === cls.id ? 'bg-violet' : 'bg-surface'}`}>
                                            <cls.icon size={24} className={formData.characterClass === cls.id ? 'text-white' : 'text-violet'} />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className={`font-pixel text-[9px] mb-1 ${formData.characterClass === cls.id ? 'text-white' : 'text-bright'}`}>{cls.name}</h4>
                                            <p className="text-xs text-dim leading-tight">{cls.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button onClick={nextStep} className="btn-premium w-full mt-8">PRÓXIMO</button>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-6 text-left animate-slide-up">
                            <div>
                                <p className="font-pixel text-[8px] text-center text-violet mb-4">CONDIÇÕES DE SAÚDE</p>
                                <div className="selectable-card" onClick={() => setFormData({ ...formData, hasHealthIssues: !formData.hasHealthIssues })}>
                                    <div className={`p-2 rounded-lg ${formData.hasHealthIssues ? 'bg-hp-red' : 'bg-surface'}`}>
                                        <Heart size={20} className={formData.hasHealthIssues ? 'text-white' : 'text-dim'} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold">POSSUI PROBLEMAS DE SAÚDE?</h4>
                                        <p className="text-xs text-dim">{formData.hasHealthIssues ? 'Sim, eu tenho condições que requerem atenção.' : 'Não, estou com a saúde em dia.'}</p>
                                    </div>
                                    <div className={`w-6 h-6 border-2 flex items-center justify-center ${formData.hasHealthIssues ? 'border-hp-red bg-hp-red/20' : 'border-border'}`}>
                                        {formData.hasHealthIssues && <CheckCircle2 size={14} className="text-hp-red" />}
                                    </div>
                                </div>
                            </div>

                            {formData.hasHealthIssues && (
                                <textarea
                                    placeholder="DESCREVA BREVEMENTE SUA CONDIÇÃO..."
                                    className="w-full h-24 p-4 text-sm"
                                    value={formData.healthDescription}
                                    onChange={e => setFormData({ ...formData, healthDescription: e.target.value })}
                                />
                            )}

                            <div className="premium-card bg-surface/50 border-violet/30 p-4">
                                <p className="font-pixel text-[8px] text-violet mb-4">GERENCIAR POÇÕES (REMÉDIOS)</p>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <div style={{ flex: '3' }}>
                                            <input
                                                placeholder="Nome do remédio"
                                                className="text-xs py-2 px-3 bg-surface border border-border rounded-lg text-white w-full"
                                                value={medInput.name}
                                                onChange={e => setMedInput({ ...medInput, name: e.target.value })}
                                            />
                                        </div>
                                        <div style={{ flex: '1' }}>
                                            <input
                                                type="time"
                                                className="med-time-input text-xs py-2 px-3 bg-surface border border-border rounded-lg text-white w-full text-center"
                                                value={medInput.time}
                                                onChange={e => setMedInput({ ...medInput, time: e.target.value })}
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (medInput.name && medInput.time) {
                                                    setFormData({
                                                        ...formData,
                                                        medications: [...formData.medications, { id: Date.now(), ...medInput }]
                                                    });
                                                    setMedInput({ name: '', time: '' });
                                                }
                                            }}
                                            className="bg-violet hover:bg-violet-light text-white w-10 h-10 flex items-center justify-center rounded-lg transition-colors flex-shrink-0"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    {formData.medications.length > 0 && (
                                        <div className="grid gap-2 mt-4">
                                            {formData.medications.map(med => (
                                                <div key={med.id} className="flex justify-between items-center bg-deep p-3 rounded-lg border border-border">
                                                    <div className="flex items-center gap-3">
                                                        <Pill size={16} className="text-hp-red" />
                                                        <span className="text-xs font-bold">{med.name} - {med.time}</span>
                                                    </div>
                                                    <button
                                                        onClick={() => setFormData({ ...formData, medications: formData.medications.filter(m => m.id !== med.id) })}
                                                        className="text-hp-red hover:text-white transition-colors"
                                                    >
                                                        <Skull size={14} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <button onClick={() => onComplete(formData)} className="btn-premium w-full text-[10px] py-4">
                                    INICIAR JORNADA
                                </button>
                                <button onClick={() => setStep(3)} className="w-full text-[8px] font-pixel text-dim hover:text-white transition-colors uppercase">
                                    Voltar
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

// --- MAIN APP ---
export default function App() {
    const [activeTab, setActiveTab] = useState('inicio');
    const [workoutType, setWorkoutType] = useState('superiores');
    const [workoutDone, setWorkoutDone] = useState([]);
    const [completingQuestId, setCompletingQuestId] = useState(null);
    const [selectedDay, setSelectedDay] = useState(new Date().getDay());
    const [isProtocolActive, setIsProtocolActive] = useState(false);
    const [showFailModal, setShowFailModal] = useState(false);
    const [showNewQuestModal, setShowNewQuestModal] = useState(false);
    const [newQuestData, setNewQuestData] = useState({ title: '', time: '' });

    const [profiles, setProfiles] = useState(() => {
        try {
            const saved = localStorage.getItem('life-level-profiles-v1');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    });

    const [currentProfileId, setCurrentProfileId] = useState(null);

    const [user, setUser] = useState(INITIAL_USER);
    const [isCreatingProfile, setIsCreatingProfile] = useState(false);

    useEffect(() => {
        if (currentProfileId) {
            const activeProfile = profiles.find(p => p.id === currentProfileId);
            if (activeProfile) {
                setUser(activeProfile);
            }
        }
    }, [currentProfileId, profiles]);

    useEffect(() => {
        if (profiles.length > 0) {
            localStorage.setItem('life-level-profiles-v1', JSON.stringify(profiles));
        }
    }, [profiles]);

    useEffect(() => {
        if (currentProfileId) {
            localStorage.setItem('life-level-active-profile-v1', currentProfileId);
        }
    }, [currentProfileId]);

    useEffect(() => {
        if (currentProfileId && user.id === currentProfileId) {
            setProfiles(prev => prev.map(p => p.id === user.id ? user : p));
        }
    }, [user]);

    // Daily Reset Logic
    useEffect(() => {
        const today = new Date().toLocaleDateString();
        if (user.onboarded && user.lastLoginDate !== today) {
            setUser(prev => ({
                ...prev,
                lastLoginDate: today,
                quests: prev.quests.map(q => ({ ...q, completed: false })),
                energy: 0,
                water: 0
            }));
            setWorkoutDone([]);
        }
    }, []);

    const handleOnboardingComplete = (data) => {
        const medQuests = data.medications.map(med => ({
            id: `med-${med.id}`,
            title: `Tomar ${med.name}`,
            desc: `Horário: ${med.time}. Manter a saúde é essencial para o herói.`,
            category: 'SAÚDE',
            time: med.time,
            xpReward: 20,
            goldReward: 10,
            completed: false,
            createdAt: Date.now()
        }));

        const newUser = {
            ...INITIAL_USER,
            ...data,
            id: `profile-${Date.now()}`,
            quests: [...INITIAL_USER.quests, ...medQuests],
            onboarded: true
        };

        setProfiles(prev => [...prev, newUser]);
        setCurrentProfileId(newUser.id);
        setIsCreatingProfile(false);
    }

    const handleComplete = (id) => {
        setCompletingQuestId(id);

        // Wait for animation to finish before updating state
        setTimeout(() => {
            setUser(prev => {
                const q = prev.quests.find(x => x.id === id)
                if (!q || q.completed) return prev
                let nxp = prev.xp + q.xpReward
                let nlvl = prev.level
                let nmaxXp = prev.maxXp
                if (nxp >= prev.maxXp) {
                    nlvl++
                    nxp -= prev.maxXp
                    nmaxXp = Math.floor(prev.maxXp * 1.5)
                }
                return {
                    ...prev,
                    xp: nxp,
                    level: nlvl,
                    maxXp: nmaxXp,
                    gold: prev.gold + q.goldReward,
                    quests: prev.quests.map(x => x.id === id ? { ...x, completed: true } : x)
                }
            });
            setCompletingQuestId(null);
        }, 500);
    }

    const addWater = (amount) => {
        setUser(prev => ({ ...prev, water: Math.min(prev.water + amount, prev.maxWater) }))
    }

    const getQuestColor = (xp) => {
        if (xp <= 10) return '#06b6d4' // Common
        if (xp <= 30) return '#6e56cf' // Rare
        return '#fbbf24' // Legendary
    }

    const isWorkoutComplete = () => {
        const currentExercises = WORKOUTS[workoutType];
        return currentExercises.every(ex => workoutDone.includes(ex.id));
    }

    if (!currentProfileId && !isCreatingProfile) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-deep">
                <div className="w-full max-w-xl animate-slide-up">
                    <div className="premium-card glass text-center border-violet">
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 rounded-2xl bg-violet/20 border border-violet/40 flex items-center justify-center text-violet">
                                <Users size={40} />
                            </div>
                        </div>
                        <h2 className="font-pixel text-sm mb-2 text-white">QUEM ENTRARÁ NA GUILDA?</h2>
                        <p className="text-xs text-dim mb-8">SELECIONE SEU HERÓI OU CRIE UMA NOVA JORNADA</p>

                        <div className="grid gap-4 mb-8">
                            {profiles.map(profile => (
                                <div
                                    key={profile.id}
                                    onClick={() => setCurrentProfileId(profile.id)}
                                    className="selectable-card group"
                                >
                                    <div className="w-12 h-12 rounded-xl border border-border overflow-hidden bg-surface">
                                        <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${profile.name}`} alt="Avatar" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h4 className="font-pixel text-[9px] text-white uppercase">{profile.name}</h4>
                                        <p className="text-[7px] text-dim uppercase">NÍVEL {profile.level} • {profile.characterClass}</p>
                                    </div>
                                    <div className="text-violet opacity-0 group-hover:opacity-100 transition-opacity">
                                        <TrendingUp size={16} />
                                    </div>
                                </div>
                            ))}

                            <button
                                onClick={() => setIsCreatingProfile(true)}
                                className="w-full py-6 border-2 border-dashed border-violet/30 rounded-2xl flex flex-col items-center gap-2 hover:bg-violet/5 hover:border-violet/60 transition-all text-violet"
                            >
                                <Plus size={24} />
                                <span className="font-pixel text-[8px]">NOVO PERSONAGEM</span>
                            </button>
                        </div>

                        {profiles.length > 0 && (
                            <button
                                onClick={() => { if (confirm('Resetar tudo?')) { localStorage.clear(); window.location.reload(); } }}
                                className="text-[7px] font-pixel text-hp-red opacity-30 hover:opacity-100 transition-opacity uppercase tracking-widest"
                            >
                                Limpar Todos os Registros
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    if (isCreatingProfile) {
        return <Onboarding onComplete={handleOnboardingComplete} onCancel={() => setIsCreatingProfile(false)} />
    }
    const toggleExercise = (id) => {
        setWorkoutDone(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    }

    const finishWorkoutQuest = () => {
        if (!isWorkoutComplete()) return alert('Complete todos os exercícios primeiro!');
        const quest = user.quests.find(q => q.title === 'Treinar');
        if (quest && !quest.completed) {
            handleComplete(quest.id);
            setWorkoutDone([]);
            alert('Treino concluído com sucesso! Recompensas recebidas.');
            // Voltar para o início após concluir
            setTimeout(() => setActiveTab('inicio'), 600);
        } else {
            alert('Você já concluiu este treino hoje!');
        }
    }

    const addNewQuest = (e) => {
        e.preventDefault();
        if (!newQuestData.title || !newQuestData.time) return alert('Preencha todos os campos!');

        const timeInMinutes = parseInt(newQuestData.time) || 30;
        let xp = 10;
        if (timeInMinutes > 60) xp += 15;
        if (timeInMinutes > 120) xp += 25;
        if (newQuestData.title.toLowerCase().includes('estudar') || newQuestData.title.toLowerCase().includes('aprender')) xp += 10;

        const newQuest = {
            id: Date.now(),
            title: newQuestData.title,
            desc: `Objetivo definido pelo jogador: ${newQuestData.title}`,
            time: `${timeInMinutes}min`,
            xpReward: xp,
            completed: false
        };

        setUser(prev => ({
            ...prev,
            quests: [...prev.quests, newQuest]
        }));

        setShowNewQuestModal(false);
        setNewQuestData({ title: '', time: '' });
    }

    return (
        <div className="flex-1 p-4 md:p-8 mb-20 min-h-screen bg-deep overflow-x-hidden">
            <div className="container mx-auto">
                {activeTab === 'inicio' && (
                    <>
                        {/* Character Header */}
                        <div className="char-header animate-slide-up">
                            <div className="avatar-frame">
                                <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.name}`} alt="Avatar" />
                            </div>
                            <div className="char-info">
                                <span className="char-level-tag">NÍVEL {user.level} • {user.title}</span>
                                <h1 className="char-name uppercase flex items-center gap-4 flex-wrap">
                                    {user.name}
                                    <span className="text-violet text-sm">/ {user.characterClass}</span>
                                    <button
                                        onClick={() => setCurrentProfileId(null)}
                                        className="text-[10px] text-violet opacity-30 hover:opacity-100 transition-opacity flex items-center gap-1 font-pixel cursor-pointer ml-auto"
                                        title="Trocar Personagem"
                                    >
                                        <Users size={10} /> TROCAR
                                    </button>
                                </h1>

                                <div className="bar-container">
                                    <div className="bar-label">
                                        <span className="text-hp">HP (VITALIDADE)</span>
                                        <span>{user.hp}/{user.maxHp}</span>
                                    </div>
                                    <div className="bar-outer">
                                        <div className="bar-inner bg-hp" style={{ width: '100%' }} />
                                    </div>
                                </div>

                                <div className="bar-container">
                                    <div className="bar-label">
                                        <span className="text-blue">XP (EXPERIÊNCIA)</span>
                                        <span>{Math.round(user.xp)}/{user.maxXp}</span>
                                    </div>
                                    <div className="bar-outer bg-xp">
                                        <div className="bar-inner bg-xp-fill" style={{ width: `${(user.xp / user.maxXp) * 100}%` }} />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="text-center">
                                    <p className="text-[8px] font-pixel text-dim mb-1">OURO</p>
                                    <div className="flex items-center gap-1">
                                        <Zap size={10} className="text-accent-gold" />
                                        <span className="text-sm font-pixel text-accent-gold">{user.gold}</span>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="text-[8px] font-pixel text-dim mb-1">COMBO</p>
                                    <div className="flex items-center gap-1">
                                        <Flame size={10} className="text-orange" />
                                        <span className="text-sm font-pixel text-orange">{user.combo}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Master Message */}
                        <div className="master-say animate-slide-up" style={{ animationDelay: '0.1s' }}>
                            <div className="master-badge">MESTRE DIZ:</div>
                            <div className="w-12 h-12 rounded-lg bg-surface border border-border flex items-center justify-center">
                                <Ghost size={24} className="text-violet" />
                            </div>
                            <div>
                                <p className="text-sm italic">"O aço tempera a alma, aventureiro..."</p>
                                <p className="text-[10px] uppercase font-bold text-violet mt-1 cursor-pointer hover:underline">REGENERAR SABEDORIA (GASTA MANA)</p>
                            </div>
                        </div>

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 lg-grid-cols-2 gap-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="quest-list-title !mb-0">
                                        <ClipboardList size={20} className="text-blue" /> QUESTS ATIVAS
                                    </h2>
                                    <button
                                        onClick={() => setShowNewQuestModal(true)}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue/10 border border-blue/30 rounded-lg text-blue font-pixel text-[8px] hover:bg-blue/20 transition-all"
                                    >
                                        <Plus size={14} /> NOVA QUEST
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {user.quests.filter(q => !q.completed || q.id === completingQuestId).map(q => (
                                        <div
                                            key={q.id}
                                            className={`quest-card ${completingQuestId === q.id ? 'quest-exit' : ''}`}
                                            style={{ borderLeftColor: getQuestColor(q.xpReward) }}
                                        >
                                            <div className="quest-content">
                                                <h3 className="flex flex-col items-start gap-1">
                                                    <span className="flex items-center gap-2 text-sm sm:text-base">
                                                        {q.title}
                                                        {q.time && (
                                                            <span className="text-[9px] bg-bg-surface px-2 py-0.5 rounded-full text-dim font-bold flex items-center gap-1">
                                                                <Clock size={8} /> {q.time}
                                                            </span>
                                                        )}
                                                    </span>
                                                </h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <p className="text-[10px] sm:text-xs">{q.desc}</p>
                                                    <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-surface border border-white/5 font-pixel text-[6px]" style={{ color: getQuestColor(q.xpReward) }}>
                                                        +{q.xpReward} XP
                                                    </span>
                                                </div>
                                            </div>
                                            {!q.completed && (
                                                <div className="quest-actions">
                                                    <button className="btn-icon">
                                                        <Skull size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => q.title === 'Treinar' ? setActiveTab('arena') : handleComplete(q.id)}
                                                        className="btn-icon complete"
                                                    >
                                                        <Swords size={18} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="stat-widget">
                                    <div className="stat-widget-header">
                                        <h3 className="stat-title text-orange"><Flame size={14} /> ENERGIA</h3>
                                        <span className="stat-value">{user.energy} / {user.maxEnergy} KCAL</span>
                                    </div>
                                    <div className="bar-outer bg-xp">
                                        <div className="bar-inner bg-xp-fill" style={{ width: `${(user.energy / user.maxEnergy) * 100}%`, background: '#f76808' }} />
                                    </div>
                                </div>

                                <div className="stat-widget">
                                    <div className="stat-widget-header mb-4">
                                        <h3 className="stat-title text-violet"><Activity size={14} /> PROTOCOLO: {workoutType.toUpperCase()}</h3>
                                        <span className="text-[8px] font-pixel text-dim">{workoutDone.length}/{WORKOUTS[workoutType].length}</span>
                                    </div>
                                    <div className="space-y-3 bg-deep rounded-xl p-3 border border-border/30">
                                        {WORKOUTS[workoutType].map(ex => (
                                            <div
                                                key={ex.id}
                                                onClick={() => toggleExercise(ex.id)}
                                                className="flex items-center justify-between group cursor-pointer"
                                            >
                                                <span className={`text-[10px] font-medium transition-colors ${workoutDone.includes(ex.id) ? 'text-dim line-through' : 'text-bright'}`}>
                                                    {ex.name}
                                                </span>
                                                <div className={`w-4 h-4 border rounded flex items-center justify-center transition-all ${workoutDone.includes(ex.id) ? 'bg-violet border-violet' : 'border-border group-hover:border-violet/50'}`}>
                                                    {workoutDone.includes(ex.id) && <Check size={10} className="text-white" />}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="btn-group mt-4 flex gap-2">
                                        <button
                                            onClick={finishWorkoutQuest}
                                            className={`btn-action flex-1 ${isWorkoutComplete() ? '!border-violet !text-violet bg-violet/10 animate-pulse' : 'opacity-30 cursor-not-allowed'}`}
                                        >
                                            CONCLUIR TREINO
                                        </button>
                                        <button
                                            onClick={() => setShowFailModal(true)}
                                            className="btn-action flex-1 !text-hp-red !border-hp-red !opacity-50"
                                        >
                                            FALHEI NA MISSÃO
                                        </button>
                                    </div>
                                </div>

                                <div className="stat-widget">
                                    <div className="stat-widget-header">
                                        <h3 className="stat-title text-blue"><Droplets size={14} /> VITALIDADE</h3>
                                        <span className="stat-value">{user.water} / {user.maxWater} ML</span>
                                    </div>
                                    <div className="bar-outer bg-xp">
                                        <div className="bar-inner bg-xp-fill" style={{ width: `${(user.water / user.maxWater) * 100}%`, background: '#0091ff' }} />
                                    </div>
                                    <div className="btn-group mt-4 flex gap-2">
                                        <button onClick={() => addWater(250)} className="btn-action flex-1">+250ML</button>
                                        <button onClick={() => addWater(500)} className="btn-action flex-1">+500ML</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'arena' && (
                    <div className="animate-slide-up pb-20 max-w-4xl mx-auto">
                        {/* Oracle Section */}
                        <div className="master-say mb-12 relative p-8 bg-surface/40 border-violet/50 rounded-[32px]">
                            <div className="master-badge !bg-violet-dark text-[7px] px-4 py-1.5 uppercase tracking-[2px]">ORÁCULO</div>
                            <div className="w-16 h-16 rounded-2xl bg-deep border-2 border-violet/30 flex items-center justify-center shadow-[0_0_20px_rgba(110,86,207,0.2)]">
                                <img src="https://api.dicebear.com/7.x/bottts-neutral/svg?seed=oracle&backgroundColor=05070a" className="w-10 h-10" alt="Oracle" />
                            </div>
                            <div className="flex-1">
                                <p className="font-pixel text-sm text-bright italic leading-relaxed">"O Protocolo Anti-Gravity foi iniciado."</p>
                                <p className="font-pixel text-[7px] text-violet mt-3 uppercase tracking-[2px] opacity-70">Sincronizar com o vácuo</p>
                            </div>
                        </div>

                        {/* Day Selector */}
                        <div className="flex justify-center gap-3 mb-12">
                            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, idx) => (
                                <button
                                    key={day}
                                    onClick={() => setSelectedDay(idx)}
                                    className={`w-14 h-10 rounded-xl font-pixel text-[8px] transition-all flex items-center justify-center border ${selectedDay === idx ? 'bg-violet border-violet text-white shadow-[0_4px_15px_rgba(110,86,207,0.4)]' : 'bg-surface/50 border-border md:hover:border-violet/50 text-dim'}`}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>

                        {/* Protocol Area */}
                        <div className="premium-card p-12 bg-surface/20 border-violet/20 rounded-[40px] text-center mb-8 min-h-[400px] flex flex-col justify-center items-center relative overflow-hidden">
                            {!isProtocolActive ? (
                                <div className="space-y-12 animate-slide-up w-full">
                                    <h2 className="font-pixel text-sm text-dim tracking-[4px] opacity-50 uppercase">
                                        FORGE ANTI-GRAVITY: {workoutType === 'superiores' ? 'SUPERIOR' : 'INFERIOR'}
                                    </h2>

                                    <div className="flex gap-6 justify-center">
                                        <button
                                            onClick={() => setWorkoutType('superiores')}
                                            className={`px-6 py-3 rounded-full font-pixel text-[7px] border transition-all ${workoutType === 'superiores' ? 'bg-violet border-violet text-white' : 'bg-deep border-border text-dim'}`}
                                        >
                                            SUPERIOR
                                        </button>
                                        <button
                                            onClick={() => setWorkoutType('inferiores')}
                                            className={`px-6 py-3 rounded-full font-pixel text-[7px] border transition-all ${workoutType === 'inferiores' ? 'bg-hp-red border-hp-red text-white' : 'bg-deep border-border text-dim'}`}
                                        >
                                            INFERIOR
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => setIsProtocolActive(true)}
                                        className="btn-premium max-w-sm mx-auto !h-16 !rounded-2xl shadow-[0_0_30px_rgba(110,86,207,0.3)] hover:scale-105 transition-transform"
                                    >
                                        INVOCAR PROTOCOLO IA
                                    </button>
                                </div>
                            ) : (
                                <div className="w-full animate-slide-up">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="font-pixel text-[10px] text-violet uppercase tracking-widest">Protocolo Ativo: {workoutType}</h3>
                                        <button
                                            onClick={() => { setIsProtocolActive(false); setWorkoutDone([]); }}
                                            className="font-pixel text-[7px] text-dim hover:text-hp-red transition-colors"
                                        >
                                            [ CANCELAR ]
                                        </button>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left font-pixel">
                                            <thead>
                                                <tr className="border-b border-border/50">
                                                    <th className="py-4 text-[7px] text-dim uppercase">NOME</th>
                                                    <th className="py-4 text-[7px] text-dim uppercase text-center">CARGA</th>
                                                    <th className="py-4 text-[7px] text-dim text-right pr-4 uppercase">CHECK</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {WORKOUTS[workoutType].map(ex => (
                                                    <tr
                                                        key={ex.id}
                                                        onClick={() => toggleExercise(ex.id)}
                                                        className="border-b border-border/20 hover:bg-violet/5 transition-colors cursor-pointer group"
                                                    >
                                                        <td className="py-5">
                                                            <span className="text-xs font-bold text-bright tracking-wide block">{ex.name}</span>
                                                        </td>
                                                        <td className="py-5 text-center">
                                                            <span className="text-[7px] text-violet bg-violet/10 px-3 py-1.5 rounded-lg border border-violet/20">
                                                                {ex.detail}
                                                            </span>
                                                        </td>
                                                        <td className="py-5 text-right pr-4">
                                                            <div className={`w-6 h-6 border-2 flex items-center justify-center rounded-lg transition-all ml-auto ${workoutDone.includes(ex.id) ? 'bg-violet border-violet shadow-[0_0_10px_rgba(110,86,207,0.5)]' : 'border-border group-hover:border-violet/50'}`}>
                                                                {workoutDone.includes(ex.id) && <CheckCircle2 size={12} className="text-white" />}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="mt-12 space-y-8">
                                        <div className="w-full bg-deep h-1.5 rounded-full overflow-hidden border border-border/30">
                                            <div
                                                className="h-full bg-violet shadow-[0_0_15px_purple] transition-all duration-700 ease-out"
                                                style={{ width: `${(workoutDone.length / WORKOUTS[workoutType].length) * 100}%` }}
                                            />
                                        </div>
                                        <button
                                            onClick={finishWorkoutQuest}
                                            className={`btn-premium !h-14 !rounded-xl text-[9px] ${isWorkoutComplete() ? 'animate-pulse' : 'opacity-30 grayscale cursor-not-allowed'}`}
                                        >
                                            SINCRONIZAR PROGRESSO
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Bottom Navigation (Fixed at bottom) */}
                <nav className="bottom-nav">
                    <div onClick={() => setActiveTab('inicio')} className={`nav-item ${activeTab === 'inicio' ? 'active' : ''}`}>
                        <Home size={20} /><span>INÍCIO</span>
                    </div>
                    <div onClick={() => setActiveTab('inicio')} className="nav-item">
                        <ClipboardList size={20} /><span>QUESTS</span>
                    </div>
                    <div onClick={() => setActiveTab('arena')} className={`nav-item ${activeTab === 'arena' ? 'active' : ''}`}>
                        <TrendingUp size={20} /><span>ARENA</span>
                    </div>
                    <div className="nav-item"><Utensils size={20} /><span>DIETA</span></div>
                    <div className="nav-item"><Users size={20} /><span>PERFIS</span></div>
                </nav>

                {/* Fail Modal */}
                {showFailModal && (
                    <div className="modal-overlay">
                        <div className="fail-modal">
                            <div className="flex justify-center gap-4 text-4xl mb-6">
                                <span>🧙‍♂️</span>
                                <span className="text-hp-red animate-pulse">💢</span>
                            </div>

                            <h2 className="fail-title">
                                O MESTRE TE ENCARA COM DESPREZO!
                            </h2>

                            <p className="fail-quote">
                                "Achei que era um Maromba, mas tá mais pra um NPC de fundo de cenário. Acorda pra vida!"
                            </p>

                            <p className="fail-positive">
                                "AMANHÃ VOCÊ TEM UMA NOVA CHANCE DE NÃO SER UMA VERGONHA PARA ESTA GUILDA!"
                            </p>

                            <button
                                onClick={() => setShowFailModal(false)}
                                className="btn-humiliation"
                            >
                                ACEITAR A HUMILHAÇÃO E VOLTAR
                            </button>
                        </div>
                    </div>
                )}
                {/* New Quest Modal */}
                {showNewQuestModal && (
                    <div className="modal-overlay">
                        <div className="premium-card max-w-xl animate-slide-up !bg-[#0d1117] !border-blue/30 shadow-[0_0_50px_rgba(0,145,255,0.15)] text-center">
                            <h2 className="font-pixel text-[10px] mb-10 flex items-center justify-center gap-3 text-blue">
                                <Plus size={20} /> FORJAR NOVA QUEST
                            </h2>
                            <form onSubmit={addNewQuest} className="space-y-8">
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <label className="font-pixel text-[7px] text-dim block uppercase tracking-widest">Nome da Tarefa</label>
                                        <input
                                            type="text"
                                            placeholder="Ex: Dominar Alquimia Digital"
                                            className="w-full text-center py-4 uppercase border-border/40 focus:border-blue/60"
                                            value={newQuestData.title}
                                            onChange={e => setNewQuestData(prev => ({ ...prev, title: e.target.value }))}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="font-pixel text-[7px] text-dim block uppercase tracking-widest">Tempo Estimado (Minutos)</label>
                                        <input
                                            type="number"
                                            placeholder="60"
                                            className="w-full text-center py-4 border-border/40 focus:border-blue/60"
                                            value={newQuestData.time}
                                            onChange={e => setNewQuestData(prev => ({ ...prev, time: e.target.value }))}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="p-5 bg-deep/50 rounded-2xl border border-blue/20">
                                    <p className="font-pixel text-[6px] text-blue/80 leading-relaxed uppercase">
                                        "O Oráculo analisará sua tarefa para definir a recompensa em XP e sua raridade."
                                    </p>
                                </div>
                                <div className="space-y-3 pt-4">
                                    <button
                                        type="submit"
                                        className="btn-premium !bg-blue shadow-[0_4px_20px_rgba(0,145,255,0.3)] hover:scale-105 active:scale-95 transition-all"
                                    >
                                        FORJAR QUEST
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowNewQuestModal(false)}
                                        className="w-full py-4 font-pixel text-[7px] text-dim hover:text-white transition-colors uppercase tracking-widest"
                                    >
                                        Abortar Missão
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
