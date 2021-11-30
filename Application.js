import User from "./js/model/user";
import { getUserById } from "./js/repository/user.repository";
import { getSkills } from "./js/repository/skill.repository";
import Skill from "./js/model/skill";

class Application {
  constainer_bubble = document.querySelector(".container_bubble");
  //apiUrl = "http://localhost:3000";
  idUser = 1;
  currentUser;
  skillsData;

  constructor() {
    getUserById(1).then((user) => {
      this.currentUser = new User(user);
    });
  }

  asyncStyle() {
    let cercles = document.querySelectorAll(".bubble");
    let firstBubble = document.querySelectorAll(".bubble_comp:first-child");
    let secondBubble = document.querySelectorAll(".bubble_comp:nth-child(2)");
    let thirdBubble = document.querySelectorAll(".bubble_comp:last-child");

    function positionCercle(element, theta) {
      element.style.left = 50 + 50 * Math.cos(theta) + "%";
      element.style.top = 50 + 50 * Math.sin(theta) + "%";
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
  }

  buildSkills() {
    getSkills().then((skills) => {
      skills.forEach((skill, index) => {
        console.log(skill, index);
        this.constainer_bubble.innerHTML += this.displayBubble(skill, index);
      }); 
      this.asyncStyle();
    });
  }

  displayBubble(skill, index) {
    return `  
    <div class="bubble" id="b${index + 1}">
        <div class="bubble_comp_container">
            <div class="bubble_comp"></div>
            <div class="bubble_comp"></div>
            <div class="bubble_comp"></div>
        </div>
    </div>`;
  }
}

export default Application;
