import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Services() {
    const [projects, setProjects] = useState(() => {
        const cached = typeof window !== 'undefined' ? localStorage.getItem("projects_cache") : null;
        return cached ? JSON.parse(cached) : [];
    });
    const [loading, setLoading] = useState(projects.length === 0);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/projects")
            .then((res) => res.json())
            .then((res) => {
                if (res.status) {
                    setProjects(res.data);
                    localStorage.setItem("projects_cache", JSON.stringify(res.data));
                }
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <section id="services" className="w-full px-[10%] py-24 scroll-mt-20 relative overflow-hidden bg-transparent">
            <div className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-Ovo dark:text-white mb-3 tracking-tight">
                        Latest <span className="gradient-text italic">Projects</span>
                    </h2>
                    <div className="h-px w-16 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mt-6" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="wait">
                        {loading && projects.length === 0
                            ? [1, 2, 3].map((n) => <SkeletonCard key={n} />)
                            : projects.map((project, i) => (
                                <ProjectCard key={project.id || i} project={project} index={i} />
                            ))
                        }
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

function ProjectCard({ project, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="group relative rounded-2xl bg-white/50 dark:bg-gray-900/20 backdrop-blur-sm border border-gray-300 dark:border-white/20 p-8 h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:border-purple-500/50"
        >
            <div className="w-12 h-12 bg-gray-100 dark:bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors duration-300">
                <img src="./assets/web-icon.png" alt="" className="w-6 dark:invert group-hover:invert" />
            </div>

            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-purple-600 transition-colors">
                {project.name}
            </h3>

            <p className="text-gray-600 dark:text-white/70 text-sm leading-relaxed mb-6 font-Ovo flex-1">
                {project.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/10">
                <a
                    href={project.link_project} 
                    target="_blank"            
                    className="text-xs font-bold uppercase tracking-widest text-gray-600 dark:text-white/60 hover:text-purple-600 transition-colors"
                >
                    View Project →
                </a>
            </div>

            {/* Underline b7al dyal About */}
            <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-purple-600 group-hover:w-full transition-all duration-500" />
        </motion.div>
    );
}

function SkeletonCard() {
    return (
        <div className="bg-white/50 dark:bg-white/5 rounded-2xl p-8 h-[300px] animate-pulse border border-gray-200 dark:border-white/10" />
    );
}