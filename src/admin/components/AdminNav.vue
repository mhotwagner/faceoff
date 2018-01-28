<template>
  <nav class="admin-nav">

    <div class="admin-nav-account">
      <ul class="admin-nav-account__links">
        <li class="admin-nav-account__settings admin-nav-account__item">
          <router-link to="#">
            <h4>
              <md-icon class="admin-nav-account__settings-icon">settings</md-icon></h4>
          </router-link>
        </li>
        <li class="admin-nav-account__profile admin-nav-account__item">
          <router-link :to="{ name: 'profile' }">my profile</router-link>
        </li>
        <li class="admin-nav-account__extra admin-nav-account__item">
          <router-link to="#" class="admin-nav-account__extra-link" >my list</router-link>
          <router-link to="#" class="admin-nav-account__extra-link">my dashboard</router-link>
        </li>
      </ul>
    </div>

    <div class="admin-nav-links">
      <div class="admin-nav-links__home">
        <router-link to="/">
          <h1>
            art<i>wrld</i>
          </h1>
        </router-link>
      </div>
      <div class="admin-nav-links__links">
        <router-link
          v-for="link in navLinks"
          :to="link.href"
          :key="link.href"
          class="admin-nav-links__links-item"
        >{{ link.name }}</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'admin-nav',
  data() {
    return {
      navLinks: [
        { name: 'networks', href: 'networks' },
        { name: 'map', href: 'map' },
        { name: 'feed', href: 'feed' },
        { name: 'opportunities', href: 'opportunities' },
        { name: 'editorial', href: 'editorial' },
      ],
    };
  },
};
</script>

<style lang="scss">
@import '~styles/layout';

a {
  position: relative;
  text-decoration: none;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 100%;
    width: 0;
    height: 1px;
    background-color: black;
    transition: width 100ms ease-out;
  }
}
a:hover, a:focus {
  text-decoration: none !important;
  &:after {
    width: 100%;
  }
}
.admin-nav {
  display: flex;
  padding-bottom: 0.5em;
  border-bottom: 1px solid black;
}

.admin-nav-account__item {
  padding-top: 0.5em;
}

.admin-nav-account__settings {
  .admin-nav-account__settings-icon {
    transition: transform 200ms ease-in;
  }
}

.admin-nav-account__settings:hover {
  .admin-nav-account__settings-icon {
    transform: rotate(45deg);
  }
}

.admin-nav-account__profile,
.admin-nav-account__extra {
  font-style: italic;
}

.admin-nav-account__profile {
  font-weight: 500;
}

.admin-nav-account__extra-link {
  margin-right: 2em;
}

.admin-nav-links {
  text-align: right;
}
.admin-nav-links__home {
  padding-top: 1em;
  h1 {
    font-weight: 700;
  };
}

.admin-nav-links__links {
  padding-top: 0.5em;
}

.admin-nav-links__links-item {
  text-transform: uppercase;
  margin-left: 2em;
  &:first-of-type {
    margin-left: 0;
  }
}

@include respond-to(medium) {
  .admin-nav-account, .admin-nav-links {
    flex-basis: 50%;
  }
}

</style>
