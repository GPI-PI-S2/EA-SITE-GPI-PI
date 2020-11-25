<template>
	<q-layout view="hHr lpR lFr" class="bg-grey-2">
		<q-page-container class="row justify-center q-pt-xl q-px-xl ">
			<q-card
				flat
				bordered
				:style="{ width: '1200px', maxWidth: '1200px', minHeight: '600px' }"
			>
				<div class="row full-height">
					<q-list separator class="col-2">
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
					<div class="col-grow row">
						<router-view />
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
