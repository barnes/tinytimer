<script lang="ts">
	export let label: string;
	export let disabled: boolean | false;
</script>

<button class="py-4 px-2 text-center bg-green-100 rounded" {disabled} on:click>{label}</button>
