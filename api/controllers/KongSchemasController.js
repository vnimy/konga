/**
 * Created by user on 23/06/2017.
 */
'use strict';

module.exports = {
  authentication: function (req, res) {
    var schemas = [
      {
        name: 'basic-auth',
        fields: [
          {
            name: 'username',
            description: 'Basic认证的用户名',
            required: true,
            type: 'string',
          },
          {
            name: 'password',
            description: 'Basic认证的密码',
            required: false,
            type: 'string',
          },
        ],
      },
      {
        name: 'key-auth',
        fields: [
          {
            name: 'key',
            description:
              '您可以选择自己设置的唯一密钥来验证客户端，或由插件自动生成。',
            type: 'string',
          },
        ],
      },
      {
        name: 'oauth2',
        fields: [
          {
            name: 'name',
            description:
              '要与凭证关联的名称。在OAuth 2.0中，这将是应用程序名称。',
            required: true,
            type: 'string',
          },
          {
            name: 'client_id',
            description: '您可以设置一个唯一的Client ID，或由插件自动生成。',
            type: 'string',
          },
          {
            name: 'client_secret',
            description:
              '您可以设置一个唯一的Client Secret，或由插件自动生成。',
            type: 'string',
          },
          {
            name: 'redirect_uri',
            required: true,
            description: '认证之后将为用户从定向到该URL。',
            type: 'url',
          },
        ],
      },
      {
        name: 'hmac-auth',
        fields: [
          {
            name: 'username',
            description: 'HMAC签名验证的用户名',
            type: 'string',
            required: true,
          },
          {
            name: 'secret',
            description:
              'HMAC签名验证的密码。如果不填写该参数，密码将由插件自动生成。',
            type: 'string',
          },
        ],
      },
      {
        name: 'jwt',
        fields: [
          {
            name: 'key',
            description: '标识凭据的唯一字符串，或有插件自动生成。',
            type: 'string',
          },
          {
            name: 'algorithm',
            description: '用于验证令牌签名的算法。可选HS256、RS256、ES256。',
            type: 'string',
            enum: ['HS256', 'RS256', 'ES256'],
            default: 'HS256',
          },
          {
            name: 'rsa_public_key',
            description:
              '算法为RS256或ES256时，使用公钥(PEM格式)验证令牌的签名。',
            type: 'textarea',
          },
          {
            name: 'secret',
            description:
              '如果算法是HS256或ES256，则用于为该凭据签名的jwt的秘密。如果不填，将自动生成。',
            type: 'string',
          },
        ],
      },
    ];

    return res.json({
      schemas: schemas,
    });
  },
};
