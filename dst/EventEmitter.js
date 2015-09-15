"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _jsPrivate = require("js.private");

var _jsPrivate2 = _interopRequireDefault(_jsPrivate);

var EventEmitter = (function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);
  }

  _createClass(EventEmitter, [{
    key: "on",
    value: function on(event, callback) {
      var context = arguments.length <= 2 || arguments[2] === undefined ? this : arguments[2];
      var oneCall = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

      $(this).getCallbacks(event).push({ callback: callback, context: context, oneCall: oneCall });
      return this;
    }
  }, {
    key: "one",
    value: function one(event, callback, context) {
      this.on(event, callback, context, true);
      return this;
    }
  }, {
    key: "off",
    value: function off(event, callback, context) {
      var _this = this;

      if (event) {
        (function () {
          var callbacks = $(_this).getCallbacks(event);
          callbacks.slice(0).forEach(function (item) {
            if ((!callback || callback == item.callback) && (!context || context == item.context)) $(_this).removeCallback(callbacks, item);
          });
        })();
      } else $(this).events = {};
      return this;
    }
  }, {
    key: "trigger",
    value: function trigger(event) {
      var _this2 = this;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var callbacks = $(this).getCallbacks(event);
      callbacks.slice(0).forEach(function (item) {
        item.callback.apply(item.context, args);
        if (item.oneCall) $(_this2).removeCallback(callbacks, item);
      });
      return this;
    }
  }]);

  return EventEmitter;
})();

var $ = (0, _jsPrivate2["default"])({

  events: {},

  getCallbacks: function getCallbacks(event) {
    return $(this).events[event] = $(this).events[event] || [];
  },

  removeCallback: function removeCallback(from, item) {
    from.splice(from.indexOf(item), 1);
  }

});

exports["default"] = EventEmitter;
module.exports = exports["default"];
