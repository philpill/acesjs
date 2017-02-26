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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _game = __webpack_require__(1);
	
	var _game2 = _interopRequireDefault(_game);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var game = new _game2.default();
	game.init();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _engine = __webpack_require__(2);
	
	var _engine2 = _interopRequireDefault(_engine);
	
	var _move = __webpack_require__(8);
	
	var _move2 = _interopRequireDefault(_move);
	
	var _render = __webpack_require__(9);
	
	var _render2 = _interopRequireDefault(_render);
	
	var _control = __webpack_require__(10);
	
	var _control2 = _interopRequireDefault(_control);
	
	var _collision = __webpack_require__(11);
	
	var _collision2 = _interopRequireDefault(_collision);
	
	var _animation = __webpack_require__(12);
	
	var _animation2 = _interopRequireDefault(_animation);
	
	var _level = __webpack_require__(13);
	
	var _level2 = _interopRequireDefault(_level);
	
	var _settings = __webpack_require__(14);
	
	var _settings2 = _interopRequireDefault(_settings);
	
	var _map = __webpack_require__(15);
	
	var _map2 = _interopRequireDefault(_map);
	
	var _player = __webpack_require__(16);
	
	var _player2 = _interopRequireDefault(_player);
	
	var _sky = __webpack_require__(24);
	
	var _sky2 = _interopRequireDefault(_sky);
	
	var _ground = __webpack_require__(25);
	
	var _ground2 = _interopRequireDefault(_ground);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = function () {
	    function Game() {
	        _classCallCheck(this, Game);
	
	        this.engine = {};
	    }
	
	    _createClass(Game, [{
	        key: 'init',
	        value: function init() {
	
	            PIXI.loader.add('player', '/static/img/player.png');
	
	            PIXI.loader.add('blue', '/static/img/blue.png');
	
	            PIXI.loader.add('bg', '/static/img/bg.png');
	
	            PIXI.loader.load(this.onLoad.bind(this));
	        }
	    }, {
	        key: 'onLoad',
	        value: function onLoad() {
	            var _this = this;
	
	            this.settings = new _settings2.default();
	
	            this.engine = new _engine2.default();
	
	            this.engine.addSystem(new _animation2.default(this.settings));
	
	            this.engine.addSystem(new _move2.default(this.settings));
	
	            this.engine.addSystem(new _render2.default(this.settings));
	
	            this.engine.addSystem(new _control2.default(this.settings));
	
	            this.engine.addSystem(new _collision2.default(this.settings));
	
	            this.engine.addSystem(new _level2.default(this.settings));
	
	            this.getLevelData().then(this.createLevel.bind(this)).then(function (level) {
	                var player = new _player2.default(_this.settings, level.start);
	                _this.engine.addEntity(player);
	                _this.engine.init();
	            });
	        }
	    }, {
	        key: 'getLevelData',
	        value: function getLevelData() {
	
	            var map = new _map2.default();
	
	            return map.level;
	        }
	    }, {
	        key: 'createLevel',
	        value: function createLevel(level) {
	
	            var data = level.data;
	
	            var mapData = level.data.layers[0].data;
	
	            var sky = new _sky2.default(data.width, data.height, data.tileheight);
	
	            this.engine.addEntity(sky);
	
	            for (var i = 0, j = data.height; i < j; i++) {
	
	                for (var k = 0, l = data.width; k < l; k++) {
	
	                    var val = mapData[i * data.width + k];
	
	                    if (val === 1) {
	
	                        var ground = new _ground2.default(k * data.tilewidth, i * data.tilewidth, data.tileheight);
	
	                        this.engine.addEntity(ground);
	                    }
	                }
	            }
	
	            return level;
	        }
	    }]);
	
	    return Game;
	}();
	
	exports.default = Game;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _move = __webpack_require__(3);
	
	var _move2 = _interopRequireDefault(_move);
	
	var _render = __webpack_require__(4);
	
	var _render2 = _interopRequireDefault(_render);
	
	var _control = __webpack_require__(5);
	
	var _control2 = _interopRequireDefault(_control);
	
	var _collision = __webpack_require__(6);
	
	var _collision2 = _interopRequireDefault(_collision);
	
	var _animation = __webpack_require__(7);
	
	var _animation2 = _interopRequireDefault(_animation);
	
	var _level = __webpack_require__(26);
	
	var _level2 = _interopRequireDefault(_level);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Engine = function () {
	    function Engine() {
	        _classCallCheck(this, Engine);
	
	        this.entities = [];
	        this.systems = [];
	        this.nodes = [];
	        this.isPaused = false;
	    }
	
	    _createClass(Engine, [{
	        key: 'init',
	        value: function init() {
	
	            this.update();
	        }
	    }, {
	        key: 'addEntity',
	        value: function addEntity(entity) {
	
	            this.entities.push(entity);
	
	            if (entity.components.display && entity.components.position) {
	
	                this.nodes.push({ entityId: entity.id, class: 'render', data: new _render2.default(entity.id, entity.components.display, entity.components.position), isActive: true });
	            }
	
	            if (entity.components.animation && entity.components.display && entity.components.velocity) {
	
	                this.nodes.push({ entityId: entity.id, class: 'animation', data: new _animation2.default(entity.id, entity.components.animation, entity.components.display, entity.components.velocity), isActive: true });
	            }
	
	            if (entity.components.velocity && entity.components.position) {
	
	                this.nodes.push({ entityId: entity.id, class: 'move', data: new _move2.default(entity.id, entity.components.position, entity.components.velocity), isActive: true });
	            }
	
	            if (entity.components.velocity && entity.components.input) {
	
	                this.nodes.push({ entityId: entity.id, class: 'control', data: new _control2.default(entity.id, entity.components.control, entity.components.velocity), isActive: true });
	            }
	
	            if (entity.components.collision) {
	
	                this.nodes.push({ entityId: entity.id, class: 'collision', data: new _collision2.default(entity.id, entity.components.collision, entity.components.display, entity.components.velocity), isActive: true });
	            }
	
	            if (entity.components.position) {
	
	                this.nodes.push({ entityId: entity.id, class: 'level', data: new _level2.default(entity.id, entity.components.position), isActive: true });
	            }
	        }
	    }, {
	        key: 'removeEntity',
	        value: function removeEntity(entity) {
	
	            var entityId = entity.id;
	
	            this.entities = this.entities.filter(function (entity) {
	                return entity.id !== entityId;
	            });
	
	            this.nodes = this.nodes.filter(function (node) {
	                return node.entityId !== entityId;
	            });
	        }
	    }, {
	        key: 'addSystem',
	        value: function addSystem(system) {
	
	            this.systems.push(system);
	
	            system.init();
	        }
	    }, {
	        key: 'removeSystem',
	        value: function removeSystem(system) {
	
	            system.stop();
	
	            system = null;
	
	            this.systems = this.systems.filter(function (system) {
	                return !!system;
	            });
	        }
	    }, {
	        key: 'getNodesByClass',
	        value: function getNodesByClass(nodeClass) {
	            return this.nodes.filter(function (node) {
	                return node.class === nodeClass;
	            });
	        }
	    }, {
	        key: 'getNodesByEntityId',
	        value: function getNodesByEntityId(entityId) {
	            return this.nodes.filter(function (node) {
	                return node.entityId === entityId;
	            });
	        }
	    }, {
	        key: 'getEntityById',
	        value: function getEntityById(entityId) {
	            return this.entities.filter(function (entity) {
	                return entity.id === entityId;
	            })[0];
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            var _this = this;
	
	            var before = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	
	
	            this.isPaused = false;
	
	            if (document.visibilityState !== 'visible') {
	
	                this.isPaused = true;
	            }
	
	            var now = performance.now();
	
	            var dt = (now - before) / 1000;
	
	            dt = Math.min(dt, 0.1); // magic number to prevent massive dt when tab not active
	
	            if (!this.isPaused) {
	
	                this.nodes.filter(function (node) {
	                    return !node.isActive;
	                }).map(function (node) {
	                    return node.entityId;
	                }).filter(function (value, index, array) {
	                    return array.indexOf(value) === index;
	                }).map(function (id) {
	                    var entity = _this.getEntityById(id);
	                    console.log(entity);
	                    entity.destroy();
	                });
	
	                this.systems.map(function (system) {
	                    system.update(dt, _this.getNodesByClass(system.class));
	                });
	            }
	
	            before = now;
	
	            requestAnimationFrame(this.update.bind(this, before));
	        }
	    }]);
	
	    return Engine;
	}();
	
	exports.default = Engine;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MoveNode = function MoveNode(entityId, positionComponent, velocityComponent) {
	    _classCallCheck(this, MoveNode);
	
	    this.entityId = entityId;
	    this.position = positionComponent;
	    this.velocity = velocityComponent;
	};
	
	exports.default = MoveNode;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var RenderNode = function RenderNode(entityId, displayComponent, positionComponent) {
	    _classCallCheck(this, RenderNode);
	
	    this.entityId = entityId;
	    this.display = displayComponent;
	    this.position = positionComponent;
	};
	
	exports.default = RenderNode;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ControlNode = function ControlNode(entityId, inputComponent, velocityComponent) {
	    _classCallCheck(this, ControlNode);
	
	    this.entityId = entityId;
	    this.input = inputComponent;
	    this.velocity = velocityComponent;
	};
	
	exports.default = ControlNode;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var CollisionNode = function CollisionNode(entityId, collisionComponent, displayComponent, velocityComponent) {
	    _classCallCheck(this, CollisionNode);
	
	    this.entityId = entityId;
	    this.collision = collisionComponent;
	    this.display = displayComponent;
	    this.velocity = velocityComponent;
	};
	
	exports.default = CollisionNode;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var AnimationNode = function AnimationNode(entityId, animationComponent, displayComponent, velocityComponent) {
	    _classCallCheck(this, AnimationNode);
	
	    this.entityId = entityId;
	    this.animation = animationComponent;
	    this.display = displayComponent;
	    this.velocity = velocityComponent;
	};
	
	exports.default = AnimationNode;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MoveSystem = function () {
	    function MoveSystem(settings) {
	        _classCallCheck(this, MoveSystem);
	
	        this.class = 'move';
	        this.settings = settings;
	    }
	
	    _createClass(MoveSystem, [{
	        key: 'init',
	        value: function init() {}
	    }, {
	        key: 'update',
	        value: function update(time, nodes) {
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
	                } else {
	
	                    velocityData.velocityY = velocityData.velocityY + time * velocityData.accelerationY;
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
	        }
	    }]);
	
	    return MoveSystem;
	}();
	
	exports.default = MoveSystem;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var RenderSystem = function () {
	    function RenderSystem(settings) {
	        _classCallCheck(this, RenderSystem);
	
	        this.class = 'render';
	
	        this.sprites = {};
	
	        this.stage = {};
	
	        this.container = {};
	
	        this.settings = settings;
	    }
	
	    _createClass(RenderSystem, [{
	        key: 'init',
	        value: function init() {
	
	            this.stage = new PIXI.Stage();
	
	            this.container = new PIXI.Container();
	
	            this.stage.addChild(this.container);
	
	            this.renderer = PIXI.autoDetectRenderer(640, 480);
	
	            this.stage.position.x = this.renderer.width / 2; // 320
	            this.stage.position.y = this.renderer.height / 2; // 240
	
	            document.body.appendChild(this.renderer.view);
	        }
	    }, {
	        key: 'update',
	        value: function update(time, nodes) {
	
	            // console.log('render update');
	
	            for (var i = 0, j = nodes.length; i < j; i++) {
	
	                var id = nodes[i].data.entityId;
	
	                if (!this.sprites.hasOwnProperty(id)) {
	
	                    var sprite = nodes[i].data.display.sprite;
	
	                    this.sprites[id] = sprite;
	
	                    this.container.addChild(sprite);
	                }
	
	                // console.log(nodes[i].data.position);
	                // console.log(nodes[i].data.display);
	
	                nodes[i].data.display.sprite.position.x = nodes[i].data.position.x;
	                nodes[i].data.display.sprite.position.y = nodes[i].data.position.y;
	
	                if (nodes[i].data.display.isFocus) {
	
	                    var x = nodes[i].data.display.sprite.x;
	                    var width = nodes[i].data.display.sprite.width;
	                    var y = nodes[i].data.display.sprite.y;
	                    var height = nodes[i].data.display.sprite.height;
	
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
	                    if (nodes[i].data.display.sprite.x < 0 || nodes[i].data.display.sprite.x + nodes[i].data.display.sprite.width > mapWidth) {
	                        console.log('EXIT');
	                    }
	
	                    // console.log('x', this.stage.pivot.x);
	                    // console.log('y', this.stage.pivot.y);
	                }
	            }
	
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = Object.keys(this.sprites)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var _id = _step.value;
	
	                    if (!this.sprites[_id]) {
	                        delete this.sprites[_id];
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	
	            this.renderer.render(this.stage);
	        }
	    }]);
	
	    return RenderSystem;
	}();
	
	exports.default = RenderSystem;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ControlSystem = function () {
	    function ControlSystem(settings) {
	        _classCallCheck(this, ControlSystem);
	
	        this.class = 'control';
	        this.settings = settings;
	    }
	
	    _createClass(ControlSystem, [{
	        key: 'onKeyDown',
	        value: function onKeyDown(e) {
	
	            var key = e.keyCode;
	
	            this.isJump = this.isJump | key === this.settings.KEY.SPACE;
	            this.isLeft = this.isLeft | key === this.settings.KEY.LEFT;
	            this.isUp = this.isUp | key === this.settings.KEY.UP;
	            this.isRight = this.isRight | key === this.settings.KEY.RIGHT;
	            this.isDown = this.isDown | key === this.settings.KEY.DOWN;
	        }
	    }, {
	        key: 'onKeyUp',
	        value: function onKeyUp(e) {
	
	            var key = e.keyCode;
	
	            this.isJump = key === this.settings.KEY.SPACE ? false : this.isJump;
	            this.isLeft = key === this.settings.KEY.LEFT ? false : this.isLeft;
	            this.isUp = key === this.settings.KEY.UP ? false : this.isUp;
	            this.isRight = key === this.settings.KEY.RIGHT ? false : this.isRight;
	            this.isDown = key === this.settings.KEY.DOWN ? false : this.isDown;
	        }
	    }, {
	        key: 'bind',
	        value: function bind() {
	            window.addEventListener('keydown', this.onKeyDown.bind(this), false);
	            window.addEventListener('keyup', this.onKeyUp.bind(this), false);
	        }
	    }, {
	        key: 'unbind',
	        value: function unbind() {
	            window.removeEventListener('keydown', this.onKeyDown.bind(this), false);
	            window.removeEventListener('keyup', this.onKeyUp.bind(this), false);
	        }
	    }, {
	        key: 'init',
	        value: function init() {
	            this.bind();
	        }
	    }, {
	        key: 'update',
	        value: function update(time, nodes) {
	
	            for (var i = 0, j = nodes.length; i < j; i++) {
	
	                if (this.isUp && nodes[i].data.velocity.isGrounded) {
	                    console.log('JUMP');
	                    nodes[i].data.velocity.accelerationY = -nodes[i].data.velocity.maxAccelerationY;
	                    nodes[i].data.velocity.velocityY = -0.3;
	                } else {
	                    nodes[i].data.velocity.accelerationY = 1;
	                }
	
	                if (this.isRight) {
	                    // console.log('right');
	                    nodes[i].data.velocity.accelerationX = nodes[i].data.velocity.maxAccelerationX;
	                } else if (this.isLeft) {
	                    // console.log('left');
	                    nodes[i].data.velocity.accelerationX = -nodes[i].data.velocity.maxAccelerationX;
	                } else {
	                    nodes[i].data.velocity.accelerationX = 0;
	                }
	            }
	        }
	    }]);
	
	    return ControlSystem;
	}();
	
	exports.default = ControlSystem;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var CollisionSystem = function () {
	    function CollisionSystem(settings) {
	        _classCallCheck(this, CollisionSystem);
	
	        this.class = 'collision';
	        this.settings = settings;
	    }
	
	    _createClass(CollisionSystem, [{
	        key: 'init',
	        value: function init() {}
	    }, {
	        key: 'isCollision',
	        value: function isCollision(sprite1, sprite2) {
	
	            var isCollision = false;
	
	            if (sprite1.x < sprite2.x + sprite2.width && sprite1.x + sprite1.width > sprite2.x && sprite1.y < sprite2.y + sprite2.height && sprite1.height + sprite1.y > sprite2.y) {
	                isCollision = true;
	            }
	
	            return isCollision;
	        }
	    }, {
	        key: 'update',
	        value: function update(time, nodes) {
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
	
	                        var isBottomCollision = sprite1.y + sprite1.height > sprite2.y && sprite1.height + sprite1.y < sprite2.y + errorMargin;
	
	                        var isTopCollision = sprite2.y + sprite2.height > sprite1.y && sprite2.height + sprite2.y < sprite1.y + errorMargin;
	
	                        var isRightCollision = sprite1.x + sprite1.width > sprite2.x && sprite1.x + sprite1.width < sprite2.x + errorMargin;
	
	                        var isLeftCollision = sprite2.x + sprite2.width > sprite1.x && sprite2.x + sprite2.width < sprite1.x + errorMargin;
	
	                        // check collision
	                        if (isBottomCollision) {
	
	                            // velocityData.accelerationY = Math.min(0, velocityData.accelerationY);
	                            velocityData.velocityY = Math.min(0, velocityData.velocityY);
	
	                            velocityData.isGrounded = true;
	                        } else if (isTopCollision) {
	
	                            // velocityData.accelerationY = Math.max(0, velocityData.accelerationY);
	                            velocityData.velocityY = Math.max(0, velocityData.velocityY);
	                        } else if (isRightCollision) {
	
	                            velocityData.accelerationX = Math.min(0, velocityData.accelerationX);
	                            velocityData.velocityX = Math.min(0, velocityData.velocityX);
	                        } else if (isLeftCollision) {
	
	                            velocityData.accelerationX = Math.max(0, velocityData.accelerationX);
	                            velocityData.velocityX = Math.max(0, velocityData.velocityX);
	                        }
	
	                        primary.data.collision.collide(secondary);
	                    }
	                });
	            });
	        }
	    }]);
	
	    return CollisionSystem;
	}();
	
	exports.default = CollisionSystem;

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var AnimationSystem = function () {
	    function AnimationSystem(settings) {
	        _classCallCheck(this, AnimationSystem);
	
	        this.class = 'animation';
	        this.settings = settings;
	        this.timer = 0;
	    }
	
	    _createClass(AnimationSystem, [{
	        key: 'init',
	        value: function init() {}
	    }, {
	        key: 'setAnimation',
	        value: function setAnimation(node, prop) {
	
	            node.data.animation.currentAnimationProp = prop;
	        }
	    }, {
	        key: 'updateFrame',
	        value: function updateFrame(node) {
	
	            var animationData = node.data.animation;
	
	            var displayData = node.data.display;
	
	            var frames = animationData[node.data.animation.currentAnimationProp];
	
	            if (animationData.currentFrame + 1 >= frames.length) {
	
	                animationData.currentFrame = 0;
	            } else {
	
	                animationData.currentFrame++;
	            }
	
	            displayData.sprite.texture.frame = displayData.sprite.data.texture[frames[animationData.currentFrame]];
	        }
	    }, {
	        key: 'update',
	        value: function update(dt, nodes) {
	            var _this = this;
	
	            nodes.map(function (node) {
	
	                var velocityData = node.data.velocity;
	
	                var animationData = node.data.animation;
	
	                if (velocityData.velocityY > 0.01 || velocityData.velocityY < -0.01) {
	
	                    // play jump animation
	                    _this.setAnimation(node, 'jump');
	                } else if (velocityData.velocityX > 0.1) {
	
	                    //play right animation
	                    _this.setAnimation(node, 'walkRight');
	                } else if (velocityData.velocityX < -0.1) {
	
	                    //play left animation
	                    _this.setAnimation(node, 'walkLeft');
	                } else {
	
	                    _this.setAnimation(node, 'default');
	                }
	
	                _this.timer = _this.timer + dt;
	
	                if (_this.timer > 0.2) {
	
	                    _this.updateFrame(node);
	
	                    _this.timer = dt;
	                }
	
	                return node;
	            });
	        }
	    }]);
	
	    return AnimationSystem;
	}();
	
	exports.default = AnimationSystem;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _settings = __webpack_require__(14);
	
	var _settings2 = _interopRequireDefault(_settings);
	
	var _player = __webpack_require__(16);
	
	var _player2 = _interopRequireDefault(_player);
	
	var _sky = __webpack_require__(24);
	
	var _sky2 = _interopRequireDefault(_sky);
	
	var _ground = __webpack_require__(25);
	
	var _ground2 = _interopRequireDefault(_ground);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LevelSystem = function () {
	    function LevelSystem(settings) {
	        _classCallCheck(this, LevelSystem);
	
	        this.class = 'level';
	        this.settings = settings;
	
	        this.currentLevel = 1;
	        this.levels = [];
	
	        this.levels.push({
	            url: 'blank',
	            start: [0, 0],
	            finish: [0, 0]
	        }, {
	            url: '/assets/json/levelone.json',
	            start: [3, 3],
	            finish: [3, 4]
	        });
	    }
	
	    _createClass(LevelSystem, [{
	        key: 'init',
	        value: function init() {
	
	            this.getLevelData().then(this.createLevel).then(function (level) {
	                console.log(level);
	            });
	        }
	    }, {
	        key: 'getLevelData',
	        value: function getLevelData() {
	
	            var levelData = this.levels[this.currentLevel];
	
	            return fetch(levelData.url).then(function (response) {
	                return response.json();
	            }).then(function (data) {
	                levelData.data = data;
	                return levelData;
	            });
	        }
	    }, {
	        key: 'createLevel',
	        value: function createLevel(level) {
	
	            var data = level.data;
	
	            var mapData = level.data.layers[0].data;
	
	            var sky = new _sky2.default(data.width, data.height, data.tileheight);
	
	            // this.engine.addEntity(sky);
	
	            for (var i = 0, j = data.height; i < j; i++) {
	
	                for (var k = 0, l = data.width; k < l; k++) {
	
	                    var val = mapData[i * data.width + k];
	
	                    if (val === 1) {
	
	                        var ground = new _ground2.default(k * data.tilewidth, i * data.tilewidth, data.tileheight);
	
	                        // this.engine.addEntity(ground);
	                    }
	                }
	            }
	
	            return level;
	        }
	    }, {
	        key: 'update',
	        value: function update(time, nodes) {
	
	            var finish = this.levels[this.currentLevel].finish;
	
	            nodes.map(function (node) {
	
	                var position = [node.data.position.x, node.data.position.y];
	
	                // spawn player at start
	
	                if (position === finish) {
	
	                    console.log('FINISH');
	                }
	            });
	        }
	    }]);
	
	    return LevelSystem;
	}();
	
	exports.default = LevelSystem;

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SettingsData = function SettingsData() {
	    _classCallCheck(this, SettingsData);
	
	    this.GRAVITY = 1;
	    this.FRICTION = 0.90;
	    this.TILE = 16;
	    this.MAP = [45, 30];
	    this.KEY = { SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };
	};
	
	exports.default = SettingsData;

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MapData = function () {
	    function MapData() {
	        _classCallCheck(this, MapData);
	
	        this.levels = [];
	
	        this.levels.push({
	            url: '/assets/json/levelone.json',
	            start: [3, 3],
	            finish: [10, 5]
	        });
	
	        this.currentLevel = 1;
	
	        this.level = this.getData();
	    }
	
	    _createClass(MapData, [{
	        key: 'getData',
	        value: function getData() {
	
	            var levelData = this.levels[this.currentLevel - 1];
	
	            return fetch(levelData.url).then(function (response) {
	                return response.json();
	            }).then(function (data) {
	                levelData.data = data;
	                return levelData;
	            });
	        }
	    }]);
	
	    return MapData;
	}();
	
	exports.default = MapData;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _entity = __webpack_require__(17);
	
	var _entity2 = _interopRequireDefault(_entity);
	
	var _display = __webpack_require__(18);
	
	var _display2 = _interopRequireDefault(_display);
	
	var _position = __webpack_require__(19);
	
	var _position2 = _interopRequireDefault(_position);
	
	var _velocity = __webpack_require__(20);
	
	var _velocity2 = _interopRequireDefault(_velocity);
	
	var _input = __webpack_require__(21);
	
	var _input2 = _interopRequireDefault(_input);
	
	var _collision = __webpack_require__(22);
	
	var _collision2 = _interopRequireDefault(_collision);
	
	var _animation = __webpack_require__(23);
	
	var _animation2 = _interopRequireDefault(_animation);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var PlayerPrefab = function PlayerPrefab(settings, start) {
	    _classCallCheck(this, PlayerPrefab);
	
	    var texture = PIXI.utils.TextureCache['/static/img/player.png'];
	
	    var sprite = new PIXI.Sprite(texture);
	
	    sprite.data = {};
	
	    sprite.data.texture = [];
	
	    sprite.data.texture.push(new PIXI.Rectangle(0, 0, 16, 32));
	    sprite.data.texture.push(new PIXI.Rectangle(16, 0, 16, 32));
	    sprite.data.texture.push(new PIXI.Rectangle(32, 0, 16, 32));
	    sprite.data.texture.push(new PIXI.Rectangle(48, 0, 16, 32));
	
	    texture.frame = sprite.data.texture[1];
	
	    var player = new _entity2.default();
	
	    var animation = new _animation2.default();
	
	    animation.walkRight = [1, 2];
	
	    animation.walkLeft = [2, 1];
	
	    animation.jump = [3];
	
	    animation.default = [0];
	
	    var collision = new _collision2.default();
	
	    collision.type = 'primary';
	
	    var display = new _display2.default({ sprite: sprite });
	
	    display.isFocus = true;
	
	    var positionComponent = new _position2.default();
	
	    positionComponent.x = start[0] * settings.TILE;
	    positionComponent.y = start[1] * settings.TILE;
	
	    var velocityComponent = new _velocity2.default();
	
	    velocityComponent.accelerationY = settings.GRAVITY;
	
	    var inputComponent = new _input2.default();
	
	    player.addComponents(inputComponent, velocityComponent, positionComponent, display, collision, animation);
	
	    return player;
	};
	
	exports.default = PlayerPrefab;

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Entity = function () {
	    function Entity() {
	        _classCallCheck(this, Entity);
	
	        this.id = this.generateUUID();
	        this.isActive = true;
	        this.components = {};
	    }
	
	    _createClass(Entity, [{
	        key: 'generateUUID',
	        value: function generateUUID() {
	            var d = new Date().getTime();
	            if (window.performance && typeof window.performance.now === "function") {
	                d += performance.now(); //use high-precision timer if available
	            }
	            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	                var r = (d + Math.random() * 16) % 16 | 0;
	                d = Math.floor(d / 16);
	                return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
	            });
	            return uuid;
	        }
	    }, {
	        key: 'addComponent',
	        value: function addComponent(component) {
	
	            this.components[component.class] = component;
	        }
	    }, {
	        key: 'addComponents',
	        value: function addComponents() {
	            var _this = this;
	
	            for (var _len = arguments.length, components = Array(_len), _key = 0; _key < _len; _key++) {
	                components[_key] = arguments[_key];
	            }
	
	            components.map(function (component) {
	                _this.components[component.class] = component;
	            });
	        }
	    }, {
	        key: 'removeComponent',
	        value: function removeComponent(componentClass) {
	
	            this.components[componentClass] = null;
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            console.log('destroy');
	        }
	    }]);
	
	    return Entity;
	}();
	
	exports.default = Entity;

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DisplayComponent = function DisplayComponent(data) {
	    _classCallCheck(this, DisplayComponent);
	
	    this.class = 'display';
	
	    this.sprite = data.sprite;
	
	    this.isFocus = false;
	};
	
	exports.default = DisplayComponent;

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var PositionComponent = function PositionComponent() {
	    _classCallCheck(this, PositionComponent);
	
	    this.class = 'position';
	
	    this.x = 0;
	    this.y = 0;
	};
	
	exports.default = PositionComponent;

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var VelocityComponent = function VelocityComponent() {
	    _classCallCheck(this, VelocityComponent);
	
	    this.class = 'velocity';
	
	    this.accelerationX = 0;
	    this.accelerationY = 0;
	
	    this.maxAccelerationX = 3;
	    this.maxAccelerationY = 4;
	
	    this.velocityX = 0;
	    this.velocityY = 0;
	};
	
	exports.default = VelocityComponent;

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var InputComponent = function InputComponent() {
	    _classCallCheck(this, InputComponent);
	
	    this.class = 'input';
	};
	
	exports.default = InputComponent;

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var CollisionComponent = function CollisionComponent() {
	    _classCallCheck(this, CollisionComponent);
	
	    this.class = 'collision';
	
	    this.type = '';
	
	    this.collide = function () {
	
	        // console.log('COLLIDE');
	    };
	};
	
	exports.default = CollisionComponent;

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var AnimationComponent = function AnimationComponent(data) {
	    _classCallCheck(this, AnimationComponent);
	
	    this.class = 'animation';
	
	    this.default = [0];
	
	    this.walkRight = [1, 2];
	
	    this.walkLeft = [2, 1];
	
	    this.jump = [3];
	
	    this.currentAnimationProp = 'default';
	
	    this.currentFrame = 0;
	};
	
	exports.default = AnimationComponent;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _entity = __webpack_require__(17);
	
	var _entity2 = _interopRequireDefault(_entity);
	
	var _display = __webpack_require__(18);
	
	var _display2 = _interopRequireDefault(_display);
	
	var _position = __webpack_require__(19);
	
	var _position2 = _interopRequireDefault(_position);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SkyPrefab = function SkyPrefab(width, height, tile) {
	    _classCallCheck(this, SkyPrefab);
	
	    var sky = new _entity2.default();
	
	    var texture = new PIXI.Texture(PIXI.utils.TextureCache['bg'], new PIXI.Rectangle(33, 0, 14, tile));
	
	    var sprite = new PIXI.Sprite(texture);
	
	    sprite.height = height * tile;
	    sprite.width = width * tile;
	
	    var display = new _display2.default({ sprite: sprite });
	
	    sky.addComponent(display);
	
	    var position = new _position2.default();
	
	    position.x = 0;
	    position.y = 0;
	
	    sky.addComponent(position);
	
	    return sky;
	};
	
	exports.default = SkyPrefab;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _entity = __webpack_require__(17);
	
	var _entity2 = _interopRequireDefault(_entity);
	
	var _display = __webpack_require__(18);
	
	var _display2 = _interopRequireDefault(_display);
	
	var _position = __webpack_require__(19);
	
	var _position2 = _interopRequireDefault(_position);
	
	var _velocity = __webpack_require__(20);
	
	var _velocity2 = _interopRequireDefault(_velocity);
	
	var _input = __webpack_require__(21);
	
	var _input2 = _interopRequireDefault(_input);
	
	var _collision = __webpack_require__(22);
	
	var _collision2 = _interopRequireDefault(_collision);
	
	var _animation = __webpack_require__(23);
	
	var _animation2 = _interopRequireDefault(_animation);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GroundPrefab = function GroundPrefab(x, y, tile) {
	    _classCallCheck(this, GroundPrefab);
	
	    var ground = new _entity2.default();
	
	    var texture = new PIXI.Texture(PIXI.utils.TextureCache['bg'], new PIXI.Rectangle(0, 0, 14, tile));
	
	    var thing = new PIXI.Sprite(texture);
	
	    thing.height = tile;
	    thing.width = tile;
	
	    var display = new _display2.default({ sprite: thing });
	
	    ground.addComponent(display);
	
	    var positionComponent = new _position2.default();
	
	    positionComponent.x = x;
	    positionComponent.y = y;
	
	    ground.addComponent(positionComponent);
	
	    var collision = new _collision2.default();
	
	    collision.type = 'secondary';
	
	    ground.addComponent(collision);
	
	    return ground;
	};
	
	exports.default = GroundPrefab;

/***/ },
/* 26 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LevelNode = function LevelNode(entityId, positionComponent) {
	    _classCallCheck(this, LevelNode);
	
	    this.entityId = entityId;
	    this.position = positionComponent;
	};
	
	exports.default = LevelNode;

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map