<template>
  <div class="create-event-modal modal" @keyup.enter="submit">
    <div class="create-event-modal__background modal-background" @click="closeModal"></div>
    <div class="create-event-modal__container modal-container">
      <div class="create-event-modal__row create-event-modal__header modal-row no-border">
        <h2 class="create-event-modal__header-text">ADD EVENT:</h2>
        <md-button class="create-event-modal__button" @click="submit">
          <h2>PUBLISH</h2>
        </md-button>
      </div>
      <div class="create-event-modal__col modal-col modal-header">
        <div :class="titleRowClasses">
          <input
            v-model="model.title"
            name="title"
            v-validate="'required'"
            placeholder="TITLE"
          />
        </div>
        <div :class="datetimeRowClasses">
          <textarea
            v-model="model.datetime"
            name="datetime"
            v-validate="'required'"
            placeholder="DATE AND TIME"
          ></textarea>
        </div>
        <div :class="descriptionRowClasses">
          <textarea
            v-model="model.description"
            name="description"
            v-validate="'required'"
            placeholder="ABOUT EVENT"
          ></textarea>
        </div>
        <div :class="locationRowClasses">
          <p>LOCATION</p>
        </div>
        <div class="create-event-modal__col modal-col">
          <div class="create-event-modal__row create-event-modal__type modal-row">
            <p>EVENT TYPE</p>
          </div>
          <div class="create-event-modal__row create-event-modal__images modal-row">
            <p>IMAGES</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'create-event-modal',
  props: {
    value: {},
  },
  computed: {
    errors() {
      return this.errors;
    },
    datetimeRowClasses() {
      return Object.assign({}, this.rowClasses, {
        'create-event-modal__datetime': true,
        'modal-row_error': this.errors.has('datetime'),
      });
    },
    descriptionRowClasses() {
      return Object.assign({}, this.rowClasses, {
        'create-event-modal__description': true,
        'modal-row_error': this.errors.has('description'),
      });
    },
    locationRowClasses() {
      return Object.assign({}, this.rowClasses, {
        'create-event-modal__location': true,
      });
    },
    titleRowClasses() {
      return Object.assign({}, this.rowClasses, {
        'create-event-modal__title': true,
        'modal-row_error': this.errors.has('title'),
      });
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    createEvent() {
      this.$store.dispatch('CREATE_EVENT', this.model).then(() => {
        this.closeModal();
      });
    },
    submit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.createEvent();
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
        datetime: null,
        description: null,
      },
      rowClasses: {
        'create-event-modal__row': true,
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

  .create-event-modal {
    font-size: 1em;
  }

  .create-event-modal__header {
    display: flex;
    justify-content: space-between;
  }

  .create-event-modal__header-text, .create-event-modal__button h2 {
    font-size: 1.5rem;
    font-weight: 700;
    font-style: italic;
  }

  .create-event-modal__header-text {
    margin-top: 6px;
    margin-bottom: 6px;
  }

  .create-event-modal__button {
    align-self: flex-end;
  }

  .create-event-modal__row {
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

  .create-event-modal__field {
    margin: 0;
  }

  .create-event-modal__short-description {
    height: 6em;
  }

  .create-event-modal__artist-statement {
    flex-grow: 1;
    min-height: 6em;
  }

  .create-event-modal__exhibits {
    height: 6em;
  }

  .create-event-modal__tags {
    height: 8em;
  }

  .create-event-modal__images {
    flex-grow: 1;
  }

</style>
