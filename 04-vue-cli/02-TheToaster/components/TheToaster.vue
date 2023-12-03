<template>
  <div class="toasts" >
    <div v-for="toast in toastsArray">
      <div class="toast" :class="`toast_${toast.toastType.status}`">
          <UiIcon class="toast__icon" :icon="toast.toastType.icon" />
          <span>{{ toast.message }}</span>
        </div>
    </div>
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';


const toastTypes = {
  error: {
    status: 'error',
    icon: 'alert-circle'
  },
  success: {
    status: 'success',
    icon: 'check-circle'
  }
}

export default {
  name: 'TheToaster',

  components: { UiIcon },

  data() {
    return {
      toastsArray: [],
      toast: {
        message: '',
        toastType: {
          status: '',
          icon: 'alert-circle'
        }
      }
    }
  },

  toastTypes,

  methods: {
    deleteElem(time) {
      setTimeout(() => {
        this.toastsArray.splice(0, 1)
      }, time)
    },

    error(message) {
      this.toast = {
        toastType: toastTypes.error,
        message: message
      }
      this.toastsArray.push(this.toast);
      this.deleteElem(5000)
    },

    success(message) {
      this.toast = {
        toastType: toastTypes.success,
        message: message
      }
      this.toastsArray.push(this.toast);
      this.deleteElem(5000)
    }
  }
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
