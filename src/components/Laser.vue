<template>
  <v-card flat>
    <p class="text-center text-h3 mt-2 mb-2">Detection</p>
    <div class="d-flex ma-0 pa-0 justify-center align-center h-100 w-100">
      <v-btn @click="reset()" :color="$store.state.color" dark large class="mb-3 mx-auto">reset</v-btn>
    </div>
    <div class="d-flex ma-0 pa-0 justify-center align-center h-100 w-100 mb-10">
      <div id="canvas"></div>
    </div>
  </v-card>
</template>

<script>
import wsClient from "../_websocket.js"

export default {
  name: "Debug",

  data: () => ({
    tableWidth: "",
    tableHeight: "",
    circles: [],
    angleOffset:0.2,
    ws: undefined,

    elem : undefined,
    params : undefined,
    two : undefined,
  }),
  mounted() {
    this.tableWidth = window.screen.width*8/10
    this.tableHeight = this.tableWidth*2/3

    this.elem = document.getElementById('canvas')
    this.params = { width: this.tableWidth, height: this.tableHeight }
    this.two = new Two(this.params).appendTo(this.elem)

    this.ws = new wsClient("192.168.1.128:8082")
    this.ws.open()

    this.grid()

    this.ws.addEventListener("lidar", (data) => {
      data = data.detail
      console.log(data)
      this.addPoint(data[1]*this.tableHeight/2000, data[0]*this.tableHeight/2000)
      this.two.update();
    })
  },

  methods: {

    addPoint(centerY, centerX) {
      let point = this.two.makeCircle(centerY, centerX, 3)
      // let jpp = this.two.makeText("["+centerY.toFixed(1)+", "+centerX.toFixed(1)+"]", centerY, centerX + 5, "")
      point.fill = "#000000";
      point.stroke = "black";
      point.linewidth = 1;
      this.circles.push({ point });
      setTimeout(() => {
        this.two.remove(point)
        // this.two.remove(jpp)
      }, 3000)
    },

    reset() {
      this.two.clear()
      this.grid()
    },

  grid() {
    var l = 30
    var L = 20
    for (let i = 0; i < l; i++) {
      for (let j = 0; j < L; j++) {
        var rect = this.two.makeRectangle(50*this.tableHeight/2000+100*i*this.tableHeight/2000, 50*this.tableHeight/2000+100*j*this.tableHeight/2000, 100*this.tableHeight/2000, 100*this.tableHeight/2000);
        rect.fill = '#eaeaea';
        rect.stroke = '#afafaf';
      }
    }
  }
  },
};

</script>
