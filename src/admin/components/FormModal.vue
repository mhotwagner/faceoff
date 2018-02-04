<template>
  <div class="form-modal" @keyup.enter="submit">
    <div class="form-modal__background" @click="closeModal"></div>
    <div class="form-modal__container">
      <div class="form-modal__row form-modal__header form-modal__row_no-border">
        <h2 class="form-modal__title">{{ title }}</h2>
        <md-button class="form-modal__button" @click="submit">
          <h2>{{ buttonText }}</h2>
        </md-button>
      </div>
      <div
        v-for="field in formattedFields"
        :key="field.name"
        :class="getModalRowClasses(field)"
        v-if="field.inputType !== 'hidden'"
      >
        <p v-if="field.inputType === 'null'" :style="field.style">
          {{ field.placeholder }}
        </p>
        <textarea
          v-else-if="field.inputType === 'textarea'"
          v-model="model[field.name]"
          :name="field.name"
          :v-validate="field.validate ? '\'required\'' : ''"
          :placeholder="field.placeholder"
          :style="field.style"
          @keyup.enter.stop
          @focus="activateField(field)"
          @blur="deactivateField(field)"
        ></textarea>
        <input
          v-else
          v-model="model[field.name]"
          :name="field.name"
          :v-validate="field.validate ? '\'required\'' : ''"
          :placeholder="field.placeholder"
          :style="field.style"
          @focus="activateField(field)"
          @blur="deactivateField(field)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'form-modal',
  props: {
    actionType: {
      type: '',
      required: true,
    },
    buttonText: String,
    formFields: {
      required: true,
      default: () => [],
    },
    title: String,
  },
  beforeMount() {
    this.formFields.forEach((field) => {
      if (field.inputType !== 'null') this.model[field.name] = field.value;
    });
  },
  computed: {
    errors() {
      return this.errors;
    },
    formattedFields() {
      return this.formFields.map((field) => {
        return Object.assign({}, this.fieldSchema, field);
      });
    },
  },
  methods: {
    activateField(field) {
      this.activeFields.push(field.name);
    },
    deactivateField(field) {
      this.activeFields = this.activeFields
        .filter((fieldName) => {
          return fieldName !== field.name;
        });
    },
    closeModal() {
      this.$emit('close');
    },
    dispatch() {
      this.$store.dispatch(this.actionType, this.model).then(() => {
        this.closeModal();
      });
    },
    getModalRowClasses(rowData) {
      return {
        'form-modal__row': true,
        [`form-modal__row__${rowData.name}`]: true,
        'form-modal__row_error': rowData.validate && this.errors.has(rowData.name),
        'form-modal__row_active': this.activeFields.includes(rowData.name),
      };
    },
    submit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.dispatch();
        }
      });
    },
  },
  data() {
    return {
      fieldSchema: {
        name: '',
        placeholder: '',
        inputType: null,
        value: null,
        validate: true,
        style: {},
      },
      model: {},
      activeFields: [],
    };
  },
};
</script>

<style lang="scss">
  @import '~styles/layout';
  @import '~vue-wysiwyg/dist/vueWysiwyg';

  .form-modal {
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

  .form-modal__background {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0 ,0, 0.5);
  }

  .form-modal__container {
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

  .form-modal__header {
    width: 100%;
  }

  .form-modal__row {
    flex: 0 0 auto;
    width: 100%;
    margin-bottom: 1em;
    &:not(.form-modal__row_no-border) {
      border: 1px solid black;
    }
    &.form-modal__row_error {
      border-color: red;
    }

    &.form-modal__row_active {
      border-color: #1496bb;
    }

    @include respond-to(large) {
      /*flex-basis: 50%;*/
    }
  }

  .form-modal {
    font-size: 1em;
  }

  .form-modal__header {
    display: flex;
    justify-content: space-between;
  }

  .form-modal__title, .form-modal__button h2 {
    font-size: 1.5rem;
    font-weight: 700;
    font-style: italic;
  }

  .form-modal__title {
    margin-top: 6px;
    margin-bottom: 6px;
  }

  .form-modal__button {
    align-self: flex-end;
  }

  .form-modal__row {
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

</style>
