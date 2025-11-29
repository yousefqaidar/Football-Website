document.addEventListener('DOMContentLoaded', () => {
    // -- League table rendering --
    const tbody = document.getElementById('tableBody');
    if (!tbody) return;

    const rows = Array.from(tbody.querySelectorAll('tr'));
    if (rows.length === 0) return;

    rows.forEach((r, i) => {
        const name = r.dataset.team || '';
        const logo = r.dataset.logo || '';
        const pl = r.dataset.pl || '';
        const gd = r.dataset.gd || '';
        const pts = r.dataset.pts || '';

        r.innerHTML = `
            <td class="pos-col">${i + 1}</td>
            <td class="team-cell">
              <img src="${logo}" class="team-logo" alt="${name} logo">
              <span class="team-name">${name}</span>
              <span class="qualified-badge">UEFA Qualified</span>
            </td>
            <td class="played-col">${pl}</td>
            <td class="gd-col">${gd}</td>
            <td class="pts-col">${pts}</td>
        `;
    });

    // highlight first row as qualified
    const firstRow = rows[0];
    if (firstRow) {
        firstRow.classList.add('qualified-row');

        firstRow.addEventListener('mouseenter', () => {
            firstRow.classList.add('qualified-highlight');
            const badge = firstRow.querySelector('.qualified-badge');
            if (badge) badge.classList.add('show-badge');
        });

        firstRow.addEventListener('mouseleave', () => {
            firstRow.classList.remove('qualified-highlight');
            const badge = firstRow.querySelector('.qualified-badge');
            if (badge) badge.classList.remove('show-badge');
        });
    }

    // -- Navigation toggle for mobile --
    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('mainNav');
    if (navToggle && nav) {
        const setAria = (open) => navToggle.setAttribute('aria-expanded', String(open));

        const toggleNav = (e) => {
            e && e.stopPropagation();
            const isOpen = nav.classList.toggle('open');
            navToggle.classList.toggle('open', isOpen);
            setAria(isOpen);
        };

        navToggle.addEventListener('click', toggleNav);

        // keyboard accessibility for the hamburger
        navToggle.addEventListener('keydown', (ev) => {
            if (ev.key === 'Enter' || ev.key === ' ') {
                ev.preventDefault();
                toggleNav();
            }
        });

        // close when clicking outside
        document.addEventListener('click', (ev) => {
            if (!nav.classList.contains('open')) return;
            if (!ev.target.closest('#mainNav') && ev.target !== navToggle && !ev.target.closest('.nav-toggle')) {
                nav.classList.remove('open');
                navToggle.classList.remove('open');
                setAria(false);
            }
        });

        nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
            nav.classList.remove('open');
            navToggle.classList.remove('open');
            setAria(false);
        }));
    }

    // -- Back to top button behavior --
    const backToTop = document.getElementById('backToTop');
    const showBackAt = 300;
    if (backToTop) {
        const toggleBackToTop = () => {
            if (window.scrollY > showBackAt) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        };

        window.addEventListener('scroll', toggleBackToTop);
        toggleBackToTop();

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // -- Football scroll parallax & small rotation effect --
    const football = document.getElementById('footballImg');
    if (football) {
        const updateFootball = () => {
            // position the ball based on scroll % across the viewport width (0..1)
            const maxShift = Math.max(window.innerWidth - football.clientWidth - 40, 0);
            const scrollRatio = Math.min(window.scrollY / (document.body.scrollHeight - window.innerHeight), 1);
            const x = Math.round(scrollRatio * maxShift);
            const rotate = (scrollRatio * 35) - 17; // -17deg .. +18deg
            football.style.transform = `translateX(${x}px) translateY(0) rotate(${rotate}deg)`;
        };

        window.addEventListener('scroll', updateFootball);
        window.addEventListener('resize', updateFootball);
        updateFootball();
    }
});