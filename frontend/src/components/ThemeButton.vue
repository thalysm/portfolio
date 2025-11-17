<script setup>
import { ref } from 'vue'

const emit = defineEmits(['change-style'])
const props = defineProps(['currentStyle'])
const showOptions = ref(false)

const changeTheme = (style) => {
  if (showOptions.value) {
    emit('change-style', '')
    setTimeout(() => {
      emit('change-style', style)
    }, 250)
    showOptions.value = false
  } else {
    showOptions.value = true
  }
}

const themes = [
  { id: 'flat', label: 'Flat Design' },
  { id: 'neobrutalism', label: 'Neo-Brutalism' },
  { id: 'neomorphism', label: 'Neomorphism' },
  { id: 'glassmorphism', label: 'Glassmorphism' }
]
</script>

<template>
  <div class="container-button">
    <div
      v-for="theme in themes"
      :key="theme.id"
      class="button-wrapper"
      :style="{ order: props.currentStyle === theme.id ? 1 : 0 }"
    >
      <Transition name="slide-fade">
        <div
          v-if="showOptions || props.currentStyle === theme.id"
          class="button-content"
        >
          <span class="theme-label" :class="{ visible: showOptions }">
            {{ theme.label }}
          </span>

          <button
            class="theme-button"
            :class="theme.id"
            @click="changeTheme(theme.id)"
            :title="theme.label"
          >
            <svg
              v-if="theme.id === 'flat'"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.97883 15.123C8.71722 14.4781 8.2395 13.9441 7.6275 13.6127C7.0155 13.2813 6.3073 13.1729 5.6242 13.3062C4.9411 13.4395 4.3256 13.8062 3.88313 14.3434C3.44066 14.8807 3.19875 15.555 3.19883 16.251C3.19883 16.5591 3.13555 16.864 3.01291 17.1466C2.89027 17.4293 2.71088 17.6837 2.48587 17.8942C2.26086 18.1047 1.99502 18.2667 1.70482 18.3702C1.41462 18.4737 1.10625 18.5166 0.798828 18.496C1.29328 19.355 2.05746 20.0267 2.97275 20.4068C3.88804 20.787 4.90323 20.8543 5.86073 20.5984C6.81822 20.3425 7.66445 19.7777 8.26804 18.9916C8.87164 18.2055 9.19883 17.2421 9.19883 16.251C9.19883 15.852 9.12083 15.471 8.97883 15.123ZM8.97883 15.123C10.1678 14.7179 11.305 14.1742 12.3668 13.503M7.32383 13.478C7.72904 12.2865 8.27347 11.1469 8.94583 10.083M12.3658 13.503C14.2622 12.3049 15.8853 10.7213 17.1298 8.85502L21.0058 3.04102C21.1543 2.81958 21.2213 2.55346 21.1954 2.28811C21.1695 2.02276 21.0523 1.77464 20.8637 1.58611C20.6752 1.39759 20.4271 1.28036 20.1617 1.25445C19.8964 1.22853 19.6303 1.29554 19.4088 1.44402L13.5948 5.32102C11.7283 6.56516 10.1444 8.18795 8.94583 10.084C10.4677 10.7645 11.6854 11.9821 12.3658 13.504"
                stroke="#5093FE"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <svg
              v-else-if="theme.id === 'neobrutalism'"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.97883 15.123C8.71722 14.4781 8.2395 13.9441 7.6275 13.6127C7.0155 13.2813 6.3073 13.1729 5.6242 13.3062C4.9411 13.4395 4.3256 13.8062 3.88313 14.3434C3.44066 14.8807 3.19875 15.555 3.19883 16.251C3.19883 16.5591 3.13555 16.864 3.01291 17.1466C2.89027 17.4293 2.71088 17.6837 2.48587 17.8942C2.26086 18.1047 1.99502 18.2667 1.70482 18.3702C1.41462 18.4737 1.10625 18.5166 0.798828 18.496C1.29328 19.355 2.05746 20.0267 2.97275 20.4068C3.88804 20.787 4.90323 20.8543 5.86073 20.5984C6.81822 20.3425 7.66445 19.7777 8.26804 18.9916C8.87164 18.2055 9.19883 17.2421 9.19883 16.251C9.19883 15.852 9.12083 15.471 8.97883 15.123ZM8.97883 15.123C10.1678 14.7179 11.305 14.1742 12.3668 13.503M7.32383 13.478C7.72904 12.2865 8.27347 11.1469 8.94583 10.083M12.3658 13.503C14.2622 12.3049 15.8853 10.7213 17.1298 8.85502L21.0058 3.04102C21.1543 2.81958 21.2213 2.55346 21.1954 2.28811C21.1695 2.02276 21.0523 1.77464 20.8637 1.58611C20.6752 1.39759 20.4271 1.28036 20.1617 1.25445C19.8964 1.22853 19.6303 1.29554 19.4088 1.44402L13.5948 5.32102C11.7283 6.56516 10.1444 8.18795 8.94583 10.084C10.4677 10.7645 11.6854 11.9821 12.3658 13.504"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <svg
              v-else-if="theme.id === 'neomorphism'"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.97883 15.123C8.71722 14.4781 8.2395 13.9441 7.6275 13.6127C7.0155 13.2813 6.3073 13.1729 5.6242 13.3062C4.9411 13.4395 4.3256 13.8062 3.88313 14.3434C3.44066 14.8807 3.19875 15.555 3.19883 16.251C3.19883 16.5591 3.13555 16.864 3.01291 17.1466C2.89027 17.4293 2.71088 17.6837 2.48587 17.8942C2.26086 18.1047 1.99502 18.2667 1.70482 18.3702C1.41462 18.4737 1.10625 18.5166 0.798828 18.496C1.29328 19.355 2.05746 20.0267 2.97275 20.4068C3.88804 20.787 4.90323 20.8543 5.86073 20.5984C6.81822 20.3425 7.66445 19.7777 8.26804 18.9916C8.87164 18.2055 9.19883 17.2421 9.19883 16.251C9.19883 15.852 9.12083 15.471 8.97883 15.123ZM8.97883 15.123C10.1678 14.7179 11.305 14.1742 12.3668 13.503M7.32383 13.478C7.72904 12.2865 8.27347 11.1469 8.94583 10.083M12.3658 13.503C14.2622 12.3049 15.8853 10.7213 17.1298 8.85502L21.0058 3.04102C21.1543 2.81958 21.2213 2.55346 21.1954 2.28811C21.1695 2.02276 21.0523 1.77464 20.8637 1.58611C20.6752 1.39759 20.4271 1.28036 20.1617 1.25445C19.8964 1.22853 19.6303 1.29554 19.4088 1.44402L13.5948 5.32102C11.7283 6.56516 10.1444 8.18795 8.94583 10.084C10.4677 10.7645 11.6854 11.9821 12.3658 13.504"
                stroke="url(#paint0_linear_634_472)"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_634_472"
                  x1="10.9998"
                  y1="1.24899"
                  x2="10.9998"
                  y2="20.751"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#CECECE" />
                  <stop offset="1" stop-color="#686868" />
                </linearGradient>
              </defs>
            </svg>

            <svg
              v-else-if="theme.id === 'glassmorphism'"
              width="41"
              height="40"
              viewBox="0 0 41 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <rect
                x="0.5"
                y="0.5"
                width="39.402"
                height="38.502"
                rx="4.5"
                fill="url(#paint0_linear_634_465)"
                fill-opacity="0.25"
              />
              <rect
                x="0.5"
                y="0.5"
                width="39.402"
                height="38.502"
                rx="4.5"
                fill="url(#pattern0_634_465)"
                fill-opacity="0.1"
              />
              <rect
                x="0.5"
                y="0.5"
                width="39.402"
                height="38.502"
                rx="4.5"
                stroke="url(#paint1_linear_634_465)"
                stroke-opacity="0.6"
              />
              <rect
                x="0.5"
                y="0.5"
                width="39.402"
                height="38.502"
                rx="4.5"
                stroke="url(#paint2_linear_634_465)"
              />
              <path
                d="M18.18 23.874C17.9184 23.2291 17.4407 22.6952 16.8287 22.3637C16.2167 22.0323 15.5085 21.9239 14.8254 22.0572C14.1423 22.1905 13.5268 22.5572 13.0843 23.0944C12.6418 23.6317 12.3999 24.306 12.4 25.002C12.4 25.3101 12.3367 25.615 12.2141 25.8976C12.0914 26.1803 11.9121 26.4347 11.687 26.6452C11.462 26.8557 11.1962 27.0177 10.906 27.1212C10.6158 27.2247 10.3074 27.2676 10 27.247C10.4944 28.106 11.2586 28.7777 12.1739 29.1578C13.0892 29.538 14.1044 29.6053 15.0619 29.3494C16.0194 29.0935 16.8656 28.5287 17.4692 27.7426C18.0728 26.9565 18.4 25.9931 18.4 25.002C18.4 24.603 18.322 24.222 18.18 23.874ZM18.18 23.874C19.369 23.4689 20.5062 22.9252 21.568 22.254M16.525 22.229C16.9302 21.0375 17.4746 19.8979 18.147 18.834M21.567 22.254C23.4633 21.0559 25.0865 19.4723 26.331 17.606L30.207 11.792C30.3555 11.5706 30.4225 11.3045 30.3966 11.0391C30.3707 10.7738 30.2534 10.5256 30.0649 10.3371C29.8764 10.1486 29.6283 10.0314 29.3629 10.0055C29.0976 9.97954 28.8314 10.0465 28.61 10.195L22.796 14.072C20.9295 15.3162 19.3456 16.939 18.147 18.835C19.6689 19.5155 20.8865 20.7331 21.567 22.255"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <defs>
                <pattern
                  id="pattern0_634_465"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlink:href="#image0_634_465"
                    transform="matrix(0.0027159 0 0 0.00277778 -0.151816 0)"
                  />
                </pattern>
                <linearGradient
                  id="paint0_linear_634_465"
                  x1="2.88162"
                  y1="1.75009"
                  x2="25.6195"
                  y2="10.5014"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="white" />
                  <stop offset="1" stop-color="white" stop-opacity="0" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_634_465"
                  x1="2.94103"
                  y1="13.3507"
                  x2="19.4133"
                  y2="17.2653"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="white" />
                  <stop offset="1" stop-color="white" stop-opacity="0" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_634_465"
                  x1="40.402"
                  y1="8.40043"
                  x2="40.402"
                  y2="31.0016"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="white" stop-opacity="0" />
                  <stop offset="0.5" stop-color="white" />
                  <stop offset="1" stop-color="white" stop-opacity="0" />
                </linearGradient>
                <image
                  id="image0_634_465"
                  width="480"
                  height="360"
                  xlink:href="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4QBWRXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAAAAAEsAAAAAQAAASwAAAAB/+0ALFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAPHAFaAAMbJUccAQAAAgAEAP/hDIFodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0n77u/JyBpZD0nVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkJz8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0nYWRvYmU6bnM6bWV0YS8nIHg6eG1wdGs9J0ltYWdlOjpFeGlmVG9vbCAxMC4xMCc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczp0aWZmPSdodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyc+CiAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICA8dGlmZjpYUmVzb2x1dGlvbj4zMDAvMTwvdGlmZjpYUmVzb2x1dGlvbj4KICA8dGlmZjpZUmVzb2x1dGlvbj4zMDAvMTwvdGlmZjpZUmVzb2x1dGlvbj4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6eG1wTU09J2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8nPgogIDx4bXBNTTpEb2N1bWVudElEPmFkb2JlOmRvY2lkOnN0b2NrOmZkOTA3YWMzLTNlZjMtNDE5ZC1iYjlkLTk0MjMwYzU4NTdiNzwveG1wTU06RG9jdW1lbnRJRD4KICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOmQyODQzN2FjLTZiNDgtNDAwZi05ZjE5LTdkNzQ5ODdlYmIzNzwveG1wTU06SW5zdGFuY2VJRD4KIDwvcmRmOkRlc2NyaXB0aW9uPgo8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSd3Jz8+/9sAQwAFAwQEBAMFBAQEBQUFBgcMCAcHBwcPCwsJDBEPEhIRDxERExYcFxMUGhURERghGBodHR8fHxMXIiQiHiQcHh8e/9sAQwEFBQUHBgcOCAgOHhQRFB4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4e/8AAEQgBagHgAwERAAIRAQMRAf/EABwAAQEAAwEBAQEAAAAAAAAAAAAEAQIDBQYHCP/EAEwQAAIBAwIEAwYDBQYEBgEFAAECAwAEERIhBRMxQSIyUQYUQmFxkSOBoRVSscHRBxYzYuHwJDSC8UNTcpKistIlg8Li8kRjc4OT0//EABoBAQEBAQEBAQAAAAAAAAAAAAABAgMEBQb/xAA2EQACAgEDAgQEBAYCAwEBAAAAAQIRAxIhMQRBEyJRYQVxgZEyobHwFCPR4fEGwRVSYjNyJP/aAAwDAQACEQMRAD8A/s3/AJh+8/8ADUf3z8v+2u11uO2M5/166r8aK7d+9V1Wn7eH7/v++p5dO9vP48fvr6L+0v8AeP48fP8Ab4K59O+Onw/r406/r/XpXF5+9z/WlfO8Hw8dK6214/46dfhX/9k="
                />
              </defs>
            </svg>
          </button>
        </div>
      </Transition>
    </div>

    <div class="button-wrapper" :style="{ order: 2 }">
      <button
        class="theme-button toggle-button"
        @click="changeTheme(props.currentStyle)"
        title="Change Theme"
      >
        <svg
          v-if="!showOptions"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="3"></circle>
          <path
            d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
          ></path>
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-button {
  position: fixed;
  bottom: 20px; /* Mover para baixo para não conflitar com o menu */
  right: 20px;
  display: flex;
  flex-direction: column-reverse; /* Expandir para cima */
  gap: 15px;
  z-index: 9999;
  align-items: flex-end; /* Alinhar à direita */
}

.button-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.button-content {
  display: flex;
  align-items: center;
  position: relative;
}

/* Label do tema (Tooltip) */
.theme-label {
  background-color: #333;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  margin-right: 10px;
  opacity: 0;
  visibility: hidden;
  transform: translateX(10px);
  transition: all 0.3s ease;
  white-space: nowrap;
  pointer-events: none;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

/* Mostrar tooltip no hover do botão */
.button-content:hover .theme-label {
  opacity: 1;
  visibility: visible;
  transform: translateX(0);
}

.theme-button {
  cursor: pointer;
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transition: all 0.3s ease;
  background-color: #fff; /* Fallback */
  position: relative;
  z-index: 2;

  & img, & svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    transform: scale(1.1);
  }
}

/* Botão de Toggle (Engrenagem/X) */
.toggle-button {
  background-color: #333;
  color: #fff;
  border: none;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  
  &:hover {
    background-color: #000;
  }
}

/* Estilos específicos por tema (mantendo a identidade visual) */
.theme-button.neobrutalism {
  border: 3px solid black;
  box-shadow: 4px 4px 0px 0px #1f1f1f;
  background-color: #f2f2f2;
  border-radius: 0; 
}

.theme-button.flat {
  border: 1px solid #e9e9e9;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

/* CORREÇÃO DO GLASSMORPHISM: Usar um gradiente visível (semelhante ao do tema) */
.theme-button.glassmorphism {
  border: none;
  /* Gradiente inspirado no tema para garantir contraste em fundos claros */
  background: linear-gradient(135deg, #8300a1 0%, #ff00a2 100%);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
}

.theme-button.neomorphism {
  background: #e0e0e0;
  border: none;
  box-shadow: 5px 5px 10px #bebebe, -5px -5px 10px #ffffff;
}

/* Transições de Entrada/Saída */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>