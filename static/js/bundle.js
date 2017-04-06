/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/// <reference path="../dts/pixi.js.d.ts" />

exports.__esModule = true;
var game_1 = __webpack_require__(1);
var Main = (function () {
    function Main() {
        this.tbgscratch = new game_1["default"]();
    }
    return Main;
}());
exports["default"] = Main;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var settings_1 = __webpack_require__(2);
var engine_1 = __webpack_require__(3);
var Game = (function () {
    function Game() {
        console.log('GAME');
    }
    Game.prototype.init = function () {
        PIXI.loader.add('player', '/static/img/player.png');
        PIXI.loader.add('bg', '/static/img/bg.png');
        PIXI.loader.add('level1', '/assets/json/levelone.json');
        PIXI.loader.load(this._onLoad.bind(this));
    };
    Game.prototype._onLoad = function () {
        this._settings = new settings_1["default"]();
        this._engine = new engine_1["default"]();
        // this.engine.addSystem(new AnimationSystem(this.settings));
        // this.engine.addSystem(new MoveSystem(this.settings));
        // this.engine.addSystem(new RenderSystem(this.settings));
        // this.engine.addSystem(new ControlSystem(this.settings));
        // this.engine.addSystem(new CollisionSystem(this.settings));
        // this.engine.addSystem(new LevelSystem(this.settings));
        this._engine.init();
    };
    return Game;
}());
exports["default"] = Game;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Settings = (function () {
    function Settings() {
        this.GRAVITY = 1;
        this.FRICTION = 0.90;
        this.TILE = 16;
        this.MAP = [45, 30];
        this.KEY = { SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, P: 80 };
    }
    return Settings;
}());
exports["default"] = Settings;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// import MoveNode from './nodes/move';
// import RenderNode from './nodes/render';
// import ControlNode from './nodes/control';
// import CollisionNode from './nodes/collision';
// import AnimationNode from './nodes/animation';
// import LevelNode from './nodes/level';

exports.__esModule = true;
var Engine = (function () {
    function Engine() {
        // this.entities = [];
        // this.systems = [];
        // this.nodes = [];
        // this.typedNodes = {};
        // this.isPaused = false;
    }
    Engine.prototype.init = function () {
        this.update();
    };
    Engine.prototype.addEntity = function (entity) {
        // this.entities.push(entity);
        // if (entity.components.display && entity.components.position) {
        //     // render
        //     this.typedNodes['render'] = this.typedNodes['render'] || [];
        //     this.typedNodes['render'].push({ entityId: entity.id, class: 'render', data: new RenderNode(entity.id, entity.components.display, entity.components.position), isActive: true });
        // }
        // if (entity.components.animation && entity.components.display && entity.components.velocity) {
        //     this.typedNodes['animation'] = this.typedNodes['animation'] || [];
        //     // animation
        //     this.typedNodes['animation'].push({ entityId: entity.id, class: 'animation', data: new AnimationNode(entity.id, entity.components.animation, entity.components.display, entity.components.velocity), isActive: true });
        // }
        // if (entity.components.velocity && entity.components.position) {
        //     this.typedNodes['move'] = this.typedNodes['move'] || [];
        //     // move
        //     this.typedNodes['move'].push({ entityId: entity.id, class: 'move', data: new MoveNode(entity.id, entity.components.position, entity.components.velocity), isActive: true });
        // }
        // if (entity.components.velocity && entity.components.input) {
        //     this.typedNodes['control'] = this.typedNodes['control'] || [];
        //     // control
        //     this.typedNodes['control'].push({ entityId: entity.id, class: 'control', data: new ControlNode(entity.id, entity.components.control, entity.components.velocity), isActive: true });
        // }
        // if (entity.components.collision) {
        //     this.typedNodes['collision'] = this.typedNodes['collision'] || [];
        //     // collision
        //     this.typedNodes['collision'].push({ entityId: entity.id, class: 'collision', data: new CollisionNode(entity.id, entity.components.collision, entity.components.display, entity.components.velocity), isActive: true });
        // }
        // if (entity.components.position) { // need a second 'trigger' component or this will apply to all rendered objects
        //     this.typedNodes['level'] = this.typedNodes['level'] || [];
        //     // level
        //     this.typedNodes['level'].push({ entityId: entity.id, class: 'level', data: new LevelNode(entity.id, entity.components.position), isActive: true });
        // }
        // return entity;
    };
    Engine.prototype.addEntities = function (entities) {
        // if (entities && entities.length) {
        //     entities.map(this.addEntity.bind(this));
        // }
    };
    Engine.prototype.removeEntity = function (entity) {
        // let entityId = entity.id;
        // this.entities = this.entities.filter((entity) => {
        //     return entity.id !== entityId;
        // });
    };
    Engine.prototype.removeEntityById = function (entityId) {
        // return this.removeEntity({ id : entityId });
    };
    Engine.prototype.removeEntitiesById = function (ids) {
        // return ids.map((id) => {
        //     return this.removeEntityById(id);
        // });
    };
    Engine.prototype.addSystem = function (system) {
        // this.systems.push(system);
        // system.init();
    };
    Engine.prototype.removeSystem = function (system) {
        // system.stop();
        // system = null;
        // this.systems = this.systems.filter((system) => {
        //     return !!system;
        // });
    };
    Engine.prototype.getEntityById = function (entityId) {
        // return this.entities.filter((entity) => {
        //     return entity.id === entityId;
        // })[0];
    };
    Engine.prototype.update = function (before) {
        // this.isPaused = false;
        if (before === void 0) { before = 0; }
        // if (document.visibilityState !== 'visible') {
        //     this.isPaused = true;
        // }
        // let now = performance.now();
        // let dt = (now - before)/1000;
        // dt = Math.min(dt, 0.1); // magic number to prevent massive dt when tab not active
        // if (!this.isPaused) {
        //     let nodes = Object.keys(this.typedNodes).map((type) => {
        //         return this.typedNodes[type];
        //     });
        //     [].concat.apply([], nodes).filter((node) => {
        //         return !node.isActive;
        //     }).map((node) => {
        //         return node.entityId;
        //     }).filter((value, index, array) => {
        //         return array.indexOf(value) === index;
        //     }).map((id) => {
        //         let entity = this.getEntityById(id);
        //         console.log(entity);
        //         entity.destroy();
        //     });
        //     let results = [];
        //     this.systems.map((system) => {
        //         results.push(system.update(dt, this.typedNodes[system.class] || []));
        //     });
        //     results = results.filter((result) => { return result; });
        //     let newEntities = results.map((result) => {
        //         return result.newEntities;
        //     })[0];
        //     let deadEntities = results.map((result) => {
        //         return result.deadEntities;
        //     });
        //     this.addEntities(newEntities);
        // }
        // before = now;
        // requestAnimationFrame(this.update.bind(this, before));
    };
    return Engine;
}());
exports["default"] = Engine;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map