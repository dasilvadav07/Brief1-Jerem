import User from "../model/user";
import { getUserById } from "../repository/user.repository";
import { getSkills } from "../repository/skill.repository";
import {createLevel, udateLevel} from "../repository/level.repository";
import menu from "../../libs/menu";
import {_getRandom} from "../utils";

class HomeController {
  container_bubble = document.querySelector(".container_bubble");
  container_user = document.querySelector(".container_user");
  container_username = document.querySelector('.user_name');
  idUser = 1;
  currentUser;
  skillsData;
  levelPromiseAll=[];

  constructor() {
    getUserById(_getRandom(1, 4)).then((user) => {
      this.currentUser = new User(user);
      this.displayInfoUser();
    });
  }

  displayInfoUser(){
    let image = document.createElement("img");
    let nameUser = document.createElement("p");
    image.src = this.currentUser.avatar;
    nameUser.textContent = this.currentUser.getFullName(this.currentUser);
    this.container_user.querySelector('.user_avatar').append(image);
    this.container_username.append(nameUser);
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
      cercles[i].querySelector(
        ".bubble_comp_container"
      ).style.transform = `rotate(${224 + i * 24}deg)`;
    }

    for (let i = 0; i < secondBubble.length; i++) {
      secondBubble[i].style.left = 0;
      secondBubble[i].style.top = "100%";
      firstBubble[i].style.top = "120%";
      firstBubble[i].style.left = "50%";
      thirdBubble[i].style.top = "50%";
      thirdBubble[i].style.left = "-20%";
    }
    menu();
  }

  buildSkills() {
    getSkills().then((skills) => {
        skills.forEach((skill, index) => {
          this.container_bubble.innerHTML += this.displayBubble(skill, index);
            const isExist = (skillId) => !!this.currentUser.levels.find(level => level.skillId === skillId);
            let currentSkill = document.querySelector('div[data-id="'+parseInt(skill.id)+'"]');
            isExist(skill.id) === true ?
                currentSkill.querySelector('.bubble_comp_container').classList.add('active'): '';
        });
        this.asyncStyle();
        this.addEventSkills();
        this.addEventsLevel(document);
    });
  }

  addEventsLevel(element){
    element.querySelectorAll(".bubble_comp").forEach(bubbleComp => {
      bubbleComp.addEventListener("click", function(){
        let isActive = this.classList.contains('bubble_red');
        isActive ? this.classList.remove('bubble_red') : this.classList.add('bubble_red');
        udateLevel(this.getAttribute('id'));
      })
    });
  }

  bubbleComStyle(skill){
    let firstBubble = skill.querySelector(".bubble_comp:first-child");
    let secondBubble = skill.querySelector(".bubble_comp:nth-child(2)");
    let thirdBubble = skill.querySelector(".bubble_comp:last-child");
    secondBubble.style.left = 0;
    secondBubble.style.top = "100%";
    firstBubble.style.top = "120%";
    firstBubble.style.left = "50%";
    thirdBubble.style.top = "50%";
    thirdBubble.style.left = "-20%";
  }

  addEventSkills(){
      let skills = document.querySelectorAll('.bubble');
      skills.forEach((skill, index) => {
          skill.addEventListener('click', () => {
              let isActive = skill.querySelector('.active');
              let bubble_comp_container = skill.querySelector('.bubble_comp_container');
                  bubble_comp_container.classList.remove('hide');
                  bubble_comp_container.classList.add('active');

              let self = this;
              let skillId = parseInt(skill.dataset.id);

              if(!isActive){
                Promise.all(createLevel(skillId, self.currentUser))
                  .then(resp => Promise.all( resp.map(r => r.json()) ))
                  .then(levels => {
                    let currentSkill = document.querySelector('div[data-id="'+skillId+'"]');
                      currentSkill.querySelector('.bubble_comp_container')
                          .innerHTML = this.displayBubbleComp(levels, skillId);
                      this.bubbleComStyle(currentSkill);
                      this.addEventsLevel(currentSkill);
                  });
              }
          })
    });
  }

  isValidate(levels, number, skillId){
    return !!levels.find(level =>
      level.skillId === skillId
      && level.number === number
      && level.isValidated === true);
  };

  displayBubbleComp(levels, skillId){
    let html = '';
    if(levels.length > 0){
       levels.forEach(level =>
        {html +=`<div id="${level.id}" class="bubble_comp${this.isValidate(levels, level.number, skillId) !== false ? " bubble_red" : ""}">${level.number}</div>`;});
    }
    return html;
   }

  displayModal(skillId){
    let body = document.querySelector("body");
    let div = document.createElement('div');
    div.className = 'rv-vanilla-modal';
    div.id = 'target-modal';
    div.innerHTML = `
            <div class="rv-vanilla-modal-header group">
                <button class="rv-vanilla-modal-close"><span class="close">×</span></button>
                <h2 class="rv-vanilla-modal-title">Modal Title</h2>
              </div>
              <div class="rv-vanilla-modal-body">
              <form id="form">
                <p>
                <label for='my-date'>Label</label><br>
                  <input type='text' name='label' placeholder='yyyy-mm-jj'>
                </p>
                <p>
                <label for='my-time'>Niveau</label><br>
                  <select name="number">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </p>
                <p><button type='submit'>Valider</button>
            </form>
          </div>
      `;
      body.append(div);
      body.querySelector('.close').addEventListener('click', () =>{
        this.removeElement('.rv-vanilla-modal');
      }); 
      let self = this;
      body.querySelector('#form').addEventListener('submit', function(e){
        e.preventDefault();
        let reqBody = {skillId: skillId};
        Object.keys(this.elements).forEach(key => {
            let element = form.elements[key];
            if (element.type !== "submit") {
                reqBody[element.name] = element.value;
            }
        });
        createLevel(reqBody, self.currentUser);
      }); 
  }

  removeElement(className){
    let isExist = !!document.querySelector(className);
      isExist !== false ?
        document.querySelector(className).remove() : '';
  }
  
  displayBubble(skill, index) {
    let levels = this.currentUser.levels;
    index = index + 1;
    const isVisible = (skillId) => 
          !!levels.find(level => 
              level.skillId === skillId);

    let bubbleComp = []
    levels.find(level => {
        level.skillId === skill.id ?  bubbleComp.push(level) : '';
    });

    return `<div class="bubble activity-${skill.activityId}" id="b${index}" data-id="${skill.id}">
              <div class="bubble_comp_container${isVisible(skill.id) === false ? ' hide' : ''}">
                 ${this.displayBubbleComp(bubbleComp, skill.id)}
              </div>
          </div>`;
  }



}

export default HomeController;
