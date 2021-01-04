<template>
	<div class="q-pa-lg row">
		<q-dialog v-model="showDialog">
			<unit-analysis v-model="selectedItem" :style="{ width: '800px', maxWidth: '80vw' }" />
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
							class="col-grow"
							debounce="500"
							hide-bottom-space
							:error="metaKeyError"
							:label="metaInput.label"
							:disable="extractor == 'todos'"
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
					</div>
				</div>
			</q-expansion-item>
		</q-card>
		<q-table
			flat
			bordered
			row-key="_id"
			binary-state-sort
			class="col-12"
			:grid="$q.screen.lt.md"
			:pagination.sync="pagination"
			:loading="loadingTable"
			:data="data"
			:columns="columns"
			@request="onRequest"
		>
			<template v-slot:body-cell-comment="props">
				<q-td :props="props" :style="{ maxWidth: '200px', whiteSpace: 'normal' }">
					{{ props.value }}
				</q-td>
			</template>
			<template v-slot:body-cell-_id="props">
				<q-td :props="props">
					<q-btn
						dense
						outline
						color="primary"
						size="sm"
						@click="onClickComment(props.row)"
						icon="mdi-google-analytics"
						label="Análisis"
					></q-btn>
				</q-td>
			</template>
		</q-table>
	</div>
</template>
<script src="./index.ts" lang="ts" />
