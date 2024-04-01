import defu from 'defu'
import type gsap from 'gsap'
import type { Event, MouseFollowerOptions } from './types'

export default class MouseFollower {
  options: MouseFollowerOptions
  static gsap: typeof gsap
  gsap: typeof gsap
  el: HTMLElement | null
  container: HTMLElement | null
  skewing: MouseFollowerOptions['skewing']
  pos: { x: number, y: number }
  vel: { x: number, y: number }

  event!: Event
  events!: Map<string, Function[]>
  inner!: HTMLElement
  text!: HTMLElement
  media!: HTMLElement
  mediaBox!: HTMLElement
  ticker!: GSAPTickerCallback
  setter!: {
    x: Function
    y: Function
    rotation: Function
    scaleX: Function
    scaleY: Function
    wc: Function
    inner: {
      rotation: Function
    }
  }

  visible!: boolean
  visibleInt!: NodeJS.Timeout
  mediaInt!: NodeJS.Timeout
  hideMediaTimeout!: NodeJS.Timeout
  stick!: { x: number, y: number } | null
  mediaImg!: HTMLImageElement | null
  mediaVideo!: HTMLVideoElement | null

  static registerGSAP(gsap: GSAP) {
    this.gsap = gsap
  }

  constructor(options: Partial<MouseFollowerOptions>) {
    this.options = defu(options, {
      el: null,
      container: document.body,
      className: 'mf-cursor',
      innerClassName: 'mf-cursor-inner',
      textClassName: 'mf-cursor-text',
      mediaClassName: 'mf-cursor-media',
      mediaBoxClassName: 'mf-cursor-media-box',
      bgElementClassName: 'mf-cursor-bg',
      iconSvgClassName: 'mf-svgsprite',
      iconSvgNamePrefix: '-',
      iconSvgSrc: '',
      dataAttr: 'cursor',
      hiddenState: '-hidden',
      textState: '-text',
      iconState: '-icon',
      activeState: '-active',
      mediaState: '-media',
      stateDetection: {
        '-pointer': 'a,button',
      },
      visible: true,
      visibleOnState: false,
      speed: 0.55,
      ease: 'expo.out',
      overwrite: true,
      skewing: 0,
      skewingText: 2,
      skewingIcon: 2,
      skewingMedia: 2,
      skewingDelta: 0.001,
      skewingDeltaMax: 0.15,
      stickDelta: 0.15,
      showTimeout: 0,
      hideOnLeave: true,
      hideTimeout: 300,
      hideMediaTimeout: 300,
      initialPos: [-window.innerWidth, -window.innerHeight],
    }) as MouseFollowerOptions

    if (this.options.visible && this.options.stateDetection == null) {
      this.options.stateDetection = {}
      this.options.stateDetection['-hidden'] = 'iframe'
    }

    this.gsap = MouseFollower.gsap || window.gsap
    this.el
      = typeof this.options.el === 'string'
        ? (document.querySelector(this.options.el) as HTMLElement)
        : this.options.el
    this.container
      = typeof this.options.container === 'string'
        ? (document.querySelector(this.options.container) as HTMLElement)
        : this.options.container
    this.skewing = this.options.skewing
    this.pos = { x: this.options.initialPos[0], y: this.options.initialPos[1] }
    this.vel = { x: 0, y: 0 }

    this.event = {} as Event
    this.events = new Map<string, Function[]>()

    this.init()
  }

  /**
   * Init cursor.
   */
  init() {
    if (!this.el)
      this.create()
    this.createSetter()
    this.bind()
    this.render(true)
    this.ticker = this.render.bind(this, false)
    this.gsap.ticker.add(this.ticker)
  }

  /**
   * Create cursor DOM element and append to container.
   */

  create() {
    this.el = document.createElement('div')
    this.el.className = this.options.className
    this.el.classList.add(this.options.hiddenState)

    this.inner = document.createElement('div')
    this.inner.className = this.options.innerClassName

    this.text = document.createElement('div')
    this.text.className = this.options.textClassName

    this.media = document.createElement('div')
    this.media.className = this.options.mediaClassName

    this.mediaBox = document.createElement('div')
    this.mediaBox.className = this.options.mediaBoxClassName

    this.media.appendChild(this.mediaBox)
    this.inner.appendChild(this.media)
    this.inner.appendChild(this.text)
    this.el.appendChild(this.inner)
    this.container?.appendChild(this.el)
  }

  /**
   * Create GSAP setters.
   */
  createSetter() {
    this.setter = {
      x: this.gsap.quickSetter(this.el, 'x', 'px'),
      y: this.gsap.quickSetter(this.el, 'y', 'px'),
      rotation: this.gsap.quickSetter(this.el, 'rotation', 'deg'),
      scaleX: this.gsap.quickSetter(this.el, 'scaleX'),
      scaleY: this.gsap.quickSetter(this.el, 'scaleY'),
      wc: this.gsap.quickSetter(this.el, 'willChange'),
      inner: {
        rotation: this.gsap.quickSetter(this.inner, 'rotation', 'deg'),
      },
    }
  }

  /**
   * Create and attach events.
   */
  bind() {
    this.event.mouseleave = () => this.hide()
    this.event.mouseenter = () => this.show()

    if (typeof this.options.activeState === 'string') {
      this.event.mousedown = () =>
        this.addState(String(this.options.activeState))
      this.event.mouseup = () =>
        this.removeState(String(this.options.activeState))
    }

    this.event.mousemoveOnce = () => this.show()
    this.event.mousemove = (e: MouseEvent) => {
      this.gsap.to(this.pos, {
        x: this.stick
          ? this.stick.x - (this.stick.x - e.clientX) * this.options.stickDelta
          : e.clientX,
        y: this.stick
          ? this.stick.y - (this.stick.y - e.clientY) * this.options.stickDelta
          : e.clientY,
        overwrite: this.options.overwrite,
        ease: this.options.ease,
        duration: this.visible ? this.options.speed : 0,
        onUpdate: () => {
          this.vel = { x: e.clientX - this.pos.x, y: e.clientY - this.pos.y }
        },
      })
    }
    this.event.mouseover = (e) => {
      for (
        let target = e.target as HTMLElement;
        target && target !== this.container;
        target = target.parentNode as HTMLElement
      ) {
        if (e.relatedTarget && target.contains(e.relatedTarget as Node))
          break

        for (const state in this.options.stateDetection) {
          if (target.matches(this.options.stateDetection[state]))
            this.addState(state)
        }

        if (this.options.dataAttr) {
          const params = this.getFromDataset(target)
          if (params.state)
            this.addState(params.state)
          if (params.text)
            this.setText(params.text)
          if (params.icon)
            this.setIcon(params.icon)
          if (params.img)
            this.setImg(params.img)
          if (params.video)
            this.setVideo(params.video)
          if (typeof params.show !== 'undefined')
            this.show()
          if (typeof params.stick !== 'undefined')
            this.setStick(params.stick || target)
        }
      }
    }
    this.event.mouseout = (e) => {
      for (
        let target = e.target as HTMLElement;
        target && target !== this.container;
        target = target.parentNode as HTMLElement
      ) {
        if (e.relatedTarget && target.contains(e.relatedTarget as Node))
          break

        for (const state in this.options.stateDetection) {
          if (target.matches(this.options.stateDetection[state]))
            this.removeState(state)
        }

        if (this.options.dataAttr) {
          const params = this.getFromDataset(target)
          if (params.state)
            this.removeState(params.state)
          if (params.text)
            this.removeText()
          if (params.icon)
            this.removeIcon()
          if (params.img)
            this.removeImg()
          if (params.video)
            this.removeVideo()
          if (typeof params.show !== 'undefined')
            this.hide()
          if (typeof params.stick !== 'undefined')
            this.removeStick()
        }
      }
    }

    if (this.options.hideOnLeave) {
      this.container?.addEventListener('mouseleave', this.event.mouseleave, {
        passive: true,
      })
    }

    if (this.options.visible) {
      this.container?.addEventListener('mouseenter', this.event.mouseenter, {
        passive: true,
      })
    }

    if (this.options.activeState) {
      this.container?.addEventListener('mousedown', this.event.mousedown, {
        passive: true,
      })
      this.container?.addEventListener('mouseup', this.event.mouseup, {
        passive: true,
      })
    }

    this.container?.addEventListener('mousemove', this.event.mousemove, {
      passive: true,
    })

    if (this.options.visible) {
      this.container?.addEventListener('mousemove', this.event.mousemoveOnce, {
        passive: true,
        once: true,
      })
    }

    if (this.options.stateDetection || this.options.dataAttr) {
      this.container?.addEventListener('mouseover', this.event.mouseover, {
        passive: true,
      })
      this.container?.addEventListener('mouseout', this.event.mouseout, {
        passive: true,
      })
    }
  }

  /**
   * Render the cursor in a new position.
   */
  render(force: boolean = false) {
    if (force !== true && (this.vel.y === 0 || this.vel.x === 0)) {
      this.setter.wc('auto')
      return
    }

    this.trigger('render')
    this.setter.wc('transform')
    this.setter.x(this.pos.x)
    this.setter.y(this.pos.y)

    if (this.skewing) {
      const distance = Math.sqrt(this.vel.x ** 2 + this.vel.y ** 2)
      const scale
        = Math.min(
          distance * this.options.skewingDelta,
          this.options.skewingDeltaMax,
        ) * this.skewing
      const angle = (Math.atan2(this.vel.y, this.vel.x) * 180) / Math.PI

      this.setter.rotation(angle)
      this.setter.scaleX(1 + scale)
      this.setter.scaleY(1 - scale)
      this.setter.inner.rotation(-angle)
    }
  }

  /**
   * Show cursor.
   */
  show() {
    this.trigger('show')
    clearInterval(this.visibleInt)
    this.visibleInt = setTimeout(() => {
      this.el?.classList.remove(this.options.hiddenState)
      this.visible = true
      this.render(true)
    }, this.options.showTimeout)
  }

  /**
   * Hide cursor.
   */
  hide() {
    this.trigger('hide')
    clearInterval(this.visibleInt)
    this.el?.classList.add(this.options.hiddenState)
    this.visibleInt = setTimeout(
      () => (this.visible = false),
      this.options.hideTimeout,
    )
  }

  /**
   * Toggle cursor.
   */
  toggle(force: boolean = false) {
    if (force === true || (force !== false && !this.visible))
      this.show()
    else this.hide()
  }

  /**
   * Add state/states to the cursor.
   */
  addState(state: string) {
    this.trigger('addState', state)
    if (state === this.options.hiddenState)
      return this.hide()
    this.el?.classList.add(...state.split(' '))
    if (this.options.visibleOnState)
      this.show()
  }

  /**
   * Remove state/states from cursor.
   */
  removeState(state: string) {
    this.trigger('removeState', state)
    if (state === this.options.hiddenState)
      return this.show()
    this.el?.classList.remove(...state.split(' '))
    if (
      this.options.visibleOnState
      && this.el?.className === this.options.className
    )
      this.hide()
  }

  /**
   * Toggle cursor state.
   */
  toggleState(state: string, force: boolean = false) {
    if (
      force === true
      || (force !== false && !this.el?.classList.contains(state))
    )
      this.addState(state)
    else this.removeState(state)
  }

  /**
   * Set factor of skewing effect.
   */
  setSkewing(value: number) {
    this.gsap.to(this, { skewing: value })
  }

  /**
   * Reverts skewing factor to default.
   */
  removeSkewing() {
    this.gsap.to(this, { skewing: this.options.skewing })
  }

  /**
   * Stick cursor to the element.
   */
  setStick(element: string | HTMLElement) {
    const el
      = typeof element === 'string' ? document.querySelector(element) : element

    if (!el)
      return

    const rect = el.getBoundingClientRect()
    this.stick = {
      y: rect.top + rect.height / 2,
      x: rect.left + rect.width / 2,
    }
  }

  /**
   * Unstick cursor from the element.
   */
  removeStick() {
    this.stick = null
  }

  /**
   * Transform cursor to text mode with a given string.
   */
  setText(text: string) {
    this.text.innerHTML = text
    this.addState(this.options.textState)
    this.setSkewing(this.options.skewingText)
  }

  /**
   * Reverts cursor from text mode.
   */
  removeText() {
    this.removeState(this.options.textState)
    this.removeSkewing()
  }

  /**
   * Transform cursor to svg icon mode.
   */
  setIcon(name: string, style = '') {
    this.text.innerHTML
      = `<svg class='${this.options.iconSvgClassName} ${this.options.iconSvgNamePrefix}${name}'`
      + ` style='${style}'><use xlink:href='${this.options.iconSvgSrc}#${name}'></use></svg>`
    this.addState(this.options.iconState)
    this.setSkewing(this.options.skewingIcon)
  }

  /**
   * Reverts cursor from icon mode.
   */
  removeIcon() {
    this.removeState(this.options.iconState)
    this.removeSkewing()
  }

  /**
   * Transform cursor to media mode with a given element.
   */
  setMedia(element: HTMLElement) {
    clearTimeout(this.mediaInt)
    if (element) {
      this.mediaBox.innerHTML = ''
      this.mediaBox.appendChild(element)
    }
    this.mediaInt = setTimeout(
      () => this.addState(this.options.mediaState),
      20,
    )
    this.setSkewing(this.options.skewingMedia)
  }

  /**
   * Revert cursor from media mode.
   */
  removeMedia() {
    clearTimeout(this.mediaInt)
    this.removeState(this.options.mediaState)
    this.mediaInt = setTimeout(
      () => (this.mediaBox.innerHTML = ''),
      this.options.hideMediaTimeout,
    )
    this.removeSkewing()
  }

  /**
   * Transform cursor to image mode.
   */
  setImg(url: string) {
    if (!this.mediaImg)
      this.mediaImg = new Image()
    if (this.mediaImg.src !== url)
      this.mediaImg.src = url
    this.setMedia(this.mediaImg)
  }

  /**
   * Reverts cursor from image mode.
   */
  removeImg() {
    this.removeMedia()
  }

  /**
   * Transform cursor to video mode.
   */
  setVideo(url: string) {
    if (!this.mediaVideo) {
      this.mediaVideo = document.createElement('video')
      this.mediaVideo.muted = true
      this.mediaVideo.loop = true
      this.mediaVideo.autoplay = true
    }
    if (this.mediaVideo.src !== url) {
      this.mediaVideo.src = url
      this.mediaVideo.load()
    }
    this.mediaVideo.play()
    this.setMedia(this.mediaVideo)
  }

  /**
   * Reverts cursor from video mode.
   */
  removeVideo() {
    if (this.mediaVideo && this.mediaVideo.readyState > 2)
      this.mediaVideo.pause()
    this.removeMedia()
  }

  /**
   * Attach an event handler function.
   */
  on(event: keyof HTMLElementEventMap, callback?: Function) {
    if (!Array.isArray(this.events.get(event)))
      this.off(event)
    callback && this.events.get(event)?.push(callback)
  }

  /**
   * Remove an event handler.
   */
  off(event: keyof HTMLElementEventMap, callback?: Function) {
    if (callback)
      this.events.get(event)?.filter(f => f !== callback)
    else this.events.delete(event)
  }

  /**
   * Execute all handlers for the given event type.
   *
   * @param {string} event Event name.
   * @param params Extra parameters.
   */
  trigger(event: string, ...params: string[]) {
    this.events.get(event)?.forEach(f => f.call(this, this, ...params))
  }

  /**
   * Get cursor options from data attribute of a given element.
   */
  getFromDataset(element: HTMLElement) {
    const dataset = element.dataset
    return {
      state: dataset[this.options.dataAttr],
      show: dataset[`${this.options.dataAttr}Show`],
      text: dataset[`${this.options.dataAttr}Text`],
      icon: dataset[`${this.options.dataAttr}Icon`],
      img: dataset[`${this.options.dataAttr}Img`],
      video: dataset[`${this.options.dataAttr}Video`],
      stick: dataset[`${this.options.dataAttr}Stick`],
    }
  }

  /**
   * Destroy cursor instance.
   */
  destroy() {
    this.trigger('destroy')
    this.gsap.ticker.remove(this.ticker)
    this.container?.removeEventListener('mouseleave', this.event.mouseleave)
    this.container?.removeEventListener('mouseenter', this.event.mouseenter)
    this.container?.removeEventListener('mousedown', this.event.mousedown)
    this.container?.removeEventListener('mouseup', this.event.mouseup)
    this.container?.removeEventListener('mousemove', this.event.mousemove)
    this.container?.removeEventListener('mousemove', this.event.mousemoveOnce)
    this.container?.removeEventListener('mouseover', this.event.mouseover)
    this.container?.removeEventListener('mouseout', this.event.mouseout)
    if (this.el) {
      this.container?.removeChild(this.el)
      this.el = null
      this.mediaImg = null
      this.mediaVideo = null
    }
  }
}
