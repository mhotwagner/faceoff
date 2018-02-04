<template>
  <div class="cv-modal" @keyup.enter="submit">
    <div class="cv-modal__background" @click="closeModal"></div>
    <div class="cv-modal__container">
      <div class="cv-modal__header">
        <h2 class="cv-modal__title">Edit CV/Resume</h2>
        <md-button class="cv-modal__button" @click="submit">
          <h2>publish</h2>
        </md-button>
      </div>
      <div class="cv-modal__body">
        <div class="cv-modal__edit">
          <div class="cv-modal__edit-row cv-modal__edit-header cv-modal__edit-row_no-border">
            <button @click="submitCvRow">ADD ROW</button>
          </div>
          <div class="cv-modal__edit-row">
            <input
              v-model="cvRowModel.title"
              name="title"
              v-validate="'required'"
              placeholder="TITLE"
            />
          </div>
          <div class="cv-modal__edit-row">
            <input
              v-model="cvRowModel.category"
              name="category"
              v-validate="'required'"
              placeholder="CATEGORY"
            />
          </div>
          <div class="cv-modal__edit-row">
            <input
              v-model="cvRowModel.year"
              name="year"
              v-validate="'required'"
              placeholder="YEAR"
            />
          </div>
          <div class="cv-modal__edit-row">
            <input
              v-model="cvRowModel.location"
              name="location"
              v-validate="'required'"
              placeholder="LOCATION"
            />
          </div>
          <div class="cv-modal__edit-row">
            <input
              v-model="cvRowModel.location_name"
              name="location_name"
              v-validate="'required'"
              placeholder="LOCATION NAME"
            />
          </div>
        </div>
        <div class="cv-modal__preview">
          <div class="cv-modal__preview-header">
            CLICK LINE TO EDIT
          </div>
          <div class="cv-modal__preview-body">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cv-modal',
  props: {
    value: {},
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
    createCvRow() {
      this.$store.dispatch('CREATE_CV_ROW', this.cvRowModel).then(() => {
        this.resetCvRowModel();
      });
    },
    getModalRowClasses(rowData) {
      return {
        'cv-modal__edit-row': true,
        [`cv-modal__edit-row__${rowData.name}`]: true,
        'cv-modal__edit-row_error': rowData.validate && this.errors.has(rowData.name),
        'cv-modal__edit-row_active': this.activeFields.includes(rowData.name),
      };
    },
    resetCvRowModel() {
      this.cvRowModel = Object.assign({}, this.value, this.cvRowSchema);
    },
    submit() {
      console.log('are we doing this for some reason?');
      this.closeModal();
    },
    submitCvRow() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.createCvRow(this.cvRowModel);
          // this.resetCvRowModel();
        }
      });
    },
  },
  beforeMount() {
    this.cvRowModel = Object.assign({}, this.value, this.cvRowSchema);
  },
  data() {
    return {
      cvRowModel: {},
      cvRowSchema: {
        title: null,
        category: null,
        year: null,
        location: null,
        location_name: null,
        active: true,
      },
      activeFields: [],
    };
  },
};
</script>

<style lang="scss">
  @import '~styles/layout';

  .cv-modal {
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

  .cv-modal__background {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0 ,0, 0.5);
  }

  .cv-modal__container {
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

  .cv-modal__body {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .cv-modal__edit,
  .cv-modal__preview {
    width: 49%;
  }

  .cv-modal__edit-row {
    flex: 0 0 auto;
    width: 100%;
    margin-bottom: 1em;
    &:not(.cv-modal__edit-row_no-border) {
      border: 1px solid black;
    }
    &.cv-modal__edit-row_error {
      border-color: red;
    }

    &.cv-modal__edit-row_active {
      border-color: #1496bb;
    }

    @include respond-to(large) {
      /*flex-basis: 50%;*/
    }
  }

  .cv-modal__edit-header {
    margin-bottom: 0;
  }

  .cv-modal__edit-header button {
    position: relative;
    font-weight: 500;
    padding-left: 0.875em;
    cursor: pointer;
    font-style: italic;

    &:before {
      position: absolute;
      content: '+';
      left: 0;
      top: -3px;
      font-size: 1.25em;
      font-weight: 500;
      transition: transform 100ms ease-in;
    }

    &:hover {
      &:before {
        transform: rotate(45deg);
      }
    }
  }

  .cv-modal {
    font-size: 1em;
  }

  .cv-modal__header {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .cv-modal__title, .cv-modal__button h2 {
    font-size: 1.5rem;
    font-weight: 700;
    font-style: italic;
  }

  .cv-modal__title {
    margin-top: 6px;
    margin-bottom: 6px;
  }

  .cv-modal__button {
    align-self: flex-end;
  }

  .cv-modal__edit-row {
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

  .cv-modal__preview {
    display: flex;
    flex-direction: column;
  }

  .cv-modal__preview-header,
  .cv-modal__preview-body {
    width: 100%;
  }

  .cv-modal__preview-header {
    margin-bottom: 0;
    line-height: 2.5;
    font-style: italic;
  }

  .cv-modal__preview-body {
    flex-grow: 1;
    flex-basis: 100%;
    border: 1px solid black;
  }

</style>
