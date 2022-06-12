<script>
export default {
    props: {
        inputText: String,
        shortenUrl: String,
    },

    data() {
        return {
            copied: false,
        };
    },

    methods: {
        async copyToClipboard() {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(this.shortenUrl).then(() => {
                    this.copied = true;
                    setTimeout(() => {
                        this.copied = false;
                    }, 2000);
                });
            } else {
                alert('Browser Not compatible');
            }
        },
    },
};
</script>

<template>
    <div class="flex w-full flex-col items-start justify-between space-y-2 space-x-0 divide-y divide-gray py-4 md:flex-row md:items-center md:space-y-0 md:space-x-8 md:divide-y-0 md:px-10 md:py-6">
        <p class="w-full truncate px-6 text-start text-lg text-black md:w-auto md:text-center">{{ inputText }}</p>
        <div class="flex w-full flex-col items-start space-y-4 space-x-0 px-6 pt-4 md:w-auto md:flex-row md:items-center md:space-y-0 md:space-x-6 md:px-0 md:pt-0">
            <p class="text-start text-lg text-cyan md:text-center">{{ shortenUrl }}</p>
            <button v-if="!this.copied" @click="copyToClipboard" class="text-md w-full rounded-xl bg-cyan px-5 py-2.5 font-bold text-white hover:bg-light-cyan md:w-auto">Copy</button>
            <button v-if="this.copied" class="text-md w-full rounded-xl bg-dark-violet px-5 py-2.5 font-bold text-white md:w-auto">Copied</button>
        </div>
    </div>
</template>
