<template>
  <div class="profile">
    <header class="profile-header">
      <div class="profile-header__quicklinks">
          <router-link
            v-for="link in quicklinks"
            :to="{ name: link.name }"
            :key="link.name"
            class="profile-header__quicklink"
          >
            {{ link.displayName }}
          </router-link>
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
            @keyup.enter="setShortDescription"
          />
          <md-button
            class="profile-header__short-description-button md-icon-button"
            @click="handleShortDescriptionButton"
          >
            <md-icon>mode_edit</md-icon>
          </md-button>
        </div>
      </div>
    </header>
    <section class="profile-links">
      <div
        class="profile-links__item"
        v-for="link in profileLinks"
        :key="link.name"
      >
        <div class="profile-links__item-inner">
          <span class="profile-links__item-name">{{ link.displayName }}</span>
          <span class="profile-links__item-button">Edit</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'profile',
  computed: {
    account() {
      return this.$store.getters.account();
    },
    shortDescription: {
      get() {
        return this.$store.getters.account().short_description;
      },
      set(value) {
        console.log('pre', this.account);
        const account = Object.assign({}, this.account, { short_description: value });
        this.$store.commit('SET_ACCOUNT', account);
      },
    }
  },
  methods: {
    handleShortDescriptionButton() {
      this.$refs.shortDescription.select();
    },
    setShortDescription(e) {
      const account = Object.assign({}, this.account, { shortDescription: e.target.value });
      this.$store.dispatch('UPDATE_ACCOUNT', account);
    },
    editShortDescription() {
    }
  },
  data() {
    return {
      quicklinks: [
        {
          name: 'create-post',
          displayName: 'post',
        },
        {
          name: 'create-project',
          displayName: 'project',
        },
        {
          name: 'create-event',
          displayName: 'event',
        }
      ],
      profileLinks: [
        { name: 'about', displayName: 'about' },
        { name: 'artist-statement', displayName: 'artist statement' },
        { name: 'cv', displayName: 'cv/resume' },
        { name: 'networks', displayName: 'networks' },
        { name: 'skills', displayName: 'skills' },
        { name: 'publications', displayName: 'publications' },
        { name: 'contact', displayName: 'contact' },
        { name: 'image-inventory', displayName: 'image inventory' },
        { name: 'location', displayName: 'location' },
      ],
    };
  }
};
</script>

<style lang="scss">
@import '~styles/layout';

.profile-header__quicklinks {
  display: flex;
  border-bottom: 1px solid black;
}

@include respond-to(large) {
  .profile-header__quicklinks {
    width: 75%;
  }
}

.profile-header__quicklink {
    padding-left: .875em;
    padding-right: 2em;
    text-transform: uppercase;
    font-size: 2.25em;
    line-height: 2;
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
}

.profile-header__name {
  font-size: 2.5em;
  font-weight: 500;
  text-transform: uppercase;
  font-style: italic;
}
.profile-header__short-description {
  display: flex;
}

.profile-header__short-description-button {
  margin-top: 0.5em;
}

.profile-header__short-description-text {
  color: grey;
  height: 2.5em;
  padding-top: 0.75em;
  padding-bottom: 0;
  border: none;
  border-bottom: 1px solid black;
  font-size: 0.875rem;

  @include respond-to(medium) {
    margin-left: 2em;
    width: 600px;
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
</style>
