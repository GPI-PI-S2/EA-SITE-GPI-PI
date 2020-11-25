<template>
	<div class="q-pa-lg col-grow">
		<q-card class="cards">
			<q-parallax src="https://cdn.quasar.dev/img/parallax1.jpg" :height="90" />
			<div class="absolute-bottom text-subtitle2 text-center">
				Configuración de la aplicación
			</div>
		</q-card>
		<div style="position:absolute" class="row col-grow">
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
							<div class="col-10">
								<InputC
									:dense="true"
									class="inputClass col-10"
									:label="input.label"
								/>
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
						<div class="col-3">
							<SelectC
								class="inputClass"
								:dense="true"
								:options="options"
								:denseOpts="true"
							/>
						</div>
						<div class="col-7">
							<InputC class="inputClass" :dense="true" label="Numero" />
						</div>
					</div>
					<div v-for="(select, index) in telegram.items" :key="index">
						<div class="row">
							<div class="icon col-2">
								<q-icon size="xs" :name="select.icon" />
							</div>
							<div class="col-10">
								<InputC class="inputClass" :dense="true" :label="select.title" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div style="margin-top:10px" class="row col-grow justify-center">
				<q-btn
					align="around"
					style="padding:3px, margin-top:10px"
					class="btn-fixed-width"
					color="primary"
					label="Guardar"
					icon="mdi-content-save"
				/>
			</div>
		</div>
	</div>
</template>
<script src="./index.ts" lang="ts" />
<style>
h6 {
	border: 1px;
	padding: 1px;
	border: 0px;
	margin: 3px;
}
.inputClass {
	padding: 4px;
}
.cards {
	margin-bottom: 20px;
}
</style>
