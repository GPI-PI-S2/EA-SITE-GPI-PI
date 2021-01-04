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
							<div class="text-subtitle2 col-12 q-pt-lg q-pb-sm">{{ team.name }}</div>
							<div class="row col-grow">
								<div class="row q-col-gutter-sm">
									<div
										v-for="(integrantes, subIndex) in team.integrantes"
										:key="subIndex"
										class="col-12 col-md-4"
									>
										<q-card flat class="q-py-xs">
											<q-item>
												<q-item-section avatar>
													<q-avatar>
														<q-icon
															v-if="!integrantes.img"
															name="mdi-account-circle"
															size="xl"
															color="primary"
														/>
														<q-img v-else :src="integrantes.img" />
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
							<div class="text-subtitle2 q-pt-lg q-pb-sm">
								Repositorios de la aplicación
							</div>
						</div>
						<div class="row q-pt-md">
							<q-markup-table
								wrap-cells
								bordered
								flat
								separator="cell"
								class="col-12"
							>
								<tbody>
									<tr v-for="(repo, index) in repos" :key="index">
										<td class="text-center">{{ repo.repoName }}</td>
										<td class="text-left">{{ repo.name }}</td>
										<td class="text-left">
											{{ repo.desc }}
										</td>
									</tr>
								</tbody>
							</q-markup-table>
							<!-- <q-img class="col-12 col-md" :src="imgArquiTabla" alt="" /> -->
						</div>
						<div class="row">
							<div class="col-12">
								<div class="text-subtitle2 q-py-lg q-pb-sm">
									Links de repositorios
								</div>
							</div>
						</div>
						<div class="row q-col-gutter-sm">
							<div v-for="(route, index) in githubRoutes" :key="index">
								<q-btn
									color="primary"
									no-caps
									stretch
									icon="mdi-link"
									:outline="true"
									:label="route.label"
									@click="onClickRepo(route.href)"
								/>
							</div>
						</div>
					</div>
				</div>
			</q-expansion-item>
		</q-list>
	</div>
</template>
<script src="./index.ts" lang="ts" />
