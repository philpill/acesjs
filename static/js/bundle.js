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
        this.typedNodes = {};
        this.isPaused = false;
    }
    Engine.prototype.init = function () {
        this.update();
    };
    Engine.prototype.addEntity = function (entity) {
        this.entities.push(entity);
        if (entity.components.display && entity.components.position) {
            // render
            this.typedNodes['render'] = this.typedNodes['render'] || [];
            this.typedNodes['render'].push({ entityId: entity.id, "class": 'render', data: new render_1["default"](entity.id, entity.components.display, entity.components.position), isActive: true });
        }
        if (entity.components.animation && entity.components.display && entity.components.velocity) {
            this.typedNodes['animation'] = this.typedNodes['animation'] || [];
            // animation
            this.typedNodes['animation'].push({
                entityId: entity.id,
                "class": 'animation',
                data: new animation_1["default"](entity.id, entity.components.animation, entity.components.display, entity.components.velocity),
                isActive: true
            });
        }
        if (entity.components.velocity && entity.components.position) {
            this.typedNodes['move'] = this.typedNodes['move'] || [];
            // move
            this.typedNodes['move'].push({ entityId: entity.id, "class": 'move', data: new move_1["default"](entity.id, entity.components.position, entity.components.velocity), isActive: true });
        }
        if (entity.components.velocity && entity.components.input) {
            this.typedNodes['control'] = this.typedNodes['control'] || [];
            // control
            this.typedNodes['control'].push({ entityId: entity.id, "class": 'control', data: new control_1["default"](entity.id, entity.components.control, entity.components.velocity), isActive: true });
        }
        if (entity.components.collision) {
            this.typedNodes['collision'] = this.typedNodes['collision'] || [];
            // collision
            this.typedNodes['collision'].push({ entityId: entity.id, "class": 'collision', data: new collision_1["default"](entity.id, entity.components.collision, entity.components.display, entity.components.velocity), isActive: true });
        }
        if (entity.components.position) {
            this.typedNodes['level'] = this.typedNodes['level'] || [];
            // level
            this.typedNodes['level'].push({ entityId: entity.id, "class": 'level', data: new level_1["default"](entity.id, entity.components.position), isActive: true });
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var CollisionSystem = (function () {
    function CollisionSystem(settings) {
        this["class"] = 'collision';
        this.settings = settings;
    }
    CollisionSystem.prototype.init = function () {
    };
    CollisionSystem.prototype.stop = function () {
    };
    CollisionSystem.prototype.isCollision = function (sprite1, sprite2) {
        var isCollision = false;
        if (sprite1.x < sprite2.x + sprite2.width &&
            sprite1.x + sprite1.width > sprite2.x &&
            sprite1.y < sprite2.y + sprite2.height &&
            sprite1.height + sprite1.y > sprite2.y) {
            isCollision = true;
        }
        return isCollision;
    };
    CollisionSystem.prototype.update = function (time, nodes) {
        var _this = this;
        var primaries = nodes.filter(function (node) {
            return node.data.collision.type === 'primary';
        });
        var secondaries = nodes.filter(function (node) {
            return node.data.collision.type !== 'primary';
        });
        primaries.map(function (primary) {
            primary.data.velocity.isGrounded = false;
            secondaries.map(function (secondary) {
                var sprite1 = primary.data.display.sprite;
                var sprite2 = secondary.data.display.sprite;
                if (_this.isCollision(sprite1, sprite2)) {
                    var velocityData = primary.data.velocity;
                    var errorMargin = _this.settings.TILE / 2;
                    var isBottomCollision = sprite1.y + sprite1.height > sprite2.y &&
                        sprite1.height + sprite1.y < sprite2.y + errorMargin;
                    var isTopCollision = sprite2.y + sprite2.height > sprite1.y &&
                        sprite2.height + sprite2.y < sprite1.y + errorMargin;
                    var isRightCollision = sprite1.x + sprite1.width > sprite2.x &&
                        sprite1.x + sprite1.width < sprite2.x + errorMargin;
                    var isLeftCollision = sprite2.x + sprite2.width > sprite1.x &&
                        sprite2.x + sprite2.width < sprite1.x + errorMargin;
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
    return CollisionSystem;
}());
exports["default"] = CollisionSystem;


/***/ }),
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
                console.log('JUMP');
                velocityData.accelerationY = -velocityData.maxAccelerationY;
                velocityData.velocityY = -0.3;
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
    MoveSystem.prototype.init = function () {
    };
    MoveSystem.prototype.stop = function () {
    };
    MoveSystem.prototype.update = function (time, nodes) {
        var _this = this;
        nodes.map(function (node) {
            var velocityData = node.data.velocity;
            var positionData = node.data.position;
            if (!velocityData.isGrounded) {
                // limit horizontal movement in the air
                velocityData.accelerationX = velocityData.accelerationX / 3;
            }
            velocityData.velocityX = (velocityData.velocityX + time * velocityData.accelerationX) * _this.settings.FRICTION;
            if (velocityData.isGrounded) {
                // prevent any more downwards vertical movement
                velocityData.velocityY = Math.max(0, velocityData.velocityY);
                // round up to tile edge
                positionData.y = Math.floor(positionData.y / _this.settings.TILE) * _this.settings.TILE;
            }
            else {
                velocityData.velocityY = (velocityData.velocityY + time * velocityData.accelerationY);
            }
            positionData.x += (velocityData.velocityX + time * velocityData.velocityX) * _this.settings.TILE;
            // stop movement at map boundaries - shift this to collision system
            positionData.x = Math.max(0, positionData.x);
            positionData.x = Math.min(positionData.x, _this.settings.MAP[0] * _this.settings.TILE - _this.settings.TILE);
            // cap the velocity - anything more than 0.7 and the entity might fall
            // though the tile before collision is detected
            var velocityY = Math.min(velocityData.velocityY + time * velocityData.velocityY, 0.5);
            positionData.y += velocityY * _this.settings.TILE;
            positionData.y = Math.max(0, positionData.y);
            if (positionData.y > _this.settings.MAP[0] * _this.settings.TILE) {
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
        this.stage = {};
        this.container = {};
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
    RenderSystem.prototype.update = function (time, nodes) {
        // console.log('render update');
        for (var i = 0, j = nodes.length; i < j; i++) {
            var id = nodes[i].entityId;
            var displayData = nodes[i].data.display;
            var positionData = nodes[i].data.position;
            if (!this.sprites.hasOwnProperty(id)) {
                var sprite = displayData.sprite;
                this.sprites[id] = sprite;
                this.container.addChild(sprite);
            }
            // console.log(nodes[i].position);
            // console.log(nodes[i].display);
            displayData.sprite.position.x = positionData.x;
            displayData.sprite.position.y = positionData.y;
            if (displayData.isFocus) {
                var x = displayData.sprite.x;
                var width = displayData.sprite.width;
                var y = displayData.sprite.y;
                var height = displayData.sprite.height;
                var mapWidth = this.settings.MAP[0] * this.settings.TILE;
                var mapHeight = this.settings.MAP[1] * this.settings.TILE;
                var screenWidth = this.renderer.width;
                var screenHeight = this.renderer.height;
                // console.log('mapWidth ', mapWidth);
                // console.log('screenWidth ', screenWidth);
                var pivotX = x < screenWidth / 2 ? screenWidth / 2 : x;
                pivotX = x + screenWidth / 2 > mapWidth ? mapWidth - screenWidth / 2 : pivotX;
                this.stage.pivot.x = pivotX;
                // console.log(pivotX);
                var pivotY = y < mapHeight / 2 ? screenHeight / 2 : y;
                pivotY = y + screenHeight / 2 > mapHeight ? mapHeight - screenHeight / 2 : pivotY;
                this.stage.pivot.y = pivotY;
                // test against map width * tilesize
                if (displayData.sprite.x < 0 ||
                    displayData.sprite.x + displayData.sprite.width > mapWidth) {
                    console.log('EXIT');
                }
                // console.log('x', this.stage.pivot.x);
                // console.log('y', this.stage.pivot.y);
            }
        }
        for (var _i = 0, _a = Object.keys(this.sprites); _i < _a.length; _i++) {
            var id = _a[_i];
            if (!this.sprites[id]) {
                delete this.sprites[id];
            }
        }
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
        this.maxAccelerationY = 4;
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
var collision_1 = __webpack_require__(8);
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
        this._engine.addSystem(new collision_1["default"](this._settings));
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
    function MoveNode(entityId, positionComponent, velocityComponent) {
        this.entityId = entityId;
        this.position = positionComponent;
        this.velocity = velocityComponent;
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
var backgroundPrefab = (function (_super) {
    __extends(backgroundPrefab, _super);
    function backgroundPrefab(type, x, y, tile) {
        var _this = _super.call(this) || this;
        var spriteXMappings = [0, 0, 0, 0, 48, 64, 80, 96];
        var spriteYMappings = [0, 0, 0, 0, 0, 0, 0, 0];
        var spriteX = spriteXMappings[type];
        var spriteY = spriteYMappings[type];
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
var GroundPrefab = (function (_super) {
    __extends(GroundPrefab, _super);
    function GroundPrefab(x, y, tile) {
        var _this = _super.call(this) || this;
        var texture = new PIXI.Texture(PIXI.utils.TextureCache['bg'], new PIXI.Rectangle(0, 0, 14, tile));
        var sprite = new sprite_1["default"](texture);
        sprite.height = tile;
        sprite.width = tile;
        var display = new display_1["default"](sprite);
        _this.addComponent(display);
        var positionComponent = new position_1["default"]();
        positionComponent.x = x;
        positionComponent.y = y;
        _this.addComponent(positionComponent);
        var collision = new collision_1["default"]();
        collision.type = 'secondary';
        _this.addComponent(collision);
        return _this;
    }
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
                    var ground = new ground_1["default"](k * data.tilewidth, i * data.tilewidth, data.tileheight);
                    entities.push(ground);
                }
            }
        }
        return entities;
    };
    LevelPrefab.prototype.getIndexedTypes = function (mapData, types) {
        var indexedTypes = {};
        // { 1: [1, 2, 3], 2: [4, 5, 6] }
        types.map(function (type) {
            indexedTypes[type] = mapData.reduce(function (a, e, i) {
                if (e === type) {
                    a.push(i);
                }
                return a;
            }, []);
        });
        return indexedTypes;
    };
    LevelPrefab.prototype.getEntities = function (data, indexedTypes) {
        var _this = this;
        var entities = [];
        var types = Object.keys(indexedTypes).map(Number);
        var _loop_1 = function (type) {
            var indexes = indexedTypes[type];
            indexes.map(function (index) {
                var entity = _this.getBackgroundEntity(type, data.width, data.tilewidth, index);
                entities.push(entity);
            });
        };
        for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
            var type = types_1[_i];
            _loop_1(type);
        }
        return entities;
    };
    LevelPrefab.prototype.getBackgroundEntity = function (entityType, levelWidth, tileSize, mapIndex) {
        var x = mapIndex % levelWidth;
        var y = Math.floor(mapIndex / levelWidth);
        var entity = new background_1["default"](entityType, x * tileSize, y * tileSize, tileSize);
        return entity;
    };
    LevelPrefab.prototype.getBackgroundLayerEntities = function (data) {
        var mapData = data.layers[1].data;
        var bgTypes = [4, 5, 6, 7];
        var indexedTypes = this.getIndexedTypes(mapData, bgTypes);
        var entities = this.getEntities(data, indexedTypes);
        return entities;
    };
    LevelPrefab.prototype.createLevel = function () {
        var data = this.data;
        data.entities = [];
        var sky = new sky_1["default"](data.width, data.height, data.tileheight);
        var groundEntities = this.getGroundLayerEntities(data);
        var bgEntities = this.getBackgroundLayerEntities(data);
        var player = new player_1["default"](this.settings, [data.properties.startX, data.properties.startY]);
        (_a = data.entities).push.apply(_a, [sky].concat(groundEntities, bgEntities, [player]));
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map