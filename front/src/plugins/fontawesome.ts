import type { Plugin } from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faUserSecret,
  faTrashAlt,
  faRotateRight,
  faPlus,
  faRecycle,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret, faTrashAlt, faRotateRight, faPlus, faRecycle, faXmark)

export const icons: Plugin = {
  install: (app) => {
    app.component('font-awesome-icon', FontAwesomeIcon)
  },
}
