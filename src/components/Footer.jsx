import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Footer() {
    const [user, setUser] = useState(() => {
        const cached = typeof window !== 'undefined' ? localStorage.getItem("user_data") : null;
        return cached ? JSON.parse(cached) : { name: "Loading...", email: "" };
    });

    const [socials, setSocials] = useState(() => {
        const cachedLinks = typeof window !== 'undefined' ? localStorage.getItem("social_links") : null;
        return cachedLinks ? JSON.parse(cachedLinks) : [];
    });

    const year = new Date().getFullYear();

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/users/1")
            .then((res) => res.json())
            .then((res) => {
                const userData = res.status ? res.data : res;
                setUser(userData);
                localStorage.setItem("user_data", JSON.stringify(userData));
            })
            .catch((err) => console.error("Footer User Error:", err));

        fetch("http://127.0.0.1:8000/api/links")
            .then((res) => res.json())
            .then((res) => {
                if (res.status && res.data) {
                    setSocials(res.data);
                    localStorage.setItem("social_links", JSON.stringify(res.data));
                }
            })
            .catch((err) => console.error("Footer Links Error:", err));
    }, []);

    return (
        <footer className="w-full bg-transparent mt-20">
            <div className="mx-[10%] h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />

            <div className="px-[10%] py-16">
                <div className="flex flex-col md:flex-row items-center justify-between gap-10">

                    <div className="flex flex-col items-center md:items-start gap-4">
                        <motion.div whileHover={{ scale: 1.05 }} className="relative group text-lg font-bold dark:text-white font-Ovo">
                            <div>{user.name}</div>
                            <div className="absolute -bottom-2 left-0 w-0 h-[2px] bg-purple-600 group-hover:w-full transition-all duration-500" />
                        </motion.div>

                        <a
                            href={`https://mail.google.com/mail/?view=cm&to=${user.email}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 group mt-2"
                        >
                            <div className="w-9 h-9 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center border border-gray-200 dark:border-white/10 group-hover:border-purple-500/50 transition-all duration-300">
                                <img src="./assets/mail_icon.png" alt="" className="w-4 dark:hidden" />
                                <img src="./assets/mail_icon_dark.png" alt="" className="w-4 hidden dark:block" />
                            </div>
                            <span className="text-sm text-gray-600 dark:text-white/50 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors font-Ovo">
                                {user.email}
                            </span>
                        </a>
                    </div>

                    {/* Dynamic Social Links mn Cache/API */}
                    <nav className="flex items-center p-1 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-white/10">
                        {socials.length > 0 ? (
                            socials.map((s) => (
                                <a
                                    key={s.id}
                                    href={s.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-5 py-2 text-sm font-medium text-gray-500 dark:text-white/40 hover:text-purple-600 dark:hover:text-white rounded-xl hover:bg-white dark:hover:bg-white/10 transition-all duration-300 font-Ovo capitalize"
                                >
                                    {s.name}
                                </a>
                            ))
                        ) : (
                            <div className="px-5 py-2 text-xs text-gray-400 animate-pulse">Loading...</div>
                        )}
                    </nav>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-white/30 dark:bg-black/20 backdrop-blur-md py-6 border-t border-gray-200 dark:border-white/5">
                <div className="max-w-7xl mx-auto px-[10%] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[11px] text-gray-500 dark:text-white/20 font-Ovo tracking-wide uppercase">
                        © {year} Built with ❤️ by{' '}
                        <span className="text-gray-900 dark:text-white/60 font-bold hover:text-purple-600 transition-colors cursor-pointer">
                            {user.name}
                        </span>
                        . All rights reserved.
                    </p>

                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/5 border border-green-500/10">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                        <span className="text-[10px] font-bold text-green-600 dark:text-green-500/80 uppercase tracking-tighter">
                            Available for new projects
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}