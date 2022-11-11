const esbuild = require('esbuild');
const inlineImage = require('esbuild-plugin-inline-image');

esbuild.serve(
	{
		servedir: 'public',
		port: 3000,
	},
	{
		entryPoints: ['./src/index.js'],
		outfile: './public/dist/app.js',
		bundle: true,
		loader: {
			'.js': 'jsx',
		},
		plugins: [inlineImage()],
	}
);
