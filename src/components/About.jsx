import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function About() {
    const [skills, setSkills] = useState("");
    const [education, setEducation] = useState("");
    const [projectCount, setProjectCount] = useState(0);
    const [userData, setUserData] = useState(null);

    const tools = [
        { name: 'vscode', icon: './assets/vscode.png' },
        { name: 'mongodb', icon: './assets/mongodb.png' },
        { name: 'figma', icon: './assets/figma.png' },
        { name: 'git', icon: './assets/git.png' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            // 1. Get from Local Storage first
            const cachedData = localStorage.getItem("portfolio_cache");
            if (cachedData) {
                const parsed = JSON.parse(cachedData);
                if (parsed.skills) setSkills(parsed.skills);
                if (parsed.user) setUserData(parsed.user);
                if (parsed.education) setEducation(parsed.education);
                if (parsed.projectCount) setProjectCount(parsed.projectCount);
            }

            try {
                // 2. Fetch fresh data
                const [skillsRes, eduRes, projectsRes] = await Promise.all([
                    fetch("https://portfolio-backend-production-013e.up.railway.app/api/skills").then(r => r.json()),
                    fetch("https://portfolio-backend-production-013e.up.railway.app/api/educations").then(r => r.json()),
                    fetch("https://portfolio-backend-production-013e.up.railway.app/api/projects").then(r => r.json())
                ]);

                let newData = {};

                if (skillsRes.status) {
                    const skillsString = skillsRes.data.map(s => s.name).join(', ');
                    setSkills(skillsString);
                    setUserData(skillsRes.data[0].user);
                    newData.skills = skillsString;
                    newData.user = skillsRes.data[0].user;
                }

                if (eduRes.status) {
                    const eduString = eduRes.data.map(e => e.school_name).join(' | ');
                    setEducation(eduString);
                    newData.education = eduString;
                }

                if (projectsRes.status) {
                    setProjectCount(projectsRes.data.length);
                    newData.projectCount = projectsRes.data.length;
                }

                // 3. Update Cache
                if (Object.keys(newData).length > 0) {
                    localStorage.setItem("portfolio_cache", JSON.stringify(newData));
                }
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };

        fetchData();
    }, []); // Only one useEffect needed

    // Animation Configurations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 100, damping: 15, mass: 0.8 }
        }
    };

    const infoData = [
        {
            name: 'Languages',
            icon1: './frontend/dist/assets/code-icon.png',
            icon2: './frontend/dist/assets/code-icon-dark.png',
            description: skills || 'Loading skills...',
        },
        {
            name: 'Education',
            icon1: './frontend/dist/assets/edu-icon.png',
            icon2: './frontend/dist/assets/edu-icon-dark.png',
            description: education || 'Loading education...',
        },
        {
            name: 'Projects',
            icon1: './frontend/dist/assets/project-icon.png',
            icon2: './frontend/dist/assets/project-icon-dark.png',
            description: `More than ${projectCount} advanced projects built`,
        },
    ];

    return (
        <section id="about" className="w-full px-[10%] py-20 scroll-mt-20 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
            >
            </motion.div>

            <div className="flex w-full flex-col lg:flex-row items-center gap-24 my-20">
                {/* Image Section */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="max-w-max mx-auto relative group"
                >
                    <img
                        src={userData ? `./assets/profil_img.jpeg` : './assets/user-image.png'}
                        alt="Profile"
                        className="w-64 sm:w-80 rounded-3xl shadow-2xl border-2 border-white dark:border-gray-800 z-10 relative transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="bg-white dark:bg-gray-900 w-1/2 aspect-square absolute right-0 bottom-0 rounded-full translate-x-1/4 translate-y-1/3 shadow-xl flex items-center justify-center border dark:border-white/10 z-20">
                        <img src="./assets/option2.png" alt="" className="w-full animate-spin_slow dark:invert" />
                        <img src="./assets/dev-icon.png" alt="" className="w-1/4 absolute dark:invert" />
                    </div>
                </motion.div>

                {/* Content Section */}
                <div className="flex-1">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="mb-12 max-w-3xl font-Ovo text-gray-700 dark:text-white/80 leading-relaxed text-lg"
                    >
                        {userData ? userData.resume : "..."}
                    </motion.p>

                    <motion.ul
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl"
                    >
                        {infoData.map((item, index) => (
                            <motion.li
                                key={index}
                                variants={cardVariants}
                                whileHover={{ y: -10, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                                className="group relative border border-gray-300 dark:border-white/20 rounded-2xl p-8 cursor-default bg-white/50 dark:bg-gray-900/20 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:border-purple-500/50"
                            >
                                <div className="p-3 bg-gray-100 dark:bg-white/10 rounded-xl w-fit group-hover:bg-purple-600 transition-colors duration-300">
                                    <img src={item.icon1} alt="" className="w-7 dark:hidden group-hover:invert" />
                                    <img src={item.icon2} alt="" className="w-7 hidden dark:block group-hover:brightness-200" />
                                </div>
                                <h3 className="my-5 font-bold text-xl text-gray-800 dark:text-white group-hover:text-purple-600 transition-colors">
                                    {item.name}
                                </h3>
                                <p className="text-gray-600 text-base dark:text-white/70 leading-relaxed font-Ovo">
                                    {item.description}
                                </p>
                                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-purple-600 group-hover:w-full transition-all duration-500" />
                            </motion.li>
                        ))}
                    </motion.ul>

                    <div className="mt-16">
                        <h4 className="mb-6 text-gray-700 font-Ovo dark:text-white/80 font-semibold text-lg italic">Tools I use</h4>
                        <motion.ul
                            initial="hidden"
                            whileInView="visible"
                            variants={containerVariants}
                            className="flex flex-wrap items-center gap-5"
                        >
                            {tools.map((tool) => (
                                <motion.li
                                    key={tool.name}
                                    variants={cardVariants}
                                    whileHover={{ y: -8, rotate: 5, scale: 1.1 }}
                                    className="flex items-center justify-center w-14 sm:w-16 aspect-square border border-gray-300 dark:border-white/20 rounded-xl cursor-pointer bg-white dark:bg-transparent shadow-sm hover:border-purple-500 transition-all"
                                >
                                    <img src={tool.icon} alt={tool.name} className="w-6 sm:w-8" />
                                </motion.li>
                            ))}
                        </motion.ul>
                    </div>
                </div>
            </div>
        </section>
    );
}