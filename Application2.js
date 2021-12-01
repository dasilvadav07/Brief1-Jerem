import Activity from "./js/model/activity";
import { getUserById } from "./js/repository/user.repository";
import { getSkillsByActivity } from "./js/repository/activity.repository";
import { createLevel } from "./js/repository/level.repository";

class Application2 {
  container_activity = document.querySelector(".container_categ");
  container_skills = document.querySelector(".comp_block");
  idActivity = 1;
  currentActivity;
  skillsData;
  levelPromiseAll=[];

  constructor() {
    getSkillsByActivity(2).then((activity) => {
      this.currentActivity = new Activity(activity);
     // console.log(this.currentActivity);
      this.displayActivity();
      //console.log(activity);
    });
  }

  displayActivity(){
    let skillsHtml = "";
    this.currentActivity.skills.forEach(skill => {
      skillsHtml += `
          <div class="comp_block">
          <h2>${skill.id}</h2>
          <div class="comp_desc">
              <p>${skill.label}</p>
          </div>
    </div>`
  })
    let html = `
      <div class="categ">
          <h1>${this.currentActivity.id}</h1>
          <p>${this.currentActivity.description}</p>
      </div>  
      <div class="comp">  
      ${skillsHtml}
    </div>`;
  this.container_activity.innerHTML = html;  
  }

  // asyncStyle() {
  //   let comp = document.querySelectorAll(".comp");
  //   let firstComp = document.querySelectorAll(".comp_block:first-child");
  //   let secondComp = document.querySelectorAll(".comp_block:nth-child(2)");
  //   let thirdComp = document.querySelectorAll(".comp_block:last-child");
  // }

  // buildSkills() {
  //   getSkills().then((skills) => {
  //     skills.forEach((skill, index) => {
  //       this.container_activity.innerHTML +=
  //           this.displayComp(skill, index);
  //       });
  //       this.asyncStyle();
  //       this.addEventSkills();
  //   });
  // }


  // displayComp(skill, index) {
  //   let levels = this.currentUser.levels;
  //   index = index + 1;
  //   const isValidate = (number) => 
  //             !!levels.find(level => 
  //                 level.skillId === skill.id && level.number == number);

  //   const isVisible = (skillId) => 
  //         !!levels.find(level => 
  //             level.skillId === skillId);

  //   return `<div class="bubble activity-${skill.activityId}" id="b${index}" data-id="${skill.id}">
  //             <div class="bubble_comp_container${isVisible(skill.id) == false ? ' hide' : ''}">
  //                 <div class="comp_block${ isValidate(1) != false ? " bubble_red" : ""}">${1}</div>
  //                 <div class="comp_block${ isValidate(2) != false ? " bubble_red" : ""}">${2}</div>
  //                 <div class="comp_block${ isValidate(3) != false ? " bubble_red" : ""}">${3}</div>
  //             </div>
  //         </div>`;
  // }


}

export default Application2;