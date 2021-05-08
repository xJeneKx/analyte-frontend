<template>
  <div class="home">
    <div id="logoAndTitle">
      <div><img src="../assets/logo.svg" height="72" /></div>
      <div id="title">Analytics for autonomous agents</div>
    </div>
    <div id="searchBox">
      <a-input-search
        v-model:value="value"
        placeholder="AA address"
        enter-button="Search"
        size="large"
        @search="onSearch"
      >
        <template #prefix>
          <SearchOutlined style="color: #dbdbdb" />
        </template>
      </a-input-search>
    </div>
  </div>
</template>

<script>
import { SearchOutlined } from "@ant-design/icons-vue";

export default {
  name: "Home",
  components: {
    SearchOutlined,
  },
  data() {
    return {
      value: "",
    };
  },
  methods: {
    onSearch() {
      const v = this.value.trim();
      if (!/^[A-Z0-9]{32}$/.test(v)) return alert("Incorrect address");

      this.$router.push({ name: "Dashboard", params: { address: v } });
    },
  },
};
</script>

<style scoped>
.home {
  padding-top: 200px;
}
#logoAndTitle {
  text-align: center;
}

#title {
  margin-top: 32px;
  font-size: 24px;
  color: #4f4f4f;
}

#searchBox {
  text-align: center;
  max-width: 552px;
  margin: 52px auto 0 auto;
}
</style>
