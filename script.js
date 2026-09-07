// Thiết lập mặc định là Tiếng Anh
let currentLang = 'en';

function switchLanguage(lang) {
    currentLang = lang;
    const btnVi = document.getElementById('btn-vi');
    const btnEn = document.getElementById('btn-en');
    const viElements = document.querySelectorAll('.lang-vi');
    const enElements = document.querySelectorAll('.lang-en');

    if (lang === 'en') {
        btnEn.classList.add('active');
        btnVi.classList.remove('active');
        viElements.forEach(el => el.style.display = 'none');
        enElements.forEach(el => {
            el.style.display = (el.tagName === 'UL') ? 'block' : 'inline-block';
        });
        
        // Placeholder Form
        document.getElementById('form-name').placeholder = "Your Name";
        document.getElementById('form-email').placeholder = "Your Email";
        document.getElementById('form-msg').placeholder = "Your message...";
    } else {
        btnVi.classList.add('active');
        btnEn.classList.remove('active');
        enElements.forEach(el => el.style.display = 'none');
        viElements.forEach(el => {
            el.style.display = (el.tagName === 'UL') ? 'block' : 'inline-block';
        });
        
        // Placeholder Form
        document.getElementById('form-name').placeholder = "Tên của bạn";
        document.getElementById('form-email').placeholder = "Email của bạn";
        document.getElementById('form-msg').placeholder = "Lời nhắn nhanh...";
    }
}

(function() {
    // ----- 1. FILTER TABS (Projects) -----
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    function filterProjects(category) {
        projectCards.forEach(card => {
            const cat = card.dataset.category;
            if (category === 'all' || cat === category) {
                card.classList.remove('hide');
            } else {
                card.classList.add('hide');
            }
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filterValue = this.dataset.filter;
            filterProjects(filterValue);
        });
    });

    // ----- 2. EXPANDABLE EXPERIENCE CARDS (Accordion) -----
    const expCards = document.querySelectorAll('.exp-card');
    expCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('open');
        });
    });

    // ----- 3. MODAL (Case Study) -----
    const modalOverlay = document.getElementById('caseModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const closeModalBtn = document.getElementById('closeModalBtn');

    document.querySelectorAll('.modal-trigger').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const caseText = currentLang === 'en' 
                ? (this.dataset.caseEn || this.dataset.caseVi)
                : this.dataset.caseVi;
                
            const parts = caseText.split('·');
            if (parts.length > 1) {
                modalTitle.textContent = parts[0].trim();
                modalDesc.textContent = parts.slice(1).join('·').trim();
            } else {
                modalTitle.textContent = '📘 Case Study';
                modalDesc.textContent = caseText;
            }
            
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });

    // ----- 4. FORM NHẮN TIN -----
    const form = document.getElementById('simpleForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const alertMsg = currentLang === 'en' ? '✨ Thank you! I will get back to you soon.' : '✨ Cảm ơn bạn! Mình sẽ phản hồi sớm.';
        alert(alertMsg);
        form.reset();
    });


    // ----- 6. HIỆU ỨNG THẢ SPARKLE KHI CLICK CHUỘT -----
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        const sparkles = ['✨', '🌸', '🌱', '💖', '⭐'];
        const randomSparkle = sparkles[Math.floor(Math.random() * sparkles.length)];

        const elem = document.createElement('span');
        elem.className = 'click-sparkle';
        elem.textContent = randomSparkle;
        elem.style.left = e.clientX + 'px';
        elem.style.top = e.clientY + 'px';

        document.body.appendChild(elem);

        setTimeout(() => {
            elem.remove();
        }, 800);
    });
})();