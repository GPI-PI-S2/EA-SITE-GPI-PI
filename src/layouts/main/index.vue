<template>
	<q-layout view="hHr lpR lFr" class="bg-grey-2">
		<q-page-container class="row justify-center q-pt-xl q-px-xl ">
			<q-card
				flat
				bordered
				:style="{ width: '1200px', maxWidth: '1200px', minHeight: '600px' }"
			>
				<div class="column full-height">
					<div class="col-grow row no-wrap">
						<q-list separator class="col-2" :style="{ width: menuWidth }">
							<q-item
								clickable
								v-ripple
								v-for="(item, index) in items"
								:key="index"
								:to="item.to"
							>
								<template v-if="!$q.screen.lt.md">
									<q-item-section avatar>
										<q-icon :name="item.icon" />
									</q-item-section>
									<q-item-section>
										<q-item-label>{{ item.name }}</q-item-label>
									</q-item-section>
								</template>
								<template v-else>
									<q-item-section>
										<q-icon size="sm" :name="item.icon" />
									</q-item-section>
								</template>
							</q-item>
						</q-list>
						<q-separator vertical />
						<div
							class="col-grow"
							:style="{ width: `calc(99% - ${menuWidth})`, position: 'relative' }"
						>
							<q-inner-loading :showing="loader.show" :style="{ zIndex: '1' }">
								<h5 class="text-weight-light text-uppercase">
									{{ loader.message }}
								</h5>
								<q-spinner-gears size="xl" color="primary" />
							</q-inner-loading>

							<router-view v-show="!loader.show" />
						</div>
					</div>
					<div class="row">
						<q-separator />
						<div
							class="col-grow q-py-lg q-pl-lg row justify-start content-center text-caption"
						>
							<div class="col-12">GESTION DE PROYECTOS INFORMÁTICOS</div>
							<div class="col-12">PROYECTO DE INVESTIGACIÓN</div>
						</div>
						<div class="q-py-lg q-pr-lg row justify-end content-center">
							<div class="row col-shrink q-pr-md">
								<q-img width="50px" :src="utem" contain :ratio="1" />
							</div>
							<div class="text-caption">
								<div>UNIVERSIDAD TECNOLÓGICA METROPOLITANA</div>
								<div>FACULTAD DE INGENIERÍA</div>
								<div>DEPARTAMENTO DE INFORMÁTICA Y COMPUTACIÓN</div>
							</div>
						</div>
					</div>
				</div>
			</q-card>
		</q-page-container>
	</q-layout>
</template>
<script src="./index.ts" lang="ts" />
<style>
.mainBg {
	background: url('~assets/bg.jpeg') !important;
	background-repeat: no-repeat !important;
	background-size: auto !important;
}
</style>
