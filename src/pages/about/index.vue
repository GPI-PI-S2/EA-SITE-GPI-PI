<template>
	<div class="q-pa-lg row">
		<div class="col-12 q-pb-md">
			<div class="text-h6">
				Sobre la aplicación y el desarrollo
			</div>
		</div>
		<q-list class="col-12 rounded-borders" bordered separator>
			<q-expansion-item
				v-for="(each, index) in infoExpansion"
				:key="index"
				:icon="each.icon"
				:label="each.title"
				:caption="each.caption"
				group="gpi"
			>
				<div class="q-pl-xl q-pa-md">
					{{ each.cardContent }}
				</div>
			</q-expansion-item>
		</q-list>
	</div>
</template>
<script src="./index.ts" lang="ts" />
<style scoped></style>
