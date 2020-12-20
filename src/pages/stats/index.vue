<template>
	<div class="q-pa-lg row">
		<div class="col-12 q-pb-md">
			<div class="text-h6">
				Estadísticas
			</div>
		</div>
		<div class="col-12 text-subtitle2 q-pt-md q-pb-sm">Contribuciones</div>
		<div class="col-12 q-pb-md">
			<div class="row q-pa-md">
				<div class="col-12">
					<transition
						appear
						enter-active-class="animated fadeIn"
						leave-active-class="animated fadeOut"
					>
						<tableC
							class="center"
							stretch
							v-show="!isLoading"
							:loading="isLoading"
							:dense="true"
							title="Tabla de contribuciones"
							:data="realData"
						/>
					</transition>
					<q-inner-loading :showing="isLoading">
						<h5 class="text-weight-light text-uppercase">Solicitando datos</h5>
						<q-spinner-gears size="xl" color="primary" />
					</q-inner-loading>
				</div>
			</div>
		</div>
		<div class="col-12 text-subtitle2 q-pt-md q-pb-sm">Detalle por extractor</div>
		<div class="chart-container">
			<chart-c
				class=""
				v-if="!isLoadingChart"
				type="pie"
				:data="dataChart.datasets[0].data"
				:labels="dataChart.labels"
			/>
		</div>
	</div>
</template>
<script src="./index.ts" lang="ts" />
<style>
.chart-container {
	position: relative;
	height: 60vh;
	width: 100%;
}
</style>
