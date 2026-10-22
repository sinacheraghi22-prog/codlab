const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav')

if (menuToggle && mainNav){
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('open');
        menuToggle.classList.toggle('active');
    });
}
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        
       
        submitBtn.textContent = 'در حال ارسال...';
        submitBtn.disabled = true;
        formMessage.style.display = 'none';

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                contactForm.reset(); 
                formMessage.textContent = 'پیام شما با موفقیت ارسال شد. به زودی با شما تماس می‌گیریم!';
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';
            } else {
                formMessage.textContent = 'مشکلی در ارسال پیام پیش آمد. لطفاً دوباره تلاش کنید.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
            }
        } catch (error) {
            formMessage.textContent = 'خطای شبکه. لطفاً اتصال اینترنت خود را بررسی کنید.';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
        } finally {
            // برگرداندن دکمه به حالت اول
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}
