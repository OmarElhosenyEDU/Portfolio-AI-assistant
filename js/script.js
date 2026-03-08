// js/script.js

const translations = {
    en: {
        toggle_lang: "عربي",
        hero_greeting: "Hello, I'm Alex",
        hero_title: "Full-Stack Developer & UI/UX Enthusiast",
        hero_desc: "I craft high-performance, beautiful web applications with a focus on user experience, modern architectures, and scalable backend systems.",
        contact_btn: "Get in touch",
        resume_title: "Experience & Education",
        exp_subtitle: "Experience",
        edu_subtitle: "Education & Certifications",
        exp_1_title: "Senior Developer",
        exp_1_comp: "TechCorp Inc. • 2021 - Present",
        exp_2_title: "Frontend Engineer",
        exp_2_comp: "WebStudio • 2018 - 2021",
        exp_3_title: "UI Designer",
        exp_3_comp: "CreativeG • 2016 - 2018",
        proj_title: "Featured Projects",
        proj_1_title: "Nexus AI Dashboard",
        proj_1_desc: "A real-time analytics dashboard powered by machine learning.",
        proj_2_title: "Aura E-Commerce",
        proj_2_desc: "High-conversion headless storefront built with modern web tech.",
        proj_3_title: "Nova Design System",
        proj_3_desc: "Open-source component library for React and Vue.",
        skills_title: "Tech Stack",
        edu_deg: "BSc Computer Science",
        edu_uni: "University of Technology • 2014 - 2018",
        edu_cert_1: "AWS Certified Solutions Architect",
        edu_cert_1_org: "Amazon Web Services • 2020",
        edu_cert_2: "Advanced React Patterns",
        edu_cert_2_org: "Frontend Masters • 2019",
        contact_title: "Let's Connect",
        contact_desc: "Available for freelance opportunities and exciting projects.",
        download_cv: "Download CV",
        copy_email: "Copy Email",
        toast_cv: "CV Downloaded successfully!",
        toast_email: "Email copied to clipboard!",
        chat_title: "AI Assistant",
        chat_placeholder: "Ask me anything...",
        chat_send: "Send"
    },
    ar: {
        toggle_lang: "English",
        hero_greeting: "مرحباً، أنا أليكس",
        hero_title: "مطور واجهات متكاملة ومهتم بتجربة المستخدم",
        hero_desc: "أقوم بتصميم تطبيقات ويب عالية الأداء وجميلة مع التركيز على تجربة المستخدم والبنى الحديثة والأنظمة الخلفية القابلة للتوسع.",
        contact_btn: "تواصل معي",
        resume_title: "الخبرة والتعليم",
        exp_subtitle: "الخبرة",
        edu_subtitle: "التعليم والشهادات",
        exp_1_title: "مطور أول",
        exp_1_comp: "شركة تك كورب • 2021 - الحاضر",
        exp_2_title: "مهندس واجهات أمامية",
        exp_2_comp: "ويب ستوديو • 2018 - 2021",
        exp_3_title: "مصمم واجهات",
        exp_3_comp: "كرييتف جي • 2016 - 2018",
        proj_title: "مشاريع مميزة",
        proj_1_title: "لوحة تحكم نكسس للذكاء الاصطناعي",
        proj_1_desc: "لوحة تحكم تحليلية في الوقت الفعلي مدعومة بالتعلم الآلي.",
        proj_2_title: "أورا للتجارة الإلكترونية",
        proj_2_desc: "واجهة متجر إلكتروني عالية التحويل مبنية بتقنيات الويب الحديثة.",
        proj_3_title: "نظام تصميم نوفا",
        proj_3_desc: "مكتبة مكونات مفتوحة المصدر لـ React و Vue.",
        skills_title: "التقنيات المستخدمة",
        edu_deg: "بكالوريوس علوم الحاسوب",
        edu_uni: "جامعة التكنولوجيا • 2014 - 2018",
        edu_cert_1: "مهندس حلول معتمد من AWS",
        edu_cert_1_org: "أمازون لخدمات الويب • 2020",
        edu_cert_2: "أنماط React المتقدمة",
        edu_cert_2_org: "فرونت إند ماسترز • 2019",
        contact_title: "لنتواصل",
        contact_desc: "متاح لفرص العمل الحر والمشاريع المثيرة.",
        download_cv: "تحميل السيرة الذاتية",
        copy_email: "نسخ البريد الإلكتروني",
        toast_cv: "تم تحميل السيرة الذاتية بنجاح!",
        toast_email: "تم نسخ البريد الإلكتروني!",
        chat_title: "المساعد الذكي",
        chat_placeholder: "اسألني أي شيء...",
        chat_send: "إرسال"
    }
};

// Initialize state from localStorage or defaults
let currentLang = localStorage.getItem('lang') || 'en';
let currentTheme = localStorage.getItem('theme') || 'dark';

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.getElementById('theme-toggle').textContent = theme === 'dark' ? '☀️' : '🌙';
}

function applyLang(lang) {
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
    document.getElementById('lang-toggle').textContent = translations[lang].toggle_lang;
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key].replace('•', '<br>•'); 
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            el.setAttribute('placeholder', translations[lang][key]);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Apply initial states
    applyTheme(currentTheme);
    applyLang(currentLang);

    // Theme Toggle Event
    document.getElementById('theme-toggle').addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
        applyTheme(currentTheme);
    });

    // Language Toggle Event
    document.getElementById('lang-toggle').addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        localStorage.setItem('lang', currentLang);
        applyLang(currentLang);
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If it's the skills section, animate progress bars
                if (entry.target.querySelector('.skills-container')) {
                    const skillBars = entry.target.querySelectorAll('.skill-bar-fill');
                    skillBars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width;
                    });
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Download CV Functionality
    const downloadBtn = document.getElementById('download-cv');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            try {
                const cvContent = "Alex's Resume\n\nFull-Stack Developer\nExperience: 5+ Years\nSkills: JavaScript, React, Node.js, Python, PostgreSQL, Docker\n\nContact: alex@example.com";
                const blob = new Blob([cvContent], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'Alex_CV.txt';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                showToast(translations[currentLang].toast_cv || "CV Downloaded successfully!");
            } catch (err) {
                console.error("Download failed", err);
                showToast("Failed to download CV.");
            }
        });
    }

    // Copy Email Functionality
    const copyEmailBtn = document.getElementById('copy-email');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', (e) => {
            e.preventDefault();
            copyToClipboard('alex@example.com').then(() => {
                showToast(translations[currentLang].toast_email || "Email copied to clipboard!");
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                showToast("Failed to copy email.");
            });
        });
    }

    // Back to Top Button Logic
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.remove('hidden');
            } else {
                backToTopBtn.classList.add('hidden');
            }
        });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

// Toast Notification System (Global)
window.showToast = function(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('fade-out');
        toast.addEventListener('animationend', () => toast.remove());
    }, 3000);
};

// Robust copy to clipboard function
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
    } else {
        return new Promise((resolve, reject) => {
            let textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                resolve();
            } catch (err) {
                reject(err);
            } finally {
                textArea.remove();
            }
        });
    }
}
