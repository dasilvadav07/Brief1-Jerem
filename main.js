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
}

for (let i = 0; i < secondBubble.length; i++) {
    let angle = ((Math.PI * 2) / secondBubble.length) * i;

    secondBubble[i].style.left = cercles[i].style.left;
    secondBubble[i].style.top = cercles[i].style.top;
    firstBubble[i].style.top = cercles[i].style.top;
    firstBubble[i].style.left = cercles[i].style.left;
    thirdBubble[i].style.top = cercles[i].style.top;
    thirdBubble[i].style.left = cercles[i].style.left;

}
