<template>
	<div class="q-pa-lg row">
		<div class="col-12 q-pb-md">
			<div class="text-h6">
				Database page
			</div>
		</div>
		<div class="col-12 q-pb-md">
			<div class="row q-pa-md">
				<div class="col-12">
					<transition
						appear
						enter-active-class="animated fadeIn"
						leave-active-class="animated fadeOut"
					>
						<q-table
							title="Comentarios en la base de datos"
							:data="realData"
							:columns="columns"
							:rows-per-page-options="[5, 10, 15, 20]"
							row-key="_id"
							:pagination.sync="pagination"
							:loading="isLoading"
							:filter="filter"
							@request="onRequest"
							binary-state-sort
						>
							<template v-slot:body-cell-action="props">
								<q-td :props="props">
									<q-btn
										dense
										outline
										color="primary"
										@click="onClickComment(props)"
										icon="mdi-google-analytics"
										label="Analisis"
									></q-btn>
								</q-td>
							</template>
							<template v-slot:top-right>
								<q-select
									v-model="selectModel"
									:options="selectOptions"
									default="all"
									map-options
									option-value="id"
									option-label="name"
									emit-value
									label="Extractor"
									style="min-width: 150px; max-width: 300px"
								/>
							</template>
						</q-table>
					</transition>
					<q-inner-loading :showing="isLoading">
						<h5 class="text-weight-light text-uppercase">Solicitando datos</h5>
						<q-spinner-gears size="xl" color="primary" />
					</q-inner-loading>
				</div>
			</div>
		</div>
		<div class="q-pa-md q-gutter-sm">
			<q-dialog
				v-model="dialog"
				persistent
				:maximized="maximizedToggle"
				transition-show="slide-up"
				transition-hide="slide-down"
			>
				<q-card class="">
					<q-bar>
						<q-space />

						<q-btn
							dense
							flat
							icon="minimize"
							@click="maximizedToggle = false"
							:disable="!maximizedToggle"
						>
							<q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary"
								>Minimize</q-tooltip
							>
						</q-btn>
						<q-btn
							dense
							flat
							icon="crop_square"
							@click="maximizedToggle = true"
							:disable="maximizedToggle"
						>
							<q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary"
								>Maximize</q-tooltip
							>
						</q-btn>
						<q-btn dense flat icon="close" v-close-popup>
							<q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
						</q-btn>
					</q-bar>

					<q-card-section>
						<div class="text-h6">Detalle de comentario</div>
					</q-card-section>

					<q-card-section class="q-pt-none">
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
					</q-card-section>
					<q-card-section class="q-pt-lg">
						<div class="detail-container col-grow">
							<chart-c
								class=""
								type="bar"
								:label="dataChart.datasets[0].label"
								:data="dataChart.datasets[0].data"
								:labels="dataChart.labels"
							/>
						</div>
					</q-card-section>
				</q-card>
			</q-dialog>
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
.detail-container {
	position: justify-center;
	height: 60vh;
	width: 60%;
	margin-left: 20%;
}
</style>
