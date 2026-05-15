// CARRITO
let carrito = [];

function agregarAlCarrito(nombre, precio) {
  const existe = carrito.find(i => i.nombre === nombre);
  if (existe) { existe.cantidad++; } else { carrito.push({ nombre, precio, cantidad: 1 }); }
  actualizarCarrito();
}

function quitarDelCarrito(nombre) {
  const item = carrito.find(i => i.nombre === nombre);
  if (item) {
    item.cantidad--;
    if (item.cantidad <= 0) carrito = carrito.filter(i => i.nombre !== nombre);
  }
  actualizarCarrito();
}

function actualizarCarrito() {
  const badge = document.getElementById('carrito-badge');
  const lista  = document.getElementById('carrito-lista');
  const total  = document.getElementById('carrito-total');
  const vacio  = document.getElementById('carrito-vacio');

  const totalItems = carrito.reduce((s, i) => s + i.cantidad, 0);
  badge.textContent = totalItems;
  badge.style.display = totalItems > 0 ? 'flex' : 'none';

  const btnPedir = document.getElementById('carrito-btn');
  if (carrito.length === 0) {
    vacio.style.display = 'block';
    lista.innerHTML = '';
    total.textContent = '$0.00';
    if (btnPedir) { btnPedir.style.opacity = '0.4'; btnPedir.style.pointerEvents = 'none'; }
  } else {
    vacio.style.display = 'none';
    if (btnPedir) { btnPedir.style.opacity = '1'; btnPedir.style.pointerEvents = 'auto'; }
    lista.innerHTML = carrito.map(i => `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:0.7rem 0;border-bottom:1px solid rgba(245,240,232,0.06);">
        <div>
          <div style="font-size:0.88rem;color:var(--crema);font-weight:500;">${i.nombre}</div>
          <div style="font-size:0.75rem;color:rgba(245,240,232,0.4);">$${i.precio.toFixed(2)} c/u</div>
        </div>
        <div style="display:flex;align-items:center;gap:10px;">
          <button onclick="quitarDelCarrito('${i.nombre}')" style="width:26px;height:26px;border-radius:50%;border:1px solid rgba(77,175,74,0.4);background:transparent;color:var(--verde-claro);cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;">−</button>
          <span style="font-size:0.9rem;color:var(--blanco);min-width:16px;text-align:center;">${i.cantidad}</span>
          <button onclick="agregarAlCarrito('${i.nombre}', ${i.precio})" style="width:26px;height:26px;border-radius:50%;border:1px solid rgba(77,175,74,0.4);background:transparent;color:var(--verde-claro);cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;">+</button>
        </div>
      </div>`).join('');
    total.textContent = `$${carrito.reduce((s, i) => s + i.precio * i.cantidad, 0).toFixed(2)}`;
  }

  const resumenItems = document.getElementById('resumen-items');
  const resumenTotal = document.getElementById('resumen-total');
  if (resumenItems) {
    if (carrito.length === 0) {
      resumenItems.innerHTML = '<span style="color:rgba(245,240,232,0.4);font-size:0.82rem;">No hay productos aún. Agrégalos desde el menú.</span>';
      if (resumenTotal) resumenTotal.textContent = '$0.00';
    } else {
      resumenItems.innerHTML = carrito.map(i => `
        <div style="display:flex;justify-content:space-between;padding:0.3rem 0;border-bottom:1px solid rgba(245,240,232,0.06);">
          <span>${i.nombre} x${i.cantidad}</span>
          <span style="color:var(--verde-claro);">$${(i.precio * i.cantidad).toFixed(2)}</span>
        </div>`).join('');
      if (resumenTotal) resumenTotal.textContent = `$${carrito.reduce((s, i) => s + i.precio * i.cantidad, 0).toFixed(2)}`;
    }
  }
}

function toggleCarrito() {
  const panel   = document.getElementById('carrito-panel');
  const overlay = document.getElementById('carrito-overlay');
  const abriendo = !panel.classList.contains('open');
  panel.classList.toggle('open');
  overlay.style.display = abriendo ? 'block' : 'none';
  document.body.style.overflow = abriendo ? 'hidden' : '';
}

function enviarPedidoCarrito() {
  if (carrito.length === 0) return;
  const items = carrito.map(i => `• ${i.nombre} x${i.cantidad} — $${(i.precio * i.cantidad).toFixed(2)}`).join('\n');
  const total = carrito.reduce((s, i) => s + i.precio * i.cantidad, 0);
  const mensaje = `🫔 *NUEVO PEDIDO - Tamalería Migueleña*\n\n${items}\n\n💰 *Total: $${total.toFixed(2)}*\n\n_Pedido desde el sitio web_`;
  window.open(`https://wa.me/50370000000?text=${encodeURIComponent(mensaje)}`, '_blank');
}

function selectEntrega(el) {
  document.querySelectorAll('.entrega-opt').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  const val = el.getAttribute('data-val');
  document.getElementById('campo-direccion').style.display = val === 'domicilio' ? 'block' : 'none';
  document.getElementById('campo-local').style.display     = val === 'local'     ? 'block' : 'none';
}

// HAMBURGER
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  const estaAbierto = mobileMenu.classList.contains('open');
  if (estaAbierto) {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  } else {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
});
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// CURSOR
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
document.addEventListener('mousemove', e => {
  cursor.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
  ring.style.transform   = `translate(${e.clientX - 18}px, ${e.clientY - 18}px)`;
});
document.querySelectorAll('a, button, .menu-item, .esp-card, .gal-item').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.style.transform += ' scale(2)');
  el.addEventListener('mouseleave', () => cursor.style.transform = cursor.style.transform.replace(' scale(2)', ''));
});

// NAVBAR SCROLL
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 80));

// SCROLL REVEAL
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), 100); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// FILTER BUTTONS
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const filtro = this.textContent.toLowerCase().trim();
    document.querySelectorAll('.menu-item').forEach(item => {
      const cat = item.getAttribute('data-categoria');
      if (filtro === 'todos' || cat === filtro || cat + 's' === filtro) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// FORM SUBMIT → WHATSAPP
document.querySelector('.btn-form').addEventListener('click', function () {
  const nombre   = document.querySelector('input[type="text"]').value.trim();
  const telefono = document.querySelector('input[type="tel"]').value.trim();
  const entrega  = document.querySelector('.entrega-opt.selected');
  const fecha    = document.querySelector('input[type="date"]').value;

  if (!nombre)   { alert('Por favor ingresa tu nombre.'); return; }
  if (!telefono) { alert('Por favor ingresa tu teléfono.'); return; }
  if (!entrega)  { alert('Por favor selecciona el tipo de entrega.'); return; }
  if (entrega.getAttribute('data-val') === 'domicilio') {
    const dir = document.getElementById('campo-direccion').querySelector('input').value.trim();
    if (!dir) { alert('Por favor ingresa tu dirección de entrega.'); return; }
  }
  if (entrega.getAttribute('data-val') === 'local') {
    const loc = document.getElementById('campo-local').querySelector('select').value;
    if (!loc) { alert('Por favor selecciona el local donde recogerás.'); return; }
  }
  if (carrito.length === 0) { alert('Tu carrito está vacío. Agrega productos desde el menú.'); return; }
  const notas = document.querySelector('textarea').value.trim();
  if (!notas) { alert('Por favor describe tu pedido en el campo de descripción.'); return; }
  if (!fecha) { alert('Por favor selecciona la fecha de entrega.'); return; }

  const entregaTipo = entrega.querySelector('.entrega-opt-title').innerText;
  const direccion   = entrega.getAttribute('data-val') === 'domicilio'
                      ? document.getElementById('campo-direccion').querySelector('input').value : '';
  const local       = entrega.getAttribute('data-val') === 'local'
                      ? document.getElementById('campo-local').querySelector('select').value : '';
  const lugar       = entregaTipo === 'A domicilio' ? `📍 Dirección: ${direccion}` : `🏪 Local: ${local}`;
  const items       = carrito.map(i => `• ${i.nombre} x${i.cantidad} — $${(i.precio * i.cantidad).toFixed(2)}`).join('\n');
  const total       = carrito.reduce((s, i) => s + i.precio * i.cantidad, 0);

  const mensaje = `🫔 *NUEVO PEDIDO - Tamalería Migueleña*

👤 *Nombre:* ${nombre}
📞 *Teléfono:* ${telefono}
🚚 *Entrega:* ${entregaTipo}
${lugar}
📅 *Fecha:* ${fecha}
📝 *Notas:* ${notas}

🛒 *Productos:*
${items}

💰 *Total: $${total.toFixed(2)}*`;

// Número según tipo de entrega y sucursal
  let numero = '50370000000'; // ← NÚMERO GLOBAL (domicilio)

  if (entrega.getAttribute('data-val') === 'local') {
    if (local.includes('Barrios'))        numero = '50371111111'; // ← BARRIOS
    else if (local.includes('Plaza'))     numero = '50372222222'; // ← PLAZA JARDÍN
    else if (local.includes('Encuentro')) numero = '50373333333'; // ← EL ENCUENTRO
    else if (local.includes('Ciudad'))    numero = '50374444444'; // ← CIUDAD REAL
  }

  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`, '_blank');
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

const styleEl = document.createElement('style');
styleEl.textContent = '#carrito-panel.open { right: 0 !important; }';
document.head.appendChild(styleEl);

// BUSCADOR
const platos = [
  { nombre: 'Tamal de Pollo',           precio: 0.75, seccion: '#menu' },
  { nombre: 'Tamal de Puerco',          precio: 0.75, seccion: '#menu' },
  { nombre: 'Tamal de Frijol',          precio: 0.60, seccion: '#menu' },
  { nombre: 'Tamal de Rajas',           precio: 0.85, seccion: '#menu' },
  { nombre: 'Tamal Dulce',              precio: 0.65, seccion: '#menu' },
  { nombre: 'Docena Surtida',           precio: 8.50, seccion: '#menu' },
  { nombre: 'Tamal Migueleño Especial', precio: 1.00, seccion: '#especialidades' },
  { nombre: 'El Gran Migueleño',        precio: 1.50, seccion: '#especialidades' },
  { nombre: 'Tamal Navideño',           precio: 1.00, seccion: '#especialidades' },
];

function toggleBuscador() {
  const wrap = document.getElementById('buscador-wrap');
  const input = document.getElementById('buscador-input');
  const abierto = wrap.style.display === 'flex';
  wrap.style.display = abierto ? 'none' : 'flex';
  if (!abierto) { input.focus(); input.value = ''; document.getElementById('buscador-resultados').style.display = 'none'; }
}

function buscarPlato(query) {
  const resultados = document.getElementById('buscador-resultados');
  const resultadosMobile = document.getElementById('buscador-resultados-mobile');

  if (!query.trim()) {
    if (resultados) resultados.style.display = 'none';
    if (resultadosMobile) resultadosMobile.style.display = 'none';
    return;
  }

  const encontrados = platos.filter(p => p.nombre.toLowerCase().includes(query.toLowerCase()));
  const html = encontrados.length === 0
    ? '<div style="padding:1rem;font-size:0.82rem;color:rgba(245,240,232,0.4);">No se encontraron resultados</div>'
    : encontrados.map(p => `
      <div onclick="seleccionarPlato('${p.nombre}',${p.precio},'${p.seccion}')"
        style="display:flex;justify-content:space-between;align-items:center;padding:0.8rem 1rem;cursor:pointer;border-bottom:1px solid rgba(245,240,232,0.06);transition:background 0.2s;"
        onmouseover="this.style.background='rgba(77,175,74,0.1)'"
        onmouseout="this.style.background='transparent'">
        <span style="font-size:0.85rem;color:var(--crema);">🫔 ${p.nombre}</span>
        <span style="font-size:0.82rem;color:var(--verde-claro);font-weight:600;">$${p.precio.toFixed(2)}</span>
      </div>`).join('');

  if (resultados) { resultados.innerHTML = html; resultados.style.display = 'block'; }
  if (resultadosMobile) { resultadosMobile.innerHTML = html; resultadosMobile.style.display = 'block'; }
}

function seleccionarPlato(nombre, precio, seccion) {
  agregarAlCarrito(nombre, precio);
  if (document.getElementById('buscador-resultados')) document.getElementById('buscador-resultados').style.display = 'none';
  if (document.getElementById('buscador-resultados-mobile')) document.getElementById('buscador-resultados-mobile').style.display = 'none';
  if (document.getElementById('buscador-input')) { document.getElementById('buscador-input').value = ''; document.getElementById('buscador-wrap').style.display = 'none'; }
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
  document.querySelector(seccion).scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('click', e => {
  const wrap = document.getElementById('buscador-wrap');
  if (!wrap) return;
  if (!wrap.contains(e.target) && !e.target.getAttribute('onclick')?.includes('toggleBuscador')) {
    wrap.style.display = 'none';
  }
});