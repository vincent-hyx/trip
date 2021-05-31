// pages/page2/page2.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSchoolMarkers();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 使用 wx.createMapContext 获取 map 上下文 
    this.mapCtx = wx.createMapContext('myMap')

    this.setData({
      scale: 16,
      longitude: 102.769424,
      latitude: 24.821229
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  loadGeoMarker() {
    let that = this
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        //console.log(res)
        let latitude = res.latitude;
        let longitude = res.longitude;
        this.setData({
          centerX: longitude,
          centerY: latitude
        })

        //console.log(this.data.markers);
      }
    });
  },
  regionchange(e) {
    //console.log(e.type)
  },
  markertap(e) {
    console.log(e)
    //console.log(e.markerId)

    var find = this.data.markers.filter((p) => {
      return p.id == e.markerId
    });

    var findObj = find[0];

    app.globalData.viewNode = findObj;

    console.log(findObj)

    this.gotoViewItem()

  },
  controltap(e) {
    //console.log(e.controlId)
    this.moveToLocation()
  },
  async getSchoolMarkers() {
    const db = wx.cloud.database({})
    const cloudData = await db.collection('fishing_river').get()
    const geoData = cloudData.data
    //console.log(geoData);

    this.setData({
      schoolData: geoData
    })
    //console.log(this.data);

    let markers = [];
    //console.log(geoData)
    for (let item of geoData) {
      //console.log(item)
      markers.push(item)
    }

    //console.log(markers)

    this.setData({
      markers: markers
    })

  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  gotoViewItem: function (e) {

    //console.log(app.globalData);

    wx.navigateTo({
      url: '../viewitem/viewitem'
    })

  },
})