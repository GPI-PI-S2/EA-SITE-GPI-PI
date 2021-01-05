<template>
	<div class="q-pa-lg row" :style="{ position: 'relative', minHeight: '600px' }">
		<div class="col-12 q-pb-md">
			<div class="text-h6">
				Base de Datos
			</div>
		</div>
		<div class="col-12 q-pt-md q-pb-sm">
			<div class="text-subtitle2">
				Detalle por extractor
			</div>
			<p class="text-body2">
				Cantidad de extracciones por redes sociales
			</p>
			<div class="row q-mt-md ">
				<q-card
					flat
					bordered
					class="col-grow q-pa-md  row  justify-center content-center"
					:style="{ position: 'relative' }"
				>
					<pie-chart
						ref="pieChart"
						width="300px"
						height="300px"
						:data="data"
						:labels="labels"
						:colors="chartColors"
					/>
				</q-card>
				<div
					:class="`column col-xs-12 col-md-4 ${$q.screen.gt.sm ? 'q-ml-sm' : 'q-mt-sm'}`"
				>
					<q-markup-table bordered flat class="col-grow">
						<thead>
							<tr>
								<th class="text-left">Extractor</th>
								<th class="text-right">Cantidad</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="extractor in prettyList" :key="extractor.name">
								<td class="text-left">{{ extractor.name }}</td>
								<td class="text-right">{{ extractor.total }}</td>
							</tr>
						</tbody>
					</q-markup-table>
					<q-card
						bordered
						flat
						class="q-mt-sm q-px-md q-py-sm col-shrink row content-center"
					>
						<div class="col-grow row content-center text-subtitle2">Total</div>
						<div class="col-shrink text-subtitle1">{{ total }}</div>
					</q-card>
				</div>
			</div>
		</div>
		<div class="col-12 q-pt-md q-pb-sm">
			<div class="text-subtitle2">
				Contribuciones
			</div>
			<p class="text-body2">
				Cantidad de contribuciones por alumno
			</p>
			<q-table
				flat
				bordered
				row-key="email"
				rows-per-page-label="Filas por pagina"
				class="q-mt-md"
				:data="contributions"
			/>
		</div>
	</div>
</template>
<script src="./index.ts" lang="ts" />
