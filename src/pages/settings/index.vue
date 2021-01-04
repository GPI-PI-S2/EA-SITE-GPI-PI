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
