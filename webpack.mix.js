let mix = require('laravel-mix');
 
mix
 .js('src/script.js', 'js').vue({ version: 2 })
 .sass('src/style.scss', 'css')
 .options({processCssUrls: false});
