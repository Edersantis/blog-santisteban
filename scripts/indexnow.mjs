// Avisa a Bing (y a otros buscadores con IndexNow) de las URLs publicadas.
// Uso, después de que Netlify termine el deploy:  npm run indexnow
// Opcional: pasar URLs concretas:  npm run indexnow -- https://blog.santisteban.co/blog/mi-nota/
const HOST = 'blog.santisteban.co';
const KEY = 'f5dc4676b23d7756e725706bfcc705d9'; // El archivo public/f5dc4676b23d7756e725706bfcc705d9.txt demuestra que el sitio es nuestro.

let urls = process.argv.slice(2);
if (urls.length === 0) {
	const xml = await (await fetch(`https://${HOST}/sitemap-0.xml`)).text();
	urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

const response = await fetch('https://api.indexnow.org/indexnow', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json; charset=utf-8' },
	body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${response.status} ${response.statusText} (${urls.length} URLs)`);
