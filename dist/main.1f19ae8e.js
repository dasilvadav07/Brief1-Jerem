// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/model/user.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var User = function User(user) {
  _classCallCheck(this, User);

  _defineProperty(this, "id", void 0);

  _defineProperty(this, "firstName", void 0);

  _defineProperty(this, "lastName", void 0);

  _defineProperty(this, "avatar", void 0);

  _defineProperty(this, "levels", []);

  this.id = user.id;
  this.lastName = user.lastName;
  this.firstName = user.firstName;
  this.avatar = user.avatar;
  this.levels = user.levels;
};

var _default = User;
exports.default = _default;
},{}],"js/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fetch = function _fetch(url) {
  return fetch(url).then(function (response) {
    return response.json();
  });
};

var _default = _fetch;
exports.default = _default;
},{}],"js/repository/user.repository.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserById = getUserById;

var _utils = _interopRequireDefault(require("../utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiUrl = "http://localhost:3000";

function getUserById(userId) {
  return (0, _utils.default)("".concat(apiUrl, "/users/").concat(userId, "?_embed=levels"));
}
},{"../utils":"js/utils.js"}],"js/repository/skill.repository.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSkills = getSkills;

var _utils = _interopRequireDefault(require("../utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiUrl = "http://localhost:3000";

function getSkills() {
  return (0, _utils.default)("".concat(apiUrl, "/skills"));
}
},{"../utils":"js/utils.js"}],"js/repository/level.repository.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLevel = createLevel;
exports.postLevel = postLevel;

var _utils = _interopRequireDefault(require("../utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiUrl = "http://localhost:3000";

function postLevel(level) {
  return fetch("".concat(apiUrl, "/levels"), {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(level)
  });
}

function createLevel(skillId, currentUser) {
  var labels = ["Niveau 1", "Niveau 2", "Niveau 3"];
  var skills = [];

  for (var number = 1; number <= 3; number++) {
    skills.push(postLevel({
      label: labels[number - 1],
      number: number,
      skillId: skillId,
      userId: currentUser.id
    }));
  }

  return skills;
}
},{"../utils":"js/utils.js"}],"application.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _user = _interopRequireDefault(require("./js/model/user"));

var _user2 = require("./js/repository/user.repository");

var _skill = require("./js/repository/skill.repository");

var _level = require("./js/repository/level.repository");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Application = /*#__PURE__*/function () {
  function Application() {
    var _this = this;

    _classCallCheck(this, Application);

    _defineProperty(this, "container_bubble", document.querySelector(".container_bubble"));

    _defineProperty(this, "idUser", 1);

    _defineProperty(this, "currentUser", void 0);

    _defineProperty(this, "skillsData", void 0);

    _defineProperty(this, "levelPromiseAll", []);

    (0, _user2.getUserById)(1).then(function (user) {
      _this.currentUser = new _user.default(user);
    });
  }

  _createClass(Application, [{
    key: "asyncStyle",
    value: function asyncStyle() {
      var cercles = document.querySelectorAll(".bubble");
      var firstBubble = document.querySelectorAll(".bubble_comp:first-child");
      var secondBubble = document.querySelectorAll(".bubble_comp:nth-child(2)");
      var thirdBubble = document.querySelectorAll(".bubble_comp:last-child");

      function positionCercle(element, theta) {
        element.style.left = 50 + 50 * Math.cos(theta) + "%";
        element.style.top = 50 + 50 * Math.sin(theta) + "%";
      }

      for (var i = 0; i < cercles.length; i++) {
        var angle = Math.PI * 2 / cercles.length * i;
        positionCercle(cercles[i], angle);
        cercles[i].querySelector(".bubble_comp_container").style.transform = "rotate(".concat(224 + i * 24, "deg)");
      }

      for (var _i = 0; _i < secondBubble.length; _i++) {
        var _angle = Math.PI * 2 / secondBubble.length * _i;

        secondBubble[_i].style.left = 0;
        secondBubble[_i].style.top = "100%";
        firstBubble[_i].style.top = "120%";
        firstBubble[_i].style.left = "50%";
        thirdBubble[_i].style.top = "50%";
        thirdBubble[_i].style.left = "-20%";
      } // let menuBtn = document.querySelector("#menu-mobile");
      // let firstBar = document.querySelector("#menu-mobile span:first-child");
      // let secondBar = document.querySelector("#menu-mobile span:nth-child(2)");
      // let thirdBar = document.querySelector("#menu-mobile span:last-child");
      // let menuLink = document.querySelectorAll('.menu-list-item a');
      // let menu = document.querySelector(".menu_open");
      // menuLink.forEach(link => {
      //   link.addEventListener("click", () => {
      //     firstBar.classList.toggle('transition');
      //     secondBar.classList.toggle('transition2');
      //     thirdBar.classList.toggle('transition3');
      //     menu.classList.toggle('show');
      //   })
      // });
      // menuBtn.addEventListener("click", () => {
      //   firstBar.classList.toggle('transition');
      //   secondBar.classList.toggle('transition2');
      //   thirdBar.classList.toggle('transition3');
      //   menu.classList.toggle('show');
      // })

    }
  }, {
    key: "buildSkills",
    value: function buildSkills() {
      var _this2 = this;

      (0, _skill.getSkills)().then(function (skills) {
        skills.forEach(function (skill, index) {
          _this2.container_bubble.innerHTML += _this2.displayBubble(skill, index);
        });

        _this2.asyncStyle();

        _this2.addEventSkills();
      });
    }
  }, {
    key: "addEventSkills",
    value: function addEventSkills() {
      var _this3 = this;

      var skills = document.querySelectorAll('.bubble');
      skills.forEach(function (skill, index) {
        skill.addEventListener('click', function () {
          skill.querySelector('.bubble_comp_container').classList.remove('hide');
          var self = _this3;
          var skillId = parseInt(skill.dataset.id);

          var isExist = function isExist(number) {
            return !!_this3.currentUser.levels.find(function (level) {
              return level.skillId === skillId;
            });
          };

          console.log(_this3.currentUser);

          if (!isExist()) {
            Promise.all((0, _level.createLevel)(skillId, self.currentUser)).then(function (resp) {
              return Promise.all(resp.map(function (r) {
                return r.json();
              }));
            }).then(function (result) {
              location.reload();
            });
          }
          /*this.removeElement('.rv-vanilla-modal');
          this.displayModal(skill.dataset.id);*/

        });
      });
    }
  }, {
    key: "displayBubbleCom",
    value: function displayBubbleCom() {}
  }, {
    key: "displayModal",
    value: function displayModal(skillId) {
      var _this4 = this;

      var body = document.querySelector("body");
      var div = document.createElement('div');
      div.className = 'rv-vanilla-modal';
      div.id = 'target-modal';
      div.innerHTML = "\n            <div class=\"rv-vanilla-modal-header group\">\n                <button class=\"rv-vanilla-modal-close\"><span class=\"close\">\xD7</span></button>\n                <h2 class=\"rv-vanilla-modal-title\">Modal Title</h2>\n              </div>\n              <div class=\"rv-vanilla-modal-body\">\n              <form id=\"form\">\n                <p>\n                <label for='my-date'>Label</label><br>\n                  <input type='text' name='label' placeholder='yyyy-mm-jj'>\n                </p>\n                <p>\n                <label for='my-time'>Niveau</label><br>\n                  <select name=\"number\">\n                    <option value=\"1\">1</option>\n                    <option value=\"2\">2</option>\n                    <option value=\"3\">3</option>\n                  </select>\n                </p>\n                <p><button type='submit'>Valider</button>\n            </form>\n          </div>\n      ";
      body.append(div);
      body.querySelector('.close').addEventListener('click', function () {
        _this4.removeElement('.rv-vanilla-modal');
      });
      var self = this;
      body.querySelector('#form').addEventListener('submit', function (e) {
        e.preventDefault();
        var reqBody = {
          skillId: skillId
        };
        Object.keys(this.elements).forEach(function (key) {
          var element = form.elements[key];

          if (element.type !== "submit") {
            reqBody[element.name] = element.value;
          }
        });
        (0, _level.createLevel)(reqBody, self.currentUser);
      });
    }
  }, {
    key: "removeElement",
    value: function removeElement(className) {
      var isExist = !!document.querySelector(className);
      isExist != false ? document.querySelector(className).remove() : '';
    }
  }, {
    key: "displayBubble",
    value: function displayBubble(skill, index) {
      //createMany(skill, this.currentUser)
      var levels = this.currentUser.levels;
      index = index + 1;

      var isValidate = function isValidate(number) {
        return !!levels.find(function (level) {
          return level.skillId === skill.id && level.number == number;
        });
      };

      var isVisible = function isVisible(skillId) {
        return !!levels.find(function (level) {
          return level.skillId === skillId;
        });
      };

      return "<div class=\"bubble activity-".concat(skill.activityId, "\" id=\"b").concat(index, "\" data-id=\"").concat(skill.id, "\">\n              <div class=\"bubble_comp_container").concat(isVisible(skill.id) == false ? ' hide' : '', "\">\n                  <div class=\"bubble_comp").concat(isValidate(1) != false ? " bubble_red" : "", "\">", 1, "</div>\n                  <div class=\"bubble_comp").concat(isValidate(2) != false ? " bubble_red" : "", "\">", 2, "</div>\n                  <div class=\"bubble_comp").concat(isValidate(3) != false ? " bubble_red" : "", "\">", 3, "</div>\n              </div>\n          </div>");
    }
  }]);

  return Application;
}();

var _default = Application;
exports.default = _default;
},{"./js/model/user":"js/model/user.js","./js/repository/user.repository":"js/repository/user.repository.js","./js/repository/skill.repository":"js/repository/skill.repository.js","./js/repository/level.repository":"js/repository/level.repository.js"}],"main.js":[function(require,module,exports) {
"use strict";

var _application = _interopRequireDefault(require("./application"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _application.default().buildSkills(); // new Application().displayBubble();
},{"./application":"application.js"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51046" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map