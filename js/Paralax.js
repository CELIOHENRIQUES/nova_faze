/*!
 * parallax.js v1.5.0 (http://pixelcog.github.io/parallax.js/)
 * @copyright 2016 PixelCog, Inc.
 * @license MIT (https://github.com/pixelcog/parallax.js/blob/master/LICENSE)
 */
!(function (t, i, e, s) {
  function o(i, e) {
    var r = this
    'object' == typeof e &&
      (delete e.refresh, delete e.render, t.extend(this, e)),
      (this.$element = t(i)),
      !this.imageSrc &&
        this.$element.is('img') &&
        (this.imageSrc = this.$element.attr('src'))
    var h = (this.position + '').toLowerCase().match(/\S+/g) || []
    if (
      (h.length < 1 && h.push('center'),
      1 == h.length && h.push(h[0]),
      ('top' != h[0] &&
        'bottom' != h[0] &&
        'left' != h[1] &&
        'right' != h[1]) ||
        (h = [h[1], h[0]]),
      this.positionX !== s && (h[0] = this.positionX.toLowerCase()),
      this.positionY !== s && (h[1] = this.positionY.toLowerCase()),
      (r.positionX = h[0]),
      (r.positionY = h[1]),
      'left' != this.positionX &&
        'right' != this.positionX &&
        (isNaN(parseInt(this.positionX))
          ? (this.positionX = 'center')
          : (this.positionX = parseInt(this.positionX))),
      'top' != this.positionY &&
        'bottom' != this.positionY &&
        (isNaN(parseInt(this.positionY))
          ? (this.positionY = 'center')
          : (this.positionY = parseInt(this.positionY))),
      (this.position =
        this.positionX +
        (isNaN(this.positionX) ? '' : 'px') +
        ' ' +
        this.positionY +
        (isNaN(this.positionY) ? '' : 'px')),
      navigator.userAgent.match(/(iPod|iPhone|iPad)/) && this.iosDisabled)
    )
      return (
        this.imageSrc &&
          this.iosFix &&
          !this.$element.is('img') &&
          this.$element.css({
            backgroundImage: 'url("' + this.imageSrc + '")',
            backgroundSize: 'cover',
            backgroundPosition: this.position
          }),
        this
      )
    if (navigator.userAgent.match(/(Android)/) && this.androidDisabled)
      return (
        this.imageSrc &&
          this.androidFix &&
          !this.$element.is('img') &&
          this.$element.css({
            backgroundImage: 'url("' + this.imageSrc + '")',
            backgroundSize: 'cover',
            backgroundPosition: this.position
          }),
        this
      )
    this.$mirror = t('<div />').prependTo(this.mirrorContainer)
    var a = this.$element.find('>.parallax-slider'),
      n = !1
    0 == a.length
      ? (this.$slider = t('<img />').prependTo(this.$mirror))
      : ((this.$slider = a.prependTo(this.$mirror)), (n = !0)),
      this.$mirror
        .addClass('parallax-mirror')
        .css({
          visibility: 'hidden',
          zIndex: this.zIndex,
          position: 'fixed',
          top: 0,
          left: 0,
          overflow: 'hidden'
        }),
      this.$slider.addClass('parallax-slider').one('load', function () {
        ;(r.naturalHeight && r.naturalWidth) ||
          ((r.naturalHeight = this.naturalHeight || this.height || 1),
          (r.naturalWidth = this.naturalWidth || this.width || 1)),
          (r.aspectRatio = r.naturalWidth / r.naturalHeight),
          o.isSetup || o.setup(),
          o.sliders.push(r),
          (o.isFresh = !1),
          o.requestRender()
      }),
      n || (this.$slider[0].src = this.imageSrc),
      ((this.naturalHeight && this.naturalWidth) ||
        this.$slider[0].complete ||
        a.length > 0) &&
        this.$slider.trigger('load')
  }
  !(function () {
    for (
      var t = 0, e = ['ms', 'moz', 'webkit', 'o'], s = 0;
      s < e.length && !i.requestAnimationFrame;
      ++s
    )
      (i.requestAnimationFrame = i[e[s] + 'RequestAnimationFrame']),
        (i.cancelAnimationFrame =
          i[e[s] + 'CancelAnimationFrame'] ||
          i[e[s] + 'CancelRequestAnimationFrame'])
    i.requestAnimationFrame ||
      (i.requestAnimationFrame = function (e) {
        var s = new Date().getTime(),
          o = Math.max(0, 16 - (s - t)),
          r = i.setTimeout(function () {
            e(s + o)
          }, o)
        return (t = s + o), r
      }),
      i.cancelAnimationFrame ||
        (i.cancelAnimationFrame = function (t) {
          clearTimeout(t)
        })
  })()
  var r = !1
  try {
    var h = Object.defineProperty({}, 'passive', {
      get: function () {
        r = !0
      }
    })
    i.addEventListener('test', null, h)
  } catch (t) {}
  t.extend(o.prototype, {
    speed: 0.2,
    bleed: 0,
    zIndex: -100,
    iosFix: !0,
    iosDisabled: !0,
    androidFix: !0,
    androidDisabled: !0,
    position: 'center',
    overScrollFix: !1,
    mirrorContainer: 'body',
    refresh: function () {
      ;(this.boxWidth = this.$element.outerWidth()),
        (this.boxHeight = this.$element.outerHeight() + 2 * this.bleed),
        (this.boxOffsetTop = this.$element.offset().top - this.bleed),
        (this.boxOffsetLeft = this.$element.offset().left),
        (this.boxOffsetBottom = this.boxOffsetTop + this.boxHeight)
      var t,
        i = o.winHeight,
        e = o.docHeight,
        s = Math.min(this.boxOffsetTop, e - i),
        r = Math.max(this.boxOffsetTop + this.boxHeight - i, 0),
        h = (this.boxHeight + (s - r) * (1 - this.speed)) | 0,
        a = ((this.boxOffsetTop - s) * (1 - this.speed)) | 0
      h * this.aspectRatio >= this.boxWidth
        ? ((this.imageWidth = (h * this.aspectRatio) | 0),
          (this.imageHeight = h),
          (this.offsetBaseTop = a),
          (t = this.imageWidth - this.boxWidth),
          'left' == this.positionX
            ? (this.offsetLeft = 0)
            : 'right' == this.positionX
            ? (this.offsetLeft = -t)
            : isNaN(this.positionX)
            ? (this.offsetLeft = (-t / 2) | 0)
            : (this.offsetLeft = Math.max(this.positionX, -t)))
        : ((this.imageWidth = this.boxWidth),
          (this.imageHeight = (this.boxWidth / this.aspectRatio) | 0),
          (this.offsetLeft = 0),
          (t = this.imageHeight - h),
          'top' == this.positionY
            ? (this.offsetBaseTop = a)
            : 'bottom' == this.positionY
            ? (this.offsetBaseTop = a - t)
            : isNaN(this.positionY)
            ? (this.offsetBaseTop = (a - t / 2) | 0)
            : (this.offsetBaseTop = a + Math.max(this.positionY, -t)))
    },
    render: function () {
      var t = o.scrollTop,
        i = o.scrollLeft,
        e = this.overScrollFix ? o.overScroll : 0,
        s = t + o.winHeight
      this.boxOffsetBottom > t && this.boxOffsetTop <= s
        ? ((this.visibility = 'visible'),
          (this.mirrorTop = this.boxOffsetTop - t),
          (this.mirrorLeft = this.boxOffsetLeft - i),
          (this.offsetTop =
            this.offsetBaseTop - this.mirrorTop * (1 - this.speed)))
        : (this.visibility = 'hidden'),
        this.$mirror.css({
          transform:
            'translate3d(' +
            this.mirrorLeft +
            'px, ' +
            (this.mirrorTop - e) +
            'px, 0px)',
          visibility: this.visibility,
          height: this.boxHeight,
          width: this.boxWidth
        }),
        this.$slider.css({
          transform:
            'translate3d(' +
            this.offsetLeft +
            'px, ' +
            this.offsetTop +
            'px, 0px)',
          position: 'absolute',
          height: this.imageHeight,
          width: this.imageWidth,
          maxWidth: 'none'
        })
    }
  }),
    t.extend(o, {
      scrollTop: 0,
      scrollLeft: 0,
      winHeight: 0,
      winWidth: 0,
      docHeight: 1 << 30,
      docWidth: 1 << 30,
      sliders: [],
      isReady: !1,
      isFresh: !1,
      isBusy: !1,
      setup: function () {
        function s() {
          if (f == i.pageYOffset) return i.requestAnimationFrame(s), !1
          ;(f = i.pageYOffset), h.render(), i.requestAnimationFrame(s)
        }
        if (!this.isReady) {
          var h = this,
            a = t(e),
            n = t(i),
            l = function () {
              ;(o.winHeight = n.height()),
                (o.winWidth = n.width()),
                (o.docHeight = a.height()),
                (o.docWidth = a.width())
            },
            d = function () {
              var t = n.scrollTop(),
                i = o.docHeight - o.winHeight,
                e = o.docWidth - o.winWidth
              ;(o.scrollTop = Math.max(0, Math.min(i, t))),
                (o.scrollLeft = Math.max(0, Math.min(e, n.scrollLeft()))),
                (o.overScroll = Math.max(t - i, Math.min(t, 0)))
            },
            p = (this.scrollListener = function () {
              d(), o.requestRender()
            })
          n
            .on('resize.px.parallax load.px.parallax', function () {
              l(), h.refresh(), (o.isFresh = !1), o.requestRender()
            })
            .on('scroll.px.parallax load.px.parallax', p),
            (function (t, i, e) {
              r
                ? t.addEventListener(i, e, { passive: !0 })
                : t.addEventListener(i, e)
            })(i, 'touchmove', p),
            l(),
            d(),
            (this.isReady = !0)
          var f = -1
          s()
        }
      },
      configure: function (i) {
        'object' == typeof i &&
          (delete i.refresh, delete i.render, t.extend(this.prototype, i))
      },
      refresh: function () {
        t.each(this.sliders, function () {
          this.refresh()
        }),
          (this.isFresh = !0)
      },
      render: function () {
        this.isFresh || this.refresh(),
          t.each(this.sliders, function () {
            this.render()
          })
      },
      requestRender: function () {
        this.render(), (this.isBusy = !1)
      },
      destroy: function (e) {
        var s,
          r = t(e).data('px.parallax')
        for (r.$mirror.remove(), s = 0; s < this.sliders.length; s += 1)
          this.sliders[s] == r && this.sliders.splice(s, 1)
        t(e).data('px.parallax', !1),
          0 === this.sliders.length &&
            (t(i).off('scroll.px.parallax resize.px.parallax load.px.parallax'),
            (function (t, i, e) {
              t.removeEventListenr(i, e)
            })(i, 'touchmove', this.scrollListener),
            (this.isReady = !1),
            (o.isSetup = !1))
      }
    })
  var a = t.fn.parallax
  ;(t.fn.parallax = function (s) {
    return this.each(function () {
      var r = t(this),
        h = 'object' == typeof s && s
      this == i || this == e || r.is('body')
        ? o.configure(h)
        : r.data('px.parallax')
        ? 'object' == typeof s && t.extend(r.data('px.parallax'), h)
        : ((h = t.extend({}, r.data(), h)),
          r.data('px.parallax', new o(this, h))),
        'string' == typeof s && ('destroy' == s ? o.destroy(this) : o[s]())
    })
  }),
    (t.fn.parallax.Constructor = o),
    (t.fn.parallax.noConflict = function () {
      return (t.fn.parallax = a), this
    }),
    t(function () {
      t('[data-parallax="scroll"]').parallax()
    })
})(jQuery, window, document)
