<template>
	<div class="q-pa-lg row">
		<div class="col-12 q-pb-md">
			<div class="text-h6">
				Database page
			</div>
		</div>
		<div class="full-width row bg-red q-gutter-sm">
			<div class="col-12">TEST EXTRACTORES</div>
			<div class="col-12">
				<q-btn label="deploy" :loading="loading" color="primary" @click="onClickDeploy" />
			</div>
			<div class="col-12">
				<q-btn
					label="obtain"
					color="primary"
					:loading="loading"
					:disabled="!deployed"
					@click="onClickObtain"
				/>
			</div>
		</div>
		<div class="col-12 q-pb-md">
			<div class="row q-pa-md">
				<div class="col-12">
					<transition
						appear
						enter-active-class="animated fadeIn"
						leave-active-class="animated fadeOut"
					>
						<tableC
							class="center"
							stretch
							v-show="!isLoading"
							:loading="isLoading"
							:dense="true"
							title="Search"
							:data="realData"
						/>
					</transition>
					<q-inner-loading :showing="isLoading">
						<h5 class="text-weight-light text-uppercase">Solicitando datos</h5>
						<q-spinner-gears size="xl" color="primary" />
					</q-inner-loading>
				</div>
			</div>
		</div>
	</div>
</template>
<script src="./index.ts" lang="ts" />
