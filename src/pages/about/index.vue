/* eslint-disable vue/valid-v-else */
<template>
	<div class="q-pa-lg row">
		<div class="col-12 q-pb-md">
			<div class="text-h6">
				Sobre la aplicación y el desarrollo
			</div>
		</div>
		<q-list class="col-12 rounded-borders" bordered separator>
			<q-expansion-item
				v-for="(each, index) in infoExpansion"
				:key="index"
				:icon="each.icon"
				:label="each.title"
				:caption="each.caption"
				group="gpi"
			>
				<div class="q-pl-xl q-pa-md">
					{{ each.cardContent }}
					<div v-show="index == 1" class="integrantes">
						<div v-for="(team, index) in IntegrantesList" :key="index" class="row">
							<h5 class="col-12">{{ team.name }}</h5>
							<div class="row col-grow">
								<div class="row">
									<div
										v-for="(integrantes, subIndex) in team.integrantes"
										:key="subIndex"
										class="col-12 col-md-4 "
									>
										<q-card class="cardAbout">
											<q-item>
												<q-item-section avatar>
													<q-avatar>
														<img :src="integrantes.img" />
													</q-avatar>
												</q-item-section>
												<q-item-section class="row">
													<q-item-label>{{
														integrantes.name
													}}</q-item-label>
													<div v-if="index == 0" :key="index">
														<q-item-label caption>{{
															integrantes.extra
														}}</q-item-label>
														<q-item-label caption>{{
															integrantes.email
														}}</q-item-label>
													</div>
													<div v-else>
														<q-item-label caption>{{
															integrantes.email
														}}</q-item-label>
													</div>
												</q-item-section>
											</q-item>
										</q-card>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div v-show="index == 2" class="about">
						<div class="row">
							<h5>Repositorios de la aplicación</h5>
						</div>
						<div class="row ">
							<img
								class="col-12 col-md"
								src="..\..\..\public\images\arqui-tabla.png"
								alt=""
							/>
						</div>
						<div class="row">
							<div class="col-12 col-md">
								<h5>Links de repositorios</h5>
							</div>
						</div>
						<div class="row">
							<div class="q-pa-xs column q-gutter-sm">
								<a
									v-for="(route, index) in githubRoutes"
									:key="index"
									:href="route.href"
								>
									<q-btn
										style="width:400px"
										color="primary"
										:outline="true"
										no-caps
										stretch
										:label="route.label"
									/>
								</a>
							</div>
						</div>
					</div>
				</div>
			</q-expansion-item>
		</q-list>
	</div>
</template>
<script src="./index.ts" lang="ts" />
<style scoped>
h5 {
	margin: 15px;
}
a {
	text-decoration: none;
}
.cardAbout {
	padding: 4px;
	margin: 5px;
}
</style>
