'use strict'

const shopModel = require('../models/shop.model')
const bcrypt = require('bcrypt')
const crypto = require('node:crypto')
const { createTokenPair } = require('../auth/authUtils')
const KeyTokenService = require('./keyToken.service')
const { getInfoData } = require('../utils')

const RoleShop = {
  SHOP: 'SHOP',
  WRITE: 'WRITE',
  EDIT: 'EDIT',
}

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      // Setep1: Check email exists
      const holderShop = await shopModel.findOne({ email }).lean()
      if (holderShop) {
        return {
          code: 'xxxx',
          message: 'shop already registered',
        }
      }

      // Hash password
      const passwordHash = await bcrypt.hash(password, 10) // 10: Độ phức tạp hàm băm
      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: [RoleShop.SHOP],
      })

      if (newShop) {
        const privateKey = crypto.randomBytes(64).toString('hex')
        const publicKey = crypto.randomBytes(64).toString('hex')

        console.log({ privateKey, publicKey }) // save collection KeyStore

        const keyStore = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
          privateKey,
        })

        console.log({ keyStore })

        if (!keyStore) {
          return {
            code: 'xxxx',
            message: 'publickeyString error',
          }
        }

        // Create token pair
        const tokens = await createTokenPair(
          { userId: newShop._id, email },
          publicKey,
          privateKey,
        )
        console.log(`Create token successfully::`, tokens)

        return {
          code: 201,
          metadata: {
            shop: getInfoData({
              fields: ['id', 'name', 'email'],
              object: newShop,
            }),
            tokens,
          },
        }
      }
      return {
        code: 200,
        metadata: null,
      }
    } catch (error) {
      return {
        code: 'xxx',
        message: error.message,
        status: 'error',
      }
    }
  }
}

module.exports = AccessService
