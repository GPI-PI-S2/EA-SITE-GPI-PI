<template>
	<div class="q-pa-lg row">
		<div class="col-12 q-pb-md">
			<div class="text-h6">
				Extractores
			</div>
		</div>
		<q-stepper v-model="step" class="col-12" color="primary" flat animated>
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
						:disable="loading"
						@click="onClickExtractor(extractor.id)"
					>
						<q-item-section avatar>
							<q-icon size="md" :color="extractor.color" :name="extractor.icon" />
						</q-item-section>
						<q-item-section>
							<q-item-label>{{ extractor.name }}</q-item-label>
							<q-item-label caption>v{{ extractor.version }}</q-item-label>
						</q-item-section>
					</q-item>
				</q-list>
			</q-step>
			<q-step :name="1" title="Búsqueda" icon="mdi-magnify-plus-outline" :done="step > 1">
				<div v-if="actualId == 0" class="row">
					<q-dialog v-if="!registered" v-model="alert">
						<q-card>
							<q-card-section>
								<div class="text-h6">Notificación</div>
							</q-card-section>
							<q-card-section class="q-pt-none">
								Hemos enviado un código a tu celular para otorgar acceso a la
								aplicación, ingresa el código a continuación para continuar
							</q-card-section>
							<q-card-section>
								<div class="row justify-center q-pa-xs">
									<div>
										<q-icon class="elements" size="md" name="mdi-cellphone" />
									</div>
									<div>
										<InputC class="elements" :dense="true" label="Código" />
									</div>
									<div>
										<q-btn
											:loading="loading"
											round
											class="elements"
											color="primary"
											size="md"
											icon="mdi-send"
											@click="onclickTelegram(2)"
										/>
									</div>
								</div>
							</q-card-section>
							<!-- <q-card-actions align="right">
								<q-btn flat label="OK" color="primary" v-close-popup />
							</q-card-actions> -->
						</q-card>
					</q-dialog>
					<div class="col-grow">
						<q-list separator bordered>
							<q-item
								v-for="(chat, index) in chats"
								clickable
								class="q-py-md"
								:key="index"
								:disable="loading"
								@click="onClickChat(chat.id)"
							>
								<q-item-section avatar>
									<q-icon size="md" :name="chat.icon" />
								</q-item-section>
								<q-item-section>
									<q-item-label>{{ chat.name }}</q-item-label>
									<q-item-label caption
										>{{ chat.comments }} comentarios</q-item-label
									>
								</q-item-section>
							</q-item>
						</q-list>
					</div>
				</div>
				<div v-else-if="actualId == 1" class="row">
					<div class="col-10">
						<InputC :dense="true" :label="extractors[actualId].label" />
					</div>
					<div class="col-2">
						<q-btn
							:loading="loading"
							round
							class="elements"
							color="primary"
							size="md"
							icon="mdi-send"
							@click="onSendYoutube()"
						/>
					</div>
				</div>
				<div v-else-if="actualId == 2" class="row">
					<div class="col-10">
						<InputC :dense="true" :label="extractors[actualId].label" />
					</div>
					<div class="col-2">
						<q-btn
							:loading="loading"
							round
							class="elements"
							color="primary"
							size="md"
							icon="mdi-send"
							@click="onSendReddit()"
						/>
					</div>
				</div>
				<div v-else-if="actualId == 3" class="row">
					<div class="col-10">
						<InputC :dense="true" :label="extractors[actualId].label" />
					</div>
					<div class="col-2">
						<q-btn
							:loading="loading"
							round
							class="elements"
							color="primary"
							size="md"
							icon="mdi-send"
							@click="onSendTwitter()"
						/>
					</div>
				</div>
				<div v-else-if="actualId == 4" class="row">
					<div class="col-10">
						<InputC :dense="true" :label="extractors[actualId].label" />
					</div>
					<div class="col-2">
						<q-btn
							:loading="loading"
							round
							class="elements"
							color="primary"
							size="md"
							icon="mdi-send"
							@click="onSendEmol()"
						/>
					</div>
				</div>
				<q-btn color="primary" label="botón temporal para volver" @click="step = 0" />
			</q-step>
			<q-step :name="2" title="Resultados" icon="assignment" :done="step > 2">
				<div class="row col-grow">
					<div class="col-1"></div>
					<div class="col-10">
						<ChartC
							type="bar"
							:label="dataChart.datasets[0].label"
							:data="dataChart.datasets[0].data"
							:labels="dataChart.labels"
						/>
					</div>
				</div>
				<div class="row">
					<div v-for="(indicator, index) in PromedioFactor" :key="index" class="col-6">
						<q-card class="my-card card" flat bordered>
							<q-card-section horizontal>
								<div class="col-7">
									<q-card-section class="q-pt-xs">
										<div class="text-h5 q-mt-sm q-mb-xs">
											{{ indicator.title }}
										</div>
										<div class="text-caption text-grey">
											{{ indicator.subtitle }}
										</div>
									</q-card-section>
								</div>
								<div class="col-5 rounded-borders">
									<q-card-section class="flex flex-center">
										<h5>{{ indicator.value }}</h5>
									</q-card-section>
								</div>
							</q-card-section>
						</q-card>
					</div>
				</div>
			</q-step>
		</q-stepper>
	</div>
</template>
<script src="./index.ts" lang="ts" />
<style>
.elements {
	margin: 3px;
}
.card {
	margin: 5px;
}
</style>
