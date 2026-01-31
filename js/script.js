// Three.js 3D Product Visualization - Enhanced for Premium Look

let scene, camera, renderer, product;
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let rotationSpeed = 0.005; // Slower, more elegant rotation
let autoRotate = true;

// Language System
let currentLang = localStorage.getItem('language') || 'fr';

const translations = {
    fr: {
        'hero.title': 'Votre repas chaud, partout',
        'hero.subtitle': 'Le Tupperware qui réchauffe. Parfait pour les cours, la bibliothèque et la vie étudiante.',
        'hero.button': 'Découvrir le produit',
        'hero.scroll': 'Découvrir',
        'logo.tagline': 'Pour les étudiants',
        'benefits.title': 'Pourquoi choisir ce Tupperware ?',
        'benefits.1.title': 'Pratique & Compact',
        'benefits.1.text': 'Format rectangulaire qui s\'adapte parfaitement à votre sac à dos. Design simple et efficace pour votre quotidien étudiant.',
        'benefits.2.title': 'Réchauffage Intégré',
        'benefits.2.text': 'Plus besoin de micro-ondes ! La base électrique réchauffe votre repas directement dans le conteneur. Idéal entre deux cours.',
        'benefits.3.title': 'Résistant & Durable',
        'benefits.3.text': 'Un produit solide qui résiste aux chocs et aux chutes. Conçu pour durer toute votre vie étudiante et bien plus.',
        'product.title': 'Découvrez le produit',
        'product.description': 'Faites tourner le modèle 3D pour voir tous les détails. Un conteneur rectangulaire avec base de réchauffage intégrée.',
        'product.interact': 'Faire tourner',
        'product.spec.body.label': 'Matériau',
        'product.spec.body.value': 'Plastique résistant',
        'product.spec.base.label': 'Base',
        'product.spec.base.value': 'Réchauffage électrique',
        'product.spec.tech.label': 'Fonction',
        'product.spec.tech.value': 'Réchauffe jusqu\'à 70°C',
        'alternate.1.label': 'Design',
        'alternate.1.title': 'Format Rectangulaire',
        'alternate.1.text': 'Parfait pour glisser dans votre sac. Le format rectangulaire maximise l\'espace et s\'empile facilement. Pratique pour les petits espaces.',
        'alternate.1.list.1': 'S\'empile facilement',
        'alternate.1.list.2': 'Coins arrondis',
        'alternate.1.list.3': 'Facile à nettoyer',
        'alternate.2.label': 'Utilisation',
        'alternate.2.title': 'Simple à Utiliser',
        'alternate.2.text': 'Branchez la base, posez votre conteneur dessus, et votre repas sera chaud en quelques minutes. Parfait pour votre bureau ou votre chambre étudiante.',
        'alternate.2.list.1': 'Branchement simple',
        'alternate.2.list.2': 'Indicateur de chauffe',
        'alternate.2.list.3': 'Sécurité automatique',
        'tech.title': 'Qualité & Fiabilité',
        'tech.1.title': 'Conception',
        'tech.1.text': 'Conçu pour réchauffer uniformément sans brûler vos aliments. Technologie fiable et sécurisée.',
        'tech.2.title': 'Matériaux',
        'tech.2.text': 'Plastique sans BPA, résistant et sûr pour vos aliments. Testé et approuvé pour un usage quotidien.',
        'tech.3.title': 'Garantie',
        'tech.3.text': 'Un produit de qualité qui vous accompagnera pendant toutes vos années d\'études et au-delà.',
        'contact.title': 'Nous Contacter',
        'contact.service.title': 'Support',
        'contact.service.text': 'Des questions ? Besoin d\'aide ? Notre équipe est là pour vous répondre rapidement.',
        'contact.showroom.title': 'Points de vente',
        'contact.showroom.text': 'Retrouvez nos produits dans les magasins partenaires près de votre campus.',
        'contact.showroom.location': 'Disponible en ligne',
        'contact.form.name': 'NOM & PRÉNOM',
        'contact.form.email': 'VOTRE EMAIL',
        'contact.form.message': 'VOTRE MESSAGE',
        'contact.form.submit': 'ENVOYER',
        'footer.text': '© 2026 Tupperware. Conçu pour les étudiants.',
        'nav.benefits': 'Bénéfices',
        'nav.product': 'Produit',
        'nav.technology': 'Technologie',
        'nav.contact': 'Contact',
        'nav.buy': 'Acheter',
        'hero.buy': 'Acheter le produit',
        'product.buy': 'Acheter maintenant — 25 €'
    },
    en: {
        'hero.title': 'Your Hot Meal, Anywhere',
        'hero.subtitle': 'The Tupperware that heats up. Perfect for classes, library, and student life.',
        'hero.button': 'Discover the Product',
        'hero.scroll': 'Discover',
        'logo.tagline': 'For Students',
        'benefits.title': 'Why Choose This Tupperware?',
        'benefits.1.title': 'Practical & Compact',
        'benefits.1.text': 'Rectangular format that fits perfectly in your backpack. Simple and efficient design for your student daily life.',
        'benefits.2.title': 'Built-in Heating',
        'benefits.2.text': 'No microwave needed! The electric base heats your meal directly in the container. Perfect between classes.',
        'benefits.3.title': 'Resistant & Durable',
        'benefits.3.text': 'A sturdy product that withstands shocks and drops. Designed to last throughout your student life and beyond.',
        'product.title': 'Discover the Product',
        'product.description': 'Rotate the 3D model to see all the details. A rectangular container with built-in heating base.',
        'product.interact': 'Rotate',
        'product.spec.body.label': 'Material',
        'product.spec.body.value': 'Resistant Plastic',
        'product.spec.base.label': 'Base',
        'product.spec.base.value': 'Electric Heating',
        'product.spec.tech.label': 'Function',
        'product.spec.tech.value': 'Heats up to 70°C',
        'alternate.1.label': 'Design',
        'alternate.1.title': 'Rectangular Format',
        'alternate.1.text': 'Perfect for sliding into your bag. The rectangular format maximizes space and stacks easily. Practical for small spaces.',
        'alternate.1.list.1': 'Stacks easily',
        'alternate.1.list.2': 'Rounded corners',
        'alternate.1.list.3': 'Easy to clean',
        'alternate.2.label': 'Usage',
        'alternate.2.title': 'Simple to Use',
        'alternate.2.text': 'Plug in the base, place your container on it, and your meal will be hot in a few minutes. Perfect for your desk or student room.',
        'alternate.2.list.1': 'Simple plug-in',
        'alternate.2.list.2': 'Heating indicator',
        'alternate.2.list.3': 'Automatic safety',
        'tech.title': 'Quality & Reliability',
        'tech.1.title': 'Design',
        'tech.1.text': 'Designed to heat evenly without burning your food. Reliable and safe technology.',
        'tech.2.title': 'Materials',
        'tech.2.text': 'BPA-free plastic, resistant and safe for your food. Tested and approved for daily use.',
        'tech.3.title': 'Warranty',
        'tech.3.text': 'A quality product that will accompany you throughout all your student years and beyond.',
        'contact.title': 'Contact Us',
        'contact.service.title': 'Support',
        'contact.service.text': 'Questions? Need help? Our team is here to answer you quickly.',
        'contact.showroom.title': 'Points of Sale',
        'contact.showroom.text': 'Find our products in partner stores near your campus.',
        'contact.showroom.location': 'Available online',
        'contact.form.name': 'NAME & FIRST NAME',
        'contact.form.email': 'YOUR EMAIL',
        'contact.form.message': 'YOUR MESSAGE',
        'contact.form.submit': 'SEND',
        'footer.text': '© 2026 Tupperware. Designed for students.',
        'nav.benefits': 'Benefits',
        'nav.product': 'Product',
        'nav.technology': 'Technology',
        'nav.contact': 'Contact',
        'nav.buy': 'Buy',
        'hero.buy': 'Buy the product',
        'product.buy': 'Buy now — €25'
    }
};

// Translation function
function translatePage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    
    const t = translations[lang];
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            el.textContent = t[key];
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key]) {
            el.placeholder = t[key];
        }
    });
    
    // Update language button
    const langBtn = document.getElementById('lang-btn');
    if (langBtn) {
        const langText = langBtn.querySelector('.lang-text');
        if (langText) {
            langText.textContent = lang.toUpperCase();
        }
    }
}

// Initialize language on page load
function initLanguage() {
    translatePage(currentLang);
    
    // Language button click handler
    const langBtn = document.getElementById('lang-btn');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const newLang = currentLang === 'fr' ? 'en' : 'fr';
            translatePage(newLang);
        });
    }
}

// Initialize main 3D product viewer
function initProductViewer() {
    const canvas = document.getElementById('product-canvas');
    if (!canvas) return;

    // Scene setup
    scene = new THREE.Scene();
    scene.background = null; // Transparent background for integration

    // Camera setup
    camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.set(0, 2, 7); // Slightly elevated view
    camera.lookAt(0, 0, 0);

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // High DPI
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Softer shadows

    // Lighting - Premium Studio Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Key Light
    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(5, 10, 5);
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.1;
    spotLight.decay = 2;
    spotLight.distance = 200;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.bias = -0.0001;
    scene.add(spotLight);

    // Rim Light (for edge definition)
    const rimLight = new THREE.DirectionalLight(0xc9a961, 0.5); // Gold hint
    rimLight.position.set(-5, 2, -5);
    scene.add(rimLight);

    // Fill Light
    const fillLight = new THREE.DirectionalLight(0xe0e0ff, 0.3); // Cool fill
    fillLight.position.set(-5, 0, 5);
    scene.add(fillLight);

    // Create product
    createProduct();

    // Controls
    setupMouseControls(canvas);
    setupTouchControls(canvas);
    
    // Animation loop
    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
}

// Helper to create rounded rectangle shape for extrusion
function createRoundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x = -width / 2;
    const y = -height / 2;
    
    shape.moveTo(x, y + radius);
    shape.lineTo(x, y + height - radius);
    shape.quadraticCurveTo(x, y + height, x + radius, y + height);
    shape.lineTo(x + width - radius, y + height);
    shape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
    shape.lineTo(x + width, y + radius);
    shape.quadraticCurveTo(x + width, y, x + width - radius, y);
    shape.lineTo(x + radius, y);
    shape.quadraticCurveTo(x, y, x, y + radius);
    
    return shape;
}

// Create Enhanced 3D product model
function createProduct() {
    const group = new THREE.Group();

    // --- Materials ---
    // High quality plastic material
    const plasticMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.1,
        roughness: 0.2,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
        transmission: 0.1, // Slight translucency
        transparent: true,
        opacity: 0.95
    });

    // Matte Black Metal for Base
    const baseMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        metalness: 0.6,
        roughness: 0.4
    });

    // Gold accent
    const goldMaterial = new THREE.MeshStandardMaterial({
        color: 0xc9a961,
        metalness: 1.0,
        roughness: 0.2
    });

    // --- Geometry Construction ---

    // 1. The Container Body (Rounded Extrusion)
    const bodyShape = createRoundedRectShape(3.0, 2.0, 0.3);
    const bodyExtrudeSettings = {
        steps: 1,
        depth: 1.2, // Height of the box
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelSegments: 4
    };
    const bodyGeo = new THREE.ExtrudeGeometry(bodyShape, bodyExtrudeSettings);
    // Center geometry vertically
    bodyGeo.translate(0, 0, -0.6); 
    // Rotate to sit flat on XZ plane
    bodyGeo.rotateX(Math.PI / 2);
    
    const body = new THREE.Mesh(bodyGeo, plasticMaterial);
    body.position.y = 0.6; // Lift up
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    // 2. The Lid
    const lidShape = createRoundedRectShape(3.1, 2.1, 0.35); // Slightly wider
    const lidSettings = {
        steps: 1,
        depth: 0.1,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelSegments: 3
    };
    const lidGeo = new THREE.ExtrudeGeometry(lidShape, lidSettings);
    lidGeo.translate(0, 0, -0.05);
    lidGeo.rotateX(Math.PI / 2);
    
    const lid = new THREE.Mesh(lidGeo, plasticMaterial);
    lid.position.y = 1.25; // On top of body
    lid.castShadow = true;
    group.add(lid);

    // 3. The Handle (Sleek strip)
    const handleGeo = new THREE.BoxGeometry(0.8, 0.05, 0.2);
    const handle = new THREE.Mesh(handleGeo, baseMaterial);
    handle.position.set(0, 1.32, 0);
    group.add(handle);

    // 4. The Heating Base (Smaller/Narrower as requested)
    const baseShape = createRoundedRectShape(2.6, 1.6, 0.2); // Narrower than body (3.0)
    const baseSettings = {
        steps: 1,
        depth: 0.3,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelSegments: 4
    };
    const baseGeo = new THREE.ExtrudeGeometry(baseShape, baseSettings);
    baseGeo.translate(0, 0, -0.15);
    baseGeo.rotateX(Math.PI / 2);

    const base = new THREE.Mesh(baseGeo, baseMaterial);
    base.position.y = -0.15;
    base.castShadow = true;
    base.receiveShadow = true;
    group.add(base);

    // 5. Gold Heating Elements/Lines on Base (Visible on side)
    const lineGeo = new THREE.BoxGeometry(2.65, 0.02, 0.02);
    const line1 = new THREE.Mesh(lineGeo, goldMaterial);
    line1.position.set(0, -0.1, 0.82); // Front edge
    group.add(line1);

    // 6. Cable Stub (Visual cue for "Plug")
    const cordGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.5, 16);
    cordGeo.rotateZ(Math.PI / 2);
    const cord = new THREE.Mesh(cordGeo, baseMaterial);
    cord.position.set(-1.4, -0.15, 0); // Stick out left
    group.add(cord);

    // 7. Power LED
    const ledGeo = new THREE.SphereGeometry(0.04, 16, 16);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0xff4400 });
    const led = new THREE.Mesh(ledGeo, ledMat);
    led.position.set(1.2, -0.1, 0.82);
    group.add(led);

    product = group;
    scene.add(product);
}

// Mouse controls
function setupMouseControls(canvas) {
    canvas.addEventListener('mousedown', (e) => {
        isDragging = true;
        autoRotate = false;
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        if (product) {
            product.rotation.y += deltaX * 0.005;
            product.rotation.x += deltaY * 0.005;
        }
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    canvas.addEventListener('mouseup', () => isDragging = false);
    canvas.addEventListener('mouseleave', () => isDragging = false);
}

// Touch controls
function setupTouchControls(canvas) {
    let touchStart = null;
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        autoRotate = false;
        touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    });
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (!touchStart) return;
        const deltaX = e.touches[0].clientX - touchStart.x;
        const deltaY = e.touches[0].clientY - touchStart.y;
        if (product) {
            product.rotation.y += deltaX * 0.01;
            product.rotation.x += deltaY * 0.01;
        }
        touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    });
    canvas.addEventListener('touchend', () => touchStart = null);
}

function animate() {
    requestAnimationFrame(animate);
    if (product && autoRotate && !isDragging) {
        product.rotation.y += rotationSpeed;
    }
    renderer.render(scene, camera);
}

// --- Viewers for Alternate Sections (Simplified models) ---
function initSmallViewers() {
    createSmallViewer('product-canvas-1', 'body'); // Only body
    createSmallViewer('product-canvas-2', 'base'); // Only base
}

function createSmallViewer(canvasId, type) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const sScene = new THREE.Scene();
    sScene.background = null;

    const sCamera = new THREE.PerspectiveCamera(35, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    sCamera.position.set(0, 2, 6);
    sCamera.lookAt(0, 0, 0);

    const sRenderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    sRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
    sRenderer.setPixelRatio(window.devicePixelRatio);

    const amb = new THREE.AmbientLight(0xffffff, 0.6);
    sScene.add(amb);
    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(2, 5, 5);
    sScene.add(dir);

    // Re-use shapes but simplify
    const group = new THREE.Group();
    
    if (type === 'body') {
        // Just the container
        const shape = createRoundedRectShape(3.0, 2.0, 0.3);
        const geo = new THREE.ExtrudeGeometry(shape, { depth: 1.0, bevelEnabled: true, bevelSegments: 2, bevelThickness:0.05, bevelSize:0.05, steps:1 });
        geo.rotateX(Math.PI/2);
        const mesh = new THREE.Mesh(geo, new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 0.2, roughness: 0.2 }));
        group.add(mesh);
    } else {
        // Just the base
        const shape = createRoundedRectShape(2.6, 1.6, 0.2);
        const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.3, bevelEnabled: true, bevelSegments: 2, bevelThickness:0.05, bevelSize:0.05, steps:1 });
        geo.rotateX(Math.PI/2);
        const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.4 }));
        group.add(mesh);
    }

    sScene.add(group);

    function sAnimate() {
        requestAnimationFrame(sAnimate);
        group.rotation.y += 0.005;
        sRenderer.render(sScene, sCamera);
    }
    sAnimate();
}

// Premium Navigation System - menu toujours fixé en haut
function initPremiumNavigation() {
    const nav = document.getElementById('premium-nav');
    const langSwitcher = document.querySelector('.language-switcher');
    let ticking = false;

    function handleScroll() {
        const currentScroll = window.pageYOffset;
        
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (currentScroll > 80) {
                    nav.classList.add('scrolled');
                    if (langSwitcher) langSwitcher.classList.add('hidden');
                } else {
                    nav.classList.remove('scrolled');
                    if (langSwitcher) langSwitcher.classList.remove('hidden');
                }
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Smooth scroll for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = nav.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Smooth scroll function with offset
function smoothScrollTo(targetId, offset = 0) {
    const target = document.querySelector(targetId);
    if (target) {
        const nav = document.getElementById('premium-nav');
        const navHeight = nav ? nav.offsetHeight : 0;
        const targetPosition = target.offsetTop - navHeight - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Init on Load
document.addEventListener('DOMContentLoaded', function() {
    initLanguage();
    initPremiumNavigation();
    initProductViewer();
    initSmallViewers();

    // Hero button - redirect to benefits section
    const heroBtn = document.querySelector('.hero-btn');
    if (heroBtn) {
        heroBtn.addEventListener('click', () => {
            smoothScrollTo('#benefits', 20);
        });
    }

    // Smooth scroll for scroll indicator
    document.querySelector('.scroll-indicator')?.addEventListener('click', () => {
        smoothScrollTo('#benefits', 20);
    });
    
    // Scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.benefit-block, .alternate-item, .tech-feature, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Merci pour votre message. Nous vous répondrons dans les plus brefs délais.');
            contactForm.reset();
        });
    }
});

