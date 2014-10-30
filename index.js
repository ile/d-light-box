// Generated by CoffeeScript 1.8.0
(function() {
  var Lightbox,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  module.exports = Lightbox = (function() {
    function Lightbox() {
      this.prev = __bind(this.prev, this);
      this.next = __bind(this.next, this);
      this.unbindButtons = __bind(this.unbindButtons, this);
      this.bindButtons = __bind(this.bindButtons, this);
      this.keydown = __bind(this.keydown, this);
      this.cancel = __bind(this.cancel, this);
      this.show = __bind(this.show, this);
      this.enumerateImages = __bind(this.enumerateImages, this);
      this.enumerateImagesDelayed = __bind(this.enumerateImagesDelayed, this);
    }

    Lightbox.prototype.view = __dirname;

    Lightbox.prototype.name = 'd-light-box';

    Lightbox.prototype.create = function() {
      var path;
      this.selector = this.model.get('selector');
      this.enumerateImages();
      path = this.model.get('path');
      if (path) {
        this.path = this.model.root.at("" + path + "**");
        return this.path.on('insert', this.enumerateImagesDelayed);
      }
    };

    Lightbox.prototype.enumerateImagesDelayed = function() {
      return window.setTimeout(this.enumerateImages, 2500);
    };

    Lightbox.prototype.enumerateImages = function() {
      var el, _i, _len, _ref, _results;
      if (this.selector) {
        this.elements = document.querySelectorAll(this.selector);
        _ref = this.elements;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          el = _ref[_i];
          el.addEventListener('click', this.show);
          _results.push(el.classList.add('d-l'));
        }
        return _results;
      }
    };

    Lightbox.prototype.show = function(e) {
      if (e) {
        this.current = e.srcElement || e.target || e.toElement;
      }
      this.model.set('src', this.current.src);
      return setTimeout(this.bindButtons(), 1);
    };

    Lightbox.prototype.cancel = function(e) {
      this.unbindButtons();
      return this.model.del('src');
    };

    Lightbox.prototype.keydown = function(e) {
      var key;
      key = e.keyCode || e.which;
      if (key === 37) {
        e.stopPropagation();
        return this.prev();
      } else if (key === 39) {
        e.stopPropagation();
        return this.next();
      } else if (key === 27) {
        e.stopPropagation();
        return this.cancel();
      }
    };

    Lightbox.prototype.bindButtons = function() {
      document.addEventListener('keydown', this.keydown, true);
      document.getElementById('dl-button-right').addEventListener('click', this.next, true);
      return document.getElementById('dl-button-left').addEventListener('click', this.prev, true);
    };

    Lightbox.prototype.unbindButtons = function() {
      document.removeEventListener('keydown', this.keydown, true);
      document.getElementById('dl-button-right').removeEventListener('click', this.next);
      return document.getElementById('dl-button-left').removeEventListener('click', this.prev);
    };

    Lightbox.prototype.next = function(e) {
      var el, next, _i, _len, _ref, _results;
      if (e) {
        e.stopPropagation();
      }
      next = false;
      _ref = this.elements;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        el = _ref[_i];
        if (next) {
          this.current = el;
          this.show();
          break;
        }
        if (el === this.current) {
          _results.push(next = true);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Lightbox.prototype.prev = function(e) {
      var el, prev, _i, _len, _ref, _results;
      if (e) {
        e.stopPropagation();
      }
      prev = false;
      _ref = this.elements;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        el = _ref[_i];
        if (el === this.current && prev) {
          this.current = prev;
          this.show();
          break;
        }
        _results.push(prev = el);
      }
      return _results;
    };

    return Lightbox;

  })();

}).call(this);
