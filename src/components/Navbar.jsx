import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const sideMenuRef = useRef();
    const navRef = useRef();
    const navLinkRef = useRef();

    const [user, setUser] = useState(() => {
        const cached = typeof window !== 'undefined' ? localStorage.getItem("user_data") : null;
        return cached ? JSON.parse(cached) : { name: "Loading...", email: "" };
    });
    const [activeSection, setActiveSection] = useState('header');

    useEffect(() => {
        fetch("https://portfolio-backend-production-013e.up.railway.app/api/users/1")
            .then((res) => res.json())
            .then((res) => {
                const userData = res.status ? res.data : res;
                setUser(userData);
                localStorage.setItem("user_data", JSON.stringify(userData));
            })
            .catch((err) => console.error("Error fetching user:", err));
    }, []);

    const scrollToSection = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const offset = 80; 
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        closeMenu();
    };

    const openMenu = () => {
        sideMenuRef.current.style.transform = 'translateX(-16rem)';
    };
    const closeMenu = () => {
        sideMenuRef.current.style.transform = 'translateX(16rem)';
    };

    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
        localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    };

    // 3. Scroll Effects & Intersection Observer
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                navRef.current.classList.add('bg-white/80', 'backdrop-blur-xl', 'shadow-sm', 'dark:bg-[#080810]/80', 'dark:shadow-purple-500/5');
                navLinkRef.current.classList.remove('bg-white/60', 'dark:bg-transparent');
            } else {
                navRef.current.classList.remove('bg-white/80', 'backdrop-blur-xl', 'shadow-sm', 'dark:bg-[#080810]/80', 'dark:shadow-purple-500/5');
                navLinkRef.current.classList.add('bg-white/60', 'dark:bg-transparent');
            }
        };

        const sectionIds = ['header', 'about', 'services', 'work', 'contact'];
        const observerOptions = { threshold: 0.5 };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) setActiveSection(e.target.id);
            });
        }, observerOptions);

        sectionIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) sectionObserver.observe(el);
        });

        window.addEventListener('scroll', handleScroll);

        // Dark Mode Check
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            sectionObserver.disconnect();
        };
    }, []);

    const navItems = [
        { label: 'Home', href: 'header', id: 'header' },
        { label: 'About', href: 'about', id: 'about' },
        { label: 'Services', href: 'services', id: 'services' },
        { label: 'Work', href: 'work', id: 'work' },
        { label: 'Contact', href: 'contact', id: 'contact' },
    ];

    return (
        <>
            <div className="fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%] dark:hidden pointer-events-none">
                <img src="./assets/header-bg-color.png" alt="" className="w-full opacity-50" />
            </div>

            <nav ref={navRef} className="w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 transition-all duration-500">

                {/* Logo Section */}
                <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-orange-400 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/30 text-sm font-Ovo overflow-hidden">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'Z'}
                    </div>
                    <span className="text-lg font-bold dark:text-white tracking-tight hidden sm:block" style={{ fontFamily: 'Syne, sans-serif' }}>
                        {user.name}
                    </span>
                </div>

                {/* Desktop Menu */}
                <ul ref={navLinkRef} className="hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 bg-white shadow-sm bg-opacity-50 font-Ovo dark:border dark:border-white/50 dark:bg-transparent transition-all duration-300">
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                onClick={(e) => scrollToSection(e, item.id)}
                                className={`text-lg transition-all duration-300 block 
                    ${activeSection === item.id
                                        ? 'text-purple-600 dark:text-purple-400 font-semibold scale-105'
                                        : 'text-gray-700 dark:text-white/80 hover:text-purple-500'
                                    }`}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <button onClick={toggleTheme} className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/8 transition-all duration-200 border border-transparent hover:border-gray-200 dark:hover:border-white/10">
                        <img src="./assets/moon_icon.png" alt="" className="w-4.5 dark:hidden" />
                        <img src="./assets/sun_icon.png" alt="" className="w-4.5 hidden dark:block" />
                    </button>

                    <a
                        href="#contact"
                        onClick={(e) => scrollToSection(e, 'contact')}
                        className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-purple-600 dark:bg-white dark:text-gray-900 dark:hover:bg-purple-500 dark:hover:text-white text-white text-sm font-semibold rounded-full transition-all duration-300 shadow-lg"
                        style={{ fontFamily: 'Syne, sans-serif' }}
                    >
                        Let's Talk
                        <span className="w-4 h-4 rounded-full border border-white/30 flex items-center justify-center text-[9px]">↗</span>
                    </a>

                    <button className="block md:hidden w-9 h-9 rounded-xl flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/8 transition-all" onClick={openMenu}>
                        <img src="./assets/menu-black.png" alt="" className="w-5 dark:hidden" />
                        <img src="./assets/menu-white.png" alt="" className="w-5 hidden dark:block" />
                    </button>
                </div>

                {/* Mobile Drawer */}
                <ul ref={sideMenuRef} className="flex md:hidden flex-col gap-2 py-24 px-6 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-white dark:bg-[#0f0f1a] shadow-2xl transition-transform duration-500 border-l border-gray-100 dark:border-white/5">
                    <div className="absolute right-5 top-5 w-9 h-9 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center cursor-pointer" onClick={closeMenu}>
                        <img src="./assets/close-black.png" alt="" className="w-4 dark:hidden" />
                        <img src="./assets/close-white.png" alt="" className="w-4 hidden dark:block" />
                    </div>

                    <div className="mb-4 pb-4 border-b border-gray-100 dark:border-white/5">
                        <p className="text-sm font-semibold dark:text-white">{user.name}</p>
                    </div>

                    {navItems.map((item) => (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                onClick={(e) => scrollToSection(e, item.id)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200
                                    ${activeSection === item.id ? 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-white/60'}`}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}