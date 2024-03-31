export interface MouseFollowerOptions {
  /**
   * Existed cursor element.
   */
  el: string | HTMLElement | null
  /**
   * Cursor container.
   */
  container: string | HTMLElement | null
  /**
   * Cursor root element class name.
   */
  className: string
  /**
   * Inner element class name.
   */
  innerClassName: string
  /**
   * Text element class name.
   */
  textClassName: string
  /**
   * Media element class name.
   */
  mediaClassName: string
  /**
   * Media inner element class name.
   */
  mediaBoxClassName: string
  /**
   * SVG sprite class name.
   */
  iconSvgClassName: string
  /**
   * SVG sprite icon class name prefix.
   */
  iconSvgNamePrefix: string
  /**
   * SVG sprite source.
   */
  iconSvgSrc: string
  /**
   * Name of data attribute for changing cursor state directly in HTML.
   */
  dataAttr: string
  /**
   * Hidden state name.
   */
  hiddenState: string
  /**
   * Text state name.
   */
  textState: string
  /**
   * Icon state name.
   */
  iconState: string
  /**
   * Active (mousedown) state name. Set null to disable.
   */
  activeState: string | null
  /**
   * Media (image/video) state name.
   */
  mediaState: string
  /**
   * State detection rules.
   */
  stateDetection: { [key: string]: string } | null
  /**
   * Is cursor visible by default.
   */
  visible: boolean
  /**
   * Automatically show/hide cursor when state added.
   */
  visibleOnState: boolean
  /**
   * Cursor movement speed.
   */
  speed: number
  /**
   * Timing function of cursor movement.
   */
  ease: gsap.TweenVars['ease']
  /**
   * Overwrite or remain cursor position when `mousemove` event happens.
   */
  overwrite: boolean
  /**
   * Default skewing factor.
   */
  skewing: number
  /**
   * Skewing effect factor in a text state.
   */
  skewingText: number
  /**
   * Skewing effect factor in a icon state.
   */
  skewingIcon: number
  /**
   * Skewing effect factor in a media (image/video) state.
   */
  skewingMedia: number
  /**
   * Skewing effect base delta.
   */
  skewingDelta: number
  /**
   * Skew effect max delta.
   */
  skewingDeltaMax: number
  /**
   * Stick effect delta.
   */
  stickDelta: number
  /**
   * Delay before show.
   */
  showTimeout: number
  /**
   * Hide the cursor when mouse leave container.
   */
  hideOnLeave: boolean
  /**
   * Delay before hiding. It should be equal to the CSS hide animation time.
   */
  hideTimeout: number
  /**
   * Hide the cursor when media is playing.
   */
  hideMediaTimeout: number
  /**
   * Array (x, y) of initial cursor position.
   */
  initialPos: number[]
}

export type Event = Record<
  keyof HTMLElementEventMap | 'mousemoveOnce',
  (e: MouseEvent) => void
>
