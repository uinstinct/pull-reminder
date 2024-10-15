import axios from "axios"

export type PullRequestType = "open" | "closed" | "all"

export interface IPullRequest {
	id: number
	number: number
	title: string
	state: "open" | "closed"
	user: {
		login: string
	}
	created_at: string
}

export const fetchPullRequests = async ({
	state,
	currentPage,
	itemsPerPage = 10,
	searchQuery
}: {
	state: PullRequestType
	currentPage: number
	itemsPerPage?: number
	searchQuery: string
}) => {
	const response = await axios.get(
		"https://api.github.com/repos/vuejs/core/pulls",
		{
			params: {
				state,
				page: currentPage,
				per_page: itemsPerPage,
				q: searchQuery
			}
		}
	)
	return {
		pullRequests: response.data as IPullRequest[],
		totalItems: parseInt(response.headers["x-total-count"] || "0", 10)
	}
}
