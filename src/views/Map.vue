<template>
  <v-container fluid>
    <v-col cols="12" lg="11" xl="12" class="mx-auto">
    <v-row>
      <v-col cols="12" sm="12" md="8" class="py-0">
        <div class="map">
          <div class="canvas-container">
          </div>
          <div class="canvas-background">
          </div>
        </div>
      </v-col>
      <v-col
        cols="12" sm="12" md="4" class="py-0"
        :class="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs ? 'mt-3': ''">
        <v-card>
          <v-card-text>
            <v-row>
              <v-col
                cols="12" xs="12" sm="6" class="py-0"
                :class="selectedRobot === 1 ? 'pos-disabled' : ''">
                <span class="grey--text">Primary</span>
                <div style="color: red;" class="mt-1 mb-1">
                  X: {{ mainRobotPos[0] }} mm
                </div>
                <div style="color: green;" class="mb-1">
                  Y: {{ mainRobotPos[1] }} mm
                </div>
                <div style="color: purple;">
                  θ: {{ mainRobotPos[2] }} °
                </div>
              </v-col>
              <v-col
                cols="12" xs="12" sm="6" class="py-0"
                :class="selectedRobot === 0 ? 'pos-disabled' : ''">
                <span class="grey--text">Secondary</span>
                <div style="color: red;" class="mt-1 mb-1">
                  X: {{ secondaryRobotPos[0] }} mm
                </div>
                <div style="color: green;" class="mb-1">
                  Y: {{ secondaryRobotPos[1] }} mm
                </div>
                <div style="color: purple;">
                  θ: {{ secondaryRobotPos[2] }} °
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card class="mt-3">
          <v-card-text>
            <v-row>
              <v-col cols="12" xs="12" sm="6" class="py-0">
                <div class="mb-1">
                  <pre>[{{ mousePosition[0] }}, {{ mousePosition[1] }}]</pre>
                </div>
                <div>
                  <div style="color: red;" class="mb-1">
                    DX: {{ mesuredDelta[0] }} mm
                  </div>
                  <div style="color: green;" class="mb-1">
                    DY: {{ mesuredDelta[1] }} mm
                  </div>
                  <div style="color: purple;">
                    <span style="visibility: hidden">D</span>√: {{ mesuredLength }} mm
                  </div>
                </div>
              </v-col>
              <v-col cols="12" xs="12" sm="6" class="py-0">
                <v-btn color="primary" @click="toggleMesure()" class="mb-2">
                  <v-icon left>square_foot</v-icon>
                  <span v-if="mesure">Cancel</span><span v-else>Mesure</span>
                </v-btn>  
                <v-btn @click="pauseOrResume()" class="mb-2">
                  <span v-if="paused"><v-icon left>play_arrow</v-icon>Resume</span>
                  <span v-else><v-icon left>pause</v-icon> Pause</span>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <div class="mt-3">
          <v-card>
            <v-card-text class="pa-0">
              <v-tabs fixed-tabs v-model="selectedRobot">
                <v-tab>
                  Primary
                </v-tab>
                <v-tab>
                  Secondary
                </v-tab>
              </v-tabs>
              <div class="pa-3">
                <div class="mt-1 d-flex justify-center">
                  <v-btn outlined color="indigo" @click="openGoToModal()" class="mr-2">
                    <v-icon small left>room</v-icon> Go to
                  </v-btn>
                  <v-btn outlined color="teal" @click="openOrientToModal()" class="mr-2">
                    <v-icon small left>flip_camera_android</v-icon> Orient to
                  </v-btn>
                  <v-btn outlined color="warning" @click="reset()">
                    <v-icon>settings_backup_restore</v-icon>
                  </v-btn>
                </div>
                <div v-if="selectedRobot == 0">
                  <!-- <div class="mt-1">
                    <v-btn small outlined color="deep-orange" @click="openGoToModal()" class="mr-2">
                      Open Claw
                    </v-btn>
                    <v-btn small outlined color="deep-orange" @click="openGoToModal()" class="mr-2">
                      Close
                    </v-btn>
                  </div>
                  <div class="mt-1">
                    <v-subheader>Elevator</v-subheader>
                    <v-btn small outlined color="green" @click="openGoToModal()" class="mr-2">
                      Origin Elevator
                    </v-btn>
                    <v-btn small outlined color="green" @click="openGoToModal()" class="mr-2">
                      Go To
                    </v-btn>
                  </div> -->
                  <v-list class="mt-2">
                    <v-divider />
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          Elevator
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <div class="d-flex justify-center align-items">
                          <v-btn outlined color="green" class="mr-2" small>
                            Origin
                          </v-btn>
                          <v-btn outlined color="green" small>
                            Go TO
                          </v-btn>
                        </div>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider />

                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          Claw
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <div class="d-flex justify-center align-items">
                          <v-btn outlined color="deep-orange" small class="mr-2">
                            Open
                          </v-btn>
                          <v-btn outlined color="deep-orange" small>
                            Close
                          </v-btn>
                        </div>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider />
                  </v-list>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>
    </v-col>
    <v-dialog v-model="goToModal" max-width="600px">
      <v-card>
        <v-card-title>I'm the {{ selectedRobotName }} robot, where do you want me to go ?</v-card-title>
        <v-card-text class="pb-0">
          <div class="text-body-2">
            I'm your slave do whatever you want with me!
          </div>
          <v-text-field
            type="number"
            v-model="targetX"
            label="X (mm)"
          />
          <v-text-field
            type="number"
            v-model="targetY"
            label="Y (mm)"
          />
          <v-text-field
            type="number"
            v-model="targetTheta"
            label="Theta (degrees)"
          />
          <v-text-field
            type="number"
            v-model="actionSpeed"
            label="Speed"
          />
          <v-select
            v-model="stopOn"
            :items="sides"
            label="Stop on"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="goToModal = false">
            Close
          </v-btn>
          <v-spacer />
          <v-btn text color="primary" @click="goTo()">
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="orientToModal" max-width="600px">
      <v-card>
        <v-card-title>I'm the {{ selectedRobotName }} robot, where do you want me to orient ?</v-card-title>
        <v-card-text class="pb-0">
          <v-text-field
            type="number"
            v-model="targetTheta"
            label="Theta (degrees)"
          />
          <v-text-field
            type="number"
            v-model="actionSpeed"
            label="Speed"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="goToModal = false">
            Close
          </v-btn>
          <v-spacer />
          <v-btn text color="primary" @click="orientTo()">
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    canvas: null,
    container: null,
    canvasWidth: 0,
    canvasHeight: 0,
    two: null,

    mesure: false,
    mesuredLength: 0,
    mesuredDelta: [0, 0],
    mesurePoints: 0,
    crossGroup: null,
    mousePosition: [0, 0],
    paused: false,

    mainRobot: null,

    mainRobotPos: [0, 0, 0],
    secondaryRobotPos: [0, 0, 0],

    lidarPoints: [],

    goToModal: false,
    targetX: 0,
    targetY: 0,
    targetTheta: 0,
    actionSpeed: 40,
    stopOn: 'none',

    sides: ['none', 'front', 'left', 'right'],
    
    orientToModal: false,

    latchedPosition: [],
    selectedRobot: 0
  }),

  computed: {
    selectedRobotName () {
      return this.selectedRobot === 0 ? 'primary' : 'secondary'
    }
  },

  mounted () {
    this.init()

    window.removeEventListener('resize', this.init)
    window.addEventListener('resize', this.init)
    window.updateRobot = this.updateRobot
    window.addLidarPoint = this.addLidarPoint
  },

  methods: {
    init () {
      // will initialize canvas and draw the basis

      // manage canvas width and height
      let container = document.getElementsByClassName('canvas-container')[0]
      let background = document.getElementsByClassName('canvas-background')[0]
      let map = document.getElementsByClassName('map')[0]

      if (container == null) {
        return
      }
      container.innerHTML = ''
      container.onmousemove = this.onCanvasMouseMouve
      container.onclick = this.onCanvasClick

      this.canvasWidth = container.clientWidth
      this.canvasHeight = (2/3) * this.canvasWidth
      container.setAttribute('style', 'height: ' + this.canvasHeight + 'px')
      background.setAttribute('style', 'height: ' + this.canvasHeight + 'px')
      map.setAttribute('style', 'height: ' + this.canvasHeight + 'px')
      
      this.two = new Two({
        width: this.canvasWidth,
        height: this.canvasHeight
      }).appendTo(container)

      this.container = container
      // var circle = this.two.makeCircle(72, 100, 50);
      // circle.fill = '#FF8000';
      // circle.stroke = 'orangered'; // Accepts all valid css color
      // circle.linewidth = 5;

      this.renderGrid()
      this.renderRobot()

      this.two.update()
      
      this.$store.state.ws.on('lidar', 'l1', this.onLidarData)

      this.$store.state.ws.on('mainPosition', 'm1', this.onMainPositionUpdate)
    },

    /**
     * Data listeners
     */
    onMainPositionUpdate (event) {
      //console.log(event.detail)
      if (this.paused) return
      this.updateRobot([
        parseFloat(event.detail[0]),
        parseFloat(event.detail[1]),
        parseFloat(event.detail[2])
      ])
      this.two.update()
    },
    
    onLidarData (data) {
      if (this.paused) return
      data = data.detail
      this.addLidarPoint(data[0], data[1])
      this.two.update()
    },

    renderGrid() {
      var l = 30
      var L = 20
      let h = this.canvasHeight/2000
      for (let i = 0; i < l; i++) {
        for (let j = 0; j < L; j++) {
          var rect = this.two.makeRectangle(
            50 * h +
            100 * i * h,
            50 * h + 100 * j * h,
            100 * h,
            100*h
          )
          rect.fill = 'transparent'
          rect.stroke = 'rgba(0, 0, 0, 0.25)'
        }
      }
    },
  
    renderRobot () {
      this.mainRobot = this.two.makeGroup()

      //let center = [ this.toX(this.mainRobotPosition[0]), this.toY(this.mainRobotPosition[1]) ]
      // let longSide = this.toX(300)
      // let shortSide = this.toX(226)
      let mainRect = this.two.makeRectangle(
        0,
        0,
        this.toX(300),
        this.toY(226)
      )
      let clawRect = this.two.makeRectangle(
        0,
        this.toY(226/2 + 70/2 - 2),
        this.toX(164),
        this.toY(70)
      )
      // let robotPath = this.two.makePath([
      //   new Two.Vector(x, y),

      // ])
      let center = this.two.makeCircle(
        0,
        0,
        3
      )

      this.mainRobot.add(mainRect)
      this.mainRobot.add(clawRect)
      this.mainRobot.add(center)
      this.mainRobot.fill = "#1E0964"
      center.fill = "white"
      this.mainRobot.linewidth = 0

      this.updateRobot([0, 0, Math.PI])
    },

    updateRobot (pos) {
      this.mainRobot.translation.x = this.toY(pos[1])
      this.mainRobot.translation.y = this.toX(pos[0])
      this.mainRobot.rotation = -pos[2]
      
      pos[0] = pos[0].toFixed(2)
      pos[1] = pos[1].toFixed(2)
      pos[2] = parseFloat(( pos[2] * 180/Math.PI ).toFixed(2))
      this.mainRobotPos = pos
    },

    toggleMesure () {
      if (this.crossGroup !== null) {
        this.crossGroup.remove()
      }
      this.crossGroup = null
      this.mesurePoints = []
      this.mesure = !this.mesure
      this.mesuredLength = 0
    },

    addLidarPoint(centerX, centerY, angle) {
      let point = this.two.makeCircle(
        this.toY(centerY),
        this.toX(centerX),
        3
      )
      point.fill = "white"
      point.stroke = "black"
      point.linewidth = 1
      // this.lidarPoints.push({ point })
      setTimeout(() => {
        this.two.remove(point)
      }, 3000)
    },
    
    createCross() {
      // group.add(new Two.Line(
      //   this.toX(this.state.mouse.position.x),
      //   this.toY(this.state.mouse.position.y) - 20,
      //   this.toX(this.state.mouse.position.x),
      //   this.toY(this.state.mouse.position.y) + 20,
      // ))
      // group.add(new Two.Line(
      //   this.toX(this.state.mouse.position.x) - 20,
      //   this.toY(this.state.mouse.position.y),
      //   this.toX(this.state.mouse.position.x) + 20,
      //   this.toY(this.state.mouse.position.y),
      // ))
      let circle = this.two.makeCircle(
        this.toY(this.mousePosition[1]), 
        this.toX(this.mousePosition[0]),
        3
      )

      circle.fill = 'blue'
      this.crossGroup.add(circle)
    },

    // convert a X millimeter coordinate to a X pixel coordinate
    toX (coordinate) { return (coordinate*this.canvasHeight)/2000 },

    // convert a Y millimeter coordinate to a Y pixel coordinate
    toY (coordinate) { return (coordinate*this.canvasWidth)/3000 },

    // convert a X pixel coordinate to a X millimeter coordinate
    fromX (coordinate) { return (coordinate*2000)/this.canvasHeight },

    // convert a Y pixel coordinate to a Y millimeter coordinate
    fromY (coordinate) { return (coordinate*3000)/this.canvasWidth },

    onCanvasMouseMouve (event) {
      //if (this.paused) return

      let mouseX, mouseY = 0

      let offsetX = this.container.offsetLeft
      let offsetY = this.container.offsetTop
      let element = this.container.offsetParent

      while(element != null) {
        offsetX = parseInt(offsetX) + parseInt(element.offsetLeft)
        offsetY = parseInt(offsetY) + parseInt(element.offsetTop)
        element = element.offsetParent
      }

      mouseX = this.fromX(event.pageY - offsetY)
      mouseY = this.fromY(event.pageX - offsetX)
      
      this.mousePosition = [mouseX.toFixed(2), mouseY.toFixed(2)]
    },

    onCanvasClick () {
      if (this.mesure) {
        if (
          this.crossGroup !== null &&
          this.crossGroup.children.length === 5 &&
          this.mesuredLength !== 0
        ) {
          if (this.crossGroup !== null) {
            this.crossGroup.remove()
          }
          this.crossGroup = null
          this.mesuredLength = 0
          this.mesurePoints = []
        }
        if (this.crossGroup === null) {
          this.crossGroup = this.two.makeGroup()
        }
        if (this.mesurePoints.length < 2) {
          console.log('new point')
          this.createCross()
          this.mesurePoints.push({
            x: this.mousePosition[0],
            y: this.mousePosition[1]
          })
        }
        if (this.mesurePoints.length === 2 && this.mesuredLength === 0) {
          console.log('end of mesurement')
          // actually mesure
          // compute the modal
          // Math.sqrt((y_1 - y_2)**2 + (x_ 1 - x_2)**2)

          this.mesuredDelta = [
            Math.abs(this.mesurePoints[0].x - this.mesurePoints[1].x).toFixed(2),
            Math.abs(this.mesurePoints[0].y - this.mesurePoints[1].y).toFixed(2)
          ]
          this.mesuredLength = Math
            .sqrt(this.mesuredDelta[0] ** 2 + this.mesuredDelta[1] ** 2)
            .toFixed(2)

          let modalLine = this.two.makeLine(
            this.toY(this.mesurePoints[0].y),
            this.toX(this.mesurePoints[0].x),
            this.toY(this.mesurePoints[1].y),
            this.toX(this.mesurePoints[1].x)
          )

          let xLine = this.two.makeLine(
            this.toY(this.mesurePoints[0].y),
            this.toX(this.mesurePoints[0].x),
            this.toY(this.mesurePoints[0].y),
            this.toX(this.mesurePoints[1].x)
          )

          let yLine = this.two.makeLine(
            this.toY(this.mesurePoints[0].y),
            this.toX(this.mesurePoints[1].x),
            this.toY(this.mesurePoints[1].y),
            this.toX(this.mesurePoints[1].x)
          )
          modalLine.stroke = 'purple'
          modalLine.linewidth = 2
          xLine.stroke = 'red'
          yLine.stroke = 'green'
          this.crossGroup.add(modalLine)
          this.crossGroup.add(yLine)
          this.crossGroup.add(xLine)
        }
      } else {
        if (this.crossGroup !== null)
          this.crossGroup.remove()
          this.crossGroup = null
        if (this.crossGroup === null)
          this.crossGroup = this.two.makeGroup()
        
        this.latchedPosition = [this.mousePosition[0], this.mousePosition[1]]
        this.createCross()
      }
      this.two.update()
    },

    pauseOrResume () {
      this.paused = !this.paused
    },

    openGoToModal () {
      this.targetX = this.latchedPosition[0]
      this.targetY = this.latchedPosition[1]
      this.goToModal = true
    },

    openOrientToModal () {
      this.targetTheta = 180
      this.orientToModal = true
    },

    goTo () {
      let opts = {
        robot: this.selectedRobotName,
        x: this.targetX,
        y: this.targetY,
        theta: this.targetTheta*Math.PI/180,
        speed: this.actionSpeed
      }
      if (this.stopOn != 'none') {
        opts.stopOn = this.stopOn
      }
      this.$store.state.ws.send('goTo', opts)
      this.goToModal = false
    },

    orientTo () {
      this.$store.state.ws.send('orientTo', {
        robot: this.selectedRobotName,
        orientation: this.targetTheta*Math.PI/180,
        speed: this.actionSpeed
      })
      this.orientToModal = false
    },

    reset () {
      this.$store.state.ws.send('reset', {
        robot: this.selectedRobotName,
      })
    }
  }
}
</script>

<style>
.map {
  position: relative;
}

.canvas-container {
  width: 100%;
  cursor: crosshair;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.canvas-background {
  background-image: url('/back.svg');
  background-size: contain;
  opacity: 0.75;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.pos-disabled {
  opacity: 0.55;
  filter: contrast(0.2);
}

</style>