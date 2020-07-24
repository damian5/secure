import CryptoJS from 'crypto-js'

export const encrypt = (password: string) => {
  const key = window.localStorage.getItem('KD')
  return CryptoJS.AES.encrypt(password, key).toString();
}

export const decrypt = (password: string) => {
  const key = window.localStorage.getItem('KD')
  return CryptoJS.AES.decrypt(password, key).toString(CryptoJS.enc.Utf8);
}

export function keyFromPassword(password: string){
  const keyDerivation = CryptoJS.PBKDF2(password, 'salt', { keySize: 512/32, iterations: 10 })
  window.localStorage.setItem('KD', JSON.stringify(keyDerivation))
}
