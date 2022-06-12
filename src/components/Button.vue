<script setup>
defineProps({
    buttonText: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <button class="rounded-full bg-cyan px-4 py-2 font-bold text-white hover:opacity-50">
        {{ buttonText }}
    </button>
</template>
