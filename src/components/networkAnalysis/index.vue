<template>
	<q-card flat :style="{ minHeight: '720px' }">
		<q-inner-loading :showing="loading" :style="{ zIndex: '1' }">
			<h5 class="text-weight-light text-uppercase">Cargando</h5>
			<q-spinner-gears size="xl" color="primary" />
		</q-inner-loading>
		<div class="row q-pa-md q-col-gutter-sm">
			<div class="col-12 q-pb-xs text-h6">
				Detalles
			</div>
			<div class="row content-start col-xs-12 col-md-8">
				<q-card flat bordered class="col-12 q-mb-xs">
					<div class="row justify-center content-center full-height">
						<div class="text-center">
							<div class="text-h5 ">{{ IE }}%</div>
							<div
								class="text-caption
"
							>
								Inteligencia Emocional
							</div>
						</div>
					</div>
				</q-card>
				<div class="col-6 q-my-xs q-pr-xs">
					<q-card flat bordered>
						<div class="row justify-center content-center full-height">
							<div class="text-center">
								<div
									class="text-h6 text-weight-regular
"
								>
									{{ PEC }}%
								</div>
								<div
									class="text-caption
"
								>
									Capital Emocional
								</div>
							</div>
						</div>
					</q-card>
				</div>
				<div class="col-6 q-my-xs q-pl-xs">
					<q-card flat bordered>
						<div class="row justify-center content-center full-height">
							<div class="text-center">
								<div
									class="text-h6 text-weight-regular
"
								>
									{{ SEC }}%
								</div>
								<div
									class="text-caption
"
								>
									Capital Relacional
								</div>
							</div>
						</div>
					</q-card>
				</div>
				<div class="col-3 q-my-xs q-pr-xs">
					<q-card flat bordered>
						<div class="row justify-center content-center full-height">
							<div class="text-center">
								<div class="text-subtitle1">{{ CE }}%</div>
								<div
									class="text-caption
"
								>
									Autoconciencia Emocional
								</div>
							</div>
						</div>
					</q-card>
				</div>
				<div class="col-3 q-my-xs q-px-xs">
					<q-card flat bordered>
						<div class="row justify-center content-center full-height">
							<div class="text-center">
								<div class="text-subtitle1">{{ AE }}%</div>
								<div
									class="text-caption
"
								>
									Autorregulación Emocional
								</div>
							</div>
						</div>
					</q-card>
				</div>
				<div class="col-3 q-my-xs q-px-xs">
					<q-card flat bordered>
						<div class="row justify-center content-center full-height">
							<div class="text-center">
								<div class="text-subtitle1">{{ CS }}%</div>
								<div
									class="text-caption
"
								>
									Conciencia Emocional Social
								</div>
							</div>
						</div>
					</q-card>
				</div>
				<div class="col-3 q-my-xs q-pl-xs">
					<q-card flat bordered>
						<div class="row justify-center content-center full-height">
							<div class="text-center">
								<div class="text-subtitle1">{{ RS }}%</div>
								<div
									class="text-caption
"
								>
									Regulación Emocional Social
								</div>
							</div>
						</div>
					</q-card>
				</div>
				<q-card flat bordered class="col-12 q-mt-xs q-pa-md">
					<bar-chart
						ref="barChart"
						width="100%"
						height="400px"
						:data="chartData.data"
						:labels="chartData.labels"
						:colors="[]"
					/>
				</q-card>
			</div>
			<div class="col-xs-12 col-md-4">
				<q-list bordered class="rounded-borders" separator>
					<q-item>
						<q-item-section side
							><q-icon :color="prettyExtractor.color" :name="prettyExtractor.icon"
						/></q-item-section>
						<q-item-section>
							<q-item-label caption>Fuente</q-item-label>
							<q-item-label>{{ prettyExtractor.name }}</q-item-label>
						</q-item-section>
					</q-item>
					<q-item>
						<q-item-section side><q-icon name="mdi-database"/></q-item-section>
						<q-item-section>
							<q-item-label caption>Comentarios analizados</q-item-label>
							<q-item-label>{{ totalDB }}</q-item-label>
						</q-item-section>
					</q-item>
				</q-list>
				<q-table
					bordered
					flat
					class="q-my-sm"
					row-key="name"
					:data="analysis"
					:columns="columns"
					:rows-per-page-options="[5]"
				>
					<template v-slot:body-cell-name="props">
						<q-td :props="props" :style="{ maxWidth: '150px', whiteSpace: 'normal' }">
							{{ props.value }}
						</q-td>
					</template>
					<template v-slot:body-cell-value="props">
						<q-td :props="props"> {{ props.value }}% </q-td>
					</template>
				</q-table>
			</div>
		</div>
	</q-card>
</template>
<script src="./index.ts" lang="ts" />
