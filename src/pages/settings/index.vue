<template>
	<div class="q-pa-lg row">
		<div class="col-12 q-pb-md">
			<div class="text-h6">
				Ajustes
			</div>
		</div>
		<div class="col-12 text-subtitle2 q-pt-md q-pb-sm">Extractores</div>
		<div class="col-12 row">
			<div class="col-12 row content-center text-body2 col-sm-3">
				<div><q-icon size="sm" left name="mdi-youtube" /> Youtube Api key</div>
			</div>
			<div class="col-grow">
				<q-input
					ico
					dense
					item-aligned
					outlined
					v-model="apiKeyYoutube"
					maxlength="250"
					placeholder="Api key"
				>
					<template v-slot:prepend>
						<q-icon size="xs" name="mdi-key" />
					</template>
				</q-input>
			</div>
		</div>
		<div class="col-12 row">
			<div class="col-12 row content-center text-body2 col-sm-3">
				<div><q-icon size="sm" left name="mdi-twitter" /> Twitter Api key</div>
			</div>
			<div class="col-grow">
				<q-input
					ico
					dense
					item-aligned
					outlined
					v-model="apiKeyTwitter"
					maxlength="250"
					placeholder="Api key"
				>
					<template v-slot:prepend>
						<q-icon size="xs" name="mdi-key" />
					</template>
				</q-input>
			</div>
		</div>
		<div class="col-12 row">
			<div class="col-12 row content-center text-body2 col-sm-3">
				<div><q-icon size="sm" left name="mdi-telegram" /> Número de teléfono</div>
			</div>
			<div class="col-grow">
				<q-input
					ico
					dense
					item-aligned
					outlined
					v-model="phoneNumber"
					placeholder="Número de teléfono"
					mask="+## # #### ####"
				>
					<template v-slot:prepend>
						<q-icon size="xs" name="mdi-phone-dial" />
					</template>
				</q-input>
			</div>
		</div>
		<div class="col-12 text-subtitle2 q-pt-md q-pb-sm">General</div>
		<div class="col-12 row">
			<div class="col-12 row content-center text-body2 col-sm-3">
				<div>
					<div>Límite de extracción</div>
					<div class="text-caption text-grey-8">
						Cantidad máxima de contenido a extraer
					</div>
				</div>
			</div>
			<div class="col-grow row content-center q-pr-md">
				<div class="col-2 text-grey-10 text-center">{{ limitComments }}</div>
				<q-slider
					v-model="limitComments"
					class="col-10"
					:min="1"
					:max="1000"
					color="primary"
				/>
			</div>
		</div>
		<!-- <q-list padding class="col-12">
			<q-item>
				<q-item-section side>
					<div>
						<q-icon left name="mdi-youtube" />
						Youtube API Key
					</div>
				</q-item-section>
				<q-item-section>
					<q-input dense item-aligned outlined v-model="apiKeyYoutube" label="API key" />
				</q-item-section>
			</q-item>
		</q-list> -->
		<!-- 	<div class="col-12">
			<div class="items col-6" v-for="(extractor, index) in items" :key="index">
				<div class="row">
					<div class="col-2">
						<q-icon class="icon" size="lg" :name="extractor.icon"></q-icon>
					</div>
					<div class="col-auto">
						<h6>{{ extractor.title }}</h6>
					</div>
				</div>
				<div class="q-pa-xs">
					<div v-for="(input, index) in extractor.content" :key="index">
						<div style="align-content:center" class="row">
							<div class="icon col-1">
								<q-icon size="md" :name="input.icon" />
							</div>
							<div v-if="extractor.title != 'General'" class="col-10">
								<input-c
									:dense="true"
									class="inputClass col-10"
									:label="input.label"
								/>
							</div>
							<div v-else-if="extractor.title == 'General'" class="col-10">
								<div class="q-pa-md">
									<q-slider
										v-model="value"
										:min="0"
										:max="1000"
										:step="4"
										label
										:label-value="'Comentarios: ' + value + ''"
										label-always
										color="primary"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-6">
				<div class="row">
					<div class="col-2">
						<q-icon class="icon" size="lg" :name="telegram.icon"></q-icon>
					</div>
					<div class="col-auto">
						<h6>{{ telegram.title }}</h6>
					</div>
				</div>
				<div class="q-pa-xs">
					<div class="row">
						<div class="icon col-1">
							<q-icon size="md" name="mdi-cellphone" />
						</div>
						<div class="col-2">
							<SelectC
								class="inputClass"
								:dense="true"
								:options="options"
								:denseOpts="true"
							/>
						</div>
						<div class="col-5">
							<input-c class="inputClass" :dense="true" label="Numero" />
						</div>
						<div class="col-4 q-pa-xs">
							<q-btn
								align="around"
								class="btn-fixed-width"
								size="md"
								color="primary"
								label="Guardar"
								icon="mdi-content-save"
							/>
						</div>
					</div>
				</div>
			</div>
		</div> -->
	</div>
</template>
<script src="./index.ts" lang="ts" />
<style scopped>
.inputClass {
	padding: 4px;
}
.cards {
	margin-bottom: 20px;
}
</style>
