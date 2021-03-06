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
System.register("graphics/color", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Color;
    return {
        setters: [],
        execute: function () {
            Color = (function () {
                function Color(red, green, blue) {
                    this.red = red;
                    this.green = green;
                    this.blue = blue;
                }
                Color.prototype.toString = function () {
                    return "rgb(" + this.red + "," + this.green + "," + this.blue + ")";
                };
                return Color;
            }());
            Color.Black = new Color(0, 0, 0);
            Color.Red = new Color(255, 0, 0);
            Color.Green = new Color(0, 255, 0);
            Color.Blue = new Color(0, 0, 255);
            Color.White = new Color(255, 255, 255);
            exports_1("Color", Color);
        }
    };
});
System.register("math/utils", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    function toRudian(angle) {
        return angle * Math.PI / 180;
    }
    exports_2("toRudian", toRudian);
    function toDegree(angle) {
        return angle * 180 / Math.PI;
    }
    exports_2("toDegree", toDegree);
    function toDecimal(input) {
        return input - Math.floor(input);
    }
    exports_2("toDecimal", toDecimal);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("graphics/renderer", ["math/utils"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var utils_1, Arc2D, FilledRectangle, Texture2D, BufferRenderer;
    return {
        setters: [
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
            Arc2D = (function () {
                function Arc2D(data) {
                    this.x = data.x;
                    this.y = data.y;
                    this.radius = data.radius;
                    this.startAngle = data.startAngle;
                    this.endAngle = data.endAngle;
                    this.width = data.width;
                    this.zIndex = data.zIndex;
                    this.color = data.color;
                    this.filled = data.filled;
                    this.hasShade = false;
                }
                Arc2D.prototype.draw = function (graphics) {
                    graphics.fillStyle = this.color.toString();
                    graphics.beginPath();
                    graphics.lineWidth = this.width;
                    graphics.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
                    this.filled ? graphics.fill() : graphics.stroke();
                    graphics.closePath();
                };
                return Arc2D;
            }());
            FilledRectangle = (function () {
                function FilledRectangle(data) {
                    this.x = data.x;
                    this.y = data.y;
                    this.width = data.width;
                    this.heigh = data.heigh;
                    this.hasShade = data.hasShade;
                    this.zIndex = data.zIndex;
                    this.color = data.color;
                }
                FilledRectangle.prototype.draw = function (graphics) {
                    graphics.fillStyle = this.color.toString();
                    graphics.fillRect(this.x, this.y, this.width, this.heigh);
                };
                return FilledRectangle;
            }());
            Texture2D = (function () {
                function Texture2D(data) {
                    this.image = data.image;
                    this.x = data.x;
                    this.y = data.y;
                    this.width = data.width;
                    this.heigh = data.heigh;
                    this.zIndex = data.zIndex;
                    this.hasShade = data.hasShade;
                    this.clipX = data.clipX;
                    this.clipY = data.clipY;
                    this.clipWidth = data.clipWidth;
                    this.clipHeigh = data.clipHeigh;
                }
                Texture2D.prototype.draw = function (graphics) {
                    graphics.drawImage(this.image, this.clipX !== undefined ? this.clipX : this.x, this.clipY !== undefined ? this.clipY : this.y, this.clipWidth !== undefined ? this.clipWidth : this.width, this.clipHeigh !== undefined ? this.clipHeigh : this.heigh, this.x, this.y, this.width, this.heigh);
                };
                return Texture2D;
            }());
            BufferRenderer = (function () {
                function BufferRenderer(graphics, maxZIndex) {
                    if (maxZIndex === void 0) { maxZIndex = Infinity; }
                    this.buffer = [];
                    this.graphics = graphics;
                    this.maxZIndex = maxZIndex;
                }
                BufferRenderer.prototype.setShadeMode = function (hasShade) {
                    this.hasShade = hasShade;
                };
                BufferRenderer.prototype.setColor = function (color) {
                    if (color) {
                        this.color = color;
                    }
                };
                BufferRenderer.prototype.setZIndex = function (zIndex) {
                    this.zIndex = zIndex;
                };
                BufferRenderer.prototype.fillRect = function (x, y, width, heigh) {
                    var _a = this, color = _a.color, zIndex = _a.zIndex, hasShade = _a.hasShade;
                    this.buffer.push(new FilledRectangle({
                        x: Math.floor(x),
                        y: Math.floor(y),
                        width: Math.floor(width),
                        heigh: Math.floor(heigh),
                        color: color,
                        zIndex: zIndex,
                        hasShade: hasShade
                    }));
                };
                BufferRenderer.prototype.arc = function (x, y, r, sAngle, eAngle, width, filled) {
                    if (sAngle === void 0) { sAngle = 0; }
                    if (eAngle === void 0) { eAngle = 360; }
                    if (width === void 0) { width = 1; }
                    if (filled === void 0) { filled = false; }
                    var _a = this, color = _a.color, zIndex = _a.zIndex;
                    var radius = Math.floor(r);
                    this.buffer.push(new Arc2D({
                        x: Math.floor(x),
                        y: Math.floor(y),
                        startAngle: utils_1.toRudian(sAngle),
                        endAngle: utils_1.toRudian(eAngle),
                        width: Math.floor(width),
                        radius: radius,
                        filled: filled,
                        color: color,
                        zIndex: zIndex,
                    }));
                };
                BufferRenderer.prototype.drawImage = function (image, x, y, width, heigh, clipX, clipY, clipWidth, clipHeigh) {
                    var _a = this, zIndex = _a.zIndex, hasShade = _a.hasShade;
                    this.buffer.push(new Texture2D({
                        image: image,
                        x: Math.floor(x),
                        y: Math.floor(y),
                        width: width && Math.floor(width),
                        heigh: heigh && Math.floor(heigh),
                        zIndex: zIndex,
                        clipX: clipX && Math.floor(clipX),
                        clipY: clipY && Math.floor(clipY),
                        clipWidth: clipWidth && Math.floor(clipWidth),
                        clipHeigh: clipHeigh && Math.floor(clipHeigh),
                        hasShade: hasShade
                    }));
                };
                BufferRenderer.prototype.render = function () {
                    var _this = this;
                    this.graphics.imageSmoothingEnabled = false;
                    this.buffer
                        .filter(function (operation) { return operation.zIndex < _this.maxZIndex; })
                        .sort(function (firstOperation, secondOperation) { return secondOperation.zIndex - firstOperation.zIndex; })
                        .forEach(function (operation) {
                        operation.draw(_this.graphics);
                        if (operation.hasShade && operation.width && operation.heigh) {
                            _this.graphics.fillStyle = "#000000";
                            _this.graphics.globalAlpha = 1 - (1 - (operation.zIndex / _this.maxZIndex));
                            _this.graphics.fillRect(operation.x, operation.y, operation.width, operation.heigh);
                            _this.graphics.globalAlpha = 1;
                        }
                    });
                    this.buffer = [];
                };
                return BufferRenderer;
            }());
            exports_3("BufferRenderer", BufferRenderer);
        }
    };
});
System.register("system/state/state", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("utils/class", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [],
        execute: function () {
            ;
        }
    };
});
System.register("utils/dictionary", [], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [],
        execute: function () {
            ;
        }
    };
});
System.register("system/state/state-manager", [], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var StateManager;
    return {
        setters: [],
        execute: function () {
            StateManager = (function () {
                function StateManager() {
                    this.states = {};
                }
                StateManager.prototype.register = function (stateName, State) {
                    if (this.states[stateName]) {
                        throw new Error("State " + stateName + " has already registered");
                    }
                    this.states[stateName] = State;
                };
                StateManager.prototype.setState = function (stateName, params) {
                    var State = this.states[stateName];
                    var newState, currentState;
                    if (!State) {
                        throw new Error("State " + stateName + " isn't registered");
                    }
                    newState = new State(this),
                        currentState = this.currentState;
                    this.currentState = null;
                    if (currentState && currentState.destroy) {
                        currentState.destroy();
                    }
                    if (newState.init) {
                        newState.init(params);
                    }
                    this.currentState = newState;
                };
                StateManager.prototype.update = function (deltaTime) {
                    if (this.currentState) {
                        this.currentState.update(deltaTime);
                    }
                };
                StateManager.prototype.draw = function (graphics) {
                    if (this.currentState) {
                        this.currentState.draw(graphics);
                    }
                };
                return StateManager;
            }());
            exports_7("StateManager", StateManager);
        }
    };
});
System.register("system/game", ["system/state/state-manager", "graphics/renderer"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var state_manager_1, renderer_1, Game;
    return {
        setters: [
            function (state_manager_1_1) {
                state_manager_1 = state_manager_1_1;
            },
            function (renderer_1_1) {
                renderer_1 = renderer_1_1;
            }
        ],
        execute: function () {
            ;
            Game = (function () {
                function Game(options) {
                    var _this = this;
                    var context = options.canvas.getContext('2d');
                    this.lastTick = Date.now();
                    this.manager = new state_manager_1.StateManager();
                    this.canvas = options.canvas;
                    this.context = context;
                    this.renderer = new renderer_1.BufferRenderer(context, options.maxZIndex);
                    this.width = options.width;
                    this.height = options.height;
                    this.scale = options.scale;
                    window.addEventListener('resize', function () { return _this.resize(); });
                    requestAnimationFrame(function () { return _this.tick(); });
                }
                Game.prototype.tick = function () {
                    var _this = this;
                    var deltaTime = Date.now() - this.lastTick;
                    this.lastTick += deltaTime;
                    this.context.fillStyle = '#000000';
                    this.context.fillRect(0, 0, this.width, this.height);
                    this.manager.update(deltaTime);
                    this.manager.draw(this.renderer);
                    this.renderer.render();
                    requestAnimationFrame(function () { return _this.tick(); });
                };
                Game.prototype.resize = function () {
                    this.canvas.width = this.width = (window.innerWidth / this.scale);
                    this.canvas.height = this.height = (window.innerHeight / this.scale);
                };
                return Game;
            }());
            exports_8("Game", Game);
        }
    };
});
System.register("event/keys", [], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var Keys;
    return {
        setters: [],
        execute: function () {
            (function (Keys) {
                Keys.SPACE_KEY = 32;
                Keys.LEFT_ARROW_KEY = 37;
                Keys.UP_ARROW_KEY = 38;
                Keys.RIGHT_ARROW_KEY = 39;
                Keys.DOWN_ARROW_KEY = 40;
                Keys.KEY_1 = 49;
                Keys.KEY_2 = 50;
                Keys.KEY_3 = 51;
                Keys.KEY_4 = 52;
                Keys.KEY_W = 87;
                Keys.KEY_A = 65;
                Keys.KEY_S = 83;
                Keys.KEY_D = 68;
            })(Keys || (Keys = {}));
            exports_9("Keys", Keys);
        }
    };
});
System.register("event/key-input-manager", [], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    function makeHandler(value) {
        return function (event) {
            var keyCode = event.keyCode;
            if (!keys[keyCode]) {
                keys[keyCode] = {
                    down: false,
                    click: false
                };
            }
            keys[keyCode].down = value;
            keys[keyCode].click = value;
        };
    }
    var keys, KeyInputManager;
    return {
        setters: [],
        execute: function () {
            keys = {};
            window.addEventListener('keyup', makeHandler(false));
            window.addEventListener('keydown', makeHandler(true));
            KeyInputManager = (function () {
                function KeyInputManager() {
                }
                KeyInputManager.isDown = function (keyCode) {
                    return keys[keyCode] ? keys[keyCode].down : false;
                };
                KeyInputManager.isClick = function (keyCode) {
                    if (keys[keyCode]) {
                        var result = keys[keyCode].click;
                        keys[keyCode].click = false;
                        return result;
                    }
                    return false;
                };
                return KeyInputManager;
            }());
            exports_10("KeyInputManager", KeyInputManager);
            ;
        }
    };
});
System.register("math/point", [], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var ZERO;
    return {
        setters: [],
        execute: function () {
            exports_11("ZERO", ZERO = {
                x: 0,
                y: 0
            });
        }
    };
});
System.register("math/vector2", ["math/point", "math/utils"], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var point_1, utils_2, Vector2D;
    return {
        setters: [
            function (point_1_1) {
                point_1 = point_1_1;
            },
            function (utils_2_1) {
                utils_2 = utils_2_1;
            }
        ],
        execute: function () {
            Vector2D = (function () {
                function Vector2D(x, y) {
                    this._x = x;
                    this._y = y;
                    this._length = Vector2D.distance(this);
                }
                Vector2D.of = function (point) {
                    return new Vector2D(point.x, point.y);
                };
                Vector2D.dot = function (first, second) {
                    return first.x * second.x + first.y * second.y;
                };
                Vector2D.cross = function (first, second) {
                    return second.x * first.y - second.y * first.x;
                };
                Vector2D.angle = function (first, second) {
                    var fn = first.normalize();
                    var sn = second.normalize();
                    var scalar = Vector2D.dot(fn, sn);
                    var angle = Math.acos(scalar);
                    if (Vector2D.cross(fn, sn) < 0) {
                        angle = -angle;
                    }
                    return utils_2.toDegree(angle);
                };
                Vector2D.distance = function (from, to) {
                    if (to === void 0) { to = point_1.ZERO; }
                    var dx = from.x - to.x;
                    var dy = from.y - to.y;
                    return Math.sqrt(dx * dx + dy * dy);
                };
                Vector2D.fromAngle = function (angle, distance) {
                    if (distance === void 0) { distance = 1; }
                    return new Vector2D(Math.cos(utils_2.toRudian(angle)) * distance, Math.sin(utils_2.toRudian(angle)) * distance);
                };
                Object.defineProperty(Vector2D.prototype, "x", {
                    get: function () {
                        return this._x;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Vector2D.prototype, "y", {
                    get: function () {
                        return this._y;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Vector2D.prototype, "length", {
                    get: function () {
                        return this._length;
                    },
                    enumerable: true,
                    configurable: true
                });
                Vector2D.prototype.sum = function (vector) {
                    return new Vector2D(this.x + vector.x, this.y + vector.y);
                };
                Vector2D.prototype.sub = function (vector) {
                    return vector
                        .scale(-1)
                        .sum(this);
                };
                Vector2D.prototype.scale = function (number) {
                    return new Vector2D(this.x * number, this.y * number);
                };
                Vector2D.prototype.divide = function (number) {
                    if (!number)
                        return this;
                    return new Vector2D(this.x / number, this.y / number);
                };
                Vector2D.prototype.normalize = function () {
                    return this.divide(this.length);
                };
                Vector2D.prototype.rotate = function (angle) {
                    var cos = Math.cos(utils_2.toRudian(angle));
                    var sin = Math.sin(utils_2.toRudian(angle));
                    return new Vector2D((cos * this.x - sin * this.y), (sin * this.x + cos * this.y));
                };
                Vector2D.prototype.scalar = function (to) {
                    return Vector2D.dot(this, to);
                };
                Vector2D.prototype.distance = function (to) {
                    return Vector2D.distance(this, to);
                };
                Vector2D.prototype.toString = function () {
                    return "[" + this.x + ", " + this.y + "]";
                };
                return Vector2D;
            }());
            Vector2D.zero = new Vector2D(point_1.ZERO.x, point_1.ZERO.y);
            exports_12("Vector2D", Vector2D);
        }
    };
});
System.register("math/index", ["math/point", "math/vector2", "math/utils"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_13(exports);
    }
    return {
        setters: [
            function (point_2_1) {
                exportStar_1(point_2_1);
            },
            function (vector2_1_1) {
                exportStar_1(vector2_1_1);
            },
            function (utils_3_1) {
                exportStar_1(utils_3_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("event/mouse-manager", ["math/index"], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    function makeHandler(value) {
        return function (event) {
            if (!mouseData.buttons[event.button]) {
                mouseData.buttons[event.button] = {
                    down: false,
                    clicked: false
                };
            }
            mouseData.buttons[event.button].down = value;
            mouseData.buttons[event.button].clicked = value;
        };
    }
    var index_1, mouseData, MouseButton, MouseManager;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            mouseData = {
                move: index_1.Vector2D.zero,
                buttons: {}
            };
            (function (MouseButton) {
                MouseButton.LEFT_BUTTON = 0;
                MouseButton.CENTER_BUTTON = 1;
                MouseButton.RIGHT_BUTTON = 2;
            })(MouseButton || (MouseButton = {}));
            exports_14("MouseButton", MouseButton);
            window.addEventListener('mousedown', makeHandler(true), false);
            window.addEventListener('mouseup', makeHandler(false), false);
            window.addEventListener('mousemove', function (event) { return mouseData.move = new index_1.Vector2D(event.movementX, event.movementY); });
            window.addEventListener('touchmove', function (event) {
                var move = new index_1.Vector2D(event.changedTouches[0].screenX, event.changedTouches[0].screenY);
                if (mouseData.lastTouch) {
                    mouseData.move = mouseData.lastTouch.sub(move);
                }
                mouseData.lastTouch = move;
            });
            window.addEventListener('touchend', function (event) { return mouseData.lastTouch = null; });
            MouseManager = (function () {
                function MouseManager() {
                }
                MouseManager.isDown = function (button) {
                    return mouseData.buttons[button] ? mouseData.buttons[button].down : false;
                };
                MouseManager.isClick = function (button) {
                    if (mouseData.buttons[button]) {
                        var result = mouseData.buttons[button].click;
                        mouseData.buttons[button].click = false;
                        return result;
                    }
                    return false;
                };
                Object.defineProperty(MouseManager, "movement", {
                    get: function () {
                        var result = mouseData.move;
                        mouseData.move = index_1.Vector2D.zero;
                        return result;
                    },
                    enumerable: true,
                    configurable: true
                });
                return MouseManager;
            }());
            exports_14("MouseManager", MouseManager);
        }
    };
});
System.register("event/touch-manager", ["math/index"], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var index_2, touchDatas, TouchManager;
    return {
        setters: [
            function (index_2_1) {
                index_2 = index_2_1;
            }
        ],
        execute: function () {
            touchDatas = {};
            window.addEventListener('touchstart', function (event) {
                var changedTouches = event.changedTouches;
                for (var touchNumber = 0; touchNumber < event.changedTouches.length; touchNumber++) {
                    var touchEvent = changedTouches[touchNumber];
                    var position = new index_2.Vector2D(touchEvent.clientX, touchEvent.clientY);
                    touchDatas[touchEvent.identifier] = {
                        identifier: touchEvent.identifier,
                        move: index_2.Vector2D.zero,
                        lastTouch: position,
                        position: position
                    };
                }
            });
            window.addEventListener('touchmove', function (event) {
                var changedTouches = event.changedTouches;
                for (var touchNumber = 0; touchNumber < event.changedTouches.length; touchNumber++) {
                    var touchEvent = changedTouches[touchNumber];
                    var touchData = touchDatas[touchEvent.identifier] || {
                        identifier: touchEvent.identifier
                    };
                    touchData.lastTouch = new index_2.Vector2D(touchEvent.clientX, touchEvent.clientY);
                    touchData.move = touchData.position.sub(touchData.lastTouch).normalize();
                }
            });
            window.addEventListener('touchend', function (event) {
                var changedTouches = event.changedTouches;
                for (var touchNumber = 0; touchNumber < event.changedTouches.length; touchNumber++) {
                    var touchEvent = changedTouches[touchNumber];
                    delete touchDatas[touchEvent.identifier];
                }
            });
            TouchManager = (function () {
                function TouchManager() {
                }
                Object.defineProperty(TouchManager, "isTouched", {
                    get: function () {
                        return 'ontouchstart' in window;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TouchManager, "touches", {
                    get: function () {
                        return Object.keys(touchDatas).map(function (key) { return touchDatas[key]; });
                    },
                    enumerable: true,
                    configurable: true
                });
                return TouchManager;
            }());
            exports_15("TouchManager", TouchManager);
        }
    };
});
System.register("event/index", ["event/keys", "event/key-input-manager", "event/mouse-manager", "event/touch-manager"], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    function exportStar_2(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_16(exports);
    }
    return {
        setters: [
            function (keys_1_1) {
                exportStar_2(keys_1_1);
            },
            function (key_input_manager_1_1) {
                exportStar_2(key_input_manager_1_1);
            },
            function (mouse_manager_1_1) {
                exportStar_2(mouse_manager_1_1);
            },
            function (touch_manager_1_1) {
                exportStar_2(touch_manager_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("math/map", [], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var Map;
    return {
        setters: [],
        execute: function () {
            Map = (function () {
                function Map(size, wallSize, map) {
                    this.size = size;
                    this.wallSize = wallSize;
                    this.map = map || [];
                }
                Object.defineProperty(Map.prototype, "WallSize", {
                    get: function () {
                        return this.wallSize;
                    },
                    enumerable: true,
                    configurable: true
                });
                Map.prototype.get = function (x, y) {
                    x = Math.floor(x);
                    y = Math.floor(y);
                    if (x < 0 || x > this.size - 1 || y < 0 || y > this.size - 1)
                        return -1;
                    return this.map[y * this.size + x];
                };
                Map.generate = function (size, wallSize, shans) {
                    if (wallSize === void 0) { wallSize = 1; }
                    var map = [];
                    for (var i = 0; i < size * size; i++) {
                        map.push(Math.random() < shans);
                    }
                    return new Map(size, wallSize, map);
                };
                return Map;
            }());
            exports_17("default", Map);
        }
    };
});
System.register("math/ray", ["math/index"], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var index_3, Ray;
    return {
        setters: [
            function (index_3_1) {
                index_3 = index_3_1;
            }
        ],
        execute: function () {
            Ray = (function () {
                function Ray() {
                }
                Ray.cast = function (map, position, angle, range) {
                    var hit = {
                        position: position,
                        distance: 0,
                        height: 0
                    }, nextX, nextY, nextPosition, result = [];
                    var sin = Math.sin(index_3.toRudian(angle));
                    var cos = Math.cos(index_3.toRudian(angle));
                    while (hit.distance < range) {
                        result.push(hit);
                        nextX = Ray.stepX(sin, cos, hit.position);
                        nextY = Ray.stepY(sin, cos, hit.position);
                        nextPosition = nextX.length2 < nextY.length2 ?
                            nextX.position :
                            nextY.position;
                        var _a = nextX.length2 < nextY.length2 ? [1, 0] : [0, 1], shiftX = _a[0], shiftY = _a[1];
                        var dx = cos < 0 ? shiftX : 0;
                        var dy = sin < 0 ? shiftY : 0;
                        hit = {
                            position: nextPosition,
                            distance: position.distance(nextPosition),
                            height: map.get(nextPosition.x - dx, nextPosition.y - dy),
                            offset: nextX.length2 < nextY.length2 ? index_3.toDecimal(nextX.position.y) : index_3.toDecimal(nextY.position.x)
                        };
                    }
                    return result;
                };
                Ray.stepX = function (sin, cos, position) {
                    if (cos === 0)
                        return {
                            length2: Infinity
                        };
                    var dx = cos > 0 ?
                        Math.floor(position.x + 1) - position.x :
                        Math.ceil(position.x - 1) - position.x;
                    var dy = dx * (sin / cos);
                    var nextPosition = new index_3.Vector2D(position.x + dx, position.y + dy);
                    return {
                        position: nextPosition,
                        length2: dx * dx + dy * dy
                    };
                };
                Ray.stepY = function (sin, cos, position) {
                    if (sin === 0)
                        return {
                            length2: Infinity
                        };
                    var dy = sin > 0 ?
                        Math.floor(position.y + 1) - position.y :
                        Math.ceil(position.y - 1) - position.y;
                    var dx = dy * (cos / sin);
                    var nextPosition = new index_3.Vector2D(position.x + dx, position.y + dy);
                    return {
                        position: nextPosition,
                        length2: dx * dx + dy * dy
                    };
                };
                return Ray;
            }());
            exports_18("Ray", Ray);
        }
    };
});
System.register("system/game-object", [], function (exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var GameObject2D;
    return {
        setters: [],
        execute: function () {
            GameObject2D = (function () {
                function GameObject2D() {
                }
                return GameObject2D;
            }());
            exports_19("GameObject2D", GameObject2D);
        }
    };
});
System.register("system/world", [], function (exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var World;
    return {
        setters: [],
        execute: function () {
            World = (function () {
                function World(map) {
                    this.map = map;
                    this.objects = [];
                }
                World.prototype.addObjects = function (objects) {
                    this.objects.push(objects);
                };
                return World;
            }());
            exports_20("World", World);
        }
    };
});
System.register("system/rey-cast-camera", ["math/index", "math/utils", "math/ray"], function (exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var index_4, utils_4, ray_1, TILE_SIZE, image, RayCastCamera;
    return {
        setters: [
            function (index_4_1) {
                index_4 = index_4_1;
            },
            function (utils_4_1) {
                utils_4 = utils_4_1;
            },
            function (ray_1_1) {
                ray_1 = ray_1_1;
            }
        ],
        execute: function () {
            TILE_SIZE = 16;
            image = new Image();
            image.src = './assets/tiles.png';
            RayCastCamera = (function () {
                function RayCastCamera(options) {
                    var _this = this;
                    this.position = options.position;
                    this.angle = options.angle;
                    this.viewAngle = options.viewAngle;
                    this.rayDistance = options.rayDistance;
                    this.rayCount = options.rayCount;
                    this.halfRayCount = options.halfRayCount;
                    this.focalLength = options.focalLength;
                    this.width = options.width;
                    this.height = options.height;
                    this.halfScreen = options.halfScreen;
                    this.columnSize = options.columnSize;
                    this.scale = options.scale;
                    this.world = options.world;
                    window.addEventListener('resize', function () { return _this.resize(); });
                }
                RayCastCamera.prototype.move = function (vector) {
                    this.position = this.position.sum(vector);
                };
                RayCastCamera.prototype.rotate = function (rotate) {
                    this.angle += rotate;
                };
                RayCastCamera.prototype.resize = function () {
                    var width = (window.innerWidth / this.scale);
                    var height = (window.innerHeight / this.scale);
                    var resolution = width / height;
                    this.width = width;
                    this.height = height;
                    this.viewAngle = 90 / Math.PI * resolution;
                    this.rayCount = width / this.columnSize;
                    this.halfRayCount = this.rayCount / 2;
                    this.focalLength = this.viewAngle / this.rayCount;
                    this.halfScreen = width / 2;
                };
                RayCastCamera.prototype.draw = function (renderer) {
                    if (this.world) {
                        this.renderColumns(renderer);
                        this.drawObject(renderer);
                    }
                };
                RayCastCamera.prototype.renderColumns = function (renderer) {
                    for (var rayNumber = 0; rayNumber <= this.rayCount; rayNumber++) {
                        var angle = this.angle + (rayNumber - this.halfRayCount) * this.focalLength;
                        var hits = ray_1.Ray.cast(this.world.map, this.position, angle, this.rayDistance);
                        this.renderColumn(rayNumber, hits, renderer);
                    }
                };
                RayCastCamera.prototype.renderColumn = function (rayNumber, hits, graphics) {
                    var hit, hitNumber = -1;
                    while (++hitNumber < hits.length && hits[hitNumber].height <= 0)
                        ;
                    hit = hits[hitNumber];
                    if (hit && hit.height) {
                        var angle = (rayNumber - this.halfRayCount) * this.focalLength;
                        var z = hit.distance * Math.cos(utils_4.toRudian(angle));
                        var bottom = this.height / 2 * (1 + 2 / z);
                        var height = this.height / z * 2;
                        var x = rayNumber * this.columnSize;
                        var y = bottom - height;
                        var textureX = Math.floor(TILE_SIZE * hit.offset);
                        graphics.setShadeMode(true);
                        graphics.setZIndex(hit.distance);
                        graphics.drawImage(image, x, y, this.columnSize, height, textureX, 0, 1, TILE_SIZE);
                        graphics.setShadeMode(false);
                    }
                };
                RayCastCamera.prototype.drawObject = function (bufferRenderer) {
                    for (var _i = 0, _a = this.world.objects; _i < _a.length; _i++) {
                        var enemy = _a[_i];
                        var playerNormal = index_4.Vector2D.fromAngle(this.angle);
                        var enamyNormal = enemy.position.sub(this.position);
                        var distance = enamyNormal.length;
                        var angle = index_4.Vector2D.angle(enamyNormal, playerNormal);
                        var height = this.height / distance * 2;
                        var bottom = this.height / 2 * (1 + 2 / distance);
                        var x = this.halfScreen + angle * this.width / this.viewAngle - this.height / 2;
                        var y = bottom - this.height;
                        bufferRenderer.setZIndex(distance);
                        bufferRenderer.drawImage(image, x, y, height, height, TILE_SIZE, 0, TILE_SIZE, TILE_SIZE);
                    }
                };
                return RayCastCamera;
            }());
            exports_21("RayCastCamera", RayCastCamera);
        }
    };
});
System.register("states/entity/player", ["system/game-object", "math/index"], function (exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var game_object_1, index_5, Player;
    return {
        setters: [
            function (game_object_1_1) {
                game_object_1 = game_object_1_1;
            },
            function (index_5_1) {
                index_5 = index_5_1;
            }
        ],
        execute: function () {
            Player = (function (_super) {
                __extends(Player, _super);
                function Player() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Player.prototype.move = function (diff, map) {
                    this.movePart(new index_5.Vector2D(0, diff.y), map);
                    this.movePart(new index_5.Vector2D(diff.x, 0), map);
                };
                Player.prototype.movePart = function (diff, map) {
                    var nextPosition = this.position.sum(diff);
                    if (!map.get(nextPosition.x, nextPosition.y)) {
                        this.position = nextPosition;
                    }
                };
                Player.prototype.rotate = function (rotate) {
                    this.angle += rotate;
                };
                return Player;
            }(game_object_1.GameObject2D));
            exports_22("Player", Player);
        }
    };
});
System.register("states/game", ["event/index", "math/index", "system/rey-cast-camera", "system/world", "graphics/color", "math/map", "states/entity/player"], function (exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var index_6, index_7, rey_cast_camera_1, world_1, color_1, map_1, player_1, wallMap, wallSize, width, height, columnSize, viewDistance, GameState;
    return {
        setters: [
            function (index_6_1) {
                index_6 = index_6_1;
            },
            function (index_7_1) {
                index_7 = index_7_1;
            },
            function (rey_cast_camera_1_1) {
                rey_cast_camera_1 = rey_cast_camera_1_1;
            },
            function (world_1_1) {
                world_1 = world_1_1;
            },
            function (color_1_1) {
                color_1 = color_1_1;
            },
            function (map_1_1) {
                map_1 = map_1_1;
            },
            function (player_1_1) {
                player_1 = player_1_1;
            }
        ],
        execute: function () {
            wallMap = [
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
                1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1,
                1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
            ];
            wallSize = 24;
            width = 960;
            height = 720;
            columnSize = 1;
            viewDistance = 30;
            GameState = (function () {
                function GameState() {
                    this.floorColor = new color_1.Color(150, 150, 150);
                    this.cailColor = new color_1.Color(200, 200, 200);
                }
                GameState.prototype.init = function () {
                    var map = new map_1.default(22, wallSize, wallMap);
                    var world = new world_1.World(map);
                    var position = new index_7.Vector2D(7.2, 3);
                    var angle = 180;
                    var rayDistance = viewDistance - 1;
                    var viewAngle = 60;
                    var rayCount = width / columnSize;
                    var halfRayCount = rayCount / 2;
                    var focalLength = viewAngle / rayCount;
                    var halfScreen = width / 2;
                    var camera = new rey_cast_camera_1.RayCastCamera({
                        position: position,
                        angle: angle,
                        rayDistance: rayDistance,
                        viewAngle: viewAngle,
                        rayCount: rayCount,
                        halfRayCount: halfRayCount,
                        focalLength: focalLength,
                        halfScreen: halfScreen,
                        width: width,
                        height: height,
                        columnSize: columnSize,
                        world: world,
                        scale: 1
                    });
                    this.world = world;
                    this.camera = camera;
                    this.player = new player_1.Player();
                    this.player.position = position;
                    this.player.angle = angle;
                    this.player.rotateSpeed = 0.05;
                    this.player.movementSpeed = 0.01;
                    this.camera.resize();
                };
                GameState.prototype.draw = function (renderer) {
                    var halfHeight = this.camera.height / 2;
                    renderer.setShadeMode(false);
                    renderer.setZIndex(this.camera.rayDistance);
                    renderer.setColor(this.cailColor);
                    renderer.fillRect(0, 0, this.camera.width, halfHeight);
                    renderer.setColor(this.floorColor);
                    renderer.fillRect(0, halfHeight, this.camera.width, halfHeight);
                    this.camera.draw(renderer);
                    if (index_6.TouchManager.isTouched) {
                        index_6.TouchManager.touches.forEach(function (touch) {
                            renderer.setZIndex(0);
                            renderer.arc(touch.position.x, touch.position.y, 20, 0, 360, 5);
                            renderer.arc(touch.lastTouch.x, touch.lastTouch.y, 30, 0, 360, 5);
                        });
                    }
                };
                GameState.prototype.update = function (time) {
                    var _this = this;
                    if (index_6.KeyInputManager.isDown(index_6.Keys.LEFT_ARROW_KEY))
                        this.player.rotate(-time * this.player.rotateSpeed);
                    if (index_6.KeyInputManager.isDown(index_6.Keys.RIGHT_ARROW_KEY))
                        this.player.rotate(time * this.player.rotateSpeed);
                    index_6.TouchManager.touches.forEach(function (touch) {
                        if (touch.position.x > _this.camera.width / 2) {
                            _this.player.rotate(-touch.move.x * _this.player.rotateSpeed * time);
                        }
                        else {
                            _this.player.move(touch.move
                                .normalize()
                                .rotate(-90 + _this.player.angle)
                                .scale(_this.player.movementSpeed * time), _this.world.map);
                        }
                    });
                    if (index_6.KeyInputManager.isDown(index_6.Keys.UP_ARROW_KEY))
                        this.player.move(index_7.Vector2D.fromAngle(this.player.angle, this.player.movementSpeed * time), this.world.map);
                    if (index_6.KeyInputManager.isDown(index_6.Keys.DOWN_ARROW_KEY))
                        this.player.move(index_7.Vector2D.fromAngle(this.player.angle, -this.player.movementSpeed * time), this.world.map);
                    if (index_6.KeyInputManager.isDown(index_6.Keys.KEY_W))
                        this.player.move(index_7.Vector2D.fromAngle(this.player.angle, this.player.movementSpeed * time), this.world.map);
                    if (index_6.KeyInputManager.isDown(index_6.Keys.KEY_S))
                        this.player.move(index_7.Vector2D.fromAngle(this.player.angle, -this.player.movementSpeed * time), this.world.map);
                    if (index_6.KeyInputManager.isDown(index_6.Keys.KEY_A))
                        this.player.move(index_7.Vector2D.fromAngle(this.player.angle - 90, this.player.movementSpeed * time / 2), this.world.map);
                    if (index_6.KeyInputManager.isDown(index_6.Keys.KEY_D))
                        this.player.move(index_7.Vector2D.fromAngle(this.player.angle - 90, -this.player.movementSpeed * time / 2), this.world.map);
                    this.camera.position = this.player.position;
                    this.camera.angle = this.player.angle;
                };
                GameState.prototype.destroy = function () {
                    this.world = null;
                };
                return GameState;
            }());
            exports_23("GameState", GameState);
        }
    };
});
System.register("main", ["system/game", "states/game"], function (exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    function launchFullScreen(element) {
        if (element.requestFullScreen) {
            element.requestFullScreen();
        }
        else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        }
        else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        }
    }
    var game_1, game_2, canvas, fullscreenButton, game;
    return {
        setters: [
            function (game_1_1) {
                game_1 = game_1_1;
            },
            function (game_2_1) {
                game_2 = game_2_1;
            }
        ],
        execute: function () {
            canvas = document.getElementById('canvas');
            fullscreenButton = document.getElementById('fullscreen');
            fullscreenButton.addEventListener('click', function () { return launchFullScreen(canvas); });
            game = new game_1.Game({
                canvas: canvas,
                width: 960,
                height: 720,
                maxZIndex: 60,
                scale: 1
            });
            game.resize();
            game.manager.register('game', game_2.GameState);
            game.manager.setState('game');
        }
    };
});
//# sourceMappingURL=bundle.js.map