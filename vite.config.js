import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const serverUrl = 'http://192.168.1.32:8187'
// const serverUrl = 'http://123.206.83.233:8187'
const api = ['/sign_in', '/logout', '/entry', '/user', '/logicData', '/gameConfig', '/robot', '/load_global']
let proxyArr = {}
api.forEach(item => {
	proxyArr[item] = serverUrl
})

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue({
			refTransform: true
		}),
		Components({
			resolvers: [ElementPlusResolver()]
		})
	],
	resolve: {
		host: '0.0.0.0',
		alias: {
		  '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
		}
	},
	server: {
		proxy: proxyArr
	},
})
