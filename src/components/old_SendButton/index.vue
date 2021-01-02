<template>
	<div>
		<q-btn
			:padding="padding"
			:size="size"
			:loading="isLoading"
			color="secondary"
			@click="simulateProgress(1)"
			:label="label"
		/>
	</div>
</template>
<script src="./index.ts" lang="ts" />
