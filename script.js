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

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const data = new FormData(form);
    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    }).then(response=>{
      if(response.ok){
        status.innerText = 'Mensaje enviado. Gracias!';
        form.reset();
      } else {
        response.json().then(err=>{
          status.innerText = 'Error al enviar. Por favor intenta de nuevo.';
        }).catch(()=> status.innerText = 'Error al enviar.');
      }
    }).catch(()=>{
      status.innerText = 'Error de red. Intenta más tarde.';
    });
  });
});
