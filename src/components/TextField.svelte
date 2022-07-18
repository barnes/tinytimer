<script lang="ts">
	export let placeholder: string;
	export let password: boolean | false;
	export let value: string | null;
</script>

{#if password}
	<input type="password" bind:value {placeholder} class="py-4 px-2 bg-gray-200" />
{:else if !password}
	<input type="text" bind:value {placeholder} class="py-4 px-2 bg-gray-200" />
{/if}
