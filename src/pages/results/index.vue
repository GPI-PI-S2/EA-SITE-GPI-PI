<template>
	<div class="q-pa-lg row">
		<q-dialog v-model="showDialog">
			<network-analysis
				ref="networkAnalysis"
				:extractor="selectedExtractor"
				:style="{ width: '800px', maxWidth: '80vw' }"
			/>
			<!-- 			<unit-analysis v-model="selectedItem" :style="{ width: '800px', maxWidth: '80vw' }" />
 -->
		</q-dialog>
		<div class="col-12 q-pb-md text-h6">
			Resultados
		</div>
		<q-list separator bordered class="col-12">
			<q-item
				v-for="(extractor, index) in extractors"
				clickable
				class="q-py-md"
				:key="index"
				:disable="loading"
				@click="onClickExtractor(extractor.id)"
			>
				<q-item-section avatar>
					<q-icon size="lg" :color="extractor.color" :name="extractor.icon" />
				</q-item-section>
				<q-item-section>
					<q-item-label class="text-subtitle1">
						{{ extractor.name }}
					</q-item-label>
				</q-item-section>
			</q-item>
		</q-list>
	</div>
</template>
<script src="./index.ts" lang="ts" />
