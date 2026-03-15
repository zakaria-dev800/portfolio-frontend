import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Work() {
    const [works, setWorks] = useState(() => {
        const cached = typeof window !== 'undefined' ? localStorage.getItem("work_services_cache") : null;
        return cached ? JSON.parse(cached) : [];
    });

    const [loading, setLoading] = useState(works.length === 0);

    useEffect(() => {
        fetch('https://portfolio-backend-production-013e.up.railway.app/api/services')
            .then(res => res.json())
            .then(json => {
                if (json.status) {
                    setWorks(json.data);
                    localStorage.setItem("work_services_cache", JSON.stringify(json.data));
                }
            })
            .catch(err => console.error("Erreur API:", err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <section id="work" className="w-full px-[6%] py-24 scroll-mt-20 bg-transparent dark:bg-transparent relative overflow-hidden">

            {/* ── Ambient Background (Glow) ── */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            {/* ── Header ── */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-center mb-12"
            >
                <h2 className="text-4xl font-Ovo dark:text-white tracking-tight">
                    <span className="italic text-gray-400 dark:text-white/40">Works & Services</span>
                </h2>
            </motion.div>

            {/* ── Grid ── */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 max-w-[1400px] mx-auto relative z-10">
                <AnimatePresence mode="wait">
                    {loading && works.length === 0 ? (
                        [1, 2, 3, 4, 5].map(i => (
                            <div
                                key={i}
                                className="aspect-square bg-gray-100/50 dark:bg-white/5 animate-pulse rounded-2xl border border-gray-200/50 dark:border-white/5"
                            />
                        ))
                    ) : (
                        works.map((item, index) => (
                            <motion.div
                                key={item.id || index}
                                initial={{ opacity: 0, scale: 0.92 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
                                whileHover={{ scale: 1.03, zIndex: 10 }}
                                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-gray-100/40 dark:bg-zinc-900/40 backdrop-blur-sm border border-gray-200/50 dark:border-white/5 shadow-sm transition-all duration-500"
                            >
                                {/* Background image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${item.icon || './assets/work-1.png'})` }}
                                />

                                {/* Base overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80" />

                                {/* Hover overlay (Purple tint) */}
                                <div className="absolute inset-0 bg-purple-900/0 group-hover:bg-purple-900/40 transition-all duration-400" />

                                {/* Index badge */}
                                <div className="absolute top-2.5 left-2.5 w-6 h-6 bg-black/40 dark:bg-black/60 backdrop-blur-md rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75 border border-white/10">
                                    <span className="text-[9px] font-mono text-white/80">{String(index + 1).padStart(2, '0')}</span>
                                </div>

                                {/* Content on hover */}
                                <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-3 group-hover:translate-y-0">
                                    <h3 className="text-white font-bold text-sm leading-tight mb-1 drop-shadow-md" style={{ fontFamily: 'Syne, sans-serif' }}>
                                        {item.name}
                                    </h3>
                                    <p className="text-white/80 text-[10px] line-clamp-2 leading-snug mb-3 font-Ovo">
                                        {item.description}
                                    </p>

                                    {/* Action button */}
                                    <div className="flex justify-end">
                                        <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-xl group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 transition-transform group-hover:rotate-45">
                                                <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom underline effect like About */}
                                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-purple-500 group-hover:w-full transition-all duration-500" />
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}