import i18n from '@/i18n'

export function validatePassword() {
  return (rule, value, callback) => {
    console.log('value', value)
    if (value.length < 6) {
      callback(new Error(i18n.global.t('msg.login.passwordRule')))
    } else {
      callback()
    }
  }
}
