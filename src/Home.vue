<script>
import InfoCard from './components/InfoCard.vue';
import axios from 'axios';
import ShortenedLinks from './components/ShortenedLinks.vue';

//images
import Brand from "../src/assets/images/icon-brand-recognition.svg";
import Records from "../src/assets/images/icon-detailed-records.svg";
import Customizable from "../src/assets/images/icon-fully-customizable.svg";

export default {

    setup: () => {
        return { Brand,Records,Customizable };
    },

    data() {
        return {
            url: '',
            textInput: '',
            inputHasError: false,
            inputErrorMessage: '',
            menuActive: false,
            results: [],
        };
    },

    methods: {
        async shortLink() {
            if (!this.textInput) {
                this.inputHasError = true;
                this.inputErrorMessage = 'Please add link';
                return;
            }
            if (!this.isValidLink(this.textInput)) {
                this.inputHasError = true;
                this.inputErrorMessage = 'Please add a valid link';
                return;
            }
            this.inputHasError = false;

            try {
                await axios.get('https://api.shrtco.de/v2/shorten?url=' + this.textInput).then((response) => {
                    this.url = response.data.result.short_link;
                    this.saveResults(this.textInput, this.url);
                });
            } catch (error) {
                this.inputHasError = true;
                this.inputErrorMessage = 'Error occured. Please try again!';
            }
        },

        isValidLink(str) {
            var regex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

            return regex.test(str);
        },

        saveResults(input, url) {
            let result = {
                input: input,
                shortenUrl: url,
            };
            this.results.push(result);
        },

        toggleMenu() {
            this.menuActive = !this.menuActive;
        },
    },

    components: {
        InfoCard,
        ShortenedLinks,
    },
};
</script>

<template>
    <div class="h-full w-full overflow-x-hidden font-poppins">
        <div class="relative mx-6 sm:mx-12 md:mx-16 lg:mx-24 xl:mx-48">
            <div class="flex flex-row items-center justify-between py-10 lg:py-12 lg:px-3">
                <div class="flex flex-row items-center space-x-8">
                    <img class="object-contain" alt="logo" src="./assets/images/logo.svg" />
                    <div class="hidden flex-row lg:flex">
                        <a href="#features" class="py-2.5 px-4 font-bold text-gray hover:text-black">Features</a>
                        <a href="#pricing" class="py-2.5 px-4 font-bold text-gray hover:text-black">Pricing</a>
                        <a href="#resources" class="py-2.5 px-4 font-bold text-gray hover:text-black">Resources</a>
                    </div>
                </div>
                <div class="hidden flex-row items-center space-x-8 lg:flex">
                    <a href="#login" class="cursor-pointer py-2.5 font-bold text-gray hover:text-black">Login</a>
                    <button class="rounded-full bg-cyan px-4 py-2 font-bold text-white hover:bg-light-cyan">Sign Up</button>
                </div>
                <div @click="toggleMenu" class="flex cursor-pointer lg:hidden">
                    <svg class="h-10 w-10 fill-current text-gray" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </div>
            </div>
            <div :class="menuActive ? 'flex' : 'hidden'" class="absolute top-24 z-10 w-full flex-col items-center justify-center rounded-xl bg-dark-violet p-6 lg:hidden">
                <div class="mb-6 flex flex-col items-center space-y-6">
                    <a href="#features" class="py-2.5 px-4 text-lg font-bold leading-7 text-white hover:text-black">Features</a>
                    <a href="#pricing" class="py-2.5 px-4 text-lg font-bold leading-7 text-white hover:text-black">Pricing</a>
                    <a href="#resources" class="py-2.5 px-4 text-lg font-bold leading-7 text-white hover:text-black">Resources</a>
                </div>
                <div class="mb-4 flex w-full flex-col items-center space-y-6 border-t border-gray">
                    <a href="#login" class="py-2.5 px-4 pt-7 text-lg font-bold leading-7 text-white hover:text-black">Login</a>
                    <button class="w-full rounded-full bg-cyan px-4 py-2 text-lg font-bold text-white hover:bg-light-cyan">Sign Up</button>
                </div>
            </div>
            <div class="relative mt-4 mb-40 flex flex-col-reverse space-x-0 lg:mt-14 lg:flex-row lg:space-x-16">
                <div class="mt-8 flex w-full flex-col items-center space-y-4 lg:mt-0 lg:w-1/2 lg:items-start">
                    <h1 class="text-center text-5xl font-bold lg:text-left lg:text-7xl">More than just shorter links</h1>
                    <p class="text-center text-lg font-medium text-gray lg:text-left lg:text-2xl">Build your brand’s recognition and get detailed insights on how your links are performing.</p>
                    <div class="pt-8">
                        <button class="w-48 rounded-full bg-cyan px-5 py-2.5 text-xl font-bold text-white hover:bg-light-cyan">Get Started</button>
                    </div>
                </div>
                <div class="flex justify-center lg:absolute lg:-right-56 lg:-top-24">
                    <img class="max-w-lg sm:max-w-xl lg:max-w-full" alt="working illustration" src="./assets/images/illustration-working.svg" />
                </div>
            </div>
        </div>
        <div class="bg-light-gray">
            <div class="relative -top-28 mx-6 rounded-xl bg-dark-violet bg-[url('./assets/images/bg-shorten-desktop.svg')] bg-cover bg-center p-8 sm:mx-12 md:mx-16 md:py-14 lg:mx-48">
                <div class="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-7">
                    <input
                        type="text"
                        v-model="textInput"
                        :class="inputHasError ? 'border-red-600' : ' border-cyan'"
                        class="h-16 w-full rounded-xl border-2 py-4 px-7 text-xl focus:outline-none md:py-6"
                        placeholder="Shorten a link here..."
                    />
                    <button @click="shortLink" class="h-16 w-full whitespace-nowrap rounded-xl bg-cyan px-9 py-4 text-xl font-bold text-white hover:bg-light-cyan md:w-auto">Shorten It!</button>
                </div>
                <p v-if="inputHasError" class="pt-2 italic text-red-600">
                    {{ inputErrorMessage }}
                </p>
            </div>
            <div v-for="result in results" v-bind:key="result.url" class="flex flex-col space-y-4">
                <div v-if="url" class="mx-6 -mt-16 mb-20 rounded-lg bg-white sm:mx-12 md:mx-16 lg:mx-48">
                    <ShortenedLinks :inputText="result.input" :shortenUrl="result.shortenUrl" />
                </div>
            </div>
            <div class="mt-4 mb-6">
                <div class="flex flex-col space-y-6">
                    <div class="mx-10 flex max-w-xl flex-col justify-center space-y-4 sm:mx-auto">
                        <h1 class="text-center text-4xl font-bold">Advanced Statistics</h1>
                        <p class="text-center text-lg font-medium text-gray">Track how your links are performing across the web with our advanced statistics dashboard.</p>
                    </div>
                </div>
            </div>
            <div class="relative mx-6 mt-16 sm:mx-12 md:mx-16 lg:mx-24 xl:mx-48">
                <div class="relative z-10 flex flex-col space-y-16 lg:flex-row lg:space-y-0 lg:space-x-8">
                    <InfoCard
                        infoCardHeader="Brand Recognition"
                        infoCardDetail="Boost your brand recognition with each click. Generic links don’t mean a thing. Branded links help instil confidence in your content."
                        :infoCardIcon="Brand"
                    />
                    <InfoCard
                        class="translate-y-8"
                        infoCardHeader="Detailed Records"
                        infoCardDetail="Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.."
                        :infoCardIcon="Records"
                    />
                    <InfoCard
                        class="translate-y-16"
                        infoCardHeader="Fully Customizable"
                        infoCardDetail="Improve brand awareness and content discoverability through customizable links, supercharging audience engagement."
                        :infoCardIcon="Customizable"
                    />
                </div>
                <hr class="absolute top-36 hidden w-full border-t-8 border-cyan lg:flex" />
                <hr class="absolute right-0 left-0 top-1/2 m-auto flex w-full rotate-90 border-t-8 border-cyan lg:hidden" />
            </div>
            <div class="mt-36 lg:mt-52">
                <div class="flex h-64 w-full items-center justify-center bg-dark-violet bg-[url('./assets/images/bg-boost-desktop.svg')] bg-cover bg-no-repeat">
                    <div class="mx-auto flex flex-col items-center justify-center space-y-6">
                        <h1 class="text-center text-2xl font-bold text-white lg:text-4xl">Boost your links today</h1>
                        <button class="w-48 rounded-full bg-cyan px-5 py-2.5 text-xl font-bold text-white hover:bg-light-cyan">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full bg-dark-black">
            <div class="mx-6 py-[75px] sm:mx-12 md:mx-16 lg:mx-36">
                <div class="flex flex-col items-center justify-center space-y-4 md:flex-row md:items-start md:justify-start md:space-y-0">
                    <div class="flex w-full justify-center md:w-1/3 md:justify-start">
                        <img class="object-contain brightness-[8]" alt="logo" src="./assets/images/logo.svg" />
                    </div>
                    <div class="flex w-full flex-col items-center space-y-2 px-0 pb-8 md:w-1/6 md:items-start md:px-4">
                        <h1 class="mb-3 font-semibold text-white">Features</h1>
                        <a href="#shortening" class="text-gray hover:text-cyan">Link Shortening</a>
                        <a href="#branded" class="text-gray hover:text-cyan">Branded Links</a>
                        <a href="#analytics" class="text-gray hover:text-cyan">Analytics</a>
                    </div>
                    <div class="flex w-full flex-col items-center space-y-2 px-0 pb-8 md:w-1/6 md:items-start md:px-4">
                        <h1 class="mb-3 font-semibold text-white">Resources</h1>
                        <a href="#blog" class="text-gray hover:text-cyan">Blog</a>
                        <a href="#developers" class="text-gray hover:text-cyan">Developers</a>
                        <a href="#support" class="text-gray hover:text-cyan">Support</a>
                    </div>
                    <div class="flex w-full flex-col items-center space-y-2 px-0 pb-8 md:w-1/6 md:items-start md:px-4">
                        <h1 class="mb-3 font-semibold text-white">Company</h1>
                        <a href="#about" class="text-gray hover:text-cyan">About</a>
                        <a href="#team" class="text-gray hover:text-cyan">Our Team</a>
                        <a href="#careers" class="text-gray hover:text-cyan">Careers</a>
                        <a href="#contact" class="text-gray hover:text-cyan">Contant</a>
                    </div>
                    <div class="ml-6 flex flex-row space-x-6">
                        <img class="h-6 w-6 object-contain" alt="icon-facebok" src="./assets/images/icon-facebook.svg" />
                        <img class="h-6 w-6 object-contain" alt="icon-twitter" src="./assets/images/icon-twitter.svg" />
                        <img class="h-6 w-6 object-contain" alt="icon-pinterest" src="./assets/images/icon-pinterest.svg" />
                        <img class="h-6 w-6 object-contain" alt="icon-instagram" src="./assets/images/icon-instagram.svg" />
                    </div>
                </div>
            </div>
            <div class="fixed bottom-0 z-10 w-full items-center justify-center bg-black py-1">
                <p class="lead text-center">
                    <span class="text-xs text-white">Challenge by</span>
                    <a href="https://www.frontendmentor.io/" class="text-xs text-gray hover:text-cyan"> Frontend Mentor</a>
                    <span class="text-xs text-white"> | Coded by</span>
                    <a href="https://github.com/huseyintemel" class="text-xs text-gray hover:text-cyan"> huseyintemel</a>
                </p>
            </div>
        </div>
    </div>
</template>
