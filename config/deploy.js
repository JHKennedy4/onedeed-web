/* jshint node: true */
module.exports = function (deployTarget) {
  var ENV = {
    build: {},
    s3: {
      filePattern: '**/*.{js,css,png,gif,ico,jpg,map,xml,txt,svg,swf,eot,ttf,woff,woff2,html}',
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET,
      bucket: process.env.AWS_BUCKET,
      region: process.env.AWS_REGION
    }

    // include other plugin configuration that applies to all deploy targets here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production'
    ENV.pipeline = {
      disabled: {
        cloudfront: true
      }
    }
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production'
    ENV.cloudfront = {
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET,
      distribution: process.env.AWS_DISTRIBUTION_ID
    }
    ENV.pipeline.activateOnDeploy = true
    // configure other plugins for production deploy target here
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV
}
