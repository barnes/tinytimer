<script lang="ts">
	export let placeholder: string | number | null;
	export let password: boolean | false;
	export let value: string | number | null;
</script>

{#if password}
	<input type="password" bind:value {placeholder} class="py-4 px-2 bg-gray-200" on:focus />
{:else if !password}
	<input type="text" bind:value {placeholder} class="py-4 px-2 bg-gray-200" on:focus />
{/if}
