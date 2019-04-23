import {
  debounce
} from '@/utils'

export default {
  mounted() {
    this.__resizeHandler = debounce(() => {

      this.chart.resize()
      this.chart1.resize()
      this.chart2.resize()
      this.chart3.resize()

    }, 100)
    window.addEventListener('resize', this.__resizeHandler)

    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.__resizeHandler)

    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler)
  },
  methods: {
    sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.__resizeHandler()
      }
    }
  }
}
