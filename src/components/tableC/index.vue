<template>
	<div class="q-pa-md">
		<q-table
			:title="title"
			rows-per-page-label="Filas por pagina"
			:dense="dense"
			:data="data"
			row-key="email"
		/>
	</div>
</template>
<script src="./index.ts" lang="ts" />
<style></style>
