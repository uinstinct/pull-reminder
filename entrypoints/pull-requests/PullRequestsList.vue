<script setup lang="ts">
	import { IPRCollectedData } from "@/utils/fetch-pull-requests"

	defineProps<{
		pullRequests: IPRCollectedData[]
	}>()

	const formatDate = (dateString: string) =>
		new Date(dateString).toLocaleString()

	const getStateColor = (state: string) => {
		console.log('debug1 the state', state)
		
		switch (state) {
			case "Review Required":
				return "bg-yellow-400 text-yellow-800"
			case "Draft":
				return "bg-gray-400 text-gray-800"
			case "Changes Requested":
				return "bg-red-400 text-red-800"
			default:
				return "bg-blue-400 text-blue-800"
		}
	}

	const getStateIcon = (state: string) => {
		switch (state) {
			case "Review required":
				return "👀"
			case "Draft":
				return "🚧"
			case "Changes requested":
				return "🔄"
			default:
				return ""
		}
	}
</script>

<template>
	<ul class="divide-y divide-gray-200 dark:divide-gray-700">
		<li v-for="pr in pullRequests" :key="pr.prNumber" class="py-4">
			<div class="flex items-center space-x-4">
				<div class="flex-shrink-0">
					<span
						:class="[
							'inline-flex items-center justify-center h-8 w-8 rounded-full',
							getStateColor(pr.state)
						]"
					>
						{{ getStateIcon(pr.state) }}
					</span>
				</div>
				<div class="flex-1 min-w-0">
					<a
						:href="pr.link"
						class="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-gray-700 hover:dark:text-gray-300 truncate"
					>
						{{ pr.repoName }}#{{ pr.prNumber }} {{ pr.title }}
					</a>
					<p class="text-sm text-gray-500 dark:text-gray-400 truncate">
						Opened by
						<a
							class="hover:underline"
							:href="'https://github.com/' + pr.author"
							>{{ pr.author }}</a
						>
						on {{ formatDate(pr.openedDate) }}
					</p>
				</div>
				<div>
					<span
						:class="[
							'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
						]"
					>
						{{ pr.state }}
					</span>
				</div>
			</div>
		</li>
	</ul>
</template>
