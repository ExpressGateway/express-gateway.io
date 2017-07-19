let tocmenu = Array.from(document.querySelectorAll('.toclink'));

const handleClick = (e) => {
  tocmenu.forEach(node => {
    node.classList.remove('nav-active');
  });
  e.currentTarget.classList.add('nav-active');

}


tocmenu.forEach(node => {
  node.addEventListener('click', handleClick)
});
