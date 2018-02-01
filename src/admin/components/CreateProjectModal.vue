<template>
  <div class="create-project-modal modal" @keyup.enter="submit">
    <div class="create-project-modal__background modal-background" @click="closeModal"></div>
    <div class="create-project-modal__container modal-container">
      <div class="create-project-modal__row create-project-modal__header modal-row no-border">
        <h2 class="create-project-modal__header-text">ADD PROJECT:</h2>
        <md-button class="create-project-modal__button" @click="submit">
          <h2>PUBLISH</h2>
        </md-button>
      </div>
      <div class="create-project-modal__col modal-col modal-header">
        <div :class="titleRowClasses">
          <input
            v-model="model.title"
            name="title"
            v-validate="'required'"
            placeholder="TITLE"
          />
        </div>
        <div :class="shortDescriptionRowClasses">
          <textarea
            v-model="model.short_description"
            name="short_description"
            v-validate="'required'"
            placeholder="SHORT DESCRIPTION"
          ></textarea>
        </div>
        <div :class="artistStatementRowClasses">
          <textarea v-model="model.artist_statement" placeholder="PROJECT ARTIST STATEMENT"></textarea>
        </div>
        <div class="create-project-modal__row create-project-modal__exhibits modal-row">
          <p>EXHIBITS</p>
        </div>
      </div>
      <div class="create-project-modal__col modal-col">
        <div class="create-project-modal__row create-project-modal__tags modal-row">
          <p>SEARCH TAGS</p>
        </div>
        <div class="create-project-modal__row create-project-modal__images modal-row">
          <p>IMAGES</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'create-project-modal',
  props: {
    value: {},
  },
  computed: {
    errors() {
      return this.errors;
    },
    artistStatementRowClasses() {
      return Object.assign({}, this.rowClasses, {
        'create-project-modal__artist-statement': true,
        'modal-row_error': this.errors.has('short_description'),
      });
    },
    shortDescriptionRowClasses() {
      return Object.assign({}, this.rowClasses, {
        'create-project-modal__short-description': true,
        'modal-row_error': this.errors.has('short_description'),
      });
    },
    titleRowClasses() {
      return Object.assign({}, this.rowClasses, {
        'create-project-modal__title': true,
        'modal-row_error': this.errors.has('title'),
      });
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    createProject() {
      this.$store.dispatch('CREATE_PROJECT', this.model).then(() => {
        this.closeModal();
      });
    },
    submit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.createProject();
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
        short_description: null,
        artist_statement: null,
      },
      rowClasses: {
        'create-project-modal__row': true,
        'modal-row': true,
      },
    };
  },
};
</script>

<style lang="scss">
  @import '~styles/layout';

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

  .create-project-modal {
    font-size: 1em;
  }

  .create-project-modal__header {
    display: flex;
    justify-content: space-between;
  }

  .create-project-modal__header-text, .create-project-modal__button h2 {
    font-size: 1.5rem;
    font-weight: 700;
    font-style: italic;
  }

  .create-project-modal__header-text {
    margin-top: 6px;
    margin-bottom: 6px;
  }

  .create-project-modal__button {
    align-self: flex-end;
  }

  .create-project-modal__row {
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

  .create-project-modal__field {
    margin: 0;
  }

  .create-project-modal__short-description {
    height: 6em;
  }

  .create-project-modal__artist-statement {
    flex-grow: 1;
    min-height: 6em;
  }

  .create-project-modal__exhibits {
    height: 6em;
  }

  .create-project-modal__tags {
    height: 8em;
  }

  .create-project-modal__images {
    flex-grow: 1;
  }

</style>
