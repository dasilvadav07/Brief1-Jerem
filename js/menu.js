function menu(){
    let menuBtn = document.querySelector("#menu-mobile");
    let firstBar = document.querySelector("#menu-mobile span:first-child");
    let secondBar = document.querySelector("#menu-mobile span:nth-child(2)");
    let thirdBar = document.querySelector("#menu-mobile span:last-child");
    let menuLink = document.querySelectorAll('.menu-list-item a');
    let menu = document.querySelector(".menu_open");
    menuLink.forEach(link => {
      link.addEventListener("click", () => {
        firstBar.classList.toggle('transition');
        secondBar.classList.toggle('transition2');
        thirdBar.classList.toggle('transition3');
        menu.classList.toggle('show');
      })
    });

    menuBtn.addEventListener("click", () => {
      firstBar.classList.toggle('transition');
      secondBar.classList.toggle('transition2');
      thirdBar.classList.toggle('transition3');
      menu.classList.toggle('show');
    })
}

export default menu;