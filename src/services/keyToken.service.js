'use strict'

const keytokenModel = require('../models/keytoken.model')

class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey, privateKey }) => {
    try {
      // PublicKey phải chuyển thành hashString mới lưu vào DB, vì RSA không thể lưu trực tiếp vào DB
      const tokens = await keytokenModel.create({
        user: userId,
        publicKey,
        privateKey,
      })

      return tokens ? tokens.publicKey : null
    } catch (error) {
      return error
    }
  }
}
module.exports = KeyTokenService
