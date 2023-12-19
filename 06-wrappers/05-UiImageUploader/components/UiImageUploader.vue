<template>
  <div class="image-uploader">
    <label class="image-uploader__preview"
      :class="{'image-uploader__preview-loading' : state === $options.States.LOADING}"
      :style="currentImage && `--bg-url: url(${currentImage})`">
      <span class="image-uploader__text">{{ text }}</span>
      <input type="file" v-bind="$attrs" ref="input"
      accept="image/*" class="image-uploader__input"
      @change="updateImage" @click="removeImage"/>
    </label>
  </div>
</template>

<script>
const States = {
  EMPTY: 'EMPTY',
  LOADING: 'LOADING',
  DONE: 'DONE'
}

export default {
  name: 'UiImageUploader',
  inheritAttrs: false,
  States,
  props: {
    preview: {
      type: String
    },
    uploader: {
      type: Function
    }
  },
  emits: ['select', 'upload', 'error', 'remove'],
  data() {
    return {
      currentImage: this.preview,
      state: this.preview ? States.DONE : States.EMPTY
    }
  },
  computed: {
    text() {
      if (this.state === 'EMPTY') {
        return 'Загрузить изображение'
      } else if (this.state === 'LOADING') {
        return 'Загрузка...'
      } else {
        return 'Удалить изображение'
      }
    }
  },
  methods: {
    updateImage() {
      const src = URL.createObjectURL(event.target.files[0])
      this.currentImage = src
      if (event.target.files[0]) {
        this.state = States.DONE
      }

      if (this.uploader) {
        this.state = States.LOADING
        this.uploader(event.target.files[0])
        .then(response => {
          this.$emit('upload', response)
          this.state = States.DONE
        }).catch(error => {
          this.state = States.EMPTY
          this.removeImage()
          this.$emit('error', error);
        })
      }
      this.$emit('select', event.target.files[0]);
    },
    removeImage() {
      if (this.state === States.DONE || this.state === States.LOADING) {
        event.preventDefault()
      }
      if (this.currentImage && (this.state === States.DONE || this.state === States.EMPTY)) {
        this.$refs['input'].value = ''
        this.currentImage = null
        this.$emit('remove', this.currentImage);
        this.state = States.EMPTY
      }
    }
  }
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
