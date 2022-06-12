<script setup>
defineProps({
    infoCardHeader: {
        type: String,
        required: true,
    },
    infoCardDetail: {
        type: String,
        required: true,
    },
    infoCardIcon: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <div class="mx-auto flex max-w-xl rounded-lg border border-white bg-white px-8 pt-20 pb-8 font-poppins lg:w-1/3">
        <div class="flex flex-col space-y-5">
            <h1 class="text-center text-2xl font-bold lg:text-left">{{ infoCardHeader }}</h1>
            <p class="text-center text-sm leading-7 text-gray lg:text-left">{{ infoCardDetail }}</p>
            <div class="absolute right-0 left-0 -top-16 m-auto flex h-24 w-24 flex-row items-center justify-center rounded-full bg-dark-violet lg:right-auto lg:left-auto lg:m-0">
                <img class="h-10 w-10 object-contain" alt="icon"  v-bind:src="infoCardIcon" />
            </div>
        </div>
    </div>
</template>
