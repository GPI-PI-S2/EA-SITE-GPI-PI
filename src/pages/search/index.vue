<template>
	<div class="q-pa-lg row">
		<q-dialog v-model="showDialog">
			<search-analysis
				ref="searchAnalysis"
				:extractor="extractor"
				:metakey="metaKey"
				:style="{ width: '800px', maxWidth: '80vw' }"
			/>
		</q-dialog>
		<div class="col-12 q-pb-md text-h6">
			Explorar Base de Datos
		</div>
		<q-card bordered flat class="col-12 q-mb-md">
			<q-expansion-item expand-separator icon="mdi-filter" label="Filtrar">
				<div class="row">
					<q-separator />
					<div class="col-12 row q-px-md">
						<q-select
							class="col-xs-12 col-md-4"
							borderless
							v-model="extractor"
							:options="extractors"
							label="Extractor"
						/>
						<q-separator v-if="$q.screen.gt.sm" class="q-mx-md" vertical />
						<q-separator v-else />
						<q-input
							v-model="inputMetaKey"
							borderless
							class="col-8"
							debounce="500"
							hide-bottom-space
							:error="metaKeyError"
							:label="metaInput.label"
						>
							<template v-slot:error>
								<div :style="{ marginTop: '-8px', marginBottom: '8px' }">
									{{ metaKeyErrorMsg }}
								</div>
							</template>
							<template v-slot:before>
								<q-icon :name="metaInput.icon" />
							</template>
						</q-input>
						<q-btn
							class="col-auto"
							flat
							style="color: primary"
							@click="onRequest"
							label="Consultar"
						/>
					</div>
				</div>
			</q-expansion-item>
		</q-card>
	</div>
</template>
<script src="./index.ts" lang="ts" />
