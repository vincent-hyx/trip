// pages/page3/page3.js
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
    this.loadArticles();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  async loadArticles() {
    const db = wx.cloud.database({})
    const cloudData = await db.collection('inform_geo').orderBy('datetime', 'desc').get()
    const articles = cloudData.data
    //console.log(articles);

    this.setData({
      articleList: articles
    })
    //console.log(this.data);
  },
  gotoViewNote: function (e) {
    // console.log(e.currentTarget.dataset);

    app.globalData.viewNode.title = e.currentTarget.dataset.title;
    app.globalData.viewNode.article = e.currentTarget.dataset.article;
    app.globalData.viewNode.iconPath = e.currentTarget.dataset.iconpath;
    app.globalData.viewNode.picture = e.currentTarget.dataset.imageurl;

    //console.log(app.globalData);

    wx.navigateTo({
      url: '../viewitem/viewitem'
    })

  },
})