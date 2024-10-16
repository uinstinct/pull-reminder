<script setup lang="ts">
	import { PullRequestType } from "@/utils/fetch-data"

	defineProps<{
		activeTab: PullRequestType
	}>()

	const emit = defineEmits<{ tabChange: [tab: PullRequestType] }>()

	const tabs: { name: string; value: PullRequestType }[] = [
		{ name: "All", value: "all" },
		{ name: "Open", value: "open" },
		{ name: "Closed", value: "closed" }
	]

	const handleTabChange = (tab: PullRequestType) => {
		emit("tabChange", tab)
	}
</script>

<template>
	<div class="mb-4">
		<nav class="flex space-x-4" aria-label="Tabs">
			<button
				v-for="tab in tabs"
				:key="tab.value"
				@click="handleTabChange(tab.value)"
				:class="[
					'px-3 py-2 font-medium text-sm rounded-md',
					activeTab === tab.value
						? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
						: 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
				]"
			>
				{{ tab.name }}
			</button>
		</nav>
	</div>
</template>
