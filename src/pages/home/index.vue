<template>
	<div class="q-pa-md col-grow">
		<div style="margin-bottom:20px" class="row">
			<div class="text-h6">Pagina principal</div>
		</div>
		<div class="row col-grow">
			<q-stepper class="col" v-model="step" ref="stepper" color="primary" animated>
				<q-step
					:name="1"
					title="Extractor"
					icon="mdi-checkbox-intermediate"
					:done="step > 1"
				>
					<div class="row">
						<div v-for="(ext, index) in extractors" class="col-4">
							<cardC
								:src="ext.img"
								:buttons="[{ color: ext.color, icon: 'mdi-play-circle' }]"
							/>
						</div>
					</div>
				</q-step>
				<q-step :name="2" title="Búsqueda" icon="mdi-magnify-plus-outline" :done="step > 2">
					An ad group contains one or more ads which target a shared set of keywords.
				</q-step>

				<q-step :name="3" title="Resultados" icon="assignment" disable>
					This step won't show up because it is disabled.
				</q-step>
				<template v-slot:navigation>
					<q-stepper-navigation>
						<!-- <q-btn
							@click="$refs.stepper.next()"
							color="primary"
							:label="step === 4 ? 'Finish' : 'Continue'"
						/>
						<q-btn
							v-if="step > 1"
							flat
							color="primary"
							@click="$refs.stepper.previous()"
							label="Back"
							class="q-ml-sm"
						/> -->
					</q-stepper-navigation>
				</template>
			</q-stepper>
		</div>
	</div>

	<!-- <div class="col-12">
		<h6>Análisis de sentimientos GPI</h6>
		<div class="row q-pa-md">
			<div class="element col-6">
				<InputC :dense="false" label="Ingrese texto" />
			</div>
			<div class="element col-3">
				<SelectC
					label="Extractor"
					:options="['Emol', 'Twitter', 'Reddit', 'Telegram', 'YouTube']"
					:denseOpts="true"
					@selectModel="selectModelUpdate"
				/>
			</div>
			<div class="element col-2">
				<SendButton size="md" label="Enviar" />
			</div>
		</div>
		<div v-show="showTelegram" class="row q-pa-md">
			<div class="col-4">
				a
			</div>
			<div class="col-4">
				a
			</div>
			<div class="col-4">
				a
			</div>
		</div>
		<div class="row q-pa-md">
			<div class="col-4">
				HOLA
			</div>
			<div class="col-4">
				HOLA 2
			</div>
			<div class="col-4">
				HOLA 3
			</div>
		</div>
	</div> -->
</template>
<script src="./index.ts" lang="ts" />

<style>
h6 {
	padding: 10px;
	margin: 10px;
	/* margin: 10px; */
}
.element {
	margin: 3px;
	/* padding: 2px; */
}
.my-card {
	margin: 8px;
	width: 80%;
	max-width: 250px;
}
</style>
