<template>
	<div class="q-pa-lg row">
		<div class="col-12 q-pb-md">
			<div class="text-h6">Resultados</div>
		</div>
		<div class="col-12 col-grow">
			<q-stepper
				class="col-12 col-md"
				v-model="step"
				ref="stepper"
				color="primary"
				flat
				animated
			>
				<q-step :name="1" title="Seleccionar extractor" icon="settings" :done="step > 1">
					<div class="row justify-center">
						<q-card
							v-for="(extractor, index) in extractor"
							:key="index"
							v-ripple
							flat
							class="my-card col-xs-12 col-md-3 clickable q-hoverable "
							@click="onClickExtractor(extractor.id)"
						>
							<q-img :src="extractor.img" height="185px" width="185px" basic>
								<div class="absolute-bottom text-subtitle2 text-center">
									{{ extractor.name }}
								</div>
							</q-img>
						</q-card>
					</div>
				</q-step>

				<q-step :name="2" title="Resultados" icon="mdi-comment">
					<div class="row justify-center q-pb-5">
						<template v-for="(indicator, index) in PromedioFactor">
							<div
								v-if="indicator.title == 'Indice de inteligencia emocional'"
								class="row col-12 justify-center q-pb-5"
							>
								<q-card :key="index" class="col-md-3 indicator" bordered>
									<div class="row col-grow justify-center">
										<q-card-section class="q-pt-xs">
											<div class="text-h6 text-center">
												{{ indicator.title }}
											</div>
										</q-card-section>
									</div>
									<div class="row col-grow justify-center">
										<q-separator />
										<q-card-section class="q-pt-xs">
											<h5>{{ indicator.value }}</h5>
										</q-card-section>
									</div>
								</q-card>
							</div>
							<div v-else>
								<q-card :key="index" class="col-md-3 indicator" bordered>
									<div class="row col-grow justify-center">
										<q-card-section class="q-pt-xs">
											<div class="text-h6 text-center">
												{{ indicator.title }}
											</div>
										</q-card-section>
									</div>
									<div class="row col-grow justify-center">
										<q-separator />
										<q-card-section class="q-pt-xs">
											<h5>{{ indicator.value }}</h5>
										</q-card-section>
									</div>
								</q-card>
							</div>
						</template>
					</div>

					<div class="chart-container">
						<chart-c
							class=""
							type="bar"
							:label="dataChart.datasets[0].label"
							:data="dataChart.datasets[0].data"
							:labels="dataChart.labels"
						/>
					</div>
				</q-step>
				<template v-slot:navigation>
					<q-stepper-navigation>
						<q-btn
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
						/>
					</q-stepper-navigation>
				</template>
			</q-stepper>
		</div>
	</div>
</template>
<script src="./index.ts" lang="ts" />
<style>
.my-card {
	max-width: 250px;
	max-height: 300px;
	margin: 5px;
}
.indicator {
	width: 100%;
	max-width: 150px;
	margin: 5px;
}
h5 {
	margin: 2px;
}
.chart-container {
	position: relative;
	height: 60vh;
	width: 100%;
}
</style>
