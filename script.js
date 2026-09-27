const filterButtons = document.querySelectorAll('.filter-button');
const cards = document.querySelectorAll('.menu-card');
const emptyState = document.querySelector('.empty-state');
const searchInput = document.querySelector('#menu-search');
let activeFilter = 'all';

function updateMenu() {
  const search = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;
  cards.forEach((card) => {
    const matchesFilter = activeFilter === 'all' || card.dataset.category === activeFilter;
    const matchesSearch = !search || card.dataset.name.includes(search);
    const isVisible = matchesFilter && matchesSearch;
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });
  emptyState.hidden = visibleCount > 0;
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
    updateMenu();
  });
});

searchInput.addEventListener('input', updateMenu);

const trayCount = document.querySelector('#tray-count');
const trayTotal = document.querySelector('#tray-total');
const tray = [];

document.querySelectorAll('.add-button').forEach((button) => {
  button.addEventListener('click', () => {
    tray.push({ name: button.dataset.item, price: Number(button.dataset.price) });
    trayCount.textContent = `${tray.length} item${tray.length === 1 ? '' : 's'} ready for pickup`;
    trayTotal.textContent = `$${tray.reduce((sum, item) => sum + item.price, 0).toFixed(2)}`;
    button.innerHTML = 'Added to tray <span>✓</span>';
    window.setTimeout(() => { button.innerHTML = 'Add to tray <span>+</span>'; }, 1200);
  });
});

document.querySelector('#clear-tray').addEventListener('click', () => {
  tray.length = 0;
  trayCount.textContent = 'Nothing added yet';
  trayTotal.textContent = '$0.00';
});

const copyButton = document.querySelector('#copy-location');
const confirmation = document.querySelector('.copy-confirmation');

copyButton.addEventListener('click', async () => {
  const location = 'The Snack Shack — Library entrance, 12:10–12:35 PM';
  try {
    await navigator.clipboard.writeText(location);
    confirmation.textContent = 'Copied!';
  } catch {
    confirmation.textContent = 'Library entrance · 12:10–12:35 PM';
  }
  window.setTimeout(() => { confirmation.textContent = ''; }, 3000);
});
