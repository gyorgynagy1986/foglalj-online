console.log('Email.js betöltve');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM ready');
    
    const form = document.getElementById('contact-form');
    if (!form) {
        console.error('Form nem található');
        return;
    }
    
    console.log('Form megtalálva, submit listener hozzáadása');
    
    form.addEventListener('submit', async function(e) {
        console.log('SUBMIT ESEMÉNY!');
        e.preventDefault();
        
        // Elemek
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const companyInput = document.getElementById('company');
        const messageInput = document.getElementById('message');
        const gdprCheckbox = document.getElementById('gdpr');
        const submitButton = form.querySelector('button[type="submit"]');
        const formFeedback = document.getElementById('form-feedback');
        
        console.log('Elemek:', {
            name: !!nameInput,
            email: !!emailInput,
            gdpr: !!gdprCheckbox
        });
        
        // Értékek - EGYSZERŰEN
        const nameValue = nameInput ? nameInput.value.trim() : '';
        const emailValue = emailInput ? emailInput.value.trim() : '';
        const phoneValue = phoneInput ? phoneInput.value.trim() : '';
        const companyValue = companyInput ? companyInput.value.trim() : '';
        const messageValue = messageInput ? messageInput.value.trim() : '';
        
        console.log('Értékek:', {
            name: nameValue,
            email: emailValue,
            phone: phoneValue,
            company: companyValue,
            message: messageValue,
            gdpr: gdprCheckbox ? gdprCheckbox.checked : false
        });
        
        // Validáció
        let errors = [];
        
        if (!nameValue) {
            errors.push('A név mező kitöltése kötelező.');
            if (nameInput) nameInput.style.borderColor = '#e74c3c';
        } else {
            if (nameInput) nameInput.style.borderColor = '#e9ecef';
        }
        
        if (!emailValue) {
            errors.push('Az email cím megadása kötelező.');
            if (emailInput) emailInput.style.borderColor = '#e74c3c';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
            errors.push('Kérjük, adjon meg egy érvényes email címet.');
            if (emailInput) emailInput.style.borderColor = '#e74c3c';
        } else {
            if (emailInput) emailInput.style.borderColor = '#e9ecef';
        }
        
        if (!gdprCheckbox || !gdprCheckbox.checked) {
            errors.push('Az adatkezelési tájékoztató elfogadása kötelező.');
        }
        
        console.log('Validáció:', {
            hibák: errors.length,
            hibák_lista: errors
        });
        
        if (errors.length > 0) {
            console.log('Validáció sikertelen');
            if (formFeedback) {
                formFeedback.innerHTML = `
                    <div style="color: #e74c3c; background: #fdf2f2; padding: 1rem; border-radius: 8px; border-left: 4px solid #e74c3c;">
                        <strong>Hiba:</strong><br>
                        ${errors.join('<br>')}
                    </div>
                `;
            }
            return;
        }
        
        console.log('Validáció sikeres, küldés...');
        
        // Loading
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML = 'Küldés...';
        }
        
        if (formFeedback) {
            formFeedback.innerHTML = `
                <div style="color: #3498db; background: #f8f9fa; padding: 1rem; border-radius: 8px;">
                    Üzenet küldése folyamatban...
                </div>
            `;
        }
        
        try {
            const data = {
                name: nameValue,
                email: emailValue,
                phone: phoneValue || null,
                company: companyValue || null,
                message: messageValue || null
            };
            
            console.log('Küldendő adatok:', data);
            
            const response = await fetch('https://email-api-wheat.vercel.app/send-email-foglalj', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            console.log('API válasz státusz:', response.status);
            
            const result = await response.json();
            console.log('API válasz:', result);
            
            if (response.ok && result.success) {
                console.log('Sikeres küldés!');
                
                if (formFeedback) {
                    formFeedback.innerHTML = `
                        <div style="color: #27ae60; background: #f1f8f4; padding: 1rem; border-radius: 8px;">
                            ✅ Köszönjük! Üzenetét sikeresen elküldte.
                        </div>
                    `;
                }
                
                form.reset();
                
                setTimeout(() => {
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.innerHTML = '📧 Üzenet küldése';
                    }
                }, 3000);
                
            } else {
                throw new Error(result.error || 'Küldési hiba');
            }
            
        } catch (error) {
            console.error('Küldési hiba:', error);
            
            if (formFeedback) {
                formFeedback.innerHTML = `
                    <div style="color: #e74c3c; background: #fdf2f2; padding: 1rem; border-radius: 8px;">
                        ❌ Hiba történt: ${error.message}
                    </div>
                `;
            }
            
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = '📧 Üzenet küldése';
            }
        }
    });
});