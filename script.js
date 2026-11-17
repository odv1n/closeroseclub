function enterClub(mode) {
    document.body.classList.remove('mode-pc', 'mode-mobile');
    document.body.classList.add(mode === 'pc' ? 'mode-pc' : 'mode-mobile');

    const tv = document.getElementById('tv-screen');
    const catalog = document.getElementById('catalog');
    tv.style.opacity = '0';
    tv.style.pointerEvents = 'none';
    setTimeout(function() {
        tv.style.display = 'none';
        catalog.classList.add('visible');
    }, 300);
}

const itemsData = [
    {
        title: '"UNKNOWN DISAPPEARANCE" 2020 TEE',
        price: '2 222 ₽ // PRE-ORDER',
        desc: 'кто стоит за этим исчезновением? мы точно знать не можем.',
        photo: 'assets/mariarose2020.png'
    },
    {
        title: '"UNKNOWN APPEARANCE" 2026 TEE',
        price: '2 222 ₽ // PRE-ORDER',
        desc: 'прямой наследник, никто не знает историю его появления.',
        photo: 'assets/martit2026.png'
    },
        {
        title: '"MISSING" DOUBLE-SIDED KEYCHAIN',
        price: '333 ₽ // IN STOCK',
        desc: 'двусторонний брелок покрытый эпоксидной смолой. единственный экземпляр в частной коллекции.',
        photo: 'assets/keychain1.png',
        photoBack: 'assets/keychain2.png'lockRosePosition
    },

    {
        title: 'PINK FURRY BELT',
        price: 'ARCHIVED // 1 OF 1',
        desc: 'розовый пушистый ремень. надпись "CAUTION! extreme SWAG level" говорит за себя.',
        photo: 'assets/fur-belt.png'
    },
    {
        title: 'ARCHIVE LOT 05 // SOON',
        price: '0 ₽ // SOON',
        desc: 'описание пятого лота появится здесь.',
        photo: ''
    },
    {
        title: 'ARCHIVE LOT 06 // SOON',
        price: '0 ₽ // SOON',
        desc: 'описание шестого лота появится здесь.',
        photo: ''
    }
];


let isPhotoZoomed = false;
let isPhotoFlipped = false;
let currentItemIndex = 0;

function openItemModal(index) {
    currentItemIndex = index;
    const item = itemsData[index];
    document.getElementById('modalItemTitle').innerText = item.title;
    document.getElementById('modalItemPrice').innerText = item.price;
    document.getElementById('modalItemDesc').innerText = item.desc;

    const slot = document.getElementById('modalPhotoSlot');
    isPhotoZoomed = false;
    isPhotoFlipped = false;
    slot.classList.remove('zoomed', 'switching');

    if (item.photo) {
        const flipHtml = (index === 2 || item.photoBack)
            ? '<button type="button" class="flip-btn" id="flipBtnLabel" onclick="flipKeychain(event)">[ SIDE A ]</button>'
            : '';
        slot.innerHTML = '<img src="' + item.photo + '" id="zoomableImg" alt="">' + flipHtml + '<button type="button" class="zoom-btn" id="zoomBtnLabel">[+ ZOOM]</button>';
    } else {
        slot.innerHTML = '<div class="photo-placeholder">PHOTO<br>1:1</div>';
    }

    const orderBtn = document.getElementById('modalOrderBtn');
    if (index === 3) {
        orderBtn.innerText = '[ REQUEST ITEM ]';
        orderBtn.classList.add('red');
    } else {
        orderBtn.innerText = '[ ORDER IN TELEGRAM ]';
        orderBtn.classList.remove('red');
    }

    document.getElementById('itemModal').classList.add('active');
}

function flipKeychain(e) {
    e.stopPropagation();
    const img = document.getElementById('zoomableImg');
    const slot = document.getElementById('modalPhotoSlot');
    const flipBtn = document.getElementById('flipBtnLabel');
    const zoomBtn = document.getElementById('zoomBtnLabel');
    const item = itemsData[currentItemIndex];
    if (!img) return;

    if (isPhotoZoomed) {
        isPhotoZoomed = false;
        slot.classList.remove('zoomed');
        if (zoomBtn) zoomBtn.innerText = '[+ ZOOM]';
        img.style.transform = 'scale(1)';
    }

    isPhotoFlipped = !isPhotoFlipped;
    if (flipBtn) {
        flipBtn.innerText = isPhotoFlipped ? '[ SIDE B ]' : '[ SIDE A ]';
    }

    slot.classList.remove('switching');
    void slot.offsetWidth;
    slot.classList.add('switching');

    if (item.photoBack) {
        img.src = isPhotoFlipped ? item.photoBack : item.photo;
    }
}

function togglePhotoZoom(e) {
    if (e.target && e.target.id === 'flipBtnLabel') return;
    const img = document.getElementById('zoomableImg');
    const btn = document.getElementById('zoomBtnLabel');
    const slot = document.getElementById('modalPhotoSlot');
    if (!img) return;

    slot.classList.remove('switching');
    isPhotoZoomed = !isPhotoZoomed;

    if (isPhotoZoomed) {
        slot.classList.add('zoomed');
        btn.innerText = '[- OUT]';
        moveZoom(e);
    } else {
        slot.classList.remove('zoomed');
        btn.innerText = '[+ ZOOM]';
        img.style.transform = 'scale(1)';
        img.style.transformOrigin = 'center center';
    }
}

function moveZoom(e) {
    if (!isPhotoZoomed) return;
    const slot = document.getElementById('modalPhotoSlot');
    const img = document.getElementById('zoomableImg');
    if (!img) return;

    const rect = slot.getBoundingClientRect();
    const clientX = (e.touches && e.touches.length) ? e.touches[0].clientX : e.clientX;
    const clientY = (e.touches && e.touches.length) ? e.touches[0].clientY : e.clientY;
    const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));

    img.style.transformOrigin = x + '% ' + y + '%';
    img.style.transform = 'scale(2.2)';
}
document.getElementById('modalPhotoSlot').addEventListener('mousemove', moveZoom);
document.getElementById('modalPhotoSlot').addEventListener('touchmove', moveZoom, { passive: true });

function closeItemModal() {
    isPhotoZoomed = false;
    document.getElementById('itemModal').classList.remove('active');
}
(function() {
    const canvas = document.getElementById('petals-canvas');
    const ctx = canvas.getContext('2d');
    const isMobileDevice = window.innerWidth <= 768;
    let w, h;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const tags = ['#holydiva', '#diva', '#mystery', '#icon'];
    const petals = [];
    const words = [];

    function createPetal(initial) {
        const isRarePink = Math.random() < 0.008;
        return {
            x: Math.random() * w,
            y: initial ? Math.random() * h - h : -30 - Math.random() * 250,
            size: 7 + Math.random() * 7,
            speedY: 0.45 + Math.random() * 0.55,
            swaySpeed: 0.012 + Math.random() * 0.015,
            swayOffset: Math.random() * Math.PI * 2,
            rot: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.025,
            flip: Math.random() * Math.PI,
            flipSpeed: 0.02 + Math.random() * 0.02,
            color: isRarePink ? '#FF69B4' : (Math.random() > 0.35 ? '#D90416' : '#8A0312'),
            isPink: isRarePink
        };
    }

    function createWord(initial) {
        return {
            text: tags[Math.floor(Math.random() * tags.length)],
            x: 50 + Math.random() * Math.max(100, w - 100),
            y: initial ? -100 - Math.random() * h : -80 - Math.random() * 450,
            speedY: 0.35 + Math.random() * 0.35,
            swaySpeed: 0.008 + Math.random() * 0.01,
            swayOffset: Math.random() * Math.PI * 2,
            rot: (Math.random() - 0.5) * 0.2,
            rotSpeed: (Math.random() - 0.5) * 0.004,
            alpha: 0.65 + Math.random() * 0.2,
            color: Math.random() > 0.4 ? '#8A0312' : '#A60517'
        };
    }

    const petalCount = isMobileDevice ? 18 : 32;
    for (let i = 0; i < petalCount; i++) petals.push(createPetal(true));
    for (let i = 0; i < 2; i++) words.push(createWord(true));

    function drawPetal(p) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.scale(1, Math.max(0.25, Math.abs(Math.cos(p.flip))));
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.9, -p.size * 0.8, p.size * 1.1, p.size * 0.6, 0, p.size);
        ctx.bezierCurveTo(-p.size * 1.1, p.size * 0.6, -p.size * 0.9, -p.size * 0.8, 0, -p.size);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.72;
        ctx.fill();
        ctx.restore();
    }

    function drawWord(item) {
        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate(item.rot);
        ctx.font = 'italic 700 15px "Space Mono", monospace';
        ctx.fillStyle = item.color;
        ctx.globalAlpha = item.alpha;
        ctx.textAlign = 'center';
        ctx.fillText(item.text, 0, 0);
        ctx.restore();
    }

    function loop() {
        ctx.clearRect(0, 0, w, h);

        for (let i = 0; i < petals.length; i++) {
            const p = petals[i];
            p.y += p.speedY;
            p.swayOffset += p.swaySpeed;
            p.x += Math.sin(p.swayOffset) * 0.65;
            p.rot += p.rotSpeed;
            p.flip += p.flipSpeed;
            drawPetal(p);
            if (p.y > h + 30) petals[i] = createPetal(false);
        }

        for (let i = 0; i < words.length; i++) {
            const item = words[i];
            item.y += item.speedY;
            item.swayOffset += item.swaySpeed;
            item.x += Math.sin(item.swayOffset) * 0.45;
            item.rot += item.rotSpeed;
            drawWord(item);
            if (item.y > h + 50) words[i] = createWord(false);
        }

        requestAnimationFrame(loop);
    }
    loop();
})();

let titleClicks = 0;
let clickTimer = null;

function handleSecretClick() {
    titleClicks++;
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => { titleClicks = 0; }, 1200);

    if (titleClicks === 3) {
        titleClicks = 0;
        document.body.style.filter = 'invert(1)';
        setTimeout(() => {
            document.body.style.filter = 'none';
            alert('SECRET CODE: ROSE26 // НАПИШИ ЕГО В ТГ ДЛЯ ПРИОРИТЕТА');
        }, 350);
    }
}

const dropTargetDate = new Date('2027-01-01T00:00:00+03:00').getTime();

function updateDropTimer() {
    const timerEl = document.getElementById('dropTimer');
    if (!timerEl) return;

    const now = new Date().getTime();
    const diff = dropTargetDate - now;

    if (diff <= 0) {
        timerEl.innerHTML = 'ARCHIVE OPEN // LIVE';
        return;
    }

    const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
    const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
    const minutes = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

    timerEl.innerHTML = `${days}<span class="timer-colon">:</span>${hours}<span class="timer-colon">:</span>${minutes}<span class="timer-colon">:</span>${seconds}`;
}

updateDropTimer();
setInterval(updateDropTimer, 1000);

function updateModeBtnLabel() {
    const btn = document.getElementById('modeSwitcherBtn');
    if (!btn) return;
    btn.textContent = document.body.classList.contains('mode-pc') ? '[ VIEW: PC ]' : '[ VIEW: MOBILE ]';
}

function toggleViewMode() {
    if (document.body.classList.contains('mode-pc')) {
        document.body.classList.remove('mode-pc');
        document.body.classList.add('mode-mobile');
    } else {
        document.body.classList.remove('mode-mobile');
        document.body.classList.add('mode-pc');
    }
    updateModeBtnLabel();
}

const modeObserver = new MutationObserver(updateModeBtnLabel);
modeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });

function lockRosePosition() {
    const rose = document.querySelector('.bg-watermark');
    if (!rose) return;
    rose.style.bottom = 'auto';
    rose.style.top = Math.round((window.innerHeight - rose.offsetHeight) / 2) + 'px';
}
window.addEventListener('load', lockRosePosition);
window.addEventListener('orientationchange', () => setTimeout(lockRosePosition, 200));

const chromeGrad = document.getElementById('chromeGrad');
const pointLight = document.getElementById('pointLight');

function animateChromeRose(now) {
    if (chromeGrad) {
        const angle = ((now % 9000) / 9000) * 360;
        chromeGrad.setAttribute('gradientTransform', `rotate(${angle.toFixed(1)} 0.5 0.5)`);
    }
    if (pointLight) {
        const rad = ((now % 8000) / 8000) * Math.PI * 2;
        pointLight.setAttribute('x', (200 + Math.cos(rad) * 120).toFixed(1));
        pointLight.setAttribute('y', (200 + Math.sin(rad) * 110).toFixed(1));
    }
    requestAnimationFrame(animateChromeRose);
}
requestAnimationFrame(animateChromeRose);

