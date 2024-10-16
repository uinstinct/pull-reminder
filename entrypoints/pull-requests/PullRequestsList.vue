<script setup lang="ts">
	import { IPullRequest } from "@/utils/fetch-data"

	defineProps<{
		pullRequests: IPullRequest[]
	}>()

	const formatDate = (dateString: string) =>
		new Date(dateString).toLocaleDateString()
</script>

<template>
	<ul class="divide-y divide-gray-200 dark:divide-gray-700">
		<li v-for="pr in pullRequests" :key="pr.id" class="py-4">
			<div class="flex items-center space-x-4">
				<div class="flex-shrink-0">
					<span
						:class="[
							'inline-block h-3 w-3 rounded-full',
							pr.state === 'open' ? 'bg-green-400' : 'bg-purple-400'
						]"
					></span>
				</div>
				<div class="flex-1 min-w-0">
					<p
						class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate"
					>
						#{{ pr.number }} {{ pr.title }}
					</p>
					<p class="text-sm text-gray-500 dark:text-gray-400 truncate">
						Opened by {{ pr.user.login }} on {{ formatDate(pr.created_at) }}
					</p>
				</div>
				<div>
					<span
						:class="[
							'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
							pr.state === 'open'
								? 'bg-green-100 text-green-800'
								: 'bg-purple-100 text-purple-800'
						]"
					>
						{{ pr.state }}
					</span>
				</div>
			</div>
		</li>
	</ul>
</template>
