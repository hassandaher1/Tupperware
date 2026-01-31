/**
 * Checkout page: validation, card formatting, form submit → order-success, i18n
 */

(function() {
    var lang = (typeof localStorage !== 'undefined' && localStorage.getItem('language')) || 'fr';
    var t = {
        fr: {
            'checkout.back': '← Retour au site',
            'checkout.title': 'Finaliser la commande',
            'checkout.shipping': 'Adresse de livraison',
            'checkout.firstName': 'Prénom',
            'checkout.lastName': 'Nom',
            'checkout.email': 'Email',
            'checkout.phone': 'Téléphone',
            'checkout.address': 'Adresse',
            'checkout.postalCode': 'Code postal',
            'checkout.city': 'Ville',
            'checkout.country': 'Pays',
            'checkout.payment': 'Paiement sécurisé',
            'checkout.secure': 'Vos données sont protégées par chiffrement SSL.',
            'checkout.cardName': 'Nom sur la carte',
            'checkout.cardNumber': 'Numéro de carte',
            'checkout.cardExpiry': "Date d'expiration",
            'checkout.cardCvc': 'CVC',
            'checkout.terms': "J'accepte les conditions générales de vente et la politique de confidentialité.",
            'checkout.summary': 'Récapitulatif',
            'checkout.productName': 'Tupperware HeatBox — Conteneur réchauffant',
            'checkout.quantity': 'Quantité : 1',
            'checkout.subtotal': 'Sous-total',
            'checkout.shippingCost': 'Livraison',
            'checkout.shippingFree': 'Offerte',
            'checkout.total': 'Total',
            'checkout.pay': 'Payer 25 €',
            'checkout.note': 'Aucun prélèvement ne sera effectué. Cette page est une démonstration.'
        },
        en: {
            'checkout.back': '← Back to site',
            'checkout.title': 'Complete your order',
            'checkout.shipping': 'Shipping address',
            'checkout.firstName': 'First name',
            'checkout.lastName': 'Last name',
            'checkout.email': 'Email',
            'checkout.phone': 'Phone',
            'checkout.address': 'Address',
            'checkout.postalCode': 'Postal code',
            'checkout.city': 'City',
            'checkout.country': 'Country',
            'checkout.payment': 'Secure payment',
            'checkout.secure': 'Your data is protected by SSL encryption.',
            'checkout.cardName': 'Name on card',
            'checkout.cardNumber': 'Card number',
            'checkout.cardExpiry': 'Expiry date',
            'checkout.cardCvc': 'CVC',
            'checkout.terms': 'I accept the terms and conditions and privacy policy.',
            'checkout.summary': 'Order summary',
            'checkout.productName': 'Tupperware HeatBox — Heating container',
            'checkout.quantity': 'Quantity: 1',
            'checkout.subtotal': 'Subtotal',
            'checkout.shippingCost': 'Shipping',
            'checkout.shippingFree': 'Free',
            'checkout.total': 'Total',
            'checkout.pay': 'Pay €49.99',
            'checkout.note': 'No charge will be made. This page is a demo.'
        }
    };
    var texts = t[lang] || t.fr;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
        var key = el.getAttribute('data-i18n');
        if (texts[key]) el.textContent = texts[key];
    });
    var payBtn = document.getElementById('submit-order');
    if (payBtn && texts['checkout.pay']) payBtn.textContent = texts['checkout.pay'];
    var shipLabel = document.getElementById('order-shipping');
    if (shipLabel && texts['checkout.shippingFree']) shipLabel.textContent = texts['checkout.shippingFree'];
    var priceStr = lang === 'en' ? '€25' : '25 €';
    ['order-item-price', 'order-subtotal', 'order-total'].forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.textContent = priceStr;
    });

    const form = document.getElementById('checkout-form');
    const submitBtn = document.getElementById('submit-order');
    const cardNumber = document.getElementById('cardNumber');
    const cardExpiry = document.getElementById('cardExpiry');
    const cardCvc = document.getElementById('cardCvc');

    if (!form) return;

    // Format card number (spaces every 4 digits)
    if (cardNumber) {
        cardNumber.addEventListener('input', function() {
            let v = this.value.replace(/\D/g, '');
            if (v.length > 16) v = v.slice(0, 16);
            this.value = v.replace(/(.{4})/g, '$1 ').trim();
        });
    }

    // Format expiry MM/AA
    if (cardExpiry) {
        cardExpiry.addEventListener('input', function() {
            let v = this.value.replace(/\D/g, '');
            if (v.length >= 2) {
                v = v.slice(0, 2) + '/' + v.slice(2, 4);
            }
            this.value = v;
        });
    }

    // CVC: digits only
    if (cardCvc) {
        cardCvc.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '').slice(0, 4);
        });
    }

    function showError(input, message) {
        input.classList.add('error');
        let msg = input.parentNode.querySelector('.field-error');
        if (!msg) {
            msg = document.createElement('span');
            msg.className = 'field-error';
            input.parentNode.appendChild(msg);
        }
        msg.textContent = message;
    }

    function clearError(input) {
        input.classList.remove('error');
        const msg = input.parentNode.querySelector('.field-error');
        if (msg) msg.remove();
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validateCardNumber(value) {
        const digits = value.replace(/\D/g, '');
        return digits.length >= 13 && digits.length <= 19;
    }

    function validateExpiry(value) {
        const match = value.match(/^(\d{2})\/(\d{2})$/);
        if (!match) return false;
        const month = parseInt(match[1], 10);
        const year = 2000 + parseInt(match[2], 10);
        if (month < 1 || month > 12) return false;
        const now = new Date();
        const exp = new Date(year, month - 1);
        return exp >= now;
    }

    function validateCvc(value) {
        return /^\d{3,4}$/.test(value.replace(/\D/g, ''));
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const required = form.querySelectorAll('[required]');
        let valid = true;
        required.forEach(function(input) {
            clearError(input);
            if (input.type === 'checkbox') {
                if (!input.checked) {
                    showError(input, document.documentElement.lang === 'en' ? 'This field is required.' : 'Ce champ est requis.');
                    valid = false;
                }
            } else if (!input.value.trim()) {
                showError(input, document.documentElement.lang === 'en' ? 'This field is required.' : 'Ce champ est requis.');
                valid = false;
            }
        });

        const emailEl = document.getElementById('email');
        if (emailEl && emailEl.value && !validateEmail(emailEl.value)) {
            showError(emailEl, document.documentElement.lang === 'en' ? 'Invalid email.' : 'Email invalide.');
            valid = false;
        }

        if (cardNumber && !validateCardNumber(cardNumber.value)) {
            if (cardNumber.value.trim()) {
                showError(cardNumber, document.documentElement.lang === 'en' ? 'Invalid card number.' : 'Numéro de carte invalide.');
                valid = false;
            }
        }

        if (cardExpiry && cardExpiry.value && !validateExpiry(cardExpiry.value)) {
            showError(cardExpiry, document.documentElement.lang === 'en' ? 'Invalid or expired date.' : 'Date invalide ou expirée.');
            valid = false;
        }

        if (cardCvc && cardCvc.value && !validateCvc(cardCvc.value)) {
            showError(cardCvc, document.documentElement.lang === 'en' ? 'Invalid CVC.' : 'CVC invalide.');
            valid = false;
        }

        if (!valid) return;

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = document.documentElement.lang === 'en' ? 'Processing…' : 'Traitement…';
        }

        const orderId = 'TW-' + Math.random().toString(36).slice(2, 10).toUpperCase();
        window.location.href = 'order-success.html?order=' + encodeURIComponent(orderId);
    });
})();
