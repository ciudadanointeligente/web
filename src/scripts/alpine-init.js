import Alpine from 'alpinejs';

window.Alpine = Alpine;
Alpine.start();

document.addEventListener('astro:after-swap', () => {
  Alpine.destroyTree(document.body);
  Alpine.initTree(document.body);
});
