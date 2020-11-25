<template>
	<div class="q-pa-md col-grow">
		<div class="row">
			<div class="text-h6 q-pa-xs">Sobre la aplicación y el desarrollo</div>
		</div>
		<div class="row col-grow justify-center">
			<div class="col-10">
				<q-card class="cardInfo">
					<q-list class="rounded-borders">
						<q-expansion-item
							v-for="(each, index) in infoExpansion"
							:key="index"
							:icon="each.icon"
							:label="each.title"
							:caption="each.caption"
						>
							<q-card-section class="textCard">
								{{ each.cardContent }}
							</q-card-section>
						</q-expansion-item>
					</q-list>
				</q-card>
			</div>
		</div>
	</div>
</template>
<script src="./index.ts" lang="ts" />
<style>
.cardInfo {
	max-width: 100%;
	overflow: auto;
}
/* .textCard {
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
} */
</style>
