// js/script.js

const translations = {
    en: {
        toggle_lang: "عربي",
        hero_greeting: "Hello, I'm Alex",
        hero_title: "Full-Stack Developer & UI/UX Enthusiast",
        hero_desc: "I craft high-performance, beautiful web applications with a focus on user experience, modern architectures, and scalable backend systems.",
        contact_btn: "Get in touch",
        exp_title: "Experience",
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
        edu_title: "Education",
        edu_deg: "BSc Computer Science",
        edu_uni: "University of Technology • 2014 - 2018",
        contact_title: "Let's Connect",
        contact_desc: "Available for freelance opportunities and exciting projects.",
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
        exp_title: "الخبرة",
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
        edu_title: "التعليم",
        edu_deg: "بكالوريوس علوم الحاسوب",
        edu_uni: "جامعة التكنولوجيا • 2014 - 2018",
        contact_title: "لنتواصل",
        contact_desc: "متاح لفرص العمل الحر والمشاريع المثيرة.",
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
            // Small hack to keep line breaks for education/experience if needed, 
            // but innerHTML handles the raw string fine.
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
});
