/** Sunboats — configuração do site. Preencha somente com dados CONFIRMADOS. */
const SITE_CONFIG = Object.freeze({
  // Coloque o WhatsApp OFICIAL, com DDI+DDD, só números. Ex.: '5561999999999'.
  whatsappNumber: '556196285893',
  instagramUrl: 'https://www.instagram.com/sunboatsdf/',
  // Opcional: GTM/Meta Pixel são instalados separadamente com consentimento LGPD.
});

const $ = (selector) => document.querySelector(selector);
const instagramFallback = SITE_CONFIG.instagramUrl;
const whatsappDigits = (SITE_CONFIG.whatsappNumber || '').replace(/\D/g,'');
const hasWhatsApp = /^55\d{10,11}$/.test(whatsappDigits);

const menuToggle = $('#menuToggle');
const primaryNav = $('#primary-nav');
menuToggle?.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  menuToggle.setAttribute('aria-label', expanded ? 'Abrir menu' : 'Fechar menu');
  primaryNav.classList.toggle('open', !expanded);
});
primaryNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  primaryNav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded','false');
  menuToggle?.setAttribute('aria-label','Abrir menu');
}));

const dateInput = $('#date');
function setMinimumDate() {
  const now = new Date();
  const localDate = [now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');
  dateInput.min = localDate;
}
setMinimumDate();
$('#year').textContent = new Date().getFullYear();

for (const el of document.querySelectorAll('[data-experience]')) {
  el.addEventListener('click', () => { $('#experience').value = el.dataset.experience; });
}
for (const button of document.querySelectorAll('[data-occasion]')) {
  button.addEventListener('click', () => {
    $('#experience').value = 'Evento ou comemoração';
    $('#notes').value = `Gostaria de informações para: ${button.dataset.occasion}.`;
    $('#reservar').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    setTimeout(()=>$('#name').focus({preventScroll:true}),300);
  });
}

function buildMessage() {
  const f = $('#bookingForm');
  const name = f.elements.name.value.trim();
  const experience = f.elements.experience.value.trim();
  const date = f.elements.date.value;
  const people = Number(f.elements.people.value);
  if (name.length < 2) throw Error('Informe seu nome.');
  if (!experience) throw Error('Escolha uma experiência.');
  if (!date || date < dateInput.min) throw Error('Selecione uma data válida.');
  if (!Number.isInteger(people) || people < 1 || people > 99) throw Error('Informe a quantidade de pessoas (1 a 99).');
  const [yy,mm,dd]=date.split('-');
  const notes = f.elements.notes.value.trim();
  return `Olá, equipe Sunboats! Gostaria de consultar uma reserva.\n\nNome: ${name}\nExperiência: ${experience}\nData desejada: ${dd}/${mm}/${yy}\nPessoas: ${people}${notes ? '\nObservações: ' + notes : ''}\n\nPoderiam informar a disponibilidade, os valores e o local de embarque?`;
}

function openNewWindow(url) {
  const node = document.createElement('a');
  node.href = url;
  node.target = '_blank';
  node.rel = 'noopener noreferrer';
  document.body.appendChild(node);
  node.click();
  node.remove();
}
$('#bookingSubmit').firstChild.textContent = hasWhatsApp ? 'Enviar solicitação pelo WhatsApp ' : 'Copiar pedido e abrir Instagram ';
$('#bookingStatus').textContent = hasWhatsApp ? 'Você será redirecionado ao WhatsApp para confirmar sua consulta.' : 'Atendimento inicial pelo Instagram. O número oficial de WhatsApp ainda precisa ser cadastrado.';
if (hasWhatsApp) {
  $('#floatingContact').href = `https://wa.me/${whatsappDigits}?text=${encodeURIComponent('Olá, Sunboats! Gostaria de informações sobre os passeios.')}`;
  $('#floatingContact').setAttribute('aria-label', 'Falar com a Sunboats no WhatsApp');
  $('#floatingText').textContent = 'Reservar no WhatsApp';
}

$('#bookingForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const errorBox = $('#formError');
  errorBox.textContent = '';
  try {
    const message = buildMessage();
    if (hasWhatsApp) {
      openNewWindow(`https://wa.me/${whatsappDigits}?text=${encodeURIComponent(message)}`);
    } else {
      // Abra o Instagram ainda dentro do gesto do usuário para evitar bloqueio de pop-ups.
      openNewWindow(instagramFallback);
      try { await navigator.clipboard.writeText(message); }
      catch { window.prompt('Copie sua mensagem e envie no Instagram:',message); }
      $('#bookingStatus').textContent = 'Pedido copiado! Cole a mensagem na conversa com @sunboatsdf.';
    }
  } catch(error) {
    errorBox.textContent = error.message || 'Revise os dados da sua solicitação.';
    errorBox.scrollIntoView({behavior:'smooth',block:'nearest'});
  }
});


// Seletor de filmes: um único player reproduz apenas o clipe escolhido.
const cinemaVideo = document.getElementById('cinemaVideo');
const cinemaToggle = document.getElementById('cinemaToggle');
const filmChoices = document.querySelectorAll('.cinema-choice');
let cinemaUserPaused = false;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function syncCinemaButton() {
  if (!cinemaVideo || !cinemaToggle) return;
  const paused = cinemaVideo.paused;
  cinemaToggle.setAttribute('aria-label', paused ? 'Reproduzir vídeo' : 'Pausar vídeo');
  cinemaToggle.innerHTML = paused ? '<span aria-hidden="true">▶</span>' : '<span aria-hidden="true">Ⅱ</span>';
}
function playCinema() {
  if (!cinemaVideo) return;
  const attempt = cinemaVideo.play();
  if (attempt?.catch) attempt.catch(() => { cinemaUserPaused=true; syncCinemaButton(); });
}
if (cinemaVideo && cinemaToggle) {
  if (reducedMotion.matches) {
    cinemaUserPaused = true;
    cinemaVideo.pause();
  }
  cinemaToggle.addEventListener('click', () => {
    cinemaUserPaused = !cinemaVideo.paused;
    if (cinemaVideo.paused) {
      cinemaUserPaused = false;
      playCinema();
    } else {
      cinemaUserPaused = true;
      cinemaVideo.pause();
    }
    syncCinemaButton();
  });
  cinemaVideo.addEventListener('play',syncCinemaButton);
  cinemaVideo.addEventListener('pause',syncCinemaButton);
  filmChoices.forEach((button) => {
    button.addEventListener('click',() => {
      if (button.classList.contains('active')) { playCinema(); cinemaUserPaused=false; return; }
      filmChoices.forEach((b)=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',b===button?'true':'false');});
      cinemaVideo.pause();
      cinemaVideo.src=button.dataset.video;
      cinemaVideo.poster=button.dataset.poster || '';
      cinemaVideo.setAttribute('aria-label',button.dataset.label || 'Vídeo Sunboats');
      cinemaVideo.load();
      cinemaUserPaused=false;
      playCinema();
      if (window.innerWidth<761) cinemaVideo.scrollIntoView({behavior:reducedMotion.matches?'auto':'smooth',block:'center'});
    });
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !cinemaUserPaused && !reducedMotion.matches) playCinema();
        else if (!entry.isIntersecting && !cinemaVideo.paused) cinemaVideo.pause();
      }
    },{threshold:.2}).observe(cinemaVideo);
  }
  syncCinemaButton();
}

// Galeria: zoom e navegação acessível; sem bibliotecas externas.
const galleryItems = Array.from(document.querySelectorAll('[data-gallery]'));
const photoDialog = document.getElementById('photoDialog');
const photoImg = document.getElementById('photoDialogImg');
const photoCaption = document.getElementById('photoCaption');
const photoClose = document.getElementById('photoClose');
let galleryIndex = 0;
let galleryReturnFocus = null;
function showGalleryIndex(index) {
  if (!galleryItems.length) return;
  galleryIndex = (index + galleryItems.length) % galleryItems.length;
  const item = galleryItems[galleryIndex];
  photoImg.src = item.dataset.gallery;
  photoImg.alt = item.dataset.caption || 'Foto real da Sunboats';
  photoCaption.textContent = `${galleryIndex+1}/${galleryItems.length} · ${item.dataset.caption || 'Sunboats'}`;
}
function openGallery(index) {
  galleryReturnFocus = document.activeElement;
  showGalleryIndex(index);
  photoDialog.hidden = false;
  document.body.style.overflow = 'hidden';
  photoClose.focus();
}
function closeGallery() {
  photoDialog.hidden = true;
  document.body.style.overflow = '';
  if (galleryReturnFocus && galleryReturnFocus.focus) galleryReturnFocus.focus();
}
galleryItems.forEach((item,index) => item.addEventListener('click',()=>openGallery(index)));
photoClose?.addEventListener('click',closeGallery);
document.getElementById('photoPrev')?.addEventListener('click',()=>showGalleryIndex(galleryIndex-1));
document.getElementById('photoNext')?.addEventListener('click',()=>showGalleryIndex(galleryIndex+1));
photoDialog?.addEventListener('click',(e)=>{if(e.target===photoDialog)closeGallery();});
document.addEventListener('keydown',(e)=>{
  if (!photoDialog || photoDialog.hidden) return;
  if (e.key==='Escape') closeGallery();
  if (e.key==='ArrowRight') showGalleryIndex(galleryIndex+1);
  if (e.key==='ArrowLeft') showGalleryIndex(galleryIndex-1);
  if (e.key==='Tab') {
    // Keeps keyboard focus inside photo modal.
    const focusable = [photoClose,document.getElementById('photoPrev'),document.getElementById('photoNext')];
    const activeIndex = focusable.indexOf(document.activeElement);
    if (e.shiftKey && activeIndex<=0){e.preventDefault();focusable[focusable.length-1].focus();}
    else if (!e.shiftKey && activeIndex===focusable.length-1){e.preventDefault();focusable[0].focus();}
  }
});
