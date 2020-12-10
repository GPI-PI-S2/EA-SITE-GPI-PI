<template>
	<div class="q-pa-lg row">
		<div class="col-12 q-pb-md">
			<div class="text-h6">
				Estadísticas
			</div>
		</div>
		<div class="col-12 q-pb-md">
			<div class="text-subtitle2 col-12 q-pt-lg q-pb-sm">Contribuciones</div>
			<div class="row q-pa-md">
				<div class="col-12 col-md-10">
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
	</div>
</template>
<script src="./index.ts" lang="ts" />
