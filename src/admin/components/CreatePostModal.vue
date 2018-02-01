<template>
  <div class="create-post-modal modal" @keyup.enter="submit">
    <div class="create-post-modal__background modal-background" @click="closeModal"></div>
    <div class="create-post-modal__container modal-container">
      <div class="create-post-modal__row create-post-modal__header modal-row no-border">
        <h2 class="create-post-modal__header-text">ADD POST:</h2>
        <md-button class="create-post-modal__button" @click="submit">
          <h2>PUBLISH</h2>
        </md-button>
      </div>
      <div class="create-post-modal__col modal-col modal-header">
        <div :class="titleRowClasses">
          <input
            v-model="model.title"
            name="title"
            v-validate="'required'"
            placeholder="TITLE"
          />
        </div>
        <div :class="bodyRowClasses">
          <wysiwyg
            v-model="model.body"
            name="body"
            v-validate="'required'"
            placeholder="WHAT'S ON YOUR MIND?"
          ></wysiwyg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'create-post-modal',
  props: {
    value: {},
  },
  computed: {
    errors() {
      return this.errors;
    },
    titleRowClasses() {
      return Object.assign({}, this.rowClasses, {
        'create-post-modal__title': true,
        'modal-row_error': this.errors.has('title'),
      });
    },
    bodyRowClasses() {
      return Object.assign({}, this.rowClasses, {
        'create-post-modal__body': true,
        'modal-row_error': this.errors.has('body'),
      });
    },
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    createPost() {
      this.$store.dispatch('CREATE_POST', this.model).then(() => {
        this.closeModal();
      });
    },
    submit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.createPost();
        }
      });
    },
  },
  beforeMount() {
    this.model = Object.assign({}, this.value, this.model);
  },
  data() {
    return {
      model: {
        title: null,
        body: null,
      },
      rowClasses: {
        'create-post-modal__row': true,
        'modal-row': true,
      },
    };
  },
};
</script>

<style lang="scss">
  @import '~styles/layout';
  @import '~vue-wysiwyg/dist/vueWysiwyg';

  .modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
  }

  .modal-background {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0 ,0, 0.5);
  }

  .modal-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    position: absolute;
    width: 90%;
    padding: 1em;
    background-color: #fff;
    @include respond-to(medium) {
      width: 900px;
      /*height: 600px;*/
    }
  }

  .modal-header {
    width: 100%;
  }

  .modal-row {
    flex: 0 0 auto;
    width: 100%;
    margin-bottom: 1em;
    &:not(.no-border) {
      border: 1px solid black;
    }
    &.modal-row_error {
      border-color: red;
    }

    @include respond-to(large) {
      /*flex-basis: 50%;*/
    }
  }

  .modal-col {
    display: flex;
    flex-direction: column;
    width: 100%;

    @include respond-to(medium) {
      height: 100%;
      width: 49%;
    }
  }

  .create-post-modal {
    font-size: 1em;
  }

  .create-post-modal__header {
    display: flex;
    justify-content: space-between;
  }

  .create-post-modal__header-text, .create-post-modal__button h2 {
    font-size: 1.5rem;
    font-weight: 700;
    font-style: italic;
  }

  .create-post-modal__header-text {
    margin-top: 6px;
    margin-bottom: 6px;
  }

  .create-post-modal__button {
    align-self: flex-end;
  }

  .create-post-modal__row {
    padding: 0.5em;
    font-weight: 700;

    input {
      width: 100%;
    }

    textarea {
      width: 100%;
      height: 100%;
      resize: none;
    }
  }

  .create-post-modal__field {
    margin: 0;
  }

  .create-post-modal__short-description {
    height: 6em;
  }

  .create-post-modal__artist-statement {
    flex-grow: 1;
    min-height: 6em;
  }

  .create-post-modal__exhibits {
    height: 6em;
  }

  .create-post-modal__tags {
    height: 8em;
  }

  .create-post-modal__images {
    flex-grow: 1;
  }

</style>
