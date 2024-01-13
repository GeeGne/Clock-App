export function navBar() {

  document.querySelectorAll('.nav-container')
    .forEach(app => {
      
    app.addEventListener('click', () => {
      const pageName = app.dataset.pageName;
      console.log(pageName);
      if (pageName === 'index') {
        window.location.href = 'index.html';
      }
      if (pageName === 'stopwatch') {
        window.location.href = 'stopwatch.html';
      }
    })
  });
}