let cercles = document.querySelectorAll('.bubble');
let firstBubble = document.querySelectorAll('.bubble_comp:first-child');
let secondBubble= document.querySelectorAll('.bubble_comp:nth-child(2)');
let thirdBubble = document.querySelectorAll('.bubble_comp:last-child');

function positionCercle(element, theta) {
    element.style.left = 50 + (50 * Math.cos(theta)) + '%';
    element.style.top = 50 + (50 * Math.sin(theta)) + '%';
}

for (let i = 0; i < cercles.length; i++) {
    let angle = ((Math.PI * 2) / cercles.length) * i;
    positionCercle(cercles[i], angle);    

    cercles[i].querySelector('.bubble_comp_container').style.transform = `rotate(${224 + (i * 24)}deg)`;
}

for (let i = 0; i < secondBubble.length; i++) {
    let angle = ((Math.PI * 2) / secondBubble.length) * i;

    secondBubble[i].style.left = 0;
    secondBubble[i].style.top = '100%';
    firstBubble[i].style.top = '120%';
    firstBubble[i].style.left = '50%';
    thirdBubble[i].style.top = '50%';
    thirdBubble[i].style.left = '-20%';

}