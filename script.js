// Small helper to allow editing the footer text in-page for quick customization
document.addEventListener('DOMContentLoaded', function(){
  const footerText = document.getElementById('footer-text');
  if(!footerText) return;

  footerText.contentEditable = true;
  footerText.title = 'Haz clic para editar este texto';

  footerText.addEventListener('blur', ()=>{
    // Persist locally in case user refreshes (local only)
    localStorage.setItem('masa_footer', footerText.innerText);
  });

  const saved = localStorage.getItem('masa_footer');
  if(saved) footerText.innerText = saved;
});

// Nav toggle
document.addEventListener('DOMContentLoaded', function(){
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if(toggle && nav){
    toggle.addEventListener('click', ()=>{
      if(nav.style.display === 'block') nav.style.display = '';
      else nav.style.display = 'block';
    });
  }

  // Simple carousel
  const track = document.querySelector('.carousel-track');
  if(!track) return;
  const items = Array.from(track.children);
  let idx = 0;
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');

  function update(){
    track.style.transform = `translateX(-${idx * 100}%)`;
  }

  prevBtn && prevBtn.addEventListener('click', ()=>{ idx = (idx - 1 + items.length) % items.length; update(); });
  nextBtn && nextBtn.addEventListener('click', ()=>{ idx = (idx + 1) % items.length; update(); });
});

// Contact form handling (Formspree)
document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('contact-form');
  const status = document.getElementById('contact-status');
  if(!form) return;
  // Enhance UX: disable submit while sending, show clear status and classes
  const submitBtn = form.querySelector('button[type="submit"]');
  function setStatus(message, kind){
    if(!status) return;
    // Build icon + text HTML
    let iconHTML = '';
    if(kind === 'info'){
      // spinner
      iconHTML = '<span class="status-icon" aria-hidden="true"><span class="spinner"></span></span>';
    } else if(kind === 'success'){
      iconHTML = '<span class="status-icon" aria-hidden="true">' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
        '<path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
        '</svg></span>';
    } else if(kind === 'error'){
      iconHTML = '<span class="status-icon" aria-hidden="true">' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
        '<path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
        '</svg></span>';
    }

    // Set markup (icon + text). Use status-text for the message to allow styling.
    status.innerHTML = iconHTML + '<span class="status-text">' + message + '</span>';

    // Update classes
    status.classList.remove('status-success','status-error','status-info');
    if(kind) status.classList.add('status-' + kind);

    // trigger pop animation by reflowing the class
    status.classList.remove('status-pop');
    // force reflow
    // eslint-disable-next-line no-unused-expressions
    void status.offsetWidth;
    status.classList.add('status-pop');
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    // disable submit
    if(submitBtn) submitBtn.disabled = true;
    setStatus('Enviando…', 'info');

    const data = new FormData(form);
    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    }).then(async response=>{
      if(response.ok){
        setStatus('Mensaje enviado. ¡Gracias por contactarnos!', 'success');
        form.reset();
      } else {
        // try to get JSON error details from Formspree
        try{
          const payload = await response.json();
          console.error('Formspree error response:', payload);
        }catch(e){ /* ignore */ }
        setStatus('No fue posible enviar el mensaje. Por favor intenta de nuevo.', 'error');
      }
    }).catch(err=>{
      console.error('Network error sending contact form', err);
      setStatus('Error de red. Intenta más tarde.', 'error');
    }).finally(()=>{
      if(submitBtn) submitBtn.disabled = false;
    });
  });
});

// Back button helper: if current location is site root under user.github.io, ensure back links go to repo root
document.addEventListener('DOMContentLoaded', function(){
  // Find back links in article pages
  const backLinks = document.querySelectorAll('.breadcrumb a[href="../index.html"], a[href="../index.html"]');
  if(!backLinks.length) return;
  backLinks.forEach(a=>{
    a.addEventListener('click', function(e){
      // If we are on GitHub Pages with a path that includes the repo name, navigate to ../index.html normally
      // Otherwise, compute a safe URL: window.location.origin + '/networkMASA/'
      const origin = window.location.origin;
      // If origin is github pages root, and path root is not the repo root, redirect to the repo root
      if(origin.includes('github.io')){
        // try to detect repo name from meta or from known hostname
        const repoBase = '/networkMASA/';
        const target = origin + repoBase;
        e.preventDefault();
        window.location.href = target;
      }
      // otherwise allow normal behavior (relative link)
    });
  });
});

// Company info save/load for who.html
document.addEventListener('DOMContentLoaded', function(){
  // No longer storing company info in-page. Section replaced with static content.
});
