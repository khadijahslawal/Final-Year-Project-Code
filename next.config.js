const withImages = require('next-images');

module.exports = withImages({
   async redirects(){
        return [
          {
            source: '/index',
            destination: "https://discord.gg",
            permanent: true,
          },
        ]
    }
});