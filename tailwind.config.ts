import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/layerchart/**/*.{svelte,js}'],

	theme: {
		extend: {
			screens: {
				xs: '375px'
			},

			fontFamily: {
				heading: ['Nunito', 'sans-serif'],
				body: ['Inter', 'sans-serif']
			},

			boxShadow: {
				'sharp-sm': '0 4px 0 0 rgba(0,0,0,0.25)',
				'sharp-lg': '0 8px 0 0 rgba(0,0,0,0.25)'
			},

			boxShadowColor: {
				blue: '#92ABCB'
			},

			colors: {
				white: '#fff',
				blue: {
					DEFAULT: '#BFDBFF',
					shadow: '#92ABCB',
					content: '#2E4E78',
					dark: '#1D2126'
				},
				orange: {
					DEFAULT: '#FFE2BF',
					shadow: '#D1AE80',
					content: '#7A592F'
				},
				gray: {
					DEFAULT: '#373737',
					shadow: '#202020',
					content: '#DDDDDD'
				},
				lightgray: {
					DEFAULT: '#E5E5E5',
					shadow: '#B2B2B2',
					content: '#626262'
				},
				green: {
					vibrant: '#008905',
					border: '#269B2A'
				},
				card: {
					DEFAULT: '#111111'
				},
				tile: {
					DEFAULT: '#1B1B1B',
					border: '#464646'
				}
			},

			borderColor: {
				card: '#1F1F1F'
			},

			borderRadius: {
				xl: '2rem',
				lg: '1.75rem',
				md: '1rem',
				sm: '0.5rem'
			}
		}
	},

	plugins: [typography]
} satisfies Config;
