import { useState } from 'react';

export default function Contact() {
    const [status, setStatus] = useState({ sending: false, message: '', type: '' });

    const onSubmit = async (event) => {
        event.preventDefault();
        if (status.sending) return;

        setStatus({ sending: true, message: '', type: '' });

        const formData = new FormData(event.target);
        // Had l-key hiya li m-lyia m3a l-email dyalk
        formData.append("access_key", "ded82aaf-cfea-42a6-9fa3-3b48de590666");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });
            const data = await response.json();

            if (data.success) {
                setStatus({ sending: false, message: 'Message sent successfully!', type: 'success' });
                event.target.reset(); // Khwiti l-form
            } else {
                setStatus({ sending: false, message: data.message || 'Error sending message.', type: 'error' });
            }
        } catch (error) {
            setStatus({ sending: false, message: 'Something went wrong. Try again.', type: 'error' });
        }
    };

    const inputClass = "w-full px-4 py-3 text-sm rounded-xl outline-none transition-all duration-300 border bg-white/50 dark:bg-gray-900/20 border-gray-300 dark:border-white/10 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/25 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/5";

    return (
        <section id="contact" className="w-full px-[12%] py-24 relative overflow-hidden bg-transparent">
            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 blur-[120px] rounded-full -z-10" />

            <div className="relative z-10 max-w-2xl mx-auto">
                <div className="bg-white/50 dark:bg-gray-900/20 backdrop-blur-sm rounded-2xl border border-gray-300 dark:border-white/20 p-8 shadow-2xl transition-all duration-500">

                    <form onSubmit={onSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <input name="name" type="text" placeholder="Your name" className={inputClass} required />
                            <input name="email" type="email" placeholder="Your email" className={inputClass} required />
                        </div>

                        <div className="mb-5">
                            <textarea name="message" rows="5" placeholder="How can I help you?" className={`${inputClass} resize-none`} required />
                        </div>

                        <button
                            type="submit"
                            disabled={status.sending}
                            className="group w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-4 rounded-full font-bold hover:bg-purple-600 dark:hover:bg-purple-500 transition-all shadow-xl disabled:opacity-50"
                        >
                            {status.sending ? 'Sending...' : 'Send Message'}
                        </button>

                        {status.message && (
                            <div className={`mt-4 p-3 rounded-xl text-center text-sm ${status.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                {status.message}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}