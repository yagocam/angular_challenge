const proxy = [
    {
      context: '/api',
      target: 'https://djangoapichallenge-production.up.railway.app',
      pathRewrite: {'^/api' : ''}
    }
  ];
  module.exports = proxy;