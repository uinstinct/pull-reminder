<script setup lang="ts">
	const darkMode = ref(true)
	const toggleDarkMode = (dark = darkMode.value) => {
		darkMode.value = !dark
		if (dark) {
			document.documentElement.classList.add("dark")
		} else {
			document.documentElement.classList.remove("dark")
		}
	}

	onMounted(() => {
		const hasDarkPreference = window.matchMedia(
			"(prefers-color-scheme: dark)"
		).matches
		toggleDarkMode(hasDarkPreference)
	})
</script>

<template>
	<button
		@click="() => toggleDarkMode()"
		class="p-2 rounded-full bg-gray-200 dark:bg-gray-700 focus:outline-none"
	>
		<svg
			:class="[darkMode ? 'animate-sunrise' : 'animate-sunset']"
			v-if="darkMode"
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6 text-yellow-400"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
			/>
		</svg>
		<svg
			:class="[darkMode ? 'animate-sunset' : 'animate-sunrise']"
			v-else
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6 text-gray-900"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
			/>
		</svg>
	</button>
</template>

<style scoped>
	@keyframes sunrise {
		0% {
			transform: translateY(20px);
			opacity: 0;
		}
		50% {
			transform: translateY(-10px);
			opacity: 1;
		}
		100% {
			transform: translateY(0);
			opacity: 1;
		}
	}
	.animate-sunrise {
		animation: sunrise 0.5s forwards;
	}
	.animation-sunset {
		animation: sunset 0.5s backwards;
	}
</style>
