<script setup lang="ts">
	const { size = 256 } = defineProps<{ size?: number }>()
</script>

<template>
	<div
		role="loader"
		class="flex justify-center items-center"
		:style="{ height: `${size}px` }"
	>
		<div
			class="animate-spin rounded-full border-b-2 border-gray-900 dark:border-blue-600"
			:style="{ height: `${size / 2}px`, width: `${size / 2}px` }"
		></div>
	</div>
</template>
