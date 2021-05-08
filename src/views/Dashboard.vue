<template>
  <div class="home">
    <a-row style="align-items: center">
      <a-col :md="4" :lg="3" :xl="3" :xxl="2" :xs="24">
        <router-link to="/"
          ><img src="../assets/logo.svg" height="44"
        /></router-link>
      </a-col>
      <a-col flex="auto">
        <div class="box">
          <a-input-search
            v-model:value="value"
            placeholder="AA address"
            enter-button="Search"
            @search="onSearch"
          >
            <template #prefix>
              <SearchOutlined style="color: #dbdbdb" />
            </template>
          </a-input-search>
        </div>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :md="12" :xs="24" style="margin-top: 24px">
        <div class="box">
          <div class="boxTitle">All transactions</div>
          <div class="boxDates">Last 30 days</div>
          <apexchart
            type="area"
            height="350"
            ref="chart1"
            :options="chartOptions"
            :series="series1"
          ></apexchart>
        </div>
      </a-col>
      <a-col :md="12" :xs="24">
        <div class="box" style="margin-top: 24px">
          <div class="boxTitle">Input transactions</div>
          <div class="boxDates">Last 30 days</div>
          <apexchart
            type="area"
            height="350"
            ref="chart2"
            :options="chartOptions"
            :series="series2"
          ></apexchart>
        </div>
      </a-col>
      <a-col :md="12" :xs="24">
        <div class="box" style="margin-top: 24px">
          <div class="boxTitle">Output transactions</div>
          <div class="boxDates">Last 30 days</div>
          <apexchart
            type="area"
            height="350"
            ref="chart3"
            :options="chartOptions"
            :series="series3"
          ></apexchart>
        </div>
      </a-col>
      <a-col :md="12" :xs="24">
        <div class="box" style="margin-top: 24px">
          <div class="boxTitle">Unique addresses that interacted with AA</div>
          <div class="boxDates">Last 30 days</div>
          <apexchart
            type="area"
            height="350"
            ref="chart4"
            :options="chartOptions2"
            :series="series4"
          ></apexchart>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
const axios = require("axios");
import { SearchOutlined } from "@ant-design/icons-vue";

export default {
  name: "Home",
  components: {
    SearchOutlined,
  },
  data: function () {
    return {
      value: "",
      series1: [
        {
          name: "Transactions",
          data: [],
        },
      ],
      series2: [
        {
          name: "Transactions",
          data: [],
        },
      ],
      series3: [
        {
          name: "Transactions",
          data: [],
        },
      ],
      series4: [
        {
          name: "Addresses",
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          type: "area",
          stacked: false,
          height: 350,
          zoom: {
            type: "x",
            enabled: true,
            autoScaleYaxis: true,
          },
          toolbar: {
            autoSelected: "zoom",
          },
        },
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: "straight",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        yaxis: {
          title: {
            text: "Transactions",
          },
        },
        xaxis: {
          type: "datetime",
        },
      },
      chartOptions2: {
        chart: {
          type: "area",
          stacked: false,
          height: 350,
          zoom: {
            type: "x",
            enabled: true,
            autoScaleYaxis: true,
          },
          toolbar: {
            autoSelected: "zoom",
          },
        },
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: "straight",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        yaxis: {
          title: {
            text: "Addresses",
          },
        },
        xaxis: {
          type: "datetime",
        },
      },
    };
  },
  watch: {
    $route() {
      this.updateCharts();
    },
  },
  mounted() {
    this.updateCharts();
  },
  methods: {
    dataToValue(data) {
      const d = [];
      for (let key in data) {
        d.push([key, data[key]]);
      }
      return d;
    },
    onSearch() {
      const v = this.value.trim();
      if (!/^[A-Z0-9]{32}$/.test(v)) return alert("Incorrect address");

      this.$router.push({ name: "Dashboard", params: { address: v } });
    },
    updateCharts() {
      const address = this.$route.params.address;
      this.value = address;
      axios
        .get("/getData/" + address)
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          const { all, receive, outgoing, uniqAddresses } = data;
          this.$refs.chart1.updateSeries([
            {
              data: this.dataToValue(all),
            },
          ]);
          this.$refs.chart2.updateSeries([
            {
              data: this.dataToValue(receive),
            },
          ]);
          this.$refs.chart3.updateSeries([
            {
              data: this.dataToValue(outgoing),
            },
          ]);
          this.$refs.chart4.updateSeries([
            {
              data: this.dataToValue(uniqAddresses),
            },
          ]);
        });
    },
  },
};
</script>

<style scoped>
.home {
  /*max-width: 1000px;*/
  /*margin: auto;*/
  padding: 40px 24px;
}
.box {
  padding: 24px 18px;
  border: 1px solid #e9e9e9;
  text-align: left;
}
.boxTitle {
  font-size: 18px;
  margin-left: 6px;
  font-weight: bold;
}
.boxDates {
  font-size: 14px;
  margin: 14px 0 20px 6px;
  color: #4f4f4f;
}
</style>
