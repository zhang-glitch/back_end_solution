import print from 'vue3-print-nb'
import permission from './permission'

export default (app) => {
  app.directive('permission', permission())
  app.use(print)
}
