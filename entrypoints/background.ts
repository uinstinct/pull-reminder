import { PublicPath } from "wxt/browser"

export default defineBackground(() => {
	console.log("Hello background!", { id: browser.runtime.id })
	const url = browser.runtime.getURL("pull-requests.html" as PublicPath)

	console.log(url)
	browser.action.onClicked.addListener(() => {
		browser.tabs.create({
			url
		})
	})
})
