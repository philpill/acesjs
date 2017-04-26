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
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/// <reference path="../../dts/pixi.js.d.ts" />

exports.__esModule = true;
var DisplayComponent = (function () {
    function DisplayComponent(sprite) {
        this["class"] = 'display';
        this.sprite = sprite;
        this.isFocus = false;
    }
    return DisplayComponent;
}());
exports["default"] = DisplayComponent;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var PositionComponent = (function () {
    function PositionComponent() {
        this["class"] = 'position';
        this.x = 0;
        this.y = 0;
        this.isPlayer = false;
    }
    return PositionComponent;
}());
exports["default"] = PositionComponent;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Entity = (function () {
    function Entity() {
        this.id = this._generateUUID();
        this.isActive = true;
        this.components = {};
    }
    Entity.prototype._generateUUID = function () {
        var d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };
    Entity.prototype.addComponent = function (component) {
        this.components[component["class"]] = component;
    };
    Entity.prototype.addComponents = function () {
        var _this = this;
        var components = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            components[_i] = arguments[_i];
        }
        components.map(function (component) {
            _this.components[component["class"]] = component;
        });
    };
    Entity.prototype.removeComponent = function (componentClass) {
        this.components[componentClass] = null;
    };
    Entity.prototype.destroy = function () {
        console.log('destroy');
    };
    return Entity;
}());
exports["default"] = Entity;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/// <reference path="../dts/pixi.js.d.ts" />

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Sprite = (function (_super) {
    __extends(Sprite, _super);
    function Sprite(args) {
        var _this = _super.call(this, args) || this;
        _this.data = { texture: [] };
        return _this;
    }
    return Sprite;
}(PIXI.Sprite));
exports["default"] = Sprite;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var CollisionComponent = (function () {
    function CollisionComponent() {
        this["class"] = 'collision';
        this.type = '';
        this.isDamageCollision = false;
        this.isTopObstacleCollision = false;
        this.isBottomObstacleCollision = false;
        this.isRightObstacleCollision = false;
        this.isLeftObstacleCollision = false;
        this.isTriggerCollision = false;
        this.collide = function () {
            // console.log('COLLIDE');
        };
    }
    return CollisionComponent;
}());
exports["default"] = CollisionComponent;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var move_1 = __webpack_require__(21);
var render_1 = __webpack_require__(22);
var control_1 = __webpack_require__(19);
var collision_1 = __webpack_require__(18);
var animation_1 = __webpack_require__(17);
var level_1 = __webpack_require__(20);
var Engine = (function () {
    function Engine() {
        this.entities = [];
        this.systems = [];
        this.nodes = [];
        this.typedNodes = {
            render: [],
            animation: [],
            move: [],
            control: [],
            obstacleCollision: [],
            level: []
        };
        this.isPaused = false;
    }
    Engine.prototype.init = function () {
        this.update();
    };
    Engine.prototype.addEntity = function (entity) {
        this.entities.push(entity);
        var entityComponents = entity.components;
        if (entityComponents.display && entityComponents.position) {
            // render
            var node = new render_1["default"](entity.id, entityComponents.display, entityComponents.position);
            this.typedNodes['render'].push({
                entityId: entity.id,
                "class": 'render',
                data: node,
                isActive: true
            });
        }
        if (entityComponents.animation && entityComponents.display && entityComponents.velocity) {
            var node = new animation_1["default"](entity.id, entityComponents.animation, entityComponents.display, entityComponents.velocity);
            // animation
            this.typedNodes['animation'].push({
                entityId: entity.id,
                "class": 'animation',
                data: node,
                isActive: true
            });
        }
        if (entityComponents.velocity && entityComponents.position && entityComponents.collision) {
            var node = new move_1["default"](entity.id, entityComponents.position, entityComponents.velocity, entityComponents.collision);
            // move
            this.typedNodes['move'].push({
                entityId: entity.id,
                "class": 'move',
                data: node,
                isActive: true
            });
        }
        if (entityComponents.velocity && entityComponents.input) {
            var node = new control_1["default"](entity.id, entityComponents.control, entityComponents.velocity);
            // control
            this.typedNodes['control'].push({
                entityId: entity.id,
                "class": 'control',
                data: node,
                isActive: true
            });
        }
        if (entityComponents.collision && entityComponents.display) {
            var node = new collision_1["default"](entity.id, entityComponents.collision, entityComponents.display, entityComponents.velocity);
            // collision
            this.typedNodes['obstacleCollision'].push({
                entityId: entity.id,
                "class": 'collision',
                data: node,
                isActive: true
            });
        }
        if (entityComponents.position) {
            var node = new level_1["default"](entity.id, entityComponents.position);
            // level
            this.typedNodes['level'].push({
                entityId: entity.id,
                "class": 'level',
                data: node,
                isActive: true
            });
        }
        return entity;
    };
    Engine.prototype.addEntities = function (entities) {
        if (entities && entities.length) {
            entities.map(this.addEntity.bind(this));
        }
    };
    Engine.prototype.removeEntity = function (entity) {
        var entityId = entity.id;
        this.entities = this.entities.filter(function (entity) {
            return entity.id !== entityId;
        });
    };
    Engine.prototype.removeEntityById = function (entityId) {
        var entities = this.getEntitiesById(entityId);
        return entities.map(this.removeEntity.bind(this));
    };
    Engine.prototype.removeEntitiesById = function (ids) {
        return ids.map(this.removeEntityById.bind(this));
    };
    Engine.prototype.addSystem = function (system) {
        this.systems.push(system);
        system.init();
    };
    Engine.prototype.removeSystem = function (system) {
        system.stop();
        system = null;
        this.systems = this.systems.filter(function (system) {
            return !!system;
        });
    };
    Engine.prototype.getEntitiesById = function (entityId) {
        return this.entities.filter(function (entity) {
            return entity.id === entityId;
        });
    };
    Engine.prototype.update = function (before) {
        var _this = this;
        if (before === void 0) { before = 0; }
        this.isPaused = false;
        if (document.visibilityState !== 'visible') {
            this.isPaused = true;
        }
        var now = performance.now();
        var dt = (now - before) / 1000;
        dt = Math.min(dt, 0.1); // magic number to prevent massive dt when tab not active
        if (!this.isPaused) {
            var nodes = Object.keys(this.typedNodes).map(function (type) {
                return _this.typedNodes[type];
            });
            [].concat.apply([], nodes).filter(function (node) {
                return !node.isActive;
            }).map(function (node) {
                return node.entityId;
            }).filter(function (value, index, array) {
                return array.indexOf(value) === index;
            }).map(function (id) {
                return _this.getEntitiesById(id);
            }).map(function (entity) {
                return entity.destroy();
            });
            var results_1 = [];
            this.systems.map(function (system) {
                results_1.push(system.update(dt, _this.typedNodes[system["class"]] || []));
            });
            results_1 = results_1.filter(function (result) { return result; });
            var newEntities = results_1.map(function (result) {
                return result.newEntities;
            })[0];
            var deadEntities = results_1.map(function (result) {
                return result.deadEntities;
            });
            this.addEntities(newEntities);
        }
        before = now;
        requestAnimationFrame(this.update.bind(this, before));
    };
    return Engine;
}());
exports["default"] = Engine;


/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var AnimationSystem = (function () {
    function AnimationSystem(settings) {
        this["class"] = 'animation';
        this.settings = settings;
        this.timer = 0;
    }
    AnimationSystem.prototype.init = function () {
    };
    AnimationSystem.prototype.stop = function () {
    };
    AnimationSystem.prototype.setAnimation = function (node, prop) {
        node.data.animation.currentAnimationProp = prop;
    };
    AnimationSystem.prototype.updateFrame = function (node) {
        var animationData = node.data.animation;
        var displayData = node.data.display;
        var frames = animationData[animationData.currentAnimationProp];
        if (animationData.currentFrame + 1 >= frames.length) {
            animationData.currentFrame = 0;
        }
        else {
            animationData.currentFrame++;
        }
        displayData.sprite.texture.frame = displayData.sprite.data.texture[frames[animationData.currentFrame]];
    };
    AnimationSystem.prototype.update = function (dt, nodes) {
        var _this = this;
        nodes.map(function (node) {
            var velocityData = node.data.velocity;
            var animationData = node.data.animation;
            if (velocityData.velocityY > 0.01 || velocityData.velocityY < -0.01) {
                // play jump animation
                _this.setAnimation(node, 'jump');
            }
            else if (velocityData.velocityX > 0.1) {
                //play right animation
                _this.setAnimation(node, 'walkRight');
            }
            else if (velocityData.velocityX < -0.1) {
                //play left animation
                _this.setAnimation(node, 'walkLeft');
            }
            else {
                _this.setAnimation(node, 'default');
            }
            _this.timer = _this.timer + dt;
            if (_this.timer > 0.2) {
                _this.updateFrame(node);
                _this.timer = dt;
            }
            return node;
        });
    };
    return AnimationSystem;
}());
exports["default"] = AnimationSystem;


/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var ControlSystem = (function () {
    function ControlSystem(settings) {
        this["class"] = 'control';
        this.settings = settings;
    }
    ControlSystem.prototype.onKeyDown = function (e) {
        var key = e.keyCode;
        this.isJump = this.isJump || key === this.settings.KEY.SPACE;
        this.isLeft = this.isLeft || key === this.settings.KEY.LEFT;
        this.isUp = this.isUp || key === this.settings.KEY.UP;
        this.isRight = this.isRight || key === this.settings.KEY.RIGHT;
        this.isDown = this.isDown || key === this.settings.KEY.DOWN;
    };
    ControlSystem.prototype.onKeyUp = function (e) {
        var key = e.keyCode;
        this.isJump = key === this.settings.KEY.SPACE ? false : this.isJump;
        this.isLeft = key === this.settings.KEY.LEFT ? false : this.isLeft;
        this.isUp = key === this.settings.KEY.UP ? false : this.isUp;
        this.isRight = key === this.settings.KEY.RIGHT ? false : this.isRight;
        this.isDown = key === this.settings.KEY.DOWN ? false : this.isDown;
        if (key === this.settings.KEY.P) {
            // this.isPause = !this.isPause;
        }
    };
    ControlSystem.prototype.bind = function () {
        window.addEventListener('keydown', this.onKeyDown.bind(this), false);
        window.addEventListener('keyup', this.onKeyUp.bind(this), false);
    };
    ControlSystem.prototype.unbind = function () {
        window.removeEventListener('keydown', this.onKeyDown.bind(this), false);
        window.removeEventListener('keyup', this.onKeyUp.bind(this), false);
    };
    ControlSystem.prototype.init = function () {
        this.bind();
    };
    ControlSystem.prototype.stop = function () {
    };
    ControlSystem.prototype.update = function (time, nodes) {
        var _this = this;
        nodes.map(function (node) {
            var velocityData = node.data.velocity;
            if (_this.isUp && velocityData.isGrounded) {
                velocityData.accelerationY = -velocityData.maxAccelerationY;
            }
            else {
                velocityData.accelerationY = 1;
            }
            if (_this.isRight) {
                // console.log('right');
                velocityData.accelerationX = velocityData.maxAccelerationX;
            }
            else if (_this.isLeft) {
                // console.log('left');
                velocityData.accelerationX = -velocityData.maxAccelerationX;
            }
            else {
                velocityData.accelerationX = 0;
            }
        });
    };
    return ControlSystem;
}());
exports["default"] = ControlSystem;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var level_1 = __webpack_require__(25);
var LevelSystem = (function () {
    function LevelSystem(settings) {
        this["class"] = 'level';
        this.settings = settings;
        this.isLoaded = false;
        this.currentLevel;
        this.levels = [{
                data: PIXI.loader.resources.level1.data
            }];
    }
    LevelSystem.prototype.init = function () {
    };
    LevelSystem.prototype.stop = function () {
    };
    LevelSystem.prototype.loadLevel = function (levelNumber) {
        var levelData = this.levels[levelNumber].data;
        var level = new level_1["default"](this.settings, levelData);
        return level.createLevel().entities;
    };
    LevelSystem.prototype.getAllEntityIds = function (nodes) {
        var ids = nodes.map(function (node) {
            return node.entityId;
        });
        ids = Array.from(new Set(ids));
        return ids;
    };
    LevelSystem.prototype.loadNextLevel = function () {
        this.isLoaded = false;
        this.currentLevel++;
    };
    LevelSystem.prototype.update = function (time, nodes) {
        var _this = this;
        var result = {};
        this.currentLevel = this.currentLevel || 1;
        if (!this.isLoaded) {
            result.newEntities = this.loadLevel(this.currentLevel - 1);
            result.deadEntities = this.getAllEntityIds(nodes);
            this.isLoaded = true;
        }
        nodes.map(function (node) {
            // console.log(node);
            var finishX = _this.levels[_this.currentLevel - 1].data.properties.finishX;
            var finishY = _this.levels[_this.currentLevel - 1].data.properties.finishY;
            var x = node.data.position.x / _this.settings.TILE;
            var y = node.data.position.y / _this.settings.TILE;
            // console.log(x + ' ' + y);
            if (finishX === x && finishY === y) {
                console.log('FINISH');
                // this.loadNextLevel();
            }
        });
        // console.log(this.levels[this.currentLevel]);
        // console.log(this.levels[this.currentLevel - 1].data.properties.finishX);
        return result;
    };
    return LevelSystem;
}());
exports["default"] = LevelSystem;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var MoveSystem = (function () {
    function MoveSystem(settings) {
        this["class"] = 'move';
        this.settings = settings;
    }
    MoveSystem.prototype.init = function () { };
    MoveSystem.prototype.stop = function () { };
    MoveSystem.prototype.getVelocityX = function (time, friction, velocity, acceleration, isGrounded) {
        // limit horizontal movement in the air
        acceleration = isGrounded ? acceleration : acceleration / 3;
        return (velocity + time * acceleration) * friction;
    };
    MoveSystem.prototype.getPositionX = function (time, tile, position, velocity) {
        position = position + (velocity + time * velocity) * tile;
        // stop movement at map boundaries - shift this to collision system
        position = Math.max(0, position);
        position = Math.min(position, this.settings.MAP[0] * tile - tile);
        return position;
    };
    MoveSystem.prototype.getVelocityY = function (time, velocity, acceleration, isGrounded) {
        // prevent any more downwards vertical movement
        velocity = isGrounded ? Math.max(0, velocity) : velocity + time * acceleration;
        // cap the velocity - anything more than 0.7 and the entity might fall
        // though the tile before collision is detected
        return Math.min(velocity, 0.5);
    };
    MoveSystem.prototype.getPositionY = function (time, tile, position, velocity, isGrounded) {
        position = position + velocity * tile;
        if (isGrounded) {
            // round up to tile edge
            position = Math.floor(position / tile) * tile;
        }
        return Math.max(0, position);
    };
    MoveSystem.prototype.update = function (time, nodes) {
        var _this = this;
        nodes.map(function (node) {
            var velocityData = node.data.velocity;
            var positionData = node.data.position;
            var collisionData = node.data.collision;
            var isGrounded = collisionData.isBottomObstacleCollision;
            var tile = _this.settings.TILE;
            var friction = _this.settings.FRICTION;
            velocityData.velocityX = _this.getVelocityX(time, friction, velocityData.velocityX, velocityData.accelerationX, isGrounded);
            positionData.x = _this.getPositionX(time, tile, positionData.x, velocityData.velocityX);
            velocityData.velocityY = _this.getVelocityY(time, velocityData.velocityY, velocityData.accelerationY, isGrounded);
            positionData.y = _this.getPositionY(time, tile, positionData.y, velocityData.velocityY, isGrounded);
            if (positionData.y > _this.settings.MAP[0] * tile) {
                console.log('OFF MAP');
                node.isActive = false;
            }
        });
    };
    return MoveSystem;
}());
exports["default"] = MoveSystem;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var RenderSystem = (function () {
    function RenderSystem(settings) {
        this["class"] = 'render';
        this.sprites = {};
        this.settings = settings;
    }
    RenderSystem.prototype.init = function () {
        this.stage = new PIXI.Application().stage;
        this.container = new PIXI.Container();
        this.stage.addChild(this.container);
        this.renderer = PIXI.autoDetectRenderer(640, 480);
        this.stage.position.x = this.renderer.width / 2; // 320
        this.stage.position.y = this.renderer.height / 2; // 240
        document.body.appendChild(this.renderer.view);
    };
    RenderSystem.prototype.stop = function () {
    };
    RenderSystem.prototype.getPivotY = function (focusY) {
        var pivotY = focusY;
        var mapHeight = this.settings.MAP[1] * this.settings.TILE;
        var screenHeight = this.renderer.height;
        pivotY = focusY < mapHeight / 2 ? screenHeight / 2 : focusY;
        pivotY = focusY + screenHeight / 2 > mapHeight ? mapHeight - screenHeight / 2 : pivotY;
        return pivotY;
    };
    RenderSystem.prototype.getPivotX = function (focusX) {
        var pivotX = focusX;
        var mapWidth = this.settings.MAP[0] * this.settings.TILE;
        var screenWidth = this.renderer.width;
        pivotX = focusX < screenWidth / 2 ? screenWidth / 2 : focusX;
        pivotX = focusX + screenWidth / 2 > mapWidth ? mapWidth - screenWidth / 2 : pivotX;
        return pivotX;
    };
    RenderSystem.prototype.addNewSprites = function (id, sprite) {
        this.sprites[id] = sprite;
        this.container.addChild(sprite);
    };
    RenderSystem.prototype.clearDeadSprites = function () {
        for (var _i = 0, _a = Object.keys(this.sprites); _i < _a.length; _i++) {
            var id = _a[_i];
            if (!this.sprites[id]) {
                delete this.sprites[id];
            }
        }
    };
    RenderSystem.prototype.update = function (time, nodes) {
        var _this = this;
        nodes.map(function (node) {
            var displayData = node.data.display;
            var positionData = node.data.position;
            !_this.sprites[node.entityId] && _this.addNewSprites(node.entityId, displayData.sprite);
            displayData.sprite.position.x = positionData.x;
            displayData.sprite.position.y = positionData.y;
            if (displayData.isFocus) {
                _this.stage.pivot.x = _this.getPivotX(displayData.sprite.x);
                _this.stage.pivot.y = _this.getPivotY(displayData.sprite.y);
                var mapWidth = _this.settings.MAP[0] * _this.settings.TILE;
                // test against map width * tilesize
                if (displayData.sprite.x < 0 ||
                    displayData.sprite.x + displayData.sprite.width > mapWidth) {
                    console.log('EXIT');
                }
            }
        });
        this.clearDeadSprites();
        this.renderer.render(this.stage);
    };
    return RenderSystem;
}());
exports["default"] = RenderSystem;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var AnimationComponent = (function () {
    function AnimationComponent() {
        this["class"] = 'animation';
        this["default"] = [0];
        this.walkRight = [1, 2];
        this.walkLeft = [2, 1];
        this.jump = [3];
        this.currentAnimationProp = 'default';
        this.currentFrame = 0;
    }
    return AnimationComponent;
}());
exports["default"] = AnimationComponent;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var InputComponent = (function () {
    function InputComponent() {
        this["class"] = 'input';
    }
    return InputComponent;
}());
exports["default"] = InputComponent;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var VelocityComponent = (function () {
    function VelocityComponent() {
        this["class"] = 'velocity';
        this.accelerationX = 0;
        this.accelerationY = 0;
        this.maxAccelerationX = 3;
        this.maxAccelerationY = 20;
        this.velocityX = 0;
        this.velocityY = 0;
        this.isGrounded = false;
    }
    return VelocityComponent;
}());
exports["default"] = VelocityComponent;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/// <reference path="../dts/pixi.js.d.ts" />

exports.__esModule = true;
var settings_1 = __webpack_require__(6);
var engine_1 = __webpack_require__(5);
var animation_1 = __webpack_require__(7);
var obstacleCollision_1 = __webpack_require__(28);
var control_1 = __webpack_require__(9);
var level_1 = __webpack_require__(10);
var move_1 = __webpack_require__(11);
var render_1 = __webpack_require__(12);
var Main = (function () {
    function Main() {
        PIXI.loader.add('player', '/static/img/player.png');
        PIXI.loader.add('bg', '/static/img/bg.png');
        PIXI.loader.add('level1', '/assets/json/levelone.json');
        PIXI.loader.load(this._onLoad.bind(this));
    }
    Main.prototype._onLoad = function () {
        this._settings = new settings_1["default"]();
        this._engine = new engine_1["default"]();
        this._engine.addSystem(new animation_1["default"](this._settings));
        this._engine.addSystem(new move_1["default"](this._settings));
        this._engine.addSystem(new render_1["default"](this._settings));
        this._engine.addSystem(new control_1["default"](this._settings));
        this._engine.addSystem(new obstacleCollision_1["default"](this._settings));
        this._engine.addSystem(new level_1["default"](this._settings));
        this._engine.init();
    };
    return Main;
}());
exports["default"] = Main;
var tbgscratch = new Main();


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var AnimationNode = (function () {
    function AnimationNode(entityId, animationComponent, displayComponent, velocityComponent) {
        this.entityId = entityId;
        this.animation = animationComponent;
        this.display = displayComponent;
        this.velocity = velocityComponent;
        this.isActive = true;
    }
    return AnimationNode;
}());
exports["default"] = AnimationNode;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var CollisionNode = (function () {
    function CollisionNode(entityId, collisionComponent, displayComponent, velocityComponent) {
        this.entityId = entityId;
        this.collision = collisionComponent;
        this.display = displayComponent;
        this.velocity = velocityComponent;
        this.isActive = true;
    }
    return CollisionNode;
}());
exports["default"] = CollisionNode;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var ControlNode = (function () {
    function ControlNode(entityId, inputComponent, velocityComponent) {
        this.entityId = entityId;
        this.input = inputComponent;
        this.velocity = velocityComponent;
        this.isActive = true;
    }
    return ControlNode;
}());
exports["default"] = ControlNode;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var LevelNode = (function () {
    function LevelNode(entityId, positionComponent) {
        this.entityId = entityId;
        this.position = positionComponent;
        this.isActive = true;
    }
    return LevelNode;
}());
exports["default"] = LevelNode;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var MoveNode = (function () {
    function MoveNode(entityId, positionComponent, velocityComponent, collisionComponent) {
        this.entityId = entityId;
        this.position = positionComponent;
        this.velocity = velocityComponent;
        this.collision = collisionComponent;
        this.isActive = true;
    }
    return MoveNode;
}());
exports["default"] = MoveNode;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var RenderNode = (function () {
    function RenderNode(entityId, displayComponent, positionComponent) {
        this.entityId = entityId;
        this.display = displayComponent;
        this.position = positionComponent;
        this.isActive = true;
    }
    return RenderNode;
}());
exports["default"] = RenderNode;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var entity_1 = __webpack_require__(2);
var display_1 = __webpack_require__(0);
var position_1 = __webpack_require__(1);
var sprite_1 = __webpack_require__(3);
var settings_1 = __webpack_require__(6);
var backgroundPrefab = (function (_super) {
    __extends(backgroundPrefab, _super);
    function backgroundPrefab(type, x, y) {
        var _this = _super.call(this) || this;
        var settings = new settings_1["default"]();
        var tile = settings.TILE;
        var spriteX = Math.max(type * 16 - 16, 0);
        var spriteY = 0;
        var texture = new PIXI.Texture(PIXI.utils.TextureCache['bg'], new PIXI.Rectangle(spriteX, spriteY, 14, tile));
        var sprite = new sprite_1["default"](texture);
        sprite.height = tile;
        sprite.width = tile;
        var display = new display_1["default"](sprite);
        _this.addComponent(display);
        var positionComponent = new position_1["default"]();
        positionComponent.x = x;
        positionComponent.y = y;
        _this.addComponent(positionComponent);
        return _this;
    }
    return backgroundPrefab;
}(entity_1["default"]));
exports["default"] = backgroundPrefab;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var entity_1 = __webpack_require__(2);
var display_1 = __webpack_require__(0);
var position_1 = __webpack_require__(1);
var collision_1 = __webpack_require__(4);
var sprite_1 = __webpack_require__(3);
var settings_1 = __webpack_require__(6);
var GroundPrefab = (function (_super) {
    __extends(GroundPrefab, _super);
    function GroundPrefab(type, x, y) {
        var _this = _super.call(this) || this;
        var settings = new settings_1["default"]();
        var tile = settings.TILE;
        var display = _this._getDisplayComponent(type, tile, tile);
        _this.addComponent(display);
        var positionComponent = _this._getPositionComponent(x, y);
        _this.addComponent(positionComponent);
        var collision = _this._getCollisionComponent();
        _this.addComponent(collision);
        return _this;
    }
    GroundPrefab.prototype._getCollisionComponent = function () {
        var collision = new collision_1["default"]();
        collision.type = 'secondary';
        return collision;
    };
    GroundPrefab.prototype._getPositionComponent = function (x, y) {
        var positionComponent = new position_1["default"]();
        positionComponent.x = x;
        positionComponent.y = y;
        return positionComponent;
    };
    GroundPrefab.prototype._getDisplayComponent = function (type, height, width) {
        var spriteX = Math.max(type * 16 - 16, 0);
        var spriteY = 0;
        var texture = new PIXI.Texture(PIXI.utils.TextureCache['bg'], new PIXI.Rectangle(spriteX, spriteY, 14, height));
        var sprite = new sprite_1["default"](texture);
        sprite.height = height;
        sprite.width = width;
        return new display_1["default"](sprite);
    };
    return GroundPrefab;
}(entity_1["default"]));
exports["default"] = GroundPrefab;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var player_1 = __webpack_require__(26);
var sky_1 = __webpack_require__(27);
var ground_1 = __webpack_require__(24);
var background_1 = __webpack_require__(23);
var LevelPrefab = (function () {
    function LevelPrefab(settings, data) {
        this.settings = settings;
        this.data = data;
    }
    LevelPrefab.prototype.getGroundLayerEntities = function (data) {
        var entities = [];
        var mapData = data.layers[0].data;
        for (var i = 0, j = data.height; i < j; i++) {
            for (var k = 0, l = data.width; k < l; k++) {
                var val = mapData[i * data.width + k];
                if (val === 1) {
                    var ground = new ground_1["default"](0, k * data.tilewidth, i * data.tilewidth);
                    entities.push(ground);
                }
            }
        }
        return entities;
    };
    LevelPrefab.prototype.getPosition = function (levelWidth, tileSize) {
        return function (mapIndex) {
            var x = (mapIndex % levelWidth) * tileSize;
            var y = (Math.floor(mapIndex / levelWidth)) * tileSize;
            return [x, y];
        };
    };
    LevelPrefab.prototype.getEnitiesByData = function (data) {
        var entities = [];
        // need to handle more than one layer
        var mapData = data.layers[1].data;
        var getPositionByIndex = this.getPosition(data.width, data.tilewidth);
        mapData.map(function (type, index) {
            if (type !== 0) {
                var entity = void 0;
                var position = getPositionByIndex(index);
                switch (type) {
                    case 1:
                        entity = new ground_1["default"](type, position[0], position[1]);
                        break;
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        entity = new background_1["default"](type, position[0], position[1]);
                        break;
                }
                entities.push(entity);
            }
        });
        return entities;
    };
    LevelPrefab.prototype.createLevel = function () {
        var data = this.data;
        data.entities = [];
        var sky = new sky_1["default"](data.width, data.height, data.tileheight);
        var groundEntities = this.getGroundLayerEntities(data);
        var entities = this.getEnitiesByData(data);
        var player = new player_1["default"](this.settings, [data.properties.startX, data.properties.startY]);
        (_a = data.entities).push.apply(_a, [sky].concat(groundEntities, entities, [player]));
        return data;
        var _a;
    };
    return LevelPrefab;
}());
exports["default"] = LevelPrefab;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var entity_1 = __webpack_require__(2);
var sprite_1 = __webpack_require__(3);
var display_1 = __webpack_require__(0);
var position_1 = __webpack_require__(1);
var velocity_1 = __webpack_require__(15);
var input_1 = __webpack_require__(14);
var collision_1 = __webpack_require__(4);
var animation_1 = __webpack_require__(13);
var PlayerPrefab = (function () {
    function PlayerPrefab(settings, start) {
        var texture = PIXI.utils.TextureCache['/static/img/player.png'];
        var sprite = new sprite_1["default"](texture);
        sprite.data.texture.push(new PIXI.Rectangle(0, 0, 16, 32));
        sprite.data.texture.push(new PIXI.Rectangle(16, 0, 16, 32));
        sprite.data.texture.push(new PIXI.Rectangle(32, 0, 16, 32));
        sprite.data.texture.push(new PIXI.Rectangle(48, 0, 16, 32));
        texture.frame = sprite.data.texture[1];
        var player = new entity_1["default"]();
        var animation = new animation_1["default"]();
        animation.walkRight = [1, 2];
        animation.walkLeft = [2, 1];
        animation.jump = [3];
        animation["default"] = [0];
        var collision = new collision_1["default"]();
        collision.type = 'primary';
        var display = new display_1["default"](sprite);
        display.isFocus = true;
        var positionComponent = new position_1["default"]();
        positionComponent.isPlayer = true;
        positionComponent.x = start[0] * settings.TILE;
        positionComponent.y = start[1] * settings.TILE;
        var velocityComponent = new velocity_1["default"]();
        velocityComponent.accelerationY = settings.GRAVITY;
        var inputComponent = new input_1["default"]();
        player.addComponents(inputComponent, velocityComponent, positionComponent, display, collision, animation);
        return player;
    }
    return PlayerPrefab;
}());
exports["default"] = PlayerPrefab;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var entity_1 = __webpack_require__(2);
var display_1 = __webpack_require__(0);
var position_1 = __webpack_require__(1);
var sprite_1 = __webpack_require__(3);
var SkyPrefab = (function () {
    function SkyPrefab(width, height, tile) {
        var sky = new entity_1["default"]();
        var texture = new PIXI.Texture(PIXI.utils.TextureCache['bg'], new PIXI.Rectangle(33, 0, 14, tile));
        var sprite = new sprite_1["default"](texture);
        sprite.height = height * tile;
        sprite.width = width * tile;
        var display = new display_1["default"](sprite);
        sky.addComponent(display);
        var position = new position_1["default"]();
        position.x = 0;
        position.y = 0;
        sky.addComponent(position);
        return sky;
    }
    return SkyPrefab;
}());
exports["default"] = SkyPrefab;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var ObstacleCollisionSystem = (function () {
    function ObstacleCollisionSystem(settings) {
        this["class"] = 'obstacleCollision';
        this.settings = settings;
    }
    ObstacleCollisionSystem.prototype.init = function () {
    };
    ObstacleCollisionSystem.prototype.stop = function () {
    };
    ObstacleCollisionSystem.prototype.isCollision = function (sprite1, sprite2) {
        var isCollision = false;
        if (sprite1.x < sprite2.x + sprite2.width &&
            sprite1.x + sprite1.width > sprite2.x &&
            sprite1.y < sprite2.y + sprite2.height &&
            sprite1.height + sprite1.y > sprite2.y) {
            isCollision = true;
        }
        return isCollision;
    };
    ObstacleCollisionSystem.prototype.update = function (time, nodes) {
        var _this = this;
        var primaries = nodes.filter(function (node) {
            return node.data.collision.type === 'primary';
        });
        var secondaries = nodes.filter(function (node) {
            return node.data.collision.type !== 'primary';
        });
        primaries.map(function (primary) {
            primary.data.velocity.isGrounded = false;
            primary.data.collision.isBottomObstacleCollision = false;
            secondaries.map(function (secondary) {
                var sprite1 = primary.data.display.sprite;
                var sprite2 = secondary.data.display.sprite;
                if (_this.isCollision(sprite1, sprite2)) {
                    var velocityData = primary.data.velocity;
                    var collisionData = primary.data.collision;
                    var errorMargin = _this.settings.TILE / 2;
                    var isBottomCollision = sprite1.y + sprite1.height > sprite2.y &&
                        sprite1.height + sprite1.y < sprite2.y + errorMargin;
                    var isTopCollision = sprite2.y + sprite2.height > sprite1.y &&
                        sprite2.height + sprite2.y < sprite1.y + errorMargin;
                    var isRightCollision = sprite1.x + sprite1.width > sprite2.x &&
                        sprite1.x + sprite1.width < sprite2.x + errorMargin;
                    var isLeftCollision = sprite2.x + sprite2.width > sprite1.x &&
                        sprite2.x + sprite2.width < sprite1.x + errorMargin;
                    collisionData.isTopObstacleCollision = isTopCollision;
                    collisionData.isBottomObstacleCollision = isBottomCollision;
                    collisionData.isLeftObstacleCollision = isLeftCollision;
                    collisionData.isRightObstacleCollision = isRightCollision;
                    // SHIFT ALL THIS INTO MOVE SYSTEM
                    // check collision
                    if (isBottomCollision) {
                        // velocityData.accelerationY = Math.min(0, velocityData.accelerationY);
                        velocityData.velocityY = Math.min(0, velocityData.velocityY);
                        velocityData.isGrounded = true;
                    }
                    else if (isTopCollision) {
                        // velocityData.accelerationY = Math.max(0, velocityData.accelerationY);
                        velocityData.velocityY = Math.max(0, velocityData.velocityY);
                    }
                    else if (isRightCollision) {
                        velocityData.accelerationX = Math.min(0, velocityData.accelerationX);
                        velocityData.velocityX = Math.min(0, velocityData.velocityX);
                    }
                    else if (isLeftCollision) {
                        velocityData.accelerationX = Math.max(0, velocityData.accelerationX);
                        velocityData.velocityX = Math.max(0, velocityData.velocityX);
                    }
                    primary.data.collision.collide(secondary);
                }
            });
        });
    };
    return ObstacleCollisionSystem;
}());
exports["default"] = ObstacleCollisionSystem;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map