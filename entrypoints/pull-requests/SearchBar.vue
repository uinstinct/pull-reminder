<script setup lang="ts">
	const searchInput = defineModel<string>("search", { required: true })
</script>

<template>
	<div class="mb-4">
		<div class="relative">
			<input
				v-model="searchInput"
				type="text"
				placeholder="Search pull requests..."
				class="input pl-10 pr-4 py-2 w-full"
			/>
			<div
				class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
			>
				<svg
					class="h-5 w-5 text-gray-400"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path
						fill-rule="evenodd"
						d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
						clip-rule="evenodd"
					/>
				</svg>
			</div>
		</div>
	</div>
</template>
