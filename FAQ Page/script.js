const toggles = document.querySelectorAll('.faq-toggle');

toggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const parent = toggle.parentNode;
    const content = parent.querySelector('.faq-container');
    
    parent.classList.toggle('active');
    
    if (parent.classList.contains('active')) {
      content.style.maxHeight = content.scrollHeight + 'px';
    } else {
      content.style.maxHeight = '0';
    }
  });
});
