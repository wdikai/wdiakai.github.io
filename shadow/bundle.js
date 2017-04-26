System.register("input", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var keys, Input;
    return {
        setters: [],
        execute: function () {
            keys = {};
            window.addEventListener('keyup', function (event) {
                var keyCode = event.keyCode;
                keys[keyCode] = false;
            });
            window.addEventListener('keydown', function (event) {
                var keyCode = event.keyCode;
                keys[keyCode] = true;
            });
            Input = (function () {
                function Input() {
                }
                Input.isDown = function (keyCode) {
                    return keys[keyCode];
                };
                Input.isClick = function (keyCode) {
                    var result = keys[keyCode];
                    keys[keyCode] = false;
                    return result;
                };
                return Input;
            }());
            Input.SPACE_KEY = 32;
            Input.LEFT_ARROW_KEY = 37;
            Input.UP_ARROW_KEY = 38;
            Input.RIGHT_ARROW_KEY = 39;
            Input.DOWN_ARROW_KEY = 40;
            Input.KEY_1 = 49;
            Input.KEY_2 = 50;
            Input.KEY_3 = 51;
            Input.KEY_4 = 52;
            exports_1("default", Input);
            ;
        }
    };
});
System.register("map", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
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
                Map.prototype.render = function (graphics) {
                    var wallSize = this.wallSize;
                    for (var yOffset = 0; yOffset < this.size; yOffset++) {
                        for (var xOffset = 0; xOffset < this.size; xOffset++) {
                            graphics.fillStyle = this.get(xOffset, yOffset) ? '#909090' : '#c0c0c0';
                            graphics.fillRect(xOffset * wallSize, yOffset * wallSize, wallSize, wallSize);
                        }
                    }
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
            exports_2("default", Map);
        }
    };
});
System.register("math", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    function toRudian(angle) {
        return angle * Math.PI / 180;
    }
    exports_3("toRudian", toRudian);
    function toDegree(angle) {
        return angle * 180 / Math.PI;
    }
    exports_3("toDegree", toDegree);
    var ZERO, Vector2;
    return {
        setters: [],
        execute: function () {
            exports_3("ZERO", ZERO = {
                x: 0,
                y: 0
            });
            Vector2 = (function () {
                function Vector2(x, y) {
                    this._x = x;
                    this._y = y;
                    this._length = Vector2.distance(this);
                }
                Object.defineProperty(Vector2.prototype, "x", {
                    get: function () {
                        return this._x;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Vector2.prototype, "y", {
                    get: function () {
                        return this._y;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Vector2.prototype, "length", {
                    get: function () {
                        return this._length;
                    },
                    enumerable: true,
                    configurable: true
                });
                Vector2.prototype.sum = function (vector) {
                    return new Vector2(this.x + vector.x, this.y + vector.y);
                };
                Vector2.prototype.sub = function (vector) {
                    return vector
                        .scale(-1)
                        .sum(this);
                };
                Vector2.prototype.scale = function (number) {
                    return new Vector2(this.x * number, this.x * number);
                };
                Vector2.prototype.scalar = function (to) {
                    return Vector2.scalar(this, to);
                };
                Vector2.prototype.distance = function (to) {
                    return Vector2.distance(this, to);
                };
                Vector2.scalar = function (first, second) {
                    return first.x * second.x + first.y * second.y;
                };
                Vector2.angle = function (first, second) {
                    var scalar = Vector2.scalar(first, second);
                    var firstLength = first.length;
                    var secondLength = second.length;
                    var angle = Math.acos(scalar / (firstLength * secondLength));
                    return toDegree(angle);
                };
                Vector2.distance = function (from, to) {
                    if (to === void 0) { to = ZERO; }
                    var dx = from.x - to.x;
                    var dy = from.y - to.y;
                    return Math.sqrt(dx * dx + dy * dy);
                };
                Vector2.fromAngle = function (angle, distance) {
                    if (distance === void 0) { distance = 1; }
                    return new Vector2(Math.cos(toRudian(angle)) * distance, Math.sin(toRudian(angle)) * distance);
                };
                return Vector2;
            }());
            exports_3("Vector2", Vector2);
        }
    };
});
System.register("player", ["math", "input"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var math_1, input_1, Player;
    return {
        setters: [
            function (math_1_1) {
                math_1 = math_1_1;
            },
            function (input_1_1) {
                input_1 = input_1_1;
            }
        ],
        execute: function () {
            Player = (function () {
                function Player(_position, _angle, _speed, _rotateSpeed, _style, _size) {
                    if (_size === void 0) { _size = 5; }
                    this._position = _position;
                    this._angle = _angle;
                    this._speed = _speed;
                    this._rotateSpeed = _rotateSpeed;
                    this._style = _style;
                    this._size = _size;
                }
                Object.defineProperty(Player.prototype, "position", {
                    get: function () {
                        return this._position;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Player.prototype, "Angle", {
                    get: function () {
                        return this._angle;
                    },
                    enumerable: true,
                    configurable: true
                });
                Player.prototype.update = function (time, map) {
                    if (input_1.default.isDown(input_1.default.LEFT_ARROW_KEY))
                        this.rotate(-time);
                    if (input_1.default.isDown(input_1.default.RIGHT_ARROW_KEY))
                        this.rotate(time);
                    if (input_1.default.isDown(input_1.default.UP_ARROW_KEY))
                        this.move(math_1.Vector2.fromAngle(this._angle, this._speed * time), map);
                    if (input_1.default.isDown(input_1.default.DOWN_ARROW_KEY))
                        this.move(math_1.Vector2.fromAngle(this._angle, -this._speed * time), map);
                };
                Player.prototype.move = function (speed, map) {
                    var nextPosition = this.position.sum(speed);
                    if (!map.get(nextPosition.x, nextPosition.y)) {
                        this._position = nextPosition;
                    }
                };
                Player.prototype.rotate = function (time) {
                    this._angle += time * this._rotateSpeed;
                };
                Player.prototype.render = function (graphics) {
                    var center = this.position;
                    var head = this.position.sum(math_1.Vector2.fromAngle(this._angle, 1));
                    var left = this.position.sum(math_1.Vector2.fromAngle(this._angle - 65, -0.5));
                    var right = this.position.sum(math_1.Vector2.fromAngle(this._angle + 65, -0.5));
                    graphics.beginPath();
                    graphics.moveTo(center.x * this._size, center.y * this._size);
                    graphics.lineTo(left.x * this._size, left.y * this._size);
                    graphics.lineTo(head.x * this._size, head.y * this._size);
                    graphics.lineTo(right.x * this._size, right.y * this._size);
                    graphics.lineTo(center.x * this._size, center.y * this._size);
                    graphics.closePath();
                    graphics.lineJoin = 'miter';
                    graphics.fillStyle = this._style;
                    graphics.fill();
                };
                return Player;
            }());
            exports_4("default", Player);
        }
    };
});
System.register("ray", ["math"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var math_2, Ray;
    return {
        setters: [
            function (math_2_1) {
                math_2 = math_2_1;
            }
        ],
        execute: function () {
            Ray = (function () {
                function Ray() {
                }
                Ray.cast = function (map, position, angle, range) {
                    var hit = {
                        position: position,
                        distance: 0
                    }, nextX, nextY, nextPosition, result = [];
                    var sin = Math.sin(math_2.toRudian(angle));
                    var cos = Math.cos(math_2.toRudian(angle));
                    while (hit.distance < range) {
                        result.push(hit);
                        nextX = Ray.stepX(sin, cos, hit.position);
                        nextY = Ray.stepY(sin, cos, hit.position);
                        nextPosition = nextX.length2 < nextY.length2 ?
                            nextX.position :
                            nextY.position;
                        hit = {
                            position: nextPosition,
                            distance: position.distance(nextPosition),
                            height: map.get(nextPosition.x, nextPosition.y)
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
                    var nextPosition = new math_2.Vector2(position.x + dx, position.y + dy);
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
                    var nextPosition = new math_2.Vector2(position.x + dx, position.y + dy);
                    return {
                        position: nextPosition,
                        length2: dx * dx + dy * dy
                    };
                };
                return Ray;
            }());
            exports_5("Ray", Ray);
        }
    };
});
System.register("main", ["input", "map", "player", "math", "ray"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    function render(graphics) {
        var deltaTime = Date.now() - now;
        now = Date.now();
        graphics.fillStyle = '#000000';
        graphics.fillRect(0, 0, canvas.width, canvas.height);
        if (input_2.default.isClick(input_2.default.SPACE_KEY))
            DEBUG = !DEBUG;
        player.update(deltaTime, map);
        // map.render(graphics);
        for (var rayNumber = -rayCount / 2; rayNumber <= rayCount / 2; rayNumber++) {
            var angle = player.Angle + rayNumber * focalLength;
            var hits = ray_1.Ray.cast(map, player.position, angle, rayDistance);
            renderHits(hits, graphics);
        }
        player.render(graphics);
        graphics.fillStyle = '#00ffff';
        graphics.fillText('FPS:' + fps, 25, 25);
        countFPS();
        requestAnimationFrame(renderer);
    }
    function renderHits(hits, graphics) {
        var visible = true;
        for (var _i = 0, hits_1 = hits; _i < hits_1.length; _i++) {
            var hit = hits_1[_i];
            var x = void 0, y = void 0, color = void 0;
            if (hit.height)
                break;
            x = Math.floor(hit.position.x);
            y = Math.floor(hit.position.y);
            color = Math.floor(255 - 255 * (hit.distance / rayDistance));
            graphics.fillStyle = "rgb(" + color + ", " + color + ", " + color + ")";
            graphics.fillRect(x * wallSize, y * wallSize, wallSize, wallSize);
        }
    }
    function countFPS() {
        renderCount++;
        if (Date.now() - time >= 1000) {
            time += 1000;
            fps = renderCount;
            renderCount = 0;
        }
    }
    var input_2, map_1, player_1, math_3, ray_1, canvas, context, map, wallMap, DEBUG, wallSize, mapSize, renderCount, fps, time, position, playerAngle, rayDistance, rayCount, focalLength, speed, now, player, renderer;
    return {
        setters: [
            function (input_2_1) {
                input_2 = input_2_1;
            },
            function (map_1_1) {
                map_1 = map_1_1;
            },
            function (player_1_1) {
                player_1 = player_1_1;
            },
            function (math_3_1) {
                math_3 = math_3_1;
            },
            function (ray_1_1) {
                ray_1 = ray_1_1;
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
            DEBUG = false;
            wallSize = 3;
            mapSize = 200;
            canvas = document.getElementById('canvas');
            canvas.width = canvas.height = wallSize * mapSize;
            context = canvas.getContext('2d');
            renderCount = 0;
            fps = 0;
            time = Date.now();
            // map = new Map(mapSize, wallSize, wallMap);
            map = map_1.default.generate(mapSize, wallSize, 0.05);
            position = new math_3.Vector2(mapSize / 2 + .5, mapSize / 2 + .5);
            playerAngle = 180;
            rayDistance = 40;
            rayCount = 60;
            focalLength = 1;
            speed = 0.1;
            now = Date.now();
            player = new player_1.default(position, playerAngle, 0.01, 0.09, '#ff0000', wallSize);
            renderer = render.bind(null, context);
            requestAnimationFrame(renderer);
        }
    };
});
//# sourceMappingURL=bundle.js.map