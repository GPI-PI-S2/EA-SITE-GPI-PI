<template>
	<div>
		<q-select
			filled
			v-model="model"
			:options="options"
			:label="label"
			stack-label
			:dense="dense"
			:options-dense="denseOpts"
			@input="emmitModel"
		/>
	</div>
</template>
<script src="./index.ts" lang="ts" />
