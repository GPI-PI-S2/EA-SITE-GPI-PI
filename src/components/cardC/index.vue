<template>
	<q-card class="my-card" flat bordered>
		<q-card-section horizontal>
			<q-img class="col" :src="src" />
			<q-card-actions vertical class="justify-around q-px-md">
				<q-btn
					v-for="(button, index) in buttons"
					:key="index"
					flat
					round
					:color="button.color"
					:icon="button.icon"
					@click="onClick"
				/>
			</q-card-actions>
		</q-card-section>
	</q-card>
</template>
<script src="./index.ts" lang="ts" />
