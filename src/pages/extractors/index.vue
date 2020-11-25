<template>
	<div class="q-pa-lg row">
		<div class="col-12 q-pb-md">
			<div class="text-h6">
				Extractores
			</div>
		</div>
		<q-stepper v-model="step" class="col-12" color="primary" flat animated>
			<q-step
				:name="0"
				title="Seleccionar extractor"
				icon="mdi-checkbox-intermediate"
				:done="step > 0"
			>
				<q-list separator bordered>
					<q-item
						v-for="(extractor, index) in extractors"
						clickable
						class="q-py-md"
						:key="index"
						:disable="loading"
						@click="onClickExtractor(extractor.id)"
					>
						<q-item-section avatar>
							<q-icon size="md" :color="extractor.color" :name="extractor.icon" />
						</q-item-section>
						<q-item-section>
							<q-item-label>{{ extractor.name }}</q-item-label>
							<q-item-label caption>v{{ extractor.version }}</q-item-label>
						</q-item-section>
					</q-item>
				</q-list>
			</q-step>
			<q-step :name="1" title="Búsqueda" icon="mdi-magnify-plus-outline" :done="step > 1">
				<q-btn color="primary" label="botón temporal para volver" @click="step = 0" />
			</q-step>
			<q-step :name="2" title="Resultados" icon="assignment" :done="step > 2">
				c
			</q-step>
		</q-stepper>
	</div>
</template>
<script src="./index.ts" lang="ts" />
