import { useEffect, useState } from 'react';
import Contact from './components/Contact'
import Footer from './components/Footer'
import Work from './components/Work'
import Services from './components/Services'
import About from './components/About'
import Header from './components/Header'
import Navbar from './components/Navbar'
import LenisScroll from './components/LenisScroll'

export default function App() {
    const [isAppLoading, setIsAppLoading] = useState(true);

    useEffect(() => {
        // Scroll progress bar
        const bar = document.getElementById('scroll-progress');
        const onScroll = () => {
            if (!bar) return;
            const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
            bar.style.width = pct + '%';
        };
        window.addEventListener('scroll', onScroll, { passive: true });

        // Scroll reveal observer
        const revealObserver = new IntersectionObserver(
            (entries) => entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('in-view');
                    revealObserver.unobserve(e.target);
                }
            }),
            { threshold: 0.1 }
        );
        // observe after content mounts
        const timer = setTimeout(() => {
            setIsAppLoading(false);
            document.querySelectorAll('.reveal-section').forEach(el => revealObserver.observe(el));
        }, 1000);

        return () => {
            window.removeEventListener('scroll', onScroll);
            clearTimeout(timer);
            revealObserver.disconnect();
        };
    }, []);

    return (
        <div className="relative">
            {/* Scroll Progress Bar */}
            <div id="scroll-progress" />

            {/* Full Page Loading Layer */}
            {isAppLoading && (
                <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-[#080810]">
                    {/* Animated logo loader */}
                    <div className="h-screen flex items-center justify-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-purple-500"></div>
                    </div>
                </div>
            )}
            <div id="laoding" className={`${isAppLoading ? 'h-screen overflow-hidden opacity-0' : 'opacity-100 transition-opacity duration-1000'}`}>
                <LenisScroll />
                <Navbar />
                <Header />
                <About />
                <Services />
                <Work />
                <Contact />
                <Footer />
            </div>
        </div>
    );
}