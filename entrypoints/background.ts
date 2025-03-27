import axios from "axios"
import * as cheerio from "cheerio"
import { PublicPath } from "wxt/browser"

export default defineBackground(() => {
	browser.action.onClicked.addListener(() => {
		browser.tabs.create({
			url: browser.runtime.getURL("pull-requests.html" as PublicPath)
		})
	})
})
