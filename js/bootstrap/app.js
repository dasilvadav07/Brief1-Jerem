import HomeController from "../app/homeController";
import ActivityController from "../app/ActivityController";

let urlPath = location.pathname;
switch (urlPath) {
    case '/index.html':
            new HomeController().buildSkills();
        break
    case '/activity.html':
            new ActivityController();
        break
}

console.log(urlPath)



