<script setup lang="ts">
	import {
		fetchPullRequests,
		IPRCollectedData,
		PullRequestType
	} from "@/utils/fetch-pull-requests"
	import DarkModeToggle from "./DarkModeToggle.vue"
	import Loader from "./Loader.vue"
	import PullRequestsList from "./PullRequestsList.vue"
	import SearchBar from "./SearchBar.vue"
	import TabNavigation from "./TabNavigation.vue"

	const activeTab = ref<PullRequestType>("all")
	const currentPage = ref(0)
	const search = ref("")
	const error = ref("")
	const loading = ref(false)
	const pullRequests = ref<IPRCollectedData[]>([])

	const fetchData = () => {
		loading.value = true
		error.value = ""
		fetchPullRequests()
			.then((data) => {
				pullRequests.value = data
			})
			.catch((err) => {
				error.value = err.message
			})
			.finally(() => (loading.value = false))
	}

	const handleTabChange = (tab: PullRequestType) => {
		activeTab.value = tab
		currentPage.value = 0
		fetchData()
	}

	onMounted(fetchData)
</script>

<template>
	<main class="min-h-screen p-8 relative">
		<div class="absolute top-4 right-4">
			<DarkModeToggle />
		</div>
		<div class="max-w-4xl mx-auto mt-12">
			<div class="mb-8">
				<h1 class="text-3xl font-bold text-center">Pull Requests</h1>
			</div>
			<TabNavigation :activeTab="activeTab" @tabChange="handleTabChange" />
			<SearchBar v-model:search="search" />
			<div
				v-if="error"
				class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
				role="alert"
			>
				<span class="block sm:inline">{{ error }}</span>
			</div>
			<Loader v-if="loading" />
			<PullRequestsList v-else :pullRequests="pullRequests" />
		</div>
	</main>
</template>
