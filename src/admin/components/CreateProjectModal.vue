<template>
  <div class="create-project-modal modal">
    <div class="create-project-modal__container modal-container">
      <div class="create-project-modal__col modal-col">
        <div class="create-project-modal__row create-project-modal__header modal-row no-border">
          <h2 class="create-project-modal__header-text">ADD PROJECT:</h2>
        </div>
        <div class="create-project-modal__row create-project-modal__title modal-row">
          <input v-model="model.title" placeholder="TITLE" />
        </div>
        <div class="create-project-modal__row create-project-modal__short-description modal-row">
          <textarea v-model="model.short_description" placeholder="SHORT DESCRIPTION"></textarea>
        </div>
        <div class="create-project-modal__row create-project-modal__artist-statement modal-row">
          <textarea v-model="model.artist_statement" placeholder="PROJECT ARTIST STATEMENT"></textarea>
        </div>
        <div class="create-project-modal__row create-project-modal__exhibits modal-row">
          <p>EXHIBITS</p>
        </div>
      </div>
      <div class="create-project-modal__col modal-col">
        <div class="create-project-modal__row create-project-modal__publish modal-row no-border">
          <md-button @click="createProject"><h2>PUBLISH</h2></md-button>
        </div>
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
  methods: {
    createProject() {
      this.$store.dispatch('CREATE_PROJECT', this.model).then(() => {
        console.log('did it!');
      });
    },
  },
  beforeMount() {
    this.model = Object.assign({}, this.value, this.model);
    console.log(this.model);
  },
  data() {
    return {
      model: {
        title: null,
        short_description: null,
        artist_statement: null,
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
    background-color: rgba(0, 0 ,0, 0.5);
  }

  .modal-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    position: absolute;
    width: 900px;
    height: 600px;
    padding: 1em;
    background-color: #fff;
  }

  .modal-row {
    flex: 0 0 auto;
    width: 100%;

    @include respond-to(large) {
      /*flex-basis: 50%;*/
    }
  }

  .modal-col {
    display: flex;
    flex-direction: column;
    width: 100%;

    @include respond-to(large) {
      height: 100%;
      width: 49%;
    }
  }

  .create-project-modal {
    font-size: 1em;
  }

  .create-project-modal__header-text, .create-project-modal__publish h2 {
    font-size: 1.5rem;
    font-weight: 700;
    font-style: italic;
  }

  .create-project-modal__header-text {
    margin-top: 6px;
    margin-bottom: 6px;
  }

  .create-project-modal__row {
    padding: 0.5em;
    font-weight: 700;
    margin-bottom: 1em;
    &:not(.no-border) {
      border: 1px solid black;
    }

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
  }

  .create-project-modal__exhibits {
    height: 6em;
  }

  .create-project-modal__publish {
    text-align: right;
  }

  .create-project-modal__tags {
    height: 8em;
  }

  .create-project-modal__images {
    flex-grow: 1;
  }

</style>
