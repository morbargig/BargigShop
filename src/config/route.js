
// if ( )

const aws = require('aws-sdk');

let s3 = new aws.S3({
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET
});

console.log(s3)
// const routee = require("../../server")
// console.log(routee)
// if (process.env.PORT !== undefined) {
    const route = '/'
// } else { const route = 'http://localhost:8000/' }

export default route