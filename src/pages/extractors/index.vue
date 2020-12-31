<template>
	<div class="q-pa-lg row">
		<div class="col-12 q-pb-md">
			<div class="text-h6">
				Extractores
			</div>
		</div>
		<div class="col-12 q-pb-md">
			<transition
				appear
				enter-active-class="animated fadeIn"
				leave-active-class="animated fadeOut"
			>
				<q-stepper
					v-model="step"
					ref="stepper"
					class="col-12"
					color="primary"
					flat
					animated
				>
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
								:disable="loading || !canUseExtractor(extractor.id)"
								@click="onClickExtractor(extractor.id)"
							>
								<q-item-section avatar>
									<q-icon
										size="md"
										:color="extractor.color"
										:name="extractor.icon"
									/>
								</q-item-section>
								<q-item-section>
									<q-item-label>
										<span
											:class="
												canUseExtractor(extractor.id)
													? ''
													: 'text-strike q-pr-sm'
											"
											>{{ extractor.name }}</span
										>
										<q-chip
											v-if="!canUseExtractor(extractor.id)"
											dense
											outline
											square
											color="negative"
											text-color="white"
											icon="mdi-alert-circle"
										>
											<span v-if="extractor.id === 'telegram-extractor'"
												>Número de teléfono no establecido</span
											>
											<span v-else-if="extractor.id === 'twitter-extractor'"
												>Api key no establecida</span
											>
											<span v-else-if="extractor.id === 'youtube-extractor'"
												>Api key no establecida</span
											>
										</q-chip>
									</q-item-label>
									<q-item-label caption>v{{ extractor.version }}</q-item-label>
								</q-item-section>
							</q-item>
						</q-list>
					</q-step>
					<q-step
						:name="1"
						title="Búsqueda"
						icon="mdi-magnify-plus-outline"
						:done="step > 1"
					>
						<div v-if="actualId === 'telegram-extractor'" class="row">
							<q-dialog v-if="pending" v-model="alert">
								<q-card>
									<q-card-section>
										<div class="text-h6">Notificación</div>
									</q-card-section>
									<q-card-section class="q-pt-none">
										Hemos enviado un código a tu celular para otorgar acceso a
										la aplicación, ingresa el código a continuación para
										continuar
									</q-card-section>
									<q-card-section>
										<div class="row justify-center q-pa-xs">
											<div>
												<q-icon
													class="elements"
													size="md"
													name="mdi-cellphone"
												/>
											</div>
											<div>
												<q-input
													ico
													dense
													item-aligned
													outlined
													v-model="codeConfirmation"
													placeholder="Código de verificación"
												/>
											</div>
											<div>
												<q-btn
													round
													class="elements"
													color="primary"
													size="md"
													icon="mdi-send"
													@click="onClickExtractor('telegram-extractor')"
												/>
											</div>
										</div>
									</q-card-section>
								</q-card>
							</q-dialog>
							<div v-if="registered" class="col-grow">
								<q-list separator bordered>
									<q-item
										v-for="(chat, index) in chats"
										clickable
										class="q-py-md"
										v-model="metakey"
										:key="index"
										:disable="loading"
										@click="obtainExtractorData()"
									>
										<q-item-section avatar>
											<q-icon size="md" :name="chat.icon" />
										</q-item-section>
										<q-item-section>
											<q-item-label>{{ chat.name }}</q-item-label>
											<q-item-label caption>{{
												chat.type.toUpperCase()
											}}</q-item-label>
										</q-item-section>
									</q-item>
								</q-list>
							</div>
						</div>
						<div v-else-if="actualId == 'youtube-extractor'" class="row">
							<div class="col-10">
								<q-input
									ico
									dense
									item-aligned
									outlined
									v-model="urlYoutube"
									label="Ingrese el url del video a analizar"
								/>
							</div>
							<div class="col-2">
								<q-btn
									:loading="loading"
									round
									class="elements"
									color="primary"
									size="md"
									icon="mdi-send"
									@click="obtainExtractorData()"
								/>
							</div>
						</div>
						<div v-else-if="actualId === 'reddit-extractor'" class="row">
							<div class="col-10">
								<!-- Revisar este caso -->
								<q-input
									ico
									dense
									item-aligned
									outlined
									v-model="metakey"
									label="Ingrese el url del reddit a analizar"
								/>
							</div>
							<div class="col-2">
								<q-btn
									:loading="loading"
									round
									class="elements"
									color="primary"
									size="md"
									icon="mdi-send"
									@click="obtainExtractorData()"
								/>
							</div>
						</div>
						<div v-else-if="actualId == 'twitter-extractor'" class="row">
							<div class="col-10">
								<q-input
									ico
									dense
									item-aligned
									outlined
									v-model="metakey"
									label="Ingrese el Hashtag o término a analizar"
								/>
							</div>
							<div class="col-2">
								<q-btn
									:loading="loading"
									round
									class="elements"
									color="primary"
									size="md"
									icon="mdi-send"
									@click="obtainExtractorData()"
								/>
							</div>
						</div>
						<div v-else-if="actualId == 'emol-extractor'" class="row">
							<div class="col-10">
								<q-input
									ico
									dense
									item-aligned
									outlined
									v-model="metakey"
									label="Ingrese el url de la noticia a analizar"
								/>
							</div>
							<div class="col-2">
								<q-btn
									:loading="loading"
									round
									class="elements"
									color="primary"
									size="md"
									icon="mdi-send"
									@click="obtainExtractorData()"
								/>
							</div>
						</div>
					</q-step>
					<q-step :name="2" title="Resultados" icon="assignment" :done="step > 2">
						<div class="chart-container">
							<chart-c
								class=""
								type="bar"
								:label="dataChart.datasets[0].label"
								:data="dataChart.datasets[0].data"
								:labels="dataChart.labels"
							/>
						</div>

						<div class="row">
							<div
								class="flex flex-center col-12 col-md"
								v-for="(indicator, index) in PromedioFactor"
								:key="index"
							>
								<q-card class="my-card card" flat bordered>
									<q-card-section horizontal>
										<div class="row col-grow">
											<q-card-section class="col-6 q-pt-xs">
												<div class="text-h5 q-mt-sm q-mb-xs">
													{{ indicator.title }}
												</div>
												<div class="text-caption text-grey">
													{{ indicator.subtitle }}
												</div>
											</q-card-section>
											<q-card-section class="col-6 q-pt-xs">
												<h5>{{ indicator.value }}</h5>
											</q-card-section>
										</div>
									</q-card-section>
								</q-card>
							</div>
						</div>
					</q-step>
					<template v-slot:navigation>
						<q-stepper-navigation>
							<q-btn
								v-if="step > 0"
								flat
								color="primary"
								@click="$refs.stepper.previous()"
								label="Volver"
								class="q-ml-sm"
							/>
						</q-stepper-navigation>
					</template>
				</q-stepper>
			</transition>
			<q-inner-loading :showing="loading">
				<h5 class="text-weight-light text-uppercase">Solicitando datos</h5>
				<q-spinner-gears size="xl" color="primary" />
			</q-inner-loading>
		</div>
	</div>
</template>
<script src="./index.ts" lang="ts" />

<style scoped>
.blockBox {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
}
.elements {
	margin: 3px;
}
.card {
	margin: 5px;
	width: 70%;
}
.canvas {
	border: 1px dotted primary;
}
.chart-container {
	position: relative;
	height: 60vh;
	width: 100%;
}
</style>
