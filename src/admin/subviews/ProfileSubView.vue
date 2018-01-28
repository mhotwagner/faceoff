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
            <h1>{{ link.displayName }}</h1>
          </router-link>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'profile',
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
      ]
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
  h1 {
    padding-left: 0.75em;
    padding-right: 2em;
    text-transform: uppercase;
    font-size: 2.25em;
    line-height: 2;
  }
}
.profile-header__quicklink:before {
  position: absolute;
  content: '+';
  left: 0;
  top: 0;
  font-size: 2.5em;
  line-height: 1.75;
  font-weight: 500;
  transition: transform 100ms ease-in;
}

.profile-header__quicklink:hover {
  &:before {
    transform: rotate(45deg);
  }
}
</style>
