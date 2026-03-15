import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DecryptedText from "@/components/DecryptedText";

export default function Header() {
    const [user, setUser] = useState(null);

    useEffect(() => {

        const cachedUser = localStorage.getItem("user_data");
        if (cachedUser) {
            setUser(JSON.parse(cachedUser));
        }

        fetch("https://portfolio-backend-production-013e.up.railway.app/api/users/1")
            .then((res) => res.json())
            .then((data) => {
                setUser(data);
                localStorage.setItem("user_data", JSON.stringify(data));
            })
            .catch((err) => console.error("Error fetching user data:", err));
    }, []);

    if (!user) return (
        <div className="h-screen flex items-center justify-center bg-white dark:bg-gray-900">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-purple-500"></div>
        </div>
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.18, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 24, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
    };

    return (
        <motion.div
            id="header"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-6 relative"
        >
            {/* Ambient glow behind avatar */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
                <div className="w-72 h-72 rounded-full bg-purple-500/10 dark:bg-purple-500/6 blur-[80px] animate-pulse" />
            </div>

            {/* ── Avatar ── */}
            <motion.div variants={itemVariants} className="relative">
                <div className="absolute -inset-3 rounded-full border border-dashed border-purple-300/40 dark:border-purple-500/20 animate-spin_slow" />
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-purple-500/20 to-orange-400/20 blur-sm" />
                <motion.img
                    whileHover={{ scale: 1.06 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    src="./assets/profil_img.jpeg" // T-akked mn path f dossier public
                    alt={user.name}
                    className="rounded-full w-32 h-32 object-cover ring-4 ring-white dark:ring-gray-900 shadow-2xl relative z-10"
                />
                <div className="absolute bottom-1 right-1 z-20 w-5 h-5 bg-green-400 rounded-full ring-2 ring-white dark:ring-gray-900 flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-300 rounded-full animate-ping absolute" />
                </div>
            </motion.div>

            {/* ── Greeting ── */}
            <motion.h3
                variants={itemVariants}
                className="flex items-center gap-2.5 text-xl md:text-2xl font-Ovo text-gray-500 dark:text-gray-400"
            >
                Hi! I'm
                <span className="font-bold text-gray-900 dark:text-white tracking-tight">
                    <DecryptedText
                        text={user.name}
                        animateOn="view"
                        revealDirection="start"
                        speed={80}
                        sequential={true}
                        className="revealed"
                        encryptedClassName="text-purple-400 dark:text-purple-500"
                    />
                </span>
                <motion.span
                    animate={{ rotate: [0, 22, -8, 22, 0] }}
                    transition={{ repeat: Infinity, duration: 2, repeatDelay: 2 }}
                    className="inline-block origin-bottom-right text-2xl"
                >
                    👋
                </motion.span>
            </motion.h3>

            {/* ── Main Headline ── */}
            <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-6xl lg:text-[70px] font-Ovo leading-[1.1] tracking-tight text-balance"
            >
                <span className="gradient-text italic font-bold">
                    {user.options}
                </span>
                <span className="text-gray-800 dark:text-white/90"> based in </span>
                <span className="relative inline-block text-gray-800 dark:text-white/90">
                    {user.location}
                    <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 100 6" preserveAspectRatio="none">
                        <path d="M0,5 Q25,0 50,4 Q75,8 100,3" stroke="#7c3aed" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
                    </svg>
                </span>
                .
            </motion.h1>

            {/* ── Bio ── */}
            <motion.p
                variants={itemVariants}
                className="max-w-xl mx-auto font-Ovo text-gray-500 dark:text-gray-400 leading-relaxed text-base sm:text-lg"
            >
                {user.resume}
            </motion.p>

            {/* ── CTA Buttons ── */}
            <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center gap-3 mt-2"
            >
                <motion.a
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    href="#contact"
                    className="group px-8 py-3.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold text-sm flex items-center gap-2.5 shadow-lg hover:shadow-purple-500/25 hover:bg-purple-600 dark:hover:bg-purple-500 dark:hover:text-white transition-all duration-300"
                >
                    Contact me
                    <span className="w-5 h-5 rounded-full bg-white/20 dark:bg-black/10 flex items-center justify-center group-hover:translate-x-0.5 transition-transform text-[10px]">→</span>
                </motion.a>

                <motion.a
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    // L-URL dial Railway direct bach i-te7el l-CV f ay blassa
                    href={`https://portfolio-backend-production-013e.up.railway.app/storage/${user.cv_pdf}`}
                    target="_blank"
                    className="px-8 py-3.5 rounded-full border border-gray-200 dark:border-white/15 text-gray-700 dark:text-white text-sm font-semibold flex items-center gap-2.5 hover:border-purple-400 dark:hover:border-purple-500/50 hover:bg-purple-50 dark:hover:bg-purple-500/8 transition-all duration-300 bg-white/60 dark:bg-transparent backdrop-blur-sm"
                >
                    My resume
                    <img src="./assets/download-icon.png" alt="" className="w-3.5 dark:invert opacity-70" />
                </motion.a>
            </motion.div>

            {/* ── Scroll hint ── */}
            <motion.div
                variants={itemVariants}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-gray-400 dark:via-white to-transparent animate-pulse" />
                <span className="text-[10px] tracking-[0.2em] uppercase font-Ovo text-gray-400 dark:text-white/50">Scroll</span>
            </motion.div>
        </motion.div>
    );
}