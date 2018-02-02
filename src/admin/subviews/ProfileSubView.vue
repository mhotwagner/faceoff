<template>
  <div class="profile">
    <header class="profile-header">
      <div class="profile-header__quicklinks">
          <button
            v-for="link in quicklinks"
            @click="link.action"
            :key="link.name"
            class="profile-header__quicklink"
          >
            {{ link.displayName }}
          </button>
      </div>
      <div class="profile-header__info">
        <div class="profile-header__name">
          {{ account.full_name }}
        </div>
        <div class="profile-header__short-description">
          <input
            type="text"
            class="profile-header__short-description-text"
            v-model="shortDescription"
            ref="shortDescription"
            @keyup.enter="setShortDescription"
            @click="selectShortDescription"
          />
          <md-button
            class="profile-header__short-description-button md-icon-button"
            @click="selectShortDescription"
          >
            <md-icon>mode_edit</md-icon>
          </md-button>
        </div>
      </div>
    </header>
    <section class="profile-links">
      <profile-action-item
        class="profile-links__item"
        v-for="actionItem in profileActionItems"
        :key="actionItem.name"
        :text="actionItem.displayName"
        @click.native="actionItem.action"
      ><!-- empty --></profile-action-item>
    </section>

    <form-modal
      class="profile-links__about-modal"
      v-if="showAboutFormModal"
      title="EDIT ABOUT PAGE:"
      buttonText="PUBLISH"
      :formFields="aboutFormModalFields"
      action-type="UPDATE_ACCOUNT"
      v-on:close="showAboutFormModal = false"
    ><!-- empty --></form-modal>

    <create-project-modal
      v-if="showCreateProjectModal" :value="{ user_id: account.id }"
      v-on:close="showCreateProjectModal = false"
    ><!-- empty --></create-project-modal>

    <create-event-modal
      v-if="showCreateEventModal" :value="{ user_id: account.id }"
      v-on:close="showCreateEventModal = false"
    ><!-- empty --></create-event-modal>

    <create-post-modal
      v-if="showCreatePostModal" :value="{ user_id: account.id }"
      v-on:close="showCreatePostModal = false"
    ><!-- empty --></create-post-modal>
  </div>
</template>

<script>
import ProfileActionItem from '@/admin/components/ProfileActionItem';
import CreateEventModal from '@/admin/components/CreateEventModal';
import CreatePostModal from '@/admin/components/CreatePostModal';
import CreateProjectModal from '@/admin/components/CreateProjectModal';
import FormModal from '@/admin/components/FormModal';

export default {
  name: 'profile',
  components: {
    ProfileActionItem,
    CreateEventModal,
    CreatePostModal,
    CreateProjectModal,
    FormModal,
  },
  beforeMount() {
    console.log(this.account);
  },
  computed: {
    aboutFormModalFields() {
      return [
        {
          name: 'short_text',
          placeholder: 'SHORT TEXT',
          inputType: 'textarea',
          value: this.account.short_text,
          style: { height: '3em' },
        },
        {
          name: 'about',
          placeholder: 'ABOUT YOURSELF',
          inputType: 'textarea',
          value: this.account.about,
          style: { height: '6em' },
        },
        {
          name: 'tags',
          placeholder: 'SEARCH TAGS',
          inputType: 'null',
        },
        {
          name: 'images',
          placeholder: 'IMAGES',
          inputType: 'null',
        },
      ];
    },
    account() {
      return this.$store.getters.account();
    },
    shortDescription: {
      get() {
        return this.$store.getters.account().short_description;
      },
      set(value) {
        const account = Object.assign({}, this.account, { short_description: value });
        this.$store.commit('SET_ACCOUNT', account);
      },
    }
  },
  methods: {
    selectShortDescription() {
      this.$refs.shortDescription.select();
    },
    setShortDescription(e) {
      const account = Object.assign({}, this.account, { shortDescription: e.target.value });
      this.$store.dispatch('UPDATE_ACCOUNT', account);
    },
  },
  data() {
    return {
      showAboutFormModal: false,
      showCreateEventModal: false,
      showCreatePostModal: false,
      showCreateProjectModal: false,
      project: {
        title: '',
      },
      quicklinks: [
        {
          name: 'create-post',
          displayName: 'post',
          action: () => { this.showCreatePostModal = true; },
        },
        {
          name: 'create-project',
          displayName: 'project',
          action: () => { this.showCreateProjectModal = true; },
        },
        {
          name: 'create-event',
          displayName: 'event',
          action: () => { this.showCreateEventModal = true; },
        }
      ],
      profileActionItems: [
        {
          name: 'about',
          displayName: 'about',
          action: () => { this.showAboutFormModal = true; },
        },
        { name: 'artist_statement', displayName: 'artist statement', action: () => { return null; } },
        { name: 'cv', displayName: 'cv/resume', action: () => { return null; } },
        { name: 'networks', displayName: 'networks', action: () => { return null; } },
        { name: 'skills', displayName: 'skills', action: () => { return null; } },
        { name: 'publications', displayName: 'publications', action: () => { return null; } },
        { name: 'contact', displayName: 'contact', action: () => { return null; } },
        { name: 'image_inventory', displayName: 'image inventory', action: () => { return null; } },
        { name: 'location', displayName: 'location', action: () => { return null; } },
      ],
    };
  }
};
</script>

<style lang="scss">
@import '~styles/layout';

.create-project-form__row {
}

.profile-header {
  margin-bottom: 1em;
}

.profile-header__quicklinks {
  display: flex;
  border-bottom: 1px solid black;
}

@include respond-to(large) {
  .profile-header {
    width: 75%;
  }
}

.profile-header__quicklink {
  position: relative;
  padding-left: .875em;
  padding-right: 2em;
  text-transform: uppercase;
  font-size: 2.25em;
  line-height: 2;
  cursor: pointer;
}

.profile-header__quicklink:before {
  position: absolute;
  content: '+';
  left: 0;
  top: 0;
  font-size: 1.25em;
  line-height: 1.5;
  font-weight: 500;
  transition: transform 100ms ease-in;
}

.profile-header__quicklink:hover {
  &:before {
    transform: rotate(45deg);
  }
}

.profile-header__info {
  display: flex;
  flex-wrap: wrap;
}

.profile-header__name {
  margin-top: 0.25em;
  line-height: 1;
  font-size: 2.5em;
  font-weight: 500;
  text-transform: uppercase;
  font-style: italic;
  width: 100%;

  @include respond-to(medium) {
    width: auto;
  }
}
.profile-header__short-description {
  display: flex;
  margin-left: 5%;
  width: 90%;
  line-height: 1;
  @include respond-to(medium) {
    width: auto;
    flex-grow: 1;
  }
}

.profile-header__short-description-button {
  margin-top: 0.5em;

  @include respond-to(medium) {
    margin-left: -3em;
  }
}

.profile-header__short-description-text {
  color: grey;
  width: 100%;
  height: 2.5em;
  padding-bottom: 0;
  margin-bottom: 0.5em;
  border: none;
  border-bottom: 1px solid black;
  font-size: 0.875rem;

  @include respond-to(medium) {
    width: auto;
    margin-left: 2em;
    padding-top: 0.75em;
    width: 100%;
  }
}

.profile-links {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
}
.profile-links__item {
  flex: 0 0 100%;
  display: block;
  height: 3em;
  padding-right: 2em;
}

.profile-links__item-inner {
  padding-left: 1em;
  border-bottom: 1px solid black;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}
.profile-links__item-name {
  font-size: 1.5em;
  font-weight: 500;
  font-style: italic;
}
.profile-links__item-button {
  align-self: right;
  color: grey;
  font-style: italic;
  margin-top: 0.5em;
  position: relative;
  &:after {
    position: absolute;
    left: 0;
    top: 90%;
    transition: width 100ms ease-in;
    content: '';
    height: 1px;
    background-color: grey;
    width: 0;
  }
}

.profile-links__item-inner:hover {
  .profile-links__item-button:after {
    width: 100%;
  }
}

@include respond-to(medium) {
  .profile-links__item {
    flex-basis: 49%;
  }
}

@include respond-to(large) {
  .profile-links__item {
    flex-basis: 32%;
  }
}
</style>
