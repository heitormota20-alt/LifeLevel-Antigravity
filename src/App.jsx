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
    User,
    Search,
    X,
    Flag,
    BarChart2,
    Calendar,
    Trash2,
    ChevronUp,
    ChevronDown,
    ArrowUpCircle,
    ArrowDownCircle,
    GripVertical
} from 'lucide-react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts'

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
        { id: 1, title: 'Acordar cedo 7:00', desc: 'Despertar no horário sagrado para o bônus de produtividade.', category: 'HÁBITOS', xpReward: 15, goldReward: 10, completed: false, isRecurring: true, priority: 'Alta', createdAt: Date.now() },
        { id: 2, title: 'Café da manhã', desc: 'Poção de energia matinal para começar a jornada.', category: 'DIETA', xpReward: 10, goldReward: 5, completed: false, isRecurring: true, priority: 'Normal', createdAt: Date.now() },
        { id: 3, title: 'Tomar banho', desc: 'Ritual de purificação para renovar a estamina.', category: 'HIGIENE', xpReward: 10, goldReward: 5, completed: false, isRecurring: true, priority: 'Normal', createdAt: Date.now() },
        { id: 4, title: 'Escovar os dentes', desc: 'Manter a armadura do sorriso impecável.', category: 'HIGIENE', xpReward: 5, goldReward: 2, completed: false, isRecurring: true, priority: 'Normal', createdAt: Date.now() },
        { id: 5, title: 'Fazer a marmita', desc: 'Alquimia culinária para garantir nutrição futura.', category: 'DIETA', xpReward: 25, goldReward: 15, completed: false, isRecurring: true, priority: 'Média', createdAt: Date.now() },
        { id: 6, title: 'Trabalhar', desc: 'A principal batalha diária por ouro e prestígio.', category: 'TAREFAS', xpReward: 100, goldReward: 50, completed: false, isRecurring: true, priority: 'Alta', createdAt: Date.now() },
        { id: 7, title: 'Treinar', desc: 'Duelo na arena para aumentar os atributos de força.', category: 'HÁBITOS', xpReward: 50, goldReward: 20, completed: false, isRecurring: true, priority: 'Alta', createdAt: Date.now() },
        { id: 8, title: 'Jantar', desc: 'Recuperar mana e HP para o fim do turno.', category: 'DIETA', xpReward: 15, goldReward: 10, completed: false, isRecurring: true, priority: 'Normal', createdAt: Date.now() },
        { id: 9, title: 'Dormir Cedo', desc: 'Entrar em estado de repouso para regeneração total.', category: 'HÁBITOS', xpReward: 30, goldReward: 20, completed: false, isRecurring: true, priority: 'Normal', createdAt: Date.now() },
    ],
    lastLoginDate: new Date().toLocaleDateString(),
    onboarded: false,
    completedHistory: [],
    dailyMealPlan: [],
    mealDone: [],
    useAI: false,
    useDefaultQuests: false
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

const MEAL_PLANS = {
    'Emagrecer': {
        options: [
            { time: '08:00', name: 'Despertar Fit', items: ['Omelete de 2 ovos com espinafre', 'Panqueca de aveia com banana', 'Iogurte com frutas vermelhas e granola'], cals: 260 },
            { time: '10:30', name: 'Lanche Saciedade', items: ['1 Iogurte natural desnatado + chia', '1 Maçã + 5 amêndoas', 'Mix de sementes (girassol e abóbora)'], cals: 130 },
            { time: '13:00', name: 'Almoço de Ferro', items: ['Frango grelhado (150g) + brócolis', 'Tilápia ao forno + aspargos', 'Patinho moído + vagem no vapor'], cals: 420 },
            { time: '16:30', name: 'Energia Limpa', items: ['1 Banana com canela', '1 Pera + 2 castanhas do pará', 'Suco verde detox (couve, limão, maçã)'], cals: 140 },
            { time: '20:00', name: 'Repouso Leve', items: ['Sopa de abóbora com frango', 'Salada Caesar com frango grelhado (sem croutons)', 'Omelete de claras com queijo branco'], cals: 350 }
        ]
    },
    'Ganhar massa': {
        options: [
            { time: '07:30', name: 'Café do Titã', items: ['Cuscuz com 3 ovos e queijo', 'Tapioca recheada com frango e requeijão', 'Mingau de aveia com whey e pasta de amendoim'], cals: 580 },
            { time: '10:00', name: 'Poder Proteico', items: ['Shake de Whey + aveia + leite desnatado', 'Sanduíche de atum com pão integral', 'Barra de proteína + 1 banana'], cals: 420 },
            { time: '12:30', name: 'Almoço do Guerreiro', items: ['Arroz (2 escumadeiras) + feijão + carne magra (180g)', 'Macarrão integral com frango aos cubos', 'Purê de batata + salmão grelhado'], cals: 750 },
            { time: '16:00', name: 'Pré-Combate', items: ['Batata doce cozida + frango desfiado', 'Omelete de 4 ovos com torrada integral', 'Açaí com granola e mel'], cals: 380 },
            { time: '20:30', name: 'Banquete Final', items: ['Arroz com brócolis + sobrecoxa assada (sem pele)', 'Arroz integral + hambúrguer caseiro de patinho', 'Torta de frango com massa de grão de bico'], cals: 650 }
        ]
    },
    'default': {
        options: [
            { time: '08:00', name: 'Café Equilibrado', items: ['Pão com queijo e café com leite', 'Iogurte com granola e fruta', 'Tapioca com ovo'], cals: 380 },
            { time: '12:30', name: 'Almoço Prato Feito', items: ['Arroz, feijão e frango grelhado', 'Macarrão à bolonhesa', 'Peixe assado com batatas'], cals: 550 },
            { time: '16:00', name: 'Intervalo Saudável', items: ['Mix de frutas', 'Iogurte natural', '1 fatia de bolo caseiro'], cals: 180 },
            { time: '20:00', name: 'Ceia Nutritiva', items: ['Sopa de legumes', 'Omelete simples', 'Sanduíche natural de frango'], cals: 420 }
        ]
    }
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
        medications: [],
        useAI: false,
        useDefaultQuests: false
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
                    <p className="font-pixel text-violet uppercase tracking-[2px] mb-8" style={{ fontSize: 'var(--fs-micro)' }}>
                        Criação de Personagem — Etapa {step} / 5
                    </p>

                    {step === 1 && (
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <label className="font-pixel text-dim uppercase block text-left" style={{ fontSize: 'var(--fs-micro)' }}>Identidade do Herói</label>
                                <input
                                    placeholder="NOME DO HERÓI"
                                    className="w-full uppercase text-center"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="font-pixel text-dim uppercase block text-left" style={{ fontSize: 'var(--fs-micro)' }}>Peso (KG)</label>
                                    <input placeholder="00" type="number" className="text-center" value={formData.weight} onChange={e => setFormData({ ...formData, weight: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="font-pixel text-dim uppercase block text-left" style={{ fontSize: 'var(--fs-micro)' }}>Altura (CM)</label>
                                    <input placeholder="000" type="number" className="text-center" value={formData.height} onChange={e => setFormData({ ...formData, height: e.target.value })} />
                                </div>
                            </div>

                            <div className="pt-4 space-y-3">
                                <button onClick={nextStep} className="btn-primary w-full">PRÓXIMO PASSO</button>
                                <button onClick={onCancel} className="btn-action w-full">CANCELAR JORNADA</button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <p className="font-pixel text-violet uppercase mb-6" style={{ fontSize: 'var(--fs-small)' }}>Qual o seu destino?</p>
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
                                        className={`selectable-card ${formData.goals.includes(goal.id) ? 'selected' : ''}`}
                                    >
                                        <div className={`p-3 rounded-lg ${formData.goals.includes(goal.id) ? 'bg-violet shadow-[0_0_15px_rgba(110,86,207,0.3)]' : 'bg-surface'}`}>
                                            <goal.icon size={20} className={formData.goals.includes(goal.id) ? 'text-white' : 'text-violet'} />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <h4 className="uppercase" style={{ fontSize: 'var(--fs-small)' }}>
                                                {goal.label}
                                            </h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="pt-6">
                                <button onClick={nextStep} className="btn-primary w-full">CONTINUAR</button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4">
                            <p className="font-pixel text-violet uppercase mb-6" style={{ fontSize: 'var(--fs-small)' }}>Escolha sua Classe de Herói</p>
                            <div className="grid gap-3">
                                {CLASSES.map(cls => (
                                    <div
                                        key={cls.id}
                                        onClick={() => setFormData({ ...formData, characterClass: cls.id })}
                                        className={`selectable-card ${formData.characterClass === cls.id ? 'selected' : ''}`}
                                    >
                                        <div className={`p-3 rounded-lg ${formData.characterClass === cls.id ? 'bg-violet shadow-[0_0_15px_rgba(110,86,207,0.3)]' : 'bg-surface'}`}>
                                            <cls.icon size={20} className={formData.characterClass === cls.id ? 'text-white' : 'text-violet'} />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="mb-1 uppercase" style={{ fontSize: 'var(--fs-small)' }}>{cls.name}</h4>
                                            <p className="text-dim leading-tight" style={{ fontSize: 'var(--fs-micro)' }}>{cls.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="pt-6">
                                <button onClick={nextStep} className="btn-primary w-full">CONFIRMAR CLASSE</button>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-6 text-left animate-slide-up">
                            <div className="text-center">
                                <p className="font-pixel text-violet uppercase mb-4" style={{ fontSize: 'var(--fs-small)' }}>Ficha Médica (Pergaminhos de Saúde)</p>
                                <div className={`selectable-card ${formData.hasHealthIssues ? 'selected' : ''}`} onClick={() => setFormData({ ...formData, hasHealthIssues: !formData.hasHealthIssues })}>
                                    <div className={`p-3 rounded-lg ${formData.hasHealthIssues ? 'bg-hp-red shadow-[0_0_15px_rgba(229,72,77,0.3)]' : 'bg-surface'}`}>
                                        <Heart size={20} className={formData.hasHealthIssues ? 'text-white' : (formData.hasHealthIssues ? 'text-white' : 'text-dim')} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="uppercase" style={{ fontSize: 'var(--fs-small)' }}>Possui condições de saúde?</h4>
                                        <p className="text-dim" style={{ fontSize: 'var(--fs-micro)' }}>{formData.hasHealthIssues ? 'Sim, o herói possui restrições.' : 'Não, saúde em plena forma.'}</p>
                                    </div>
                                </div>
                            </div>

                            {formData.hasHealthIssues && (
                                <div className="space-y-2">
                                    <label className="font-pixel text-dim uppercase block" style={{ fontSize: 'var(--fs-micro)' }}>Detalhes da Condição</label>
                                    <textarea
                                        placeholder="DESCREVA BREVEMENTE SUA CONDIÇÃO..."
                                        className="w-full h-24"
                                        style={{ fontSize: 'var(--fs-small)' }}
                                        value={formData.healthDescription}
                                        onChange={e => setFormData({ ...formData, healthDescription: e.target.value })}
                                    />
                                </div>
                            )}

                            <div className="premium-card bg-surface/50 border-violet/30 p-4">
                                <p className="font-pixel text-[12px] text-violet mb-4">GERENCIAR POÇÕES (REMÉDIOS)</p>
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
                                        <div className="grid gap-2 mt-4 text-left">
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

                            <div className="pt-6 space-y-3">
                                <button onClick={nextStep} className="btn-primary w-full">PRÓXIMO</button>
                                <button onClick={() => setStep(3)} className="btn-action w-full">VOLTAR</button>
                            </div>
                        </div>
                    )}

                    {step === 5 && (
                        <div className="space-y-6 text-left">
                            <p className="font-pixel text-violet uppercase text-center mb-6" style={{ fontSize: 'var(--fs-small)' }}>Configurações de Jornada</p>

                            <div className="space-y-4">
                                <div className={`selectable-card ${formData.useAI ? 'selected' : ''}`} onClick={() => setFormData({ ...formData, useAI: !formData.useAI })}>
                                    <div className={`p-3 rounded-lg ${formData.useAI ? 'bg-violet shadow-[0_0_15px_rgba(110,86,207,0.3)]' : 'bg-surface'}`}>
                                        <Zap size={20} className={formData.useAI ? 'text-white' : 'text-violet'} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="uppercase" style={{ fontSize: 'var(--fs-small)' }}>ATIVAR ALQUIMIA IA</h4>
                                        <p className="text-dim" style={{ fontSize: 'var(--fs-micro)' }}>A IA sugerirá metas e calculará sua dieta automaticamente.</p>
                                    </div>
                                </div>

                                <div className={`selectable-card ${formData.useDefaultQuests ? 'selected' : ''}`} onClick={() => setFormData({ ...formData, useDefaultQuests: !formData.useDefaultQuests })}>
                                    <div className={`p-3 rounded-lg ${formData.useDefaultQuests ? 'bg-violet shadow-[0_0_15px_rgba(110,86,207,0.3)]' : 'bg-surface'}`}>
                                        <ClipboardList size={20} className={formData.useDefaultQuests ? 'text-white' : 'text-violet'} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="uppercase" style={{ fontSize: 'var(--fs-small)' }}>MISSÕES INICIAIS</h4>
                                        <p className="text-dim" style={{ fontSize: 'var(--fs-micro)' }}>Começar com uma lista de tarefas básicas de herói.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8">
                                <button
                                    onClick={() => onComplete(formData)}
                                    className="btn-primary w-full"
                                >
                                    INICIAR AVENTURA
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}

// --- MAIN APP ---
export default function App() {
    const [activeTab, setActiveTab] = useState('hoje');
    const [workoutType, setWorkoutType] = useState('superiores');
    const [workoutDone, setWorkoutDone] = useState([]);
    const [completingQuestId, setCompletingQuestId] = useState(null);
    const [selectedDay, setSelectedDay] = useState(new Date().getDay());
    const [isProtocolActive, setIsProtocolActive] = useState(false);
    const [showFailModal, setShowFailModal] = useState(false);
    const [showNewQuestModal, setShowNewQuestModal] = useState(false);
    const [newQuestData, setNewQuestData] = useState({
        title: '',
        desc: '',
        time: '30',
        category: 'HÁBITOS',
        targetDate: new Date().toISOString().split('T')[0],
        isRecurring: false,
        difficulty: 5,
        priority: 'Normal'
    });
    const [dashboardPeriod, setDashboardPeriod] = useState(7);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterPriority, setFilterPriority] = useState('Todas');
    const [filterDate, setFilterDate] = useState('');
    const [calendarDate, setCalendarDate] = useState(new Date());
    const [highlightedQuestId, setHighlightedQuestId] = useState(null);
    const [showNewMealModal, setShowNewMealModal] = useState(false);
    const [newMealData, setNewMealData] = useState({ title: '', desc: '', time: '08:00' });
    const [profiles, setProfiles] = useState(() => {
        try {
            const saved = localStorage.getItem('life-level-profiles-v1');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    });

    const [currentProfileId, setCurrentProfileId] = useState(null);
    const [profileToDelete, setProfileToDelete] = useState(null);
    const [user, setUser] = useState(INITIAL_USER);
    const [isCreatingProfile, setIsCreatingProfile] = useState(false);
    const [draggedItemId, setDraggedItemId] = useState(null);
    const [dragOverId, setDragOverId] = useState(null);
    const [lastDroppedId, setLastDroppedId] = useState(null);

    const generateDailyPlan = () => {
        if (!user || !user.goals) return;
        let planType = 'default';
        if (user.goals.includes('Emagrecer')) planType = 'Emagrecer';
        if (user.goals.includes('Ganhar massa')) planType = 'Ganhar massa';

        const generated = MEAL_PLANS[planType].options.map(opt => ({
            ...opt,
            selectedItem: opt.items[Math.floor(Math.random() * opt.items.length)]
        }));

        setUser(prev => ({
            ...prev,
            dailyMealPlan: generated,
            mealDone: [] // Resetar refeições concluídas ao gerar novo plano
        }));
    };

    // Auto-generate on first load or when goal changes
    useEffect(() => {
        if (user.onboarded && user.useAI && (!user.dailyMealPlan || user.dailyMealPlan.length === 0)) {
            generateDailyPlan();
        }
    }, [user.goals, user.onboarded, user.useAI, user.dailyMealPlan?.length]);

    const handleCalendarQuestClick = (questId) => {
        setHighlightedQuestId(questId);
        setActiveTab('inicio');
        setSearchQuery('');
        setFilterPriority('Todas');
        setFilterDate('');

        // Clear highlight after animation
        setTimeout(() => {
            setHighlightedQuestId(null);
        }, 3000);
    };

    // Unified Profile Loading & Migration Logic
    useEffect(() => {
        if (currentProfileId) {
            const activeProfile = profiles.find(p => p.id === currentProfileId);
            if (activeProfile) {
                // Logic to check if migration is needed before setting state
                const defaultTitles = [
                    'Acordar cedo 7:00', 'Café da manhã', 'Tomar banho',
                    'Escovar os dentes', 'Fazer a marmita', 'Trabalhar',
                    'Treinar', 'Jantar', 'Dormir Cedo'
                ];

                let quests = [...(activeProfile.quests || [])];
                let history = [...(activeProfile.completedHistory || [])];
                let changed = false;

                // 1. Force isRecurring for default tasks
                quests = quests.map(q => {
                    const shouldBeRec = defaultTitles.includes(q.title) ||
                        ['HÁBITOS', 'DIETA', 'HIGIENE'].includes(q.category);
                    if (q.isRecurring === undefined || (shouldBeRec && !q.isRecurring)) {
                        changed = true;
                        return { ...q, isRecurring: true };
                    }
                    return q;
                });

                // 2. Recover lost default tasks
                const lostDefaults = history.filter(h => defaultTitles.includes(h.title));
                lostDefaults.forEach(lost => {
                    if (!quests.find(q => q.title === lost.title)) {
                        changed = true;
                        quests.push({ ...lost, isRecurring: true, completed: false });
                        history = history.filter(h => h.id !== lost.id);
                    }
                });

                // 3. Category Migration
                if (quests.some(q => ['GERAL', 'ALIMENTAÇÃO', 'ARENA'].includes(q.category))) {
                    changed = true;
                    quests = quests.map(q => {
                        let u = { ...q };
                        if (q.category === 'GERAL') u.category = 'HÁBITOS';
                        if (q.category === 'ALIMENTAÇÃO') u.category = 'DIETA';
                        if (q.category === 'ARENA') u.category = 'HÁBITOS';
                        return u;
                    });
                }

                if (changed) {
                    const updatedProfile = { ...activeProfile, quests, completedHistory: history };
                    // Update both to keep them in sync and stop the flickering
                    setUser(updatedProfile);
                    setProfiles(prev => prev.map(p => p.id === currentProfileId ? updatedProfile : p));
                } else if (JSON.stringify(user) !== JSON.stringify(activeProfile)) {
                    // Normal load without migration
                    setUser(activeProfile);
                }
            }
        }
    }, [currentProfileId, profiles.length]); // Only run when profile changes or a new profile is added

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
            setUser(prev => {
                let hpPenalty = 0;
                const parseDate = (str) => {
                    const [d, m, y] = str.split('/');
                    return new Date(y, m - 1, d);
                };

                const now = new Date();
                prev.quests.forEach(q => {
                    if (q.category === 'SAÚDE') {
                        const history = q.completedDates || [];
                        const lastDateStr = history.length > 0 ? history[history.length - 1] : null;

                        if (lastDateStr) {
                            const lastDate = parseDate(lastDateStr);
                            const diffTime = Math.abs(now - lastDate);
                            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                            if (diffDays > 2) {
                                hpPenalty += (diffDays - 2) * 10; // 10 HP por dia de atraso após o 2º dia
                            }
                        } else {
                            // Nunca completou, checar desde a criação
                            const created = new Date(q.createdAt || Date.now());
                            const diffTime = Math.abs(now - created);
                            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                            if (diffDays > 2) {
                                hpPenalty += (diffDays - 2) * 10;
                            }
                        }
                    }
                });

                if (hpPenalty > 0) {
                    alert(`⚠️ Você negligenciou missões de SAÚDE! Perdeu ${hpPenalty} HP.`);
                }

                return {
                    ...prev,
                    hp: Math.max(0, prev.hp - hpPenalty),
                    lastLoginDate: today,
                    quests: prev.quests.map(q => ({ ...q, completed: false })),
                    energy: 0,
                    water: 0,
                    dailyMealPlan: [],
                    mealDone: []
                };
            });
            setWorkoutDone([]);
        }
    }, [user.onboarded, user.lastLoginDate]);

    const handleOnboardingComplete = (data) => {
        const medQuests = data.medications.map(med => ({
            id: `med-${med.id}`,
            title: `Tomar ${med.name}`,
            desc: `Horário: ${med.time}. Manter a saúde é essencial para o herói.`,
            category: 'SAÚDE',
            time: med.time,
            xpReward: 0,
            goldReward: 10,
            completed: false,
            isRecurring: true,
            priority: 'Normal',
            createdAt: Date.now()
        }));

        const newUser = {
            ...INITIAL_USER,
            ...data,
            id: `profile-${Date.now()}`,
            quests: [...(data.useDefaultQuests ? INITIAL_USER.quests : []), ...medQuests],
            onboarded: true
        };

        setProfiles(prev => [...prev, newUser]);
        setCurrentProfileId(newUser.id);
        setIsCreatingProfile(false);
    }

    const moveQuest = (id, direction) => {
        setUser(prev => {
            const quests = [...prev.quests];
            const pMap = { 'Alta': 3, 'Média': 2, 'Normal': 1, 'Sem prioridade': 0 };

            // Garantir que todos tenham um order inicial
            quests.forEach((q, i) => {
                if (q.order === undefined) q.order = i;
            });

            const sortedQuests = [...quests].sort((a, b) => {
                const priorityDiff = (pMap[b.priority] || 0) - (pMap[a.priority] || 0);
                if (priorityDiff !== 0) return priorityDiff;
                return (a.order || 0) - (b.order || 0);
            });

            const index = sortedQuests.findIndex(q => q.id === id);
            if (index === -1) return prev;

            const targetIndex = direction === 'up' ? index - 1 : index + 1;
            if (targetIndex < 0 || targetIndex >= sortedQuests.length) return prev;

            const current = sortedQuests[index];
            const target = sortedQuests[targetIndex];

            // Regra: Não pode pular níveis de prioridade (mantém grupos)
            if (pMap[current.priority] !== pMap[target.priority]) return prev;

            // Swap order
            const tempOrder = current.order;
            current.order = target.order;
            target.order = tempOrder;

            return { ...prev, quests: [...quests] };
        });
    }

    const updateQuestPriority = (id, currentPriority) => {
        const priorities = ['Sem prioridade', 'Normal', 'Média', 'Alta'];
        const currentIndex = priorities.indexOf(currentPriority);
        const nextIndex = (currentIndex + 1) % priorities.length;
        const newPriority = priorities[nextIndex];

        setUser(prev => ({
            ...prev,
            quests: prev.quests.map(q => q.id === id ? { ...q, priority: newPriority } : q)
        }));
    };

    const handleDragStart = (id) => {
        setDraggedItemId(id);
    }

    const handleDragOver = (e, id) => {
        e.preventDefault();
        setDragOverId(id);
        e.dataTransfer.dropEffect = "move";
    }

    const handleDrop = (targetId) => {
        setDragOverId(null);
        if (!draggedItemId || draggedItemId === targetId) return;

        setUser(prev => {
            const quests = [...prev.quests];
            const pMap = { 'Alta': 3, 'Média': 2, 'Normal': 1, 'Sem prioridade': 0 };

            quests.forEach((q, i) => { if (q.order === undefined) q.order = i; });

            const sortedQuests = [...quests].sort((a, b) => {
                const priorityDiff = (pMap[b.priority] || 0) - (pMap[a.priority] || 0);
                if (priorityDiff !== 0) return priorityDiff;
                return (a.order || 0) - (b.order || 0);
            });

            const draggedIdx = sortedQuests.findIndex(q => q.id === draggedItemId);
            const targetIdx = sortedQuests.findIndex(q => q.id === targetId);

            if (draggedIdx === -1 || targetIdx === -1) return prev;
            if (pMap[sortedQuests[draggedIdx].priority] !== pMap[sortedQuests[targetIdx].priority]) return prev;

            const [draggedItem] = sortedQuests.splice(draggedIdx, 1);
            sortedQuests.splice(targetIdx, 0, draggedItem);

            sortedQuests.forEach((q, i) => { q.order = i; });

            setLastDroppedId(draggedItemId);
            setTimeout(() => setLastDroppedId(null), 1000);

            return { ...prev, quests: [...quests] };
        });
        setDraggedItemId(null);
    }

    const deleteProfile = (e, id) => {
        e.stopPropagation();
        setProfileToDelete(id);
    }

    const confirmDeleteProfile = () => {
        if (!profileToDelete) return;
        const updatedProfiles = profiles.filter(p => p.id !== profileToDelete);
        setProfiles(updatedProfiles);
        localStorage.setItem('life-level-profiles-v1', JSON.stringify(updatedProfiles));
        if (currentProfileId === profileToDelete) {
            setCurrentProfileId(null);
        }
        setProfileToDelete(null);
    }

    const handleComplete = (id, dateKey = new Date().toLocaleDateString()) => {
        setCompletingQuestId(`${id}-${dateKey}`);

        // Wait for animation to finish before updating state
        setTimeout(() => {
            setUser(prev => {
                const q = prev.quests.find(x => x.id === id)
                if (!q) return prev

                const completedDates = q.completedDates || [];
                const isAlreadyCompleted = completedDates.includes(dateKey);

                let nxp, nlvl, nmaxXp, ngold;

                if (isAlreadyCompleted) {
                    // Toggle OFF: Remove date and subtract rewards
                    nxp = prev.xp - q.xpReward
                    nlvl = prev.level
                    nmaxXp = prev.maxXp
                    ngold = prev.gold - q.goldReward

                    // Handle level down if XP goes negative
                    if (nxp < 0 && nlvl > 1) {
                        nlvl--
                        nmaxXp = Math.floor(prev.maxXp / 1.5)
                        nxp = nmaxXp + nxp
                    } else if (nxp < 0) {
                        nxp = 0
                    }

                    return {
                        ...prev,
                        xp: nxp,
                        level: nlvl,
                        maxXp: nmaxXp,
                        gold: Math.max(0, ngold),
                        quests: prev.quests.map(x => x.id === id ? {
                            ...x,
                            completedDates: completedDates.filter(d => d !== dateKey),
                            completed: dateKey === new Date().toLocaleDateString() ? false : x.completed
                        } : x)
                    }
                } else {
                    const isHealthQuest = q.category === 'SAÚDE';
                    const xpToGrant = isHealthQuest ? 0 : q.xpReward;

                    // Toggle ON: Add date and add rewards
                    nxp = prev.xp + xpToGrant
                    nlvl = prev.level
                    nmaxXp = prev.maxXp
                    if (nxp >= prev.maxXp) {
                        nlvl++
                        nxp -= prev.maxXp
                        nmaxXp = Math.floor(prev.maxXp * 1.5)
                    }

                    if (q.isRecurring === false) {
                        // Move non-recurring task to history and remove from active quests
                        const completedQuest = {
                            ...q,
                            completedDates: [...completedDates, dateKey],
                            completed: true
                        };
                        return {
                            ...prev,
                            xp: nxp,
                            level: nlvl,
                            maxXp: nmaxXp,
                            gold: prev.gold + q.goldReward,
                            quests: prev.quests.filter(x => x.id !== id),
                            completedHistory: [...(prev.completedHistory || []), completedQuest]
                        }
                    }

                    return {
                        ...prev,
                        xp: nxp,
                        level: nlvl,
                        maxXp: nmaxXp,
                        gold: prev.gold + q.goldReward,
                        quests: prev.quests.map(x => x.id === id ? {
                            ...x,
                            completedDates: [...completedDates, dateKey],
                            completed: dateKey === new Date().toLocaleDateString() ? true : x.completed
                        } : x)
                    }
                }
            });
            setCompletingQuestId(null);
        }, 500);
    }

    const addWater = (amount) => {
        setUser(prev => ({ ...prev, water: Math.min(prev.water + amount, prev.maxWater) }))
    }

    const toggleMeal = (idx) => {
        setUser(u => {
            const mealDone = u.mealDone || [];
            const isDone = mealDone.includes(idx);
            const meal = (u.dailyMealPlan || [])[idx];
            const calories = meal?.cals || 0;

            const newMealDone = isDone
                ? mealDone.filter(i => i !== idx)
                : [...mealDone, idx];

            return {
                ...u,
                energy: isDone ? Math.max(0, u.energy - calories) : Math.min(u.maxEnergy, u.energy + calories),
                mealDone: newMealDone
            };
        });
    }

    const calculateAICals = (title, desc) => {
        // Simulação de IA: Analisa palavras chave para estimar calorias
        const text = (title + ' ' + desc).toLowerCase();
        let base = 200;
        if (text.includes('pão')) base += 150;
        if (text.includes('ovo')) base += 80;
        if (text.includes('frango')) base += 250;
        if (text.includes('carne')) base += 350;
        if (text.includes('arroz')) base += 200;
        if (text.includes('salada')) base -= 100;
        if (text.includes('whey')) base += 120;
        if (text.includes('fatia')) base += 50;
        return Math.max(50, base + Math.floor(Math.random() * 50));
    };

    const addManualMeal = (e) => {
        e.preventDefault();
        const estimatedCals = calculateAICals(newMealData.title, newMealData.desc);
        const newMeal = {
            time: newMealData.time,
            name: newMealData.title,
            selectedItem: newMealData.desc,
            cals: estimatedCals,
            isManual: true
        };
        setUser(prev => ({
            ...prev,
            dailyMealPlan: [...(prev.dailyMealPlan || []), newMeal].sort((a, b) => a.time.localeCompare(b.time))
        }));
        setShowNewMealModal(false);
        setNewMealData({ title: '', desc: '', time: '08:00' });
    };

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
            <>
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
                                            <h4 className="font-pixel text-xs text-white uppercase">{profile.name}</h4>
                                            <p className="font-pixel text-violet uppercase" style={{ fontSize: 'var(--fs-micro)' }}>NÍVEL {profile.level} • {profile.characterClass}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="text-violet opacity-0 group-hover:opacity-100 transition-opacity">
                                                <TrendingUp size={16} />
                                            </div>
                                            <button
                                                onClick={(e) => deleteProfile(e, profile.id)}
                                                className="p-2 text-hp-red opacity-30 hover:opacity-100 hover:bg-hp-red/10 rounded-lg transition-all"
                                                title="Banir Herói"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                <button
                                    onClick={() => setIsCreatingProfile(true)}
                                    className="btn-primary w-full py-6 flex flex-col items-center gap-2"
                                >
                                    <Plus size={24} />
                                    <span>NOVO PERSONAGEM</span>
                                </button>
                            </div>

                            {profiles.length > 0 && (
                                <button
                                    onClick={() => { if (confirm('Resetar tudo?')) { localStorage.clear(); window.location.reload(); } }}
                                    className="btn-danger w-full mt-4 !py-3 !text-[10px]"
                                >
                                    Limpar Todos os Registros
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                {/* Modal de Confirmação de Exclusão */}
                {profileToDelete && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                        <div className="w-full max-w-sm animate-scale-up">
                            <div className="premium-card glass border-hp-red/50 text-center p-8">
                                <div className="flex justify-center mb-6">
                                    <div className="w-16 h-16 rounded-full bg-hp-red/10 border border-hp-red/30 flex items-center justify-center text-hp-red animate-pulse">
                                        <Skull size={32} />
                                    </div>
                                </div>
                                <h3 className="font-pixel text-[10px] text-white mb-4 uppercase tracking-widest leading-relaxed">
                                    Banir Herói da Guilda?
                                </h3>
                                <p className="text-[8px] font-pixel text-dim mb-8 leading-relaxed uppercase">
                                    Esta ação é irreversível. O herói e todo o seu progresso serão perdidos no abismo.
                                </p>
                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={confirmDeleteProfile}
                                        className="btn-danger w-full !py-4"
                                    >
                                        Confirmar Banimento
                                    </button>
                                    <button
                                        onClick={() => setProfileToDelete(null)}
                                        className="btn-action w-full !py-4"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
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
        if (!newQuestData.title) return alert('Dê um nome à sua missão!');

        const effort = parseInt(newQuestData.difficulty);
        const duration = parseInt(newQuestData.time) || 30;

        // XP Reward based on effort level and duration
        let xp = 10 + (effort * 5) + Math.floor(duration / 10);
        let gold = effort * 3;

        const newQuest = {
            id: Date.now(),
            title: newQuestData.title,
            desc: newQuestData.desc || `Objetivo: ${newQuestData.title}`,
            time: `${duration}min`,
            category: newQuestData.category,
            isRecurring: newQuestData.isRecurring,
            targetDate: newQuestData.targetDate,
            priority: newQuestData.priority,
            createdAt: Date.now(),
            xpReward: xp,
            goldReward: gold,
            completedDates: [],
            completed: false
        };

        setUser(prev => ({
            ...prev,
            quests: [...prev.quests, newQuest]
        }));

        setShowNewQuestModal(false);
        setNewQuestData({
            title: '',
            desc: '',
            time: '30',
            category: 'HÁBITOS',
            targetDate: newQuestData.targetDate,
            isRecurring: false,
            difficulty: 5,
            priority: 'Normal'
        });
    }

    return (
        <div className="flex flex-col min-h-screen bg-deep overflow-x-hidden">
            <nav className="top-nav">
                <div className="nav-container">
                    {[
                        { id: 'hoje', label: 'Hoje', icon: Home },
                        { id: 'tarefas', label: 'Tarefas', icon: ClipboardList },
                        { id: 'habitos', label: 'Hábitos', icon: RotateCcw },
                        { id: 'arena', label: 'Arena', icon: Swords },
                        { id: 'dieta', label: 'Alquimia', icon: Flame },
                        { id: 'dash', label: 'Stats', icon: BarChart2 },
                        { id: 'calendar', label: 'Mapa', icon: Calendar },
                        { id: 'perfil', label: 'Perfil', icon: User }
                    ].map(tab => (
                        <div
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                        >
                            <tab.icon size={16} />
                            <span>{tab.label}</span>
                        </div>
                    ))}
                </div>
            </nav>

            <div className="flex-1 p-4 md:p-8 pt-24 pb-40">
                <div className="container mx-auto">
                    {activeTab === 'hoje' && (
                        <div className="animate-slide-up">
                            <header className="mb-12">
                                <h1 className="font-pixel text-2xl text-bright mb-2">Hoje</h1>
                                <p className="font-pixel text-dim text-xs capitalize">{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                            </header>

                            <div className="hoje-grid">
                                <div className="space-y-12">
                                    <section>
                                        <div className="flex items-center gap-3 mb-6">
                                            <ClipboardList size={22} className="text-orange" />
                                            <h2 className="font-pixel text-sm text-bright tracking-[2px] uppercase">Tarefas</h2>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setNewQuestData(prev => ({ ...prev, category: 'TAREFAS', isRecurring: false }));
                                                setShowNewQuestModal(true);
                                            }}
                                            className="w-full bg-[#ff6b00] hover:bg-[#ff8533] text-deep font-pixel py-5 rounded-2xl flex items-center justify-center gap-3 transition-all mb-8 shadow-lg shadow-orange/20"
                                        >
                                            <Plus size={20} className="stroke-[3px]" />
                                            <span className="text-[10px] font-bold tracking-[2px]">NOVA TAREFA</span>
                                        </button>

                                        <div className="space-y-4">
                                            {user.quests.filter(q => q.category === 'TAREFAS').length === 0 ? (
                                                <div className="py-20 text-center opacity-30">
                                                    <GripVertical size={40} className="mx-auto mb-4" />
                                                    <p className="font-pixel text-[10px] uppercase tracking-widest">Nenhuma tarefa encontrada</p>
                                                    <p className="font-pixel text-[7px] mt-2 text-dim uppercase">Ajuste os filtros ou adicione uma tarefa</p>
                                                </div>
                                            ) : (
                                                user.quests.filter(q => q.category === 'TAREFAS').map(q => {
                                                    const currentDayKey = new Date().toLocaleDateString();
                                                    const isDone = (q.completedDates || []).includes(currentDayKey);
                                                    return (
                                                        <div
                                                            key={q.id}
                                                            onClick={() => handleComplete(q.id)}
                                                            className={`hoje-task-item ${isDone ? 'opacity-40' : ''}`}
                                                        >
                                                            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${isDone ? 'bg-orange border-orange shadow-[0_0_15px_rgba(255,107,0,0.4)]' : 'border-white/10'}`}>
                                                                {isDone && <Check size={16} className="text-deep stroke-[3px]" />}
                                                            </div>
                                                            <div className="flex-1">
                                                                <p className={`font-pixel text-xs text-bright mb-1 ${isDone ? 'line-through' : ''}`}>{q.title}</p>
                                                                <span className="font-pixel text-[8px] text-dim uppercase tracking-wider">{q.priority} • {q.time}</span>
                                                            </div>
                                                            <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center border border-white/5">
                                                                <span className="font-pixel text-[8px] text-orange">{q.difficulty || 5}</span>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            )}
                                        </div>
                                    </section>

                                    <section>
                                        <div className="flex items-center gap-3 mb-6">
                                            <Zap size={22} className="text-blue" />
                                            <h2 className="font-pixel text-sm text-bright tracking-[2px] uppercase">Hábitos de Hoje</h2>
                                        </div>
                                        <div className="space-y-4">
                                            {user.quests.filter(q => q.category === 'HÁBITOS').length === 0 ? (
                                                <div className="py-10 text-center opacity-20">
                                                    <p className="font-pixel text-[8px] uppercase tracking-widest">Sem hábitos diários</p>
                                                </div>
                                            ) : (
                                                user.quests.filter(q => q.category === 'HÁBITOS').map(q => {
                                                    const currentDayKey = new Date().toLocaleDateString();
                                                    const isDone = (q.completedDates || []).includes(currentDayKey);
                                                    return (
                                                        <div
                                                            key={q.id}
                                                            onClick={() => handleComplete(q.id)}
                                                            className={`hoje-task-item ${isDone ? 'opacity-40' : ''}`}
                                                        >
                                                            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${isDone ? 'bg-blue border-blue shadow-[0_0_15px_rgba(0,145,255,0.4)]' : 'border-white/10'}`}>
                                                                {isDone && <Check size={16} className="text-deep stroke-[3px]" />}
                                                            </div>
                                                            <div className="flex-1">
                                                                <p className={`font-pixel text-xs text-bright mb-1 ${isDone ? 'line-through' : ''}`}>{q.title}</p>
                                                                <span className="font-pixel text-[8px] text-dim uppercase tracking-wider">Hábito Diário</span>
                                                            </div>
                                                            <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center border border-white/5">
                                                                <span className="font-pixel text-[8px] text-blue">{q.difficulty || 5}</span>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            )}
                                        </div>
                                    </section>
                                </div>

                                <aside className="summary-sidebar">
                                    <h3 className="font-pixel text-sm text-bright tracking-[2px] mb-2 uppercase">Resumo</h3>
                                    <div className="summary-grid">
                                        {(() => {
                                            const todayKeyStr = new Date().toLocaleDateString();
                                            const tsks = user.quests.filter(q => q.category === 'TAREFAS');
                                            const hbts = user.quests.filter(q => q.category === 'HÁBITOS');
                                            const dTsks = tsks.filter(q => (q.completedDates || []).includes(todayKeyStr)).length;
                                            const dHbts = hbts.filter(q => (q.completedDates || []).includes(todayKeyStr)).length;
                                            const tDiff = tsks.reduce((acc, q) => acc + (q.difficulty || 5), 0);
                                            const dDiff = tsks.filter(q => (q.completedDates || []).includes(todayKeyStr)).reduce((acc, q) => acc + (q.difficulty || 5), 0);
                                            const totalCount = tsks.length + hbts.length;
                                            const scr = totalCount > 0 ? Math.round(((dTsks + dHbts) / totalCount) * 100) : 0;

                                            return [
                                                { label: 'Score Total', value: scr, sub: `Tarefas: ${dTsks} | Hábitos: ${dHbts}`, icon: Flame, color: 'text-orange', bg: 'bg-orange/10' },
                                            ].map(item => (
                                                <div key={item.label} className="summary-card">
                                                    <div className={`summary-icon ${item.bg}`}>
                                                        <item.icon size={16} className={item.color} />
                                                    </div>
                                                    <div>
                                                        <p className="font-pixel text-2xl text-bright mb-1">{item.value}</p>
                                                        <p className="font-pixel text-[9px] text-bright uppercase tracking-wider">{item.label}</p>
                                                        <p className="font-pixel text-[7px] text-dim mt-1 uppercase leading-tight">{item.sub}</p>
                                                    </div>
                                                </div>
                                            ))
                                        })()}
                                    </div>
                                </aside>
                            </div>
                        </div>
                    )}

                    {activeTab === 'tarefas' && (
                        <div className="animate-slide-up pb-24 max-w-4xl mx-auto">
                            <header className="mb-12">
                                <div className="flex items-center gap-4 mb-2">
                                    <ClipboardList size={32} className="text-blue" />
                                    <h2 className="font-pixel text-2xl text-bright">Missões Ativas</h2>
                                </div>
                                <p className="font-pixel text-dim text-[8px] uppercase tracking-[4px]">Gerenciamento de Tarefas e Objetivos Únicos</p>
                            </header>

                            <button
                                onClick={() => {
                                    setNewQuestData(prev => ({ ...prev, category: 'TAREFAS', isRecurring: false }));
                                    setShowNewQuestModal(true);
                                }}
                                className="w-full bg-blue/10 hover:bg-blue/20 border border-blue/20 text-blue font-pixel py-6 rounded-2xl flex items-center justify-center gap-3 transition-all mb-12 group"
                            >
                                <Plus size={24} className="group-hover:rotate-90 transition-transform" />
                                <span className="text-[10px] font-bold tracking-[2px]">FORJAR NOVA TAREFA</span>
                            </button>

                            <div className="space-y-4">
                                {user.quests.filter(q => q.category === 'TAREFAS').length === 0 ? (
                                    <div className="py-32 text-center opacity-20 border-2 border-dashed border-white/5 rounded-3xl">
                                        <Ghost size={64} className="mx-auto mb-6" />
                                        <p className="font-pixel text-[10px] uppercase tracking-widest">O mural de missões está vazio</p>
                                    </div>
                                ) : (
                                    user.quests.filter(q => q.category === 'TAREFAS').map(q => {
                                        const currentDayKey = new Date().toLocaleDateString();
                                        const isDone = (q.completedDates || []).includes(currentDayKey);
                                        return (
                                            <div
                                                key={q.id}
                                                onClick={() => handleComplete(q.id)}
                                                className={`premium-card !p-6 flex items-center gap-6 border-white/5 hover:border-blue/30 transition-all cursor-pointer group ${isDone ? 'opacity-40 grayscale' : ''}`}
                                            >
                                                <div className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all ${isDone ? 'bg-blue border-blue shadow-[0_0_20px_rgba(0,145,255,0.4)]' : 'border-white/10 group-hover:border-blue/50'}`}>
                                                    {isDone ? <Check size={24} className="text-white" /> : <div className="w-2 h-2 rounded-full bg-blue opacity-50"></div>}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <p className={`font-pixel text-sm text-bright ${isDone ? 'line-through' : ''}`}>{q.title}</p>
                                                        <span className={`px-2 py-0.5 rounded text-[8px] font-pixel ${q.priority === 'Alta' ? 'bg-hp-red/10 text-hp-red' : 'bg-blue/10 text-blue'}`}>{q.priority}</span>
                                                    </div>
                                                    <p className="text-[10px] text-dim font-sans">{q.desc}</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-pixel text-[12px] text-orange mb-1">+{q.xpReward} XP</div>
                                                    <div className="font-pixel text-[8px] text-dim">{q.time}</div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'habitos' && (
                        <div className="animate-slide-up pb-24 max-w-4xl mx-auto">
                            <header className="mb-12">
                                <div className="flex items-center gap-4 mb-2">
                                    <RotateCcw size={32} className="text-violet" />
                                    <h2 className="font-pixel text-2xl text-bright">Ritual Diário</h2>
                                </div>
                                <p className="font-pixel text-dim text-[8px] uppercase tracking-[4px]">Consistência é a Verdadeira Magia</p>
                            </header>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {user.quests.filter(q => q.category === 'HÁBITOS' || q.isRecurring).map(q => {
                                    const currentDayKey = new Date().toLocaleDateString();
                                    const isDone = (q.completedDates || []).includes(currentDayKey);
                                    const streak = (q.completedDates || []).length;

                                    return (
                                        <div
                                            key={q.id}
                                            onClick={() => handleComplete(q.id)}
                                            className={`premium-card !p-8 bg-surface/20 border-white/5 hover:border-violet/30 transition-all cursor-pointer relative overflow-hidden group ${isDone ? 'opacity-50' : ''}`}
                                        >
                                            <div className="flex justify-between items-start mb-6 relative z-10">
                                                <div className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all ${isDone ? 'bg-violet border-violet shadow-[0_0_15px_rgba(110,86,207,0.4)]' : 'border-white/10 group-hover:border-violet/50'}`}>
                                                    {isDone ? <Check size={20} className="text-white" /> : <RotateCcw size={18} className="text-dim group-hover:text-violet transition-colors" />}
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <div className="font-pixel text-[10px] text-violet flex items-center gap-2">
                                                        <Flame size={12} fill="currentColor" />
                                                        <span>STREAK: {streak}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="relative z-10">
                                                <h4 className={`font-pixel text-xs text-bright mb-2 ${isDone ? 'line-through opacity-50' : ''}`}>{q.title}</h4>
                                                <div className="flex items-center gap-4">
                                                    <div className="h-1.5 flex-1 bg-deep rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-violet"
                                                            style={{ width: `${Math.min(100, (streak / 30) * 100)}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="font-pixel text-[8px] text-dim">{(streak / 30 * 100).toFixed(0)}%</span>
                                                </div>
                                            </div>
                                            <div className={`absolute -bottom-8 -right-8 w-24 h-24 bg-violet/5 blur-3xl rounded-full transition-opacity ${isDone ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                                        </div>
                                    );
                                })}
                            </div>

                            <button
                                onClick={() => {
                                    setNewQuestData(prev => ({ ...prev, category: 'HÁBITOS', isRecurring: true }));
                                    setShowNewQuestModal(true);
                                }}
                                className="w-full mt-12 bg-surface/40 hover:bg-surface/60 border border-white/5 text-dim hover:text-bright font-pixel py-4 rounded-xl flex items-center justify-center gap-3 transition-all"
                            >
                                <Plus size={16} />
                                <span className="text-[8px] tracking-[1px]">ADICIONAR NOVO HÁBITO</span>
                            </button>
                        </div>
                    )}

                    {activeTab === 'dash' && (
                        <div className="animate-slide-up pb-24 max-w-4xl mx-auto space-y-12">
                            {/* Header Dash */}
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="font-pixel text-[20px] text-orange mb-2">SALA DE ANÁLISE</h2>
                                    <p className="font-pixel text-[10px] text-dim uppercase tracking-[2px]">Relatório de Performance do Guerreiro</p>
                                </div>
                                <div className="dashboard-filter-container">
                                    {[7, 30].map(p => (
                                        <button
                                            key={p}
                                            onClick={() => setDashboardPeriod(p)}
                                            className={`dashboard-filter-btn ${dashboardPeriod === p ? 'active' : ''}`}
                                        >
                                            {p} DIAS
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Stats Grid - Mantendo layout original da aba Início */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 !mt-0 !mb-0">
                                {(() => {
                                    const quests = user.quests || [];
                                    const historyQuests = user.completedHistory || [];

                                    const getStatsForDate = (dateObj) => {
                                        const dKey = dateObj.toLocaleDateString();
                                        const dIso = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;

                                        const recurring = quests.filter(q => q.isRecurring);
                                        const nonRecurActive = quests.filter(q => !q.isRecurring && q.targetDate === dIso);
                                        const nonRecurHistory = historyQuests.filter(q => (q.completedDates || []).includes(dKey));

                                        const total = recurring.length + nonRecurActive.length + nonRecurHistory.length;
                                        const done = recurring.filter(q => (q.completedDates || []).includes(dKey)).length + nonRecurHistory.length;

                                        return { total, done };
                                    };

                                    const todayStats = getStatsForDate(new Date());
                                    const todayQuests = todayStats.total;
                                    const todayCompleted = todayStats.done;
                                    const scoreHoje = todayQuests > 0 ? (todayCompleted / todayQuests) : 0;

                                    const graphData = [];
                                    for (let i = dashboardPeriod - 1; i >= 0; i--) {
                                        const d = new Date();
                                        d.setDate(d.getDate() - i);
                                        const s = getStatsForDate(d);
                                        graphData.push({
                                            name: d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
                                            performance: Math.round((s.total > 0 ? (s.done / s.total) : 0) * 100),
                                            fullDate: d.toLocaleDateString()
                                        });
                                    }

                                    const avgPeriod = graphData.reduce((a, b) => a + b.performance, 0) / graphData.length;
                                    const bestDay = Math.max(...graphData.map(d => d.performance));

                                    return (
                                        <>
                                            {[
                                                { label: 'SCORE HOJE', value: `${Math.round(scoreHoje * 100)}%`, sub: 'MASTERY', color: '#f5a623', percentage: scoreHoje },
                                                { label: 'CONCLUÍDAS', value: `${todayCompleted}/${todayQuests}`, sub: 'QUESTS', color: '#0091ff', percentage: scoreHoje },
                                                { label: `MÉDIA ${dashboardPeriod}D`, value: `${Math.round(avgPeriod)}%`, sub: 'CONSISTÊNCIA', color: '#6e56cf', percentage: (avgPeriod / 100) },
                                                { label: 'RÉCORDE', value: `${Math.round(bestDay)}%`, sub: 'PEAK', color: '#2ed573', percentage: (bestDay / 100) },
                                            ].map(block => (
                                                <div key={block.label} className="dashboard-card !p-4 border-white/5 hover:border-white/10 w-full">
                                                    <div className="progress-circle-container !w-16 !h-16 !mb-2">
                                                        <svg className="progress-circle-svg" width="60" height="60">
                                                            <circle className="progress-circle-bg" cx="30" cy="30" r="26" strokeWidth="4" />
                                                            <circle
                                                                className="progress-circle-bar"
                                                                cx="30" cy="30" r="26"
                                                                stroke={block.color}
                                                                strokeWidth="4"
                                                                strokeDasharray={2 * Math.PI * 26}
                                                                strokeDashoffset={2 * Math.PI * 26 * (1 - block.percentage)}
                                                                strokeLinecap="round"
                                                            />
                                                        </svg>
                                                        <div className="progress-text">
                                                            <span className="progress-value !text-[10px]">{block.value}</span>
                                                        </div>
                                                    </div>
                                                    <div className="mt-1">
                                                        <div className="font-pixel text-[5px] text-dim uppercase tracking-widest">{block.sub}</div>
                                                        <div className="font-pixel text-[7px] text-bright uppercase mt-0.5">{block.label}</div>
                                                    </div>
                                                </div>
                                            ))}

                                            {/* Gráfico de Performance */}
                                            <div className="col-span-1 sm:col-span-2 lg:col-span-4 premium-card !p-6 md:!p-8 !bg-surface/30">
                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                                                    <h3 className="font-pixel text-[7px] md:text-[8px] text-bright flex items-center gap-2 leading-tight">
                                                        <Activity size={12} className="text-orange shrink-0" />
                                                        <span>GRÁFICO DE CONSTÂNCIA</span>
                                                    </h3>
                                                    <div className="flex items-center gap-2 self-end md:self-auto">
                                                        <div className="w-2 h-2 rounded-full bg-orange/40 animate-pulse"></div>
                                                        <span className="text-[8px] text-dim font-pixel uppercase tracking-widest">Eficiência %</span>
                                                    </div>
                                                </div>

                                                <div className="h-[250px] w-full">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <AreaChart data={graphData}>
                                                            <defs>
                                                                <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                                                                    <stop offset="5%" stopColor="#f5a623" stopOpacity={0.3} />
                                                                    <stop offset="95%" stopColor="#f5a623" stopOpacity={0} />
                                                                </linearGradient>
                                                            </defs>
                                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                                            <XAxis
                                                                dataKey="name"
                                                                axisLine={false}
                                                                tickLine={false}
                                                                tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 8, fontFamily: 'var(--font-pixel)' }}
                                                                dy={10}
                                                            />
                                                            <YAxis
                                                                axisLine={false}
                                                                tickLine={false}
                                                                tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 8, fontFamily: 'var(--font-pixel)' }}
                                                                domain={[0, 100]}
                                                            />
                                                            <Tooltip
                                                                contentStyle={{ backgroundColor: '#11141d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontFamily: 'var(--font-pixel)', fontSize: '10px' }}
                                                                itemStyle={{ color: '#f5a623' }}
                                                                cursor={{ stroke: 'rgba(255,166,35,0.2)', strokeWidth: 2 }}
                                                            />
                                                            <Area
                                                                type="monotone"
                                                                dataKey="performance"
                                                                stroke="#f5a623"
                                                                strokeWidth={3}
                                                                fillOpacity={1}
                                                                fill="url(#colorPerf)"
                                                            />
                                                        </AreaChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>
                        </div>
                    )}




                    {activeTab === 'calendar' && (
                        <div className="animate-slide-up calendar-container">
                            <div className="flex items-center justify-between mb-8 px-4">
                                <div>
                                    <h2 className="font-pixel text-[12px] text-orange mb-2">MAPA TEMPORAL</h2>
                                    <p className="font-pixel text-[7px] text-dim uppercase tracking-[2px]">Visão Estratégica do Mês</p>
                                </div>
                                <div className="flex items-center gap-4 bg-surface/30 p-2 rounded-2xl border border-white/5 font-pixel text-[8px]">
                                    <button
                                        onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1))}
                                        className="text-dim hover:text-orange text-lg px-2"
                                    >‹</button>
                                    <span className="uppercase">{calendarDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</span>
                                    <button
                                        onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1))}
                                        className="text-dim hover:text-orange text-lg px-2"
                                    >›</button>
                                </div>
                            </div>

                            <div className="premium-card !p-4 md:!p-6 !bg-surface/20 border-white/5 overflow-hidden">
                                <div className="calendar-grid-header">
                                    {['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'].map(d => (
                                        <div key={d} className="text-center font-pixel text-[6px] text-dim opacity-50">{d}</div>
                                    ))}
                                </div>

                                <div className="calendar-grid-days">
                                    {(() => {
                                        const days = [];
                                        const firstDay = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1);
                                        const lastDay = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 0);

                                        for (let i = 0; i < firstDay.getDay(); i++) {
                                            days.push(<div key={`empty-${i}`} className="calendar-empty-cell" />);
                                        }

                                        for (let d = 1; d <= lastDay.getDate(); d++) {
                                            const currentDayDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), d);
                                            const dateKey = currentDayDate.toLocaleDateString();
                                            const dateIso = `${currentDayDate.getFullYear()}-${String(currentDayDate.getMonth() + 1).padStart(2, '0')}-${String(currentDayDate.getDate()).padStart(2, '0')}`;
                                            const isToday = new Date().toLocaleDateString() === dateKey;

                                            const hasRecurring = (user.quests || []).some(q => q.isRecurring);
                                            const singleQuests = (user.quests || []).filter(q => !q.isRecurring && q.targetDate === dateIso);

                                            days.push(
                                                <div key={d} className={`calendar-day-box ${isToday ? 'is-today' : ''}`}>
                                                    <div className={`calendar-day-number ${isToday ? 'text-orange font-bold' : 'text-dim'}`}>
                                                        {d}
                                                    </div>

                                                    {hasRecurring && (
                                                        <div className="recurrence-flag">
                                                            <Flag size={12} fill="currentColor" />
                                                        </div>
                                                    )}

                                                    <div className="flex flex-col gap-1 overflow-y-auto no-scrollbar flex-1">
                                                        {singleQuests.map(q => {
                                                            const isDone = (q.completedDates || []).includes(dateKey);
                                                            const priorityClass = `calendar-priority-${(q.priority || 'NORMAL').toLowerCase()}`;

                                                            return (
                                                                <div
                                                                    key={q.id}
                                                                    onClick={() => handleCalendarQuestClick(q.id)}
                                                                    className={`calendar-quest-item ${priorityClass}`}
                                                                >
                                                                    <div className={`w-1 h-1 rounded-full shrink-0 ${isDone ? 'bg-green-400' : 'bg-white/40'}`}></div>
                                                                    <span className={`calendar-quest-text ${isDone ? 'line-through opacity-50' : ''}`}>
                                                                        {q.title}
                                                                    </span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                    {isToday && <div className="absolute bottom-2 right-2 opacity-30"><Zap size={10} className="text-orange" /></div>}
                                                </div>
                                            );
                                        }
                                        return days;
                                    })()}
                                </div>
                            </div>
                        </div>
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
                                                                <span className="text-sm font-bold text-bright tracking-wide block">{ex.name}</span>
                                                            </td>
                                                            <td className="py-5 text-center">
                                                                <span className="text-[10px] text-violet bg-violet/10 px-3 py-1.5 rounded-lg border border-violet/20">
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

                    {activeTab === 'dieta' && (
                        <div className="animate-slide-up pb-24 max-w-5xl mx-auto space-y-8">
                            {/* Header IA Reorganizado */}
                            <div className="flex flex-col md:flex-row items-stretch gap-6 mb-10">
                                <div className="flex-1 flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.1)] shrink-0">
                                        <Utensils size={28} className="text-green-400" />
                                    </div>
                                    <div>
                                        <h2 className="font-pixel text-[12px] text-green-400 mb-1">ALQUIMIA NUTRICIONAL</h2>
                                        <p className="font-pixel text-[6px] text-dim uppercase tracking-[2px]">Módulo de Forja Biológica IA</p>
                                    </div>
                                </div>

                                <div className="bg-[#161b22] px-8 py-4 rounded-3xl border border-white/5 flex flex-col justify-center min-w-[220px]">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-pixel text-[6px] text-dim uppercase">Cálculo de TDEE</span>
                                        <Activity size={10} className="text-green-500 opacity-40" />
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="font-pixel text-[14px] text-bright">{(() => {
                                            const weight = parseFloat(user.weight) || 70;
                                            const height = parseFloat(user.height) || 170;
                                            let base = weight * 22 * 1.35;
                                            if (user.goals.includes('Emagrecer')) base -= 500;
                                            if (user.goals.includes('Ganhar massa')) base += 500;
                                            return Math.round(base);
                                        })()}</span>
                                        <span className="font-pixel text-[6px] text-dim">KCAL / DIA</span>
                                    </div>
                                </div>
                            </div>

                            {/* Status Grid Compacto */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="premium-card !bg-surface/20 !p-4 border-white/5">
                                    <div className="flex items-center gap-3">
                                        <Flame size={14} className="text-orange" />
                                        <div>
                                            <span className="font-pixel text-[5px] text-dim uppercase block">Energia Alvo</span>
                                            <p className="font-pixel text-[8px] text-bright">{user.maxEnergy || 2180} KCAL</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="premium-card !bg-surface/20 !p-4 border-white/5">
                                    <div className="flex items-center gap-3">
                                        <Droplets size={14} className="text-blue" />
                                        <div>
                                            <span className="font-pixel text-[5px] text-dim uppercase block">Mana Líquida</span>
                                            <p className="font-pixel text-[8px] text-bright">{user.maxWater || 2450} ML</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="premium-card !bg-surface/20 !p-4 border-white/5">
                                    <div className="flex items-center gap-3">
                                        <Target size={14} className="text-hp-red" />
                                        <div>
                                            <span className="font-pixel text-[5px] text-dim uppercase block">Objetivo</span>
                                            <p className="font-pixel text-[8px] text-bright uppercase">{
                                                user.goals.includes('Emagrecer') ? 'Déficit' :
                                                    user.goals.includes('Ganhar massa') ? 'Massa' : 'Manter'
                                            }</p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={generateDailyPlan}
                                    className="premium-card !bg-green-500/10 hover:!bg-green-500/20 !p-4 border-green-500/20 text-center transition-all group active:scale-95"
                                >
                                    <RotateCcw size={14} className="text-green-400 mx-auto mb-1 group-hover:rotate-180 transition-transform duration-500" />
                                    <span className="font-pixel text-[6px] text-green-400 uppercase font-bold">Gerar pela IA</span>
                                </button>

                                <button
                                    onClick={() => setShowNewMealModal(true)}
                                    className="premium-card !bg-blue-500/10 hover:!bg-blue-500/20 !p-4 border-blue-500/20 text-center transition-all group active:scale-95"
                                >
                                    <Plus size={14} className="text-blue mx-auto mb-1" />
                                    <span className="font-pixel text-[6px] text-blue uppercase font-bold">Add Manual</span>
                                </button>
                            </div>

                            {/* Plano de Refeições IA */}
                            <div>
                                <h3 className="font-pixel text-[8px] text-bright tracking-widest mb-6 flex items-center gap-2">
                                    <ClipboardList size={14} className="text-green-400" /> PLANO DE REFEIÇÕES DIÁRIO
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {(user.dailyMealPlan || []).map((meal, idx) => {
                                        const isDone = (user.mealDone || []).includes(idx);
                                        return (
                                            <div
                                                key={idx}
                                                onClick={() => toggleMeal(idx)}
                                                className={`premium-card !bg-[#0d1117] border-white/5 !p-6 flex flex-col gap-4 relative group hover:border-green-500/30 transition-all overflow-hidden cursor-pointer ${isDone ? 'opacity-30 grayscale-[0.8]' : ''}`}
                                            >
                                                <div className="flex items-center justify-between z-10">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`font-pixel text-[8px] px-3 py-1.5 rounded-lg border transition-colors ${isDone ? 'bg-green-500/5 text-green-500/40 border-green-500/10' : 'bg-green-500/10 text-green-400 border-green-500/10'}`}>
                                                            {meal.time}
                                                        </div>
                                                        <h4 className={`font-pixel text-[9px] uppercase tracking-tighter transition-colors ${isDone ? 'text-dim line-through opacity-70' : 'text-bright group-hover:text-green-400'}`}>{meal.name}</h4>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className={`font-pixel text-[7px] transition-colors ${isDone ? 'text-dim/40 line-through' : 'text-dim'}`}>{meal.cals} KCAL</span>
                                                        {isDone && <Check size={12} className="text-green-500" />}
                                                    </div>
                                                </div>
                                                <p className={`text-[12px] leading-relaxed font-sans z-10 min-h-[40px] transition-colors ${isDone ? 'text-dim/40 italic line-through' : 'text-dim/80'}`}>
                                                    {meal.selectedItem}
                                                </p>
                                                <div className={`absolute top-0 right-0 w-24 h-24 blur-[40px] rounded-full pointer-events-none transition-colors ${isDone ? 'bg-green-500/2' : 'bg-green-500/5 group-hover:bg-green-500/10'}`}></div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Dica IA */}
                            <div className="premium-card !bg-[#161b22] border-green-500/10 p-6 flex items-center gap-6">
                                <div className="w-12 h-12 rounded-xl bg-green-500/5 flex items-center justify-center border border-green-500/10 shrink-0">
                                    <Star size={20} className="text-green-400 animate-pulse" />
                                </div>
                                <p className="text-[11px] text-dim italic leading-relaxed">
                                    "Lembre-se: O gerador de dietas alterna itens para garantir que seu metabolismo não estagne. Refeições variadas evitam a fadiga mental do sistema."
                                </p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'perfil' && (
                        <div className="animate-slide-up max-w-2xl mx-auto space-y-8 pb-32">
                            {/* Perfil Header Card */}
                            <div className="premium-card !p-8 bg-surface/30 border-white/5 relative overflow-hidden rounded-[32px]">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-violet/5 blur-[100px] -mr-32 -mt-32"></div>
                                <div className="flex flex-col items-center text-center relative z-10">
                                    <div className="w-24 h-24 rounded-3xl border-2 border-violet/30 p-1 mb-6 shadow-[0_0_30px_rgba(110,86,207,0.2)]">
                                        <div className="w-full h-full rounded-2xl overflow-hidden bg-deep">
                                            <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.name}`} alt="Avatar" className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                    <h2 className="font-pixel text-xl text-bright mb-2">{user.name}</h2>
                                    <div className="flex items-center gap-2 mb-8">
                                        <span className="font-pixel text-[8px] text-violet uppercase tracking-[3px]">{user.title}</span>
                                        <span className="text-dim">•</span>
                                        <span className="font-pixel text-[8px] text-orange uppercase tracking-[3px]">{user.characterClass}</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 w-full">
                                        <div className="bg-deep/50 p-6 rounded-2xl border border-white/5">
                                            <span className="font-pixel text-[6px] text-dim uppercase block mb-2 opacity-50">Nível Atual</span>
                                            <span className="font-pixel text-xl text-bright">{user.level}</span>
                                        </div>
                                        <div className="bg-deep/50 p-6 rounded-2xl border border-white/5">
                                            <span className="font-pixel text-[6px] text-dim uppercase block mb-2 opacity-50">Ouro Acumulado</span>
                                            <span className="font-pixel text-xl text-orange">{user.gold}G</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Stats & Goals Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="premium-card !p-8 bg-surface/20 border-white/5 rounded-[24px]">
                                    <h3 className="font-pixel text-[8px] text-bright mb-8 flex items-center gap-3">
                                        <Activity size={16} className="text-violet" />
                                        <span>ATRIBUTOS FÍSICOS</span>
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center bg-deep/40 p-4 rounded-xl border border-white/5">
                                            <span className="font-pixel text-[7px] text-dim uppercase">Peso corporal</span>
                                            <span className="font-pixel text-[10px] text-bright">{user.weight || '--'} KG</span>
                                        </div>
                                        <div className="flex justify-between items-center bg-deep/40 p-4 rounded-xl border border-white/5">
                                            <span className="font-pixel text-[7px] text-dim uppercase">Estatura</span>
                                            <span className="font-pixel text-[10px] text-bright">{user.height || '--'} CM</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="premium-card !p-8 bg-surface/20 border-white/5 rounded-[24px]">
                                    <h3 className="font-pixel text-[8px] text-bright mb-8 flex items-center gap-3">
                                        <Target size={16} className="text-hp-red" />
                                        <span>OBJETIVOS ATIVOS</span>
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {user.goals.length > 0 ? user.goals.map((goal, i) => (
                                            <span key={i} className="px-4 py-2 rounded-xl bg-hp-red/10 border border-hp-red/20 text-hp-red font-pixel text-[8px] uppercase tracking-wider">
                                                {goal}
                                            </span>
                                        )) : (
                                            <p className="font-pixel text-[7px] text-dim italic">Sem objetivos definidos</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Danger Zone Actions */}
                            <div className="pt-8 space-y-4">
                                <h3 className="font-pixel text-[7px] text-dim uppercase tracking-[3px] px-2">Zona de Gerenciamento</h3>
                                <div className="grid grid-cols-1 gap-3">
                                    <button
                                        onClick={() => setCurrentProfileId(null)}
                                        className="w-full h-16 rounded-2xl bg-surface/40 hover:bg-surface/60 border border-white/5 transition-all flex items-center justify-center gap-4 group"
                                    >
                                        <Users size={18} className="text-dim group-hover:text-violet transition-colors" />
                                        <span className="font-pixel text-[9px] text-bright uppercase tracking-widest">Trocar Personagem</span>
                                    </button>

                                    <button
                                        onClick={(e) => deleteProfile(e, user.id)}
                                        className="w-full h-16 rounded-2xl bg-hp-red/5 hover:bg-hp-red/10 border border-hp-red/10 hover:border-hp-red/30 transition-all flex items-center justify-center gap-4 group"
                                    >
                                        <Skull size={18} className="text-hp-red opacity-50 group-hover:opacity-100 transition-opacity" />
                                        <span className="font-pixel text-[9px] text-hp-red uppercase tracking-widest">Excluir Herói</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}


                    {/* Fail Modal */}
                    {
                        showFailModal && (
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
                        )
                    }
                    {/* New Quest Modal */}
                    {
                        showNewQuestModal && (
                            <div className="modal-overlay">
                                <div className="premium-card modal-card max-w-lg animate-slide-up !bg-[#0d1117] !p-8 !border-blue/30 shadow-[0_0_50px_rgba(0,145,255,0.15)]">
                                    <div className="flex items-center justify-between mb-8">
                                        <h2 className="font-pixel text-[10px] flex items-center gap-3 text-blue">
                                            <Plus size={20} /> FORJAR NOVA QUEST
                                        </h2>
                                        <button
                                            type="button"
                                            onClick={() => setShowNewQuestModal(false)}
                                            className="text-dim hover:text-white transition-colors p-2"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                    <form onSubmit={addNewQuest} className="space-y-6">
                                        <div className="space-y-4">
                                            <input
                                                type="text"
                                                placeholder="Título da tarefa..."
                                                className="w-full bg-[#161b22] border-transparent p-4 rounded-xl text-sm focus:border-blue/50 outline-none transition-all font-sans"
                                                value={newQuestData.title}
                                                onChange={e => setNewQuestData(prev => ({ ...prev, title: e.target.value }))}
                                                required
                                            />

                                            <textarea
                                                placeholder="Descrição (opcional)"
                                                className="w-full bg-[#161b22] border-transparent p-4 rounded-xl text-sm focus:border-blue/50 outline-none transition-all font-sans min-h-[80px] resize-none"
                                                value={newQuestData.desc}
                                                onChange={e => setNewQuestData(prev => ({ ...prev, desc: e.target.value }))}
                                            />

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="font-pixel text-[6px] text-dim uppercase">Data Limite de Entrega</label>
                                                    <input
                                                        type="date"
                                                        className="w-full bg-[#161b22] border-transparent p-3 rounded-xl text-[10px] outline-none font-sans"
                                                        value={newQuestData.targetDate}
                                                        onChange={e => setNewQuestData(prev => ({ ...prev, targetDate: e.target.value }))}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="font-pixel text-[6px] text-dim uppercase">Duração (Min)</label>
                                                    <input
                                                        type="number"
                                                        placeholder="30"
                                                        className="w-full bg-[#161b22] border-transparent p-3 rounded-xl text-sm outline-none font-sans"
                                                        value={newQuestData.time}
                                                        onChange={e => setNewQuestData(prev => ({ ...prev, time: e.target.value }))}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between bg-[#161b22] p-4 rounded-xl">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-sans font-medium">RECORRENTE</span>
                                                    <span className="text-[8px] font-pixel text-dim">HABITO DIÁRIO</span>
                                                </div>
                                                <label className="switch relative inline-block w-10 h-6">
                                                    <input
                                                        type="checkbox"
                                                        checked={newQuestData.isRecurring}
                                                        onChange={e => setNewQuestData(prev => ({ ...prev, isRecurring: e.target.checked }))}
                                                        className="opacity-0 w-0 h-0"
                                                    />
                                                    <span className={`slider round absolute cursor-pointer inset-0 bg-[#0d1117] border border-white/10 transition-all rounded-full before:absolute before:content-[''] before:h-4 before:w-4 before:left-1 before:bottom-0.8 before:bg-blue before:transition-all before:rounded-full ${newQuestData.isRecurring ? 'before:translate-x-4 before:!bg-orange !border-orange/30' : ''}`}></span>
                                                </label>
                                            </div>

                                            <div className="space-y-4 pt-2">
                                                <label className="font-pixel text-[6px] text-dim uppercase">Prioridade da Quest</label>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {[
                                                        { id: 'Alta', label: 'ALTA', color: 'text-hp-red', border: 'border-hp-red/50' },
                                                        { id: 'Média', label: 'MÉDIA', color: 'text-orange', border: 'border-orange/50' },
                                                        { id: 'Normal', label: 'NORMAL', color: 'text-blue', border: 'border-blue/50' },
                                                        { id: 'Sem prioridade', label: 'SEM PRIORIDADE', color: 'text-dim', border: 'border-white/10' }
                                                    ].map(p => (
                                                        <button
                                                            key={p.id}
                                                            type="button"
                                                            onClick={() => setNewQuestData(prev => ({ ...prev, priority: p.id }))}
                                                            className={`px-4 py-3 rounded-xl font-pixel text-[7px] border flex items-center justify-center gap-2 transition-all ${newQuestData.priority === p.id ? `bg-surface ${p.border} ${p.color} shadow-[0_0_15px_rgba(255,255,255,0.05)]` : 'bg-[#161b22] border-transparent text-dim hover:border-white/10'}`}
                                                        >
                                                            <Flag size={10} fill={newQuestData.priority === p.id ? 'currentColor' : 'none'} />
                                                            {p.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center">
                                                    <label className="font-pixel text-[7px] text-dim uppercase">Peso / Esforço</label>
                                                    <span className="font-pixel text-orange text-sm">{newQuestData.difficulty}</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="1"
                                                    max="10"
                                                    className="w-full accent-orange"
                                                    value={newQuestData.difficulty}
                                                    onChange={e => setNewQuestData(prev => ({ ...prev, difficulty: e.target.value }))}
                                                />
                                                <div className="flex justify-between font-pixel text-[5px] text-dim">
                                                    <span>FÁCIL</span>
                                                    <span>DIFÍCIL</span>
                                                </div>
                                            </div>

                                            <div className="space-y-4 pt-2">
                                                <label className="font-pixel text-[6px] text-dim uppercase">Categoria da Missão</label>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {[
                                                        { id: 'HÁBITOS', label: 'HÁBITOS', color: 'text-violet', border: 'border-violet/50' },
                                                        { id: 'TAREFAS', label: 'TAREFAS', color: 'text-blue', border: 'border-blue/50' },
                                                        { id: 'HIGIENE', label: 'HIGIENE', color: 'text-green-400', border: 'border-green-400/50' },
                                                        { id: 'DIETA', label: 'DIETA', color: 'text-orange', border: 'border-orange/50' }
                                                    ].map(cat => (
                                                        <button
                                                            key={cat.id}
                                                            type="button"
                                                            onClick={() => setNewQuestData(prev => ({
                                                                ...prev,
                                                                category: cat.id,
                                                                isRecurring: cat.id !== 'TAREFAS'
                                                            }))}
                                                            className={`px-4 py-3 rounded-xl font-pixel text-[7px] border flex items-center justify-center gap-2 transition-all ${newQuestData.category === cat.id ? `bg-surface/80 ${cat.border} ${cat.color} shadow-[0_0_15px_rgba(255,255,255,0.05)]` : 'bg-[#161b22] border-transparent text-dim hover:border-white/10'}`}
                                                        >
                                                            {cat.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-3 pt-4">
                                            <button
                                                type="submit"
                                                className="btn-primary flex-[2]"
                                            >
                                                ADICIONAR MISSAO
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setShowNewQuestModal(false)}
                                                className="btn-action flex-1"
                                            >
                                                CANCELAR
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )
                    }

                    {/* Modal de Nova Refeição */}
                    {
                        showNewMealModal && (
                            <div className="modal-overlay">
                                <div className="premium-card modal-card max-w-lg animate-slide-up">
                                    <div className="flex items-center justify-between mb-8">
                                        <h2 className="font-pixel text-[10px] flex items-center gap-3 text-green-400">
                                            <Utensils size={20} /> FORJAR ALIMENTO
                                        </h2>
                                        <button onClick={() => setShowNewMealModal(false)} className="text-dim hover:text-white transition-colors p-2">
                                            <X size={20} />
                                        </button>
                                    </div>
                                    <form onSubmit={addManualMeal} className="space-y-6">
                                        <div className="space-y-4">
                                            <div>
                                                <label className="font-pixel text-[6px] text-dim uppercase mb-2 block">Título do Alimento</label>
                                                <input
                                                    type="text"
                                                    placeholder="Ex: Almoço de Guerreiro"
                                                    className="w-full bg-[#161b22] border-transparent p-4 rounded-xl text-sm focus:border-green-500/50 outline-none transition-all font-sans"
                                                    value={newMealData.title}
                                                    onChange={e => setNewMealData(prev => ({ ...prev, title: e.target.value }))}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="font-pixel text-[6px] text-dim uppercase mb-2 block">Descritivo (Ingredientes)</label>
                                                <textarea
                                                    placeholder="Ex: 200g de frango + 100g de arroz integral"
                                                    className="w-full bg-[#161b22] border-transparent p-4 rounded-xl text-sm focus:border-green-500/50 outline-none transition-all font-sans min-h-[100px] resize-none"
                                                    value={newMealData.desc}
                                                    onChange={e => setNewMealData(prev => ({ ...prev, desc: e.target.value }))}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="font-pixel text-[6px] text-dim uppercase mb-2 block">Horário</label>
                                                <input
                                                    type="time"
                                                    className="w-full bg-[#161b22] border-transparent p-4 rounded-xl text-sm focus:border-green-500/50 outline-none transition-all font-sans"
                                                    value={newMealData.time}
                                                    onChange={e => setNewMealData(prev => ({ ...prev, time: e.target.value }))}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="bg-green-500/5 p-4 rounded-xl border border-green-500/20 flex gap-4 items-center">
                                            <span className="text-xl">🤖</span>
                                            <p className="text-[9px] text-dim italic">A IA calculará automaticamente as calorias baseando-se nos seus ingredientes após salvar.</p>
                                        </div>
                                        <button type="submit" className="btn-primary w-full py-4">
                                            FORJAR ALIMENTO
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )
                    }
                    {/* Redundant profileToDelete modal removed from here to fix JSX structure and address redundancy */}
                </div>
            </div>
        </div>
    );
}
