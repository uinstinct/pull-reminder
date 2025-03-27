import axios from "axios"
import * as cheerio from "cheerio"

export type PullRequestType = "open" | "closed" | "all"

export interface IPRCollectedData {
	/** in the format of `repo-name/org-name`
	 * @example "https://github.com/org-name/repo-name"
	 */
	repoName: string
	/**@example "my pull request name" */
	title: string
	/**@example "https://github.com/org-name/repo-name/pull/123" */
	link: string
	/**@example "123" */
	prNumber: string
	/**github username
	 * @example "github-author"
	 */
	author: string
	/**ISO Date
	 * @example "2024-10-16T20:51:28Z"
	 */
	openedDate: string
	/**can be `draft`, `changes requested`, `review required`, or an empty string as well
	 * @example "draft"
	 */
	state: string
    /** */
    type: PullRequestType
}

export async function fetchPullRequests() {
	const domainName = "https://github.com"

	// TODO: repeatedly make this request to check if the cookie expires
	return axios
		.get("https://github.com/pulls")
		.then((response) => {
			const prCollectedData: IPRCollectedData[] = []
			const $ = cheerio.load(response.data)

			const $pullRequestDivs = $('div[id^="issue_"]:not([id$="_link"])')

			$pullRequestDivs.each((_i, $pullRequestDiv) => {
				const repoURL = $($pullRequestDiv)
					.find('a[data-hovercard-url][data-hovercard-type="repository"]')
					.attr("href") // "https://github.com/org-name/repo-name"
				if (!repoURL) {
					console.error("[background] could not find repo url")
				}

				const $prData = $($pullRequestDiv).find(
					'a[data-hovercard-url][data-hovercard-type="pull_request"]'
				)
				const prName = $prData.text() // "my pull request name"
				const prLink = $prData.attr("href") // "/org-name/repo-name/pull/123"
				if (!prLink) {
					console.error("[background] could not find pr link")
				}

				const $prAuthor = $($pullRequestDiv).find(
					"a[data-hovercard-type='user']"
				)
				const prAuthor = $prAuthor.text() // "my-pr-author"

				const prOpenedDate = $($pullRequestDiv)
					.find("relative-time")
					.attr("datetime")! // "2024-10-16T20:51:28Z"

				if (!prOpenedDate) {
					console.error("[background] could not find pr opened date")
				}

                console.log('debug1 text was', $($pullRequestDiv)
                .find("a[href*='#partial-pull-merging']")
                .text())

				const prState = $($pullRequestDiv)
					.find("a[href*='#partial-pull-merging']")
					.text()
					.trim() // can be empty string (for example, if reviewers are not set)

				prCollectedData.push({
					repoName: new URL(repoURL!).pathname.slice(1),
					title: prName,
					link: new URL(domainName + prLink).href,
					prNumber: prLink!.split("/").pop()!,
					author: prAuthor,
					openedDate: prOpenedDate,
					state: prState,
                    type: 'open'
				})
			})

			console.debug("[background] pr collected data", prCollectedData)

            return prCollectedData
		})
		.catch((err) => {
			console.error("error when getting github prs", err)
            return []
		})
}
