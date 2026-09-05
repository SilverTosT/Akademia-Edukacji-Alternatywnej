document.querySelectorAll('.nav-item.has-dropdown').forEach(item => {
    const toggle = item.querySelector('.dropdown-toggle');
    toggle.addEventListener('click', function(e) {
        e.stopPropagation();
        document.querySelectorAll('.nav-item.has-dropdown.open').forEach(el => {
            if (el !== item) el.classList.remove('open');
        });
        item.classList.toggle('open');
    });
    item.querySelectorAll('.dropdown-menu li').forEach(li => {
        li.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
});

document.addEventListener('click', function(e) {
    const isDropdownClick = e.target.closest('.has-dropdown');
    if (!isDropdownClick) {
        document.querySelectorAll('.nav-item.has-dropdown.open').forEach(el => {
            el.classList.remove('open');
        });
    }
});

let currentLang = 'pl';

function setLanguage(lang) {
    currentLang = lang;
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                const placeholderKey = el.getAttribute('data-translate-placeholder');
                if (placeholderKey && translations[lang][placeholderKey]) {
                    el.placeholder = translations[lang][placeholderKey];
                }
            } else {
                el.innerHTML = translations[lang][key];
            }
        }
    });
    document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
        const key = el.getAttribute('data-translate-placeholder');
        if (translations[lang] && translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });
    document.querySelectorAll('.lang-dropdown li').forEach(li => li.classList.remove('active-lang'));
    document.querySelector(`.lang-dropdown li[data-lang="${lang}"]`)?.classList.add('active-lang');
    document.getElementById('langCurrentLabel').textContent = lang.toUpperCase();
    localStorage.setItem('preferredLang', lang);
}

const langToggle = document.getElementById('langToggle');
const langCurrentLabel = document.getElementById('langCurrentLabel');
const langDropdown = document.getElementById('langDropdown');

function toggleLangDropdown(e) {
    e.stopPropagation();
    langDropdown.classList.toggle('open');
}

if (langToggle && langCurrentLabel) {
    langToggle.addEventListener('click', toggleLangDropdown);
    langCurrentLabel.addEventListener('click', toggleLangDropdown);
}

let hoverTimeout;
function openLangDropdown() {
    clearTimeout(hoverTimeout);
    langDropdown?.classList.add('open');
}
function closeLangDropdownDelayed() {
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
        langDropdown?.classList.remove('open');
    }, 200);
}

const langWrapper = document.querySelector('.lang-wrapper');
if (langWrapper) {
    langWrapper.addEventListener('mouseenter', openLangDropdown);
    langWrapper.addEventListener('mouseleave', closeLangDropdownDelayed);
}

document.addEventListener('click', function(e) {
    if (!e.target.closest('.lang-wrapper')) {
        langDropdown?.classList.remove('open');
    }
});

document.querySelectorAll('.lang-dropdown li').forEach(item => {
    item.addEventListener('click', function(e) {
        e.stopPropagation();
        setLanguage(this.dataset.lang);
        langDropdown?.classList.remove('open');
    });
});

document.querySelectorAll('.nav-item a, .nav-item .dropdown-toggle').forEach(el => {
    el.addEventListener('click', function(e) {
        if (this.classList.contains('dropdown-toggle')) {
            return;
        }
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        const parent = this.closest('.nav-item');
        if (parent) parent.classList.add('active');
    });
});

document.querySelector('a[href="#footerSection"]')?.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#footerSection')?.scrollIntoView({ behavior: 'smooth' });
});
document.querySelector('a[href="#about"]')?.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
});
document.querySelector('a[href="#home"]')?.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
document.querySelector('a[href="#contactSection"]')?.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#contactSection')?.scrollIntoView({ behavior: 'smooth' });
});

document.querySelectorAll('form#contactForm').forEach(form => {
    const emailInput = form.querySelector('#contactEmail');
    const emailError = form.querySelector('#emailError');

    if (emailInput && emailError) {
        emailInput.addEventListener('input', function() {
            emailError.style.display = 'none';
        });
    }

    form.addEventListener('submit', function(e) {
        const email = emailInput ? emailInput.value.trim() : '';
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailPattern.test(email)) {
            e.preventDefault();
            if (emailError) emailError.style.display = 'block';
            return;
        }

        if (emailError) emailError.style.display = 'none';
    });
});